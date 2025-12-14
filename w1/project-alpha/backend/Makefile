.PHONY: test test-unit test-integration test-cov lint format type-check install-dev clean

# 安装开发依赖
install-dev:
	pip install -r requirements.txt

# 运行所有测试
test:
	pytest

# 运行单元测试
test-unit:
	pytest -m unit

# 运行集成测试
test-integration:
	pytest -m integration

# 运行测试并生成覆盖率报告
test-cov:
	pytest --cov=app --cov-report=html --cov-report=term

# 代码格式化
format:
	black app tests
	ruff check --fix app tests

# 代码检查
lint:
	ruff check app tests
	flake8 app tests

# 类型检查
type-check:
	mypy app

# 清理缓存
clean:
	find . -type d -name __pycache__ -exec rm -r {} +
	find . -type f -name "*.pyc" -delete
	find . -type d -name "*.egg-info" -exec rm -r {} +
	find . -type d -name ".pytest_cache" -exec rm -r {} +
	find . -type d -name ".mypy_cache" -exec rm -r {} +
	rm -rf htmlcov .coverage coverage.xml

