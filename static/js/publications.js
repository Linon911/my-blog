(function () {
  /* ── Filter tabs ── */
  var tabs    = document.querySelectorAll('.pp-tab');
  var entries = document.querySelectorAll('.pp-entry');
  var activeFilter = 'all';

  function getQuery() {
    var el = document.getElementById('pp-search-input');
    return el ? el.value.toLowerCase() : '';
  }

  function applyFilter() {
    var q = getQuery();
    var visible = 0;
    entries.forEach(function (e) {
      var typeMatch   = activeFilter === 'all' || e.dataset.type === activeFilter;
      var searchMatch = !q || e.dataset.title.indexOf(q) !== -1 || e.dataset.keywords.indexOf(q) !== -1;
      var show = typeMatch && searchMatch;
      e.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    var c = document.getElementById('pp-count');
    if (c) c.textContent = visible + ' record' + (visible !== 1 ? 's' : '');
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('pp-tab--active'); });
      t.classList.add('pp-tab--active');
      activeFilter = t.dataset.filter;
      applyFilter();
    });
  });

  /* ── Search toggle ── */
  var searchToggle = document.getElementById('pp-search-toggle');
  if (searchToggle) {
    searchToggle.addEventListener('click', function () {
      var bar = document.getElementById('pp-search-bar');
      if (!bar) return;
      var hidden = bar.style.display === 'none' || bar.style.display === '';
      bar.style.display = hidden ? '' : 'none';
      if (hidden) {
        var inp = bar.querySelector('input');
        if (inp) inp.focus();
      }
    });
  }

  var searchInput = document.getElementById('pp-search-input');
  if (searchInput) searchInput.addEventListener('input', applyFilter);

  /* ── Abstract toggle ── */
  document.querySelectorAll('.pp-abstract-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var body = btn.closest('.pp-entry').querySelector('.pp-abstract-body');
      var open = body.style.display !== 'none' && body.style.display !== '';
      body.style.display = open ? 'none' : '';
      btn.textContent = open ? 'Abstract' : 'Hide';
    });
  });

  /* ── Citation ── */
  function buildBibTeX(d) {
    var key = d.authors.split(' ')[0].replace(/,/g, '') + d.year;
    return '@article{' + key + ',\n' +
           '  author = {' + d.authors + '},\n' +
           '  title  = {{' + d.title + '}},\n' +
           '  year   = {' + d.year + '},\n' +
           '  note   = {' + d.type + '}\n' +
           '}';
  }
  function buildAPA(d) {
    return d.authors + ' (' + d.year + '). ' + d.title + '. ' + d.type + '.';
  }
  function buildChicago(d) {
    return d.authors + '. "' + d.title + '." ' + d.type + ' (' + d.year + ').';
  }

  function renderCite(entry, fmt) {
    var btn  = entry.querySelector('.pp-cite-btn');
    var pre  = entry.querySelector('.pp-cite-code');
    var d    = { title: btn.dataset.title, authors: btn.dataset.authors,
                 year: btn.dataset.year, type: btn.dataset.type };
    if (fmt === 'bibtex')       pre.textContent = buildBibTeX(d);
    else if (fmt === 'apa')     pre.textContent = buildAPA(d);
    else                        pre.textContent = buildChicago(d);
  }

  document.querySelectorAll('.pp-cite-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var entry = btn.closest('.pp-entry');
      var panel = entry.querySelector('.pp-cite-panel');
      var open  = panel.style.display !== 'none' && panel.style.display !== '';
      panel.style.display = open ? 'none' : '';
      if (!open) renderCite(entry, 'bibtex');
    });
  });

  document.querySelectorAll('.pp-cite-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var panel = tab.closest('.pp-cite-panel');
      panel.querySelectorAll('.pp-cite-tab').forEach(function (t) {
        t.classList.remove('pp-cite-tab--active');
      });
      tab.classList.add('pp-cite-tab--active');
      renderCite(tab.closest('.pp-entry'), tab.dataset.fmt);
    });
  });

  /* ── Copy ── */
  document.querySelectorAll('.pp-copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pre = btn.closest('.pp-cite-panel').querySelector('.pp-cite-code');
      navigator.clipboard.writeText(pre.textContent).then(function () {
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1800);
      });
    });
  });

  /* ── Init ── */
  applyFilter();
})();