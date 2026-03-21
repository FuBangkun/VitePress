# 集成开发环境
## 集成开发环境选择
单文件和轻量开发一律 Microsoft Visual Studio Code，以下为复杂项目开发：
- **C/C++**：MSVC 用 Visual Studio，GCC和 Clang 用 CLion。
- **Java**: IntelliJ IDEA。
- **C#/.NET**：Microsoft Visual Studio。
- **Python**：PyCharm。
- **Node.js**：WebStorm。
- **Rust**：RustRover。

## Microsoft Visual Studio Code
功能强大的文本编辑器，主流选择。

### 安装
下载[VSCode](https://code.visualstudio.com/Download)，请选择`System Installer`版本。

将安装路径改为`C:\Dev\MicrosoftVSCode`。

### 插件推荐
- **Error Lens**：将编译器报错直接显示在代码行末。

## JetBrains全家桶
- [IntelliJ IDEA](https://www.jetbrains.com.cn/idea/)：适用于 Java 和 Kotlin 的 IDE。
- [PyCharm](https://www.jetbrains.com.cn/pycharm/)：适用于 Python 的 IDE。
- [DataGrip](https://www.jetbrains.com.cn/datagrip/)：适用于多个数据库的工具。
- [WebStorm](https://www.jetbrains.com.cn/webstorm/)：适用于 JavaScript 的 IDE。
- [Rider](https://www.jetbrains.com.cn/rider/)：适用于 .NET 和游戏开发的 IDE。
- [CLion](https://www.jetbrains.com.cn/clion/)：适用于 C/C++ 的 IDE。
- [RustRover](https://www.jetbrains.com.cn/rust/)：适用于 Rust 的 IDE。

将安装路径改为`C:\Dev\[软件名，不带版本号]`。

## Microsoft Visual Studio
适用于 C/C++ 和 C#/.NET 的 IDE

### 安装
下载 [Visual Studio Installer](https://visualstudio.microsoft.com/zh-hans/vs/)。

打开 Visual Studio Installer 选择自己需要的 Visual Studio 和工作负载安装。

在`安装位置`里：
- 将`产品`改为 `C:\Dev\VisualStudioCommunity`。
- 将`下载缓存`改为 `C:\Dev\VisualStudio\Packages`。
- 将`共享组件、工具和 SDK`改为 `C:\Dev\VisualStudio\Shared`。

需要自行添加桌面图标。