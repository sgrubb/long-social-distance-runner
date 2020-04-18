import moment from 'moment';
import Label from './Label';

const formatTime = (time) => {
  const timeMoment = moment(time);
  return `Time: ${timeMoment.format('mm:ss.SSS')}`;
}

export default class TimerLabel extends Label {

  constructor(scene, x, y, time, style) {
    super(scene, x, y, time, style, formatTime);
  }
}
