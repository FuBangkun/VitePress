# NAS 安装
此教程使用 UEFI引导、GPT分区表、XFS格式。此教程是 Arch Linux 配置 NAS 的完整教程，请不要参阅此网站其他关于 Linux 桌面端的教程。

## 获取安装映像
下载[archlinux-x86_64.iso](https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/latest/archlinux-x86_64.iso)和[sha256sums.txt](https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/latest/sha256sums.txt)。

## 验证签名
建议使用前先验证所下载文件的签名，特别是从 HTTP 镜像源/非官方镜像仓库下载的文件，因为 HTTP 连接一般来说容易遭到拦截而提供恶意文件，而非官方镜像仓库可能会对镜像的文件进行恶意修改。验证签名也能及时发现文件损坏。

将`sha256sums.txt`放在与`archlinux-x86_64.iso`同一个目录下，然后在此目录运行以下命令：

```powershell
Get-FileHash archlinux-x86_64.iso -Algorithm SHA256
```

将输出结果中的 Hash 字段与`sha256sums.txt`中`archlinux-x86_64.iso`前的sha256sum字段对比，如果一样即安装镜像没有问题。

### 准备安装介质
Arch Linux 的ISO文件可以被制作成多种类型安装介质，如 U 盘、光盘和带有 PXE 的网络安装映像。请按照合适的文章与教程，使用ISO文件为自己准备安装介质。

