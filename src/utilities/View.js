import Phaser from 'phaser';

export const VIEW_DIMENSIONS = {
  WIDTH: 700,
  HEIGHT: 700
};

export const VIEW_EDGES = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  TOP: 'TOP',
  BOTTOM: 'BOTTOM'
};

export function getRandomViewEdge() {
  return VIEW_EDGES[Object.keys(VIEW_EDGES)[Phaser.Math.Between(0, 3)]];
}
