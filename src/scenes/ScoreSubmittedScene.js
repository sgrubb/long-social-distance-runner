import Phaser from 'phaser';
import {
  SCORE_SUBMITTED_KEY,
  SCORE_SUBMITTED_SCENE_KEY,
  TITLE_SCENE_KEY,
  VIEW_DIMENSIONS,
  WHITE,
} from '/utilities';

export default class ScoreSubmittedScene extends Phaser.Scene {
  constructor() {
    super(SCORE_SUBMITTED_SCENE_KEY);
  }

  preload() {
    this.load.image(SCORE_SUBMITTED_KEY, 'assets/scoresubmitted.png');
  }

  create() {
    this.add.image(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, SCORE_SUBMITTED_KEY);

    this.add.text(
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.4,
      'score submitted!',
      { fontSize: '32px', fill: WHITE.STR }
    )
    .setOrigin(0.5);

    this.add.text(
      VIEW_DIMENSIONS.WIDTH / 2,
      3 * VIEW_DIMENSIONS.HEIGHT / 4,
      'press space to go back to the title screen',
      { fontSize: '24px', fill: WHITE.STR }
    )
    .setOrigin(0.5);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start(TITLE_SCENE_KEY)
      return;
    }
  }
}
