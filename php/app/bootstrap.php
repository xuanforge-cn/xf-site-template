<?php
/**
 * 应用引导：常量、错误处理、会话、配置与框架文件加载
 *
 * 署名：github.com/xuanforge-cn
 */

declare(strict_types=1);

define('APP_ROOT', dirname(__DIR__));
define('APP_DEBUG', false); // 生产环境保持 false

error_reporting(E_ALL);
ini_set('display_errors', APP_DEBUG ? '1' : '0');
ini_set('log_errors', '1');

if (session_status() !== PHP_SESSION_ACTIVE) {
    $secure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';

    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'secure'   => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);

    session_start();
}

/** @var array<string, mixed> $brand */
$GLOBALS['brand'] = require APP_ROOT . '/config/brand.php';

require APP_ROOT . '/app/helpers.php';
require APP_ROOT . '/app/layout.php';
require APP_ROOT . '/app/router.php';
