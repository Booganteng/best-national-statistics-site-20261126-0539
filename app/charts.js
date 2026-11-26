// Small SVG chart renderers for NUSA DATA. No library: every chart is drawn
// from the figures in data.js, so a chart and its table always agree.
(function () {
  'use strict';

  var NAVY = '#0a2540';
  var TEAL = '#0e7c7b';
  var GOLD = '#d9a441';
  var GRID = '#d8dee3';
  var MUTED = '#5b6b78';

  function el(name, attrs, text) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', name);
    for (var key in attrs) node.setAttribute(key, attrs[key]);
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function fmt(value, decimals) {
    return value.toFixed(decimals === undefined ? 1 : decimals).replace('.', ',').replace('-', '−');
  }

  // Round gridline values (0, 50, 100, … or -2, 0, 2, 4, …) instead of
  // arbitrary fractions of the scale, so the axis reads cleanly.
  function niceTicks(min, max, count) {
    var range = max - min;
    if (range <= 0) range = 1;
    var raw = range / (count - 1);
    var mag = Math.pow(10, Math.floor(Math.log10(raw)));
    var norm = raw / mag;
    var step = norm <= 1 ? mag : norm <= 2 ? 2 * mag : norm <= 5 ? 5 * mag : 10 * mag;
    var ticks = [];
    for (var v = Math.floor(min / step) * step; v <= max + 1e-9; v += step) {
      ticks.push(Math.round(v / step) * step);
    }
    return ticks;
  }

  // Vertical bar chart. points: [{year, value}], valueLabel formats a value.
  function barChart(container, points, options) {
    var o = options || {};
    var w = 640, h = 300, padL = 44, padR = 12, padT = 26, padB = 34;
    var svg = el('svg', { viewBox: '0 0 ' + w + ' ' + h, role: 'img', 'aria-label': o.label || 'Grafik batang' });
    var max = Math.max.apply(null, points.map(function (p) { return p.value; }));
    var min = Math.min.apply(null, points.map(function (p) { return p.value; }));
    var top = Math.max(max, 0) * 1.08;
    var bottom = Math.min(min, 0) * 1.15;
    if (bottom === 0 && top === 0) top = 1;
    var span = top - bottom;
    var plotW = w - padL - padR, plotH = h - padT - padB;
    var y = function (v) { return padT + (top - v) / span * plotH; };
    var slot = plotW / points.length;
    var bw = Math.min(42, slot * 0.62);
    niceTicks(bottom, top, 5).forEach(function (v) {
      var gy = y(v);
      if (gy < padT - 4 || gy > h - padB + 4) return;
      svg.appendChild(el('line', { x1: padL, y1: gy, x2: w - padR, y2: gy, stroke: GRID, 'stroke-width': 1 }));
      svg.appendChild(el('text', { x: padL - 8, y: gy + 4, 'text-anchor': 'end', 'font-size': 11, fill: MUTED }, fmt(v, 0)));
    });
    if (bottom < 0) {
      svg.appendChild(el('line', { x1: padL, y1: y(0), x2: w - padR, y2: y(0), stroke: NAVY, 'stroke-width': 1.5 }));
    }
    points.forEach(function (p, i) {
      var cx = padL + slot * i + slot / 2;
      var yTop = y(Math.max(p.value, 0)), yBot = y(Math.min(p.value, 0));
      svg.appendChild(el('rect', {
        x: cx - bw / 2, y: yTop, width: bw, height: Math.max(1, yBot - yTop),
        fill: p.value < 0 ? '#b3402a' : (i === points.length - 1 ? GOLD : TEAL), rx: 2,
      }));
      svg.appendChild(el('text', { x: cx, y: yTop - 6, 'text-anchor': 'middle', 'font-size': 11, 'font-weight': 700, fill: NAVY }, fmt(p.value, o.decimals === undefined ? 1 : o.decimals)));
      svg.appendChild(el('text', { x: cx, y: h - 12, 'text-anchor': 'middle', 'font-size': 11, fill: MUTED }, String(p.year)));
    });
    container.appendChild(svg);
  }

  // Line chart with dots and value labels. points: [{year, value}].
  function lineChart(container, points, options) {
    var o = options || {};
    var w = 640, h = 300, padL = 48, padR = 16, padT = 28, padB = 34;
    var svg = el('svg', { viewBox: '0 0 ' + w + ' ' + h, role: 'img', 'aria-label': o.label || 'Grafik garis' });
    var max = Math.max.apply(null, points.map(function (p) { return p.value; }));
    var min = Math.min.apply(null, points.map(function (p) { return p.value; }));
    var top = max + (max - min) * 0.12 + 0.4;
    var bottom = min - (max - min) * 0.12 - 0.4;
    var span = top - bottom;
    var plotW = w - padL - padR, plotH = h - padT - padB;
    var x = function (i) { return padL + plotW * i / (points.length - 1); };
    var y = function (v) { return padT + (top - v) / span * plotH; };
    niceTicks(bottom, top, 5).forEach(function (v) {
      var gy = y(v);
      if (gy < padT - 4 || gy > h - padB + 4) return;
      svg.appendChild(el('line', { x1: padL, y1: gy, x2: w - padR, y2: gy, stroke: GRID, 'stroke-width': 1 }));
      svg.appendChild(el('text', { x: padL - 8, y: gy + 4, 'text-anchor': 'end', 'font-size': 11, fill: MUTED }, fmt(v, 0)));
    });
    var d = points.map(function (p, i) { return (i === 0 ? 'M' : 'L') + x(i).toFixed(1) + ' ' + y(p.value).toFixed(1); }).join(' ');
    svg.appendChild(el('path', { d: d, fill: 'none', stroke: TEAL, 'stroke-width': 2.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
    points.forEach(function (p, i) {
      svg.appendChild(el('circle', { cx: x(i), cy: y(p.value), r: i === points.length - 1 ? 5 : 3.5, fill: i === points.length - 1 ? GOLD : TEAL, stroke: '#fff', 'stroke-width': 1.5 }));
      if (i === 0 || i === points.length - 1 || i % 2 === 0) {
        svg.appendChild(el('text', { x: x(i), y: y(p.value) - 10, 'text-anchor': 'middle', 'font-size': 11, 'font-weight': 700, fill: NAVY }, fmt(p.value, o.decimals === undefined ? 2 : o.decimals)));
      }
      svg.appendChild(el('text', { x: x(i), y: h - 12, 'text-anchor': 'middle', 'font-size': 11, fill: MUTED }, String(p.year)));
    });
    container.appendChild(svg);
  }

  // Horizontal bar list for shares (sectors, age groups). rows: [{name, value}].
  function shareBars(container, rows, options) {
    var o = options || {};
    var max = Math.max.apply(null, rows.map(function (r) { return r.value; }));
    rows.forEach(function (r) {
      var row = document.createElement('div');
      row.className = 'share-row';
      var name = document.createElement('div');
      name.className = 'share-name';
      name.textContent = r.name;
      var track = document.createElement('div');
      track.className = 'share-track';
      var fill = document.createElement('div');
      fill.className = 'share-fill';
      fill.style.width = (r.value / max * 100).toFixed(1) + '%';
      track.appendChild(fill);
      var val = document.createElement('div');
      val.className = 'share-value';
      val.textContent = fmt(r.value, o.decimals === undefined ? 1 : o.decimals) + '%';
      row.appendChild(name); row.appendChild(track); row.appendChild(val);
      container.appendChild(row);
    });
  }

  window.NUSA_CHARTS = { barChart: barChart, lineChart: lineChart, shareBars: shareBars };
})();
