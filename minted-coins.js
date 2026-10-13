/* One detailed coin drawing for the red and blue editions. */
window.mintedCoinIcon = (theme) => {
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
        drawing += `<g transform="translate(${x - 2.24} ${y - 1.4}) scale(.8 .45)"><use href="#coin-b" transform="translate(0 .4)" fill="#FFF5BD"/><use href="#coin-b" fill="url(#coin-engraving)" stroke="#A67523" stroke-width=".12"/></g>`;
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
      '<linearGradient id="coin-engraving" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#96601F"/><stop offset="1" stop-color="#CA9B45"/></linearGradient>' +
      '<path id="coin-b" fill-rule="evenodd" d="M0 0H2.7C4.5 0 5.2 .7 5.2 1.6C5.2 2.4 4.7 2.8 4.2 3C5 3.2 5.6 3.8 5.6 4.5C5.6 5.6 4.7 6.3 2.9 6.3H0ZM1.4 1.2V2.6H2.6C3.5 2.6 3.8 2.4 3.8 1.9C3.8 1.4 3.4 1.2 2.6 1.2ZM1.4 3.7V5.1H2.8C3.8 5.1 4.2 4.9 4.2 4.4C4.2 3.9 3.8 3.7 2.8 3.7Z"/>',
    body: '<ellipse cx="32" cy="55.8" rx="25" ry="3" fill="#000000" opacity=".2"/><ellipse cx="33" cy="56" rx="20" ry="1.5" fill="#FFCF6D" opacity=".09"/>' +
      stack(15, 2) + stack(32, 4) + stack(49, 7) +
      '<path d="M49 4Q50 8.5 54 9.5Q50 10.5 49 15Q48 10.5 44 9.5Q48 8.5 49 4Z" fill="#FFF7DC"/><circle cx="49" cy="9.5" r="1.05" fill="#FFFFFF"/>' +
      '<path d="M14 3A18 18 0 0 0 3 15" fill="none" stroke="#FFFFFF" stroke-width=".55" opacity=".1"/>',
  };
};
