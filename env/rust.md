# Rust
## 配置Cargo镜像
编辑

- Windows：`C:\Dev\Runtimes\cargo\config.toml`
- Linux： `~/.cargo/config.toml`

为以下内容

```toml
[source.crates-io]
replace-with = 'mirror'

[source.mirror]
registry = "sparse+https://mirrors.aliyun.com/crates.io-index/"
```

## 安装
### Windows
1. 安装 [Microsoft Visual Studio](/env/ide#microsoft-visual-studio)
2. 勾选`使用 C++ 的桌面开发`工作负载并安装
3. 创建系统环境变量`RUSTUP_HOME`，填入`C:\Dev\Runtimes\rust`。
4. 创建系统环境变量`CARGO_HOME`，填入`C:\Dev\Runtimes\cargo`。
5. 创建系统环境变量`RUSTUP_DIST_SERVER`，填入`https://mirrors.tuna.tsinghua.edu.cn/rustup`。
6. 创建系统环境变量`RUSTUP_UPDATE_ROOT`，填入`https://mirrors.tuna.tsinghua.edu.cn/rustup/rustup`。
7. 下载[Rust](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe)。
8. 输入`1`安装。

### Arch Linux
```bash
sudo pacman -S rust
```

## 检查安装
1. 检查Rust
    ```bash
    rust --version
    ```

2. 检查Cargo
    ```bash
    cargo --version
    ```

    有输出即为安装成功