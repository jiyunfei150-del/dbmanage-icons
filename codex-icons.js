/* Codex series: bold marine geometry, drawn for favicon scale. */
window.CODEX_ICONS = (() => {
  const red = '#B5293D', ivory = '#FFF6E8', peach = '#FFAD8B', gold = '#F5D19D';
  const compassTicks = Array.from({ length: 24 }, (_, i) => {
    const major = i % 6 === 0;
    return `<path d="M32 13.5V${major ? 17.5 : 15.5}" transform="rotate(${i * 15} 32 33)" stroke="${major ? '#FFE4A0' : '#BDA571'}" stroke-width="${major ? 1.4 : .8}" stroke-linecap="round"/>`;
  }).join('');
  return [
    {
      id: 'cx-query-tide', name: '问潮', badge: 'Codex 首选', glow: peach, bg: red,
      story: '把问号画成一道卷起的浪。只留下一个弯、一颗暖橙色的点，让“提问”成为能记住的轮廓。',
      body: `<path d="M18 25C18 10 46 10 46 26C46 36 32 35 32 43" fill="none" stroke="${ivory}" stroke-width="9" stroke-linecap="round"/><circle cx="32" cy="53" r="4.5" fill="${peach}"/><path d="M12 38Q19 33 25 38" fill="none" stroke="${gold}" stroke-width="5" stroke-linecap="round"/>`,
    },
    {
      id: 'cx-data-ray', name: '数据鳐', badge: '轮廓派', glow: gold, bg: red,
      story: '鳐鱼展开的双翼像两片面积图。中间嵌入一枚向上的三角，尾巴用暖橙色点亮；把海洋生物收敛成一个对称标记。',
      body: `<path d="M32 15C26 24 20 27 8 20C9 36 18 45 29 39L32 47L35 39C46 45 55 36 56 20C44 27 38 24 32 15Z" fill="${ivory}"/><path d="M32 22L26 34H38Z" fill="${gold}"/><path d="M32 44V56" stroke="${peach}" stroke-width="5" stroke-linecap="round"/>`,
    },
    {
      id: 'cx-wave-city', name: '波形城', badge: '平台标识', glow: peach, bg: red,
      story: '三栋楼，也是三根数据柱。用一条宽波浪收住底部，把“波”和“城”压缩成一个标记，去掉窗户和夜景。',
      body: `<path d="M12 42V29H22V39L26 38V20H36V39L40 41V11H51V44C43 48 37 47 30 43C24 39 18 39 12 42Z" fill="${ivory}"/><path d="M40 11H51V44L40 41Z" fill="${peach}"/><path d="M10 50C18 45 25 45 32 49C39 53 46 53 54 48" fill="none" stroke="${gold}" stroke-width="6" stroke-linecap="round"/>`,
    },
    {
      id: 'cx-dive-lens', name: '探数潜镜', glow: gold, bg: red,
      story: '潜入数据之前，先戴好潜镜。两个镜片共享一条横梁，左边看现状，右边看变化；暖橙色呼吸管做识别点。',
      body: `<path d="M49 25V12H56" fill="none" stroke="${peach}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 26H54V40C54 49 35 50 32 40C29 50 10 49 10 40Z" fill="${ivory}"/><rect x="16" y="32" width="11" height="10" rx="3" fill="${red}"/><rect x="37" y="32" width="11" height="10" rx="3" fill="${red}"/><path d="M20 39H23M41 36H44" stroke="${gold}" stroke-width="3" stroke-linecap="round"/>`,
    },
    {
      id: 'cx-answer-beacon', name: '答案航标', glow: peach, bg: red,
      story: '灯塔是一根稳定的数据柱，两侧光束把答案照出来。适合把查询、治理、巡检放在一起的平台。',
      body: `<path d="M32 7L42 18H22Z" fill="${peach}"/><path d="M24 23H40L44 53H20Z" fill="${ivory}"/><path d="M23 34H41M22 44H42" stroke="${red}" stroke-width="5"/><path d="M8 18L18 21L8 25ZM56 18L46 21L56 25Z" fill="${gold}"/>`,
    },
    {
      id: 'cx-data-compass', name: '数据罗盘', glow: peach, bg: ivory,
      story: '用罗盘表达“找到方向”。朱红圆环里只有一根双色指针，重心清楚，浅色标签栏和深色标签栏都能辨认。',
      body: `<circle cx="32" cy="32" r="22" fill="none" stroke="${red}" stroke-width="7"/><path d="M43 18L36 36L21 46L28 28Z" fill="${red}"/><path d="M43 18L36 36L28 28Z" fill="${peach}"/><circle cx="32" cy="32" r="3" fill="${ivory}"/>`,
    },
    {
      id: 'cx-mariner-compass', name: '鎏金航海罗盘', badge: '精致版', glow: '#E7BD6B', bg: '#101A35',
      story: '黄铜表圈、蓝色珐琅盘面、二十四道刻度与红白指针。大图看金属层次，小图留下金环和针尖，与简洁版并排比较。',
      defs: `<linearGradient id="brass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFF0BA"/><stop offset=".24" stop-color="#D4A350"/><stop offset=".49" stop-color="#FFE5A2"/><stop offset=".73" stop-color="#A36C2F"/><stop offset="1" stop-color="#E7BE73"/></linearGradient><radialGradient id="enamel" cx=".35" cy=".3" r=".8"><stop stop-color="#264B6D"/><stop offset=".65" stop-color="#122D4E"/><stop offset="1" stop-color="#0A1933"/></radialGradient><linearGradient id="red-needle" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FF9B82"/><stop offset=".5" stop-color="#F05C53"/><stop offset="1" stop-color="#AE333B"/></linearGradient>`,
      body: `<circle cx="32" cy="5" r="3" fill="none" stroke="url(#brass)" stroke-width="2"/><circle cx="32" cy="34" r="27" fill="#060E22"/><circle cx="32" cy="33" r="26" fill="url(#brass)"/><circle cx="32" cy="33" r="23.5" fill="#57472F"/><circle cx="32" cy="33" r="22.4" fill="url(#enamel)" stroke="#FFDE95" stroke-width=".8"/><circle cx="32" cy="33" r="20.7" fill="none" stroke="#B79B68" stroke-width=".45"/>${compassTicks}<path d="M32 22L34.5 30.5L43 33L34.5 35.5L32 44L29.5 35.5L21 33L29.5 30.5Z" fill="#E2C990" opacity=".65"/><path d="M32 22L34.5 30.5L43 33L34.5 35.5L32 44L29.5 35.5L21 33L29.5 30.5Z" transform="rotate(45 32 33)" fill="#E2C990" opacity=".25"/><g fill="#EBD299" font-family="Georgia,serif" font-size="4.2" text-anchor="middle"><text x="32" y="21">N</text><text x="45" y="34.5">E</text><text x="32" y="49">S</text><text x="19" y="34.5">W</text></g><g transform="rotate(32 32 33)"><path d="M32 12L38 33L32 30L26 33Z" fill="url(#red-needle)"/><path d="M32 12V30L26 33Z" fill="#FFAD8D" opacity=".65"/><path d="M32 54L26 33L32 36L38 33Z" fill="#F8ECD0"/><path d="M32 54V36L38 33Z" fill="#AEBDD0"/></g><circle cx="32" cy="33" r="3.2" fill="url(#brass)" stroke="#75502B" stroke-width=".8"/><circle cx="31.4" cy="32.4" r="1" fill="#FFF6D5"/><path d="M14 17A25 25 0 0 1 46 12" fill="none" stroke="#FFF2C7" stroke-width=".8" opacity=".65"/>`,
    },
    {
      id: 'cx-minted-coins', name: '精铸金币 · 朱红', badge: '精致版',
      story: '三摞金币逐级升高，顶面压铸代表 BOKE 城市的双竖线浮雕 B。边缘有细刻纹，金属高光沿着堆叠起伏；红色底衬托金色，保留清楚的增长轮廓。',
      ...window.mintedCoinIcon('red'),
    },
  ];
})();
