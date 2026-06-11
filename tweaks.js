// Tweaks panel for Staff Development Handbook — vanilla, wired to the host edit-mode protocol.
(function () {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "titleIcon": "Lotus",
    "accent": "Teal",
    "tone": "Navy",
    "texture": "Mist",
    "headingFont": "Hanken Grotesk",
    "density": "Comfortable",
    "motion": true
  }/*EDITMODE-END*/;

  const LS_KEY = 'isap_tweaks';

  // ---- option tables ----
  const ACCENTS = {
    // [accent, accent-2 (lighter), accent-deep, glow]
    Teal:     ['#4fe0d2', '#7df0e4', '#0fb9aa', 'rgba(79,224,210,0.22)'],
    Sage:     ['#86d3a6', '#abe7c6', '#3f9b6f', 'rgba(134,211,166,0.22)'],
    Sky:      ['#6fb6ec', '#a4d3f6', '#2f86c8', 'rgba(111,182,236,0.22)'],
    Lavender: ['#a99cf2', '#c9bffb', '#6d59d6', 'rgba(169,156,242,0.22)'],
  };
  const TONES = {
    Navy:     ['#08111f', '#0a1626', '#0f2238', '#14304e', '#183a5e'],
    Forest:   ['#06120f', '#081915', '#0c241d', '#123329', '#184237'],
    Twilight: ['#0b0a1c', '#0f0d26', '#171333', '#201b45', '#2a2456'],
  };
  const FONTS = {
    'Hanken Grotesk': "'Hanken Grotesk', system-ui, sans-serif",
    'Newsreader':     "'Newsreader', Georgia, serif",
    'Space Grotesk':  "'Space Grotesk', system-ui, sans-serif",
  };
  const TITLE_ICONS = {
    Lotus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.5c1.6 2 1.6 4.8 0 7-1.6-2.2-1.6-5 0-7z"/><path d="M12 11.5c2-1.6 4.7-1.5 6.8.2-1 2.3-3.2 3.5-5.6 3.2"/><path d="M12 11.5c-2-1.6-4.7-1.5-6.8.2 1 2.3 3.2 3.5 5.6 3.2"/><path d="M4.6 13.8C6.5 17 9.1 18.7 12 18.7s5.5-1.7 7.4-4.9"/></svg>',
    Brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"><path d="M12 6.5v12"/><path d="M12 7a3 3 0 00-5.8-1.1A2.7 2.7 0 003.9 8.4 2.7 2.7 0 004.6 13 2.9 2.9 0 008 16.8a3 3 0 004-1"/><path d="M12 7a3 3 0 015.8-1.1A2.7 2.7 0 0120.1 8.4 2.7 2.7 0 0119.4 13 2.9 2.9 0 0116 16.8a3 3 0 01-4-1"/></svg>',
    Mind: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 16a3.2 3.2 0 01-.2-6.4 2.1 2.1 0 01.3 4.2 1 1 0 01-.2-2"/></svg>',
    Heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 20C6.9 16.4 4 13.2 4 9.8A4.2 4.2 0 0112 7a4.2 4.2 0 018 2.8c0 3.4-2.9 6.6-8 10.2z"/></svg>',
    Leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-7.2 5-12 14-12 0 9-5 13-11 13a4 4 0 01-3-1z"/><path d="M8.5 15.5c2-3 4.2-4.8 7.5-6"/></svg>',
  };

  let t = { ...TWEAK_DEFAULTS };
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    t = { ...t, ...saved };
  } catch (e) {}

  const root = document.documentElement;

  function apply() {
    const a = ACCENTS[t.accent] || ACCENTS.Teal;
    root.style.setProperty('--accent', a[0]);
    root.style.setProperty('--accent-2', a[1]);
    root.style.setProperty('--accent-deep', a[2]);
    root.style.setProperty('--accent-glow', a[3]);

    const tone = TONES[t.tone] || TONES.Navy;
    root.style.setProperty('--bg', tone[0]);
    root.style.setProperty('--bg-2', tone[1]);
    root.style.setProperty('--surface', tone[2]);
    root.style.setProperty('--surface-2', tone[3]);
    root.style.setProperty('--surface-3', tone[4]);

    root.style.setProperty('--display', FONTS[t.headingFont] || FONTS['Hanken Grotesk']);

    document.body.setAttribute('data-tex', String(t.texture || 'Mist').toLowerCase());
    document.body.classList.toggle('density-compact', t.density === 'Compact');
    document.body.classList.toggle('no-anim', !t.motion);

    const mark = document.getElementById('watermark');
    if (mark) {
      if (t.titleIcon && t.titleIcon !== 'None' && TITLE_ICONS[t.titleIcon]) {
        mark.innerHTML = TITLE_ICONS[t.titleIcon];
        mark.classList.remove('hidden');
      } else {
        mark.innerHTML = '';
        mark.classList.add('hidden');
      }
    }
  }

  function persist(edits) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(t)); } catch (e) {}
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*'); } catch (e) {}
  }

  function setTweak(key, val) {
    t[key] = val;
    apply();
    persist({ [key]: val });
    refreshControls();
  }

  apply();

  // ---- build panel ----
  const sparkSvg = '<svg class="tw-spark" viewBox="0 0 24 24" fill="none"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" fill="currentColor"/></svg>';
  const closeSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  const panel = document.createElement('div');
  panel.className = 'tweaks-panel';
  panel.innerHTML = `
    <div class="tw-head">
      <div class="tw-title">${sparkSvg}Tweaks</div>
      <button class="tw-close" aria-label="Close">${closeSvg}</button>
    </div>
    <div class="tw-body">
      <div class="tw-section">
        <p class="tw-label">Title mark</p>
        <div class="tw-icons" id="tw-titleicon"></div>
      </div>
      <div class="tw-section">
        <p class="tw-label">Accent</p>
        <div class="tw-swatches" id="tw-accent"></div>
      </div>
      <div class="tw-section">
        <p class="tw-label">Surface tone</p>
        <div class="tw-seg" id="tw-tone"></div>
      </div>
      <div class="tw-section">
        <p class="tw-label">Background texture</p>
        <div class="tw-seg" id="tw-texture"></div>
      </div>
      <div class="tw-section">
        <p class="tw-label">Heading font</p>
        <div class="tw-seg" id="tw-font"></div>
      </div>
      <div class="tw-section">
        <p class="tw-label">Density</p>
        <div class="tw-seg" id="tw-density"></div>
      </div>
      <div class="tw-section">
        <label class="tw-toggle" id="tw-motion"><span>Gentle motion</span><span class="tw-switch"></span></label>
        <p class="tw-hint">Restyle this handbook live — changes are saved to your browser.</p>
      </div>
    </div>`;
  document.body.appendChild(panel);

  // title mark icons
  const titleWrap = panel.querySelector('#tw-titleicon');
  ['Lotus', 'Brain', 'Mind', 'Heart', 'Leaf', 'None'].forEach(name => {
    const b = document.createElement('button');
    b.className = 'tw-iconbtn';
    b.dataset.val = name;
    b.title = name;
    b.innerHTML = name === 'None' ? '<span class="tw-none">Off</span>' : TITLE_ICONS[name];
    b.addEventListener('click', () => setTweak('titleIcon', name));
    titleWrap.appendChild(b);
  });

  // accent swatches
  const accentWrap = panel.querySelector('#tw-accent');
  Object.keys(ACCENTS).forEach(name => {
    const b = document.createElement('button');
    b.className = 'tw-swatch';
    b.title = name;
    b.style.background = `linear-gradient(180deg, ${ACCENTS[name][1]}, ${ACCENTS[name][0]})`;
    b.dataset.val = name;
    b.addEventListener('click', () => setTweak('accent', name));
    accentWrap.appendChild(b);
  });

  function buildSeg(id, key, options) {
    const wrap = panel.querySelector(id);
    options.forEach(opt => {
      const b = document.createElement('button');
      b.textContent = opt;
      b.dataset.val = opt;
      b.addEventListener('click', () => setTweak(key, opt));
      wrap.appendChild(b);
    });
  }
  buildSeg('#tw-tone', 'tone', Object.keys(TONES));
  buildSeg('#tw-texture', 'texture', ['Mist', 'Grain', 'Dots', 'None']);
  buildSeg('#tw-font', 'font_placeholder', []); // built below with custom labels
  buildSeg('#tw-density', 'density', ['Comfortable', 'Compact']);

  // font segment (use short labels mapped to keys)
  const fontWrap = panel.querySelector('#tw-font');
  const fontLabels = { 'Hanken Grotesk': 'Hanken', 'Newsreader': 'Serif', 'Space Grotesk': 'Grotesk' };
  Object.keys(FONTS).forEach(name => {
    const b = document.createElement('button');
    b.textContent = fontLabels[name];
    b.dataset.val = name;
    b.title = name;
    b.addEventListener('click', () => setTweak('headingFont', name));
    fontWrap.appendChild(b);
  });

  const motionToggle = panel.querySelector('#tw-motion');
  motionToggle.addEventListener('click', () => setTweak('motion', !t.motion));

  function refreshControls() {
    titleWrap.querySelectorAll('.tw-iconbtn').forEach(b => b.classList.toggle('sel', b.dataset.val === t.titleIcon));
    accentWrap.querySelectorAll('.tw-swatch').forEach(b => b.classList.toggle('sel', b.dataset.val === t.accent));
    panel.querySelector('#tw-tone').querySelectorAll('button').forEach(b => b.classList.toggle('sel', b.dataset.val === t.tone));
    panel.querySelector('#tw-texture').querySelectorAll('button').forEach(b => b.classList.toggle('sel', b.dataset.val === t.texture));
    fontWrap.querySelectorAll('button').forEach(b => b.classList.toggle('sel', b.dataset.val === t.headingFont));
    panel.querySelector('#tw-density').querySelectorAll('button').forEach(b => b.classList.toggle('sel', b.dataset.val === t.density));
    motionToggle.classList.toggle('on', !!t.motion);
  }
  refreshControls();

  // ---- host protocol ----
  panel.querySelector('.tw-close').addEventListener('click', () => {
    panel.classList.remove('open');
    try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {}
  });

  window.addEventListener('message', (e) => {
    const ty = e && e.data && e.data.type;
    if (ty === '__activate_edit_mode') { panel.classList.add('open'); refreshControls(); }
    else if (ty === '__deactivate_edit_mode') { panel.classList.remove('open'); }
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
})();