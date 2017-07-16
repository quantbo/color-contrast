'use strict';
//Adjust the size of the svg element to fit the HTML body.
var width = document.body.offsetWidth;
var height = width / 3;
var svg = document.getElementsByTagName('svg')[0];
svg.setAttribute('width', width);
svg.setAttribute('height', height);

//Initial colors. These can be changed by the user using the color controls.
var color = {
  square: {
    red: 63,
    green: 255,
    blue: 63,
    alpha: 1
  },
  frame: {
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1
  }
};

//A function that produces a string of the form 'rgba(<red>, <green>, <blue>, <alpha>)'.
//Input is an object with properties red, green, blue, alpha.
function rgba(color) {
  return 'rgba(' + color.red + ', ' + color.green + ', ' + color.blue + ', ' + color.alpha + ')';
}

//Initialize colors.
var square = document.getElementById('square');
square.style.fill = rgba(color.square);
var frame = document.getElementById('frame');
frame.style.fill = rgba(color.frame);

//Initialze controls.
var square_control = document.getElementById('square_control');
var frame_control = document.getElementById('frame_control');
function init_control(control, color) {
  var inputs = control.getElementsByTagName('input');
  inputs.ctrlRed.value = color.red;
  inputs.ctrlGreen.value = color.green;
  inputs.ctrlBlue.value = color.blue;
  inputs.ctrlAlpha.value = color.alpha;
  control.getElementsByClassName('ctrlRed')[0].innerHTML = color.red;
  control.getElementsByClassName('ctrlGreen')[0].innerHTML = color.green;
  control.getElementsByClassName('ctrlBlue')[0].innerHTML = color.blue;
  control.getElementsByClassName('ctrlAlpha')[0].innerHTML = color.alpha;
}
init_control(square_control, color.square);
init_control(frame_control, color.frame);

//Map control names to color names.
var mapc = {
  'ctrlRed': 'red',
  'ctrlGreen': 'green',
  'ctrlBlue': 'blue',
  'ctrlAlpha': 'alpha'
}

//Update color when slider is moved.
function update(event) {
  var parent = event.target.parentNode;
  var name = event.target.name;
  var value = event.target.value;
  //Change the color.
  if (parent.id == 'frame_control') {
    color.frame[mapc[name]] = value;
    frame.style.fill = rgba(color.frame);      
  } else {
    color.square[mapc[name]] = value;
    square.style.fill = rgba(color.square);
  }
  //Change the associated label.
  var label = parent.getElementsByClassName(name)[0];
  label.innerHTML = value;
}

//Add event listeners.
function add_event_listeners(control) {
  var inputs = control.getElementsByTagName('input');
  for (var ii = 0; ii < inputs.length; ++ii) {
    inputs[ii].addEventListener('change', update);
  }
}
add_event_listeners(square_control);
add_event_listeners(frame_control);
