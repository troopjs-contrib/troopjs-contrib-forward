define([
  "troopjs-dom/component",
  "./config",
  "jquery",
  "poly/array"
], function (Widget, config, $) {

  var UNDFINED;
  var ARRAY_SLICE = Array.prototype.slice;
  var OBJECT_TOSTRING = Object.prototype.toString;
  var TOSTRING_ARRAY = "[object Array]";
  var TOSTRING_STRING = "[object String]";
  var $ELEMENT = "$element";
  var ATTRIBUTE = config.attribute;
  var SELECTOR = "[" + ATTRIBUTE + "]";

  function forward ($event) {
    var currentTarget = $event.currentTarget;

    this[$ELEMENT]
      .find($(currentTarget).attr(ATTRIBUTE))
      .trigger($.Event($event.type, {
        "relatedTarget": currentTarget
      }), ARRAY_SLICE.call(arguments, 1));

    $event.preventDefault();
  }

  return Widget.extend(function ($element, name, events) {
    var me = this;
    var _events;

    if (events !== UNDFINED) {
      switch(OBJECT_TOSTRING.call(events)) {
        case TOSTRING_STRING:
          _events = [ events ];
          break;

        case TOSTRING_ARRAY:
          _events = events;
          break;

        default:
          throw new Error("Unsupported 'events' type");
      }

      _events.forEach(function (event) {
        me.on("dom/" + event, forward, SELECTOR);
      });
    }
  });
});