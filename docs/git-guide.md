### Git 团队协作指南

#### 主要分支

在库中保留两个无限期的主要分支：**master** 和 **develop**

* origin/master：发布分支，该分支的代码保持为稳定可发布状态。原则上只通过合并来自 develop 分支的  Pull Request（后面简称为 PR） 进行更新。
* origin/develop：集成分支，所有「开发分支」上完成的任务通过自测后最终都要提交到 develop 分支，该分支的代码保持为最新状态，但该分支不能提交未完成的代码，所有未完成的任务只能在「开发分支」进行。

完成的任务提交到 develop 分支后，会发布到*测试环境*，测试通过后，任务执行人发起 PR，由验收同事将其 merge 到 master 分支。

#### 开发分支

相对于上面提到的两个主要分支，开发分支只具有短暂的生命周期，开发分支均由 origin/develop 分支为基础创建，并在完成分支内的任务后通过建立 PR merge 到 develop 分支，之后将该开发分支删除。

开发分支的命名规则为`开发者名字/功能名称（简述）`，如：`biallo/login`, `biallo/fix-countdown`

#### rebase 和 merge

如果你想要一个干净的，没有 merge commit 的线性历史树，那么你应该选择 git rebase
如果你想保留完整的历史记录，并且想要避免重写 commit history 的风险，你应该选择使用 git merge



示例：

```
# 使用 fetch 获取最新的 develop 代码
git fetch origin develop

# 切换分支到 develop
git checkout develop

# 从 develop 分支创建新的开发分支
git branch biallo/example
```



```
# 开发期间，如果有其他同事合并了与我的任务相关的代码到 develop 中
# 通过 rebase 来合并（使用 merge 的话，同事的 commit 信息也会归入到你的 branch 中）
git rebase origin/develop

# 如果在 rebase 期间发现了冲突
# 通过 status 查看冲突文件
git status

# 解决所有冲突后，使用 add
git add .

# 继续合并
git rebase --continue

# 如果冲突实在无法解决，可以放弃本次合并，代码将回到 rebase 之前的样子
git rebase --abort


# rebase 成功后，再 push 代码到远端仓库时，需要使用 --force
# 因为经过 rebase，commit 的历史已经发生了变化
# 注意：这个时候千万不要执行 pull
git push origin biallo/example --force
```



```
# commit 的标题遵照之前 .commitlintrc.js 中的规则来书写
# 分支开发完毕，提交到 origin
git push origin biallo/example

# 在 github 中基于 biallo/example 建立合并到 develop 的 PR
# github 中的 develop 和 master 分支设置有 protection rules，PR 至少有一个 approve 才能被合并
# 使用 squash merging 来合并 PR（当提交的 commit 过多时，可以在提交时删除意义不大的 commit 标题）
# 合并 PR 后，点击「Delete branch」按钮删除仓库中的开发分支

# 在本地中使用 branch -d 来删除已经完成使命的分支
git branch -d biallo/example

# 因为是多人协作，需要偶尔执行一下 prune
# 这篇介绍写得比较简单易懂 https://www.jianshu.com/p/884ff6252be5
git remote prune origin
```



