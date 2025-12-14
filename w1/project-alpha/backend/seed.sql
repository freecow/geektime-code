-- Project Alpha Seed Data
-- 包含 50 个有意义的 tickets 和多个分类的 tags
-- 执行方式: psql -d your_database_name -f seed.sql

-- 清理现有数据（可选，谨慎使用）
-- TRUNCATE TABLE ticket_tags CASCADE;
-- TRUNCATE TABLE tickets CASCADE;
-- TRUNCATE TABLE tags CASCADE;

-- ============================================
-- 插入 Tags
-- ============================================

-- Platform Tags (平台标签)
INSERT INTO tags (name, color, created_at) VALUES
('ios', '#000000', NOW()),
('android', '#3DDC84', NOW()),
('web', '#4285F4', NOW()),
('desktop', '#0078D4', NOW()),
('api', '#FF6B6B', NOW()),
('backend', '#4ECDC4', NOW()),
('frontend', '#95E1D3', NOW());

-- Project Tags (项目标签)
INSERT INTO tags (name, color, created_at) VALUES
('viking', '#8B4513', NOW()),
('odin', '#1E3A8A', NOW()),
('thor', '#DC2626', NOW()),
('loki', '#059669', NOW()),
('valhalla', '#7C3AED', NOW()),
('ragnarok', '#B91C1C', NOW());

-- Functional Tags (功能标签)
INSERT INTO tags (name, color, created_at) VALUES
('autocomplete', '#10B981', NOW()),
('search', '#3B82F6', NOW()),
('authentication', '#EF4444', NOW()),
('authorization', '#F59E0B', NOW()),
('payment', '#8B5CF6', NOW()),
('notification', '#EC4899', NOW()),
('analytics', '#06B6D4', NOW()),
('logging', '#64748B', NOW()),
('caching', '#F97316', NOW()),
('database', '#14B8A6', NOW()),
('migration', '#6366F1', NOW()),
('testing', '#84CC16', NOW()),
('deployment', '#A855F7', NOW()),
('monitoring', '#F43F5E', NOW()),
('security', '#DC2626', NOW()),
('performance', '#F59E0B', NOW()),
('ui', '#3B82F6', NOW()),
('ux', '#8B5CF6', NOW()),
('accessibility', '#10B981', NOW()),
('i18n', '#06B6D4', NOW()),
('localization', '#EC4899', NOW());

-- Priority Tags (优先级标签)
INSERT INTO tags (name, color, created_at) VALUES
('critical', '#DC2626', NOW()),
('high', '#EF4444', NOW()),
('medium', '#F59E0B', NOW()),
('low', '#10B981', NOW()),
('urgent', '#B91C1C', NOW());

-- Type Tags (类型标签)
INSERT INTO tags (name, color, created_at) VALUES
('bug', '#EF4444', NOW()),
('feature', '#10B981', NOW()),
('enhancement', '#3B82F6', NOW()),
('refactor', '#8B5CF6', NOW()),
('documentation', '#64748B', NOW()),
('chore', '#94A3B8', NOW());

-- ============================================
-- 插入 Tickets (50个)
-- ============================================

