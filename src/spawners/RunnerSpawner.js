import Phaser from 'phaser';
import {
	RUNNER_KEY,
	RUNNER_MAX_VELOCITY,
	RUNNER_MIN_VELOCITY,
	RUNNER_RUN_KEY,
	VIEW_DIMENSIONS,
	VIEW_EDGES,
	getRandomViewEdge,
} from '/utilities';

export default class RunnerSpawner
{
	constructor(scene) {
		this.scene = scene;

		this._group = this.scene.physics.add.group();
		this.createAnimation(scene);
	}

	get group() {
		return this._group;
	}

	createAnimation(scene) {
		scene.anims.create({
			key: RUNNER_RUN_KEY,
			frames: scene.anims.generateFrameNumbers(RUNNER_KEY, { start: 0, end: 7 }),
			frameRate: 10,
			repeat: -1
		});
	}

	spawn() {
		const runner = this.createRunner();
		runner.setAngle(Phaser.Math.RadToDeg(runner.body.velocity.angle()));
		runner.anims.play(RUNNER_RUN_KEY);
	}

	createRunner() {
		const edge = getRandomViewEdge();

		if (edge === VIEW_EDGES.LEFT) {
			return this.createLeftEdgeRunner();
		} else if (edge === VIEW_EDGES.RIGHT) {
			return this.createRightEdgeRunner();
		} else if (edge === VIEW_EDGES.TOP) {
			return this.createTopEdgeRunner();
		} else if (edge === VIEW_EDGES.BOTTOM) {
			return this.createBottomEdgeRunner();
		}
	}

	createTopEdgeRunner() {
		const x = Phaser.Math.Between(0, VIEW_DIMENSIONS.WIDTH);
		const y = 0;
		const runner = this.group.create(x, y, RUNNER_KEY);
		runner.setCollideWorldBounds(false);

		const xVelocity = Phaser.Math.Between(-RUNNER_MAX_VELOCITY, RUNNER_MAX_VELOCITY)
		const yVelocity = Phaser.Math.Between(RUNNER_MIN_VELOCITY, RUNNER_MAX_VELOCITY);
		runner.setVelocity(xVelocity, yVelocity);

		return runner;
	}

	createBottomEdgeRunner() {
		const x = Phaser.Math.Between(0, VIEW_DIMENSIONS.WIDTH);
		const y = VIEW_DIMENSIONS.HEIGHT;
		const runner = this.group.create(x, y, RUNNER_KEY);
		runner.setCollideWorldBounds(false);

		const xVelocity = Phaser.Math.Between(-RUNNER_MAX_VELOCITY, RUNNER_MAX_VELOCITY)
		const yVelocity = -Phaser.Math.Between(RUNNER_MIN_VELOCITY, RUNNER_MAX_VELOCITY);
		runner.setVelocity(xVelocity, yVelocity);

		return runner;
	}

	createLeftEdgeRunner() {
		const x = 0;
		const y = Phaser.Math.Between(0, VIEW_DIMENSIONS.HEIGHT);
		const runner = this.group.create(x, y, RUNNER_KEY);
		runner.setCollideWorldBounds(false);

		const xVelocity = Phaser.Math.Between(RUNNER_MIN_VELOCITY, RUNNER_MAX_VELOCITY)
		const yVelocity = Phaser.Math.Between(-RUNNER_MAX_VELOCITY, RUNNER_MAX_VELOCITY);
		runner.setVelocity(xVelocity, yVelocity);

		return runner;
	}

	createRightEdgeRunner() {
		const x = VIEW_DIMENSIONS.WIDTH;
		const y = Phaser.Math.Between(0, VIEW_DIMENSIONS.HEIGHT);
		const runner = this.group.create(x, y, RUNNER_KEY);
		runner.setCollideWorldBounds(false);

		const xVelocity = -Phaser.Math.Between(RUNNER_MIN_VELOCITY, RUNNER_MAX_VELOCITY)
		const yVelocity = Phaser.Math.Between(-RUNNER_MAX_VELOCITY, RUNNER_MAX_VELOCITY);
		runner.setVelocity(xVelocity, yVelocity);

		return runner;
	}
}