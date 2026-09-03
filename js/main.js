/* ============================================
   鳞光屿 Linguang Island - 交互脚本
   ============================================ */

(function () {
  'use strict';

  // ========== Header Scroll Effect ==========
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    });
  }

  // ========== Back to Top ==========
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== Mobile Menu ==========
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  function openMobileMenu() {
    if (mobileMenu) mobileMenu.classList.add('active');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

  // Close mobile menu on link click
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // ========== Wishlist Toggle ==========
  const wishlistBtns = document.querySelectorAll('.product-wishlist');
  wishlistBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('active');
      // Update cart badge count
      updateCartBadge();
    });
  });

  // ========== Cart Badge ==========
  function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (!badge) return;
    let count = parseInt(badge.textContent) || 0;
    // This is a demo - in real app would track actual cart
    badge.textContent = count;
  }

  // ========== Toast Notification ==========
  function showToast(message) {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      toast.style.cssText =
        'position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(100px);' +
        'background-color:#2D6A5E;color:#fff;padding:14px 28px;border-radius:9999px;' +
        'font-size:14px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.2);' +
        'z-index:9999;transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    requestAnimationFrame(function () {
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(function () {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 2500);
  }

  // ========== Quantity Control ==========
  const quantityControls = document.querySelectorAll('.quantity-control');
  quantityControls.forEach(function (control) {
    const input = control.querySelector('.quantity-input');
    const minusBtn = control.querySelector('.quantity-minus');
    const plusBtn = control.querySelector('.quantity-plus');

    if (minusBtn) {
      minusBtn.addEventListener('click', function () {
        let val = parseInt(input.value) || 1;
        if (val > 1) {
          val--;
          input.value = val;
        }
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', function () {
        let val = parseInt(input.value) || 1;
        if (val < 99) {
          val++;
          input.value = val;
        }
      });
    }

    if (input) {
      input.addEventListener('change', function () {
        let val = parseInt(input.value) || 1;
        val = Math.max(1, Math.min(99, val));
        input.value = val;
      });
    }
  });

  // ========== Variant Selection ==========
  const variantGroups = document.querySelectorAll('.product-variants');
  variantGroups.forEach(function (group) {
    const options = group.querySelectorAll('.variant-option');
    options.forEach(function (option) {
      option.addEventListener('click', function () {
        if (option.classList.contains('disabled')) return;
        options.forEach(function (o) {
          o.classList.remove('active');
        });
        option.classList.add('active');
        // Update selected value label
        const label = group.querySelector('.selected-value');
        if (label) {
          label.textContent = option.textContent;
        }
      });
    });
  });

  // ========== Color Swatch Selection ==========
  const colorSwatches = document.querySelectorAll('.color-swatch');
  colorSwatches.forEach(function (swatch) {
    swatch.addEventListener('click', function () {
      const parent = swatch.parentElement;
      parent.querySelectorAll('.color-swatch').forEach(function (s) {
        s.classList.remove('active');
      });
      swatch.classList.add('active');
    });
  });

  // ========== Product Tabs ==========
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = btn.getAttribute('data-tab');
      tabBtns.forEach(function (b) {
        b.classList.remove('active');
      });
      tabContents.forEach(function (c) {
        c.classList.remove('active');
      });
      btn.classList.add('active');
      const targetContent = document.querySelector('.tab-content[data-tab="' + target + '"]');
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // ========== Product Gallery Thumbnails ==========
  const thumbs = document.querySelectorAll('.product-thumb');
  const mainImage = document.querySelector('.product-gallery-main img');
  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      thumbs.forEach(function (t) {
        t.classList.remove('active');
      });
      thumb.classList.add('active');
      if (mainImage) {
        const img = thumb.querySelector('img');
        if (img) {
          mainImage.style.opacity = '0';
          setTimeout(function () {
            mainImage.src = img.src;
            mainImage.style.opacity = '1';
          }, 200);
        }
      }
    });
  });

  // Add transition to main image
  if (mainImage) {
    mainImage.style.transition = 'opacity 0.3s ease';
  }

  // ========== 商品列表页：筛选 / 排序 / 分页（数据驱动，与手工制作功能对齐） ==========
  function initProductList() {
    const grid = document.querySelector('[data-product-grid]');
    if (!grid || !window.SITE_DATA || !SITE_DATA.products) return;

    const infoEl = document.querySelector('[data-results-info]');
    const pagEl = document.querySelector('[data-pagination]');
    const sortSelect = document.querySelector('[data-sort]');
    const categoryChecks = document.querySelectorAll('.filter-item input[type="checkbox"][data-category]');
    const allCheck = document.querySelector('.filter-item input[type="checkbox"][data-category="all"]');
    const priceMinInput = document.querySelector('.price-range .price-input:first-of-type');
    const priceMaxInput = document.querySelector('.price-range .price-input:last-of-type');

    const products = SITE_DATA.products;
    const perPage = 8;

    const state = {
      categories: [],
      priceMin: 0,
      priceMax: Infinity,
      sort: 'default',
      page: 1,
      keyword: ''
    };

    // 从勾选态同步分类
    function syncCategoriesFromChecks() {
      state.categories = [];
      categoryChecks.forEach(function (c) {
        const cat = c.getAttribute('data-category');
        if (cat !== 'all' && c.checked) state.categories.push(cat);
      });
    }

    // 从 URL 读取参数（?cat= / ?category= / ?q= / ?sort=）
    function applyUrlParams() {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('cat') || params.get('category');
      if (cat) {
        const check = document.querySelector('.filter-item input[type="checkbox"][data-category="' + cat + '"]');
        if (check) {
          categoryChecks.forEach(function (c) { c.checked = false; });
          if (allCheck) allCheck.checked = false;
          check.checked = true;
          syncCategoriesFromChecks();
        }
      }
      const q = params.get('q');
      if (q) state.keyword = q.trim();
      const s = params.get('sort');
      if (s && sortSelect) {
        const opt = sortSelect.querySelector('option[value="' + s + '"]');
        if (opt) {
          sortSelect.value = s;
          state.sort = s;
        }
      }
    }

    function getFiltered() {
      let list = products.slice();

      if (state.keyword) {
        const kw = state.keyword.toLowerCase();
        list = list.filter(function (p) {
          return (
            (p.title && p.title.toLowerCase().indexOf(kw) >= 0) ||
            (p.categoryName && p.categoryName.toLowerCase().indexOf(kw) >= 0) ||
            (p.material && p.material.toLowerCase().indexOf(kw) >= 0) ||
            (p.desc && p.desc.toLowerCase().indexOf(kw) >= 0) ||
            (p.series && p.series.toLowerCase().indexOf(kw) >= 0)
          );
        });
      }

      if (state.categories.length > 0) {
        list = list.filter(function (p) { return state.categories.indexOf(p.category) >= 0; });
      }

      const min = isFinite(state.priceMin) ? state.priceMin : 0;
      const max = isFinite(state.priceMax) ? state.priceMax : Infinity;
      list = list.filter(function (p) { return p.price >= min && p.price <= max; });

      if (state.sort === 'price-asc') {
        list.sort(function (a, b) { return a.price - b.price; });
      } else if (state.sort === 'price-desc') {
        list.sort(function (a, b) { return b.price - a.price; });
      } else if (state.sort === 'sales') {
        list.sort(function (a, b) { return (b.soldCount || 0) - (a.soldCount || 0); });
      } else if (state.sort === 'rating') {
        list.sort(function (a, b) { return b.rating - a.rating; });
      } else if (state.sort === 'new') {
        list.sort(function (a, b) {
          const isNew = function (p) { return /新|new/i.test(p.tag || '') ? 1 : 0; };
          return (isNew(b) - isNew(a)) || (b.id - a.id);
        });
      }
      return list;
    }

    function render() {
      const filtered = getFiltered();
      const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
      if (state.page > totalPages) state.page = totalPages;
      if (state.page < 1) state.page = 1;
      const start = (state.page - 1) * perPage;
      const pageItems = filtered.slice(start, start + perPage);

      if (pageItems.length === 0) {
        grid.innerHTML = '<div class="no-results"><div class="no-results-icon">🔍</div><h3>暂无商品</h3><p>当前条件下没有找到商品，试试调整筛选条件吧</p></div>';
      } else {
        grid.innerHTML = pageItems.map(productCardHtml).join('');
      }
      bindCardButtons(grid);

      if (infoEl) {
        let html = '共找到 <strong>' + filtered.length + '</strong> 件手作商品';
        if (state.keyword) {
          html = '「' + escapeHtml(state.keyword) + '」的搜索结果：共找到 <strong>' + filtered.length + '</strong> 件手作商品';
        }
        if (filtered.length > 0) {
          html += ' · 当前显示第 ' + (start + 1) + '-' + Math.min(start + perPage, filtered.length) + ' 件';
        }
        infoEl.innerHTML = html;
      }

      renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
      if (!pagEl) return;
      if (totalPages <= 1) {
        pagEl.innerHTML = '';
        return;
      }
      let html = '<button class="page-btn' + (state.page === 1 ? ' disabled' : '') + '" data-page="prev" aria-label="上一页">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>';
      for (let i = 1; i <= totalPages; i++) {
        html += '<button class="page-btn' + (i === state.page ? ' active' : '') + '" data-page="' + i + '">' + i + '</button>';
      }
      html += '<button class="page-btn' + (state.page === totalPages ? ' disabled' : '') + '" data-page="next" aria-label="下一页">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>';
      pagEl.innerHTML = html;

      pagEl.querySelectorAll('.page-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (btn.classList.contains('disabled')) return;
          const page = btn.getAttribute('data-page');
          if (page === 'prev') state.page = Math.max(1, state.page - 1);
          else if (page === 'next') state.page = Math.min(totalPages, state.page + 1);
          else state.page = parseInt(page, 10);
          render();
          const top = document.querySelector('.products-toolbar');
          if (top) window.scrollTo({ top: top.offsetTop - 110, behavior: 'smooth' });
        });
      });
    }

    // 分类勾选
    categoryChecks.forEach(function (check) {
      check.addEventListener('change', function () {
        if (check.getAttribute('data-category') === 'all') {
          if (check.checked) {
            categoryChecks.forEach(function (c) {
              if (c.getAttribute('data-category') !== 'all') c.checked = false;
            });
            state.categories = [];
          }
        } else {
          if (check.checked && allCheck) allCheck.checked = false;
          syncCategoriesFromChecks();
          if (state.categories.length === 0 && allCheck) allCheck.checked = true;
        }
        state.page = 1;
        render();
      });
    });

    // 清除分类
    const clearBtns = document.querySelectorAll('.filter-clear');
    clearBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        categoryChecks.forEach(function (c) {
          c.checked = (c.getAttribute('data-category') === 'all');
        });
        state.categories = [];
        state.page = 1;
        render();
      });
    });

    // 价格区间
    function readPrice() {
      const min = priceMinInput ? parseFloat(priceMinInput.value) : NaN;
      const max = priceMaxInput ? parseFloat(priceMaxInput.value) : NaN;
      state.priceMin = isFinite(min) ? min : 0;
      state.priceMax = isFinite(max) ? max : Infinity;
    }
    [priceMinInput, priceMaxInput].forEach(function (input) {
      if (input) input.addEventListener('change', function () {
        readPrice();
        state.page = 1;
        render();
      });
    });

    // 排序
    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        state.sort = sortSelect.value;
        state.page = 1;
        render();
      });
    }

    // 卡片内按钮（收藏 / 快速加购）
    function bindCardButtons(container) {
      container.querySelectorAll('.product-wishlist').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          btn.classList.toggle('active');
        });
      });
    }

    // 商品卡片 HTML
    function productCardHtml(p) {
      let badgeHtml = '';
      if (p.tag) {
        badgeHtml = '<div class="product-badges"><span class="badge ' + badgeClassFor(p.tag) + '">' +
          escapeHtml(p.tag) + '</span></div>';
      }
      let origHtml = '';
      if (p.originalPrice && p.originalPrice > p.price) {
        origHtml = '<span class="price-original">¥' + p.originalPrice + '</span>';
      }
      return (
        '<div class="product-card">' +
        '<div class="product-card-img-wrap">' +
        badgeHtml +
        '<button class="product-wishlist" aria-label="收藏">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
        '</button>' +
        '<a href="product-detail.html?id=' + p.id + '"><img class="product-card-img" src="' + p.image + '" alt="' + escapeHtml(p.title) + '" loading="lazy"></a>' +
        '</div>' +
        '<div class="product-card-body">' +
        '<div class="product-card-category">' + escapeHtml(p.categoryName || '') + '</div>' +
        '<a class="product-card-title" href="product-detail.html?id=' + p.id + '">' + escapeHtml(p.title) + '</a>' +
        '<div class="product-card-price"><span class="price-current">¥' + p.price + '</span>' + origHtml + '</div>' +
        '</div>' +
        '</div>'
      );
    }

    applyUrlParams();
    render();
  }

  initProductList();

  // ========== Newsletter Form ==========
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      const email = input ? input.value.trim() : '';
      if (!email) {
        showToast('请输入邮箱地址');
        return;
      }
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        showToast('请输入正确的邮箱地址');
        return;
      }
      // 将订阅信息提交到店主邮箱 493200522@qq.com
      const subject = '鳞光屿官网 - 订阅申请';
      const body = '您收到一封来自鳞光屿官网的订阅申请：\n\n订阅邮箱：' + email + '\n\n（本邮件由官网订阅表单自动生成，请及时处理）';
      const mailtoUrl = 'mailto:493200522@qq.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = mailtoUrl;
      showToast('已打开邮件发送窗口，请确认发送');
      input.value = '';
    });
  }

  // ========== Event Countdown Timer ==========
  const countdownEl = document.querySelector('.event-countdown');
  if (countdownEl) {
    // Set target date: activity start time
    const targetDate = new Date('2026-09-14T14:00:00');

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        countdownEl.innerHTML = '<div class="countdown-item"><span class="countdown-num">00</span><span class="countdown-label">活动已结束</span></div>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const dayEl = countdownEl.querySelector('[data-unit="days"]');
      const hourEl = countdownEl.querySelector('[data-unit="hours"]');
      const minEl = countdownEl.querySelector('[data-unit="minutes"]');
      const secEl = countdownEl.querySelector('[data-unit="seconds"]');

      if (dayEl) dayEl.textContent = String(days).padStart(2, '0');
      if (hourEl) hourEl.textContent = String(hours).padStart(2, '0');
      if (minEl) minEl.textContent = String(minutes).padStart(2, '0');
      if (secEl) secEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ========== Add to Cart (Product Detail) ==========
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function () {
      const badge = document.querySelector('.cart-badge');
      const qtyInput = document.querySelector('.quantity-input');
      const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
      if (badge) {
        let count = parseInt(badge.textContent) || 0;
        count += qty;
        badge.textContent = count;
        badge.style.transform = 'scale(1.3)';
        setTimeout(function () {
          badge.style.transform = 'scale(1)';
        }, 200);
      }
      showToast('已加入购物车（' + qty + '件）');
    });
  }

  // Buy now button
  const buyNowBtn = document.querySelector('.buy-now-btn');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function () {
      showToast('正在跳转到结算页面...');
    });
  }

  // ========== Smooth Scroll for Anchor Links ==========
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== Intersection Observer for Fade-in Animations ==========
  const animateElements = document.querySelectorAll(
    '.product-card, .category-card, .testimonial-card, .event-highlight-card, .section-header'
  );

  if ('IntersectionObserver' in window && animateElements.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    animateElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // ========== Search Bar ==========
  const searchBar = document.querySelector('.search-bar');
  if (searchBar) {
    const input = searchBar.querySelector('input');
    const btn = searchBar.querySelector('button');
    function handleSearch() {
      if (input && input.value.trim()) {
        // Navigate to products page with search query
        window.location.href = 'products.html?q=' + encodeURIComponent(input.value.trim());
      }
    }
    if (btn) btn.addEventListener('click', handleSearch);
    if (input) {
      input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') handleSearch();
      });
    }
  }

  // ========== Initialize ==========
  console.log('%c鳞光屿 Linguang Island', 'color:#2D6A5E;font-size:20px;font-weight:bold;');

  // ========== 站内搜索浮层 ==========
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = document.querySelector('.search-input');
  const searchResults = document.querySelector('.search-results');
  const searchOpenBtns = document.querySelectorAll('[data-search-open]');
  const searchCloseBtn = document.querySelector('.search-close');

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function highlightText(text, keyword) {
    const kw = String(keyword || '').trim();
    const escaped = escapeHtml(text);
    if (!kw) return escaped;
    const escKw = escapeHtml(kw);
    const idx = escaped.toLowerCase().indexOf(escKw.toLowerCase());
    if (idx < 0) return escaped;
    return (
      escaped.slice(0, idx) +
      '<mark>' + escaped.slice(idx, idx + escKw.length) + '</mark>' +
      escaped.slice(idx + escKw.length)
    );
  }

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (searchInput) {
      searchInput.value = '';
      renderSearchResults('');
      setTimeout(function () { searchInput.focus(); }, 120);
    }
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  searchOpenBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openSearch();
    });
  });
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
  if (searchOverlay) {
    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) closeSearch();
    });
  }

  function renderSearchResults(keyword) {
    if (!searchResults || !window.SITE_DATA || !SITE_DATA.products) return;
    const kw = String(keyword || '').trim().toLowerCase();
    let results = SITE_DATA.products;
    if (kw) {
      results = results.filter(function (p) {
        return (
          (p.title && p.title.toLowerCase().indexOf(kw) >= 0) ||
          (p.categoryName && p.categoryName.toLowerCase().indexOf(kw) >= 0) ||
          (p.desc && p.desc.toLowerCase().indexOf(kw) >= 0) ||
          (p.material && p.material.toLowerCase().indexOf(kw) >= 0) ||
          (p.series && p.series.toLowerCase().indexOf(kw) >= 0)
        );
      });
    }

    if (results.length === 0) {
      searchResults.innerHTML =
        '<div class="search-empty"><p>未找到与「' + escapeHtml(keyword) +
        '」相关的商品，换个关键词试试吧</p></div>';
      return;
    }

    let html = '';
    results.slice(0, 8).forEach(function (p) {
      html +=
        '<a class="search-result-item" href="product-detail.html?id=' + p.id + '">' +
        '<img class="search-result-img" src="' + p.image + '" alt="">' +
        '<div class="search-result-info">' +
        '<div class="search-result-title">' + highlightText(p.title, kw) + '</div>' +
        '<div class="search-result-cat">' + escapeHtml(p.categoryName || '') + '</div>' +
        '<div class="search-result-desc">' + highlightText(p.desc || '', kw) + '</div>' +
        '</div>' +
        '</a>';
    });
    searchResults.innerHTML = html;
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      renderSearchResults(searchInput.value);
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && searchResults) {
        const first = searchResults.querySelector('.search-result-item');
        if (first) window.location.href = first.getAttribute('href');
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });

  // ========== 画廊放大 Lightbox ==========
  const galleryZoom = document.querySelector('.gallery-zoom');
  const galleryMainImg = document.getElementById('mainProductImage');
  if (galleryZoom && galleryMainImg) {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = '<button class="image-lightbox-close" aria-label="关闭">×</button><img alt="作品放大图">';
    document.body.appendChild(lightbox);

    const lbImg = lightbox.querySelector('img');
    const lbClose = lightbox.querySelector('.image-lightbox-close');

    function openLightbox() {
      lbImg.src = galleryMainImg.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    galleryZoom.addEventListener('click', openLightbox);
    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // ========== 视频占位模拟播放 ==========
  const videoPlaceholder = document.querySelector('.video-placeholder');
  if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', function () {
      const vp = videoPlaceholder.querySelector('.video-play-btn');
      if (vp) {
        vp.style.transform = 'scale(0.6)';
        vp.style.opacity = '0.3';
      }
      showToast('视频播放中...（演示站点）');
      setTimeout(function () {
        if (vp) {
          vp.style.transform = '';
          vp.style.opacity = '';
        }
      }, 1200);
    });
  }

  // ========== 数据驱动详情渲染 (?id=) ==========
  function getCurrentProduct() {
    if (!window.SITE_DATA || !SITE_DATA.products || SITE_DATA.products.length === 0) return null;
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'), 10);
    if (id && !isNaN(id)) {
      const found = SITE_DATA.products.filter(function (p) { return p.id === id; });
      if (found.length > 0) return found[0];
    }
    return SITE_DATA.products[0];
  }

  function renderVariants(containerSel, values) {
    const wrap = document.querySelector(containerSel);
    if (!wrap || !values || values.length === 0) return;
    let h = '';
    values.forEach(function (v, i) {
      h += '<button class="variant-option' + (i === 0 ? ' active' : '') + '">' + escapeHtml(v) + '</button>';
    });
    wrap.innerHTML = h;
    wrap.querySelectorAll('.variant-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        wrap.querySelectorAll('.variant-option').forEach(function (o) { o.classList.remove('active'); });
        opt.classList.add('active');
        const label = opt.closest('.product-variants').querySelector('.selected-value');
        if (label) label.textContent = opt.textContent;
      });
    });
  }

  function renderProductDetail() {
    const product = getCurrentProduct();
    if (!product) return;

    // 面包屑
    const bc = document.querySelector('[data-breadcrumb-title]');
    if (bc) bc.textContent = String(product.title).split(' · ')[0];

    // 分类 / 标题
    const catEl = document.querySelector('[data-detail-cat]');
    if (catEl) {
      let catText = product.categoryName || '';
      if (product.series) catText += ' / ' + product.series;
      catEl.textContent = catText;
    }
    const titleEl = document.querySelector('[data-detail-title]');
    if (titleEl) titleEl.textContent = product.title;
    document.title = product.title + ' - 鳞光屿';

    // 价格
    const priceWrap = document.querySelector('[data-detail-price]');
    if (priceWrap) {
      let html = '<span class="price-current">¥' + product.price + '</span>';
      if (product.originalPrice && product.originalPrice > product.price) {
        html += '<span class="price-original">¥' + product.originalPrice + '</span>';
      }
      const tag = product.discountTag || (product.originalPrice > product.price
        ? '省 ¥' + (product.originalPrice - product.price) : '');
      if (tag) html += '<span class="price-tag">' + escapeHtml(tag) + '</span>';
      priceWrap.innerHTML = html;
    }

    // 描述
    const descEl = document.querySelector('[data-detail-desc]');
    if (descEl) descEl.textContent = product.desc;

    // 商品信息
    const setMeta = function (attr, val) {
      const el = document.querySelector('[data-meta-' + attr + ']');
      if (el && val) el.textContent = val;
    };
    setMeta('sku', product.sku);
    setMeta('material', product.material);
    setMeta('craftsman', product.craftsman);
    setMeta('leadtime', product.leadTime);
    setMeta('delivery', product.delivery);

    // 画廊主图 + 缩略图
    const mainImg = document.getElementById('mainProductImage');
    if (mainImg && product.image) mainImg.src = product.image;
    const thumbsWrap = document.querySelector('[data-gallery-thumbs]');
    if (thumbsWrap && product.images && product.images.length > 0) {
      let th = '';
      product.images.forEach(function (img, i) {
        th +=
          '<button class="product-thumb' + (i === 0 ? ' active' : '') + '">' +
          '<img src="' + img + '" alt="">' +
          '</button>';
      });
      thumbsWrap.innerHTML = th;
      thumbsWrap.querySelectorAll('.product-thumb').forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          thumbsWrap.querySelectorAll('.product-thumb').forEach(function (t2) {
            t2.classList.remove('active');
          });
          thumb.classList.add('active');
          if (mainImg) {
            const im = thumb.querySelector('img');
            if (im) {
              mainImg.style.opacity = '0';
              setTimeout(function () {
                mainImg.src = im.src;
                mainImg.style.opacity = '1';
              }, 200);
            }
          }
        });
      });
    }

    // 规格参数
    const specTable = document.querySelector('[data-spec-table]');
    if (specTable && product.specRows) {
      let rows = '';
      product.specRows.forEach(function (row) {
        rows += '<tr><td>' + escapeHtml(row[0]) + '</td><td>' + escapeHtml(row[1]) + '</td></tr>';
      });
      specTable.innerHTML = rows;
    }

    // 制作视频 / 手册
    const vt = document.querySelector('[data-video-title]');
    if (vt && product.videoTitle) vt.textContent = product.videoTitle;
    const vs = document.querySelector('[data-video-sub]');
    if (vs && product.videoSubtitle) vs.textContent = product.videoSubtitle;
    const pn = document.querySelector('[data-pdf-name]');
    if (pn && product.pdfName) pn.textContent = product.pdfName;

    // 变体（颜色/尺寸）
    renderVariants('[data-variant-colors]', product.colors);
    renderVariants('[data-variant-sizes]', product.sizes);
  }

  renderProductDetail();

  // ========== 相关推荐（同分类优先） ==========
  function badgeClassFor(tag) {
    const t = String(tag || '');
    if (t.indexOf('折') >= 0 || t.indexOf('省') >= 0) return 'badge-sale';
    if (t.indexOf('新') >= 0) return 'badge-new';
    if (t.indexOf('热') >= 0) return 'badge-coral';
    return 'badge-accent';
  }

  function renderRelatedProducts() {
    const container = document.querySelector('[data-related-products]');
    if (!container || !window.SITE_DATA || !SITE_DATA.products) return;
    const current = getCurrentProduct();
    const currentId = current ? current.id : null;
    const currentCat = current ? current.category : null;

    let related = [];
    if (currentCat) {
      related = SITE_DATA.products.filter(function (p) {
        return p.category === currentCat && p.id !== currentId;
      });
    }
    SITE_DATA.products.forEach(function (p) {
      if (p.id !== currentId && related.indexOf(p) < 0) related.push(p);
    });
    related = related.slice(0, 4);

    let html = '';
    related.forEach(function (p) {
      let badgeHtml = '';
      if (p.tag) {
        badgeHtml = '<div class="product-badges"><span class="badge ' + badgeClassFor(p.tag) + '">' +
          escapeHtml(p.tag) + '</span></div>';
      }
      let origHtml = '';
      if (p.originalPrice && p.originalPrice > p.price) {
        origHtml = '<span class="price-original">¥' + p.originalPrice + '</span>';
      }
      html +=
        '<div class="product-card">' +
        '<div class="product-card-img-wrap">' +
        badgeHtml +
        '<button class="product-wishlist" aria-label="收藏">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
        '</button>' +
        '<a href="product-detail.html?id=' + p.id + '"><img class="product-card-img" src="' + p.image + '" alt="' + escapeHtml(p.title) + '"></a>' +
        '</div>' +
        '<div class="product-card-body">' +
        '<div class="product-card-category">' + escapeHtml(p.categoryName || '') + '</div>' +
        '<a class="product-card-title" href="product-detail.html?id=' + p.id + '">' + escapeHtml(p.title) + '</a>' +
        '<div class="product-card-price"><span class="price-current">¥' + p.price + '</span>' + origHtml + '</div>' +
        '</div>' +
        '</div>';
    });
    container.innerHTML = html;

    container.querySelectorAll('.product-wishlist').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('active');
      });
    });
  }

  // ========== Event Page（线下活动，与手工制作功能对齐） ==========
  function initEventPage() {
    const eventEl = document.querySelector('[data-event-page]');
    if (!eventEl || typeof window.SITE_DATA === 'undefined') return;

    const event = window.SITE_DATA.events && window.SITE_DATA.events[0];
    if (!event) return;

    const titleEl = document.querySelector('[data-event-title]');
    const subEl = document.querySelector('[data-event-subtitle]');
    const descEl = document.querySelector('[data-event-desc]');
    const dateEl = document.querySelector('[data-event-date]');
    const timeEl = document.querySelector('[data-event-time]');
    const locEl = document.querySelector('[data-event-location]');
    const priceEl = document.querySelector('[data-event-price]');
    const seatsEl = document.querySelector('[data-event-seats]');
    const imgEl = document.querySelector('[data-event-image]');

    if (titleEl) titleEl.textContent = event.title;
    if (subEl) subEl.textContent = event.subtitle;
    if (descEl) descEl.textContent = event.desc;
    if (dateEl) dateEl.textContent = event.date;
    if (timeEl) timeEl.textContent = event.time;
    if (locEl) locEl.textContent = event.location;
    if (priceEl && event.originalPrice) {
      priceEl.innerHTML = '¥' + event.price + ' <small style="font-size:16px;text-decoration:line-through;opacity:0.6;">¥' + event.originalPrice + '</small>';
    } else if (priceEl) {
      priceEl.textContent = '¥' + event.price;
    }
    if (seatsEl) seatsEl.textContent = '仅剩 ' + event.seatsLeft + ' 个名额（共 ' + event.seats + ' 席）';
    if (imgEl) {
      imgEl.src = event.image;
      imgEl.alt = event.title;
    }

    // 活动亮点
    const highlightsEl = document.querySelector('[data-event-highlights]');
    if (highlightsEl && event.highlights) {
      highlightsEl.innerHTML = event.highlights.map(function (h, i) {
        return '<div class="event-highlight-item">' +
          '<div class="event-highlight-num">' + (i + 1) + '</div>' +
          '<div class="event-highlight-text"><h4>' + escapeHtml(h.title) + '</h4><p>' + escapeHtml(h.desc) + '</p></div>' +
          '</div>';
      }).join('');
    }

    // 时间表
    const scheduleEl = document.querySelector('[data-event-schedule]');
    if (scheduleEl && event.schedule) {
      scheduleEl.innerHTML = event.schedule.map(function (s) {
        return '<div class="schedule-item">' +
          '<div class="schedule-time">' + escapeHtml(s.time) + '</div>' +
          '<div class="schedule-title">' + escapeHtml(s.title) + '</div>' +
          '<div class="schedule-desc">' + escapeHtml(s.desc) + '</div>' +
          '</div>';
      }).join('');
    }

    // 活动画廊
    const galleryEl = document.querySelector('[data-event-gallery]');
    if (galleryEl && event.gallery) {
      galleryEl.innerHTML = event.gallery.map(function (src, i) {
        return '<div class="event-gallery-item"><img src="' + src + '" alt="活动图片 ' + (i + 1) + '" loading="lazy"></div>';
      }).join('');
    }

    // FAQ
    const faqEl = document.querySelector('[data-event-faq]');
    if (faqEl && event.faqs) {
      faqEl.innerHTML = event.faqs.map(function (f, i) {
        return '<div class="faq-item' + (i === 0 ? ' open' : '') + '">' +
          '<div class="faq-question">' + escapeHtml(f.q) +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></div>' +
          '<div class="faq-answer"><p>' + escapeHtml(f.a) + '</p></div>' +
          '</div>';
      }).join('');

      faqEl.querySelectorAll('.faq-question').forEach(function (q) {
        q.addEventListener('click', function () {
          q.parentElement.classList.toggle('open');
        });
      });
    }

    // 报名按钮
    const bookBtn = document.querySelector('[data-book-btn]');
    if (bookBtn) {
      bookBtn.addEventListener('click', function () {
        const name = document.querySelector('[data-book-name]');
        const phone = document.querySelector('[data-book-phone]');
        if (name && !name.value.trim()) {
          alert('请填写您的姓名');
          name.focus();
          return;
        }
        if (phone && !phone.value.trim()) {
          alert('请填写联系电话');
          phone.focus();
          return;
        }
        bookBtn.textContent = '报名成功！我们会尽快联系您';
        bookBtn.style.backgroundColor = 'var(--primary)';
        bookBtn.disabled = true;
      });
    }
  }

  initEventPage();
  renderRelatedProducts();
  console.log('%c手作温度，鳞光闪耀', 'color:#E8A87C;font-size:14px;');
})();
