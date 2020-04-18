import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import { GAME_WIDTH, GAME_HEIGHT } from './Constants';

const config = {
	type: Phaser.AUTO,
	width: GAME_WIDTH,
	height: GAME_HEIGHT,
	physics: {
		default: 'arcade'
	},
	scene: [GameScene]
};

export default new Phaser.Game(config);
