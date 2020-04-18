import Phaser from 'phaser';

export default class Label extends Phaser.GameObjects.Text {

  constructor(scene, x, y, value, style, formatter) {
    super(scene, x, y, formatter(value), style);

    this.value = value;
    this.formatter = formatter;
  }

  setValue(value) {
    this.value = value;
    this.updateValueText();
  }

  add(x) {
    this.setValue(this.value + x);
  }

  updateValueText() {
    this.setText(this.formatter(this.value));
  }
}
