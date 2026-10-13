/* Claude 画的趋势金币：一条细折线向上（无坐标轴、无箭头），右下一立三摞的金币，币面浮雕 B。
   金币走明亮饱满的金色：最暗只到琥珀色，不发褐；侧面是抛光圆柱的反光和压边纹，币面是凸起外圈 + 亮面 + 浮雕 B，
   币与币之间有接触阴影，所有金币落在同一道地面阴影上。64×64 画布，光从左上来。 */
window.CLAUDE_ICONS = (() => {
  // 粗体 B：直的字干 + 上小下大两个碗，字怀是 D 形；10.2×12 的格子
  const B = 'M0 0H5.6C8.2 0 9.6 1.3 9.6 3.2C9.6 4.5 8.9 5.4 7.9 5.8C9.3 6.2 10.2 7.3 10.2 8.7C10.2 10.8 8.6 12 5.9 12H0Z' +
    'M2.7 2.3H5.1C6.3 2.3 6.9 2.8 6.9 3.55C6.9 4.3 6.3 4.8 5.1 4.8H2.7Z' +
    'M2.7 7H5.4C6.8 7 7.4 7.6 7.4 8.4C7.4 9.25 6.8 9.8 5.4 9.8H2.7Z';
  const IVORY = '#FFF6E9';
  const f = (v) => +v.toFixed(2);

  // 趋势线：六个点五段折线，两次小回落，从左缘一路升到右上角
  const PTS = [[7.5, 31], [15, 23], [21.5, 26], [30.5, 15], [37.5, 18.5], [53, 7.5]];
  const END = PTS[PTS.length - 1];
  const line = 'M' + PTS.map((p) => p.join(' ')).join('L');

  const defs = (bg) =>
    `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset=".55" stop-color="${bg[1]}"/><stop offset="1" stop-color="${bg[2]}"/></linearGradient>` +
    '<radialGradient id="gloss" cx=".22" cy=".12" r=".8"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".12"/><stop offset=".6" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>' +
    `<linearGradient id="trend" gradientUnits="userSpaceOnUse" x1="${PTS[0][0]}" y1="${PTS[0][1]}" x2="${END[0]}" y2="${END[1]}"><stop offset="0" stop-color="${IVORY}" stop-opacity=".45"/><stop offset=".6" stop-color="${IVORY}" stop-opacity=".85"/><stop offset="1" stop-color="${IVORY}" stop-opacity=".95"/></linearGradient>` +
    // 平放金币的侧面：圆柱打光，左侧一道亮高光、右侧一道次高光，两端只暗到琥珀色
    '<linearGradient id="side" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#B8730A"/><stop offset=".14" stop-color="#F0AE2C"/><stop offset=".24" stop-color="#FFEBA0"/><stop offset=".34" stop-color="#F6BC38"/><stop offset=".6" stop-color="#D88E12"/><stop offset=".8" stop-color="#F7C64E"/><stop offset="1" stop-color="#B06A08"/></linearGradient>' +
    '<linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE48A"/><stop offset=".45" stop-color="#E39B1A"/><stop offset="1" stop-color="#B06A08"/></linearGradient>' +
    // 币面：凸起外圈迎光亮、背光深；往里一级反向台阶；中间亮面带一道斜向柔光
    '<linearGradient id="rim" x1=".15" y1=".1" x2=".85" y2=".9"><stop offset="0" stop-color="#FFF1A8"/><stop offset=".4" stop-color="#FFC93C"/><stop offset="1" stop-color="#CC800C"/></linearGradient>' +
    '<linearGradient id="rim-in" x1=".15" y1=".1" x2=".85" y2=".9"><stop offset="0" stop-color="#D38A12"/><stop offset=".5" stop-color="#F3B42E"/><stop offset="1" stop-color="#FFE68C"/></linearGradient>' +
    '<radialGradient id="field" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="#FFF1B0"/><stop offset=".45" stop-color="#FFD449"/><stop offset="1" stop-color="#F0A21C"/></radialGradient>' +
    '<linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/><stop offset=".5" stop-color="#FFFBE6" stop-opacity=".45"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>' +
    '<linearGradient id="relief" x1="0" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="#F9BE34"/><stop offset="1" stop-color="#DE8F10"/></linearGradient>' +
    '<filter id="soft" x="-40%" y="-120%" width="180%" height="340%"><feGaussianBlur stdDeviation="1.3"/></filter>' +
    '<filter id="tight" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation=".6"/></filter>' +
    `<path id="b" fill-rule="evenodd" d="${B}"/>`;

  const backdrop = '<rect width="64" height="64" fill="url(#gloss)"/>' +
    '<rect x=".75" y=".75" width="62.5" height="62.5" rx="13.3" fill="none" stroke="#FFFFFF" stroke-opacity=".13" stroke-width="1.5"/>';

  // 细线 + 拐点空心数据点 + 末端一颗同样大小的实心点，不加光晕
  const trend = (shade, hole) =>
    `<path d="${line}" fill="none" stroke="${shade}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".4" transform="translate(0 1.1)" filter="url(#tight)"/>` +
    `<path d="${line}" fill="none" stroke="url(#trend)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>` +
    PTS.slice(1, -1).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.55" fill="${hole}" stroke="${IVORY}" stroke-opacity=".9" stroke-width="1.1"/>`).join('') +
    `<circle cx="${END[0]}" cy="${END[1]}" r="2" fill="${IVORY}" fill-opacity=".92"/>`;

  // 浮雕 B：右下一道柔影、左上一道亮边，字面比币面深一档
  const embossB = () =>
    '<use href="#b" transform="translate(.45 .55)" fill="#B06A08" opacity=".55"/>' +
    '<use href="#b" transform="translate(-.3 -.3)" fill="#FFF8D6"/>' +
    '<use href="#b" fill="url(#relief)"/>';

  // 一枚金币的正面，局部坐标：原点是币心，半径 R
  let uid = 0;
  const coinFace = (R, withB) => {
    const id = 'cf' + (uid++);
    const s = (R * 0.98) / 12;
    return `<circle r="${R}" fill="url(#rim)"/>` +
      `<circle r="${f(R * 0.87)}" fill="url(#rim-in)"/>` +
      `<clipPath id="${id}"><circle r="${f(R * 0.82)}"/></clipPath>` +
      `<g clip-path="url(#${id})"><circle r="${f(R * 0.82)}" fill="url(#field)"/>` +
      `<rect x="${f(-R * 0.2)}" y="${-R}" width="${f(R * 0.36)}" height="${2 * R}" fill="url(#sheen)" transform="rotate(38)"/></g>` +
      `<circle r="${f(R * 0.74)}" fill="none" stroke="#E29A1E" stroke-width=".45" opacity=".6"/>` +
      (withB ? `<g transform="translate(${f(-5.1 * s)} ${f(-6 * s)}) scale(${f(s)})">${embossB()}</g>` : '');
  };

  // 平放的一枚：侧面细压边纹（跟着圆柱弧度，两端更密），顶面是完整币面透视压扁
  const flatCoin = (x, y, rx, ry, h, withB) => {
    const reeds = Array.from({ length: 30 }, (_, i) => {
      const t = Math.PI * (i + 0.5) / 30;
      return `M${f(x + rx * Math.cos(t))} ${f(y + ry * Math.sin(t) + 0.4)}v${f(h - 0.8)}`;
    }).join('');
    return `<path d="M${x - rx} ${y}v${h}a${rx} ${ry} 0 0 0 ${2 * rx} 0V${y}Z" fill="url(#side)"/>` +
      `<path d="${reeds}" stroke="#9C5A06" stroke-width=".26" opacity=".32"/>` +
      `<path d="M${x - rx} ${y + h}a${rx} ${ry} 0 0 0 ${2 * rx} 0" fill="none" stroke="#9C5A06" stroke-width=".45" opacity=".55"/>` +
      `<g transform="translate(${x} ${y}) scale(1 ${f(ry / rx)})">${coinFace(rx, withB)}</g>`;
  };
  // 一摞：每放一枚之前，先在下面那枚的顶面投一圈接触阴影
  const stack = (x, base, n, rx, ry, h, gap, topB) => {
    let s = '';
    const dx = [0, -0.7, 0.55, -0.3, 0.4];
    for (let i = 0; i < n; i++) {
      const cx = x + dx[i % dx.length], cy = base - i * gap;
      if (i > 0) s += `<ellipse cx="${f(cx + 0.3)}" cy="${f(cy + h + 0.4)}" rx="${rx}" ry="${ry}" fill="#7A3A04" opacity=".4" filter="url(#tight)"/>`;
      s += flatCoin(cx, cy, rx, ry, h, topB && i === n - 1);
    }
    return s;
  };

  // 立着的一枚：微微后仰，看得到底部的厚度和压边纹
  const standingCoin = (cx, cy, R, tilt, squash, vx, vy) => {
    const L = Math.hypot(vx, vy), nx = -vy / L, ny = vx / L;
    const hull = [[nx * R, ny * R], [-nx * R, -ny * R], [vx - nx * R, vy - ny * R], [vx + nx * R, vy + ny * R]];
    const base = Math.atan2(vy, vx);
    const reeds = Array.from({ length: 34 }, (_, i) => {
      const a = base - Math.PI / 2 + Math.PI * (i + 0.5) / 34;
      return `M${f(Math.cos(a) * R)} ${f(Math.sin(a) * R)}l${f(vx)} ${f(vy)}`;
    }).join('');
    return `<g transform="translate(${cx} ${cy}) rotate(${tilt}) scale(1 ${squash})">` +
      `<circle cx="${vx}" cy="${vy}" r="${R}" fill="#B06A08"/>` +
      `<path d="M${hull.map((p) => f(p[0]) + ' ' + f(p[1])).join('L')}Z" fill="url(#edge)"/>` +
      `<path d="${reeds}" stroke="#8E5205" stroke-width=".28" opacity=".35"/>` +
      coinFace(R, true) + '</g>';
  };
  const ground = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="2.3" fill="#1C0408" opacity=".4" filter="url(#soft)"/>`;

  const RED = ['#DC4A56', '#AE2638', '#6A1629'];
  const NAVY = ['#3045AE', '#192A82', '#0A1349'];
  // 构图占满画布：折线从左缘升到右上角，立币靠左下、三枚一摞靠右下，都落在同一道地面阴影上
  const oneUpThreeDown = () => ground(37, 59, 25) +
    stack(48, 49.9, 3, 12.5, 4.6, 4, 5.1, false) +
    `<ellipse cx="28.5" cy="58.8" rx="11" ry="1.7" fill="#1C0408" opacity=".45" filter="url(#tight)"/>` +
    standingCoin(27, 43.2, 13, -5, 0.96, 1.4, 2.8);

  return [
    {
      id: 'cl-trend-coin', name: '趋势金币 · 一立三摞', badge: 'Claude 画', glow: '#FFD27E', bg: 'url(#bg)', defs: defs(RED),
      story: '一条细折线从左缘升到右上角，五段两次小回落。右下三枚金币摞着，前面立一枚，币面浮雕粗体 B；金色明亮饱满，侧面有压边纹，币与币之间有接触阴影。',
      body: backdrop + trend('#3A0510', RED[1]) + oneUpThreeDown(),
    },
    {
      id: 'cl-trend-coin-navy', name: '趋势金币 · 一立三摞 · 藏蓝', glow: '#FFD27E', bg: 'url(#bg)', defs: defs(NAVY),
      story: '和第一个同一幅画，底色换成 dbmanage 顶栏的藏蓝，和其他红色 BOKE 标签更好分开。',
      body: backdrop + trend('#020618', NAVY[1]) + oneUpThreeDown(),
    },
    {
      id: 'cl-trend-stack', name: '趋势金币 · 顶面印 B', glow: '#FFD27E', bg: 'url(#bg)', defs: defs(RED),
      story: '只有一摞金币，最上面那枚的币面浮雕 B。金币画得更「抬头」，像从斜上方看下去，B 才不被压得太扁。',
      body: backdrop + trend('#3A0510', RED[1]) + ground(44, 59, 18) + stack(44, 48.5, 3, 15, 7, 4.2, 5.2, true),
    },
  ];
})();
