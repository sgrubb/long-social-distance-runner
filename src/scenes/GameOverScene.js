import Phaser from 'phaser';
import { createDistanceLabel, createTimerLabel } from '/ui';
import {
  GAME_SCENE_KEY,
  GAME_OVER_SCENE_KEY,
  GAMEOVER_KEY,
  LABEL_FONT_SIZE,
  SUBMIT_SCORE_SCENE_KEY,
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
  }

  preload() {
    this.load.image(GAMEOVER_KEY, 'assets/gameover.png');
  }

  create() {
    this.add.image(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, GAMEOVER_KEY);

    this.add.text(
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT / 4,
      'GAME OVER',
      { fontSize: '32px', fill: WHITE.STR }
    )
    .setOrigin(0.5);

    this.add.text(
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.7,
      'press enter to submit your scores',
      { fontSize: '32px', fill: WHITE.STR }
    )
    .setOrigin(0.5);

    this.add.text(
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.8,
      'press space to restart',
      { fontSize: '32px', fill: WHITE.STR }
    )
    .setOrigin(0.5);

    createTimerLabel(
      this,
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.45,
      this.time,
			{ fontSize: `${LABEL_FONT_SIZE}px`, fill: WHITE.STR }
    )
    .setOrigin(0.5);

    createDistanceLabel(
      this,
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.55,
      this.distance,
			{ fontSize: `${LABEL_FONT_SIZE}px`, fill: WHITE.STR }
    )
    .setOrigin(0.5);

    this.keys = this.input.keyboard.addKeys({
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
    });
  }

  update() {
    if (this.keys.space.isDown) {
      this.scene.start(GAME_SCENE_KEY);
      return;
    }

    if (this.keys.enter.isDown) {
      this.scene.start(SUBMIT_SCORE_SCENE_KEY, { time: this.time, distance: this.distance });
      return;
    }
  }
}
