# 桌面端配置

## 安装 Arch Linux
参考 [Arch Linux 安装](/linux/install)完成安装。

## 桌面环境
推荐安装 [KDE](https://wiki.archlinuxcn.org/wiki/KDE) 或者 [GNOME](https://wiki.archlinuxcn.org/wiki/GNOME)，这两个生态最好。

### GNOME
#### 安装 GNOME
有三个软件组可用：
- gnome 包组：包含基本的桌面环境和一些集成良好的应用
- gnome-circle 包组：包含多种格外应用，极大的拓展了 GNOME 生态。
- gnome-extra 包组：包含部分开发工具，以及其他适合 GNOME 的应用与游戏。

或者只安装 gnome-shell 包使用 GNOME 基础桌面环境。

#### 显示管理器
```bash
sudo systemctl enable gdm.service
```

### KDE
#### 安装 KDE
有两个包租可用：
- plasma 包组：包含基本的桌面环境和一些集成良好的应用
- kde-applications 包租：KDE 全套应用

或者只安装 kde-desktop 包使用 KDE 基础桌面环境。

#### 显示管理器
```bash
sudo systemctl enable plasmalogin.service
```

### Wayland合成器
常见的 Wayland 的合成器有 Niri、Hyprland、Mango 等，他们提供强大的客制化功能，但是需要大量配置，大量软件需要手写（当然你也可以用别人配置好的 dots，比如 end4）。

你可以使用 Noctalia Shell 、Dank Material Shell 等 Wayland 桌面 Shell 来减少工作量。

这里以 Niri + Noctalia 来演示部分功能（Noctalia 用到了 Google 的包，需要梯子）。

#### 安装Niri
安装 Niri、XWayland、XDG 门户、显示管理器和剪贴板

```bash
sudo pacman -S niri xwayland-satellite xdg-desktop-portal-gtk xdg-desktop-portal-gnome uwsm cliphist
```

补全 GNOME XDG 门户自带的 Nautilus 的功能，当然你也可以换别的

```bash
sudo pacman -S ffmpegthumbnailer gvfs-smb nautilus-open-any-terminal file-roller gnome-keyring gst-plugins-base gst-plugins-good gst-libav
```

安装 Noctalia

```bash
paru -S noctalia-shell-git matugen cava qt6-multimedia-ffmpeg
```

#### 配置终端
假设使用 Kitty 作为终端模拟器。

设置 Nautilus 默认终端模拟器。

```bash
sudo ln -s /usr/bin/kitty /usr/bin/gnome-terminal
```

修改默认 Kitty Shell

```bash
nano ~/.config/kitty/kitty.conf
```

修改 `shell` 为 `/usr/bin/fish`，并去掉注释

美化 Kitty

```bash
kitty + kitten themes
kitty list-fonts --psnames
```

#### 自动登录 tty
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
自动启动 Niri

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
Linux 下主流输入法有 iBus 和 Fcitx。

这里使用 Fcitx5 + Rime + 雾凇拼音。

```bash
sudo pacman -S fcitx5-im fcitx5-rime fcitx5-nord rime-ice-pinyin-git
```

配置 fcitx5-rime

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

在 [ArchWiki](https://wiki.archlinuxcn.org/wiki/Fcitx_5#配置) 查询当前桌面环境和显示协议需要使用的环境变量。

## 显卡驱动和硬件编解码
### NVIDIA
在 [CodeNames](https://nouveau.freedesktop.org/CodeNames.html) 搜索自己的显卡，看看对应的 family 是什么。然后在 [ArchWiki](https://wiki.archlinux.org/title/NVIDIA) 查找对应的显卡驱动。

Linux 官方内核使用 nvidia-open，其他内核都使用 nvidia-open-dkms。

```bash
sudo pacman -S nvidia-open-dkms nvidia-utils lib32-nvidia-utils nvidia-vaapi-driver
```

可选：安装 OpenCL 加速计算

```bash
sudo pacman -S opencl-nvidia lib32-opencl-nvidia
```

### AMD
AMD 显卡不需要自己安装驱动，已经由 linux-firmware 和 mesa 提供。可以安装一下 Vulkan 驱动。

```bash
sudo pacman -S mesa lib32-mesa xf86-video-amdgpu vulkan-radeon lib32-vulkan-radeon
```

可选：安装 OpenCL 加速计算

```bash
sudo pacman -S opencl-mesa lib32-opencl-mesa
```

### Intel
Intel 显卡不需要自己安装驱动，已经由 linux-firmware 和 mesa 提供。可以安装一下 Vulkan 驱动。

Broadwell 以后的 Intel 显卡装 intel-media-driver，旧的装 libva-intel-driver。

```bash
sudo pacman -S mesa lib32-mesa vulkan-intel lib32-vulkan-intel intel-media-driver
```

可选：安装 OpenCL 加速计算

```bash
sudo pacman -S opencl-mesa lib32-opencl-mesa
```

### 验证硬件编解码
先重启，再安装 libva-utils

```
sudo pacman -S libva-utils
```

运行 `vainfo` 验证，多显卡用户可以使用 `LIBVA_DRIVER_NAME` 环境变量指定要使用的显卡。

```
LIBVA_DRIVER_NAME=nvidia vainfo
```

### 笔记本显卡切换
#### 混合模式下用独显运行
- PRIME

    ```bash
    sudo pacman -S nvidia-prime
    ```

    使用 `prime-run` 命令使用独显运行软件

    ```bash
    prime-run steam
    ```
    
- switcheroo-control

    GNOME 装这个可以右键桌面快捷方式选择使用独显运行

    ```bash
    sudo pacman -S switcheroo-control
    sudo systemctl enable --now switcheroo-control.service
    ```

- KDE：开始菜单右键编辑应用程序在高级页面设置用独显运行

#### 显卡切换
目前 Wayland 没有完善的显卡切换，只能做到从混合模式切换到核显模式。独显直连需要手动进 BIOS 调整，建议安装时处在混合模式。从混合切到独显直连大概率会失败，谨慎操作。

- supergfxctl

    华硕用户可以用 supergfxctl

    ```bash
    paru -S supergfxctl
    sudo systemctl enable --now supergfxd.service
    ```

    GNOME 装扩展 GPU supergfxctl switch

    KDE 从 AUR 安装 plasma6-applets-supergfxctl

- envycontrol

    ```bash
    paru -S envycontrol 
    ```

    GNOME 装扩展 GPU Profile Selector

    KDE 在桌面右键进入编辑模式，挂件商店里下载 Optimus GPU Switcher
