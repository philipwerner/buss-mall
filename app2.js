'use strict';

function Image(name){
  this.name = name;
  this.source = 'img/' + this.name + '.jpg';
  this.timesShown = 0;
  this.timesClicked = 0;
  Image.all.push(this);
};

Image.totalClicks = 0;
Image.all = [];
Image.allNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var previouslyShown = [];

for(var i = 0; i < Image.allNames.length; i++){
  new Image(Image.allNames[i]);
};

Image.imgEl1 = document.getElementById('image1');
Image.imgEl2 = document.getElementById('image2');
Image.imgEl3 = document.getElementById('image3');
Image.container = document.getElementById('products');

function makeRandomNumber(){
  return Math.floor(Math.random() * Image.all.length);
}

function displayImages(){
  // generate 3 random numbers
  // ensure those numbers are unique
  console.log(previouslyShown, 'previously shown');
  var numbers = [];
  numbers[0] = makeRandomNumber();
  while(numbers[0] === previouslyShown[0] || numbers[0] === previouslyShown[1] || numbers[0] === previouslyShown[2]){
    console.log('after click image 1 duped');
    numbers[0] = makeRandomNumber();
  }
  numbers[1] = makeRandomNumber();
  while(numbers[0] === numbers[1] || numbers[1] === previouslyShown[0] || numbers[1] === previouslyShown[1] || numbers[1] === previouslyShown[2]){
    console.log('image 2 duped');
    numbers[1] = makeRandomNumber();
  }
  numbers[2] = makeRandomNumber();
  while(numbers[2] === numbers[1] || numbers[2] === numbers[0] || numbers[2] === previouslyShown[0] || numbers[2] === previouslyShown[1] || numbers[2] === previouslyShown[2]){
    console.log('image 3 duped');
    numbers[2] = makeRandomNumber();
  }
  Image.imgEl1.src = Image.all[numbers[0]].source;
  Image.imgEl2.src = Image.all[numbers[1]].source;
  Image.imgEl3.src = Image.all[numbers[2]].source;
  Image.imgEl1.alt = Image.all[numbers[0]].name;
  Image.imgEl2.alt = Image.all[numbers[1]].name;
  Image.imgEl3.alt = Image.all[numbers[2]].name;
  Image.all[numbers[0]].timesShown += 1;
  Image.all[numbers[1]].timesShown += 1;
  Image.all[numbers[2]].timesShown += 1;
  console.log(numbers, ' currently showing');
  previouslyShown = numbers;
}

function showList(){
  var ulEl = document.getElementById('list');

  for(var i = 0; i < Image.all.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = Image.all[i].name + ' was shown ' + Image.all[i].timesShown + ' and was clicked ' + Image.all[i].timesClicked + ' times.';
    ulEl.appendChild(liEl);
  }
}

function handleClick(e){
  Image.totalClicks += 1;
  console.log(e.target.alt);
  for(var i = 0; i < Image.all.length; i++){
    if(e.target.alt === Image.all[i].name){
      // tally a click
      Image.all[i].timesClicked += 1;
    }
  }

  console.log(Image.totalClicks);
  if(Image.totalClicks === 2){
    Image.container.removeEventListener('click', handleClick);
    return showList();
  }
  displayImages();
}

displayImages();
Image.container.addEventListener('click', handleClick);
