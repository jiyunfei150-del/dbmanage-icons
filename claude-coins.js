/* Claude 画的趋势金币：一条细折线向上，右下一立三摞的金币。
   金币照实物纪念币画：哑光黄铜金色，币面是细颗粒的缎面金属，凸起的外沿、内圈、衬线大 B 和底部 BOKE 字样
   用 SVG 光照滤镜打出浮雕（光从左上），侧面是压边纹，币与币之间有接触阴影。64×64 画布。 */
window.CLAUDE_ICONS = (() => {
  // 纪念币上的衬线 B：粗字干、细衬线、细上下横，两个碗在右侧最粗，下碗比上碗宽；不带竖线，免得像比特币。10×12 的格子
  const BB = 'M0 0H5.6C7.9 0 9 1.25 9 2.95C9 4.35 8 5.25 6.6 5.6C8.6 5.9 10 7.05 10 8.75C10 10.75 8.45 12 5.9 12H0V11.45H1.2V.55H0Z' +
    'M3.4 .55H5.5C6.8 .55 7 1.6 7 2.85C7 4.2 6.5 5.05 5.2 5.05H3.4Z' +
    'M3.4 5.95H5.6C7.3 5.95 7.95 7.1 7.95 8.75C7.95 10.5 7.2 11.45 5.6 11.45H3.4Z';
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
    '<radialGradient id="face" cx=".34" cy=".28" r=".9"><stop offset="0" stop-color="#E2C681"/><stop offset=".5" stop-color="#BC9850"/><stop offset="1" stop-color="#82632A"/></radialGradient>' +
    '<linearGradient id="bright" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="#FCECBC"/><stop offset="1" stop-color="#E6C377"/></linearGradient>' +
    // 小尺寸（标签栏 16/32px）收起细节、换成大号亮 B；大尺寸反过来
    '<style>.small{display:none}@media (max-width:48px){.fine{display:none}.small{display:inline}}</style>' +
    '<linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/><stop offset=".5" stop-color="#FFF8E4" stop-opacity=".22"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>' +
    // 缎面颗粒：分形噪声转成稀疏的暗斑
    '<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="2" seed="7"/>' +
    '<feColorMatrix values="0 0 0 0 .25  0 0 0 0 .18  0 0 0 0 .06  0 0 0 -1.6 1.05"/><feComposite in2="SourceGraphic" operator="in"/></filter>' +
    reliefFilter('relief', 1.5) + reliefFilter('relief-flat', 1.3) +
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
    const s = (R * 0.92) / 12;
    const s2 = (R * 1.12) / 12;
    const relief = '#E8CB87';
    const bAt = (k) => `translate(${f(-5 * k)} ${f(-6 * k)}) scale(${f(k)})`;
    // 底部环形字：四个字母逐个摆在 0.82R 的圆上，每隔 20° 一个（120°→60°，y 向下时 90° 是正下方），
    // 每个字母转到字头朝圆心，弧度才看得出来；单独用错位的暗影和亮边做浮雕，不过模糊滤镜，小字才清楚
    const word = (dx, dy, fill, op) => `<g transform="translate(${dx} ${dy})" font-family="Georgia, 'Times New Roman', serif" font-weight="400" ` +
      `font-size="${f(R * 0.22)}" fill="${fill}" fill-opacity="${op}" text-anchor="middle">` +
      ['B', 'O', 'K', 'E'].map((ch, i) => {
        const deg = 120 - i * 20, rad = (deg * Math.PI) / 180;
        return `<text transform="translate(${f(Math.cos(rad) * R * 0.82)} ${f(Math.sin(rad) * R * 0.82)}) rotate(${deg - 90})">${ch}</text>`;
      }).join('') + '</g>';
    return `<circle r="${R}" fill="#8A6A2C"/>` +
      `<clipPath id="${id}"><circle r="${f(R * 0.985)}"/></clipPath>` +
      `<g clip-path="url(#${id})"><circle r="${R}" fill="url(#face)"/>` +
      `<rect class="fine" x="${-R}" y="${-R}" width="${2 * R}" height="${2 * R}" fill="#000" filter="url(#grain)" opacity=".55"/>` +
      `<rect x="${f(-R * 0.3)}" y="${-R}" width="${f(R * 0.55)}" height="${2 * R}" fill="url(#sheen)" transform="rotate(34)"/></g>` +
      // B 先在币面上投一道柔影，再和外沿、内圈一起过浮雕光照；亮金字配暗一档的币面，反差才够
      `<g class="fine" transform="${bAt(s)}"><use href="#bb" transform="translate(.45 .55)" fill="#2E1F06" opacity=".28" filter="url(#tight)"/></g>` +
      `<g filter="url(${o.flat ? '#relief-flat' : '#relief'})">` +
      `<circle r="${f(R * 0.94)}" fill="none" stroke="${relief}" stroke-width="${f(R * 0.09)}"/>` +
      `<g class="fine"><circle r="${f(R * 0.6)}" fill="none" stroke="${relief}" stroke-width="${f(R * 0.04)}"/>` +
      `<g transform="${bAt(s)}"><use href="#bb" fill="${relief}"/></g>` +
      (o.text ? `<circle cx="${f(-R * 0.76)}" cy="${f(-R * 0.08)}" r="${f(R * 0.035)}" fill="${relief}"/><circle cx="${f(R * 0.76)}" cy="${f(-R * 0.08)}" r="${f(R * 0.035)}" fill="${relief}"/>` +
        `<path d="M0 ${f(-R * 0.79)}l${f(R * 0.035)} ${f(R * 0.07)} ${f(R * 0.075)} 0 -${f(R * 0.06)} ${f(R * 0.045)} ${f(R * 0.025)} ${f(R * 0.075)} -${f(R * 0.075)} -${f(R * 0.045)} -${f(R * 0.075)} ${f(R * 0.045)} ${f(R * 0.025)} -${f(R * 0.075)} -${f(R * 0.06)} -${f(R * 0.045)} ${f(R * 0.075)} 0Z" fill="${relief}"/>` : '') +
      '</g></g>' +
      (o.text ? '<g class="fine">' + word(f(R * 0.02), f(R * 0.025), '#4E3812', 0.75) +
        word(f(-R * 0.014), f(-R * 0.014), '#FFF3CF', 0.9) + word(0, 0, '#EBD08E', 1) + '</g>' +
        // 标签栏尺寸（≤48px）只显示这个：更大、更亮、硬投影的 B，细节全部收起
        `<g class="small" transform="${bAt(s2)}"><use href="#bb" transform="translate(.7 .85)" fill="#2E1F06" opacity=".6"/>` +
        '<use href="#bb" fill="url(#bright)"/></g>' : '');
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
      story: '照实物纪念币画：哑光黄铜金，缎面颗粒，凸起的外沿、内圈、衬线大 B 和底部 BOKE 字样都用光照打出浮雕。一条细折线从左缘升到右上角，右下三枚摞着、前面立一枚。',
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
