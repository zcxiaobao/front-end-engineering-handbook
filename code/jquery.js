(function (global, factory) {
  "use strict";
  factory(global);
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
  function jQuery() {}
  window.jQuery = window.$ = jQuery;
  return jQuery;
});

console.log(window.$);
