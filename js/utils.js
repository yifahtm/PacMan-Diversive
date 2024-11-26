'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // thank you chatgpt for this
  function getRandomSolidColor() {
    // List of solid, vibrant color hex codes
    const solidColors = [
      '#FF0000', 
      '#00FF00', 
      '#0000FF', 
      '#FFFF00', 
      '#FF00FF', 
      '#00FFFF', 
      '#FF9900', 
      '#99CC00', 
      '#3399FF', 
      '#FF66CC', 
    ];
  
    // Randomly select a color
    const index = Math.floor(Math.random() * solidColors.length);
    return solidColors[index];
  }