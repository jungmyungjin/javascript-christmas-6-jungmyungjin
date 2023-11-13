/**
 * {target}숫자가 0-9까지의 숫자로만 이루어졌는지 확인
 * @param {*} target
 * @returns {boolean}
 */
export const IsNumber = (target) => {
  return /^[0-9]+$/.test(target);
};

/**
 * {target}숫자가 인자 값의 범위의 숫자인지 확인
 * @param {number} target
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export const IsNumberInRange = (target, min, max) => {
  if (min <= target && target <= max) {
    return true;
  }
  return false;
};
