import { DistanceLabel, TimerLabel } from '/ui';
import {
  BLACK,
  DUDE_KEY,
  LABEL_FONT_SIZE,
  LABEL_MARGIN,
  RUN_KEY,
  STOP_KEY,
  VIEW_DIMENSIONS
} from '/utilities';

export function createPlayer(scene) {
  const player = scene.physics.add.sprite(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, DUDE_KEY);
  player.setCollideWorldBounds(true);

  scene.anims.create({
    key: RUN_KEY,
    frames: scene.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  scene.anims.create({
    key: STOP_KEY,
    frames: [ { key: DUDE_KEY, frame: 0 } ],
    frameRate: 20
  })

  return player;
}
