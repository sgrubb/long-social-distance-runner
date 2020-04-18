import { RED } from '../../utilities/Colours';

export function	hitRunner(scene) {
  // eslint-disable-next-line no-unused-vars
  return function(player, runner) {
    scene.physics.pause();

    player.setTint(RED);

    scene.gameOver = true;
  }
}
