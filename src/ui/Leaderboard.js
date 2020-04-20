class Leaderboard {
  constructor(scene, x, y, rowOffset, xOrigin, scores, scoreFormatter, style) {
    scores.forEach((s, i) => {
      scene.add.text(
        x,
        y + i * rowOffset,
        `${i + 1}:\t\t${s.name}\t\t${scoreFormatter(s.score)}`,
        style,
      )
      .setOrigin(xOrigin);      
    });
  }
}

export default function createLeaderboard(scene, x, y, rowOffset, xOrigin, scores, scoreFormatter, style) {
  const leaderboard = new Leaderboard(scene, x, y, rowOffset, xOrigin, scores, scoreFormatter, style);
  return leaderboard;
}
