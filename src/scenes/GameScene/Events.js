import { RED } from '/utilities';

export function	hitRunner(scene) {
  // eslint-disable-next-line no-unused-vars
  return function(player, runner) {
    scene.physics.pause();

    player.setTint(RED.HEX);

    scene.gameOver = true;
  }
}