Windows 上可以考虑使用 [Rufus](https://github.dpik.top/https://github.com/pbatard/rufus/releases/download/v4.13/rufus-4.13p.exe) 制作安装介质。

## 启动到 live 环境
:::warning
Arch Linux 安装镜像不支持 UEFI 安全启动（Secure Boot）功能。如果要引导安装介质，需要禁用安全启动。如果需要，可在完成安装后重新配置。
:::

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

:::warning
默认情况下，安装映像在启动时已经预先配置好并启用了 systemd-networkd、systemd-resolved、iwd 和 ModemManager。但在已经安装完成了的系统之中并非如此。
:::

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

:::warning
请注意必须安装`lvm2`包并在mkinitcpio.conf的HOOKS里添加`lvm2`，否则无法正常启动。稍后会提到具体操作。
:::

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
pacstrap -K /mnt base linux linux-headers linux-firmware amd-ucode nano xfsprogs sudo-rs base-devel git networkmanager lvm2 openssh
```

- `base`、`linux`、`linux-headers`、`linux-firmware`是Linux内核和硬件包。
- `amd-ucode`和`intel-ucode`是CPU微码，减小CPU错误率，安装哪个包取决于你是AMD还是Intel CPU。
- `nano`是一个好用的TUI文本编辑器。
- `xfsprogs`是XFS文件系统的管理工具。
- `sudo-rs`是sudo的rust重写版，用来在普通用户下以root权限运行命令
- `base-devel`和`git`是编译程序需要用到的包。
- `networkmanager`是网络管理器。
- `lvm2`是LVM管理器，使用LVM必须安装。
- `openssh`是提供ssh的软件。

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
启用网络管理器服务（会开机自启）

```bash
systemctl enable NetworkManager sshd
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
pacman -Syu archlinuxcn-keyring pacman-contrib
systemctl enable pacman-filesdb-refresh.timer
```

## 本地化
### 安装字体
不需要安装字体，因为服务器通常只使用SSH，而SSH使用客户端字体。

### 配置语言
```
nano /etc/locale.gen
```

去掉`zh_CN.UTF-8`和`en_US.UTF-8`前面的井号

```bash
locale-gen
echo LANG=zh_CN.UTF-8 > /etc/locale.conf
echo 'KEYMAP=us' > /etc/vconsole.conf
```

### 配置计算机名称
```bash
echo nas > /etc/hostname
```

## 用户
### 设置root用户密码
```bash
passwd
```

### 创建普通用户
```bash
useradd -m -G wheel nas
passwd nas
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
linux   /vmlinuz-linux
initrd  /[amd-ucode或intel-ucode].img
initrd  /initramfs-linux.img
options root=[root分区（单硬盘填/dev/nvme0n1p2，多硬盘填/dev/vg/lv）] rw
```

- `rw`标记分区可读写，必须加。

## 结束安装
输入`exit`退出到arch-chroot的第一层，也就是最开始的root用户。

:::warning
如果使用lvm2，请按以下步骤操作。

```bash
nano /etc/mkinitcpio.conf
```

在`HOOKS`里在`filesystems`之前添加`lvm2`。
:::

```bash
sudo mkinitcpio -P
exit
reboot
```

## 使用AUR
### GitHub下载加速
#### 加速脚本
```bash
sudo pacman -S axel
nano ~/makepkg_proxy
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
chmod +x ~/makepkg_proxy
```

使脚本可运行。

#### 配置makepkg
```bash
sudo nano /etc/makepkg.conf
```

修改下面的内容

```ini
DLAGENTS=('file::/usr/bin/curl -gqC - -o %o %u'
          'ftp::/usr/bin/axel -n 15 -a -o %o %u'
          'http::/usr/bin/axel -n 15 -a -o %o %u'
          'https::/home/nas/makepkg_proxy %o %u'
          'rsync::/usr/bin/rsync --no-motd -z %u %o'
          'scp::/usr/bin/scp -C %u %o')
```

### 加速构建
```bash
sudo pacman -S rust pigz pbzip2 lbzip2
```

#### 配置cargo
```bash
mkdir ~/.cargo
nano ~/.cargo/config.toml
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
git clone https://aur.archlinux.org/paru.git ~/paru
cd ~/paru
makepkg -si
```

#### 修改MakePKG
```bash
paru -S plzip
sudo nano /etc/makepkg.conf
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

## 电源管理
```bash
sudo pacman -S tlp acpi
sudo systemctl enable --now tlp
sudo systemctl set-default multi-user.target
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

## Web 服务
### Code Server
```bash
paru -S code-server
```

修改监听地址和密码

```bash
nano ~/.config/code-server/config.yaml
```

将`127.0.0.1`改为`0.0.0.0`，`password`参数改成你的密码。

```bash
sudo nano /usr/lib/code-server/lib/vscode/product.json
```

修改以下内容

```json
"linkProtectionTrustedDomains": [
  "https://open-vsx.org",
  "https://marketplace.visualstudio.com"
],
"extensionsGallery": {
  "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery",
  "cacheUrl": "https://vscode.blob.core.windows.net/gallery/index",
  "itemUrl": "https://marketplace.visualstudio.com/items",
  "controlUrl": "",
  "recommendationsUrl": ""
}
```

```bash
sudo systemctl enable --now code-server@nas
```

随后可以通过8080端口访问。

### Open List
```bash
paru -S openlist-bin
sudo systemctl enable --now openlist
```

获取密码，用户名为admin。

```bash
sudo systemctl status openlist
```

随后可以通过5244端口访问。

### Samba
```bash
sudo pacman -S samba avahi
paru -S wsdd2
sudo systemctl enable --now smb avahi-daemon wsdd2
sudo mkdir /srv/nas
sudo smbpasswd -a nas
sudo chown -R nas:nas /srv/nas
sudo chmod 775 /srv/nas
sudo nano /etc/samba/smb.conf
```

添加以下内容

```ini
[global]
   workgroup = WORKGROUP
   server string = NAS
   server role = standalone server
   log file = /usr/local/samba/var/log.%m
   max log size = 50
   dns proxy = no
   map to guest = Never
   restrict anonymous = 2

[nas]
   comment = NAS
   path = /srv/nas
   browsable = yes
   guest ok = no
   read only = no
   valid users = nas
   force user = nas
   create mask = 0664
   directory mask = 0775
```

随后可以通过smb://nas/nas访问。

### 静态主页
```bash
sudo mkdir /srv/www
```

在`/srv/www`中编写网页，根页面命名为index.html。

```bash
sudo nano /etc/systemd/system/nas-mainpage.service
```

添加以下内容

```ini
[Unit]
Description=NAS Mainpage
After=network.target

[Service]
Type=simple
WorkingDirectory=/srv/www
ExecStart=/usr/bin/python -m http.server 80
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```

启用服务

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now nas-mainpage
```

随后可以通过80端口访问。

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