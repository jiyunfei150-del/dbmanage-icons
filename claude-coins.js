/* Claude 画的趋势金币：左上折线，右下一摞金币，币面印 BOKE 的 B。全部矢量，按 64×64 画，16px 时线宽不低于 1px。 */
window.CLAUDE_ICONS = (() => {
  // BOKE logo 里那个胖 B：圆角字身 + 两个圆孔（logo 里是藏蓝圆点），10.4×12 的格子
  const B = 'M0 0H6C8.6 0 10 1.4 10 3.3C10 4.6 9.3 5.5 8.3 5.9C9.6 6.4 10.4 7.5 10.4 8.8C10.4 10.8 8.8 12 6.3 12H0Z' +
    'M3.25 3.1a1.35 1.35 0 1 0 2.7 0a1.35 1.35 0 1 0 -2.7 0Z' +
    'M3.4 8.7a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0Z';
  const IVORY = '#FFF5E7';

  const defs = (bg) =>
    `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset=".6" stop-color="${bg[1]}"/><stop offset="1" stop-color="${bg[2]}"/></linearGradient>` +
    '<linearGradient id="side" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#A9690F"/><stop offset=".2" stop-color="#F6C752"/><stop offset=".48" stop-color="#E2A42C"/><stop offset=".78" stop-color="#B97A18"/><stop offset="1" stop-color="#8E550B"/></linearGradient>' +
    '<linearGradient id="top" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="#FFF4BE"/><stop offset=".45" stop-color="#FFD96E"/><stop offset="1" stop-color="#E9A92E"/></linearGradient>' +
    '<radialGradient id="face" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#FFF7CC"/><stop offset=".42" stop-color="#FFD862"/><stop offset="1" stop-color="#DC9820"/></radialGradient>' +
    '<linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE68E"/><stop offset=".5" stop-color="#D99521"/><stop offset="1" stop-color="#93560A"/></linearGradient>' +
    `<path id="b" fill-rule="evenodd" d="${B}"/>`;

  // 浮雕 B：右下压一道暗边、左上提一道亮边，中间是比币面深一档的金
  const embossB = (fill) =>
    '<use href="#b" transform="translate(.45 .45)" fill="#7A4306" opacity=".75"/>' +
    '<use href="#b" transform="translate(-.35 -.35)" fill="#FFF6D2"/>' +
    `<use href="#b" fill="${fill}"/>`;

  // 平放的一枚：侧面带压边纹，顶面一圈内沿
  const flatCoin = (x, y, rx, ry, h) => {
    const reeds = [-0.82, -0.58, -0.34, -0.1, 0.14, 0.38, 0.62].map((t) => {
      const px = x + t * rx, py = y + ry * Math.sqrt(1 - t * t);
      return `<path d="M${px.toFixed(2)} ${(py + 0.5).toFixed(2)}v${(h - 1).toFixed(2)}"/>`;
    }).join('');
    return `<path d="M${x - rx} ${y}v${h}a${rx} ${ry} 0 0 0 ${2 * rx} 0V${y}Z" fill="url(#side)" stroke="#8E550B" stroke-width=".5"/>` +
      `<g stroke="#8E550B" stroke-width=".45" opacity=".55">${reeds}</g>` +
      `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#top)" stroke="#A86B12" stroke-width=".5"/>` +
      `<ellipse cx="${x}" cy="${y}" rx="${(rx * 0.8).toFixed(2)}" ry="${(ry * 0.78).toFixed(2)}" fill="none" stroke="#FFF6CF" stroke-width=".5" opacity=".85"/>`;
  };
  const stack = (x, base, n, rx, ry, h, gap) => {
    let s = '';
    for (let i = 0; i < n; i++) s += flatCoin(x + [0, -0.7, 0.5, -0.3][i % 4], base - i * gap, rx, ry, h);
    return s;
  };

  // 立着朝向你的一枚：右侧露出厚度，外圈细齿，正中浮雕 B
  const uprightCoin = (cx, cy, r, th) => {
    const dots = Array.from({ length: 28 }, (_, i) => {
      const a = (i / 28) * Math.PI * 2;
      return `<circle cx="${(cx + Math.cos(a) * r * 0.91).toFixed(2)}" cy="${(cy + Math.sin(a) * r * 0.91).toFixed(2)}" r=".32"/>`;
    }).join('');
    const s = (r * 1.12) / 12;
    return `<circle cx="${cx + th}" cy="${cy}" r="${r}" fill="#9A5C0C"/>` +
      `<path d="M${cx} ${cy - r}H${cx + th}A${r} ${r} 0 0 1 ${cx + th} ${cy + r}H${cx}Z" fill="url(#side)" opacity=".9"/>` +
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#rim)"/>` +
      `<g fill="#FFEFB0" opacity=".7">${dots}</g>` +
      `<circle cx="${cx}" cy="${cy}" r="${(r * 0.82).toFixed(2)}" fill="url(#face)" stroke="#B97A18" stroke-width=".5"/>` +
      `<circle cx="${cx}" cy="${cy}" r="${(r * 0.72).toFixed(2)}" fill="none" stroke="#C98417" stroke-width=".55" opacity=".75"/>` +
      `<g transform="translate(${(cx - 5.2 * s).toFixed(2)} ${(cy - 6 * s).toFixed(2)}) scale(${s.toFixed(3)})">${embossB('#C47F14')}</g>` +
      // 左上沿一道弧形高光，比椭圆光斑更像金属
      `<path d="M${(cx - r * 0.62).toFixed(2)} ${(cy - r * 0.12).toFixed(2)}A${(r * 0.64).toFixed(2)} ${(r * 0.64).toFixed(2)} 0 0 1 ${(cx - r * 0.1).toFixed(2)} ${(cy - r * 0.63).toFixed(2)}" fill="none" stroke="#FFFFFF" stroke-width="1.1" stroke-linecap="round" opacity=".55"/>`;
  };

  // 左上角的上升折线：淡淡的坐标轴 + 粗线 + 箭头
  const trend = (axis) =>
    `<path d="M10 9.5V31.5H29" fill="none" stroke="${axis}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>` +
    `<path d="M14 27L20.5 20L26 23.5L35.5 13" fill="none" stroke="${IVORY}" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M29.5 12.5H36V19" fill="none" stroke="${IVORY}" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const shadow = (cx, color) => `<ellipse cx="${cx}" cy="58.6" rx="17" ry="2.4" fill="${color}" opacity=".32"/>`;

  const RED = ['#D9434F', '#B02639', '#741B30'];
  const NAVY = ['#2B3FA6', '#18297F', '#0B1550'];

  return [
    {
      id: 'cl-trend-coin', name: '趋势金币 · 立币', badge: 'Claude 画', glow: '#FFD27E', bg: 'url(#bg)', defs: defs(RED),
      story: '左上角一条上扬的折线，右下角三枚金币摞着，前面再立一枚正对着你，币面浮雕 BOKE 的胖 B（两个圆孔取自 logo）。立着的那枚让 B 缩到 32px 还认得出。',
      body: trend(IVORY) + shadow(44, '#3D0A14') + stack(48.5, 50.5, 3, 11, 3.9, 3.5, 4.5) + uprightCoin(33.5, 45.8, 11.2, 2.3),
    },
    {
      id: 'cl-trend-stack', name: '趋势金币 · 顶面印 B', glow: '#FFD27E', bg: 'url(#bg)', defs: defs(RED),
      story: '只有一摞金币，最上面那枚的币面印着 B。为了让 B 不被压扁，金币画得更「抬头」一些，像从斜上方看下去。',
      body: trend(IVORY) + shadow(45, '#3D0A14') + stack(45, 52, 3, 13.5, 5.6, 3.6, 4.6) +
        '<g transform="translate(45 42.8) scale(1 .44)"><g transform="translate(-5.2 -6) scale(1.02)">' + embossB('#C47F14') + '</g></g>',
    },
    {
      id: 'cl-trend-coin-navy', name: '趋势金币 · 立币 · 藏蓝', glow: '#FFD27E', bg: 'url(#bg)', defs: defs(NAVY),
      story: '和第一个同一幅画，底色换成 dbmanage 顶栏的藏蓝，和其他红色 BOKE 标签更好分开。',
      body: trend(IVORY) + shadow(44, '#020518') + stack(48.5, 50.5, 3, 11, 3.9, 3.5, 4.5) + uprightCoin(33.5, 45.8, 11.2, 2.3),
    },
  ];
})();
