/* Codex series: bold marine geometry, drawn for favicon scale. */
window.CODEX_ICONS = (() => {
  const navy = '#101C52', ivory = '#FFF5DF', coral = '#FF7868', mint = '#8CE0CF';
  return [
    {
      id: 'cx-query-tide', name: '问潮', badge: 'Codex 首选', glow: coral, bg: navy,
      story: '把问号画成一道卷起的浪。只留下一个弯、一颗珊瑚红的点，让“提问”成为能记住的轮廓。',
      body: `<path d="M18 25C18 10 46 10 46 26C46 36 32 35 32 43" fill="none" stroke="${ivory}" stroke-width="9" stroke-linecap="round"/><circle cx="32" cy="53" r="4.5" fill="${coral}"/><path d="M12 38Q19 33 25 38" fill="none" stroke="${mint}" stroke-width="5" stroke-linecap="round"/>`,
    },
    {
      id: 'cx-data-ray', name: '数据鳐', badge: '轮廓派', glow: mint, bg: navy,
      story: '鳐鱼展开的双翼像两片面积图。中间嵌入一枚向上的三角，尾巴用珊瑚红点亮；把海洋生物收敛成一个对称标记。',
      body: `<path d="M32 15C26 24 20 27 8 20C9 36 18 45 29 39L32 47L35 39C46 45 55 36 56 20C44 27 38 24 32 15Z" fill="${ivory}"/><path d="M32 22L26 34H38Z" fill="${mint}"/><path d="M32 44V56" stroke="${coral}" stroke-width="5" stroke-linecap="round"/>`,
    },
    {
      id: 'cx-wave-city', name: '波形城', badge: '平台标识', glow: coral, bg: navy,
      story: '三栋楼，也是三根数据柱。用一条宽波浪收住底部，把“波”和“城”压缩成一个标记，去掉窗户和夜景。',
      body: `<path d="M12 42V29H22V39L26 38V20H36V39L40 41V11H51V44C43 48 37 47 30 43C24 39 18 39 12 42Z" fill="${ivory}"/><path d="M40 11H51V44L40 41Z" fill="${coral}"/><path d="M10 50C18 45 25 45 32 49C39 53 46 53 54 48" fill="none" stroke="${mint}" stroke-width="6" stroke-linecap="round"/>`,
    },
    {
      id: 'cx-dive-lens', name: '探数潜镜', glow: mint, bg: navy,
      story: '潜入数据之前，先戴好潜镜。两个镜片共享一条横梁，左边看现状，右边看变化；红色呼吸管做识别点。',
      body: `<path d="M49 25V12H56" fill="none" stroke="${coral}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 26H54V40C54 49 35 50 32 40C29 50 10 49 10 40Z" fill="${ivory}"/><rect x="16" y="32" width="11" height="10" rx="3" fill="${navy}"/><rect x="37" y="32" width="11" height="10" rx="3" fill="${navy}"/><path d="M20 39H23M41 36H44" stroke="${mint}" stroke-width="3" stroke-linecap="round"/>`,
    },
    {
      id: 'cx-answer-beacon', name: '答案航标', glow: coral, bg: navy,
      story: '灯塔是一根稳定的数据柱，两侧光束把答案照出来。适合把查询、治理、巡检放在一起的平台。',
      body: `<path d="M32 7L42 18H22Z" fill="${coral}"/><path d="M24 23H40L44 53H20Z" fill="${ivory}"/><path d="M23 34H41M22 44H42" stroke="${navy}" stroke-width="5"/><path d="M8 18L18 21L8 25ZM56 18L46 21L56 25Z" fill="${mint}"/>`,
    },
    {
      id: 'cx-data-compass', name: '数据罗盘', glow: coral, bg: ivory,
      story: '用罗盘表达“找到方向”。深蓝圆环里只有一根双色指针，重心清楚，浅色标签栏和深色标签栏都能辨认。',
      body: `<circle cx="32" cy="32" r="22" fill="none" stroke="${navy}" stroke-width="7"/><path d="M43 18L36 36L21 46L28 28Z" fill="${navy}"/><path d="M43 18L36 36L28 28Z" fill="${coral}"/><circle cx="32" cy="32" r="3" fill="${ivory}"/>`,
    },
  ];
})();
