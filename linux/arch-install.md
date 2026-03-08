# Arch Linux安装
此教程使用 UEFI引导、GPT分区表、XFS格式、Linux Zen内核。

## 获取安装映像
打开[下载](https://archlinux.org/download/)页面，推荐选择清华大学的镜像`tuna.tsinghua.edu.cn`，下载`archlinux-x86_64.iso`和`sha256sums.txt`。

## 验证签名
建议使用前先验证所下载文件的签名，特别是从 HTTP 镜像源/非官方镜像仓库下载的文件，因为 HTTP 连接一般来说容易遭到拦截而提供恶意文件，而非官方镜像仓库可能会对镜像的文件进行恶意修改。验证签名也能及时发现文件损坏。

将`sha256sums.txt`放在与`archlinux-x86_64.iso`同一个目录下，然后在此目录运行以下命令：

```powershell
Get-FileHash archlinux-x86_64.iso -Algorithm SHA256
```

将输出结果中的 Hash 字段与`sha256sums.txt`中`archlinux-x86_64.iso`前的sha256sum字段对比，如果一样即安装镜像没有问题。

### 准备安装介质
Arch Linux 的ISO文件可以被制作成多种类型安装介质，如 U 盘、光盘和带有 PXE 的网络安装映像。请按照合适的文章与教程，使用ISO文件为自己准备安装介质。

可以考虑使用 Rufus 制作安装介质。

## 启动到 live 环境
> **注意：**Arch Linux 安装镜像不支持 UEFI 安全启动（Secure Boot）功能。如果要引导安装介质，需要禁用安全启动。如果需要，可在完成安装后重新配置。

选择从带有 Arch 安装文件的介质启动，通常是需要在计算机启动加电自检时快速按下某个热键。启动时的画面也可能会有提示，详情请参考自己的计算机的说明书或主板说明书。

当引导加载程序菜单出现时，选择 `Arch Linux install medium` 并按 Enter 进入安装环境。

您将会以 root 身份登录进入一个虚拟控制台，默认的 Shell 是 Zsh。

## 关于 archinstall 的提示
如果您觉得用命令行安装过于繁琐，可以试试官方的安装脚本 archinstall。

```bash
archinstall
```

但不建议初学者用 archinstall 走捷径，因为手动安装 Arch Linux 本身就是 Arch Linux 教学实操中重要的一环，少了这个环节，会让初学者面对一些基础问题时束手无策，为自己和社区带来不必要的麻烦。

## 验证引导模式
要验证系统目前的引导模式，请检查 UEFI 固件位数：

```bash
cat /sys/firmware/efi/fw_platform_size
```

- 如果命令结果为 64，则系统是以 UEFI 模式引导且使用 64 位 x64 UEFI。
- 如果命令结果为 32，则系统是以 UEFI 模式引导且使用 32 位 IA32 UEFI，虽然其受支持，但引导加载程序只能使用 systemd-boot 和 GRUB。
- 如果命令结果为No such file or directory，则系统可能是以 BIOS 模式（或 CSM 模式，这两种模式通常出现在老旧的电脑或未经配置的虚拟机上）引导。
- 如果系统没有以您想要的模式（UEFI 或 BIOS）引导启动，请您参考自己的计算机或主板说明书。

## ArchISO连接到互联网
要在 Live 环境中配置网络连接，请遵循以下步骤：

1. 确保系统已经列出并启用了网络接口，用 `ip-link` 检查：

    ```bash
    ip link
    ```
2. 对于无线局域网（Wi-Fi）和无线广域网（WWAN），请确保网卡未被 rfkill 禁用。
3. 连接到网络：

    - 有线以太网——连接网线。
    - WiFi——使用 iwctl 认证无线网络。
        1. 启动
            ```bash
            iwctl
            ```
        2. 连接
            ```bash
            station wlan0 connect [你的WiFi名称]
            ```
        3. 退出
            ```bash
            exit
            ```
    - 移动宽带调制解调器（移动网卡） - 使用 mmcli 连接到移动网络。
4. 配置网络连接：

    - DHCP：对于有线以太网、无线局域网（WLAN）和无线广域网（WWAN）网络接口来说，动态 IP 地址和 DNS 服务器分配（由 systemd-networkd 和 systemd-resolved 提供功能）能够开箱即用。
    - 静态 IP 地址：按照网络配置#静态 IP 地址进行操作。
5. 用 ping 检查网络连接：

    ```bash
    ping ping.archlinux.org
    ```

> **注意：**默认情况下，安装映像在启动时已经预先配置好并启用了 systemd-networkd、systemd-resolved、iwd 和 ModemManager。但在已经安装完成了的系统之中并非如此。

## 创建硬盘分区
查看当前分区情况

```bash
lsblk -pf
```

查询硬盘详细情况

```bash
fdisk -l [硬盘，如/dev/nvme0n1，具体请看上条命令的输出]
```

### 单硬盘版
假设硬盘为/dev/nvme0n1，分出1GiB当boot分区，剩余空间当root分区。

对硬盘进行分区

```bash
cfdisk /dev/nvme0n1
```

1. 如果是新硬盘的话会弹出选项，选`GPT`。
2. boot分区

    上下方向键选中空闲空间，左右方向键选择`New`，输入`1GB`并回车，选择`Type`，选择`EFI System`。

    如果你的类型里没有`EFI System`说明你的硬盘不是GPT分区表，可以选择`Quit`退出，运行`fdisk [硬盘]`，输入`g`回车创建GPT分区表（会删除所有已经存在的分区），输入w并回车保存更改，并从头开始。
3. root分区

    上下方向键选中空闲空间，选择`New`，用掉所有剩余空间，类型`Linux Filesystem`不需要更改。
4. 选择`Write`，输入`yes`并回车。
5. 选择`Quit`退出。

格式化分区

```bash
mkfs.vfat -F 32 /dev/nvme0n1p1
mkfs.xfs /dev/nvme0n1p2
```

挂载分区

```bash
mount /dev/nvme0n1p2 /mnt
mount -m /dev/nvme0n1p1 /mnt/boot
```

### 多硬盘版
假设硬盘为/dev/nvme0n1和/dev/nvme1n1，/dev/nvme0n1分出1GiB当boot分区，两个硬盘所有剩余空间当root分区。

对硬盘进行分区

```bash
cfdisk /dev/nvme0n1
```

1. 如果是新硬盘的话会弹出选项，选`GPT`。
2. 左右方向键选择`Delete`并回车，删掉所有分区。
3. boot分区

    上下方向键选择`Free Space`，选择`New`，输入`1GB`并回车，选择`Type`，选择`EFI System`。

    如果你的类型里没有`EFI System`说明你的硬盘不是GPT分区表，可以选择`Quit`退出，运行`fdisk [硬盘]`，输入`g`回车创建GPT分区表（会删除所有已经存在的分区），输入w并回车保存更改，并从头开始。
4. 选择`Free Space`，选择`New`，用掉所有剩余空间，类型`Linux LVM`。
5. 选择`Write`，输入`yes`并回车。
6. 选择`Quit`退出。

```bash
cfdisk /dev/nvme1n1
```

1. 如果是新硬盘的话会弹出选项，选`GPT`。
2. 左右方向键选择`Delete`并回车，删掉所有分区。
3. 选择`Free Space`，选择`New`，用掉所有剩余空间，类型`Linux LVM`。
4. 选择`Write`，输入`yes`并回车。
5. 选择`Quit`退出。

创建LVM

```bash
pvcreate /dev/nvme0n1p2 /dev/nvme1n1p1
vgcreate vg /dev/nvme0n1p2 /dev/nvme1n1p1
lvcreate -l 100%FREE -n lv vg
```

格式化分区

```bash
mkfs.vfat -F 32 /dev/nvme0n1p1
mkfs.xfs /dev/mapper/vg-lv
```

挂载分区

```bash
mount /dev/vg/lv /mnt
mount -m /dev/nvme0n1p1 /mnt/boot
```

> **注意：**请注意必须安装`lvm2`包并在mkinitcpio.conf的HOOKS里添加`lvm2`，否则无法正常启动。稍后会提到具体操作。

## ArchISO包管理

### 配置镜像源
```bash
reflector -c China -p https --sort rate --completion-percent 95 --save /etc/pacman.d/mirrorlist
```

### Pacman 配置
```bash
nano /etc/pacman.conf
```

去掉`[multilib]`和`Color`前的井号

### 基础包安装
```bash
pacstrap -K /mnt base linux-zen linux-zen-headers linux-firmware amd-ucode nano xfsprogs sudo-rs base-devel git networkmanager bluez bluez-utils pipewire pipewire-pulse pipewire-jack lvm2
```

- `base`、`linux-zen`、`linux-zen-headers`、`linux-firmware`是Linux内核和硬件包，其中linux-zen是一个相比官方内核性能更强的内核，不需要linux-zen可以将`-zen`删去。
- `amd-ucode`和`intel-ucode`是CPU微码，减小CPU错误率，安装哪个包取决于你是AMD还是Intel CPU。
- `nano`是一个好用的TUI文本编辑器。
- `xfsprogs`是XFS文件系统的管理工具。
- `sudo-rs`是sudo的rust重写版，用来在普通用户下以root权限运行命令
- `base-devel`和`git`是编译程序需要用到的包。
- `networkmanager`是网络管理器。
- `bluez`和`bluez-utils`是蓝牙管理器。
- `pipewire`、`pipewire-pulse`、`pipewire-jack`是声音管理器。
- `lvm2`是LVM管理器，使用LVM必须安装。

## Arch-Chroot
### 生成挂载信息
```bash
genfstab -U /mnt > /mnt/etc/fstab
```

### 进入Arch-Chroot
```bash
arch-chroot /mnt
```

### 同步时间
```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock -w
timedatectl set-ntp true
```

## 连接到互联网
启用网络管理器和蓝牙管理器服务（会开机自启）

```bash
systemctl enable NetworkManager bluetooth
```

再次连接网络

## 包管理
```bash
nano /etc/pacman.conf
```

去掉`[multilib]`和`Color`前的井号

```ini
[archlinuxcn]
Server = https://repo.archlinuxcn.org/$arch
```

同步软件包并安装`archlinuxcn-keyring`

```bash
pacman -Syu archlinuxcn-keyring
```

## 本地化
### 安装字体
```bash
pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji ttf-jetbrains-mono ttf-jetbrains-mono-nerd
```

### 配置语言
```
nano /etc/locale.gen
```

去掉`zh_CN.UTF-8`和`en_US.UTF-8`前面的井号

```bash
locale-gen
echo LANG=zh_CN.UTF-8 > /etc/locale.conf
```

### 配置计算机名称
```bash
echo [计算机名称（不能包含中文）] > /etc/hostname
```

## 用户
### 设置root用户密码
```bash
passwd
```

### 创建普通用户
```bash
useradd -m -G wheel [用户名]
passwd [用户名]
```

### sudo
```bash
EDITOR=nano visudo
```

去掉`%wheel ALL=(ALL:ALL) ALL`前的井号。

如果去掉`%wheel ALL=(ALL:ALL) NOPASSWD: ALL`前的井号，运行sudo不需要输入密码。

## 引导
### 生成 Systemd-boot
```bash
bootctl install --path=/boot
mkdir -p /boot/loader/entries
nano /boot/loader/loader.conf
```

添加以下内容

```ini
default  arch.conf
timeout  0
console-mode max
editor   no
```

timeout为自动选择时间（单位为秒），设为`0`就不用进入引导选择界面

## 配置引导选项
```bash
nano /boot/loader/entries/arch.conf
```

添加以下内容

```ini
title   Arch Linux
linux   /vmlinuz-linux-zen
initrd  /[amd-ucode或intel-ucode].img
initrd  /initramfs-linux-zen.img
options root=[root分区（单硬盘填/dev/nvme0n1p1，多硬盘填/dev/vg/lv）] rw quiet nvidia-drm.modeset=1
```

- `rw`标记分区可读写，必须加。
- `quiet`可以隐藏引导信息。
- 如果有NVIDIA独显，且使用Wayland桌面，需要添加`nvidia-drm.modeset=1`。

## 加速AUR构建
从这里开始需要使用到普通用户，命令前`#`代表root用户，`$`代表普通用户。

你通常不应该直接使用root用户，在普通用户下可以在命令前加上`sudo`来以root权限运行命令，如`sudo pacman -S base`。

### GitHub下载加速
#### 加速脚本
```bash
# pacman -S axel
# su [用户名]
$ nano ~/makepkg_proxy
```

添加以下内容

```sh
#!/bin/sh
domain=$(echo "$2" | cut -f3 -d'/')
case "$domain" in 
    "github.com"|"raw.githubusercontent.com")
        url="https://github.dpik.top/$2"
        ;;
    *)
        url=$2
        ;;
esac
/usr/bin/axel -n 10 -a -o "$1" "$url"
```

`https://github.dpik.top`是一个加速GitHub下载的网站，更多加速下载网站见[此网站](https://github.akams.cn/)。
`10`是多线程下载的线程数。

```bash
$ chmod +x makepkg_proxy
```

使脚本可运行。

#### 配置makepkg
```bash
$ sudo nano /etc/makepkg.conf
```

修改下面的内容

```ini
DLAGENTS=('file::/usr/bin/curl -gqC - -o %o %u'
          'ftp::/usr/bin/axel -n 15 -a -o %o %u'
          'http::/usr/bin/axel -n 15 -a -o %o %u'
          'https::/home/[用户名]/makepkg_proxy %o %u'
          'rsync::/usr/bin/rsync --no-motd -z %u %o'
          'scp::/usr/bin/scp -C %u %o')
```

### 加速构建
```bash
# pacman -S rust pigz pbzip2 lbzip2
```

#### 配置cargo
```bash
$ mkdir ~/.cargo
$ nano ~/.cargo/config.toml
```

添加以下内容

```toml
[source.crates-io]
replace-with = 'mirror'

[source.mirror]
registry = "sparse+https://mirrors.aliyun.com/crates.io-index/"
```

#### 安装paru
```bash
$ git clone https://aur.archlinux.org/paru.git ~/paru
$ cd paru
$ makepkg -si
```

#### 修改MakePKG
```bash
$ paru -S plzip
$ sudo nano /etc/makepkg.conf
```

修改下面的内容

```ini
MAKEFLAGS="-j4"
OPTIONS=(... !debug ...)
COMPRESSGZ=(pigz -c -f -n)
COMPRESSBZ2=(lbzip2 -c -f)
COMPRESSZST=(zstd -c -T0 --auto-threads=logical -)
COMPRESSLZ=(plzip -c -f)
```

## 终端
Fish Shell和Zsh Shell是两个不同的终端。Fish更轻量，功能多，但不兼容POSIX；Zsh兼容POSIX。可以同时安装。

### Fish
#### 安装fish和插件管理器fisher
```bash
sudo pacman -S fish
mkdir -p ~/.config/fish/{plugins,conf.d}
nano ~/.config/fish/conf.d/fisher.fish
```

添加以下内容

```
set -g fisher_path ~/.config/fish/plugins

set fish_complete_path $fish_complete_path[1] $fisher_path/completions $fish_complete_path[2..]
set fish_function_path $fish_function_path[1] $fisher_path/functions $fish_function_path[2..]

for file in $fisher_path/conf.d/*.fish
    source $file 2>/dev/null
end
```

#### 安装tide
```bash
fish
curl -sL https://github.dpik.top/https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher
fisher install IlanCosman/tide@v6
```

由于Fish不支持POSIX，所以不能用Fish做默认终端，使用时运行fish命令或者在终端模拟器里选择Fish启动。

### Zsh + p10k
#### 安装Zsh
```bash
sudo pacman -S zsh zsh-autosuggestions zsh-syntax-highlighting zsh-completions autojump
chsh -s /usr/bin/zsh
vim ~/.zshrc
```

添加以下内容

```sh
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/share/autojump/autojump.zsh
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

> **注意：**你可能需要将在 ~/.bash_profile 所做的配置复制到 ~/.zsh_profile，将在 ~/.bashrc 所做的配置复制到 ~/.zshrc。

#### 安装p10k
```bash
curl -fsSL https://github.dpik.top/https://raw.githubusercontent.com/zimfw/install/master/install.zsh | zsh
echo "zmodule romkatv/powerlevel10k" >> ~/.zimrc
zimfw install
```

因为Zim框架是从GitHub下载插件的，所以速度极慢，多等多试几次就好，或者挂梯子。

## 桌面环境
推荐安装[KDE](https://wiki.archlinuxcn.org/wiki/KDE)或者[GNOME](https://wiki.archlinuxcn.org/wiki/GNOME)，这两个生态最好。

### GNOME
#### 安装 GNOME
有三个软件组可用：
- gnome包组：包含基本的桌面环境和一些集成良好的应用
- gnome-circle包组：包含多种格外应用，极大的拓展了GNOME生态。
- gnome-extra包组：包含部分开发工具，以及其他适合GNOME的应用与游戏。

或者只安装gnome-shell包使用GNOME基础桌面环境。

#### 显示管理器
```bash
sudo systemctl enable gdm
```

### KDE
#### 安装 KDE
有两个包租可用：
- plasma包组：包含基本的桌面环境和一些集成良好的应用
- kde-applications包租：KDE全套应用

或者只安装kde-desktop包使用KDE基础桌面环境。

#### 显示管理器
```bash
sudo pacman -S sddm
sudo systemctl enable sddm
```

### Wayland合成器
常见的Wayland的合成器有Niri、Hyprland、Mango等，他们提供强大的客制化功能，但是需要大量配置，大量软件需要手写。

你可以使用Noctalia Shell、Dank Material Shell等Wayland桌面shell来减少工作量。

这里以Niri + Noctalia来演示部分功能（Noctalia用到了Google的包，需要梯子）。

#### 安装Niri
安装Niri、XWayland、XDG门户、显示管理器和剪贴板

```bash
sudo pacman -S niri xwayland-satellite xdg-desktop-portal-gtk xdg-desktop-portal-gnome uwsm cliphist
```

补全GNOME XDG门户自带的Nautilus的功能，当然你也可以换别的

```bash
sudo pacman -S ffmpegthumbnailer gvfs-smb nautilus-open-any-terminal file-roller gnome-keyring gst-plugins-base gst-plugins-good gst-libav
```

安装Noctalia

```bash
paru -S noctalia-shell-git matugen cava qt6-multimedia-ffmpeg
```

#### 配置终端
假设使用Kitty作为终端模拟器。

设置Nautilus默认终端模拟器。

```bash
sudo ln -s /usr/bin/kitty /usr/bin/gnome-terminal
```

修改默认终端

```bash
nano ~/.config/kitty/kitty.conf
```

修改`shell`为`/usr/bin/fish`，并去掉注释

美化Kitty

```bash
kitty + kitten themes
kitty list-fonts --psnames
```

#### 自动登录tty
```bash
sudo mkdir -p /etc/systemd/system/getty@tty1.service.d/
sudo nano /etc/systemd/system/getty@tty1.service.d/autologin.conf
```

添加以下内容

```
[Service]
ExecStart= 
ExecStart=-/sbin/agetty --noreset --noclear --autologin [用户名] - ${TERM}
```

#### 显示管理器
自动启动Niri

```bash
sudo nano ~/.bash_profile
```

添加以下内容

```bash
if [[ -z $DISPLAY && $(tty) == /dev/tty1 ]]; then
    exec uwsm start niri.desktop
fi
```

## 结束安装
输入`exit`退出到arch-chroot的第一层，也就是最开始的root用户。

```bash
nano /etc/mkinitcpio.conf
```

在`HOOKS`里添加`lvm2`。

```bash
mkinitcpio -P
exit
reboot
```

## 输入法
Linux下主流输入法有iBus和Fcitx，iBus对Wayland支持不怎么好。

这里使用Fcitx5 + Rime + 雾凇拼音。

```bash
sudo pacman -S fcitx5-im fcitx5-rime fcitx5-nord rime-ice-pinyin-git
```

配置fcitx5-rime

```bash
mkdir -p ~/.local/share/fcitx5/rime
nano ~/.local/share/fcitx5/rime/default.custom.yaml
```

添加以下内容

```yaml
patch:
  __include: rime_ice_suggestion:/
  menu/page_size: 10
```

请[ArchWiki](https://wiki.archlinuxcn.org/wiki/Fcitx_5#配置)查询当前桌面环境和显示协议需要使用的环境变量。

## 显卡驱动和硬件编解码
### NVIDIA
在[CodeNames](https://nouveau.freedesktop.org/CodeNames.html)搜索自己的显卡，看看对应的family是什么。然后在[ArchWiki](https://wiki.archlinux.org/title/NVIDIA)查找对应的显卡驱动。

linux官方内核使用nvidia-open，其他内核都使用nvidia-open-dkms。

```bash
sudo pacman -S nvidia-open-dkms nvidia-utils lib32-nvidia-utils nvidia-vaapi-driver
```

可选：安装OpenCL加速计算

```bash
sudo pacman -S opencl-nvidia lib32-opencl-nvidia
```

### AMD
AMD显卡不需要自己安装驱动，已经由linux-firmware和mesa提供。可以安装一下Vulkan驱动。

```bash
sudo pacman -S mesa lib32-mesa xf86-video-amdgpu vulkan-radeon lib32-vulkan-radeon
```

可选：安装OpenCL加速计算

```bash
sudo pacman -S opencl-mesa lib32-opencl-mesa
```

### Intel
Intel显卡不需要自己安装驱动，已经由linux-firmware和mesa提供。可以安装一下Vulkan驱动。

Broadwell以后的Intel显卡装intel-media-driver，旧的装libva-intel-driver。

```bash
sudo pacman -S mesa lib32-mesa vulkan-intel lib32-vulkan-intel intel-media-driver
```

可选：安装OpenCL加速计算

```bash
sudo pacman -S opencl-mesa lib32-opencl-mesa
```

### 验证硬件编解码
先重启，再安装libva-utils

```
sudo pacman -S libva-utils
```

运行vainfo验证，多显卡用户可以使用LIBVA_DRIVER_NAME环境变量指定要使用的显卡。

```
LIBVA_DRIVER_NAME=nvidia vainfo
```

### 笔记本显卡切换
#### 混合模式下用独显运行
- PRIME

    ```bash
    sudo pacman -S nvidia-prime
    ```
    使用 prime-run命令使用独显运行软件

    ```bash
    prime-run steam
    ```
    
- switcheroo-control

    GNOME装这个可以右键桌面快捷方式选择使用独显运行

    ```bash
    sudo pacman -S switcheroo-control
    sudo systemctl enable --now switcheroo-control
    ```

- KDE：开始菜单右键编辑应用程序在高级页面设置用独显运行

#### 显卡切换
目前Wayland没有完善的显卡切换，只能做到从混合模式切换到核显模式。独显直连需要手动进BIOS调整，建议安装时处在混合模式。从混合切到独显直连大概率会失败，谨慎操作。

- supergfxctl

    ASUS华硕用户可以用supergfxctl

    ```bash
    paru -S supergfxctl
    sudo systemctl enable --now supergfxd
    ```

    GNOME从扩展里下载GPU supergfxctl switch

    KDE从AUR安装plasma6-applets-supergfxctl

- envycontrol

    ```bash
    paru -S envycontrol 
    ```

    GNOME装扩展GPU Profile Selector

    KDE在桌面右键进入编辑模式，挂件商店里下载Optimus GPU Switcher