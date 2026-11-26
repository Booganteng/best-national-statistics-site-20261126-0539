// Page behaviour for NUSA DATA: renders the indicator cards and charts from
// data.js, filters the province table, and switches chart periods. Every
// control on the page does what its label says.
(function () {
  'use strict';

  var DATA = window.NUSA_DATA;
  var CHARTS = window.NUSA_CHARTS;

  function byId(id) { return document.getElementById(id); }

  // Indicator cards on the home page.
  function renderIndicators() {
    var grid = byId('indicators');
    if (!grid) return;
    DATA.indicators.forEach(function (ind) {
      var card = document.createElement('article');
      card.className = 'kpi';
      var value = document.createElement('div');
      value.className = 'kpi-value';
      value.textContent = ind.value;
      var label = document.createElement('div');
      label.className = 'kpi-label';
      label.textContent = ind.label;
      var note = document.createElement('div');
      note.className = 'kpi-note';
      note.textContent = ind.note + ' · ' + ind.source;
      card.appendChild(value); card.appendChild(label); card.appendChild(note);
      grid.appendChild(card);
    });
  }

  // People-page facts (harapan hidup, IPM, ...).
  function renderPeople() {
    var grid = byId('people-facts');
    if (!grid) return;
    DATA.people.forEach(function (fact) {
      var card = document.createElement('article');
      card.className = 'kpi';
      var value = document.createElement('div');
      value.className = 'kpi-value';
      value.textContent = fact.value;
      var label = document.createElement('div');
      label.className = 'kpi-label';
      label.textContent = fact.label;
      var note = document.createElement('div');
      note.className = 'kpi-note';
      note.textContent = fact.note + ' · ' + fact.source;
      card.appendChild(value); card.appendChild(label); card.appendChild(note);
      grid.appendChild(card);
    });
  }

  // Trade cards on the economy page.
  function renderTrade() {
    var grid = byId('trade-cards');
    if (!grid) return;
    DATA.trade.forEach(function (t) {
      var card = document.createElement('article');
      card.className = 'kpi';
      var value = document.createElement('div');
      value.className = 'kpi-value';
      value.textContent = t.value;
      var label = document.createElement('div');
      label.className = 'kpi-label';
      label.textContent = t.label;
      var note = document.createElement('div');
      note.className = 'kpi-note';
      note.textContent = t.note + ' · BPS';
      card.appendChild(value); card.appendChild(label); card.appendChild(note);
      grid.appendChild(card);
    });
  }

  // Province table, shared by the home page (top 5) and the provinces page (top 10).
  function renderProvinces(limit) {
    var body = byId('province-rows');
    if (!body) return;
    DATA.provinces.slice(0, limit).forEach(function (p, i) {
      var tr = document.createElement('tr');
      [String(i + 1), p.name, p.pop.toFixed(1).replace('.', ','),
       p.area.toLocaleString('id-ID'),
       p.density.toLocaleString('id-ID')].forEach(function (text, j) {
        var td = document.createElement(j === 1 ? 'th' : 'td');
        if (j === 1) td.scope = 'row';
        td.textContent = text;
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });
  }

  // Live filter for the province table: typing narrows the rows, and the count
  // line says how many provinces match.
  function bindProvinceFilter() {
    var input = byId('province-filter');
    var body = byId('province-rows');
    var count = byId('province-count');
    if (!input || !body) return;
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      Array.prototype.forEach.call(body.rows, function (row) {
        var match = row.textContent.toLowerCase().indexOf(q) !== -1;
        row.style.display = match ? '' : 'none';
        if (match) shown += 1;
      });
      if (count) count.textContent = shown + ' dari 10 provinsi ditampilkan';
    });
  }

  // Growth chart with a 5-year / 10-year switch.
  function bindGrowthChart() {
    var box = byId('growth-chart');
    if (!box) return;
    var buttons = document.querySelectorAll('[data-years]');
    function draw(years) {
      box.innerHTML = '';
      var points = DATA.gdpGrowth.slice(-years);
      CHARTS.lineChart(box, points, { label: 'Pertumbuhan ekonomi Indonesia ' + points[0].year + '–' + points[points.length - 1].year + ', persen' });
      buttons.forEach(function (b) {
        var active = Number(b.getAttribute('data-years')) === years;
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
        b.classList.toggle('is-active', active);
      });
    }
    buttons.forEach(function (b) {
      b.addEventListener('click', function () { draw(Number(b.getAttribute('data-years'))); });
    });
    draw(5);
  }

  function drawStaticCharts() {
    var pop = byId('population-chart');
    if (pop) CHARTS.barChart(pop, DATA.population, { label: 'Jumlah penduduk Indonesia 2015–2024, juta jiwa' });
    var homePop = byId('home-population-chart');
    if (homePop) CHARTS.barChart(homePop, DATA.population.slice(-6), { label: 'Jumlah penduduk Indonesia 2019–2024, juta jiwa' });
    var sectors = byId('sector-bars');
    if (sectors) CHARTS.shareBars(sectors, DATA.sectors, { decimals: 1 });
    var age = byId('age-bars');
    if (age) CHARTS.shareBars(age, DATA.ageStructure.map(function (a) { return { name: a.group, value: a.value }; }), { decimals: 1 });
  }

  function renderReleases() {
    var list = byId('releases');
    if (!list) return;
    DATA.releases.forEach(function (r) {
      var li = document.createElement('li');
      var date = document.createElement('span');
      date.className = 'release-date';
      date.textContent = r.date;
      var title = document.createElement('span');
      title.className = 'release-title';
      title.textContent = r.title;
      var src = document.createElement('span');
      src.className = 'release-source';
      src.textContent = r.source;
      li.appendChild(date); li.appendChild(title); li.appendChild(src);
      list.appendChild(li);
    });
  }

  function stampUpdated() {
    document.querySelectorAll('[data-updated]').forEach(function (node) {
      node.textContent = DATA.updated;
    });
  }

  renderIndicators();
  renderPeople();
  renderTrade();
  renderProvinces(document.body.getAttribute('data-province-limit') ? Number(document.body.getAttribute('data-province-limit')) : 5);
  renderReleases();
  drawStaticCharts();
  bindGrowthChart();
  bindProvinceFilter();
  stampUpdated();
})();
