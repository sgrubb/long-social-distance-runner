import { DistanceLabel, TimerLabel } from '/ui';
import {
  BLACK,
  DOWN_KEY,
  DOWN_LEFT_KEY,
  DOWN_RIGHT_KEY,
  DUDE_KEY,
  LABEL_FONT_SIZE,
  LABEL_MARGIN,
  LEFT_KEY,
  RIGHT_KEY,
  UP_KEY,
  UP_LEFT_KEY,
  UP_RIGHT_KEY,
  VIEW_DIMENSIONS
} from '/utilities';

export function createPlayer(scene) {
  const player = scene.physics.add.sprite(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, DUDE_KEY);
  player.setCollideWorldBounds(true);

  scene.anims.create({
    key: LEFT_KEY,
    frames: [ { key: DUDE_KEY, frame: 6 } ],
  });
  scene.anims.create({
    key: RIGHT_KEY,
    frames: [ { key: DUDE_KEY, frame: 2 } ],
  });
  scene.anims.create({
    key: UP_KEY,
    frames: [ { key: DUDE_KEY, frame: 0 } ],
  });
  scene.anims.create({
    key: DOWN_KEY,
    frames: [ { key: DUDE_KEY, frame: 4 } ],
  });
  scene.anims.create({
    key: UP_LEFT_KEY,
    frames: [ { key: DUDE_KEY, frame: 7 } ],
  });
  scene.anims.create({
    key: UP_RIGHT_KEY,
    frames: [ { key: DUDE_KEY, frame: 1 } ],
  });
  scene.anims.create({
    key: DOWN_LEFT_KEY,
    frames: [ { key: DUDE_KEY, frame: 5 } ],
  });
  scene.anims.create({
    key: DOWN_RIGHT_KEY,
    frames: [ { key: DUDE_KEY, frame: 3 } ],
  });

  return player;
}

export function createTimerLabel(scene) {
  const x = LABEL_MARGIN;
  const y = LABEL_MARGIN;
  const style = { fontSize: `${LABEL_FONT_SIZE}px`, fill: BLACK.STR };
  const label = new TimerLabel(scene, x, y, 0, style);

  scene.add.existing(label);

  return label;
}

export function createDistanceLabel(scene) {
  const x = LABEL_MARGIN;
  const y = VIEW_DIMENSIONS.HEIGHT - LABEL_MARGIN - LABEL_FONT_SIZE;
  const style = { fontSize: `${LABEL_FONT_SIZE}px`, fill: BLACK.STR };
  const label = new DistanceLabel(scene, x, y, 0, style);

  scene.add.existing(label);

  return label;
}
