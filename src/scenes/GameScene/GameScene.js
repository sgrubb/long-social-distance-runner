import Phaser from 'phaser';
import { createPlayer } from './creators';
import { hitRunner } from './events';
import RunnerSpawner from '../../spawners/RunnerSpawner';
import { DUDE_KEY, GROUND_KEY, RUNNER_KEY } from '../../utilities/Keys';
import { VIEW_DIMENSIONS } from '../../utilities/View';
import { RUNNER_SPAWN_INTERVAL } from '../../utilities/Time';
import { SPRITE_VELOCITY } from '../../utilities/Physics';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('game-scene');

		this.player = undefined;
		this.runnerSpawner = undefined;

		this.gameOver = false;
	}

	preload() {
		this.load.image(GROUND_KEY, 'assets/ground.png');
		this.load.image(DUDE_KEY, 'assets/dude.png');
		this.load.image(RUNNER_KEY, 'assets/runner.png');
	}

	create() {
		this.add.image(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, GROUND_KEY);

		this.player = createPlayer(this);
		this.runnerSpawner = new RunnerSpawner(this, RUNNER_KEY);
		const runnersGroup = this.runnerSpawner.group;

		this.physics.add.collider(this.player, runnersGroup, hitRunner(this), null, this);

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		if (this.gameOver) {
			return;
		}

		if (this.time.now % RUNNER_SPAWN_INTERVAL) {
			this.runnerSpawner.spawn();
		}

		if (this.cursors.left.isDown) {
			this.player.setVelocityX(-SPRITE_VELOCITY);
		}
		else if (this.cursors.right.isDown) {
			this.player.setVelocityX(SPRITE_VELOCITY);
		}
		else {
			this.player.setVelocityX(0);
		}

		if (this.cursors.up.isDown) {
			this.player.setVelocityY(-SPRITE_VELOCITY);
		}
		else if (this.cursors.down.isDown) {
			this.player.setVelocityY(SPRITE_VELOCITY);
		}
		else {
			this.player.setVelocityY(0);
		}
	}
}
