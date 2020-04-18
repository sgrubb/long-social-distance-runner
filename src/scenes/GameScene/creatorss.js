import Timer from '../../ui/Timer';
import { BLACK } from '../../utilities/Colours';
import { DUDE_KEY } from '../../utilities/Keys';
import { VIEW_DIMENSIONS } from '../../utilities/View';
import DistanceLabel from '../../ui/DistanceLabel';

export function createPlayer(scene) {
  const player = scene.physics.add.sprite(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, DUDE_KEY);
  player.setCollideWorldBounds(true);

  return player;
}

export function createTimer(scene, x, y) {
  const style = { fontSize: '32px', fill: BLACK.STR };
  const label = new Timer(scene, x, y, 0, style);

  scene.add.existing(label);

  return label;
}

export function createDistanceLabel(scene, x, y) {
  const style = { fontSize: '32px', fill: BLACK.STR };
  const label = new DistanceLabel(scene, x, y, 0, style);

  scene.add.existing(label);

  return label;
}
