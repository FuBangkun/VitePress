# 介绍

Arch Linux 是一种通用操作系统，它是基于 x86-64 架构的一类 GNU/Linux 发行版。

Arch Linux 采用滚动升级模式，尽全力为用户提供最新的稳定版软件。初始安装完成的 Arch Linux
只是一个基本系统，随后用户可以根据自己的喜好安装需要的软件并配置成符合自己理想的个性化系统。

[Arch Wiki](https://wiki.archlinuxcn.org/wiki/首页) 是一个由社区驱动的 Arch Linux 知识库，在阅读此教程时请顺便参考 Arch
Wiki。

## Linux

Linux，一般指 GNU/Linux（单独的 Linux 内核并不可直接使用，一般搭配 GNU 套件，故得此称呼），是一种免费使用和自由传播的类 UNIX
操作系统，其内核由林纳斯·托瓦兹（Linus Torvalds）于 1991 年 10 月 5 日首次发布，是一个基于 POSIX 的多用户、多任务、支持多线程和多
CPU 的操作系统。

Linux 继承了 Unix 以网络为核心的设计思想，是一个性能稳定的多用户网络操作系统。它有上百种不同的发行版，如基于社区开发的 Debian、Arch
Linux，和基于商业开发的 Red Hat Enterprise Linux、SUSE 等。

## Arch Linux 的特点

[Arch Wiki](https://wiki.archlinuxcn.org/wiki/Arch_Linux) 上有对以下特点的完整论述，这里只提炼与后续教程相关的部分：

- **简洁**：避免任何不必要的添加、修改和复杂化。软件包来自上游原始开发者，仅做发行版必须的最小修改；安装软件包后不会自动启动其服务，官方也不提供图形化配置界面，建议用命令行或文本编辑器修改设置。
- **现代化**：尽力使软件处于最新的稳定版本，只要没有出现系统软件包损坏，都会尽量使用最新版本，采用滚动更新，安装后可持续更新整个系统。
- **实用性**：注重实用性、避免意识形态之争，仓库中既提供开源自由的软件，也提供闭源软件。
- **以用户为中心**：为满足贡献者的需求而存在，适合乐于自己动手、愿意花时间阅读文档解决问题的用户，也鼓励每个用户参与和贡献。
- **通用性**：初始安装仅提供命令行环境，用户从官方仓库成千上万的高质量软件包中自行选择、搭建自己的系统，目前支持 x86-64 架构。

## 包管理

Pacman 包管理系统实现系统和软件包的滚动升级。Arch Linux 还提供一个类似 ports 的包构建系统（Arch Build
System），可以从源码构建和安装软件包，并用一个命令完成同步，你甚至可以用一个命令重新构建整个系统。

Arch 还提供 Arch 用户仓库（AUR），它包含了成千上万个由用户自行维护的 PKGBUILD 脚本，配合 makepkg
工具，从编译到打包一气呵成，你还能轻松构建和维护属于自己的自定义软件源。后面的[安装教程](/linux/install.md#配置-aur)会用到它。

## 重要概念

- Linux 目录结构

  Linux 的目录是由 `/` 左斜杠开头的树状结构，所以 `/` 被称为根目录（root 目录）。例如 `/home` 就是根目录下的 home 目录，
  `/home/fubangkun` 就是根目录下的 home 目录里面的 fubangkun 目录。

- 挂载

  意思是把硬盘分区对应到某个目录。

- 挂载点（Mount Point）

  假设把 `/dev/nvme0n1` 这个设备挂载到 `/mnt` 目录，那就称 `/dev/nvme0n1` 的挂载点为 `/mnt`。

- [文件系统](https://wiki.archlinuxcn.org/wiki/文件系统)

  文件系统决定了文件的存放和检索方式，不同的文件系统有不同的功能和特性。此教程使用 xfs 文件系统，最大的特点性能强大。

- [BootLoader 引导程序](https://wiki.archlinuxcn.org/wiki/Arch_的启动流程)

  引导程序，用来引导系统启动。常用的有 grub、systemd-boot、rEFInd 等，此教程使用 rEFInd，因为它会搜索所有硬盘下的引导分区。

- [EFI 系统分区](https://wiki.archlinuxcn.org/wiki/EFI_系统分区)（ESP）

  一个特殊的分区，用于存放 `.efi` 文件，这是启动系统的“第一把钥匙”，文件系统必须是 FAT。

  常用挂载点为 `/boot`、`/boot/efi` 和 `/efi`。`/boot` 是最典型的挂载点，很多 BootLoader 程序只有 ESP 挂载点为 `/boot`
  时才能正常工作，但是 `/boot` 存放着系统启动和初始化相关的文件，需要分配较大空间。`/boot/efi` 和 `/efi` 没有这个问题。
