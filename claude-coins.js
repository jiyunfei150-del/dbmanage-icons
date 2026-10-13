/* Claude 画的趋势金币：一条细折线向上，右下一立三摞的金币。
   金币照实物纪念币画：哑光黄铜金色，币面是细颗粒的缎面金属，凸起的外沿、内圈、带上下竖线的大 B 和底部 BOKE 字样
   用 SVG 光照滤镜打出浮雕（光从左上），侧面是压边纹，币与币之间有接触阴影。64×64 画布。 */
window.CLAUDE_ICONS = (() => {
  // 粗体 B（D 形字怀）+ 上下各两根竖线，像比特币的 ₿；10.2×15.8 的格子，字身从 y=1.9 开始
  const BB = 'M0 1.9H5.6C8.2 1.9 9.6 3.2 9.6 5.1C9.6 6.4 8.9 7.3 7.9 7.7C9.3 8.1 10.2 9.2 10.2 10.6C10.2 12.7 8.6 13.9 5.9 13.9H0Z' +
    'M2.7 4.2H5.1C6.3 4.2 6.9 4.7 6.9 5.45C6.9 6.2 6.3 6.7 5.1 6.7H2.7Z' +
    'M2.7 8.9H5.4C6.8 8.9 7.4 9.5 7.4 10.3C7.4 11.15 6.8 11.7 5.4 11.7H2.7Z' +
    'M1.9 0H3.2V1.85H1.9ZM4.5 0H5.8V1.85H4.5ZM1.9 13.95H3.2V15.8H1.9ZM4.5 13.95H5.8V15.8H4.5Z';
  const IVORY = '#FFF6E9';
  const f = (v) => +v.toFixed(2);

  // 趋势线：六个点五段折线，两次小回落，从左缘一路升到右上角
  const PTS = [[7.5, 31], [15, 23], [21.5, 26], [30.5, 15], [37.5, 18.5], [53, 7.5]];
  const END = PTS[PTS.length - 1];
  const line = 'M' + PTS.map((p) => p.join(' ')).join('L');

  // 浮雕光照：把凸起图形的轮廓当高度图，漫反射乘回原色得到明暗，再叠一层镜面高光
  const reliefFilter = (id, scale) =>
    `<filter id="${id}" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">` +
    '<feGaussianBlur in="SourceAlpha" stdDeviation=".45" result="h"/>' +
    `<feDiffuseLighting in="h" surfaceScale="${scale}" diffuseConstant="1.5" lighting-color="#FFFFFF" result="d"><feDistantLight azimuth="225" elevation="42"/></feDiffuseLighting>` +
    '<feComposite in="d" in2="SourceGraphic" operator="arithmetic" k1=".65" k3=".42" result="lit"/>' +
    `<feSpecularLighting in="h" surfaceScale="${scale}" specularConstant=".75" specularExponent="22" lighting-color="#FFF4D8" result="s"><feDistantLight azimuth="225" elevation="42"/></feSpecularLighting>` +
    '<feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/>' +
    '<feComposite in="lit" in2="s2" operator="arithmetic" k2="1" k3="1" result="all"/>' +
    '<feComposite in="all" in2="SourceAlpha" operator="in"/></filter>';

  const defs = (bg) =>
    `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset=".55" stop-color="${bg[1]}"/><stop offset="1" stop-color="${bg[2]}"/></linearGradient>` +
    '<radialGradient id="gloss" cx=".22" cy=".12" r=".8"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".1"/><stop offset=".6" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>' +
    `<linearGradient id="trend" gradientUnits="userSpaceOnUse" x1="${PTS[0][0]}" y1="${PTS[0][1]}" x2="${END[0]}" y2="${END[1]}"><stop offset="0" stop-color="${IVORY}" stop-opacity=".45"/><stop offset=".6" stop-color="${IVORY}" stop-opacity=".85"/><stop offset="1" stop-color="${IVORY}" stop-opacity=".95"/></linearGradient>` +
    // 黄铜金：侧面是圆柱反光，币面是左上偏亮的缎面
    '<linearGradient id="side" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5E4519"/><stop offset=".12" stop-color="#A8863F"/><stop offset=".22" stop-color="#F1D99A"/><stop offset=".3" stop-color="#C9A458"/><stop offset=".55" stop-color="#8E6C2E"/><stop offset=".76" stop-color="#D6B567"/><stop offset=".86" stop-color="#A9853C"/><stop offset="1" stop-color="#5E4519"/></linearGradient>' +
    '<linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E9CF8C"/><stop offset=".45" stop-color="#A9853C"/><stop offset="1" stop-color="#5E4519"/></linearGradient>' +
    '<radialGradient id="face" cx=".34" cy=".28" r=".9"><stop offset="0" stop-color="#F0DCA2"/><stop offset=".5" stop-color="#D3AF65"/><stop offset="1" stop-color="#9E7B36"/></radialGradient>' +
    '<linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/><stop offset=".5" stop-color="#FFF8E4" stop-opacity=".22"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>' +
    // 缎面颗粒：分形噪声转成稀疏的暗斑
    '<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="2" seed="7"/>' +
    '<feColorMatrix values="0 0 0 0 .25  0 0 0 0 .18  0 0 0 0 .06  0 0 0 -1.6 1.05"/><feComposite in2="SourceGraphic" operator="in"/></filter>' +
    reliefFilter('relief', 1.8) + reliefFilter('relief-flat', 1.3) +
    '<filter id="soft" x="-40%" y="-120%" width="180%" height="340%"><feGaussianBlur stdDeviation="1.3"/></filter>' +
    '<filter id="tight" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation=".6"/></filter>' +
    `<path id="bb" fill-rule="evenodd" d="${BB}"/>`;

  const backdrop = '<rect width="64" height="64" fill="url(#gloss)"/>' +
    '<rect x=".75" y=".75" width="62.5" height="62.5" rx="13.3" fill="none" stroke="#FFFFFF" stroke-opacity=".12" stroke-width="1.5"/>';

  const trend = (shade, hole) =>
    `<path d="${line}" fill="none" stroke="${shade}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".4" transform="translate(0 1.1)" filter="url(#tight)"/>` +
    `<path d="${line}" fill="none" stroke="url(#trend)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>` +
    PTS.slice(1, -1).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.55" fill="${hole}" stroke="${IVORY}" stroke-opacity=".9" stroke-width="1.1"/>`).join('') +
    `<circle cx="${END[0]}" cy="${END[1]}" r="2" fill="${IVORY}" fill-opacity=".92"/>`;

  // 一枚金币的正面，局部坐标：原点是币心，半径 R。凸起部分（外沿、内圈、₿、字、点）一起过浮雕光照
  let uid = 0;
  const coinFace = (R, opts) => {
    const o = opts || {};
    const id = 'cf' + (uid++);
    const s = (R * 1.02) / 15.8;
    const relief = '#E2C47E';
    const arc = `M${f(-R * 0.74)} 0A${f(R * 0.74)} ${f(R * 0.74)} 0 0 0 ${f(R * 0.74)} 0`;
    return `<circle r="${R}" fill="#8A6A2C"/>` +
      `<clipPath id="${id}"><circle r="${f(R * 0.985)}"/></clipPath>` +
      `<g clip-path="url(#${id})"><circle r="${R}" fill="url(#face)"/>` +
      `<rect x="${-R}" y="${-R}" width="${2 * R}" height="${2 * R}" fill="#000" filter="url(#grain)" opacity=".55"/>` +
      `<rect x="${f(-R * 0.3)}" y="${-R}" width="${f(R * 0.55)}" height="${2 * R}" fill="url(#sheen)" transform="rotate(34)"/></g>` +
      `<g filter="url(${o.flat ? '#relief-flat' : '#relief'})">` +
      `<circle r="${f(R * 0.94)}" fill="none" stroke="${relief}" stroke-width="${f(R * 0.09)}"/>` +
      `<circle r="${f(R * 0.6)}" fill="none" stroke="${relief}" stroke-width="${f(R * 0.04)}"/>` +
      `<g transform="translate(${f(-5.1 * s)} ${f(-7.9 * s)}) scale(${f(s)})"><use href="#bb" fill="${relief}"/></g>` +
      (o.text ? `<path id="${id}t" d="${arc}" fill="none"/><text font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="${f(R * 0.17)}" letter-spacing="${f(R * 0.06)}" fill="${relief}" text-anchor="middle"><textPath href="#${id}t" startOffset="50%">BOKE</textPath></text>` +
        `<circle cx="${f(-R * 0.74)}" cy="${f(-R * 0.08)}" r="${f(R * 0.035)}" fill="${relief}"/><circle cx="${f(R * 0.74)}" cy="${f(-R * 0.08)}" r="${f(R * 0.035)}" fill="${relief}"/>` +
        `<path d="M0 ${f(-R * 0.79)}l${f(R * 0.035)} ${f(R * 0.07)} ${f(R * 0.075)} 0 -${f(R * 0.06)} ${f(R * 0.045)} ${f(R * 0.025)} ${f(R * 0.075)} -${f(R * 0.075)} -${f(R * 0.045)} -${f(R * 0.075)} ${f(R * 0.045)} ${f(R * 0.025)} -${f(R * 0.075)} -${f(R * 0.06)} -${f(R * 0.045)} ${f(R * 0.075)} 0Z" fill="${relief}"/>` : '') +
      '</g>';
  };

  // 平放的一枚：侧面细压边纹（跟着圆柱弧度，两端更密），顶面是完整币面透视压扁
  const flatCoin = (x, y, rx, ry, h) => {
    const reeds = Array.from({ length: 32 }, (_, i) => {
      const t = Math.PI * (i + 0.5) / 32;
      return `M${f(x + rx * Math.cos(t))} ${f(y + ry * Math.sin(t) + 0.4)}v${f(h - 0.8)}`;
    }).join('');
    return `<path d="M${x - rx} ${y}v${h}a${rx} ${ry} 0 0 0 ${2 * rx} 0V${y}Z" fill="url(#side)"/>` +
      `<path d="${reeds}" stroke="#3E2C0E" stroke-width=".26" opacity=".38"/>` +
      `<path d="M${x - rx} ${y + h}a${rx} ${ry} 0 0 0 ${2 * rx} 0" fill="none" stroke="#3E2C0E" stroke-width=".45" opacity=".55"/>` +
      `<g transform="translate(${x} ${y}) scale(1 ${f(ry / rx)})">${coinFace(rx, { flat: true })}</g>`;
  };
  const stack = (x, base, n, rx, ry, h, gap) => {
    let s = '';
    const dx = [0, -0.7, 0.55, -0.3, 0.4];
    for (let i = 0; i < n; i++) {
      const cx = x + dx[i % dx.length], cy = base - i * gap;
      if (i > 0) s += `<ellipse cx="${f(cx + 0.3)}" cy="${f(cy + h + 0.4)}" rx="${rx}" ry="${ry}" fill="#2A1C06" opacity=".5" filter="url(#tight)"/>`;
      s += flatCoin(cx, cy, rx, ry, h);
    }
    return s;
  };

  // 立着的一枚：微微后仰，看得到底部的厚度和压边纹
  const standingCoin = (cx, cy, R, tilt, squash, vx, vy) => {
    const L = Math.hypot(vx, vy), nx = -vy / L, ny = vx / L;
    const hull = [[nx * R, ny * R], [-nx * R, -ny * R], [vx - nx * R, vy - ny * R], [vx + nx * R, vy + ny * R]];
    const base = Math.atan2(vy, vx);
    const reeds = Array.from({ length: 36 }, (_, i) => {
      const a = base - Math.PI / 2 + Math.PI * (i + 0.5) / 36;
      return `M${f(Math.cos(a) * R)} ${f(Math.sin(a) * R)}l${f(vx)} ${f(vy)}`;
    }).join('');
    return `<g transform="translate(${cx} ${cy}) rotate(${tilt}) scale(1 ${squash})">` +
      `<circle cx="${vx}" cy="${vy}" r="${R}" fill="#4E3812"/>` +
      `<path d="M${hull.map((p) => f(p[0]) + ' ' + f(p[1])).join('L')}Z" fill="url(#edge)"/>` +
      `<path d="${reeds}" stroke="#2E200A" stroke-width=".28" opacity=".45"/>` +
      coinFace(R, { text: true }) + '</g>';
  };
  const ground = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="2.3" fill="#12020A" opacity=".5" filter="url(#soft)"/>`;

  const RED = ['#C23A47', '#8E1F31', '#4A0F1E'];
  const NAVY = ['#2B3EA0', '#162576', '#080F3C'];
  // 构图占满画布：折线从左缘升到右上角，立币靠左下、三枚一摞靠右下，都落在同一道地面阴影上
  const oneUpThreeDown = () => ground(37, 59, 25) +
    stack(48, 49.9, 3, 12.5, 4.6, 4, 5.1) +
    `<ellipse cx="28.5" cy="58.8" rx="11" ry="1.7" fill="#12020A" opacity=".5" filter="url(#tight)"/>` +
    standingCoin(27, 43.2, 13, -5, 0.96, 1.4, 2.8);

  return [
    {
      id: 'cl-trend-coin', name: '趋势金币 · 一立三摞', badge: 'Claude 画', glow: '#E2C47E', bg: 'url(#bg)', defs: defs(RED),
      story: '照实物纪念币画：哑光黄铜金，缎面颗粒，凸起的外沿、内圈、带上下竖线的大 B 和底部 BOKE 字样都用光照打出浮雕。一条细折线从左缘升到右上角，右下三枚摞着、前面立一枚。',
      body: backdrop + trend('#2A0510', RED[1]) + oneUpThreeDown(),
    },
    {
      id: 'cl-trend-coin-navy', name: '趋势金币 · 一立三摞 · 藏蓝', glow: '#E2C47E', bg: 'url(#bg)', defs: defs(NAVY),
      story: '和第一个同一幅画，底色换成 dbmanage 顶栏的藏蓝，和其他红色 BOKE 标签更好分开。',
      body: backdrop + trend('#020618', NAVY[1]) + oneUpThreeDown(),
    },
    {
      id: 'cl-trend-coin-solo', name: '趋势金币 · 单枚特写', glow: '#E2C47E', bg: 'url(#bg)', defs: defs(RED),
      story: '只画一枚，正对着你、放得最大，币面细节最清楚；折线从它身后升起。适合想让 B 在小尺寸下也最好认的时候。',
      body: backdrop + trend('#2A0510', RED[1]) + ground(37, 59.4, 17) + standingCoin(36, 41.5, 16.5, -4, 0.97, 1.6, 3.2),
    },
  ];
})();
