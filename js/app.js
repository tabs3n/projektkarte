(function () {
  const DATA = window.PROJECT_DATA;
  const byIso = {};
  DATA.forEach(d => { byIso[d.iso] = d; });

  const state = {
    variant: 'v4',
    accent: '#ff5722',
    labels: 'active',
    projection: 'mercator',
  };

  // Numeric ID → ISO-A3 lookup (UN M49 → ISO 3166-1 alpha-3)
  const ID_TO_A3 = {
    "004":"AFG","008":"ALB","012":"DZA","024":"AGO","032":"ARG","036":"AUS","040":"AUT",
    "050":"BGD","056":"BEL","068":"BOL","076":"BRA","100":"BGR","124":"CAN","152":"CHL",
    "156":"CHN","170":"COL","188":"CRI","191":"HRV","196":"CYP","203":"CZE","208":"DNK",
    "214":"DOM","218":"ECU","222":"SLV","231":"ETH","233":"EST","242":"FJI","246":"FIN",
    "250":"FRA","268":"GEO","276":"DEU","288":"GHA","300":"GRC","320":"GTM","332":"HTI",
    "340":"HND","348":"HUN","352":"ISL","356":"IND","360":"IDN","364":"IRN","368":"IRQ",
    "372":"IRL","376":"ISR","380":"ITA","388":"JAM","392":"JPN","398":"KAZ","400":"JOR",
    "404":"KEN","410":"KOR","414":"KWT","417":"KGZ","418":"LAO","422":"LBN","428":"LVA",
    "434":"LBY","440":"LTU","442":"LUX","450":"MDG","454":"MWI","458":"MYS","466":"MLI",
    "478":"MRT","484":"MEX","496":"MNG","498":"MDA","504":"MAR","508":"MOZ","512":"OMN",
    "516":"NAM","524":"NPL","528":"NLD","540":"NCL","554":"NZL","558":"NIC","562":"NER",
    "566":"NGA","578":"NOR","586":"PAK","591":"PAN","598":"PNG","600":"PRY","604":"PER",
    "608":"PHL","616":"POL","620":"PRT","624":"GNB","626":"TLS","630":"PRI","634":"QAT",
    "642":"ROU","643":"RUS","646":"RWA","682":"SAU","686":"SEN","688":"SRB","694":"SLE",
    "702":"SGP","703":"SVK","704":"VNM","705":"SVN","706":"SOM","710":"ZAF","716":"ZWE",
    "724":"ESP","728":"SSD","729":"SDN","748":"SWZ","752":"SWE","756":"CHE","760":"SYR",
    "762":"TJK","764":"THA","768":"TGO","780":"TTO","784":"ARE","788":"TUN","792":"TUR",
    "795":"TKM","800":"UGA","804":"UKR","807":"MKD","818":"EGY","826":"GBR","834":"TZA",
    "840":"USA","854":"BFA","858":"URY","860":"UZB","862":"VEN","887":"YEM","894":"ZMB"
  };

  const CENTROIDS = {
    DEU:[10.45,51.16], AUT:[14.55,47.52], CHE:[8.23,46.82], FRA:[2.21,46.23], ESP:[-3.75,40.46],
    PRT:[-8.22,39.4], ITA:[12.57,41.87], GBR:[-3.44,55.38], IRL:[-8.24,53.41], NLD:[5.29,52.13],
    BEL:[4.47,50.5], DNK:[9.5,56.26], SWE:[18.64,60.13], NOR:[8.47,60.47], FIN:[25.75,61.92],
    POL:[19.15,51.92], CZE:[15.47,49.82], GRC:[21.82,39.07], TUR:[35.24,38.96], ARE:[53.85,23.42],
    SAU:[45.08,23.89], ISR:[34.85,31.05], EGY:[30.8,26.82], ZAF:[22.94,-30.56], KEN:[37.91,-0.02],
    IND:[78.96,20.59], CHN:[104.2,35.86], JPN:[138.25,36.2], KOR:[127.77,35.91], SGP:[103.82,1.35],
    AUS:[133.78,-25.27], USA:[-95.71,39.83], CAN:[-106.35,56.13], BRA:[-51.92,-14.24],
    MEX:[-102.55,23.63], ARG:[-63.62,-38.42]
  };

  const tooltip = document.getElementById('tooltip');
  const modal = document.getElementById('modal');
  const modalInner = document.getElementById('modal-inner');
  const drawer = document.getElementById('drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  function showTooltip(clientX, clientY, html) {
    tooltip.innerHTML = html;
    tooltip.style.left = clientX + 'px';
    tooltip.style.top = clientY + 'px';
    tooltip.classList.add('on');
  }
  function hideTooltip() { tooltip.classList.remove('on'); }

  function renderProjects(country) {
    const n = country.projects.length;
    return `
      <div class="modal-head">
        <div>
          <div class="kind">Projekte in</div>
          <h2>${country.name}</h2>
        </div>
        <button class="modal-close" aria-label="Schließen">✕</button>
      </div>
      <div class="modal-body">
        <div style="font-family:var(--ff-mono);font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px;">
          ${n} ${n === 1 ? 'Projekt' : 'Projekte'}
        </div>
        <div class="project-list">
          ${country.projects.map((p, i) => `
            <div class="project-card">
              <h3>${p.title}</h3>
              <div class="project-meta">
                ${p.city ? `<span>&#x1F4CD; <b>${p.city}</b></span>` : ''}
                ${p.year ? `<span>&#x1F4C5; <b>${p.year}</b></span>` : ''}
                ${p.client ? `<span>&#x1F464; <b>${p.client}</b></span>` : ''}
              </div>
              <p class="project-blurb">${p.blurb}</p>
              ${p.quote ? `<div class="project-quote">„${p.quote}"</div>` : ''}
              <div class="gallery">
                <img src="${window.makePlaceholder(p.title.slice(0, 22), i * 7 + 1)}" alt="">
                <img src="${window.makePlaceholder(p.city || 'image', i * 7 + 2)}" alt="">
                <img src="${window.makePlaceholder('detail', i * 7 + 3)}" alt="">
              </div>
            </div>
          `).join('')}
        </div>
      </div>`;
  }

  function bindClose(el, closeFn) {
    const btn = el.querySelector('.modal-close');
    if (btn) btn.addEventListener('click', closeFn);
  }

  window.openModal = function (iso) {
    const c = byIso[iso]; if (!c) return;
    modalInner.innerHTML = renderProjects(c);
    bindClose(modalInner, closeModal);
    modal.classList.add('on');
  };
  window.closeModal = function () { modal.classList.remove('on'); };
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  window.openDrawer = function (iso) {
    const c = byIso[iso]; if (!c) return;
    drawer.innerHTML = renderProjects(c);
    bindClose(drawer, closeDrawer);
    drawer.classList.add('on');
    drawerBackdrop.classList.add('on');
  };
  window.closeDrawer = function () {
    drawer.classList.remove('on');
    drawerBackdrop.classList.remove('on');
  };
  drawerBackdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeDrawer(); } });

  function makeProjection(kind, w, h) {
    let p;
    switch (kind) {
      case 'mercator': p = d3.geoMercator(); break;
      case 'naturalEarth': p = d3.geoNaturalEarth1(); break;
      default: p = d3.geoEqualEarth();
    }
    if (kind === 'mercator') {
      p.center([15, 30]).scale(w / 7.2).translate([w / 2, h / 2]);
    } else {
      p.scale(w / 6.2).translate([w / 2, h / 2 + 20]);
    }
    return p;
  }

  function renderMap(containerSel, opts) {
    const container = document.querySelector(containerSel);
    if (!container) return;
    container.innerHTML = '';

    const W = container.clientWidth || 900;
    const H = opts.height || Math.round(W * 0.52);
    const svg = d3.select(container).append('svg')
      .attr('viewBox', `0 0 ${W} ${H}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const g = svg.append('g').attr('class', 'world');
    const projection = makeProjection(state.projection, W, H);
    const path = d3.geoPath(projection);

    loadWorld().then(world => {
      const countries = topojson.feature(world, world.objects.countries).features;

      if (opts.style === 'dots') {
        renderDotMatrix(g, countries, path, projection, opts);
      } else {
        const paths = g.selectAll('path.country').data(countries).enter().append('path')
          .attr('class', d => {
            const a3 = ID_TO_A3[String(d.id).padStart(3, '0')] || null;
            return 'country' + (a3 && byIso[a3] ? ' hasProjects' : '');
          })
          .attr('d', path)
          .attr('data-iso', d => ID_TO_A3[String(d.id).padStart(3, '0')] || '');

        paths
          .on('mousemove', function (evt, d) {
            const a3 = ID_TO_A3[String(d.id).padStart(3, '0')];
            if (!a3 || !byIso[a3]) return;
            const c = byIso[a3];
            showTooltip(evt.clientX, evt.clientY,
              `${c.name} <span class="t-count">${c.projects.length}</span>`);
          })
          .on('mouseleave', hideTooltip)
          .on('click', function (evt, d) {
            const a3 = ID_TO_A3[String(d.id).padStart(3, '0')];
            if (!a3 || !byIso[a3]) return;
            opts.onCountryClick(a3);
          });
      }

      if (state.labels !== 'none') {
        const labelIds = state.labels === 'all'
          ? Object.keys(CENTROIDS)
          : DATA.map(d => d.iso);
        labelIds.forEach(iso => {
          const coord = CENTROIDS[iso]; if (!coord) return;
          const [x, y] = projection(coord);
          if (!isFinite(x)) return;
          g.append('text')
            .attr('class', 'clabel' + (byIso[iso] ? ' active' : ''))
            .attr('x', x).attr('y', y)
            .text(iso);
        });
      }

      if (opts.markers) {
        const markers = g.append('g').attr('class', 'markers');
        DATA.forEach(c => {
          const coord = CENTROIDS[c.iso]; if (!coord) return;
          const [x, y] = projection(coord);
          const r = 9;
          markers.append('circle')
            .attr('class', 'marker-badge')
            .attr('cx', x).attr('cy', y).attr('r', r);
          markers.append('text')
            .attr('class', 'marker-badge-text')
            .attr('x', x).attr('y', y + 3)
            .text(c.projects.length);
          markers.append('circle')
            .attr('cx', x).attr('cy', y).attr('r', r + 2)
            .attr('fill', 'transparent')
            .style('cursor', 'pointer')
            .on('mousemove', evt => {
              showTooltip(evt.clientX, evt.clientY,
                `${c.name} <span class="t-count">${c.projects.length}</span>`);
            })
            .on('mouseleave', hideTooltip)
            .on('click', () => opts.onCountryClick(c.iso));
        });
      }

      if (opts.zoom) {
        const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', evt => {
          g.attr('transform', evt.transform);
        });
        svg.call(zoom);
        const zoomEl = document.createElement('div');
        zoomEl.className = 'zoom-ctrl';
        zoomEl.innerHTML = `<button data-z="in">+</button><button data-z="out">−</button><button data-z="reset">⟲</button>`;
        container.appendChild(zoomEl);
        zoomEl.addEventListener('click', e => {
          const b = e.target.dataset.z; if (!b) return;
          if (b === 'in') svg.transition().call(zoom.scaleBy, 1.5);
          else if (b === 'out') svg.transition().call(zoom.scaleBy, 0.67);
          else svg.transition().call(zoom.transform, d3.zoomIdentity);
        });
      }

      if (opts.legend !== false) {
        const legend = document.createElement('div');
        legend.className = 'legend';
        legend.innerHTML = `
          <div class="lrow"><div class="swatch on"></div> Mit Projekten (${DATA.length})</div>
          <div class="lrow"><div class="swatch off"></div> Übrige Länder</div>`;
        container.appendChild(legend);
      }
    });
  }

  function renderDotMatrix(g, countries, path, projection, opts) {
    const step = 10;
    const W = +g.node().ownerSVGElement.viewBox.baseVal.width;
    const H = +g.node().ownerSVGElement.viewBox.baseVal.height;

    const hitCanvas = document.createElement('canvas');
    hitCanvas.width = W; hitCanvas.height = H;
    const hctx = hitCanvas.getContext('2d');
    const ctxPath = d3.geoPath(projection, hctx);
    countries.forEach((c, i) => {
      hctx.fillStyle = `rgb(${i & 255},${(i >> 8) & 255},${(i >> 16) & 255})`;
      hctx.beginPath(); ctxPath(c); hctx.fill();
    });
    const imgData = hctx.getImageData(0, 0, W, H).data;

    const dots = g.append('g').attr('class', 'dots');
    for (let y = step / 2; y < H; y += step) {
      for (let x = step / 2; x < W; x += step) {
        const idx = (Math.floor(y) * W + Math.floor(x)) * 4;
        if (imgData[idx + 3] < 10) continue;
        const ci = imgData[idx] + (imgData[idx + 1] << 8) + (imgData[idx + 2] << 16);
        if (ci < 0 || ci >= countries.length) continue;
        const a3 = ID_TO_A3[String(countries[ci].id).padStart(3, '0')];
        const active = a3 && byIso[a3];
        const dot = dots.append('circle')
          .attr('class', 'dot' + (active ? ' active' : ''))
          .attr('cx', x).attr('cy', y).attr('r', active ? 2.6 : 1.5);
        if (active) {
          dot
            .on('mousemove', evt => {
              const c = byIso[a3];
              showTooltip(evt.clientX, evt.clientY,
                `${c.name} <span class="t-count">${c.projects.length}</span>`);
            })
            .on('mouseleave', hideTooltip)
            .on('click', () => opts.onCountryClick(a3));
        }
      }
    }
  }

  let _worldPromise = null;
  function loadWorld() {
    if (_worldPromise) return _worldPromise;
    _worldPromise = fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json').then(r => r.json());
    return _worldPromise;
  }

  // ===== VARIANT RENDERERS =====

  function renderV1() {
    renderMap('#v1-map', {
      style: 'poly', zoom: true, markers: false, height: 620,
      onCountryClick: iso => openModal(iso)
    });
  }

  function renderV2() {
    renderMap('#v2-map', {
      style: 'poly', zoom: false, markers: false, height: 560,
      onCountryClick: iso => focusCountryV2(iso)
    });
    const pane = document.getElementById('v2-list');
    const sorted = [...DATA].sort((a, b) => a.name.localeCompare(b.name, 'de'));
    pane.innerHTML = `
      <div class="list-head"><span>Länder</span><span>${DATA.length}</span></div>
      ${sorted.map(c => `
        <div class="list-item" data-iso="${c.iso}">
          <span class="country-name">${c.name}</span>
          <span class="count"><b>${c.projects.length}</b> Proj.</span>
        </div>
      `).join('')}`;
    pane.querySelectorAll('.list-item').forEach(el => {
      el.addEventListener('click', () => focusCountryV2(el.dataset.iso));
    });
  }

  function focusCountryV2(iso) {
    document.querySelectorAll('#v2-list .list-item').forEach(el =>
      el.classList.toggle('active', el.dataset.iso === iso));
    const target = document.querySelector(`#v2-list .list-item[data-iso="${iso}"]`);
    if (target) target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    openModal(iso);
  }

  function renderV3() {
    renderMap('#v3-map', {
      style: 'dots', zoom: false, markers: false, height: 580,
      onCountryClick: iso => openDrawer(iso)
    });
  }

  function renderV4() {
    renderMap('#v4-map', {
      style: 'poly', zoom: true, markers: true, height: 620,
      onCountryClick: iso => openModal(iso)
    });
  }

  const variants = { v1: renderV1, v2: renderV2, v3: renderV3, v4: renderV4 };

  function switchVariant(v) {
    state.variant = v;
    document.querySelectorAll('.tab:not(.tab-tweaks)').forEach(t =>
      t.classList.toggle('on', t.dataset.v === v));
    document.querySelectorAll('.variant').forEach(el =>
      el.classList.toggle('on', el.dataset.v === v));
    variants[v]();
    persist();
  }

  function applyAccent(color) {
    state.accent = color;
    document.documentElement.style.setProperty('--accent', color);
    variants[state.variant]();
    persist();
  }

  function setLabels(mode) {
    state.labels = mode;
    document.querySelectorAll('#tweak-labels .pill').forEach(p =>
      p.classList.toggle('on', p.dataset.v === mode));
    variants[state.variant]();
    persist();
  }

  function setProjection(kind) {
    state.projection = kind;
    document.querySelectorAll('#tweak-proj .pill').forEach(p =>
      p.classList.toggle('on', p.dataset.v === kind));
    variants[state.variant]();
    persist();
  }

  function persist() {
    try {
      localStorage.setItem('projektkarte', JSON.stringify({
        variant: state.variant, accent: state.accent,
        labels: state.labels, projection: state.projection
      }));
    } catch (e) {}
  }

  function restore() {
    try {
      const saved = JSON.parse(localStorage.getItem('projektkarte') || '{}');
      if (saved.accent) state.accent = saved.accent;
      if (saved.labels) state.labels = saved.labels;
      if (saved.projection) state.projection = saved.projection;
      if (saved.variant) state.variant = saved.variant;
    } catch (e) {}
  }

  function init() {
    restore();
    document.documentElement.style.setProperty('--accent', state.accent);

    document.querySelectorAll('.tab:not(.tab-tweaks)').forEach(t => {
      t.addEventListener('click', () => switchVariant(t.dataset.v));
    });

    const tweaksPanel = document.getElementById('tweaks');
    const tweaksToggle = document.getElementById('tweaks-toggle');
    tweaksToggle.addEventListener('click', () => {
      const on = tweaksPanel.classList.toggle('on');
      tweaksToggle.classList.toggle('on', on);
    });

    const accentInput = document.getElementById('tweak-accent-input');
    accentInput.value = state.accent;
    accentInput.addEventListener('input', e => applyAccent(e.target.value));
    document.querySelectorAll('#tweak-accent-swatches .pill').forEach(p => {
      p.addEventListener('click', () => { accentInput.value = p.dataset.v; applyAccent(p.dataset.v); });
    });
    document.querySelectorAll('#tweak-labels .pill').forEach(p => {
      p.addEventListener('click', () => setLabels(p.dataset.v));
    });
    document.querySelectorAll('#tweak-proj .pill').forEach(p => {
      p.addEventListener('click', () => setProjection(p.dataset.v));
    });

    document.querySelectorAll('#tweak-labels .pill').forEach(p =>
      p.classList.toggle('on', p.dataset.v === state.labels));
    document.querySelectorAll('#tweak-proj .pill').forEach(p =>
      p.classList.toggle('on', p.dataset.v === state.projection));

    let rTimer;
    window.addEventListener('resize', () => {
      clearTimeout(rTimer);
      rTimer = setTimeout(() => variants[state.variant](), 250);
    });

    switchVariant(state.variant);
  }

  function boot() {
    if (window.d3 && window.topojson) init();
    else setTimeout(boot, 50);
  }
  boot();
})();
