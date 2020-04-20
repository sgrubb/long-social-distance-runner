class Leaderboard {
  constructor(scene, x, y, rowOffset, xOrigin, scores, style) {
    scores.forEach((s, i) => {
      scene.add.text(
        x,
        y + i * rowOffset,
        `${i + 1}:\t\t${s.name}\t\t${s.score}`,
        style,
      )
      .setOrigin(xOrigin);      
    });
  }
}

export default function createLeaderboard(scene, x, y, rowOffset, xOrigin, scores, style) {
  const leaderboard = new Leaderboard(scene, x, y, rowOffset, xOrigin, scores, style);
  scene.add.existing(leaderboard);
  return leaderboard;
}
