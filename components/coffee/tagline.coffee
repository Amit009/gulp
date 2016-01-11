$ = require 'jquery'

do fill = (item = 'Gulp Workflow Management') ->
  $('.tagline h2').append "#{item}"
fill