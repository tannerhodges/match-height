/**
 * Is object empty? Works in IE!
 * @param  {Object}  obj
 * @return {Boolean}
 */
export default function isEmpty(obj) {
  return Object.getOwnPropertyNames(obj).length === 0;
}
