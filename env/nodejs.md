# NodeJS
## Windows
### 设置环境变量
1. 创建系统环境变量`PNPM_HOME`，填入`C:\Dev\Runtimes\pnpm`。

### 安装NodeJS
1. 打开[NodeJS下载界面](https://nodejs.org/zh-cn/download)，在下方的`或者获得适用于 Windows x64 平台的 Node.js® 构建。`里下载msi文件。
2. 将安装路径改为`C:\Dev\Runtimes\nodejs`。
3. 不要勾选`Tools for Native Modules`。
4. 剩下内容保持默认，完成安装。

### 检查安装
1. 检查Nodejs
    ```powershell
    node --version
    ```

    有输出即为安装成功。

2. 检查Npm
    ```powershell
    npm --version
    ```

    有输出即为安装成功。

### 安装PNPM
pnpm是npm的优化版本

```powershell
npm install -g pnpm
```

#### 检查安装
```powershell
pnpm --version
```

有输出即为安装成功。

### 配置镜像源
```powershell
npm config set registry https://registry.npmmirror.com
pnpm config set registry https://registry.npmmirror.com
```