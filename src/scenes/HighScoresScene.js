import Phaser from 'phaser';
import {
  HIGH_SCORES_KEY,
  HIGH_SCORES_SCENE_KEY,
  TITLE_SCENE_KEY,
  VIEW_DIMENSIONS,
  WHITE,
} from '/utilities';

export default class HighScoresScene extends Phaser.Scene {
  constructor() {
    super(HIGH_SCORES_SCENE_KEY);
  }

  preload() {
    this.load.image(HIGH_SCORES_KEY, 'assets/highscores.png');
  }

  create() {
    this.add.image(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, HIGH_SCORES_KEY);

    // QQ leaderboard

    this.add.text(
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.8,
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
