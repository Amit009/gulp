var $, fill;

$ = require('jquery');

(fill = function(item) {
  return $('.tagline h2').append("" + item);
})('Gulp Workflow Management');

fill;
