// SVG placeholder images for galleries. Replace with real assets later.
window.makePlaceholder = function(label, seed) {
  const palettes = [
    ['#1a1a1a', '#3a3a3a'],
    ['#2a2520', '#4a3f30'],
    ['#1a2332', '#2d3f55'],
    ['#2a1f2a', '#403040'],
    ['#1f2a25', '#324a3d']
  ];
  const p = palettes[Math.abs(seed) % palettes.length];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 260' preserveAspectRatio='xMidYMid slice'>
    <defs>
      <pattern id='s${seed}' width='8' height='8' patternUnits='userSpaceOnUse' patternTransform='rotate(${(seed*23)%180})'>
        <rect width='8' height='8' fill='${p[0]}'/>
        <line x1='0' y1='0' x2='0' y2='8' stroke='${p[1]}' stroke-width='1'/>
      </pattern>
    </defs>
    <rect width='400' height='260' fill='url(#s${seed})'/>
    <rect x='12' y='12' width='160' height='20' fill='rgba(255,255,255,0.08)'/>
    <text x='20' y='27' font-family='ui-monospace, Menlo, monospace' font-size='11' fill='rgba(255,255,255,0.55)'>${label}</text>
    <rect x='12' y='232' width='80' height='16' fill='rgba(255,255,255,0.06)'/>
    <text x='20' y='244' font-family='ui-monospace, monospace' font-size='10' fill='rgba(255,255,255,0.4)'>[image]</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
};
