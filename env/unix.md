# UNIX 工具链
## MSYS2（Windows必装）
用于在 Windows 下配置 Unix 工具链。

1. 打开[Msys2官网](https://www.msys2.org/)下载x86_64版本的Msys2并打开，如`msys2-x86_64-20251213.exe`。

2. 将安装路径改为`C:\Dev\msys64`。

3. 剩下内容保持默认，完成安装。

4. 在开始菜单里打开`MSYS2 UCRT64`应用。

5. 配置清华镜像源（加速下载）
    ```bash
    sed -i "s#https\?://mirror.msys2.org/#https://mirrors.tuna.tsinghua.edu.cn/msys2/#g" /etc/pacman.d/mirrorlist*
    ```

6. 更新包
   ```bash
   pacman -Syu
   ```

7. 配置环境变量
   在 PowerShell 中运行以下命令。

   ```powershell
   [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Dev\msys64\ucrt64\bin", "User")
   ```

8. 安装 Fish Shell
   ```bash
   pacman -S fish
   mkdir -p ~/.config/fish/{plugins,conf.d}
   nano ~/.config/fish/conf.d/fisher.fish
   ```

   添加以下内容

   ```
   set -g fisher_path ~/.config/fish/plugins

   set fish_complete_path $fish_complete_path[1] $fisher_path/completions $fish_complete_path[2..]
   set fish_function_path $fish_function_path[1] $fisher_path/functions $fish_function_path[2..]

   for file in $fisher_path/conf.d/*.fish
      source $file 2>/dev/null
   end
   ```

9. 在 Windows Terminal 中使用 Msys2
   打开 Windows Terminal → 标签栏下拉框 → 设置 → 左下角“打开 JSON 文件” → 在`list`中追加以下内容

   ```json
   "list": 
   [
      { 
         "commandline": "C:\\Dev\\msys64\\msys2_shell.cmd -defterm -here -no-start -ucrt64 -shell fish",
         "guid": "{fd57d26d-d3d0-448a-8bd5-e44632685d72}",
         "hidden": false,
         "icon": "C:\\Dev\\msys64\\ucrt64.ico",
         "name": "MSYS2 UCRT64",
         "startingDirectory": "C:\\Dev\\msys64\\home\\%USERNAME%"
      }
   ]
   ```

10. 安装 JetBrians Mono Nerd 字体
   下载 [JetBrians Mono Nerd 字体](https://github.com/ryanoasis/nerd-fonts/releases/download/v3.4.0/JetBrainsMono.zip)并安装。

   打开 Windows Terminal → 标签栏下拉框 → 设置 → `MSYS2 UCRT64` → 其他设置 → 外观 → 字体 → 选择 `JetBrainsMonoNL Nerd Font Propo`。

11. 安装 Tide
   在 Windows Terminal 里打开 `MSYS2 UCRT64`。

   ```bash
   curl -sL https://github.dpik.top/https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher
   fisher install IlanCosman/tide@v6
   ```

   按自己喜好配置 Tide 样式

## C/C++
### 安装
#### Windows
在 MSYS2 里运行以下命令：

```bash
pacman -S mingw-w64-ucrt-x86_64-gcc
```

#### Arch Linux
```bash
sudo pacman -S base-devel
```

### 与VS Code集成
不使用 VS Code 官方 C/C++ 扩展，推荐使用 Clangd（更强的静态分析）。

1. 安装 [VS Code](/env/ide#microsoft-visual-studio-code)

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
::: tip
如果无法运行uv，可能需要关闭Windows安全中心“应用和浏览器控制”中的“智能应用控制”。
:::

在MSYS2里运行以下命令：
```bash
pacman -S mingw-w64-ucrt-x86_64-python mingw-w64-ucrt-x86_64-python-uv
```

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
1. 安装 [VS Code](/env/ide#microsoft-visual-studio-code)

2. 安装扩展：`python`、`Code Runner`

3. 开启 `code-runner` 的 `runInTerminal` 设置

4. 命令面板 → `Python：选择解释器` → 选择 MSYS2 Python

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
在 MSYS2 里运行以下命令：
```bash
pacman -S mingw-w64-ucrt-x86_64-rust
```

#### Arch Linux
```bash
sudo pacman -S rust
```

### 配置 Cargo 镜像
::: warning
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

### 与VS Code集成
1. 安装[VS Code](/env/ide#microsoft-visual-studio-code)

2. 安装扩展：`rust-analyzer`、`Code Runner`

3. 开启 `code-runner` 的 `runInTerminal` 设置

4. 点击rs文件右上角的 `Run Code` 按钮运行


## Node.js
### 安装
#### Windows
在 MSYS2 里运行以下命令：

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