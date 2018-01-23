'use strict';

// Devlare variables
var voteLimit = 25;
var totalVoteCount = -1;
var photosSeen = 0;
var lastThreeArray = [];
var imgElC1 = document.getElementById('choiceOne');
var imgElC2 = document.getElementById('choiceTwo');
var imgElC3 = document.getElementById('choiceThree');
var liElPhotoSeenDisplay = document.getElementById('photosSeen');
var liElVoteCountDisplay = document.getElementById('voteCount');
var liElVoteLimitDisplay = document.getElementById('voteLimit');
var pElchoiceOneStatsDisplay = document.getElementById('choiceOneStats');
var pElchoiceTwoStatsDisplay = document.getElementById('choiceTwoStats');
var pElchoiceThreeStatsDisplay = document.getElementById('choiceThreeStats');
PhotoChoice.allPhotos = [];

// Create object constructor
function PhotoChoice(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.voteCount = -1;
  this.lastThree = false;
  PhotoChoice.allPhotos.push(this);
}

// Create instances of PhotoChoices
new PhotoChoice('bag', 'img/bag.jpg');
new PhotoChoice('banana', 'img/banana.jpg');
new PhotoChoice('bathroom', 'img/bathroom.jpg');
new PhotoChoice('boots', 'img/boots.jpg');
new PhotoChoice('breakfast', 'img/breakfast.jpg');
new PhotoChoice('bubblegum', 'img/bubblegum.jpg');
new PhotoChoice('chair', 'img/chair.jpg');
new PhotoChoice('cthulhu', 'img/cthulhu.jpg');
new PhotoChoice('dog-duck', 'img/dog-duck.jpg');
new PhotoChoice('dragon', 'img/dragon.jpg');
new PhotoChoice('pen', 'img/pen.jpg');
new PhotoChoice('pet-sweep', 'img/pet-sweep.jpg');
new PhotoChoice('scissors', 'img/scissors.jpg');
new PhotoChoice('shark', 'img/shark.jpg');
new PhotoChoice('sweep', 'img/sweep.png');
new PhotoChoice('tauntaun', 'img/tauntaun.jpg');
new PhotoChoice('unicorn', 'img/unicorn.jpg');
new PhotoChoice('usb', 'img/usb.gif');
new PhotoChoice('water-can', 'img/water-can.jpg');
new PhotoChoice('wine-glass', 'img/wine-glass.jpg');

// Random index generator
function randIndexGen () {
  var saftyLoopBreak = 0;
  // If amung the last three don't display logic
  do {
    var randIndex = Math.floor(Math.random() * PhotoChoice.allPhotos.length);
    saftyLoopBreak++;
  } while (PhotoChoice.allPhotos[randIndex].lastThree === true || saftyLoopBreak >= 100);
  return randIndex;
}

// Render helper function
function displayNextRandPhoto(photoEl) {
  var index = randIndexGen();
  photoEl.alt = PhotoChoice.allPhotos[index].name;
  photoEl.src = PhotoChoice.allPhotos[index].filepath;
  PhotoChoice.allPhotos[index].voteCount ++;
  PhotoChoice.allPhotos[index].lastThree = true;
  lastThreeArray.push(index);
  photosSeen++;
}

// Previous three flag reset function
function flagClear (lastThreeArray) {
  for (var i in PhotoChoice.allPhotos) {
    if (i !== lastThreeArray[0] || lastThreeArray[1] || lastThreeArray[2]) {
      PhotoChoice.allPhotos[i].lastThree = false;
    }
  }
}

// Render function
function updateDisplay () {
  if (totalVoteCount <= voteLimit) {
    lastThreeArray = [];
    displayNextRandPhoto(imgElC1);
    displayNextRandPhoto(imgElC2);
    displayNextRandPhoto(imgElC3);
    totalVoteCount += 1;
    pElchoiceOneStatsDisplay.textContent = PhotoChoice.allPhotos[lastThreeArray[0]].voteCount;
    pElchoiceTwoStatsDisplay.textContent = PhotoChoice.allPhotos[lastThreeArray[1]].voteCount;
    pElchoiceThreeStatsDisplay.textContent = PhotoChoice.allPhotos[lastThreeArray[2]].voteCount;
    liElPhotoSeenDisplay.textContent = photosSeen;
    liElVoteCountDisplay.textContent = totalVoteCount;
    flagClear(lastThreeArray);
  } else {
    imgElC1.removeEventListener('click', updateDisplay);
    imgElC2.removeEventListener('click', updateDisplay);
    imgElC3.removeEventListener('click', updateDisplay);
    alert('You\'re out of votes!');
  }
}

// Event listener for each choice
imgElC1.addEventListener('click', updateDisplay);
imgElC2.addEventListener('click', updateDisplay);
imgElC3.addEventListener('click', updateDisplay);

// inital page load
liElVoteCountDisplay.textContent = totalVoteCount;
liElVoteLimitDisplay.textContent = voteLimit;
updateDisplay();