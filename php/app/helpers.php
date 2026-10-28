<?php
/**
 * 通用辅助函数：配置读取、转义、资源路径、CSRF
 *
 * 署名：github.com/xuanforge-cn
 */

declare(strict_types=1);

/**
 * 按点路径读取品牌配置：brand('contact.email')
 */
function brand(?string $path = null, mixed $default = null): mixed
{
    $data = $GLOBALS['brand'] ?? [];

    if ($path === null || $path === '') {
        return $data;
    }

    $value = $data;

    foreach (explode('.', $path) as $segment) {
        if (!is_array($value) || !array_key_exists($segment, $value)) {
            return $default;
        }
        $value = $value[$segment];
    }

    return $value;
}

/**
 * HTML 转义。所有输出到页面的动态内容都必须经过它。
 */
function e(mixed $value): string
{
    return htmlspecialchars((string) ($value ?? ''), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/**
 * 资源路径（相对 public 目录）
 */
function asset(string $path): string
{
    return 'assets/' . ltrim($path, '/');
}

/**
 * 页面地址。不依赖 rewrite，直接用查询参数。
 */
function page_url(string $slug = 'home'): string
{
    return $slug === 'home' ? 'index.php' : 'index.php?p=' . rawurlencode($slug);
}

function is_current(string $slug): bool
{
    return route_slug() === $slug;
}

/**
 * 当前导航项是否激活（href 形如 index.php?p=services）
 */
function nav_active(string $href): string
{
    $target = 'home';

    if (preg_match('/[?&]p=([a-z0-9\-]+)/i', $href, $matches) === 1) {
        $target = strtolower($matches[1]);
    }

    return $target === route_slug() ? ' is-active' : '';
}

/**
 * CSRF token：渲染表单时写入隐藏域，提交时校验
 */
function csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }

    return (string) $_SESSION['csrf'];
}

function csrf_verify(?string $token): bool
{
    return is_string($token)
        && !empty($_SESSION['csrf'])
        && hash_equals((string) $_SESSION['csrf'], $token);
}

/**
 * 取上一次提交的值，用于表单回填
 */
function old(string $key, string $default = ''): string
{
    $value = $_POST[$key] ?? $default;

    return is_string($value) ? trim($value) : $default;
}
