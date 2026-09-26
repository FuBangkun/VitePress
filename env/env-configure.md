# 开发环境配置

本文是速查手册，只列安装命令和关键配置，默认你已有基础使用经验。

## Winget 安装（Windows 必装）

Winget 是 Windows 官方的命令行包管理器，Windows 10 1809 及以上的系统一般自带。

1. 打开 PowerShell 或终端，检查安装：

   ```powershell
   winget --version
   ```

有输出即为安装成功；没有则在 Microsoft Store 搜索「应用安装程序（App Installer）」安装。

## Git

### 安装

#### Windows

```powershell
winget install --id Git.Git -e
```

#### Arch Linux

```bash
sudo pacman -S git
```

### 配置信息

1. 设置用户名，建议与 GitHub 用户名一致：

   ```bash
   git config --global user.name "[用户名]"
   ```

2. 设置邮箱，建议与 GitHub 邮箱一致：

   ```bash
   git config --global user.email "[邮箱]"
   ```

3. 设置默认分支为 `main`：

   ```bash
   git config --global init.defaultBranch main
   ```

4. 配置全局代理（可选）：

   ```bash
   git config --global http.proxy "http://127.0.0.1:30000"
   git config --global https.proxy "http://127.0.0.1:30000"
   ```

## C/C++

### 安装

#### Windows

```powershell
winget install --id BrechtSanders.WinLibs.MCF.UCRT -e
```

#### Arch Linux

```bash
sudo pacman -S base-devel
```

### 与 VS Code 集成

不使用 VS Code 官方 C/C++ 扩展，推荐使用 Clangd（更强的静态分析）。

1. 安装 [VS Code](/env/ide.md#microsoft-visual-studio-code)

2. 安装扩展：`clangd`、`Code Runner`

3. 安装 Clangd 本体

  - Windows
    ```powershell
    winget install --id LLVM.LLVM -e
    ```
  - Arch Linux
    ```bash
    sudo pacman -S clangd
    ```

4. 开启 `code-runner` 的 `runInTerminal` 设置

5. 修改 `executorMap` 中 `cpp` 配置：
   ```
   cd $dir && g++ $fileName -std=c++14 -O2 -o $fileNameWithoutExt && $dir$fileNameWithoutExt
   ```

6. 点击 cpp 文件右上角的 `Run Code` 按钮运行

### 检查安装

```bash
gcc --version
```

有输出即为安装成功

## Python

使用 uv 作为包管理器（比官方 pip 更快、更易管理）

### 安装

#### Windows

```powershell
winget install --id astral-sh.uv -e
uv python install
```

#### Arch Linux

```bash
sudo pacman -S uv
```

### 配置 uv 镜像源

#### Windows

```powershell
mkdir -p $env:APPDATA\uv
echo @"
[[index]]
url = "https://pypi.tuna.tsinghua.edu.cn/simple/"
default = true
"@ > $env:APPDATA\uv\uv.toml
```

#### Arch Linux

```bash
mkdir -p ~/.config/uv && printf '[[index]]\nurl = "https://pypi.tuna.tsinghua.edu.cn/simple/"\ndefault = true\n' > ~/.config/uv/uv.toml
```

### 与 VS Code 集成

1. 安装 [VS Code](/env/ide.md#microsoft-visual-studio-code)

2. 安装扩展：`python`、`Code Runner`

3. 开启 `code-runner` 的 `runInTerminal` 设置

4. 命令面板 → `Python：选择解释器` → 选择 uv 安装的 Python 解释器

5. 点击 py 文件右上角的 `Run Code` 按钮运行

### 检查安装

```bash
python --version
uv --version
```

有输出即为安装成功

## Rust

### 安装

#### Windows

```powershell
winget install --id Rustlang.Rustup -e
```

#### Arch Linux

```bash
sudo pacman -S rust
```

### 配置 Cargo 镜像

#### Windows

```powershell
mkdir -p ~/.cargo
echo @"
[source.crates-io]
replace-with = "mirror"

[source.mirror]
registry = "sparse+https://mirrors.aliyun.com/crates.io-index/"
"@ > ~/.cargo/config.toml
```

#### Arch Linux

```bash
mkdir -p ~/.cargo && echo -e '[source.crates-io]\nreplace-with = "mirror"\n[source.mirror]\nregistry = "sparse+https://mirrors.aliyun.com/crates.io-index/"' > ~/.cargo/config.toml
```

### 与 VS Code 集成

1. 安装 [VS Code](/env/ide.md#microsoft-visual-studio-code)

2. 安装扩展：`rust-analyzer`、`Code Runner`

3. 开启 `code-runner` 的 `runInTerminal` 设置

4. 点击 rs 文件右上角的 `Run Code` 按钮运行

### 检查安装

```bash
rustc --version
cargo --version
```

有输出即为安装成功

## Node.js

### 安装

#### Windows

```powershell
winget install --id OpenJS.NodeJS -e
npm install -g pnpm
```

#### Arch Linux

```bash
sudo pacman -S nodejs npm pnpm
```

### 配置镜像源

```bash
npm config set registry https://registry.npmmirror.com
pnpm config set registry https://registry.npmmirror.com
```

### 检查安装

```bash
node --version
npm --version
pnpm --version
```

有输出即为安装成功

## Go

### 安装

#### Windows

```powershell
winget install --id GoLang.Go -e
```

#### Arch Linux

```bash
sudo pacman -S go
```

### 配置镜像源

#### Windows

```powershell
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

#### Arch Linux

```bash
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

### 检查安装

```bash
go version
```

有输出即为安装成功

## Java

### 安装

#### Windows

```powershell
winget install --id Azul.Zulu.25.JDK -e
```

#### Arch Linux

```bash
paru -S zulu-25-bin
```

### 配置环境变量

#### Windows

在 PowerShell 中运行以下命令（默认安装目录为 `C:\Program Files\Zulu\zulu-25`，如有出入请以实际目录为准）：

```powershell
[Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Zulu\zulu-25", "User")
$path = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$path;C:\Program Files\Zulu\zulu-25\bin", "User")
```

### 检查安装

```bash
java --version
javac --version
```

有输出即为安装成功

## Kotlin

### Windows

Kotlin 依赖 JDK，请先完成上面的 Java 安装。

```powershell
winget install --id Kotlin.Kotlin -e
```

### Arch Linux

```bash
sudo pacman -S kotlin
```

### 检查安装

```bash
kotlin -version
```

有输出即为安装成功
