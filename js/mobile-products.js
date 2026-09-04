/* 移动端 products 页：筛选做在一行（下拉选择），桌面端不受影响 */
(function () {
  if (window.innerWidth > 768) return;

  var bar = document.querySelector('.mobile-filter-bar');
  if (!bar) return;
  var grid = document.querySelector('[data-product-grid]');

  function makeSelect(datasetKey, options, firstLabel) {
    var sel = document.createElement('select');
    sel.className = 'mobile-filter-select';
    sel.setAttribute(datasetKey, '');
    if (firstLabel) {
      var all = document.createElement('option');
      all.value = 'all';
      all.textContent = firstLabel;
      sel.appendChild(all);
    }
    options.forEach(function (o) {
      var opt = document.createElement('option');
      opt.value = o.value;
      opt.textContent = o.label;
      sel.appendChild(opt);
    });
    return sel;
  }

  /* 分类下拉 */
  var catSel = makeSelect('data-mobile-cat', [
    { value: 'jewelry', label: '手工饰品' },
    { value: 'knit', label: '编织手作' },
    { value: 'ceramic', label: '陶艺器皿' },
    { value: 'leather', label: '皮具手作' },
    { value: 'candle', label: '香薰蜡烛' },
    { value: 'stationery', label: '手账文具' }
  ], '全部商品');
  bar.appendChild(catSel);

  /* 颜色 / 材质下拉（选项来自商品数据） */
  var colors = [], materials = [];
  if (window.SITE_DATA && SITE_DATA.products) {
    SITE_DATA.products.forEach(function (p) {
      (p.colors || []).forEach(function (c) {
        if (colors.indexOf(c) < 0) colors.push(c);
      });
      if (p.material && materials.indexOf(p.material) < 0) materials.push(p.material);
    });
  }
  var colorSel = makeSelect('data-mobile-color',
    colors.map(function (c) { return { value: c, label: c }; }), '全部颜色');
  var matSel = makeSelect('data-mobile-material',
    materials.map(function (m) { return { value: m, label: m }; }), '全部材质');
  bar.appendChild(colorSel);
  bar.appendChild(matSel);

  function productOf(card) {
    var a = card.querySelector('a[href*="product-detail.html?id="]');
    if (!a) return null;
    var m = a.getAttribute('href').match(/id=(\d+)/);
    if (!m) return null;
    var id = parseInt(m[1], 10);
    if (!window.SITE_DATA || !SITE_DATA.products) return null;
    for (var i = 0; i < SITE_DATA.products.length; i++) {
      if (SITE_DATA.products[i].id === id) return SITE_DATA.products[i];
    }
    return null;
  }

  function applyColorMaterial() {
    if (!grid) return;
    var sc = colorSel.value, sm = matSel.value;
    grid.querySelectorAll('.product-card').forEach(function (card) {
      var p = productOf(card);
      if (!p) { card.style.display = ''; return; }
      var cOk = sc === 'all' || (p.colors || []).indexOf(sc) >= 0;
      var mOk = sm === 'all' || (p.material || '').indexOf(sm) >= 0;
      card.style.display = (cOk && mOk) ? '' : 'none';
    });
  }

  catSel.addEventListener('change', function () {
    var val = catSel.value;
    var checks = document.querySelectorAll('.filter-item input[data-category]');
    var target = null, all = null;
    checks.forEach(function (c) {
      c.checked = false;
      if (c.getAttribute('data-category') === 'all') all = c;
      if (c.getAttribute('data-category') === val) target = c;
    });
    if (target) {
      target.checked = true;
      target.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (all) {
      all.checked = true;
      all.dispatchEvent(new Event('change', { bubbles: true }));
    }
    applyColorMaterial();
  });

  colorSel.addEventListener('change', applyColorMaterial);
  matSel.addEventListener('change', applyColorMaterial);

  /* 每次网格重新渲染后重新应用颜色/材质过滤 */
  if (grid && window.MutationObserver) {
    var obs = new MutationObserver(applyColorMaterial);
    obs.observe(grid, { childList: true });
  }

  applyColorMaterial();
})();
