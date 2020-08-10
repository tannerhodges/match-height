// Helpers
import dashes from './helpers/dashes';
import getElementsFromParam from './helpers/getElementsFromParam';
import hasOwnProperty from './helpers/hasOwnProperty';
import isEmpty from './helpers/isEmpty';
import onReady from './helpers/onReady';
import qsa from './helpers/qsa';
import unique from './helpers/unique';

/**
 * Match Height.
 * @class
 */
class MatchHeight {
  /**
   * Init.
   */
  constructor() {
    // Auto-init once the DOM is ready
    onReady(this.reset.bind(this));

    // Then update on every resize
    window.addEventListener('resize', () => this.update());

    // Add an internal counter for manually-added elements
    this.groupCounter = 1;
  }

  /**
   * Find new elements to match. Group them so we know which elements should
   * be matched together.
   * @return {void}
   */
  findElements() {
    this.groups = this.group(qsa('[data-match-height]'));
  }

  /**
   * Group elements by their match height attribute.
   * @param  {Array} elements
   * @return {Object} groups
   */
  group(elements) {
    return elements.reduce((groups, el) => {
      // Get group ID
      let group = el.getAttribute('data-match-height');

      // Does this element belong to a parent group?
      const parent = el.closest('[data-match-height-group]');

      // If so, prefix the group ID with the parent group
      if (parent) {
        // eslint-disable-next-line prefer-template
        group = parent.getAttribute('data-match-height-group') + '-' + group;
      }

      // Add element to existing or new group
      groups[group] = (groups[group] || []).concat(el);

      return groups;
    }, {});
  }

  /**
   * Check whether Match Height is enabled for a group of elements.
   * @param  {Array} group
   * @return {Boolean}
   */
  isEnabled(group) {
    // Only enable groups that exist and have elements
    if (!group || !group[0]) {
      return false;
    }

    // Assume all elements are in the same group
    const firstElement = group[0];

    // 1. ✅ "Enable" Flag
    // Check whether this group has an "enable" config
    const enable = firstElement.closest('[data-match-height-enable]');

    if (enable) {
      // When should we disable this group?
      const media = enable.getAttribute('data-match-height-enable');

      // Allow Boolean values
      if (media === 'true') { return true; }
      if (media === 'false') { return false; }

      // Otherwise, assume value is a media query & check viewport size
      return window.matchMedia(media).matches;
    }

    // 2. 🚫 "Disable" Flag
    // Check whether this group has a "disable" config
    const disable = firstElement.closest('[data-match-height-disable]');

    if (disable) {
      // When should we disable this group?
      const media = disable.getAttribute('data-match-height-disable');

      // Allow Boolean values
      if (media === 'true') { return false; }
      if (media === 'false') { return true; }

      // Otherwise, assume value is a media query & check viewport size
      return !window.matchMedia(media).matches;
    }

    // Enable by default
    return true;
  }

  /**
   * Match height for a group of elements.
   * @param  {Array} elements
   * @return {void}
   */
  match(elements) {
    // Get height of the tallest element
    const maxHeight = elements.reduce((max, el) => {
      // Reset natural height
      el.style.height = '';

      // Return largest size
      return Math.max(max, el.offsetHeight);
    }, 0);

    // Update elements to all use the same height
    elements.forEach((el) => el.style.height = `${maxHeight}px`);
  }

