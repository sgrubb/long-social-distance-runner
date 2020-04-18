import { DUDE_KEY } from '../../utilities/Keys';
import { VIEW_DIMENSIONS } from '../../utilities/View';

export function createPlayer(scene) {
  const player = scene.physics.add.sprite(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, DUDE_KEY);
  player.setCollideWorldBounds(true);

  return player;
}
