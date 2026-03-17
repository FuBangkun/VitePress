# Python
Python官方的安装包不方便管理，这里推荐Miniconda3。

## 安装
### Windows
1. 下载[Miniconda3](https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-latest-Windows-x86_64.exe)。
2. 选择为所有用户安装。
3. 将安装路径改为`C:\Dev\Runtimes\miniconda3`。
4. 勾选`Register Miniconda3 as the system Python`。
5. 剩下内容保持默认，完成安装。
6. 在系统环境变量`Path`里添加`C:\Dev\Runtimes\miniconda3`、`C:\Dev\Runtimes\miniconda3\Scripts`和`C:\Dev\Runtimes\miniconda3\Library\bin`。

:::warning
如果你也安装了Msys2，请将Msys2的环境变量放在Miniconda3后面，否则将会使用Msys2的Python。
:::

### Arch Linux
```bash
paru -S miniconda3
```

## 配置Miniconda3镜像源
```bash
conda config --add channels conda-forge
conda config --set channel_priority flexible
conda config --set auto_activate false
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch
conda config --set show_channel_urls yes
conda clean -i
```

## 检查安装
```bash
python --version
```

有输出即为安装成功

## 与VS Code集成
1. 请先安装好[VS Code](/env/ide#microsoft-visual-studio-code)。
2. 安装`python`和`Code Runner`扩展。
3. 将`code-runner`扩展的`runInTerminal`设置开启。
4. 打开命令面板，选择`Python：选择解释器`，选择miniconda3的python
5. 点击Python文件右上角的`Run Code`按钮即可运行。