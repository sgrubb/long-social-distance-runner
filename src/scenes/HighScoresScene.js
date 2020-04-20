import Phaser from 'phaser';
import moment from 'moment';
import { createLeaderboard } from '/ui';
import {
  HIGH_SCORES_KEY,
  HIGH_SCORES_SCENE_KEY,
  METRE,
  TITLE_SCENE_KEY,
  VIEW_DIMENSIONS,
  WHITE,
} from '/utilities';

const formatTime = (time) => {
  const timeMoment = moment(time);
  return timeMoment.format('mm:ss.SSS');
};

const formatDistance = (distance) => `${(distance / METRE).toFixed(2).padStart(8, '0')}m`;

const highScoresTime = [
  {
    name: 'AAA',
    score: formatTime(0),
  },
  {
    name: 'BBB',
    score: formatTime(0),
  },
  {
    name: 'CCC',
    score: formatTime(0),
  },
  {
    name: 'DDD',
    score: formatTime(0),
  },
  {
    name: 'EEE',
    score: formatTime(0),
  },
];

const highScoresDistance = [
  {
    name: 'AAA',
    score: formatDistance(0),
  },
  {
    name: 'BBB',
    score: formatDistance(0),
  },
  {
    name: 'CCC',
    score: formatDistance(0),
  },
  {
    name: 'DDD',
    score: formatDistance(0),
  },
  {
    name: 'EEE',
    score: formatDistance(0),
  },
];

export default class HighScoresScene extends Phaser.Scene {
  constructor() {
    super(HIGH_SCORES_SCENE_KEY);
  }

  preload() {
    this.load.image(HIGH_SCORES_KEY, 'assets/highscores.png');
  }

  create() {
    this.add.image(VIEW_DIMENSIONS.WIDTH / 2, VIEW_DIMENSIONS.HEIGHT / 2, HIGH_SCORES_KEY);

    this.add.text(
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.15,
      'high scores',
      { fontSize: '32px', fill: WHITE.STR })
    .setOrigin(0.5);

    this.add.text(
      VIEW_DIMENSIONS.WIDTH * 0.25,
      VIEW_DIMENSIONS.HEIGHT / 4,
      'TIME',
      { fontSize: '32px', fill: WHITE.STR })
    .setOrigin(0.25);

    createLeaderboard(
      this,
      VIEW_DIMENSIONS.WIDTH * 0.15,
      VIEW_DIMENSIONS.HEIGHT / 3,
      VIEW_DIMENSIONS.HEIGHT / 12,
      0.15,
      highScoresTime,
      { fontSize: '24px', fill: WHITE.STR }
    );

    this.add.text(
      VIEW_DIMENSIONS.WIDTH * 0.8,
      VIEW_DIMENSIONS.HEIGHT / 4,
      'DISTANCE',
      { fontSize: '32px', fill: WHITE.STR })
    .setOrigin(0.8);

    createLeaderboard(
      this,
      VIEW_DIMENSIONS.WIDTH * 0.85,
      VIEW_DIMENSIONS.HEIGHT / 3,
      VIEW_DIMENSIONS.HEIGHT / 12,
      0.85,
      highScoresDistance,
      { fontSize: '24px', fill: WHITE.STR }
    );

    this.add.text(
      VIEW_DIMENSIONS.WIDTH / 2,
      VIEW_DIMENSIONS.HEIGHT * 0.8,
      'press space to go back to the title screen',
      { fontSize: '24px', fill: WHITE.STR }
    )
    .setOrigin(0.5);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start(TITLE_SCENE_KEY)
      return;
    }
  }
}
