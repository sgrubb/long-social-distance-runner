import Phaser from 'phaser';
import { GAME_SCENE_KEY, GAME_OVER_SCENE_KEY, GAMEOVER_KEY, VIEW_DIMENSIONS } from '/utilities';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super(GAME_OVER_SCENE_KEY);
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

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.stop().run(GAME_SCENE_KEY);
      return;
    }
  }
}
