'use strict';

// Devlare variables
var voteLimit = 25;
var totalVoteCount = 0;
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
var votesPerPhoto = [];
var productNames = [];

// Create object constructor
function PhotoChoice(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.voteCount = 0;
  this.lastThree = false;
  PhotoChoice.allPhotos.push(this);
  productNames.push(this.name);
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
  // PhotoChoice.allPhotos[index].lastThree = true;
  lastThreeArray.push(index);
  photosSeen++;
}

// Previous three flag reset function
function flagClear (lastThreeArray) {
  for (var i in PhotoChoice.allPhotos) {
    if (lastThreeArray.includes(i)) {
      PhotoChoice.allPhotos[i].lastThree = false;
    }
  }
}

// FIll array of votesPerPhoto for JSCHart
function updateVotes () {
  for (var i in PhotoChoice.allPhotos) {
    votesPerPhoto[i] = PhotoChoice.allPhotos[i].voteCount;
  }
}

// Render the chart
function renderChart () {
  var context = document.getElementById('myChart').getContext('2d');
  var chartColors = [
    '#A539CB', '#4717F6',
    '#A539CB', '#4717F6',
    '#A539CB', '#4717F6',
    '#A539CB', '#4717F6',
    '#A539CB', '#4717F6',
    '#A539CB', '#4717F6',
    '#A539CB', '#4717F6',
    '#A539CB', '#4717F6',
    '#A539CB', '#4717F6',
    '#A539CB', '#4717F6'
  ];
  var productChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Votes per Product',
        data: votesPerPhoto,
        backgroundColor: chartColors,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// Render function
function updateDisplay () {
  lastThreeArray = [];
  displayNextRandPhoto(imgElC1);
  displayNextRandPhoto(imgElC2);
  displayNextRandPhoto(imgElC3);
  pElchoiceOneStatsDisplay.textContent = PhotoChoice.allPhotos[lastThreeArray[0]].voteCount;
  pElchoiceTwoStatsDisplay.textContent = PhotoChoice.allPhotos[lastThreeArray[1]].voteCount;
  pElchoiceThreeStatsDisplay.textContent = PhotoChoice.allPhotos[lastThreeArray[2]].voteCount;
  liElPhotoSeenDisplay.textContent = photosSeen;
  liElVoteCountDisplay.textContent = totalVoteCount;
  flagClear(lastThreeArray);
  if (totalVoteCount === voteLimit) {
    updateVotes();
    renderChart();
    imgElC1.removeEventListener('click', clickHandler);
    imgElC2.removeEventListener('click', clickHandler);
    imgElC3.removeEventListener('click', clickHandler);
  }
}

// event handler
function clickHandler (e) {
  totalVoteCount ++;
  for (var i in PhotoChoice.allPhotos) {
    if (e.target.alt === PhotoChoice.allPhotos[i].name) {
      PhotoChoice.allPhotos[i].voteCount++;
    }
  }
  updateDisplay();
}

// Event listener for each choice
imgElC1.addEventListener('click', clickHandler);
imgElC2.addEventListener('click', clickHandler);
imgElC3.addEventListener('click', clickHandler);

// inital page load
liElVoteCountDisplay.textContent = totalVoteCount;
liElVoteLimitDisplay.textContent = voteLimit;
updateDisplay();