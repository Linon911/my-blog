(function () {
  var entries    = document.querySelectorAll('.rd-entry');
  var tabs       = document.querySelectorAll('.rd-tab');
  var tagBtns    = document.querySelectorAll('.rd-tag-btn');
  var fieldBtns  = document.querySelectorAll('.rd-field-btn');
  var searchInput = document.getElementById('rd-search');
  var countEl    = document.getElementById('rd-count');

  var activeType  = 'all';
  var activeTag   = '';
  var activeField = '';

  function getQuery() {
    return searchInput ? searchInput.value.toLowerCase().trim() : '';
  }

  function applyFilters() {
    var q = getQuery();
    var visible = 0;

    entries.forEach(function (e) {
      var typeOk  = activeType === 'all' || e.dataset.type === activeType;
      var tagOk   = !activeTag  || (e.dataset.keywords || '').indexOf(activeTag) !== -1;
      var fieldOk = !activeField || (e.dataset.field   || '').indexOf(activeField) !== -1;
      var qOk     = !q || (e.dataset.title  || '').indexOf(q) !== -1
                       || (e.dataset.author || '').indexOf(q) !== -1
                       || (e.dataset.keywords || '').indexOf(q) !== -1;

      var show = typeOk && tagOk && fieldOk && qOk;
      e.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (countEl) countEl.textContent = visible + ' entr' + (visible !== 1 ? 'ies' : 'y');
  }

  /* Type tabs */
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('rd-tab--active'); });
      tab.classList.add('rd-tab--active');
      activeType = tab.dataset.filter;
      applyFilters();
    });
  });

  /* Tag cloud */
  tagBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tag = btn.dataset.tag;
      if (activeTag === tag) {
        activeTag = '';
        btn.classList.remove('rd-tag-btn--active');
      } else {
        tagBtns.forEach(function (b) { b.classList.remove('rd-tag-btn--active'); });
        activeTag = tag;
        btn.classList.add('rd-tag-btn--active');
      }
      applyFilters();
    });
  });

  /* Field filter */
  fieldBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var field = btn.dataset.field;
      if (activeField === field) {
        activeField = '';
        btn.classList.remove('rd-field-btn--active');
      } else {
        fieldBtns.forEach(function (b) { b.classList.remove('rd-field-btn--active'); });
        activeField = field;
        btn.classList.add('rd-field-btn--active');
      }
      applyFilters();
    });
  });

  /* Search */
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  /* Init */
  applyFilters();
})();