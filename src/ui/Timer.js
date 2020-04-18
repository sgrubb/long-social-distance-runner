import Phaser from 'phaser';
import moment from 'moment';
  
const formatTime = (time) => {
  const timeMoment = moment(time);
  return `Time: ${timeMoment.format('mm:ss.SSS')}`;
}

export default class Timer extends Phaser.GameObjects.Text {

	constructor(scene, x, y, time, style) {
		super(scene, x, y, formatTime(time), style);

		this.time = time;
	}

	setTime(time) {
		this.time = time;
		this.updateTimeText();
	}

	add(time) {
		this.setTime(this.time + time);
	}

	updateTimeText() {
		this.setText(formatTime(this.time));
  }
}
