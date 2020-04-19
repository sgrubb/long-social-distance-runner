import Phaser from 'phaser';
import { createPlayer, createTimerLabel, createDistanceLabel } from './Creators';
import { hitRunner } from './Events';
import RunnerSpawner from '../../spawners/RunnerSpawner';
import { getDirectionKeyFromVelocity } from '../../utilities/Animations';
import { DUDE_KEY, GROUND_KEY, RUNNER_KEY } from '../../utilities/Images';
import { VIEW_DIMENSIONS } from '../../utilities/View';
import { MILLIS_IN_SEC, RUNNER_SPAWN_INTERVAL_MILLIS } from '../../utilities/Time';
import { SPRITE_VELOCITY } from '../../utilities/Physics';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('game-scene');

    this.player = undefined;
    this.timerLabel = undefined;
    this.distanceLabel = undefined;
		this.runnerSpawner = undefined;

		this.lastUpdateTime = 0;
		this.lastUpdateVelocity = new Phaser.Math.Vector2(0, 0);
		this.lastSpawnTime = 0;
		this.gameOver = false;
	}

	preload() {
		this.load.image(GROUND_KEY, 'assets/ground.png');
		this.load.image(RUNNER_KEY, 'assets/runner.png');

		this.load.spritesheet(DUDE_KEY, 
			'assets/dude.png',
			{ frameWidth: 30, frameHeight: 30 }
		);
	}

	create() {
		this.add.image(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, GROUND_KEY);

		this.player = createPlayer(this);
    this.timerLabel = createTimerLabel(this);
    this.distanceLabel = createDistanceLabel(this);

		this.runnerSpawner = new RunnerSpawner(this, RUNNER_KEY);
		const runnersGroup = this.runnerSpawner.group;

		this.physics.add.collider(this.player, runnersGroup, hitRunner(this), null, this);

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		if (this.gameOver) {
			return;
    }

		this.player.setVelocity(0, 0);

		if (this.cursors.left.isDown) {
			this.player.setVelocityX(this.player.body.velocity.x - SPRITE_VELOCITY);
		}
		if (this.cursors.right.isDown) {
			this.player.setVelocityX(this.player.body.velocity.x + SPRITE_VELOCITY);
		}
		if (this.cursors.up.isDown) {
			this.player.setVelocityY(this.player.body.velocity.y - SPRITE_VELOCITY);
		}
		if (this.cursors.down.isDown) {
			this.player.setVelocityY(this.player.body.velocity.y + SPRITE_VELOCITY);
		}

		const velocity = this.player.body.velocity;
		if (velocity.length() > 0) {
			this.player.anims.play(getDirectionKeyFromVelocity(velocity), true);
		}
		
		const timeNow = this.time.now;
		const updateInterval = timeNow - this.lastUpdateTime;

		this.timerLabel.add(updateInterval);
		this.distanceLabel.add(this.lastUpdateVelocity.length() * updateInterval / MILLIS_IN_SEC);
		
		if ((timeNow - this.lastSpawnTime) > RUNNER_SPAWN_INTERVAL_MILLIS) {
			this.runnerSpawner.spawn();
      this.lastSpawnTime = timeNow;
		}

		this.lastUpdateTime = timeNow;
		this.lastUpdateVelocity = velocity;
	}
}
