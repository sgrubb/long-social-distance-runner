import Phaser from 'phaser';
import GameScene from './scenes/GameScene/GameScene';
import { VIEW_DIMENSIONS } from './utilities/View';

const config = {
	type: Phaser.AUTO,
	width: VIEW_DIMENSIONS.WIDTH,
	height: VIEW_DIMENSIONS.HEIGHT,
	physics: {
		default: 'arcade'
	},
	scene: [GameScene]
};

export default new Phaser.Game(config);
