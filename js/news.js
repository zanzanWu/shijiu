/* ============================================
   news! 新品页：渲染最新最热门 12 件商品 + 分类标签筛选
   排序口径：新品/NEW 优先 → 热销次之 → 销量降序 → 编号降序
   ============================================ */
(function () {
  'use strict';

  var grid = document.getElementById('news-grid');
  var countEl = document.querySelector('[data-news-count]');
  var tagBar = document.getElementById('news-filter');
  if (!grid || !window.SITE_DATA || !SITE_DATA.products) return;

  var products = SITE_DATA.products.slice();

  /* ---------- 最新最热门排序 ---------- */
  function hotClass(p) {
    var t = (p.tag || '').toLowerCase();
    if (t.indexOf('新') >= 0 || t.indexOf('new') >= 0) return 2; // 新品
    if (t.indexOf('热') >= 0) return 1;                           // 热销
    return 0;
  }

  products.sort(function (a, b) {
    var ca = hotClass(a), cb = hotClass(b);
    if (ca !== cb) return cb - ca;
    if ((b.soldCount || 0) !== (a.soldCount || 0)) return (b.soldCount || 0) - (a.soldCount || 0);
    return b.id - a.id;
  });

  /* 固定取前 12 件 */
  var FEATURED = products.slice(0, 12);

  /* ---------- 工具函数 ---------- */
  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function badgeClassFor(t) {
    if (t.indexOf('折') >= 0 || t.indexOf('省') >= 0) return 'badge-sale';
    if (t.indexOf('新') >= 0 || t.toLowerCase().indexOf('new') >= 0) return 'badge-new';
    if (t.indexOf('热') >= 0) return 'badge-coral';
    return 'badge-sale';
  }

  function cardHtml(p) {
    var badge = '';
    if (p.tag) {
      badge = '<div class="product-badges"><span class="badge ' + badgeClassFor(p.tag) + '">' + escapeHtml(p.tag) + '</span></div>';
    }
    var orig = '';
    if (p.originalPrice && p.originalPrice > p.price) {
      orig = '<span class="price-original">¥' + p.originalPrice + '</span>';
    }
    return (
      '<div class="product-card">' +
      '<div class="product-card-img-wrap">' +
      badge +
      '<button class="product-wishlist" aria-label="收藏">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
      '</button>' +
      '<a href="product-detail.html?id=' + p.id + '"><img class="product-card-img" src="' + p.image + '" alt="' + escapeHtml(p.title) + '" loading="lazy"></a>' +
      '</div>' +
      '<div class="product-card-body">' +
      '<div class="product-card-category">' + escapeHtml(p.categoryName || '') + '</div>' +
      '<a class="product-card-title" href="product-detail.html?id=' + p.id + '">' + escapeHtml(p.title) + '</a>' +
      '<div class="product-card-price"><span class="price-current">¥' + p.price + '</span>' + orig + '</div>' +
      '</div>' +
      '</div>'
    );
  }

  function bindWishlist() {
    grid.querySelectorAll('.product-wishlist').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('active');
      });
    });
  }

  /* ---------- 渲染 ---------- */
  var activeCat = 'all';

  function render() {
    var list = FEATURED;
    if (activeCat !== 'all') {
      list = list.filter(function (p) { return p.category === activeCat; });
    }
    grid.innerHTML = list.map(cardHtml).join('');
    bindWishlist();
    if (countEl) {
      countEl.innerHTML = activeCat === 'all'
        ? '精选最新最热 <strong>' + list.length + '</strong> 件手作新品'
        : '「' + (activeCatLabel() || '') + '」共 <strong>' + list.length + '</strong> 件新品';
    }
  }

  function activeCatLabel() {
    var t = tagBar.querySelector('.news-tag.active');
    return t ? t.textContent.trim() : '';
  }

  /* ---------- 分类标签点击 ---------- */
  tagBar.querySelectorAll('.news-tag').forEach(function (btn) {
    btn.addEventListener('click', function () {
      tagBar.querySelectorAll('.news-tag').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeCat = btn.getAttribute('data-cat');
      render();
    });
  });

  render();
})();
