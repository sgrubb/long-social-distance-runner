import Phaser from 'phaser';
import { createDistanceLabel, createNameInput, createTimerLabel } from '/ui';
import {
  BLACK,
  GAME_SCENE_KEY,
  SUBMIT_SCORE_KEY,
  SCORE_SUBMITTED_SCENE_KEY,
  SUBMIT_SCORE_SCENE_KEY,
  VIEW_DIMENSIONS
} from '/utilities';

export default class SubmitScoreScene extends Phaser.Scene {
  constructor() {
    super(SUBMIT_SCORE_SCENE_KEY);

    this.time = undefined;
    this.distance = undefined;
    this.nameInput = undefined;
  }

  init(data) {
    this.time = data.time;
    this.distance = data.distance;
  }

  preload() {
    this.load.image(SUBMIT_SCORE_KEY, 'assets/submitscore.png');
  }

  create() {
    this.add.image(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, SUBMIT_SCORE_KEY);

    this.add.text(
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.1,
      'submit scores',
      { fontSize: '32px', fill: BLACK.STR }
    )
    .setOrigin(0.5);

    createTimerLabel(
      this,
      VIEW_DIMENSIONS.WIDTH / 4,
      VIEW_DIMENSIONS.HEIGHT * 0.2,
      this.time,
			{ fontSize: '24px', fill: BLACK.STR }
    )
    .setOrigin(0.5);

    createDistanceLabel(
      this,
      3 * VIEW_DIMENSIONS.WIDTH / 4,
      VIEW_DIMENSIONS.HEIGHT * 0.2,
      this.distance,
			{ fontSize: '24px', fill: BLACK.STR }
    )
    .setOrigin(0.5);

    this.add.text(
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.7,
      'use arrow keys to set name',
      { fontSize: '32px', fill: BLACK.STR }
    )
    .setOrigin(0.5);

    this.add.text(
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.8,
      'press enter to submit',
      { fontSize: '32px', fill: BLACK.STR }
    )
    .setOrigin(0.5);

    this.add.text(
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.9,
      'press space to restart',
      { fontSize: '32px', fill: BLACK.STR }
    )
    .setOrigin(0.5);

    this.nameInput = createNameInput(
      this,
      VIEW_DIMENSIONS.WIDTH * 0.5,
      VIEW_DIMENSIONS.HEIGHT * 0.45,
      VIEW_DIMENSIONS.HEIGHT * 0.15,
      ['A', 'A', 'A'],
      0,
      { fontSize: '100px', fill: BLACK.STR }
    )
    .setOrigin(0.5);

    this.keys = this.input.keyboard.addKeys({
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    });
  }

  update() {
    if (this.keys.space.isDown) {
      this.scene.start(GAME_SCENE_KEY);
      return;
    }

    const focusedIndex = this.nameInput.getFocusedIndex();

    if (Phaser.Input.Keyboard.JustDown(this.keys.enter)) {
      console.log(`submit: ${this.nameInput.getName()}, time: ${this.time}, distance: ${this.distance}`);
      // QQ submit
      this.scene.start(SCORE_SUBMITTED_SCENE_KEY);
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
      switch (focusedIndex) {
        case 1:
          this.nameInput.updateFocusedIndex(0);
          break;
        case 2:
          this.nameInput.updateFocusedIndex(1);
          break;
        default:
          break;
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
      switch (focusedIndex) {
        case 0:
          this.nameInput.updateFocusedIndex(1);
          break;
        case 1:
          this.nameInput.updateFocusedIndex(2);
          break;
        default:
          break;
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
      this.nameInput.goToPreviousCharacterAtFocusedIndex();
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
      this.nameInput.goToNextCharacterAtFocusedIndex();
    }
  }
}
