import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, DUDE_KEY, GROUND_KEY } from '../Constants';

export default class GameScene extends Phaser.Scene {

	constructor() {
		super('game-scene');

		this.player = undefined;
	}

	preload() {
		this.load.image(GROUND_KEY, 'assets/ground.png');

		this.load.spritesheet(DUDE_KEY, 
			'assets/dude.png',
			{ frameWidth: 25, frameHeight: 30 }
		);
	}

	create() {		
		this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, GROUND_KEY);

		this.player = this.createPlayer();

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		if (this.cursors.left.isDown) {
			this.player.setVelocityX(-160);
			this.player.anims.play('left', true);
		} else if (this.cursors.right.isDown) {
			this.player.setVelocityX(160);
			this.player.anims.play('right', true);
		} else if (this.cursors.up.isDown) {
			this.player.setVelocityY(160);
			this.player.anims.play('up', true);
		} else if (this.cursors.down.isDown) {
			this.player.setVelocityY(160);
			this.player.anims.play('down', true);
		} else {
			this.player.setVelocityX(0);
			this.player.anims.play('turn');
		}

		if (this.cursors.up.isDown && this.player.body.touching.down)
		{
			this.player.setVelocityY(-330);
		}
	}

	createPlayer() {
		const player = this.physics.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, DUDE_KEY);
		player.setBounce(0.2);
		player.setCollideWorldBounds(true);

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'turn',
			frames: [ { key: DUDE_KEY, frame: 4 } ],
			frameRate: 20
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		});

		return player;
	}
}
