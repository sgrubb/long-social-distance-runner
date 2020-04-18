import Phaser from 'phaser';
import { RUNNER_MIN_VELOCITY, RUNNER_MAX_VELOCITY } from '../utilities/Physics';
import { VIEW_DIMENSIONS, VIEW_EDGES, getRandomViewEdge } from '../utilities/View';

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
			const x = 0;
			const y = Phaser.Math.Between(0, VIEW_DIMENSIONS.HEIGHT);
			return this.createRunner(x, y);
		} else if (edge === VIEW_EDGES.RIGHT) {
			const x = VIEW_DIMENSIONS.WIDTH;
			const y = Phaser.Math.Between(0, VIEW_DIMENSIONS.HEIGHT);
			return this.createRunner(x, y);
		} else if (edge === VIEW_EDGES.TOP) {
			const x = Phaser.Math.Between(0, VIEW_DIMENSIONS.WIDTH);
			const y = 0;
			return this.createRunner(x, y);
		} else if (edge === VIEW_EDGES.BOTTOM) {
			const x = Phaser.Math.Between(0, VIEW_DIMENSIONS.WIDTH);
			const y = VIEW_DIMENSIONS.HEIGHT;
			return this.createRunner(x, y);
		}
	}

	createRunner(x, y) {
		const runner = this.group.create(x, y, this.key);
		runner.setCollideWorldBounds(false);
		runner.setVelocity(Phaser.Math.Between(RUNNER_MIN_VELOCITY, RUNNER_MAX_VELOCITY));
		return runner;
	}
}