  /**
   * Update heights for all currently tracked elements, or only update a
   * specific group of elements.
   * @param  {String|Element|Array} groupOrElements
   * @return {void}
   */
  update(groupOrElements) {
    const self = this;
    const groups = this.getGroups(groupOrElements);

    // Match elements in each group
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const groupID in groups) {
      const group = groups[groupID];

      if (self.isEnabled(group)) {
        // Match elements in enabled groups
        self.match(group);
      } else {
        // Reset elements in disabled groups
        group.forEach((el) => el.style.height = '');
      }
    }
  }

  /**
   * Reset Match Height. Find any elements with `data-match-height` and
   * start matching them.
   * @return {void}
   */
  reset() {
    this.findElements();
    this.update();
  }

  /**
   * Get new group ID for manually-added elements.
   * @return {String}
   */
  getNewGroupID() {
    // Get ID
    const id = `group-${this.groupCounter}`;

    // Increment counter for next group
    this.groupCounter += 1;

    // Return ID
    return id;
  }

  /**
   * Get the current group ID for an element.
   * @param  {String|Element|Array} elements
   * @return {String}
   */
  getGroupID(elements) {
    elements = getElementsFromParam(elements);

    // Assume all elements are in the same group
    const firstElement = elements.shift();

    // Ignore empty groups
    if (!firstElement) {
      return null;
    }

    // Get group ID from first element's data-match-height attribute
    let id = firstElement.getAttribute('data-match-height');

    // If the element is part of a data-match-height-group, prefix that value to the group ID
    const parent = firstElement.closest('[data-match-height-group]');

    if (parent) {
      id = parent.getAttribute('data-match-height-group') + '-' + id;
    }

    // Return ID
    return id;
  }

  /**
   * Get groups. Optionally, return a specific group based on its
   * group ID, the elements in the group, or a specific element.
   * @param  {String|Element|Array} groupOrElements
   * @return {Object}
   */
  getGroups(groupOrElements) {
    // By default, find all groups
    if (!groupOrElements) {
      return this.groups;
    }

    // Otherwise, search for specific groups
    let groupID;

    if (typeof groupOrElements === 'string' && this.groups[groupOrElements]) {
      // 1. If value is an existing group ID, return that group
      groupID = groupOrElements;
    } else {
      // 2. If we're debugging specific elements, find which group they belong to
      groupOrElements = getElementsFromParam(groupOrElements);
      groupID = this.getGroupID(groupOrElements);
    }

    // If group exists, return it
    if (this.groups[groupID]) {
      return { [groupID]: this.groups[groupID] };
    }

    // Otherwise, fallback to an empty object
    return {};
  }

  /**
   * Get the element controlling whether a group is enabled / disabled.
   * @param  {String|Element|Array} elements
   * @return {Element}
   */
  getControl(elements) {
    elements = getElementsFromParam(elements);

    // Assume all elements are in the same group
    const firstElement = elements.shift();

    // Ignore empty groups
    if (!firstElement) {
      return null;
    }

    // Find the element controlling when this group is enabled / disabled
    const control = firstElement.closest('[data-match-height-enable], [data-match-height-disable]');

    // Return ID
    return control;
  }

  /**
   * Add one or more elements to Match Height. By default, this adds elements
   * to their own, unique group. Otherwise, it adds them to the group you
   * specify.
   * @param  {String|Element|Array} elements
   * @param  {String} groupID (Optional)
   * @return {void}
   */
  add(elements, groupID) {
    elements = getElementsFromParam(elements);

    // If you haven't specified a group ID, assume these
    // elements belong in a new group with a unique ID
    groupID = groupID || this.getNewGroupID();

    // Assign elements to their group
    elements.forEach((el) => el.setAttribute('data-match-height', groupID));

    // Add elements to existing or new groups
    this.groups[groupID] = (this.groups[groupID] || []).concat(elements);

    // Update the group so everything matches
    this.update(groupID);
  }

  /**
   * Remove one or more elements, or a whole group, from Match Height. In
   * other words, "stop matching these." Removes the `data-match-height`
   * attribute and inline `height` style from each element.
   * @param  {String|Element|Array} groupOrElements
   * @param  {String} groupID (Optional)
   * @return {void}
   */
  remove(groupOrElements) {
    // 1. If value is an existing group ID, remove that group
    if (typeof groupOrElements === 'string' && this.groups[groupOrElements]) {
      delete this.groups[groupOrElements];
      return;
    }

    // 2. Otherwise, assume we're removing specific elements
    const self = this;
    const elements = getElementsFromParam(groupOrElements);
    let groupsToUpdate = [];

    elements.forEach((el) => {
      // Get group for this element
      const groupID = self.getGroupID(el);
      // Remove element styles & data attributes
      el.removeAttribute('data-match-height');
      // Remove element from its group (also filter out non-existent elements)
      self.groups[groupID] = self.groups[groupID].filter((elem) => elem && elem !== el);

      if (!self.groups[groupID].length) {
        // Remove empty groups
        delete self.groups[groupID];
        // Remove group from groups to update
        groupsToUpdate = groupsToUpdate.filter((group) => group !== groupID);
      } else {
        // Keep track of groups to update
        groupsToUpdate.push(groupID);
      }
    });

    // Update so remaining groups still match
    unique(groupsToUpdate).forEach((groupID) => self.update(groupID));
  }

  /**
   * `console.log` info about a group of elements. Shows whether a group is
   * enabled, what element is controlling it, and what other elements are in
   * the group.
   * @param  {String|Element|Array} groupOrElements
   * @return {void}
   */
  debug(groupOrElements) {
    const groups = this.getGroups(groupOrElements);

    // Cry if we can't find a matching group to debug
    if (isEmpty(groups)) {
      // eslint-disable-next-line no-console
      console.log(`
😢 Oh no! Match Height couldn't find a matching group for "${groupOrElements}".\n
--------------------------------------------------------------------------------------------
ℹ️ NOTE: Make sure the elements you're trying to debug have a [data-match-height] attribute.
--------------------------------------------------------------------------------------------\n\n`);
      return;
    }

    // Debug specified groups
    // eslint-disable-next-line no-restricted-syntax
    for (const groupID in groups) {
      if (hasOwnProperty(groups, groupID)) {
        const group = groups[groupID];
        const control = this.getControl(group);

        // Questions
        const questions = {};

        // 1. Is it enabled?
        questions.isEnabled = this.isEnabled(group);

        // 2. Why is it enabled or disabled?
        questions.control = control;
        questions.enable = control ? control.getAttribute('data-match-height-enable') : undefined;
        questions.disable = control ? control.getAttribute('data-match-height-disable') : undefined;

        // 3. What other elements does this affect?
        questions.groupID = groupID;
        questions.group = group;

        // Log it to the console!
        /* eslint-disable no-console */
        console.log(`
---------------------------${dashes(groupID.length)}-
🐛 Match Height Debugger: "${groupID}"
---------------------------${dashes(groupID.length)}-

👇 Click into the object below to inspect your elements.\n\n`);
        console.log(questions);
        console.log('\n');
        /* eslint-enable no-console */
      }
    }
  }
}

// Manage everything in a single, shared instance
const shared = new MatchHeight();

// Make it globally accessible
window.MatchHeight = shared;

// If jQuery exists, integrate
if (typeof $ !== 'undefined') {
  // eslint-disable-next-line no-undef, func-names
  $.fn.matchHeight = function () {
    window.MatchHeight.add(this);
  };
}

export default shared;
