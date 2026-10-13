/* Claude 画的趋势金币：左上一条向上的趋势线（无坐标轴、无箭头），右下一摞金币，币面浮雕 BOKE 的胖 B。
   金币按真实金属的画法：侧面是抛光圆柱的高反差反光 + 密压边纹，币面是凸起外圈、内台阶、镜面底和磨砂浮雕，
   币与币之间有接触阴影，所有金币落在同一条地面阴影上。64×64 画布，光从左上来。 */
window.CLAUDE_ICONS = (() => {
  // BOKE logo 里的胖 B：圆角字身 + 两个圆孔，10.4×12 的格子
  const B = 'M0 0H6C8.6 0 10 1.4 10 3.3C10 4.6 9.3 5.5 8.3 5.9C9.6 6.4 10.4 7.5 10.4 8.8C10.4 10.8 8.8 12 6.3 12H0Z' +
    'M3.25 3.1a1.35 1.35 0 1 0 2.7 0a1.35 1.35 0 1 0 -2.7 0Z' +
    'M3.4 8.7a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0Z';
  const IVORY = '#FFF6E9';
  const f = (v) => +v.toFixed(2);

  // 趋势线：六个点五段折线，两次小回落，从左缘一路升到右上角；没有坐标轴、没有箭头
  const PTS = [[7.5, 31], [15, 23], [21.5, 26], [30.5, 15], [37.5, 18.5], [53, 7.5]];
  const END = PTS[PTS.length - 1];
  const curve = 'M' + PTS.map((p) => p.join(' ')).join('L');

  const defs = (bg) =>
    `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset=".55" stop-color="${bg[1]}"/><stop offset="1" stop-color="${bg[2]}"/></linearGradient>` +
    '<radialGradient id="gloss" cx=".22" cy=".12" r=".8"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".12"/><stop offset=".6" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>' +
    `<linearGradient id="trend" gradientUnits="userSpaceOnUse" x1="${PTS[0][0]}" y1="${PTS[0][1]}" x2="${END[0]}" y2="${END[1]}"><stop offset="0" stop-color="${IVORY}" stop-opacity=".5"/><stop offset=".6" stop-color="${IVORY}" stop-opacity=".92"/><stop offset="1" stop-color="${IVORY}"/></linearGradient>` +
    `<radialGradient id="end-glow"><stop offset="0" stop-color="${IVORY}" stop-opacity=".65"/><stop offset="1" stop-color="${IVORY}" stop-opacity="0"/></radialGradient>` +
    // 抛光圆柱侧面：两端暗、左侧一道尖锐白高光、右侧一道次高光
    '<linearGradient id="side" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4A2A05"/><stop offset=".07" stop-color="#8C5610"/><stop offset=".17" stop-color="#E2A83A"/><stop offset=".23" stop-color="#FFF4C8"/><stop offset=".3" stop-color="#E6AC3E"/><stop offset=".5" stop-color="#A86A14"/><stop offset=".68" stop-color="#D49A2E"/><stop offset=".77" stop-color="#F7D272"/><stop offset=".86" stop-color="#A86A14"/><stop offset="1" stop-color="#4A2A05"/></linearGradient>' +
    '<linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE7A2"/><stop offset=".3" stop-color="#C98A22"/><stop offset=".6" stop-color="#7A4A0B"/><stop offset="1" stop-color="#4A2A05"/></linearGradient>' +
    // 币面：凸起外圈迎光亮、背光暗；内台阶反过来；镜面底偏暗，带一道斜向反光
    '<linearGradient id="rim" x1=".15" y1=".1" x2=".85" y2=".9"><stop offset="0" stop-color="#FFF4C4"/><stop offset=".35" stop-color="#F2BE4C"/><stop offset=".7" stop-color="#B5761A"/><stop offset="1" stop-color="#6E4108"/></linearGradient>' +
    '<linearGradient id="rim-in" x1=".15" y1=".1" x2=".85" y2=".9"><stop offset="0" stop-color="#7E4C0B"/><stop offset=".5" stop-color="#C98A24"/><stop offset="1" stop-color="#FFE39A"/></linearGradient>' +
    '<linearGradient id="mirror" x1=".2" y1="0" x2=".55" y2="1"><stop offset="0" stop-color="#F4C35E"/><stop offset=".45" stop-color="#C6851F"/><stop offset="1" stop-color="#7E4C0B"/></linearGradient>' +
    '<linearGradient id="streak" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/><stop offset=".5" stop-color="#FFF8E0" stop-opacity=".5"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>' +
    '<linearGradient id="frost" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="#FFEDB4"/><stop offset=".55" stop-color="#F3C863"/><stop offset="1" stop-color="#D9A040"/></linearGradient>' +
    '<filter id="soft" x="-40%" y="-120%" width="180%" height="340%"><feGaussianBlur stdDeviation="1.3"/></filter>' +
    '<filter id="tight" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation=".6"/></filter>' +
    `<path id="b" fill-rule="evenodd" d="${B}"/>`;

  const backdrop = '<rect width="64" height="64" fill="url(#gloss)"/>' +
    '<rect x=".75" y=".75" width="62.5" height="62.5" rx="13.3" fill="none" stroke="#FFFFFF" stroke-opacity=".13" stroke-width="1.5"/>';

  // 细线 + 拐点上的空心数据点 + 末端实心亮点；底下压一道很淡的投影，线才不像贴在背景上
  const trend = (shade, hole) =>
    `<path d="${curve}" fill="none" stroke="${shade}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".4" transform="translate(0 1.1)" filter="url(#tight)"/>` +
    `<path d="${curve}" fill="none" stroke="url(#trend)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>` +
    PTS.slice(1, -1).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.55" fill="${hole}" stroke="${IVORY}" stroke-width="1.1"/>`).join('') +
    `<circle cx="${END[0]}" cy="${END[1]}" r="5.2" fill="url(#end-glow)"/><circle cx="${END[0]}" cy="${END[1]}" r="2.3" fill="${IVORY}"/>`;

  // 磨砂浮雕 B：右下投一道暗影、左上一道亮边，字面是磨砂浅金，和镜面底拉开反差
  const frostedB = () =>
    '<use href="#b" transform="translate(.55 .65)" fill="#3A2003" opacity=".7"/>' +
    '<use href="#b" transform="translate(-.3 -.3)" fill="#FFF9E6"/>' +
    '<use href="#b" fill="url(#frost)"/>';

  // 一枚金币的正面，局部坐标：原点是币心，半径 R
  let uid = 0;
  const coinFace = (R, withB) => {
    const id = 'cf' + (uid++);
    const dent = Array.from({ length: 48 }, (_, i) => {
      const a = (i / 48) * Math.PI * 2;
      return `M${f(Math.cos(a) * R * 0.885)} ${f(Math.sin(a) * R * 0.885)}L${f(Math.cos(a) * R * 0.94)} ${f(Math.sin(a) * R * 0.94)}`;
    }).join('');
    const s = R / 12.5;
    return `<circle r="${R}" fill="url(#rim)"/>` +
      `<path d="${dent}" stroke="#5A3407" stroke-width=".3" opacity=".45"/>` +
      `<circle r="${f(R * 0.86)}" fill="url(#rim-in)"/>` +
      `<clipPath id="${id}"><circle r="${f(R * 0.81)}"/></clipPath>` +
      `<g clip-path="url(#${id})"><circle r="${f(R * 0.81)}" fill="url(#mirror)"/>` +
      `<rect x="${f(-R * 0.22)}" y="${-R}" width="${f(R * 0.4)}" height="${2 * R}" fill="url(#streak)" transform="rotate(38)"/></g>` +
      (withB ? `<g transform="translate(${f(-5.2 * s)} ${f(-6 * s)}) scale(${f(s)})">${frostedB()}</g>` : '');
  };

  // 平放的一枚：侧面带密压边纹（两端更密，跟着圆柱弧度走），顶面是完整币面透视压扁
  const flatCoin = (x, y, rx, ry, h, withB) => {
    const reeds = Array.from({ length: 30 }, (_, i) => {
      const t = Math.PI * (i + 0.5) / 30;
      const px = x + rx * Math.cos(t), py = y + ry * Math.sin(t);
      return `M${f(px)} ${f(py + 0.35)}v${f(h - 0.7)}`;
    }).join('');
    return `<path d="M${x - rx} ${y}v${h}a${rx} ${ry} 0 0 0 ${2 * rx} 0V${y}Z" fill="url(#side)"/>` +
      `<path d="${reeds}" stroke="#3A2003" stroke-width=".28" opacity=".42"/>` +
      `<path d="M${x - rx} ${y + h}a${rx} ${ry} 0 0 0 ${2 * rx} 0" fill="none" stroke="#3A2003" stroke-width=".5" opacity=".7"/>` +
      `<g transform="translate(${x} ${y}) scale(1 ${f(ry / rx)})">${coinFace(rx, withB)}</g>`;
  };
  // 一摞：每放一枚之前，先在下面那枚的顶面投一圈接触阴影
  const stack = (x, base, n, rx, ry, h, gap, topB) => {
    let s = '';
    const dx = [0, -0.7, 0.55, -0.3, 0.4];
    for (let i = 0; i < n; i++) {
      const cx = x + dx[i % dx.length], cy = base - i * gap;
      if (i > 0) s += `<ellipse cx="${f(cx + 0.3)}" cy="${f(cy + h + 0.4)}" rx="${rx}" ry="${ry}" fill="#2A1602" opacity=".55" filter="url(#tight)"/>`;
      s += flatCoin(cx, cy, rx, ry, h, topB && i === n - 1);
    }
    return s;
  };

  // 斜靠在那摞上的一枚：向后仰一点、转一点，看得到底部的厚度和压边纹
  const leaningCoin = (cx, cy, R, tilt, squash, vx, vy) => {
    const L = Math.hypot(vx, vy), nx = -vy / L, ny = vx / L;
    const hull = [[nx * R, ny * R], [-nx * R, -ny * R], [vx - nx * R, vy - ny * R], [vx + nx * R, vy + ny * R]];
    const base = Math.atan2(vy, vx);
    const reeds = Array.from({ length: 34 }, (_, i) => {
      const a = base - Math.PI / 2 + Math.PI * (i + 0.5) / 34;
      return `M${f(Math.cos(a) * R)} ${f(Math.sin(a) * R)}l${f(vx)} ${f(vy)}`;
    }).join('');
    return `<g transform="translate(${cx} ${cy}) rotate(${tilt}) scale(1 ${squash})">` +
      `<circle cx="${vx}" cy="${vy}" r="${R}" fill="#4A2A05"/>` +
      `<path d="M${hull.map((p) => f(p[0]) + ' ' + f(p[1])).join('L')}Z" fill="url(#edge)"/>` +
      `<path d="${reeds}" stroke="#2A1602" stroke-width=".3" opacity=".5"/>` +
      coinFace(R, true) + '</g>';
  };
  const ground = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="2.3" fill="#1C0408" opacity=".45" filter="url(#soft)"/>`;

  const RED = ['#DC4A56', '#AE2638', '#6A1629'];
  const NAVY = ['#3045AE', '#192A82', '#0A1349'];
  // 构图占满画布：折线从左缘升到右上角，立币靠左下、三枚一摞靠右下，都落在同一道地面阴影上
  const standing = () => ground(37, 59, 25) +
    stack(48, 49.9, 3, 12.5, 4.6, 4, 5.1, false) +
    `<ellipse cx="28.5" cy="58.8" rx="11" ry="1.7" fill="#1C0408" opacity=".5" filter="url(#tight)"/>` +
    leaningCoin(27, 43.2, 13, -5, 0.96, 1.4, 2.8);

  return [
    {
      id: 'cl-trend-coin', name: '趋势金币 · 一立三摞', badge: 'Claude 画', glow: '#FFD27E', bg: 'url(#bg)', defs: defs(RED),
      story: '一条细折线从左缘升到右上角，五段两次小回落，拐点是空心数据点。右下三枚金币摞着，前面一枚立着，币面是镜面底加磨砂浮雕的 BOKE 胖 B；侧面密压边纹，币与币之间有接触阴影。',
      body: backdrop + trend('#3A0510', RED[1]) + standing(),
    },
    {
      id: 'cl-trend-coin-navy', name: '趋势金币 · 一立三摞 · 藏蓝', glow: '#FFD27E', bg: 'url(#bg)', defs: defs(NAVY),
      story: '和第一个同一幅画，底色换成 dbmanage 顶栏的藏蓝，和其他红色 BOKE 标签更好分开。',
      body: backdrop + trend('#020618', NAVY[1]) + standing(),
    },
    {
      id: 'cl-trend-stack', name: '趋势金币 · 顶面印 B', glow: '#FFD27E', bg: 'url(#bg)', defs: defs(RED),
      story: '只有一摞金币，最上面那枚的币面浮雕 B。金币画得更「抬头」，像从斜上方看下去，B 才不被压得太扁。',
      body: backdrop + trend('#3A0510', RED[1]) + ground(44, 59, 18) + stack(44, 48.5, 3, 15, 7, 4.2, 5.2, true),
    },
  ];
})();
