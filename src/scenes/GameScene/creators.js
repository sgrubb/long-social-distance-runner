import Timer from '../../ui/Timer';
import { DUDE_KEY } from '../../utilities/Keys';
import { VIEW_DIMENSIONS } from '../../utilities/View';

export function createPlayer(scene) {
  const player = scene.physics.add.sprite(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, DUDE_KEY);
  player.setCollideWorldBounds(true);

  return player;
}

export function createTimer(scene, time) {
  const style = { fontSize: '32px', fill: '#000' };
  const x = 16;
  const y = 16;
  const label = new Timer(scene, x, y, time, style);

  scene.add.existing(label);

  return label;
}
