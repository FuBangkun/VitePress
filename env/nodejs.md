# NodeJS
## 安装
### Windows
1. 创建系统环境变量`PNPM_HOME`，填入`C:\Dev\Runtimes\pnpm`。
2. 下载[NodeJS](https://nodejs.org/zh-cn/download)，在下方的`或者获得适用于 Windows x64 平台的 Node.js® 构建。`里下载msi文件。
3. 将安装路径改为`C:\Dev\Runtimes\nodejs`。
4. 不要勾选`Tools for Native Modules`。
5. 剩下内容保持默认，完成安装。
6. 安装Pnpm
    ```powershell
    npm install -g pnpm
    ```

### Arch Linux
```bash
sudo pacman -S nodejs npm pnpm
``` 

## 检查安装
1. 检查NodeJS
    ```bash
    node --version
    ```

2. 检查Npm
    ```bash
    npm --version
    ```

3. 检查Pnpm
    ```bash
    pnpm --version
    ```

    有输出即为安装成功。

## 配置镜像源
```bash
npm config set registry https://registry.npmmirror.com
pnpm config set registry https://registry.npmmirror.com
```