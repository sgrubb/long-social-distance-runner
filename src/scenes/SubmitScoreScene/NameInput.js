import Phaser from 'phaser';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function mod(n, m) {
  return ((n % m) + m) % m;
}

const format = (characters) => characters.join('\t');

class NameInput extends Phaser.GameObjects.Text {
  constructor(scene, x, y, arrowOffset, characters, focusedIndex, style) {
    super(scene, x, y, format(characters), style);

    this.focusedIndex = focusedIndex;
    this.characters = characters;

    this.upArrows = scene.add.text(
      x,
      y - arrowOffset,
      this.getUpArrowsForFocusedIndex(),
      style,
    )
    .setOrigin(0.5);

    this.downArrows = scene.add.text(
      x,
      y + arrowOffset,
      this.getDownArrowsForFocusedIndex(),
      style,
    )
    .setOrigin(0.5);
  }

  getUpArrowsForFocusedIndex() {
    const arrows = [' ', ' ', ' '];
    arrows[this.focusedIndex] = '˄';
    return format(arrows);
  }

  getDownArrowsForFocusedIndex() {
    const arrows = [' ', ' ', ' '];
    arrows[this.focusedIndex] = '˅';
    return format(arrows);
  }

  getFocusedIndex() {
    return this.focusedIndex;
  }

  getName() {
    return this.characters.join('');
  }

  goToNextCharacterAtFocusedIndex() {
    this.updateFocusedCharacter(alphabet[mod(alphabet.indexOf(this.characters[this.focusedIndex]) + 1, alphabet.length)])
  }

  goToPreviousCharacterAtFocusedIndex() {
    this.updateFocusedCharacter(alphabet[mod(alphabet.indexOf(this.characters[this.focusedIndex]) - 1, alphabet.length)])
  }

  updateFocusedCharacter(newChar) {
    this.characters[this.focusedIndex] = newChar;
    this.setText(format(this.characters));
  }

  updateFocusedIndex(index) {
    this.focusedIndex = index;
    this.upArrows.text = this.getUpArrowsForFocusedIndex();
    this.downArrows.text = this.getDownArrowsForFocusedIndex();
  }
}

export default function createNameInput(scene, x, y, arrowOffset, characters, focusedIndex, style) {
  const input = new NameInput(scene, x, y, arrowOffset, characters, focusedIndex, style);
  scene.add.existing(input);
  return input;
}
