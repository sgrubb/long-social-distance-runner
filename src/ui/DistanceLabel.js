import { METRE } from '/utilities';
import Label from './Label';

const formatDistance = (distance) => `Distance: ${(distance / METRE).toFixed(2)}m`;

class DistanceLabel extends Label {

  constructor(scene, x, y, distance, style) {
    super(scene, x, y, distance, style, formatDistance);
  }
}

export default function createDistanceLabel(scene, x, y, distance, style) {
  const label = new DistanceLabel(scene, x, y, distance, style);
  scene.add.existing(label);
  return label;
}
