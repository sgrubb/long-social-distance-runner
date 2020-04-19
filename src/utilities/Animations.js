export const LEFT_KEY = 'left';
export const RIGHT_KEY = 'right';
export const DOWN_KEY = 'down';
export const UP_KEY = 'up';
export const UP_LEFT_KEY = 'up-left';
export const UP_RIGHT_KEY = 'up-right';
export const DOWN_LEFT_KEY = 'down-left';
export const DOWN_RIGHT_KEY = 'down-right';

export function getDirectionKeyFromVelocity(velocity) {
  if (velocity.x > 0) {
    return velocity.y > 0 ? DOWN_RIGHT_KEY : (velocity.y < 0 ? UP_RIGHT_KEY : RIGHT_KEY);
  } else if (velocity.x < 0) {
    return velocity.y > 0 ? DOWN_LEFT_KEY : (velocity.y < 0 ? UP_LEFT_KEY : LEFT_KEY);
  } else {
    return velocity.y > 0 ? DOWN_KEY : UP_KEY;
  }
}