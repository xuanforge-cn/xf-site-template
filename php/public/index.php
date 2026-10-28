<?php
/**
 * 唯一入口。所有请求都从这里进入，按 ?p= 渲染对应页面。
 *
 * 部署时把 Web 根目录指向本目录（public/），app 与 config 不应被直接访问。
 *
 * 署名：github.com/xuanforge-cn
 */

declare(strict_types=1);

require dirname(__DIR__) . '/app/bootstrap.php';

render_page();
