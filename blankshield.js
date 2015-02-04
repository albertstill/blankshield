;(function(root) {
  'use strict';

  var handler = function(e) {
    var href, usedModifier, child;

    href = e.target.getAttribute('href');
    if (!href) return;

    usedModifier = (e.ctrlKey || e.shiftKey || e.metaKey);
    if (!usedModifier && e.target.getAttribute('target') !== '_blank') {
      return;
    }

    child = window.open(href);
    child.opener = null;

    e.preventDefault();
  };

  var blankshield = function(target) {
    if (typeof target.length === 'undefined') {
      addEvent(target, 'click', handler);
    } else if (typeof target !== 'string' && !(target instanceof String)) {
      for (var i = 0; i < target.length; i++) {
        addEvent(target[i], 'click', handler);
      }
    }
  };

  function addEvent(target, type, listener) {
    if (target.addEventListener) {
      target.addEventListener(type, listener, false);
    } else if (target.attachEvent) {
      target.attachEvent('on' + type, listener);
    } else {
      target['on' + type] = listener;
    }
  }

  /**
   * Export for various environments.
   */

  // Export CommonJS
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = blankshield;
    } else {
      exports.blankshield = blankshield;
    }
  }

  // Register with AMD
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    define('blankshield', [], function() {
      return blankshield;
    });
  }

  // export default blankshield function
  root.blankshield = blankshield;
}(this));
