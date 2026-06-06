# 开发环境配置

## Scoop 安装（Windows 必装）

Scoop 是 Windows 下的命令行包管理器。

1. 打开 PowerShell（建议以管理员身份运行），设置执行策略：

   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. 安装 Scoop：

   ```powershell
   Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
   ```

3. 添加必要 bucket：

   ```powershell
   scoop bucket add main
   scoop bucket add extras
   scoop bucket add versions
   scoop bucket add java
   ```

## Git

### 安装

#### Windows
```powershell
scoop install git
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
scoop install gcc
```

#### Arch Linux
```bash
sudo pacman -S base-devel
```

### 与 VS Code 集成

不使用 VS Code 官方 C/C++ 扩展，推荐使用 Clangd（更强的静态分析）。

1. 安装 [VS Code](/env/ide#microsoft-visual-studio-code)

2. 安装扩展：`clangd`、`Code Runner`

3. 安装 Clangd 本体
   - Windows
     ```powershell
     scoop install clangd
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
scoop install uv
uv python install
```

#### Arch Linux
```bash
sudo pacman -S uv
```

### 配置 UV 镜像源

#### Windows
```powershell
mkdir -p ~/.config/uv
echo @"
[registries.tuna]
index = "https://pypi.tuna.tsinghua.edu.cn/simple/"
"@ > ~/.config/uv/config.toml
```

#### Arch Linux
```bash
mkdir -p ~/.config/uv && echo -e '[registries.tuna]\nindex = "https://pypi.tuna.tsinghua.edu.cn/simple/"' > ~/.config/uv/config.toml
```

### 与 VS Code 集成

1. 安装 [VS Code](/env/ide#microsoft-visual-studio-code)

2. 安装扩展：`python`、`Code Runner`

3. 开启 `code-runner` 的 `runInTerminal` 设置

4. 命令面板 → `Python：选择解释器` → 选择 Scoop Python

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
scoop install rust
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

### 检查安装
```bash
rustc --version
cargo --version
```

有输出即为安装成功

### 与 VS Code 集成

1. 安装 [VS Code](/env/ide#microsoft-visual-studio-code)

2. 安装扩展：`rust-analyzer`、`Code Runner`

3. 开启 `code-runner` 的 `runInTerminal` 设置

4. 点击 rs 文件右上角的 `Run Code` 按钮运行

## Node.js

### 安装

#### Windows
```powershell
scoop install nodejs
scoop install pnpm
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
scoop install go
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
scoop install zulu25-jdk
```

#### Arch Linux
```bash
paru -S zulu-25-bin
```

### 配置环境变量

#### Windows
在 PowerShell 中运行以下命令：

```powershell
[Environment]::SetEnvironmentVariable("JAVA_HOME", "$env:USERPROFILE\scoop\apps\zulu25-jdk\current", "User")
$path = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$path;%JAVA_HOME%\bin", "User")
```

### 检查安装
```bash
java --version
javac --version
```

有输出即为安装成功

## Kotlin

### Windows
```powershell
scoop install kotlin
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