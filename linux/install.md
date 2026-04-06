# 系统安装
此教程使用 UEFI 引导、GPT 分区表、XFS 格式、Linux Zen 内核。

## 获取安装映像
下载 [archlinux-x86_64.iso](https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/latest/archlinux-x86_64.iso) 和 [sha256sums.txt](https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/latest/sha256sums.txt)。

## 验证签名
建议使用前先验证所下载文件的签名，特别是从 HTTP 镜像源/非官方镜像仓库下载的文件，因为 HTTP 连接一般来说容易遭到拦截而提供恶意文件，而非官方镜像仓库可能会对镜像的文件进行恶意修改。验证签名也能及时发现文件损坏。

将 `sha256sums.txt` 放在与 `archlinux-x86_64.iso` 同一个目录下，然后在此目录运行以下命令：

```powershell
Get-FileHash archlinux-x86_64.iso -Algorithm SHA256
```

将输出结果中的 Hash 字段与 `sha256sums.txt` 中 `archlinux-x86_64.iso` 前的 sha256sum 字段对比，如果一样即安装镜像没有问题。

### 准备安装介质
Arch Linux 的 ISO 文件可以被制作成多种类型安装介质，如 U 盘、光盘和带有 PXE 的网络安装映像。请按照合适的文章与教程，使用 ISO 文件为自己准备安装介质。

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

- 如果命令结果为 `64`，则系统是以 UEFI 模式引导且使用 64 位 x64 UEFI。
- 如果命令结果为 `32`，则系统是以 UEFI 模式引导且使用 32 位 IA32 UEFI，虽然其受支持，但引导加载程序只能使用 systemd-boot 和 GRUB。
- 如果命令结果为 `No such file or directory`，则系统可能是以 BIOS 模式（或 CSM 模式，这两种模式通常出现在老旧的电脑或未经配置的虚拟机上）引导。
- 如果系统没有以您想要的模式（UEFI 或 BIOS）引导启动，请您参考自己的计算机或主板说明书。

## ArchISO 连接到互联网
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
假设硬盘为 /dev/nvme0n1，分出 1GiB 当 boot 分区，剩余空间当 root 分区。

对硬盘进行分区

```bash
cfdisk /dev/nvme0n1
```

1. 如果是新硬盘的话会弹出选项，选 `GPT`。
2. boot 分区

    上下方向键选中空闲空间，左右方向键选择 `New`，输入 `1GB` 并回车，选择 `Type`，选择 `EFI System`。

    如果你的类型里没有 `EFI System` 说明你的硬盘不是 GPT 分区表，可以选择 `Quit` 退出，运行 `fdisk [硬盘]`，输入 `g` 回车创建 GPT 分区表（会删除所有已经存在的分区），输入 `w` 并回车保存更改，并从头开始。
3. root 分区

    上下方向键选中空闲空间，选择 `New`，用掉所有剩余空间，类型 `Linux Filesystem` 不需要更改。
4. 选择 `Write`，输入 `yes` 并回车。
5. 选择 `Quit` 退出。

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
假设硬盘为 /dev/nvme0n1 和 /dev/nvme1n1，/dev/nvme0n1 分出 1GiB 当 boot 分区，两个硬盘所有剩余空间当 root 分区。

对硬盘进行分区

```bash
cfdisk /dev/nvme0n1
```

1. 如果是新硬盘的话会弹出选项，选 `GPT`。
2. 左右方向键选择 `Delete` 并回车，删掉所有分区。
3. boot 分区

    上下方向键选择 `Free Space`，选择 `New`，输入 `1GB` 并回车，选择 `Type`，选择 `EFI System`。

    如果你的类型里没有 `EFI System` 说明你的硬盘不是 GPT 分区表，可以选择 `Quit` 退出，运行`fdisk [硬盘]`，输入 `g` 回车创建 GPT 分区表（会删除所有已经存在的分区），输入 `w` 并回车保存更改，并从头开始。
4. 选择 `Free Space`，选择 `New`，用掉所有剩余空间，类型 `Linux LVM`。
5. 选择 `Write`，输入 `yes` 并回车。
6. 选择 `Quit` 退出。

```bash
cfdisk /dev/nvme1n1
```

1. 如果是新硬盘的话会弹出选项，选 `GPT`。
2. 左右方向键选择 `Delete` 并回车，删掉所有分区。
3. 选择 `Free Space`，选择 `New`，用掉所有剩余空间，类型 `Linux LVM`。
4. 选择 `Write`，输入 `yes` 并回车。
5. 选择 `Quit` 退出。

创建 LVM

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
请注意必须安装 `lvm2` 包并在 `mkinitcpio.conf` 的 `HOOKS` 里添加 `lvm2`，否则无法正常启动。稍后会提到具体操作。
:::

