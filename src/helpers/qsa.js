/**
 * Query Selector All (returns NodeList as Array).
 * @param  {String}  selector
 * @param  {Element} [context]
 * @return {Array}
 */
export default function qsa(selector, context = document) {
  return Array.prototype.slice.call(context.querySelectorAll(selector));
}
