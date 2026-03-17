# Java
推荐使用Azul JDK

## 安装
### Windows
1. 打开[Azul JDK官网](https://www.azul.com/downloads/?os=windows&architecture=x86-64-bit&package=jdk#zulu)，选择Java版本下载msi文件。
2. 如果要安装多个Java，在主Java里将`Set JAVA_HOME variable`改为`Will be installed on local hard drive`。
3. 将安装路径改为`C:\Dev\Runtimes\zulu[Java版本]`。
4. 如果要用Gradle：创建系统环境变量`GRADLE_USER_HOME`，填入`C:\Dev\Runtimes\gradle`。

### Arch Linux
在[ArchWiki](https://wiki.archlinuxcn.org/wiki/Java)查询需要的Java并安装。
:::info
可以使用archlinux-java切换正在使用Java。
```
sudo archlinux-java set [Java版本]
```
:::

## 检查安装
```bash
java --version
```

有输出即为安装成功。