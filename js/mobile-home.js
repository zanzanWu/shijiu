/* 移动端首页：仅展示全部商品（一行两列），桌面端不受影响 */
(function () {
  function isMobile() {
    return window.innerWidth <= 768;
  }

  var grid = document.getElementById('home-product-grid');
  if (!grid) return;
  var original = null;

  function badgeClassFor(t) {
    if (t.indexOf('折') >= 0 || t.indexOf('省') >= 0) return 'badge-sale';
    if (t.indexOf('新') >= 0) return 'badge-new';
    if (t.indexOf('热') >= 0) return 'badge-coral';
    return 'badge-sale';
  }

  function cardHtml(p) {
    var badge = '';
    if (p.tag) {
      badge = '<div class="product-badges"><span class="badge ' + badgeClassFor(p.tag) + '">' + p.tag + '</span></div>';
    }
    var orig = (p.originalPrice && p.originalPrice > p.price) ? '<span class="price-original">¥' + p.originalPrice + '</span>' : '';
    return '<div class="product-card">' +
      '<div class="product-card-img-wrap">' + badge +
      '<a href="product-detail.html?id=' + p.id + '"><img class="product-card-img" src="' + p.image + '" alt="' + p.title + '" loading="lazy"></a>' +
      '</div>' +
      '<div class="product-card-body">' +
      '<div class="product-card-category">' + (p.categoryName || '') + '</div>' +
      '<a class="product-card-title" href="product-detail.html?id=' + p.id + '">' + p.title + '</a>' +
      '<div class="product-card-price"><span class="price-current">¥' + p.price + '</span>' + orig + '</div>' +
      '</div></div>';
  }

  function renderAll() {
    if (!isMobile()) {
      if (original !== null) {
        grid.innerHTML = original;
        original = null;
      }
      return;
    }
    if (original === null) original = grid.innerHTML;
    if (!window.SITE_DATA || !SITE_DATA.products || SITE_DATA.products.length === 0) return;
    grid.innerHTML = SITE_DATA.products.map(cardHtml).join('');
  }

  renderAll();
  window.addEventListener('resize', renderAll);
})();
