import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, DUDE_KEY, GROUND_KEY } from '../Constants';

export default class GameScene extends Phaser.Scene {

	constructor() {
		super('game-scene');

		this.player = undefined;
	}

	preload() {
		this.load.image(GROUND_KEY, 'assets/ground.png');
		this.load.image(DUDE_KEY, 'assets/dude.png');
	}

	create() {		
		this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, GROUND_KEY);

		this.player = this.createPlayer();

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		if (this.cursors.left.isDown) {
			this.player.setVelocityX(-160);
		}
		else if (this.cursors.right.isDown) {
			this.player.setVelocityX(160);
		}
		else {
			this.player.setVelocityX(0);
		}

		if (this.cursors.up.isDown) {
			this.player.setVelocityY(-160);
		}
		else if (this.cursors.down.isDown) {
			this.player.setVelocityY(160);
		}
		else {
			this.player.setVelocityY(0);
		}
	}

	createPlayer() {
		const player = this.physics.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, DUDE_KEY);
		player.setCollideWorldBounds(true);

		return player;
	}
}
