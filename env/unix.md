# UNIX系
## MSYS2（Windows必装）
用于在Windows下配置Linux形式的开发环境。

1. 打开[Msys2官网](https://www.msys2.org/)下载x86_64版本的Msys2并打开，如`msys2-x86_64-20251213.exe`。
2. 将安装路径改为`C:\Dev\Runtimes\msys64`。
3. 剩下内容保持默认，完成安装。
4. 在开始菜单里打开`MSYS2 UCRT64`应用。
5. 配置清华镜像源（加速下载）
    ```bash
    sed -i "s#https\?://mirror.msys2.org/#https://mirrors.tuna.tsinghua.edu.cn/msys2/#g" /etc/pacman.d/mirrorlist*
    ```
6. 配置系统环境变量
   在系统环境变量`Path`里添加`C:\Dev\Runtimes\msys64\ucrt64\bin`
7. 更新Msys2包
   ```bash
   pacman -Syu
   ```

## C/C++
### 安装
#### Windows
在MSYS2里运行以下命令：
```bash
pacman -S mingw-w64-ucrt-x86_64-gcc
```

#### Arch Linux
```bash
sudo pacman -S base-devel
```

### 与VS Code集成
不使用 VS Code 官方 C/C++ 扩展，推荐使用 Clangd（更强的静态分析）。

1. 安装[VS Code](/env/ide#microsoft-visual-studio-code)
2. 安装扩展：`clangd`、`Code Runner`
3. 安装 Clangd 本体
   - Windows（MSYS2 中执行）
     ```bash
     pacman -S mingw-w64-ucrt-x86_64-clang-tools-extra
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
6. 点击cpp文件右上角的 `Run Code` 按钮运行

### 检查安装
```bash
gcc --version
```
有输出即为安装成功

## Python
使用 uv 作为包管理器（比官方 pip 更快、更易管理）

### 安装
#### Windows
在MSYS2里运行以下命令：
```bash
pacman -S mingw-w64-ucrt-x86_64-python mingw-w64-ucrt-x86_64-python-uv
```

:::info
如果无法运行uv，可能需要关闭Windows安全中心“应用和浏览器控制”中的“智能应用控制”。
:::

#### Arch Linux
```bash
sudo pacman -S uv
```

### 配置 UV 镜像源
```bash
uv config set pypi.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
uv config set python.index-url https://mirrors.tuna.tsinghua.edu.cn/python/
```

### 与VS Code集成
1. 安装[VS Code](/env/ide#microsoft-visual-studio-code)
2. 安装扩展：`python`、`Code Runner`
3. 开启 `code-runner` 的 `runInTerminal` 设置
4. 命令面板 → `Python：选择解释器` → 选择 MSYS2 Python
5. 点击py文件右上角的 `Run Code` 按钮运行

### 检查安装
```bash
python --version
uv --version
```
有输出即为安装成功

## Rust
### 安装
#### Windows
在MSYS2里运行以下命令：
```bash
pacman -S mingw-w64-ucrt-x86_64-rust
```

#### Arch Linux
```bash
sudo pacman -S rust
```

### 配置 Cargo 镜像
:::warning
Windows 需在 `MSYS2 UCRT64` 中执行
:::
```bash
mkdir -p ~/.cargo && echo -e '[source.crates-io]\nreplace-with = "mirror"\n[source.mirror]\nregistry = "sparse+https://mirrors.aliyun.com/crates.io-index/"' > ~/.cargo/config.toml
```

### 检查安装
```bash
rustc --version
cargo --version
```
有输出即为安装成功

## 与VS Code集成
1. 安装[VS Code](/env/ide#microsoft-visual-studio-code)
2. 安装扩展：`rust-analyzer`、`Code Runner`
3. 开启 `code-runner` 的 `runInTerminal` 设置
4. 点击rs文件右上角的 `Run Code` 按钮运行

## Node.js
### 安装
#### Windows
在MSYS2里运行以下命令：
```bash
pacman -S mingw-w64-ucrt-x86_64-nodejs
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