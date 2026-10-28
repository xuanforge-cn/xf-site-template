<?php
/**
 * 布局层：head、页头、页脚。页面模板只需要写 <main> 内部的内容。
 *
 * 样式沿用静态版 assets/css/site.css，品牌变量由 config/brand.php 注入。
 *
 * 署名：github.com/xuanforge-cn
 */

declare(strict_types=1);

/**
 * 输出 head + 页头，并打开 <main>
 *
 * @param array{title: string, description: string} $meta
 */
function layout_start(array $meta): void
{
    $title       = trim((string) ($meta['title'] ?? ''));
    $description = trim((string) ($meta['description'] ?? ''));
    $brandName   = (string) brand('name');
    $brandEn     = (string) brand('nameEn');
    $fullTitle   = trim(($title !== '' ? $title . ' · ' : '') . $brandName . ' ' . $brandEn);
    $htmlLang    = (string) brand('lang', 'zh-CN');

    $clean = static function (string $value): string {
        return str_replace(['<', '>', '{', '}', ';'], '', $value);
    };

    $themeMap = [
        'paper'     => '--paper',
        'paperSoft' => '--paper-soft',
        'ink'       => '--ink',
        'inkSoft'   => '--ink-soft',
        'muted'     => '--muted',
        'line'      => '--line',
        'accent'    => '--accent',
        'accentInk' => '--accent-ink',
        'dark'      => '--dark',
        'darkSoft'  => '--dark-soft',
    ];

    $cssVars = [];

    foreach ($themeMap as $key => $variable) {
        $value = (string) brand('theme.' . $key, '');
        if ($value !== '') {
            $cssVars[] = $variable . ':' . $clean($value);
        }
    }

    $fontMap = [
        'display' => '--font-display',
        'body'    => '--font-body',
        'mono'    => '--font-mono',
    ];

    foreach ($fontMap as $key => $variable) {
        $value = (string) brand('fonts.' . $key, '');
        if ($value !== '') {
            $cssVars[] = $variable . ':' . $clean($value);
        }
    }

    $nav    = (array) brand('nav', []);
    $cta    = (array) brand('navCta', []);
    $contact = (array) brand('contact', []);
    ?>
<!DOCTYPE html>
<html lang="<?= e($htmlLang) ?>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($fullTitle) ?></title>
  <meta name="description" content="<?= e($description) ?>">
  <meta name="author" content="<?= e(brand('copyright.holder', '')) ?>">
  <meta name="copyright" content="<?= e(brand('copyright.holder', '')) ?>">
  <meta name="theme-color" content="<?= e(brand('theme.paper', '#F4F0E7')) ?>">
  <style>:root{<?= implode(';', $cssVars) ?>}</style>
  <link rel="stylesheet" href="<?= e(asset('css/site.css')) ?>">
  <script src="<?= e(asset('js/app.js')) ?>" defer></script>
</head>
<body id="top">
  <a class="skip-link" href="#main">跳到主要内容</a>

  <header class="site-header" data-header>
    <div class="shell header-inner">
      <a class="brand" href="<?= e(page_url('home')) ?>" aria-label="<?= e($brandName) ?> 首页">
        <span class="brand-mark">
          <?php if ((string) brand('logoImage', '') !== ''): ?>
            <img src="<?= e((string) brand('logoImage')) ?>" alt="" width="44" height="44">
          <?php else: ?>
            <svg viewBox="0 0 44 44" role="img" aria-hidden="true" focusable="false">
              <rect x="1" y="1" width="42" height="42" fill="none" stroke="currentColor" stroke-width="1.4"></rect>
              <path d="M10 30 L22 12 L34 30" fill="none" stroke="currentColor" stroke-width="1.4"></path>
              <circle cx="22" cy="30" r="2.6" fill="currentColor"></circle>
            </svg>
          <?php endif; ?>
        </span>
        <span class="brand-type">
          <span class="brand-name"><?= e($brandName) ?></span>
          <span class="brand-en"><?= e($brandEn) ?></span>
        </span>
      </a>

      <nav class="site-nav" id="site-nav" aria-label="主导航">
        <ul>
          <?php foreach ($nav as $item): ?>
            <li>
              <a href="<?= e((string) ($item['href'] ?? '#')) ?>"<?= nav_active((string) ($item['href'] ?? '')) ?>>
                <?= e((string) ($item['label'] ?? '')) ?>
              </a>
            </li>
          <?php endforeach; ?>
        </ul>
        <div class="nav-aside">
          <p class="nav-aside-label">直接联系</p>
          <a href="mailto:<?= e((string) ($contact['email'] ?? '')) ?>"><?= e((string) ($contact['email'] ?? '')) ?></a>
          <a href="tel:<?= e((string) ($contact['phoneHref'] ?? '')) ?>"><?= e((string) ($contact['phone'] ?? '')) ?></a>
        </div>
      </nav>

      <div class="header-actions">
        <a class="btn btn-ink btn-sm header-cta" href="<?= e((string) ($cta['href'] ?? '#')) ?>">
          <?= e((string) ($cta['label'] ?? '联系我们')) ?>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
          <span class="nav-toggle-label">菜单</span>
          <span class="nav-toggle-bars" aria-hidden="true"><i></i><i></i></span>
        </button>
      </div>
    </div>
  </header>

  <main id="main">
    <?php
}

