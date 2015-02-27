define([
  "module",
  "mu-merge/main"
], function (module, merge) {
  return merge.call({
    "attribute": "data-forward"
  }, module.config());
});