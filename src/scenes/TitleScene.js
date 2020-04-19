import Phaser from 'phaser';
import {
  GAME_SCENE_KEY,
  TITLE_KEY,
  TITLE_SCENE_KEY,
  VIEW_DIMENSIONS,
  WHITE,
} from '/utilities';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super(TITLE_SCENE_KEY);

    this.time = undefined;
    this.distance = undefined;
  }

  preload() {
    this.load.image(TITLE_KEY, 'assets/title.png');
  }

  create() {
    this.add.image(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, TITLE_KEY);

    this.add.text(
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.4,
      'long\r\nsocial\r\ndistance\r\nrunner',
      { fontSize: '32px', fill: WHITE.STR }
    )
    .setOrigin(0.5);

    this.add.text(
      VIEW_DIMENSIONS.WIDTH / 2,
      3 * VIEW_DIMENSIONS.HEIGHT / 4,
      'press space to start',
      { fontSize: '32px', fill: WHITE.STR }
    )
    .setOrigin(0.5);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start(GAME_SCENE_KEY)
      return;
    }
  }
}
