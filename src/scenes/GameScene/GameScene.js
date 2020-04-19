import Phaser from 'phaser';
import { RunnerSpawner } from '/spawners';
import { createDistanceLabel, createTimerLabel } from '/ui';
import {
	BLACK,
	DUDE_KEY,
	GAME_OVER_SCENE_KEY,
	GAME_SCENE_KEY,
	GROUND_KEY,
	LABEL_FONT_SIZE,
	LABEL_MARGIN,
	MILLIS_IN_SEC,
	PLAYER_RUN_KEY,
	RUNNER_KEY,
	RUNNER_SPAWN_INTERVAL_MILLIS,
	SPRITE_VELOCITY,
	PLAYER_STOP_KEY,
	VIEW_DIMENSIONS
} from '/utilities';
import { createPlayer } from './Creators';
import { hitRunner } from './Events';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super(GAME_SCENE_KEY);

		this.resetState();
	}

	resetState() {
		this.player = undefined;
		this.timerLabel = undefined;
		this.distanceLabel = undefined;
		this.runnerSpawner = undefined;

		this.lastUpdateTime = 0;
		this.lastSpawnTime = 0;
		this.gameOver = false;
		this.resetTime = true;

		this.shownTime = 0;
		this.shownDistance = 0;
	}

	preload() {
		this.load.image(GROUND_KEY, 'assets/ground.png');

		this.load.spritesheet(DUDE_KEY,
			'assets/dude.png',
			{ frameWidth: 33, frameHeight: 28 }
		);
		this.load.spritesheet(RUNNER_KEY,
			'assets/runner.png',
			{ frameWidth: 33, frameHeight: 28 }
		);
	}

	create() {
		this.add.image(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, GROUND_KEY);
		
		this.player = createPlayer(this);

		this.runnerSpawner = new RunnerSpawner(this);
		const runnersGroup = this.runnerSpawner.group;

		this.physics.add.collider(this.player, runnersGroup, hitRunner(this), null, this);

		this.timerLabel = createTimerLabel(
			this,
			LABEL_MARGIN,
			LABEL_MARGIN,
			0,
			{ fontSize: `${LABEL_FONT_SIZE}px`, fill: BLACK.STR }
		);
		this.distanceLabel = createDistanceLabel(
			this,
			LABEL_MARGIN,
			VIEW_DIMENSIONS.HEIGHT - LABEL_MARGIN - LABEL_FONT_SIZE,
			0,
			{ fontSize: `${LABEL_FONT_SIZE}px`, fill: BLACK.STR }
		);

		this.cursors = this.input.keyboard.createCursorKeys();
		this.time.start();
	}

	update() {
		if (this.gameOver) {
			const time = this.shownTime;
			const distance = this.shownDistance;

			this.resetState();
			this.resetTime = true;
			this.scene.start( GAME_OVER_SCENE_KEY, { time, distance });
			return;
		}

		if (this.resetTime) {
			// hack
			this.lastUpdateTime = this.time.now;
			this.resetTime = false;
		}

		const currentVelocity = this.player.body.velocity;
		const newVelocity = new Phaser.Math.Vector2(
			(this.cursors.right.isDown ? SPRITE_VELOCITY : 0) - (this.cursors.left.isDown ? SPRITE_VELOCITY : 0),
			(this.cursors.down.isDown ? SPRITE_VELOCITY : 0) - (this.cursors.up.isDown ? SPRITE_VELOCITY : 0));

		this.player.setVelocity(newVelocity.x, newVelocity.y);
		if (newVelocity.length() > 0) {
			this.player.setAngle(Phaser.Math.RadToDeg(newVelocity.angle()));
			this.player.anims.play(PLAYER_RUN_KEY, true);
		} else {
			this.player.anims.play(PLAYER_STOP_KEY, true);
		}

		const timeNow = this.time.now;
		const updateTimeDelta = timeNow - this.lastUpdateTime;
		const updateDistanceDelta = currentVelocity.length() * updateTimeDelta / MILLIS_IN_SEC;

		this.timerLabel.add(updateTimeDelta);
		this.distanceLabel.add(updateDistanceDelta);

		this.shownTime += updateTimeDelta;
		this.shownDistance += updateDistanceDelta;

		if ((timeNow - this.lastSpawnTime) > RUNNER_SPAWN_INTERVAL_MILLIS) {
			this.runnerSpawner.spawn();
			this.lastSpawnTime = timeNow;
		}

		this.lastUpdateTime = timeNow;
	}
}
