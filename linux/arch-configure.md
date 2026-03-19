# Arch Linux配置
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