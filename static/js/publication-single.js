(function(){
  var el    = document.getElementById('ps-cite-data');
  if (!el) return;
  var title   = el.dataset.title   || '';
  var authors = el.dataset.authors || 'Povaka';
  var year    = el.dataset.year    || '';
  var ptype   = el.dataset.ptype   || 'Working Paper';

  function buildBibTeX() {
    var key = authors.split(' ')[0].replace(/,/g,'') + year;
    return '@article{' + key + ',\n' +
      '  author = {' + authors + '},\n' +
      '  title  = {{' + title + '}},\n' +
      '  year   = {' + year + '},\n' +
      '  note   = {' + ptype + '}\n' +
      '}';
  }
  function buildAPA()     { return authors + ' (' + year + '). ' + title + '. ' + ptype + '.'; }
  function buildChicago() { return authors + '. "' + title + '." ' + ptype + ' (' + year + ').'; }

  var fmtMap = { bibtex: buildBibTeX, apa: buildAPA, chicago: buildChicago };
  var curFmt = 'bibtex';
  var pre    = document.getElementById('ps-cite-output');
  var cpBtn  = document.getElementById('ps-cite-copy');

  function render() { if (pre) pre.textContent = fmtMap[curFmt](); }

  document.querySelectorAll('.ps-cite-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      document.querySelectorAll('.ps-cite-tab').forEach(function(t){
        t.classList.remove('ps-cite-tab--active');
      });
      tab.classList.add('ps-cite-tab--active');
      curFmt = tab.dataset.fmt;
      render();
    });
  });

  if (cpBtn) cpBtn.addEventListener('click', function(){
    if (pre) navigator.clipboard.writeText(pre.textContent).then(function(){
      cpBtn.textContent = 'Copied!';
      setTimeout(function(){ cpBtn.textContent = 'Copy citation'; }, 2000);
    });
  });

  render();
})();