-- 1-10: iOS 相关 Tickets
INSERT INTO tickets (title, description, status, created_at, updated_at) VALUES
('修复 iOS 15 上的登录崩溃问题', '在 iOS 15 设备上，用户点击登录按钮后应用崩溃，需要检查兼容性', 'pending', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('iOS 深色模式支持', '为 iOS 应用添加完整的深色模式支持，包括所有页面和组件', 'completed', NOW() - INTERVAL '10 days', NOW() - INTERVAL '2 days'),
('iOS 推送通知权限请求优化', '优化推送通知权限请求的时机和文案，提高用户授权率', 'pending', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('iOS 应用内购买功能实现', '集成 StoreKit，实现应用内购买功能，支持订阅和一次性购买', 'pending', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
('iOS 手势导航支持', '添加左滑返回等手势导航功能，提升用户体验', 'completed', NOW() - INTERVAL '12 days', NOW() - INTERVAL '5 days'),
('iOS 性能优化 - 减少内存占用', '优化图片加载和缓存策略，减少应用内存占用', 'pending', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
('iOS 无障碍功能改进', '改进 VoiceOver 支持，添加更多无障碍标签', 'pending', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('iOS 多语言支持', '添加中文、英文、日文等多语言支持', 'completed', NOW() - INTERVAL '15 days', NOW() - INTERVAL '8 days'),
('iOS 后台任务优化', '优化后台任务执行，确保关键任务能够完成', 'pending', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('iOS 应用图标和启动画面更新', '设计新的应用图标和启动画面，符合最新设计规范', 'pending', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day');

-- 11-20: Android 相关 Tickets
INSERT INTO tickets (title, description, status, created_at, updated_at) VALUES
('Android 12 Material You 主题适配', '适配 Android 12 的 Material You 设计系统，支持动态颜色', 'pending', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
('Android 后台服务优化', '优化后台服务，减少电池消耗，符合 Android 后台限制', 'completed', NOW() - INTERVAL '14 days', NOW() - INTERVAL '6 days'),
('Android 权限请求流程优化', '优化运行时权限请求流程，提高用户体验', 'pending', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('Android 分屏模式支持', '添加分屏模式支持，确保应用在分屏时正常工作', 'pending', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days'),
('Android 通知渠道管理', '创建和管理通知渠道，提供更好的通知控制', 'completed', NOW() - INTERVAL '11 days', NOW() - INTERVAL '4 days'),
('Android 文件选择器集成', '集成 Android 文件选择器，支持选择图片、文档等文件', 'pending', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('Android 深色模式自动切换', '根据系统设置自动切换深色模式', 'completed', NOW() - INTERVAL '13 days', NOW() - INTERVAL '7 days'),
('Android 应用大小优化', '减少 APK 大小，移除未使用的资源', 'pending', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('Android 启动时间优化', '优化应用启动时间，减少冷启动时间', 'pending', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
('Android 崩溃报告集成', '集成 Firebase Crashlytics，收集和分析崩溃报告', 'completed', NOW() - INTERVAL '16 days', NOW() - INTERVAL '9 days');

-- 21-30: Web 相关 Tickets
INSERT INTO tickets (title, description, status, created_at, updated_at) VALUES
('响应式设计优化', '优化移动端和桌面端的响应式布局，确保在所有设备上正常显示', 'pending', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
('Web 性能优化 - 减少首屏加载时间', '优化资源加载顺序，使用代码分割，减少首屏加载时间', 'completed', NOW() - INTERVAL '9 days', NOW() - INTERVAL '3 days'),
('PWA 离线功能实现', '实现 Progressive Web App 离线功能，支持离线浏览', 'pending', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('Web 浏览器兼容性测试', '测试并修复主流浏览器的兼容性问题', 'pending', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
('Web SEO 优化', '优化 SEO，添加 meta 标签，改善搜索引擎排名', 'completed', NOW() - INTERVAL '12 days', NOW() - INTERVAL '5 days'),
('Web 无障碍功能改进', '改进键盘导航、屏幕阅读器支持等无障碍功能', 'pending', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('Web 多语言切换功能', '实现前端多语言切换，支持动态语言切换', 'completed', NOW() - INTERVAL '10 days', NOW() - INTERVAL '4 days'),
('Web 图片懒加载优化', '实现图片懒加载，提升页面加载性能', 'pending', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('Web 表单验证增强', '增强表单验证，提供更好的错误提示和用户体验', 'pending', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
('Web 安全头配置', '配置安全响应头，提高应用安全性', 'completed', NOW() - INTERVAL '11 days', NOW() - INTERVAL '6 days');

-- 31-40: 功能相关 Tickets
INSERT INTO tickets (title, description, status, created_at, updated_at) VALUES
('搜索功能自动完成', '实现搜索框的自动完成功能，提供搜索建议', 'pending', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
('用户认证系统重构', '重构用户认证系统，支持多种登录方式', 'pending', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days'),
('支付系统集成', '集成第三方支付系统，支持多种支付方式', 'pending', NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days'),
('实时通知系统', '实现实时通知系统，支持推送通知和站内通知', 'completed', NOW() - INTERVAL '15 days', NOW() - INTERVAL '8 days'),
('数据分析仪表板', '创建数据分析仪表板，展示关键指标', 'pending', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('日志系统优化', '优化日志系统，添加结构化日志和日志聚合', 'pending', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
('缓存策略实现', '实现 Redis 缓存策略，提升应用性能', 'completed', NOW() - INTERVAL '13 days', NOW() - INTERVAL '7 days'),
('数据库迁移脚本', '创建数据库迁移脚本，支持版本升级', 'pending', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('单元测试覆盖率提升', '提升单元测试覆盖率至 80% 以上', 'pending', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
('CI/CD 流水线优化', '优化 CI/CD 流水线，加快部署速度', 'completed', NOW() - INTERVAL '14 days', NOW() - INTERVAL '6 days');

-- 41-50: 项目相关 Tickets
INSERT INTO tickets (title, description, status, created_at, updated_at) VALUES
('Viking 项目用户管理模块', '为 Viking 项目实现用户管理模块，包括用户列表、详情、编辑功能', 'pending', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('Odin 项目 API 网关配置', '配置 Odin 项目的 API 网关，实现路由和负载均衡', 'pending', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days'),
('Thor 项目监控告警设置', '为 Thor 项目设置监控告警，包括 CPU、内存、错误率等指标', 'completed', NOW() - INTERVAL '11 days', NOW() - INTERVAL '4 days'),
('Loki 项目日志聚合', '为 Loki 项目配置日志聚合系统，统一收集和分析日志', 'pending', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
('Valhalla 项目性能测试', '对 Valhalla 项目进行性能测试，识别性能瓶颈', 'pending', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('Ragnarok 项目安全审计', '对 Ragnarok 项目进行安全审计，修复安全漏洞', 'pending', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
('Viking 项目数据库优化', '优化 Viking 项目的数据库查询，添加必要的索引', 'completed', NOW() - INTERVAL '12 days', NOW() - INTERVAL '5 days'),
('Odin 项目前端重构', '重构 Odin 项目前端代码，提升代码质量和可维护性', 'pending', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
('Thor 项目文档更新', '更新 Thor 项目的技术文档和 API 文档', 'pending', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
('Loki 项目国际化支持', '为 Loki 项目添加国际化支持，支持多语言切换', 'completed', NOW() - INTERVAL '13 days', NOW() - INTERVAL '7 days');

-- ============================================
-- 插入 Ticket-Tag 关联关系
-- ============================================

-- iOS Tickets (1-10) 关联
INSERT INTO ticket_tags (ticket_id, tag_id, created_at) VALUES
((SELECT id FROM tickets WHERE title = '修复 iOS 15 上的登录崩溃问题'), (SELECT id FROM tags WHERE name = 'ios'), NOW()),
((SELECT id FROM tickets WHERE title = '修复 iOS 15 上的登录崩溃问题'), (SELECT id FROM tags WHERE name = 'bug'), NOW()),
((SELECT id FROM tickets WHERE title = '修复 iOS 15 上的登录崩溃问题'), (SELECT id FROM tags WHERE name = 'critical'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 深色模式支持'), (SELECT id FROM tags WHERE name = 'ios'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 深色模式支持'), (SELECT id FROM tags WHERE name = 'feature'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 深色模式支持'), (SELECT id FROM tags WHERE name = 'ui'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 推送通知权限请求优化'), (SELECT id FROM tags WHERE name = 'ios'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 推送通知权限请求优化'), (SELECT id FROM tags WHERE name = 'enhancement'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 推送通知权限请求优化'), (SELECT id FROM tags WHERE name = 'ux'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 应用内购买功能实现'), (SELECT id FROM tags WHERE name = 'ios'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 应用内购买功能实现'), (SELECT id FROM tags WHERE name = 'feature'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 应用内购买功能实现'), (SELECT id FROM tags WHERE name = 'payment'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 手势导航支持'), (SELECT id FROM tags WHERE name = 'ios'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 手势导航支持'), (SELECT id FROM tags WHERE name = 'feature'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 手势导航支持'), (SELECT id FROM tags WHERE name = 'ux'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 性能优化 - 减少内存占用'), (SELECT id FROM tags WHERE name = 'ios'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 性能优化 - 减少内存占用'), (SELECT id FROM tags WHERE name = 'performance'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 性能优化 - 减少内存占用'), (SELECT id FROM tags WHERE name = 'high'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 无障碍功能改进'), (SELECT id FROM tags WHERE name = 'ios'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 无障碍功能改进'), (SELECT id FROM tags WHERE name = 'accessibility'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 无障碍功能改进'), (SELECT id FROM tags WHERE name = 'enhancement'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 多语言支持'), (SELECT id FROM tags WHERE name = 'ios'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 多语言支持'), (SELECT id FROM tags WHERE name = 'i18n'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 多语言支持'), (SELECT id FROM tags WHERE name = 'localization'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 后台任务优化'), (SELECT id FROM tags WHERE name = 'ios'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 后台任务优化'), (SELECT id FROM tags WHERE name = 'performance'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 后台任务优化'), (SELECT id FROM tags WHERE name = 'backend'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 应用图标和启动画面更新'), (SELECT id FROM tags WHERE name = 'ios'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 应用图标和启动画面更新'), (SELECT id FROM tags WHERE name = 'ui'), NOW()),
((SELECT id FROM tickets WHERE title = 'iOS 应用图标和启动画面更新'), (SELECT id FROM tags WHERE name = 'chore'), NOW());

-- Android Tickets (11-20) 关联
INSERT INTO ticket_tags (ticket_id, tag_id, created_at) VALUES
((SELECT id FROM tickets WHERE title = 'Android 12 Material You 主题适配'), (SELECT id FROM tags WHERE name = 'android'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 12 Material You 主题适配'), (SELECT id FROM tags WHERE name = 'feature'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 12 Material You 主题适配'), (SELECT id FROM tags WHERE name = 'ui'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 后台服务优化'), (SELECT id FROM tags WHERE name = 'android'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 后台服务优化'), (SELECT id FROM tags WHERE name = 'performance'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 后台服务优化'), (SELECT id FROM tags WHERE name = 'backend'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 权限请求流程优化'), (SELECT id FROM tags WHERE name = 'android'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 权限请求流程优化'), (SELECT id FROM tags WHERE name = 'enhancement'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 权限请求流程优化'), (SELECT id FROM tags WHERE name = 'ux'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 分屏模式支持'), (SELECT id FROM tags WHERE name = 'android'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 分屏模式支持'), (SELECT id FROM tags WHERE name = 'feature'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 通知渠道管理'), (SELECT id FROM tags WHERE name = 'android'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 通知渠道管理'), (SELECT id FROM tags WHERE name = 'notification'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 通知渠道管理'), (SELECT id FROM tags WHERE name = 'feature'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 文件选择器集成'), (SELECT id FROM tags WHERE name = 'android'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 文件选择器集成'), (SELECT id FROM tags WHERE name = 'feature'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 深色模式自动切换'), (SELECT id FROM tags WHERE name = 'android'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 深色模式自动切换'), (SELECT id FROM tags WHERE name = 'ui'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 深色模式自动切换'), (SELECT id FROM tags WHERE name = 'feature'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 应用大小优化'), (SELECT id FROM tags WHERE name = 'android'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 应用大小优化'), (SELECT id FROM tags WHERE name = 'performance'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 启动时间优化'), (SELECT id FROM tags WHERE name = 'android'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 启动时间优化'), (SELECT id FROM tags WHERE name = 'performance'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 启动时间优化'), (SELECT id FROM tags WHERE name = 'high'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 崩溃报告集成'), (SELECT id FROM tags WHERE name = 'android'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 崩溃报告集成'), (SELECT id FROM tags WHERE name = 'monitoring'), NOW()),
((SELECT id FROM tickets WHERE title = 'Android 崩溃报告集成'), (SELECT id FROM tags WHERE name = 'chore'), NOW());

-- Web Tickets (21-30) 关联
INSERT INTO ticket_tags (ticket_id, tag_id, created_at) VALUES
((SELECT id FROM tickets WHERE title = '响应式设计优化'), (SELECT id FROM tags WHERE name = 'web'), NOW()),
((SELECT id FROM tickets WHERE title = '响应式设计优化'), (SELECT id FROM tags WHERE name = 'ui'), NOW()),
((SELECT id FROM tickets WHERE title = '响应式设计优化'), (SELECT id FROM tags WHERE name = 'ux'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 性能优化 - 减少首屏加载时间'), (SELECT id FROM tags WHERE name = 'web'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 性能优化 - 减少首屏加载时间'), (SELECT id FROM tags WHERE name = 'performance'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 性能优化 - 减少首屏加载时间'), (SELECT id FROM tags WHERE name = 'frontend'), NOW()),
((SELECT id FROM tickets WHERE title = 'PWA 离线功能实现'), (SELECT id FROM tags WHERE name = 'web'), NOW()),
((SELECT id FROM tickets WHERE title = 'PWA 离线功能实现'), (SELECT id FROM tags WHERE name = 'feature'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 浏览器兼容性测试'), (SELECT id FROM tags WHERE name = 'web'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 浏览器兼容性测试'), (SELECT id FROM tags WHERE name = 'testing'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 浏览器兼容性测试'), (SELECT id FROM tags WHERE name = 'bug'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web SEO 优化'), (SELECT id FROM tags WHERE name = 'web'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web SEO 优化'), (SELECT id FROM tags WHERE name = 'chore'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 无障碍功能改进'), (SELECT id FROM tags WHERE name = 'web'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 无障碍功能改进'), (SELECT id FROM tags WHERE name = 'accessibility'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 无障碍功能改进'), (SELECT id FROM tags WHERE name = 'enhancement'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 多语言切换功能'), (SELECT id FROM tags WHERE name = 'web'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 多语言切换功能'), (SELECT id FROM tags WHERE name = 'i18n'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 多语言切换功能'), (SELECT id FROM tags WHERE name = 'localization'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 图片懒加载优化'), (SELECT id FROM tags WHERE name = 'web'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 图片懒加载优化'), (SELECT id FROM tags WHERE name = 'performance'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 图片懒加载优化'), (SELECT id FROM tags WHERE name = 'frontend'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 表单验证增强'), (SELECT id FROM tags WHERE name = 'web'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 表单验证增强'), (SELECT id FROM tags WHERE name = 'ux'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 表单验证增强'), (SELECT id FROM tags WHERE name = 'enhancement'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 安全头配置'), (SELECT id FROM tags WHERE name = 'web'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 安全头配置'), (SELECT id FROM tags WHERE name = 'security'), NOW()),
((SELECT id FROM tickets WHERE title = 'Web 安全头配置'), (SELECT id FROM tags WHERE name = 'chore'), NOW());

-- 功能 Tickets (31-40) 关联
INSERT INTO ticket_tags (ticket_id, tag_id, created_at) VALUES
((SELECT id FROM tickets WHERE title = '搜索功能自动完成'), (SELECT id FROM tags WHERE name = 'autocomplete'), NOW()),
((SELECT id FROM tickets WHERE title = '搜索功能自动完成'), (SELECT id FROM tags WHERE name = 'search'), NOW()),
((SELECT id FROM tickets WHERE title = '搜索功能自动完成'), (SELECT id FROM tags WHERE name = 'feature'), NOW()),
((SELECT id FROM tickets WHERE title = '用户认证系统重构'), (SELECT id FROM tags WHERE name = 'authentication'), NOW()),
((SELECT id FROM tickets WHERE title = '用户认证系统重构'), (SELECT id FROM tags WHERE name = 'authorization'), NOW()),
((SELECT id FROM tickets WHERE title = '用户认证系统重构'), (SELECT id FROM tags WHERE name = 'refactor'), NOW()),
((SELECT id FROM tickets WHERE title = '支付系统集成'), (SELECT id FROM tags WHERE name = 'payment'), NOW()),
((SELECT id FROM tickets WHERE title = '支付系统集成'), (SELECT id FROM tags WHERE name = 'feature'), NOW()),
((SELECT id FROM tickets WHERE title = '支付系统集成'), (SELECT id FROM tags WHERE name = 'high'), NOW()),
((SELECT id FROM tickets WHERE title = '实时通知系统'), (SELECT id FROM tags WHERE name = 'notification'), NOW()),
((SELECT id FROM tickets WHERE title = '实时通知系统'), (SELECT id FROM tags WHERE name = 'feature'), NOW()),
((SELECT id FROM tickets WHERE title = '实时通知系统'), (SELECT id FROM tags WHERE name = 'backend'), NOW()),
((SELECT id FROM tickets WHERE title = '数据分析仪表板'), (SELECT id FROM tags WHERE name = 'analytics'), NOW()),
((SELECT id FROM tickets WHERE title = '数据分析仪表板'), (SELECT id FROM tags WHERE name = 'feature'), NOW()),
((SELECT id FROM tickets WHERE title = '日志系统优化'), (SELECT id FROM tags WHERE name = 'logging'), NOW()),
((SELECT id FROM tickets WHERE title = '日志系统优化'), (SELECT id FROM tags WHERE name = 'enhancement'), NOW()),
((SELECT id FROM tickets WHERE title = '日志系统优化'), (SELECT id FROM tags WHERE name = 'backend'), NOW()),
((SELECT id FROM tickets WHERE title = '缓存策略实现'), (SELECT id FROM tags WHERE name = 'caching'), NOW()),
((SELECT id FROM tickets WHERE title = '缓存策略实现'), (SELECT id FROM tags WHERE name = 'performance'), NOW()),
((SELECT id FROM tickets WHERE title = '缓存策略实现'), (SELECT id FROM tags WHERE name = 'backend'), NOW()),
((SELECT id FROM tickets WHERE title = '数据库迁移脚本'), (SELECT id FROM tags WHERE name = 'database'), NOW()),
((SELECT id FROM tickets WHERE title = '数据库迁移脚本'), (SELECT id FROM tags WHERE name = 'migration'), NOW()),
((SELECT id FROM tickets WHERE title = '数据库迁移脚本'), (SELECT id FROM tags WHERE name = 'chore'), NOW()),
((SELECT id FROM tickets WHERE title = '单元测试覆盖率提升'), (SELECT id FROM tags WHERE name = 'testing'), NOW()),
((SELECT id FROM tickets WHERE title = '单元测试覆盖率提升'), (SELECT id FROM tags WHERE name = 'chore'), NOW()),
((SELECT id FROM tickets WHERE title = 'CI/CD 流水线优化'), (SELECT id FROM tags WHERE name = 'deployment'), NOW()),
((SELECT id FROM tickets WHERE title = 'CI/CD 流水线优化'), (SELECT id FROM tags WHERE name = 'chore'), NOW());

-- 项目 Tickets (41-50) 关联
INSERT INTO ticket_tags (ticket_id, tag_id, created_at) VALUES
((SELECT id FROM tickets WHERE title = 'Viking 项目用户管理模块'), (SELECT id FROM tags WHERE name = 'viking'), NOW()),
((SELECT id FROM tickets WHERE title = 'Viking 项目用户管理模块'), (SELECT id FROM tags WHERE name = 'feature'), NOW()),
((SELECT id FROM tickets WHERE title = 'Viking 项目用户管理模块'), (SELECT id FROM tags WHERE name = 'backend'), NOW()),
((SELECT id FROM tickets WHERE title = 'Odin 项目 API 网关配置'), (SELECT id FROM tags WHERE name = 'odin'), NOW()),
((SELECT id FROM tickets WHERE title = 'Odin 项目 API 网关配置'), (SELECT id FROM tags WHERE name = 'backend'), NOW()),
((SELECT id FROM tickets WHERE title = 'Odin 项目 API 网关配置'), (SELECT id FROM tags WHERE name = 'chore'), NOW()),
((SELECT id FROM tickets WHERE title = 'Thor 项目监控告警设置'), (SELECT id FROM tags WHERE name = 'thor'), NOW()),
((SELECT id FROM tickets WHERE title = 'Thor 项目监控告警设置'), (SELECT id FROM tags WHERE name = 'monitoring'), NOW()),
((SELECT id FROM tickets WHERE title = 'Thor 项目监控告警设置'), (SELECT id FROM tags WHERE name = 'chore'), NOW()),
((SELECT id FROM tickets WHERE title = 'Loki 项目日志聚合'), (SELECT id FROM tags WHERE name = 'loki'), NOW()),
((SELECT id FROM tickets WHERE title = 'Loki 项目日志聚合'), (SELECT id FROM tags WHERE name = 'logging'), NOW()),
((SELECT id FROM tickets WHERE title = 'Loki 项目日志聚合'), (SELECT id FROM tags WHERE name = 'chore'), NOW()),
((SELECT id FROM tickets WHERE title = 'Valhalla 项目性能测试'), (SELECT id FROM tags WHERE name = 'valhalla'), NOW()),
((SELECT id FROM tickets WHERE title = 'Valhalla 项目性能测试'), (SELECT id FROM tags WHERE name = 'testing'), NOW()),
((SELECT id FROM tickets WHERE title = 'Valhalla 项目性能测试'), (SELECT id FROM tags WHERE name = 'performance'), NOW()),
((SELECT id FROM tickets WHERE title = 'Ragnarok 项目安全审计'), (SELECT id FROM tags WHERE name = 'ragnarok'), NOW()),
((SELECT id FROM tickets WHERE title = 'Ragnarok 项目安全审计'), (SELECT id FROM tags WHERE name = 'security'), NOW()),
((SELECT id FROM tickets WHERE title = 'Ragnarok 项目安全审计'), (SELECT id FROM tags WHERE name = 'high'), NOW()),
((SELECT id FROM tickets WHERE title = 'Viking 项目数据库优化'), (SELECT id FROM tags WHERE name = 'viking'), NOW()),
((SELECT id FROM tickets WHERE title = 'Viking 项目数据库优化'), (SELECT id FROM tags WHERE name = 'database'), NOW()),
((SELECT id FROM tickets WHERE title = 'Viking 项目数据库优化'), (SELECT id FROM tags WHERE name = 'performance'), NOW()),
((SELECT id FROM tickets WHERE title = 'Odin 项目前端重构'), (SELECT id FROM tags WHERE name = 'odin'), NOW()),
((SELECT id FROM tickets WHERE title = 'Odin 项目前端重构'), (SELECT id FROM tags WHERE name = 'refactor'), NOW()),
((SELECT id FROM tickets WHERE title = 'Odin 项目前端重构'), (SELECT id FROM tags WHERE name = 'frontend'), NOW()),
((SELECT id FROM tickets WHERE title = 'Thor 项目文档更新'), (SELECT id FROM tags WHERE name = 'thor'), NOW()),
((SELECT id FROM tickets WHERE title = 'Thor 项目文档更新'), (SELECT id FROM tags WHERE name = 'documentation'), NOW()),
((SELECT id FROM tickets WHERE title = 'Thor 项目文档更新'), (SELECT id FROM tags WHERE name = 'chore'), NOW()),
((SELECT id FROM tickets WHERE title = 'Loki 项目国际化支持'), (SELECT id FROM tags WHERE name = 'loki'), NOW()),
((SELECT id FROM tickets WHERE title = 'Loki 项目国际化支持'), (SELECT id FROM tags WHERE name = 'i18n'), NOW()),
((SELECT id FROM tickets WHERE title = 'Loki 项目国际化支持'), (SELECT id FROM tags WHERE name = 'localization'), NOW());

-- ============================================
-- 完成
-- ============================================

-- 显示统计信息
SELECT 'Tags created: ' || COUNT(*) FROM tags;
SELECT 'Tickets created: ' || COUNT(*) FROM tickets;
SELECT 'Ticket-Tag relationships: ' || COUNT(*) FROM ticket_tags;

