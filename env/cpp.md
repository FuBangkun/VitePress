# C/C++
## 安装
### Windows
Windows上 C/C++ 的编译器有很多，这里选择方便管理的Msys2。

1. 打开[Msys2官网](https://www.msys2.org/)下载x86_64版本的Msys2并打开，如`msys2-x86_64-20251213.exe`。
2. 将安装路径改为`C:\Dev\Runtimes\msys64`。
3. 剩下内容保持默认，完成安装。
4. 在开始菜单里打开`MSYS2 MSYS`应用。
5. 将镜像改为清华源。
    ```bash
    sed -i "s#https\?://mirror.msys2.org/#https://mirrors.tuna.tsinghua.edu.cn/msys2/#g" /etc/pacman.d/mirrorlist*
    ```
6. 安装GCC编译器。
    ```bash
    pacman -S mingw-w64-ucrt-x86_64-gcc
    ```
7. 在系统环境变量`Path`里添加`C:\Dev\Runtimes\msys64\ucrt64\bin`

### Arch Linux
```bash
sudo pacman -S base-devel
```

## 与VS Code集成
这里不使用VS Code官方的C/C++扩展，因为Clangd的静态分析更好。

1. 请先安装好[VS Code](/env/ide#microsoft-visual-studio-code)。
2. 安装`clangd`和`Code Runner`扩展。
3. 安装Clangd。
    - Windows
        在开始菜单里打开`MSYS2 MSYS`应用。

        ```bash
        pacman -S mingw-w64-ucrt-x86_64-clang-tools-extra
        ```

    - Arch Linux
        ```bash
        sudo pacman -S clangd
        ```

4. 将`code-runner`扩展的`runInTerminal`设置开启。
5. 编辑`code-runner`扩展的`executorMap`设置里的`cpp`为`cd $dir && g++ $fileName -std=c++14 -O2 -o $fileNameWithoutExt && $dir$fileNameWithoutExt`。
6. 点击C++文件右上角的`Run Code`按钮即可运行。

## 检查安装
```powershell
gcc --version
```

有输出即为安装成功