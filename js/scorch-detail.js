// scorch-detail.html 专属脚本：iframe 高度自适应 + 覆盖默认商品为上色木片数据
(function () {
  // iframe 高度自适应（与 beach_chair / bamboo / flower 处理方式一致）
  var f = document.getElementById('scorchEmbed');
  if (f) {
    window.addEventListener('message', function (ev) {
      var d = ev.data;
      if (d && d.type === 'linguang-embed-height' && typeof d.h === 'number') {
        if (d.h > 200) f.style.height = d.h + 'px';
      }
    });
    // 告知嵌套页父视口模式：桌面只显示概述（紧凑），移动端直排全部版块
    setTimeout(function () {
      try {
        f.contentWindow.postMessage({ type: 'linguang-embed-mode', mobile: window.innerWidth < 768 }, '*');
      } catch (e) {}
    }, 300);
  }

  // 覆盖 main.js 的默认商品渲染，展示上色木片数据
  document.addEventListener('DOMContentLoaded', function () {
    function $el(s) { return document.querySelector(s); }
    if ($el('[data-breadcrumb-title]')) $el('[data-breadcrumb-title]').textContent = '上色木片 · 滴胶封层';
    if ($el('[data-detail-cat]')) $el('[data-detail-cat]').textContent = '🪵 木作手作 / 上色滴胶系列';
    if ($el('[data-detail-title]')) $el('[data-detail-title]').textContent = '上色木片 · 滴胶封层（镂空模板手作）';
    var pw = $el('[data-detail-price]');
    if (pw) pw.innerHTML = '<span class="price-current">¥69</span><span class="price-original">¥92</span><span class="discount-tag">限时7.5折</span>';
    if ($el('[data-detail-desc]')) $el('[data-detail-desc]').textContent = '带树皮边缘的原木切片，以镂空模板定位出规整图案，用丙烯颜料均匀上色，最后浇注环氧树脂滴胶封层——光洁如瓷、防水耐用。每一片的天然木纹都独一无二，可作挂饰、杯垫或伴手礼。';
    var setMeta = function (k, v) { var e = $el('[data-meta-' + k + ']'); if (e && v) e.textContent = v; };
    setMeta('sku', 'LGY-WOOD-004');
    setMeta('material', '原木切片 + 环氧滴胶 + 丙烯颜料');
    setMeta('craftsman', '拾木手作');
    setMeta('leadtime', '现货 / 定制款3-5天');
    setMeta('delivery', '顺丰包邮 · 48小时内发货');

    var mi = document.getElementById('mainProductImage');
    if (mi) mi.src = 'content/scorch_marker/img/process.jpg';
    var thumbs = $el('[data-gallery-thumbs]');
    if (thumbs) {
      var imgs = ['content/scorch_marker/img/process.jpg'];
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
      colors.innerHTML = '<button class="variant-option active">花卉图案</button><button class="variant-option">叶脉图案</button><button class="variant-option">蝴蝶图案</button><button class="variant-option disabled">定制图案 (缺货)</button>';
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
      sizes.innerHTML = '<button class="variant-option active">标准款 直径8cm</button><button class="variant-option">大号 直径12cm</button>';
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
      spec.innerHTML = '<tr><td>商品名称</td><td>上色木片 · 滴胶封层摆件</td></tr>'
        + '<tr><td>商品编号</td><td>LGY-WOOD-004</td></tr>'
        + '<tr><td>品牌</td><td>鳞光屿 Linguang Island</td></tr>'
        + '<tr><td>系列</td><td>上色滴胶系列</td></tr>'
        + '<tr><td>材质</td><td>原木切片（椴木/桦木）+ 环氧树脂滴胶</td></tr>'
        + '<tr><td>原木切片</td><td>带树皮边缘，直径约 8-12cm</td></tr>'
        + '<tr><td>镂空模板</td><td>含 2 款（花卉 / 叶脉）</td></tr>'
        + '<tr><td>上色方式</td><td>镂空模板定位 + 丙烯颜料填涂</td></tr>'
        + '<tr><td>封层工艺</td><td>环氧树脂 AB 胶滴胶封层</td></tr>'
        + '<tr><td>标准款尺寸</td><td>直径约 8cm × 厚 1.5cm</td></tr>'
        + '<tr><td>大号尺寸</td><td>直径约 12cm × 厚 1.5cm</td></tr>'
        + '<tr><td>重量</td><td>约 60g（标准款）/ 约 120g（大号）</td></tr>'
        + '<tr><td>固化时间</td><td>常温 24 小时完全固化</td></tr>'
        + '<tr><td>适用场景</td><td>挂饰 / 杯垫 / 桌面摆件 / 伴手礼</td></tr>'
        + '<tr><td>儿童使用</td><td>6 岁以上，建议成人陪同</td></tr>'
        + '<tr><td>定制</td><td>图案与配色可定制（3-5 天）</td></tr>'
        + '<tr><td>产地</td><td>中国 · 武汉</td></tr>'
        + '<tr><td>手作人</td><td>拾木手作</td></tr>';
    }

    if ($el('[data-video-title]')) $el('[data-video-title]').textContent = '一笔一色见匠心 · 木片上色全过程';
    if ($el('[data-video-sub]')) $el('[data-video-sub]').textContent = '时长 2:48 · 记录从原木切片到滴胶封层的诞生';
    if ($el('[data-pdf-name]')) $el('[data-pdf-name]').textContent = '上色木片 · 手工教程.pdf';
  });
})();
