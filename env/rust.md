# Rust
## Windows
### 安装Visual Studio生成工具
#### 使用Visual Sudio
1. 安装 Visual Studio
2. 勾选`使用 C++ 的桌面开发`工作负载

#### 不使用Visual Sudio
1. 下载[适用于 C++ 的 Visual Studio 生成工具](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)
2. 勾选`使用 C++ 的桌面开发`工作负载

### 设置环境变量
1. 创建系统环境变量`RUSTUP_HOME`，填入`C:\Dev\Runtimes\rust`。
2. 创建系统环境变量`CARGO_HOME`，填入`C:\Dev\Runtimes\cargo`。
3. 创建系统环境变量`RUSTUP_DIST_SERVER`，填入`https://mirrors.tuna.tsinghua.edu.cn/rustup`。
4. 创建系统环境变量`RUSTUP_UPDATE_ROOT`，填入`https://mirrors.tuna.tsinghua.edu.cn/rustup/rustup`。

### 配置Cargo镜像
编辑`C:\Dev\Runtimes\cargo\config.toml`为以下内容

```toml
[source.crates-io]
replace-with = 'mirror'

[source.mirror]
registry = "sparse+https://mirrors.aliyun.com/crates.io-index/"
```

### 安装Rust
1. 下载[Rust](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe)。
2. 输入`1`安装。

### 检查安装
1. 检查Rust
    ```powershell
    rust --version
    ```

    有输出即为安装成功

2. 检查Cargo
    ```powershell
    cargo --version
    ```

    有输出即为安装成功

## Arch Linux
```bash
sudo pacman -S rust
```

### 配置Cargo镜像
```bash
mkdir ~/.cargo
nano ~/.cargo/config.toml
```

添加以下内容

```toml
[source.crates-io]
replace-with = 'mirror'

[source.mirror]
registry = "sparse+https://mirrors.aliyun.com/crates.io-index/"
```

### 检查安装
1. 检查Rust
    ```powershell
    rust --version
    ```

    有输出即为安装成功

2. 检查Cargo
    ```powershell
    cargo --version
    ```

    有输出即为安装成功