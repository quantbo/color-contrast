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
  inputs.red.value = color.red;
  inputs.green.value = color.green;
  inputs.blue.value = color.blue;
  inputs.alpha.value = color.alpha;
  control.getElementsByClassName('red')[0].innerHTML = color.red;
  control.getElementsByClassName('green')[0].innerHTML = color.green;
  control.getElementsByClassName('blue')[0].innerHTML = color.blue;
  control.getElementsByClassName('alpha')[0].innerHTML = color.alpha;
}
init_control(square_control, color.square);
init_control(frame_control, color.frame);

//Update color when slider is moved.
function update(event) {
  var parent = event.target.parentNode;
  var name = event.target.name;
  var value = event.target.value;
  //Change the color.
  if (parent.id == 'frame_control') {
    color.frame[name] = value;
    frame.style.fill = rgba(color.frame);      
  } else {
    color.square[name] = value;
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
