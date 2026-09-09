// bamboo-detail.html 专属脚本：iframe 高度自适应 + 覆盖默认商品为竹韵小夜灯数据
(function () {
  // iframe 高度自适应（与 beach_chair 处理方式一致）
  var f = document.getElementById('bambooEmbed');
  if (f) {
    window.addEventListener('message', function (ev) {
      var d = ev.data;
      if (d && d.type === 'linguang-embed-height' && typeof d.h === 'number') {
        if (d.h > 200) f.style.height = d.h + 'px';
      }
    });
  }

  // 覆盖 main.js 的默认商品渲染，展示竹韵小夜灯数据
  document.addEventListener('DOMContentLoaded', function () {
    function $el(s) { return document.querySelector(s); }
    if ($el('[data-breadcrumb-title]')) $el('[data-breadcrumb-title]').textContent = '竹韵小夜灯';
    if ($el('[data-detail-cat]')) $el('[data-detail-cat]').textContent = '🪵 木作手作 / 激光切割系列';
    if ($el('[data-detail-title]')) $el('[data-detail-title]').textContent = '竹韵小夜灯 · 激光切割木作';
    var pw = $el('[data-detail-price]');
    if (pw) pw.innerHTML = '<span class="price-current">¥129</span><span class="price-original">¥159</span><span class="discount-tag">限时8折</span>';
    if ($el('[data-detail-desc]')) $el('[data-detail-desc]').textContent = '竹韵小夜灯采用 3mm 椴木胶合板激光切割，四面竹节镂空设计，无需胶水即可插接组装。内置 LED 茶蜡灯，夜晚投下斑驳竹影，温暖治愈。亲子一起动手，收获一盏属于自己的小夜灯。';
    var setMeta = function (k, v) { var e = $el('[data-meta-' + k + ']'); if (e && v) e.textContent = v; };
    setMeta('sku', 'LGY-WOOD-002');
    setMeta('material', '椴木胶合板 + LED 茶蜡灯');
    setMeta('craftsman', '森木工坊');
    setMeta('leadtime', '现货 / 定制款3-5天');
    setMeta('delivery', '顺丰包邮 · 48小时内发货');

    var mi = document.getElementById('mainProductImage');
    if (mi) mi.src = 'content/bamboo_lamp/img/product.webp';
    var thumbs = $el('[data-gallery-thumbs]');
    if (thumbs) {
      var imgs = [
        'content/bamboo_lamp/img/product.webp',
        'content/bamboo_lamp/img/blueprint.png',
        'content/bamboo_lamp/img/parts_flatlay.png',
        'content/bamboo_lamp/img/scene_showcase.png'
      ];
      thumbs.innerHTML = imgs.map(function (s, i) {
        return '<button class="product-thumb' + (i === 0 ? ' active' : '') + '"><img src="' + s + '" alt=""></button>';
      }).join('');
      thumbs.querySelectorAll('.product-thumb').forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          thumbs.querySelectorAll('.product-thumb').forEach(function (t) { t.classList.remove('active'); });
          thumb.classList.add('active');
          if (mi) {
            var im = thumb.querySelector('img');
            if (im) {
              mi.style.opacity = '0';
              setTimeout(function () { mi.src = im.src; mi.style.opacity = '1'; }, 200);
            }
          }
        });
      });
    }

    var colors = $el('[data-variant-colors]');
    if (colors) {
      colors.innerHTML = '<button class="variant-option active">暖黄 2700K</button><button class="variant-option">暖白 3000K</button><button class="variant-option">冷暖可调</button><button class="variant-option disabled">茶蜡套装 (缺货)</button>';
      colors.querySelectorAll('.variant-option').forEach(function (opt) {
        opt.addEventListener('click', function () {
          if (opt.classList.contains('disabled')) return;
          colors.querySelectorAll('.variant-option').forEach(function (o) { o.classList.remove('active'); });
          opt.classList.add('active');
          var label = opt.closest('.product-variants').querySelector('.selected-value');
          if (label) label.textContent = opt.textContent;
        });
      });
    }
    var sizes = $el('[data-variant-sizes]');
    if (sizes) {
      sizes.innerHTML = '<button class="variant-option active">标准款 10×10×12cm</button><button class="variant-option">大号 15×15×18cm</button>';
      sizes.querySelectorAll('.variant-option').forEach(function (opt) {
        opt.addEventListener('click', function () {
          sizes.querySelectorAll('.variant-option').forEach(function (o) { o.classList.remove('active'); });
          opt.classList.add('active');
          var label = opt.closest('.product-variants').querySelector('.selected-value');
          if (label) label.textContent = opt.textContent;
        });
      });
    }

    var spec = $el('[data-spec-table]');
    if (spec) {
      spec.innerHTML = '<tr><td>商品名称</td><td>竹韵小夜灯 · 激光切割木作</td></tr>'
        + '<tr><td>商品编号</td><td>LGY-WOOD-002</td></tr>'
        + '<tr><td>品牌</td><td>鳞光屿 Linguang Island</td></tr>'
        + '<tr><td>系列</td><td>激光切割系列</td></tr>'
        + '<tr><td>材质</td><td>椴木胶合板（3mm）</td></tr>'
        + '<tr><td>板材规格</td><td>3mm × 300mm × 200mm</td></tr>'
        + '<tr><td>灯源</td><td>LED 茶蜡灯（电子无火）</td></tr>'
        + '<tr><td>灯光色温</td><td>暖黄 2700K / 暖白 3000K</td></tr>'
        + '<tr><td>标准款尺寸</td><td>10cm × 10cm × 12cm</td></tr>'
        + '<tr><td>大号尺寸</td><td>15cm × 15cm × 18cm</td></tr>'
        + '<tr><td>重量</td><td>约120g（标准款）</td></tr>'
        + '<tr><td>组装方式</td><td>插接/卡扣，无需胶水</td></tr>'
        + '<tr><td>制作方式</td><td>激光切割 + 手工打磨</td></tr>'
        + '<tr><td>制作周期</td><td>现货48小时发货 / 定制3-5天</td></tr>'
        + '<tr><td>可选色温</td><td>暖黄、暖白、冷暖可调</td></tr>'
        + '<tr><td>使用注意</td><td>仅使用 LED 灯源，勿用真蜡烛</td></tr>'
        + '<tr><td>产地</td><td>中国 · 武汉</td></tr>'
        + '<tr><td>手作人</td><td>森木工坊</td></tr>';
    }

    if ($el('[data-video-title]')) $el('[data-video-title]').textContent = '一刀一灯见匠心 · 竹灯手作全过程';
    if ($el('[data-video-sub]')) $el('[data-video-sub]').textContent = '时长 2:56 · 记录从图纸到灯影的诞生';
    if ($el('[data-pdf-name]')) $el('[data-pdf-name]').textContent = '竹韵小夜灯 · 作品手册.pdf';
  });
})();
