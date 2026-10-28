<?php
/**
 * 页面模板示例（占位）。
 *
 * 约定：
 *   1. 只写 <main> 内部的内容，页头页脚由 app/layout.php 输出；
 *   2. 通过 $meta['title'] / $meta['description'] 设置页面标题与描述；
 *   3. 动态输出一律经过 e() 转义，链接用 page_url('slug')。
 *
 * 署名：github.com/xuanforge-cn
 *
 * @var array{title: string, description: string} $meta
 */

$meta['title'] = '首页';
$meta['description'] = (string) brand('description');
?>
<section class="section">
  <div class="shell">
    <p class="eyebrow">PHP 框架已就绪</p>
    <h1 class="section-title">把这一块换成你的页面内容</h1>
    <p class="section-note">
      这个文件只是占位示例。把静态版 index.html 里 &lt;main&gt; 中的内容粘贴到这里，
      再把页面链接改成 index.php?p=...
    </p>
    <div class="hero-actions" style="margin-top:28px">
      <a class="btn btn-ink" href="<?= e(page_url('contact')) ?>">示例链接</a>
    </div>
  </div>
</section>
