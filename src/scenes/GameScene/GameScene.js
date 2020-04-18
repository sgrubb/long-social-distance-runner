import Phaser from 'phaser';
import { createPlayer, createTimer, createDistanceLabel } from './creators';
import { hitRunner } from './events';
import RunnerSpawner from '../../spawners/RunnerSpawner';
import { DUDE_KEY, GROUND_KEY, RUNNER_KEY } from '../../utilities/Keys';
import { VIEW_DIMENSIONS } from '../../utilities/View';
import { RUNNER_SPAWN_INTERVAL_MILLIS } from '../../utilities/Time';
import { SPRITE_VELOCITY } from '../../utilities/Physics';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('game-scene');

    this.player = undefined;
    this.timer = undefined;
    this.distanceLabel = undefined;
		this.runnerSpawner = undefined;

    this.lastTickTime = 0;
		this.lastSpawnTime = 0;
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
    this.timer = createTimer(this, 16, 16);
    this.distanceLabel = createDistanceLabel(this, 16, 650);

		this.runnerSpawner = new RunnerSpawner(this, RUNNER_KEY);
		const runnersGroup = this.runnerSpawner.group;

		this.physics.add.collider(this.player, runnersGroup, hitRunner(this), null, this);

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		if (this.gameOver) {
			return;
    }

    const timeNow = this.time.now;
    this.timer.add(timeNow - this.lastTickTime);
    this.lastTickTime = timeNow

		if ((timeNow - this.lastSpawnTime) > RUNNER_SPAWN_INTERVAL_MILLIS) {
      this.runnerSpawner.spawn();
      this.lastSpawnTime = timeNow;
		}

		if (this.cursors.left.isDown) {
      this.player.setVelocityX(-SPRITE_VELOCITY);
      this.distanceLabel.add(1);
		}
		else if (this.cursors.right.isDown) {
			this.player.setVelocityX(SPRITE_VELOCITY);
      this.distanceLabel.add(1);
		}
		else {
			this.player.setVelocityX(0);
		}

		if (this.cursors.up.isDown) {
			this.player.setVelocityY(-SPRITE_VELOCITY);
      this.distanceLabel.add(1);
		}
		else if (this.cursors.down.isDown) {
			this.player.setVelocityY(SPRITE_VELOCITY);
      this.distanceLabel.add(1);
		}
		else {
			this.player.setVelocityY(0);
		}
	}
}
