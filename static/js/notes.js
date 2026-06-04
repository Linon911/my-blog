(function () {
  var cards   = document.querySelectorAll('.nt-card');
  var tagBtns = document.querySelectorAll('.nt-tag-btn');
  var search  = document.getElementById('nt-search');
  var countEl = document.getElementById('nt-count');
  var activeTag = 'all';

  function applyFilters() {
    var q = search ? search.value.toLowerCase().trim() : '';
    var visible = 0;
    cards.forEach(function (c) {
      var tagOk = activeTag === 'all' || (c.dataset.tags || '').indexOf(activeTag) !== -1;
      var qOk   = !q || (c.dataset.title || '').indexOf(q) !== -1;
      var show  = tagOk && qOk;
      c.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (countEl) countEl.textContent = visible + ' note' + (visible !== 1 ? 's' : '');
  }

  tagBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tagBtns.forEach(function (b) { b.classList.remove('nt-tag-btn--active'); });
      btn.classList.add('nt-tag-btn--active');
      activeTag = btn.dataset.tag;
      applyFilters();
    });
  });

  if (search) search.addEventListener('input', applyFilters);
  applyFilters();
})();