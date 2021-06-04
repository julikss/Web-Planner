const elementMatrix = [
  ['bulbul', 'bulbul/bulbul'],
  ['fishcan', 'fish cannibal/fishcan'],
  ['snake', 'snake/snake'],
  ['tetris', 'tetris/tetris'],
  ['forest', 'evil forest/forest'],
];

for (const element of elementMatrix) {
  const id = element[0];
  const pathPart = element[1];
  document.getElementById(id).addEventListener('click', () => {
    location.href = './games/' + pathPart + '.html';
  });
}