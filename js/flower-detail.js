// flower-detail.html 专属脚本：iframe 高度自适应 + 覆盖默认商品为木质花朵盆栽数据
(function () {
  // iframe 高度自适应（与 beach_chair / bamboo 处理方式一致）
  var f = document.getElementById('flowerEmbed');
  if (f) {
    window.addEventListener('message', function (ev) {
      var d = ev.data;
      if (d && d.type === 'linguang-embed-height' && typeof d.h === 'number') {
        if (d.h > 200) f.style.height = d.h + 'px';
      }
    });
  }

  // 覆盖 main.js 的默认商品渲染，展示木质花朵盆栽数据
  document.addEventListener('DOMContentLoaded', function () {
    function $el(s) { return document.querySelector(s); }
    if ($el('[data-breadcrumb-title]')) $el('[data-breadcrumb-title]').textContent = '木质花朵盆栽';
    if ($el('[data-detail-cat]')) $el('[data-detail-cat]').textContent = '🪵 木作手作 / 激光切割系列';
    if ($el('[data-detail-title]')) $el('[data-detail-title]').textContent = '木质花朵盆栽 · 激光切割木作';
    var pw = $el('[data-detail-price]');
    if (pw) pw.innerHTML = '<span class="price-current">¥89</span><span class="price-original">¥119</span><span class="discount-tag">限时7.5折</span>';
    if ($el('[data-detail-desc]')) $el('[data-detail-desc]').textContent = '木质花朵盆栽采用 3mm 椴木/杨木胶合板激光切割，花盆与花朵全部插接榫卯拼装，无需胶水。多层花瓣层层叠加成饱满花球，摆在桌面温暖治愈，亲子一起动手，收获一盆属于自己的花。';
    var setMeta = function (k, v) { var e = $el('[data-meta-' + k + ']'); if (e && v) e.textContent = v; };
    setMeta('sku', 'LGY-WOOD-003');
    setMeta('material', '椴木 / 杨木胶合板');
    setMeta('craftsman', '木艺花坊');
    setMeta('leadtime', '现货 / 定制款3-5天');
    setMeta('delivery', '顺丰包邮 · 48小时内发货');

    var mi = document.getElementById('mainProductImage');
    if (mi) mi.src = 'content/flower/img/product.webp';
    var thumbs = $el('[data-gallery-thumbs]');
    if (thumbs) {
      var imgs = [
        'content/flower/img/product.webp',
        'content/flower/img/blueprint.png',
        'content/flower/img/parts_flatlay.png',
        'content/flower/img/scene_showcase.png'
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
      colors.innerHTML = '<button class="variant-option active">原木色</button><button class="variant-option">胡桃色</button><button class="variant-option">彩色手绘</button><button class="variant-option disabled">上色套装 (缺货)</button>';
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
      sizes.innerHTML = '<button class="variant-option active">标准款 高12cm</button><button class="variant-option">大号 高16cm</button>';
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
      spec.innerHTML = '<tr><td>商品名称</td><td>木质花朵盆栽 · 激光切割木作</td></tr>'
        + '<tr><td>商品编号</td><td>LGY-WOOD-003</td></tr>'
        + '<tr><td>品牌</td><td>鳞光屿 Linguang Island</td></tr>'
        + '<tr><td>系列</td><td>激光切割系列</td></tr>'
        + '<tr><td>材质</td><td>椴木 / 杨木胶合板（3mm）</td></tr>'
        + '<tr><td>板材规格</td><td>3mm × 300mm × 200mm</td></tr>'
        + '<tr><td>零件数量</td><td>16 种（花盆 8 种 + 花朵 8 种）</td></tr>'
        + '<tr><td>标准款高度</td><td>12cm（花盆 + 花朵）</td></tr>'
        + '<tr><td>大号高度</td><td>16cm（花盆 + 花朵）</td></tr>'
        + '<tr><td>配色</td><td>原木色 / 胡桃色 / 彩色手绘</td></tr>'
        + '<tr><td>重量</td><td>约90g（标准款）</td></tr>'
        + '<tr><td>组装方式</td><td>插接 / 榫卯，无需胶水</td></tr>'
        + '<tr><td>制作方式</td><td>激光切割 + 手工打磨</td></tr>'
        + '<tr><td>制作周期</td><td>现货48小时发货 / 定制3-5天</td></tr>'
        + '<tr><td>可选加工</td><td>可喷漆 / 涂色 DIY</td></tr>'
        + '<tr><td>使用注意</td><td>儿童请在成人陪同下操作</td></tr>'
        + '<tr><td>产地</td><td>中国 · 武汉</td></tr>'
        + '<tr><td>手作人</td><td>木艺花坊</td></tr>';
    }

    if ($el('[data-video-title]')) $el('[data-video-title]').textContent = '一刀一花见匠心 · 花盆手作全过程';
    if ($el('[data-video-sub]')) $el('[data-video-sub]').textContent = '时长 3:12 · 记录从图纸到花开的诞生';
    if ($el('[data-pdf-name]')) $el('[data-pdf-name]').textContent = '木质花朵盆栽 · 作品手册.pdf';
  });
})();
