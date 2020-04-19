import Label from './Label';
import { METRE } from '/utilities';

const formatDistance = (distance) => `Distance: ${(distance / METRE).toFixed(2)}m`;

export default class DistanceLabel extends Label {

  constructor(scene, x, y, distance, style) {
    super(scene, x, y, distance, style, formatDistance);
  }
}
