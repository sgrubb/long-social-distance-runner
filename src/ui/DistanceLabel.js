import Label from './Label';

const formatDistance = (distance) => `Distance: ${distance}m`;

export default class DistanceLabel extends Label {

  constructor(scene, x, y, distance, style) {
    super(scene, x, y, distance, style, formatDistance);
  }
}
