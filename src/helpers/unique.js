/* eslint-disable func-names, prefer-arrow-callback */

/**
 * Filter an array to remove duplicate values.
 * @param  {Array} arr
 * @return {void}
 */
export default function unique(arr) {
  return arr.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}