## ArchISO 包管理

### 配置镜像源
```bash
reflector -c China -p https --sort rate --completion-percent 95 --save /etc/pacman.d/mirrorlist
```

### Pacman 配置
```bash
nano /etc/pacman.conf
```

去掉 `[multilib]` 和 `Color` 前的井号

### 基础包安装
```bash
pacstrap -K /mnt base linux-zen linux-zen-headers linux-firmware amd-ucode nano xfsprogs sudo-rs base-devel git networkmanager bluez bluez-utils pipewire pipewire-pulse pipewire-jack lvm2 openssh
```

- `base`、`linux-zen`、`linux-zen-headers`、`linux-firmware` 是 Linux 内核和硬件包，其中 linux-zen 是一个相比官方内核性能更强的内核，不需要 linux-zen 可以将 `-zen` 删去。
- `amd-ucode` 和 `intel-ucode` 是 CPU 微码，减小 CPU 错误率，安装哪个包取决于你是 AMD 还是 Intel CPU。
- `nano` 是一个好用的 TUI 文本编辑器。
- `xfsprogs` 是 XFS 文件系统的管理工具。
- `sudo-rs` 是 sudo 的 rust 重写版，用来在普通用户下以root权限运行命令
- `base-devel` 和 `git` 是编译程序需要用到的包。
- `networkmanager` 是网络管理器。
- `bluez` 和 `bluez-utils` 是蓝牙管理器。
- `pipewire`、`pipewire-pulse`、`pipewire-jack` 是声音管理器。
- `lvm2` 是 LVM 管理器，使用 LVM 必须安装。
- `openssh` 是提供 SSH 的软件。

## Arch-Chroot
### 生成挂载信息
```bash
genfstab -U /mnt > /mnt/etc/fstab
```

### 进入 Arch-Chroot
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
启用网络管理器、蓝牙管理器、OpenSSH 服务（会开机自启）

```bash
systemctl enable NetworkManager.service bluetooth.service sshd.service
```

再次连接网络

## 包管理
```bash
nano /etc/pacman.conf
```

去掉 `[multilib]` 和 `Color` 前的井号

```ini
[archlinuxcn]
Server = https://repo.archlinuxcn.org/$arch
```

同步软件包并安装 `archlinuxcn-keyring`

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

去掉 `zh_CN.UTF-8` 和 `en_US.UTF-8` 前面的井号

```bash
locale-gen
echo LANG=zh_CN.UTF-8 > /etc/locale.conf
echo 'KEYMAP=us' > /etc/vconsole.conf
```

### 配置计算机名称
```bash
echo [计算机名称（不能包含中文）] > /etc/hostname
```

## 用户
### 设置 root 用户密码
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

去掉 `%wheel ALL=(ALL:ALL) ALL` 前的井号。

如果去掉 `%wheel ALL=(ALL:ALL) NOPASSWD: ALL` 前的井号，运行 `sudo` 不需要输入密码。

## 引导

rEFInd 可以自动检测 `/boot` 下的内核并提供图形化选择界面，支持手动添加引导条目以传递内核参数。

### 安装 rEFInd
```bash
pacman -S --noconfirm refind-efi
refind-install
```

如果 `refind-install` 无法自动安装，可以运行下面命令

```bash
cp -r /usr/share/refind /boot/EFI/refind
mkdir -p /boot/EFI/BOOT
cp /boot/EFI/refind/refind_x64.efi /boot/EFI/BOOT/BOOTX64.EFI
```

### 配置 rEFInd

rEFInd 通常能自动检测内核和 initramfs，但你也可以在 `refind.conf` 中添加手动条目，或在 `refind.conf` 中调整自动检测行为：

```bash
nano /boot/EFI/refind/refind.conf
```

添加以下内容

```ini
menuentry "Arch Linux" {
    icon     /EFI/refind/icons/os_arch.png
    loader   /vmlinuz-linux-zen
    initrd   /[amd-ucode 或 intel-ucode].img
    initrd   /initramfs-linux-zen.img
    options  "root=[root分区（单硬盘填 /dev/nvme0n1p2，多硬盘填 /dev/vg/lv）] rw quiet nvidia-drm.modeset=1"
}
```

- `rw` 标记分区可读写，必须加。
- `quiet` 可以隐藏内核输出。
- 使用 NVIDIA 独显且在 Wayland 上时加 `nvidia-drm.modeset=1`。

## 结束安装
输入 `exit` 退出到 Chroot 的第一层，也就是最开始的 root 用户。

:::warning
如果使用 lvm2，请按以下步骤操作。

```bash
nano /etc/mkinitcpio.conf
```

在 `HOOKS` 里在 `filesystems` 之前添加`lvm2`。
:::

```bash
mkinitcpio -P
exit
reboot
```