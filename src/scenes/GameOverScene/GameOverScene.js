import Phaser from 'phaser';
import { createDistanceLabel, createTimerLabel } from '/ui';
import {
  GAME_SCENE_KEY,
  GAME_OVER_SCENE_KEY,
  GAMEOVER_KEY,
  LABEL_FONT_SIZE,
  VIEW_DIMENSIONS,
  WHITE,
} from '/utilities';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super(GAME_OVER_SCENE_KEY);

    this.time = undefined;
    this.distance = undefined;
  }

  init(data) {
    this.time = data.time;
    this.distance = data.distance;

    console.log(data);
  }

  preload() {
    this.load.image(GAMEOVER_KEY, 'assets/gameover.png');
  }

  create() {
    this.add.image(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, GAMEOVER_KEY);
    const gameover = this.add.text(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 4, 'GAME OVER', { fontSize: '32px', fill: '#fff' });
    const prompt = this.add.text(VIEW_DIMENSIONS.WIDTH / 2, 3 * VIEW_DIMENSIONS.HEIGHT / 4, 'press space to restart', { fontSize: '32px', fill: '#fff' });
    gameover.setOrigin(0.5);
    prompt.setOrigin(0.5);

    const timeLabel = createTimerLabel(
      this,
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.45,
      this.time,
			{ fontSize: `${LABEL_FONT_SIZE}px`, fill: WHITE.STR }
    );
    const distanceLabel = createDistanceLabel(
      this,
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.55,
      this.distance,
			{ fontSize: `${LABEL_FONT_SIZE}px`, fill: WHITE.STR }
    );
    timeLabel.setOrigin(0.5);
    distanceLabel.setOrigin(0.5);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start(GAME_SCENE_KEY)
      return;
    }
  }
}
