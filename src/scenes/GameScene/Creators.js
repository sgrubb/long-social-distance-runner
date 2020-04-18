import TimerLabel from '../../ui/TimerLabel';
import { BLACK } from '../../utilities/Colours';
import { DUDE_KEY } from '../../utilities/Keys';
import { LABEL_FONT_SIZE, LABEL_MARGIN } from '../../utilities/Labels';
import { VIEW_DIMENSIONS } from '../../utilities/View';
import DistanceLabel from '../../ui/DistanceLabel';

export function createPlayer(scene) {
  const player = scene.physics.add.sprite(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, DUDE_KEY);
  player.setCollideWorldBounds(true);

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
