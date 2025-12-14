# 贡献指南

感谢你对 Project Alpha 项目的兴趣！

## 开发环境设置

### 后端

```bash
cd backend

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件

# 运行测试
pytest
```

### 前端

```bash
cd frontend

# 安装依赖
npm install

# 配置环境变量
echo "VITE_API_BASE_URL=http://localhost:8000/api/v1" > .env.local

# 运行开发服务器
npm run dev
```

## 代码规范

### 后端

- 使用 Black 格式化代码
- 使用 Ruff 和 Flake8 检查代码
- 使用 MyPy 进行类型检查
- 遵循 PEP 8 规范

```bash
make format    # 格式化代码
make lint      # 代码检查
make type-check # 类型检查
```

### 前端

- 使用 ESLint 检查代码
- 使用 TypeScript 进行类型检查
- 遵循 React 最佳实践

```bash
npm run lint        # 代码检查
npm run lint:fix    # 自动修复
npm run type-check  # 类型检查
```

## 提交代码

1. 创建功能分支
2. 编写代码和测试
3. 确保所有测试通过
4. 确保代码检查通过
5. 提交 Pull Request

## 测试

在提交代码前，请确保：

- ✅ 所有测试通过
- ✅ 代码检查通过
- ✅ 类型检查通过
- ✅ 添加了新功能的测试

## 问题报告

如果发现问题，请创建 Issue 并包含：

- 问题描述
- 重现步骤
- 预期行为
- 实际行为
- 环境信息

