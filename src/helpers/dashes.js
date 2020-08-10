/* eslint-disable no-var, vars-on-top */

/**
 * Return a string of dashes.
 * @param  {Number} num
 * @return {String}
 */
export default function dashes(num) {
  var str = '';

  for (var i = 0; i < num; i += 1) {
    str += '-';
  }

  return str;
}
