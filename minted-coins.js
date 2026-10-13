/* One detailed coin drawing for the red and blue editions. */
window.mintedCoinIcon = (theme, layout = 'bars') => {
  const stack = (x, count) => {
    let drawing = '';
    for (let i = 0; i < count; i++) {
      const y = 49 - i * 5.2;
      const edge = [-4.8, -2.4, 0, 2.4, 4.8].map((offset) => {
        const curve = Math.sqrt(1 - (offset / 7.3) ** 2) * 2.7;
        return `<path d="M${x + offset} ${y + curve + .45}v1.65"/>`;
      }).join('');
      drawing += `<path d="M${x - 7.3} ${y}v3.4a7.3 2.7 0 0 0 14.6 0V${y}Z" fill="url(#coin-edge)" stroke="#A36616" stroke-width=".55"/>` +
        `<g stroke="#A96C20" stroke-width=".45" opacity=".7">${edge}</g>` +
        `<path d="M${x - 5.8} ${y + 2.2}v2" stroke="#FFF2AB" stroke-width=".8" stroke-linecap="round" opacity=".75"/>` +
        `<path d="M${x - 7} ${y + 3.4}a7 2.4 0 0 0 14 0" fill="none" stroke="#F9CF68" stroke-width=".55"/>` +
        `<ellipse cx="${x}" cy="${y}" rx="7.3" ry="2.7" fill="url(#coin-face)" stroke="#B27A24" stroke-width=".55"/>` +
        `<ellipse cx="${x}" cy="${y}" rx="5.7" ry="1.65" fill="none" stroke="#FFF3B2" stroke-width=".45" opacity=".8"/>`;
      if (i === count - 1) {
        drawing += `<g transform="translate(${x - 2.7} ${y - 1.55}) scale(.83 .32)"><use href="#coin-b" transform="translate(.18 .6)" fill="#895318" opacity=".85"/><use href="#coin-b" transform="translate(-.13 -.3)" fill="#FFF8D0"/><use href="#coin-b" fill="url(#coin-engraving)" stroke="#B78028" stroke-width=".13"/></g>`;
      }
    }
    return drawing;
  };
  const red = theme === 'red';
  return {
    glow: '#FFD27E', bg: 'url(#minted-bg)',
    defs: `<linearGradient id="minted-bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${red ? '#CF3E4C' : '#273A9A'}"/><stop offset=".58" stop-color="${red ? '#AC2338' : '#192C81'}"/><stop offset="1" stop-color="${red ? '#721B30' : '#111D58'}"/></linearGradient>` +
      '<linearGradient id="coin-edge" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#AE701A"/><stop offset=".19" stop-color="#F7C85C"/><stop offset=".43" stop-color="#E9AD36"/><stop offset=".68" stop-color="#BD8024"/><stop offset=".87" stop-color="#F3C252"/><stop offset="1" stop-color="#9E6213"/></linearGradient>' +
      '<linearGradient id="coin-face" x1="0" y1="0" x2=".3" y2="1"><stop stop-color="#FFF3B3"/><stop offset=".4" stop-color="#FFE18A"/><stop offset="1" stop-color="#E8B446"/></linearGradient>' +
      '<linearGradient id="coin-engraving" x1="0" y1="0" x2=".6" y2="1"><stop stop-color="#FFF0AF"/><stop offset=".4" stop-color="#EAC268"/><stop offset="1" stop-color="#D5A245"/></linearGradient>' +
      '<path id="coin-b" fill-rule="nonzero" d="M.2 1.2H3.2C5.1 1.2 6.1 2 6.1 3.1C6.1 3.9 5.6 4.4 5 4.6C6 4.9 6.5 5.6 6.5 6.4C6.5 7.8 5.3 8.4 3.3 8.4H.2V7.3H1.1V2.3H.2ZM2.5 2.4V4H3.3C4.3 4 4.7 3.7 4.7 3.2C4.7 2.7 4.3 2.4 3.3 2.4ZM2.5 5.2V7.1H3.4C4.5 7.1 5 6.8 5 6.2C5 5.5 4.5 5.2 3.4 5.2ZM1.8 0H2.5V1.2H1.8ZM3.3 0H4V1.35H3.3ZM1.8 8.4H2.5V9.6H1.8ZM3.3 8.3H4V9.6H3.3Z"/>',
    body: layout === 'trend'
      ? '<path d="M10.5 11.5V32H29" fill="none" stroke="#FFF5E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/>' +
        '<path d="M14 26L21 19L27 22L35 12.5M29.5 12.5H35V18" fill="none" stroke="#FFF5E7" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<ellipse cx="46" cy="56" rx="12.7" ry="2.5" fill="#3D1120" opacity=".3"/><g transform="translate(-24.4 -33.2) scale(1.6)">' + stack(44, 3) + '</g>'
      : '<ellipse cx="32" cy="55.8" rx="25" ry="3" fill="#000000" opacity=".2"/><ellipse cx="33" cy="56" rx="20" ry="1.5" fill="#FFCF6D" opacity=".09"/>' +
      stack(15, 2) + stack(32, 4) + stack(49, 7) +
      '<path d="M49 4Q50 8.5 54 9.5Q50 10.5 49 15Q48 10.5 44 9.5Q48 8.5 49 4Z" fill="#FFF7DC"/><circle cx="49" cy="9.5" r="1.05" fill="#FFFFFF"/>' +
      '<path d="M14 3A18 18 0 0 0 3 15" fill="none" stroke="#FFFFFF" stroke-width=".55" opacity=".1"/>',
  };
};
