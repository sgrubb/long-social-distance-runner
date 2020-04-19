import Phaser from 'phaser';
import { GameScene, GameOverScene, TitleScene, SubmitScoreScene } from '/scenes';
import { VIEW_DIMENSIONS } from '/utilities';

const config = {
	type: Phaser.AUTO,
	width: VIEW_DIMENSIONS.WIDTH,
	height: VIEW_DIMENSIONS.HEIGHT,
	physics: {
		default: 'arcade'
	},
	scene: [
		TitleScene,
		GameScene,
		GameOverScene,
		SubmitScoreScene
	]
};

export default new Phaser.Game(config);
