<?php
/**
 * 极简路由：查询参数 p 指定页面，白名单化后映射到 app/pages/*.php
 *
 * 不使用 rewrite 规则，任何服务器（Apache / Nginx / php -S）都能直接跑。
 *
 * 署名：github.com/xuanforge-cn
 */

declare(strict_types=1);

function route_slug(): string
{
    $raw  = isset($_GET['p']) ? (string) $_GET['p'] : 'home';
    $slug = strtolower((string) preg_replace('/[^a-zA-Z0-9\-]/', '', $raw));

    return $slug === '' ? 'home' : $slug;
}

function page_path(string $slug): ?string
{
    $file = APP_ROOT . '/app/pages/' . $slug . '.php';

    return is_file($file) ? $file : null;
}

/**
 * 渲染当前页面：先执行页面模板拿到正文，再套布局
 */
function render_page(): void
{
    $file = page_path(route_slug());

    if ($file === null) {
        http_response_code(404);
        $file = page_path('404');

        if ($file === null) {
            header('Content-Type: text/plain; charset=UTF-8');
            echo '404 Not Found';
            return;
        }
    }

    // 页面模板通过修改 $meta 设置标题与描述
    $meta = ['title' => '', 'description' => ''];

    ob_start();
    require $file;
    $body = (string) ob_get_clean();

    if ($meta['title'] === '') {
        $meta['title'] = (string) brand('name');
    }

    if ($meta['description'] === '') {
        $meta['description'] = (string) brand('description');
    }

    layout_start($meta);
    echo $body;
    layout_end();
}
