# Arch Linux 配置
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
$ chmod +x ~/makepkg_proxy
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
$ cd ~/paru
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

#### 将 fish 用作交互式 shell
```bash
~/.bashrc
```

追加以下内容

```bash
if [[ $(ps --no-header --pid=$PPID --format=comm) != "fish" && -z ${BASH_EXECUTION_STRING} && ${SHLVL} == 1 ]]
then
	shopt -q login_shell && LOGIN_OPTION='--login' || LOGIN_OPTION=''
	exec fish $LOGIN_OPTION
fi
```

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

:::warning
你可能需要将在 ~/.bash_profile 所做的配置复制到 ~/.zsh_profile，将在 ~/.bashrc 所做的配置复制到 ~/.zshrc。
:::

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
sudo systemctl enable plasmalogin
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

## 输入法
Linux下主流输入法有iBus和Fcitx。

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

## Zram内存压缩与 Swappiness 策略优化

Zram 在内存中创建一个压缩块设备作为 Swap 使用。由于 RAM 的速度远快于磁盘，且 Zstd 压缩效率高，这能显著提升系统响应速度，避免系统在内存压力大时卡死。

[zram: Compressed RAM-based block devices — The Linux Kernel documentation](https://docs.kernel.org/admin-guide/blockdev/zram.html)

**通用配置原则：**
- **Zram 大小**：建议设为物理内存的 **50%** (`zram-fraction = 0.5`)。
    - **小内存设备 (<16GB)**：可激进设为 100% (1.0) 以防止内存耗尽。
    - **大内存设备 (≥32GB)**：50% (0.5) 已绰绰有余，既能提供巨大的交换空间，又保留了足够的物理内存安全红线。
- **Swappiness**：配合 Zram 时，建议保持默认 **60** 或更高（如 100）。这能让系统积极利用 Zram 压缩冷数据，腾出物理内存给文件缓存。**切勿**在使用 Zram 时将其设为 10。

**1. 安装与配置 Zram**
安装 zram-generator

```bash
sudo pacman -S zram-generator
sudo nano /etc/systemd/zram-generator.conf
```

添加以下内容（注意：可以解除 4GB 默认限制）：

```ini
[zram0]
# 压缩算法，zstd 是性能和压缩率的最佳平衡
compression-algorithm = zstd
# Zram 大小：设置为物理内存的百分之多少除以 100
zram-fraction = 0.5
# 解除默认的 4096MB (4GB) 限制，否则大内存机器只会分到 4G
max-zram-size = none
# 优先级，确保比磁盘 Swap 高（如果有的话）
swap-priority = 100
```

启动zram

```bash
sudo systemctl daemon-reload
sudo systemctl start dev-zram0.swap
```

验证安装

```bash
zramctl
```

预期输出示例（DISKSIZE 应接近你的物理内存大小，如 64G）
```
# NAME       ALGORITHM DISKSIZE DATA COMPR TOTAL STREAMS MOUNTPOINT
# /dev/zram0 zstd           32G   4K   64B   20K      16 [SWAP]
```

如果修改了配置文件（如调整大小）想立即生效且不重启电脑，建议按照以下“彻底重置”步骤操作：

```bash
sudo systemctl stop dev-zram0.swap
sudo systemctl stop systemd-zram-setup@zram0.service
# 如果下面的命令提示模块在使用，请先执行 sudo swapoff /dev/zram0，再执行此命令
sudo modprobe -r zram
sudo systemctl daemon-reload
sudo systemctl start dev-zram0.swap
```

**2. 调整 Swappiness（确保 Zram 被有效利用）**

查看当前值（默认通常为 60）

```bash
cat /proc/sys/vm/swappiness
```

确保其不为 10。如果需要强制指定为 60 或更高（如 100）

```
sudo nano /etc/sysctl.d/99-swappiness.conf
```

添加以下内容

```ini
# Zram 专用优化：保持积极的换页策略
vm.swappiness = 60
# 可选：如果希望系统更激进地利用 Zram，可设为 100
# vm.swappiness = 100
```

应用配置

```shell
sudo sysctl --system
```

## 电源管理
```bash
sudo pacman -S tlp acpi
sudo systemctl enable --now tlp
sudo systemctl enable --now fstrim.timer
```

### 笔记本电池充电阈值
```bash
sudo nano /etc/tlp.conf
```

修改以下内容

```ini
START_CHARGE_THRESH_BAT0=60
STOP_CHARGE_THRESH_BAT0=80
```

### 笔记本合盖不睡眠
```bash
sudo nano /etc/systemd/logind.conf
```

修改以下内容

```ini
HandleLidSwitch=ignore
HandleLidSwitchExternalPower=ignore
LidSwitchIgnoreInhibited=yes
```
