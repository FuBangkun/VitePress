# NAS 配置
## 安装 Arch Linux
参考 [Arch Linux 安装](/linux/install)完成安装，你可以参考下面内容微调。

[基础包安装](/linux/install#基础包安装)中把 `linux-zen`、`linux-zen-headers` 换成 `linux`、`linux-headers` 来减少功耗，不安装 `bluez`、`bluez-utils`、`pipewire`、`pipewire-pulse`、`pipewire-jack` 这几个包，`bluetooth.service` 服务也不用开启了。

[安装字体](/linux/install#安装字体)中不用安装字体，因为服务器通常只使用 SSH，而 SSH 使用客户端字体。

你可以把计算机名称和用户名都设为 `nas` 以便管理。

你可以设置默认启动为多用户文本模式，使用 `sudo systemctl set-default multi-user.target` 命令。

不要用 rFEInd 当引导，NAS 一般不需要多系统，rFEInd 只会拖慢启动速度。

## Web 服务
### Code Server
```bash
paru -S code-server
```

修改监听地址和密码

```bash
nano ~/.config/code-server/config.yaml
```

将 `127.0.0.1` 改为 `0.0.0.0`，`password` 参数改成你的密码。

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

启用服务

```bash
sudo systemctl enable --now code-server@nas.service
```

随后可以通过 8080 端口访问。

### Open List
```bash
paru -S openlist-bin
sudo systemctl enable --now openlist.service
```

从输出中获取密码，用户名为 `admin`。

```bash
sudo systemctl status openlist
```

随后可以通过 5244 端口访问。

### Samba
```bash
sudo pacman -S samba avahi
paru -S wsdd2
sudo systemctl enable --now smb avahi-daemon.service wsdd2.service
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

启用服务

```bash
sudo systemctl enable --now smb.service nmb.service
```

随后可以通过 `smb://nas/nas` 访问。

### 静态主页
```bash
sudo mkdir /srv/www
```

在 `/srv/www` 中编写网页，根页面命名为 `index.html`。

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
sudo systemctl enable --now nas-mainpage.service
```

随后可以通过 80 端口访问。