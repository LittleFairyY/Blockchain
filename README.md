## Requirements

## 环境要求
nodejs 10.16.0

## 依赖

```shell
yarn
```

## 开发

```shell
yarn dev
```

## 打包测试版本
```shell
yarn beta
```

## 打包正式版本

```shell
yarn prod
```

## 打包测试版并推送到 deploy 仓库
将打包后的 dist 目录推送到 deploy 项目的 beta 分支
```shell
yarn pub-beta
```

## 打包正式版并推送到 deploy 仓库
将打包后的 dist 目录推送到 deploy 项目的 master 分支
```shell
yarn pub
```

deploy 项目 [account-center-fe-deploy](https://github.com/lomocoin/account-center-fe-deploy)


## API 文档

- management: https://xstardev.jios.org:30070/swagger-ui.html

##
- 翻译: https://docs.google.com/spreadsheets/d/1ajodq7dxWZIuH0nmOUb0kbn3kaeTSRd0BF-zA1neSRE/edit#gid=0


## 指南文档

- 看板用法指南: [board-guide.md](docs/board-guide.md)
- 代码风格指南: [code-guide.md](docs/code-guide.md)
- Git 团队协作指南: [git-guide.md](docs/git-guide.md)
- 代码版本号规则: [version-guide.md](docs/version-guide.md)
