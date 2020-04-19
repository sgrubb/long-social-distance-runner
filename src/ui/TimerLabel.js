import moment from 'moment';
import Label from './Label';

const formatTime = (time) => {
  const timeMoment = moment(time);
  return `Time: ${timeMoment.format('mm:ss.SSS')}`;
}

export class TimerLabel extends Label {

  constructor(scene, x, y, time, style) {
    super(scene, x, y, time, style, formatTime);
  }
}

export function createTimerLabel(scene, x, y, time, style) {
  const label = new TimerLabel(scene, x, y, time, style);
  scene.add.existing(label);
  return label;
}