/**
 * 关闭 <main>，输出页脚与结束标签
 */
function layout_end(): void
{
    $footer   = (array) brand('footer', []);
    $contact  = (array) brand('contact', []);
    $socials  = (array) brand('social', []);
    $nav      = (array) brand('nav', []);
    $credit   = (array) brand('copyright', []);
    $year     = ($credit['year'] ?? 'auto') === 'auto' ? date('Y') : ($credit['year'] ?? date('Y'));
    $holder   = (string) ($credit['holder'] ?? '');
    $creditUrl = (string) ($credit['url'] ?? '');

    $navAll = $nav;
    $navAll[] = ['label' => '联系', 'href' => page_url('contact')];
    ?>
  </main>

  <footer class="site-footer">
    <div class="shell">
      <div class="footer-top">
        <div class="footer-lead">
          <p class="eyebrow eyebrow-light">开始一段合作</p>
          <h2 class="footer-headline"><?= e((string) ($footer['headline'] ?? '')) ?></h2>
          <p class="footer-note"><?= e((string) ($footer['note'] ?? '')) ?></p>
          <a class="btn btn-light" href="<?= e(page_url('contact')) ?>">
            预约一次沟通<span class="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>

        <div class="footer-cols">
          <div>
            <h3>导航</h3>
            <ul>
              <?php foreach ($navAll as $item): ?>
                <li><a href="<?= e((string) ($item['href'] ?? '#')) ?>"><?= e((string) ($item['label'] ?? '')) ?></a></li>
              <?php endforeach; ?>
            </ul>
          </div>

          <div>
            <h3>联系</h3>
            <ul>
              <li><a href="mailto:<?= e((string) ($contact['email'] ?? '')) ?>"><?= e((string) ($contact['email'] ?? '')) ?></a></li>
              <li><a href="tel:<?= e((string) ($contact['phoneHref'] ?? '')) ?>"><?= e((string) ($contact['phone'] ?? '')) ?></a></li>
              <li class="is-plain"><?= e((string) ($contact['address'] ?? '')) ?></li>
              <li class="is-plain"><?= e((string) ($contact['city'] ?? '')) ?></li>
            </ul>
          </div>

          <div>
            <h3>关注</h3>
            <ul class="social-list">
              <?php foreach ($socials as $item): ?>
                <li>
                  <a href="<?= e((string) ($item['href'] ?? '#')) ?>" rel="noopener">
                    <?= e((string) ($item['label'] ?? '')) ?>
                    <?php if (!empty($item['note'])): ?>
                      <span class="social-note"><?= e((string) $item['note']) ?></span>
                    <?php endif; ?>
                  </a>
                </li>
              <?php endforeach; ?>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-word" aria-hidden="true"><?= e((string) brand('nameEn', (string) brand('name', ''))) ?></div>

      <div class="footer-base">
        <!-- 著作权声明：署名主体须与 LICENSE 版权行保持一致 -->
        <p class="footer-copyright">
          版权所有 © <?= e((string) $year) ?>
          <?php if ($creditUrl !== ''): ?>
            <a class="footer-credit-link" href="<?= e($creditUrl) ?>" target="_blank" rel="noopener noreferrer"><?= e($holder) ?></a>
          <?php else: ?>
            <?= e($holder) ?>
          <?php endif; ?>
        </p>
        <?php if (!empty($footer['legal'])): ?>
          <p><?= e((string) $footer['legal']) ?></p>
        <?php endif; ?>
        <p class="footer-top-link"><a href="#top">回到顶部 ↑</a></p>
      </div>
    </div>
  </footer>
</body>
</html>
    <?php
}
