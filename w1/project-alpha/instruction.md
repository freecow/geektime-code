# Instructions

## project alpha需求及设计文档

构建一个简单的，使用标签分类和管理ticket的工具，它基于postgres数据库，使用Fast API作为后端，使用Typescript/Vite/Tailwind/Shadcn作为前端，无需用户系统，当前用户可以：

- 创建/编辑/删除/完成/取消完成ticket
- 添加/删除ticket的标签
- 按照不同的标签查看ticket列表
- 按title搜索ticket

按照这个想法，帮我生成详细的需求和设计文档，放在.specs/0001-spec.md文件中，输出为中文。

## implementation plan

按照./specs/0001-spec.md中的需求和设计文档，生成一个详细的实施计划，放在./specs/0002-implementation-plan.md文件中，输出为中文。

## phased implementation

按照./specs/0002-implementation-plan.md，完整实现这个项目的phase 1代码。

现在开发phase 2的全部功能

帮我根据rest client撰写一个test.rest文件，里面包含对所有支持的API的测试。

## seed sql
添加一个seed.sql，里面放50个meaningful的 ticket和几十个tags（包含platform tag如ios, project tag如viking，功能性tag如autocomplete，等等）。要求seed文件正确可以通过psql执行。

现在开发phase 3的所有任务

构建phase 4的所有任务

完成phase 5 & 6

## precommit & gh action
use pre-commit to init the config and setup precommit for python and typescript for this project, also setyp github action properly

## 优化UI

按照apple website的设计风格，think ultra hard，优化UI和UX
