# 游戏配置
请先安装显卡驱动，开启multilib库。如果你完全按照`Arch Linux安装`教程，你已经安装过了。

## Steam
```bash
sudo pacman -S steam
```

## 米哈游
别问我为什么没原神。

安装Proton
```bash
paru -S proton-ge-custom-bin dxvk-bin umu-launcher
mkdir /etc/modules-load.d/
touch /etc/modules-load.d/ntsync.conf
echo "ntsync" > /etc/modules-load.d/ntsync.conf
/usr/share/steam/compatibilitytools.d/proton-ge-custom/files/bin/wine winecfg
setup_dxvk install
```

禁用联网检查
崩坏：星穹铁道：`echo "0.0.0.0          globaldp-prod-cn01.bhsr.com" >> /etc/hosts`
绝区零：`echo "0.0.0.0          globaldp-prod-cn01.juequling.com" >> /etc/hosts`

使用我打包的[脚本](https://www.lanzoui.com/iBbAa3k2bozg)，注意改一下游戏路径。你还可以将脚本设成快捷方式，图标已附带。

## Waydroid
一款Wayland上的安卓模拟器。

### 安装Waydroid
```bash
pacman -S waydroid archlinuxcn/waydroid-image
sudo waydroid init
sudo systemctl enable --now waydroid-container
waydroid session start
```

### 安装Arm翻译层
```bash
git clone https://github.dpik.top/https://github.com/casualsnek/waydroid_script.git
cd waydroid_script
python3 -m venv venv
venv/bin/pip install -r requirements.txt
sudo venv/bin/python3 main.py install libhoudini
```

### 解决网络问题
```bash
sudo waydroid shell
settings put global captive_portal_mode 0
settings put global captive_portal_server ""
exit
```

## 游戏模式
```bash
sudo pacman -S gamemode lib32-gamemode
groupadd gamemode
gpasswd -a [用户名] gamemode
```

### 使用NVIDIA独显运行
添加环境变量

```ini
GAMEMODERUNEXEC="env __NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia __VK_LAYER_NV_optimus=NVIDIA_only"
```