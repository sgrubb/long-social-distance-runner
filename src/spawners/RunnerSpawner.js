import Phaser from 'phaser';
import {
	RUNNER_MAX_VELOCITY,
	RUNNER_MIN_VELOCITY,
	VIEW_DIMENSIONS,
	VIEW_EDGES,
	getRandomViewEdge,
} from '/utilities';

export default class RunnerSpawner
{
	constructor(scene, runnerKey) {
		this.scene = scene;
		this.key = runnerKey;

		this._group = this.scene.physics.add.group();
	}

	get group() {
		return this._group;
	}

	spawn() {
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
		const runner = this.group.create(x, y, this.key);
		runner.setCollideWorldBounds(false);

		const xVelocity = Phaser.Math.Between(-RUNNER_MAX_VELOCITY, RUNNER_MAX_VELOCITY)
		const yVelocity = Phaser.Math.Between(RUNNER_MIN_VELOCITY, RUNNER_MAX_VELOCITY);
		runner.setVelocity(xVelocity, yVelocity);

		return runner;
	}

	createBottomEdgeRunner() {
		const x = Phaser.Math.Between(0, VIEW_DIMENSIONS.WIDTH);
		const y = VIEW_DIMENSIONS.HEIGHT;
		const runner = this.group.create(x, y, this.key);
		runner.setCollideWorldBounds(false);

		const xVelocity = Phaser.Math.Between(-RUNNER_MAX_VELOCITY, RUNNER_MAX_VELOCITY)
		const yVelocity = -Phaser.Math.Between(RUNNER_MIN_VELOCITY, RUNNER_MAX_VELOCITY);
		runner.setVelocity(xVelocity, yVelocity);

		return runner;
	}

	createLeftEdgeRunner() {
		const x = 0;
		const y = Phaser.Math.Between(0, VIEW_DIMENSIONS.HEIGHT);
		const runner = this.group.create(x, y, this.key);
		runner.setCollideWorldBounds(false);

		const xVelocity = Phaser.Math.Between(RUNNER_MIN_VELOCITY, RUNNER_MAX_VELOCITY)
		const yVelocity = Phaser.Math.Between(-RUNNER_MAX_VELOCITY, RUNNER_MAX_VELOCITY);
		runner.setVelocity(xVelocity, yVelocity);

		return runner;
	}

	createRightEdgeRunner() {
		const x = VIEW_DIMENSIONS.WIDTH;
		const y = Phaser.Math.Between(0, VIEW_DIMENSIONS.HEIGHT);
		const runner = this.group.create(x, y, this.key);
		runner.setCollideWorldBounds(false);

		const xVelocity = -Phaser.Math.Between(RUNNER_MIN_VELOCITY, RUNNER_MAX_VELOCITY)
		const yVelocity = Phaser.Math.Between(-RUNNER_MAX_VELOCITY, RUNNER_MAX_VELOCITY);
		runner.setVelocity(xVelocity, yVelocity);

		return runner;
	}
}