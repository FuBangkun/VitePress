# Java
推荐使用Azul JDK

## Windows
### 安装Java
1. 打开[Azul JDK官网](https://www.azul.com/downloads/?os=windows&architecture=x86-64-bit&package=jdk#zulu)，选择Java版本下载msi文件。
2. 如果要安装多个Java，在主Java里将`Set JAVA_HOME variable`改为`Will be installed on local hard drive`。
3. 将安装路径改为`C:\Dev\Runtimes\zulu[Java版本]`

### 检查安装
```powershell
java --version
```

有输出即为安装成功

### 配置Gradle
如果你要开发Minecraft模组，会用到Gradle。

在第一次使用Gradle前创建系统环境变量`GRADLE_USER_HOME`，填入`C:\Dev\Runtimes\gradle`。

## Arch Linux
### 安装Java
安装对应AUR包即可

### 检查安装
```powershell
java --version
```

### 切换Java
```
sudo archlinux-java set [Java版本]
```