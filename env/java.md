# Java
推荐使用Azul JDK

## 安装
### Windows
1. 打开[Azul JDK官网](https://www.azul.com/downloads/?os=windows&architecture=x86-64-bit&package=jdk#zulu)，选择 Java 版本下载 msi 文件。
2. 如果要安装多个 Java，在主 Java 里将 `Set JAVA_HOME variable` 改为 `Will be installed on local hard drive`。
3. 将安装路径改为 `C:\Dev\zulu[Java版本]`。
4. 如果要用 Gradle：创建系统环境变量 `GRADLE_USER_HOME`，填入`C:\Dev\gradle`。

### Arch Linux
 [ArchWiki](https://wiki.archlinuxcn.org/wiki/Java) 查询需要的Java并安装。
::: info
可以使用 archlinux-java 切换正在使用Java。
```bash
sudo archlinux-java set [Java包名]
```
:::

## 检查安装
```bash
java --version
javac --version
```

有输出即为安装成功。