# Git

## 安装Git
1. 打开[Git官网](https://git-scm.com/install/windows)并下载`Git for Windows/x64 Setup`。
2. `Chossing the default editor used by Git`里选择`Use Visual Studio Code as Git's default editor`。
3. `Adjusting the name of the initial branch in new repositories`里选择`Override the default branch name for new repositories` 。
4. `Configuring the terminal emulator to use with Git Bash`里选择`Use Windows' default console window`。

## 配置信息
1. 设置用户名，建议与GitHub用户名一致。
    ```powershell
    git config --global user.name "[用户名]"
    ```

2. 设置邮箱，建议与GitHub邮箱一致。
    ```powershell
    git config --global user.email "[用户名]"
    ```

## 常用命令
以下命令可以在集成开发环境里可视化操作。

### 创建仓库

1. 打开Git命令行，进入要作为仓库的文件夹（如桌面创建「GitTest」文件夹）：
cd 文件夹路径（如cd Desktop/GitTest，Windows需注意路径分隔符为/）；

2. 输入初始化命令：git init；

3. 操作反馈：命令行提示「Initialized empty Git repository in ...」，表示仓库创建成功（文件夹内会生成隐藏的.git文件夹，无需手动操作）。

### 添加文件到仓库

1. 在仓库文件夹（GitTest）中，创建一个测试文件（如test.txt，可在文件夹中手动创建，或用命令创建：touch test.txt）；

2. 输入命令（将文件添加到暂存区）：git add test.txt（单个文件）；
若添加所有文件：git add .（注意末尾有空格，适合多文件修改）；

3. 验证添加：输入命令「git status」，提示「Changes to be committed:」，且文件名为绿色，即为添加成功。

> **提示：**如果仓库包含.gitignore文件，那么其指定的文件或文件夹不会被添加，可以避免冗余文件（如临时文件、依赖包、IDE配置文件）占用仓库空间，同时保持仓库整洁。

### 提交文件到仓库

1. 输入提交命令：git commit -m "提交说明"（提交说明必须写，简洁明了，如git commit -m "创建test.txt测试文件"）；

2. 操作反馈：命令行提示「1 file changed, 0 insertions(+), 0 deletions(-)」，表示提交成功，此时文件修改已记录到本地仓库。

> **注意：**每次修改文件后，需重复「git add → git commit」步骤，才能记录版本。

### 查看提交历史

当提交多次后，可查看所有历史版本，操作命令：git log；

操作反馈：显示每次提交的版本号（Commit ID）、提交人、提交时间、提交说明，按「q」键退出查看。

### 查看当前分支

命令：git branch；
反馈：默认只有一个主分支「main」（或master），分支前带「*」表示当前所在分支。

### 创建并切换分支

命令：git checkout -b 分支名（如git checkout -b feature/test，分支名自定义，建议见名知意）；

反馈：提示「Switched to a new branch 'feature/test'」，表示分支创建并切换成功，此时操作的文件都在该分支下。

### 切换回主分支

命令：git checkout main（若主分支是master，输入git checkout master）；

反馈：提示「Switched to branch 'main'」，即为切换成功。

### 合并分支（将新分支修改合并到主分支）

1. 先切换到主分支：git checkout main；

2. 输入合并命令：git merge 分支名（如git merge feature/test）；

3. 反馈：提示「Updating ...」，无报错即合并成功，新分支的修改会同步到主分支。

### 删除分支（合并后可删除，避免杂乱）

命令：git branch -d 分支名（如git branch -d feature/test）；

反馈：提示「Deleted branch feature/test (was ...)」，即为删除成功。

### 版本回滚

当修改错误、删错文件时，可回滚到之前的历史版本，步骤如下：

1. 查看提交历史，复制需要回滚的版本号（Commit ID，无需复制完整，前6位即可）：git log；

2. 输入回滚命令：git reset --hard 版本号（如git reset --hard a1b2c3）；

3. 反馈：提示「HEAD is now at a1b2c3 提交说明」，即为回滚成功，文件会恢复到该版本的状态。

注意：回滚后，当前版本之后的提交记录会消失，操作前建议确认版本号。

### 关联GitHub远程仓库

1. 先在GitHub上创建一个仓库（步骤简化：登录GitHub→右上角「+」→New repository→填写仓库名→勾选Initialize with a README→Create repository）；

2. 复制GitHub仓库地址：进入仓库主页→点击「Code」→复制HTTPS地址（如https://github.com/test123/GitTest.git）；

3. 回到Git命令行，进入本地仓库，输入关联命令：git remote add origin 仓库地址（如git remote add origin https://github.com/test123/GitTest.git）；

4. 验证关联：输入命令「git remote -v」，显示origin对应的仓库地址，即为关联成功。

### 本地代码推送到GitHub

1. 确保本地仓库有提交记录（已完成git add和git commit）；

2. 输入推送命令：git push -u origin main（若主分支是master，输入git push -u origin master）；

3. 首次推送：会弹出登录窗口，输入GitHub账号和密码（或验证令牌），登录后即可开始推送；

4. 操作反馈：提示「1 file changed, 0 insertions(+), 0 deletions(-)」，推送成功后，刷新GitHub仓库主页，可看到本地文件已同步。

### 从GitHub拉取代码

当他人修改了远程仓库代码，需同步到本地，命令：git pull origin main（主分支对应main/master）；

反馈：无报错即拉取成功，本地文件会同步远程仓库的最新内容。