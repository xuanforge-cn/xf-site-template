# PHP 版框架 / PHP Starter

只提供**框架壳**，不包含整站页面 HTML。页头、页脚、路由、配置、转义与 CSRF 已经就绪，你（或 AI）只需要把静态版的 `<main>` 内容填进 `app/pages/`。

A framework shell only — no full-page HTML. Header, footer, routing, config, escaping and CSRF are ready; drop the `<main>` content of any static edition into `app/pages/`.

## 环境要求 / Requirements

- PHP 8.0+（使用 `mixed` 类型、`str_contains` 等 8.0 特性）
- 不需要 Composer、不需要框架、不需要 rewrite 规则
- Web 根目录必须指向 `public/`

## 运行 / Run

```bash
cd php
php -S localhost:8000 -t public
# 打开 http://localhost:8000/
```

生产部署（Nginx 示例）：

```nginx
root /path/to/php/public;
index index.php;

location / {
    try_files $uri $uri/ /index.php?$query_string;
}

location ~ \.php$ {
    include fastcgi_params;
    fastcgi_pass 127.0.0.1:9000;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
}
```

Apache 直接把 DocumentRoot 指向 `public/` 即可，不依赖 `.htaccess`。

## 目录结构 / Structure

```
php/
├── public/                 # 唯一 Web 根目录
│   ├── index.php           # 唯一入口
│   └── assets/
│       ├── css/site.css    # 沿用静态版的样式（可替换）
│       └── js/app.js       # 交互层：菜单、进场、表单校验
├── app/
│   ├── bootstrap.php       # 常量、错误处理、会话、加载
│   ├── helpers.php         # brand() / e() / page_url() / csrf_*()
│   ├── layout.php          # head + 页头 + 页脚
│   ├── router.php          # ?p= 路由与页面渲染
│   └── pages/              # 页面模板（只写 main 内容）
│       └── home.php        # 占位示例
├── config/
│   └── brand.php           # 唯一品牌配置
└── README.md
```

`app/` 与 `config/` 在 Web 根之外，无法被直接访问。

## 加一个页面 / Add a Page

**第 1 步**：新建 `app/pages/services.php`，只写 `<main>` 内部的内容：

```php
<?php
/** @var array{title: string, description: string} $meta */
$meta['title'] = '服务';
$meta['description'] = '我们提供的四项服务。';
?>
<section class="section">
  <div class="shell">
    <p class="eyebrow">服务</p>
    <h1 class="section-title">四项服务</h1>
    <p class="section-note"><?= e('这里放正文，动态内容必须经过 e() 转义') ?></p>
  </div>
</section>
```

**第 2 步**：在 `config/brand.php` 的 `nav` 里加一项：

```php
['label' => '服务', 'href' => 'index.php?p=services'],
```

**第 3 步**：访问 `index.php?p=services`。

要加 404 页面，新建 `app/pages/404.php`，路由会自动使用它并返回 404 状态码。

## 常用 API / Helpers

| 函数 | 作用 |
| --- | --- |
| `brand('contact.email')` | 按点路径读取 `config/brand.php` |
| `e($value)` | HTML 转义，所有动态输出必须使用 |
| `page_url('services')` | 生成 `index.php?p=services`；`home` 返回 `index.php` |
| `asset('css/site.css')` | 生成 `assets/css/site.css` |
| `csrf_token()` | 输出到表单隐藏域 |
| `csrf_verify($_POST['csrf'] ?? null)` | 提交时校验 |
| `old('name')` | 回填上一次提交的值 |

## 表单处理 / Forms

```php
<?php
$meta['title'] = '联系';
$errors = [];
$sent = false;

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    if (!csrf_verify($_POST['csrf'] ?? null)) {
        $errors['form'] = '页面已过期，请刷新后重试。';
    } else {
        $name = old('name');
        $email = old('email');
        $message = old('message');

        if (mb_strlen($name) < 2) {
            $errors['name'] = '请填写称呼。';
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = '邮箱格式不正确。';
        }
        if (mb_strlen($message) < 10) {
            $errors['message'] = '请至少写 10 个字。';
        }

        if ($errors === []) {
            // 在这里调用 mail()、写入数据库或转发到表单服务
            $sent = true;
        }
    }
}
?>
<form method="post" action="<?= e(page_url('contact')) ?>" data-validate novalidate>
  <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
  <div class="field">
    <label for="name">称呼 *</label>
    <input id="name" name="name" type="text" value="<?= e(old('name')) ?>" required>
    <p class="field-error"><?= e($errors['name'] ?? '') ?></p>
  </div>
  <!-- 其余字段同上 -->
  <button class="btn btn-ink" type="submit">发送信息</button>
</form>
```

前端校验只是体验优化，**PHP 端必须再校验一次**。生产环境还需加频率限制（例如按 IP 记录提交次数）。

## 把现有静态版套进来 / Migrate a Static Edition

三套静态版（`index.html`、`variants/dark-tech/`、`variants/swiss-minimal/`）都可以套进这套框架，只要把页面正文移进 `app/pages/`：

1. 复制对应版本 `assets/` 到 `php/public/assets/`（覆盖现有 CSS/JS）
2. 取每个 HTML 的 `<main>` 内部内容，粘贴到 `app/pages/{slug}.php`
3. 页面顶部加 `$meta['title']` 与 `$meta['description']`
4. 把 `href="services.html"` 改成 `page_url('services')`，把 `src="assets/..."` 改成 `asset('...')`
5. 删除静态版 `site.js` 中渲染页头页脚的部分（PHP 版已内置，用 `php/public/assets/js/app.js`）
6. 在 `config/brand.php` 的 `nav` 中登记新页面

给 AI 的提示词：

```text
把静态版 {{目录}} 迁移进 php/ 框架，不要改动框架结构。

约束：
1. 先读 php/README.md、php/app/layout.php、php/app/helpers.php。
2. 每个页面只取 <main> 内部内容，写入 php/app/pages/{slug}.php。
3. 文件顶部设置 $meta['title'] 与 $meta['description']。
4. 所有链接改用 page_url('slug')，所有资源改用 asset('路径')。
5. 所有动态输出用 e() 转义；表单加 csrf_token() 隐藏域并在 PHP 端 csrf_verify()。
6. 不修改 layout.php 的页头页脚结构，除非确实需要新增导航项。
7. 新页面同步登记到 config/brand.php 的 nav。
8. 完成后列出改动文件与人工需要确认的内容。
```

## 安全清单 / Security Checklist

- Web 根只指向 `public/`，不要把 `app/`、`config/` 暴露出去
- 生产环境保持 `APP_DEBUG = false`，错误写入日志而不是页面
- 所有输出经过 `e()`；SQL 使用预处理语句（本框架不包含数据库层）
- 表单必须校验 CSRF、必填项，并在服务端再做一次格式校验
- 敏感信息从环境变量读取，不要写进 `config/brand.php`

## 许可 / License

MIT，著作权人：玹砺科技 XUANFORGE（https://github.com/xuanforge-cn）。
