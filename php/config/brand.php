<?php
/**
 * 全站品牌配置 —— PHP 版唯一的品牌入口
 *
 * 与静态版 assets/js/brand.config.js 字段一一对应。
 * 换品牌、换色、换联系方式，只改这个文件。
 *
 * 署名：github.com/xuanforge-cn
 */

declare(strict_types=1);

return [
    'name'        => '远山',
    'nameEn'      => 'FARHILL',
    'monogram'    => 'FH',
    'logoImage'   => '', // 有 Logo 时填相对路径，如 assets/img/logo.svg
    'tagline'     => '把复杂的业务，做成清晰的产品',
    'description' => '远山是一家专注品牌策略与数字体验的设计公司，帮助成长中的企业把商业目标翻译成可被理解、可被使用的产品。',
    'lang'        => 'zh-CN',

    'theme' => [
        'paper'     => '#F4F0E7',
        'paperSoft' => '#EAE4D7',
        'ink'       => '#16130E',
        'inkSoft'   => '#3A332A',
        'muted'     => '#6E6558',
        'line'      => '#D7CFBF',
        'accent'    => '#C0452A',
        'accentInk' => '#FFF6F0',
        'dark'      => '#16130E',
        'darkSoft'  => '#211D16',
    ],

    'fonts' => [
        'display' => '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", "Songti SC", "Noto Serif SC", Georgia, serif',
        'body'    => '"Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif',
        'mono'    => '"SF Mono", "JetBrains Mono", Consolas, "Courier New", monospace',
    ],

    'nav' => [
        ['label' => '首页', 'href' => 'index.php'],
        ['label' => '服务', 'href' => 'index.php?p=services'],
        ['label' => '案例', 'href' => 'index.php?p=work'],
        ['label' => '关于', 'href' => 'index.php?p=about'],
    ],
    'navCta' => ['label' => '聊聊合作', 'href' => 'index.php?p=contact'],

    'contact' => [
        'email'     => 'hello@farhill.studio',
        'phone'     => '021 5030 2040',
        'phoneHref' => '+862150302040',
        'address'   => '上海市静安区陕西北路 688 号 5F',
        'city'      => '上海 / 新加坡',
        'hours'     => '周一至周五 10:00 – 19:00',
        'response'  => '工作日 24 小时内回复',
    ],

    'social' => [
        ['label' => '微信', 'href' => '#', 'note' => 'farhill_studio'],
        ['label' => '微博', 'href' => '#'],
        ['label' => 'LinkedIn', 'href' => '#'],
        ['label' => 'Instagram', 'href' => '#'],
    ],

    'footer' => [
        'headline' => '如果你也相信，好设计应该先解决业务问题。',
        'note'     => '我们每年最多承接 12 个项目，以保证每一位客户都能得到主创团队的全程参与。',
        'legal'    => '', // 备案号等合规信息，留空则不显示
    ],

    'copyright' => [
        'holder' => 'github.com/xuanforge-cn',
        'url'    => 'https://github.com/xuanforge-cn',
        'year'   => 'auto',
    ],

    /* 案例数据：首页精选与案例页共用。image 留空时显示空状态 */
    'work' => [
        [
            'slug'     => 'lanyu',
            'client'   => '澜屿酒店',
            'title'    => '把海岛的记忆，做成一套可延续的品牌语言',
            'year'     => '2025',
            'category' => '品牌识别',
            'summary'  => '从命名、字体到客房用品，建立一套在潮湿空气里也不会失真的视觉系统。',
            'image'    => '',
            'featured' => true,
        ],
        [
            'slug'     => 'muchen',
            'client'   => '木尘家居',
            'title'    => '让一家 20 年的工厂，第一次被年轻人看见',
            'year'     => '2025',
            'category' => '品牌 × 数字产品',
            'summary'  => '重构产品结构，搭建可自主更新的内容站，六个月内自然流量翻了三倍。',
            'image'    => '',
            'featured' => true,
        ],
        [
            'slug'     => 'jiye',
            'client'   => '既野咖啡',
            'title'    => '从一间街角小店，到 40 家门店的统一体验',
            'year'     => '2024',
            'category' => '包装与空间',
            'summary'  => '用一套克制的材质与色彩规则，解决了连锁扩张中最容易失控的视觉一致性问题。',
            'image'    => '',
            'featured' => true,
        ],
        [
            'slug'     => 'hengliu',
            'client'   => '衡流资本',
            'title'    => '把一份 80 页的年度报告，变成可以读下去的故事',
            'year'     => '2024',
            'category' => '内容设计',
            'summary'  => '重新梳理信息层级，用图表与版式让复杂数据自己说话。',
            'image'    => '',
            'featured' => false,
        ],
        [
            'slug'     => 'xingcha',
            'client'   => '醒茶研究所',
            'title'    => '让一杯茶的新品牌，在第一眼就被记住',
            'year'     => '2023',
            'category' => '品牌识别',
            'summary'  => '从单一符号出发，延展出一整套可印刷、可包装、可上墙的识别系统。',
            'image'    => '',
            'featured' => false,
        ],
        [
            'slug'     => 'yuanqi',
            'client'   => '元气实验室',
            'title'    => '一个健康品牌，如何不靠喊口号建立信任',
            'year'     => '2023',
            'category' => '数字产品',
            'summary'  => '用真实数据与克制的界面语言，替代行业里泛滥的夸张承诺。',
            'image'    => '',
            'featured' => false,
        ],
    ],
];
