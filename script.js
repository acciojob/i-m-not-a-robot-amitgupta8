//your JS code here. If required.
const images = document.querySelectorAll('.images img');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const para = document.getElementById('para');

let clickedImages = [];
let identicalImageClass = '';

// Randomly shuffle images
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Reset the state of the game
function reset() {
  clickedImages = [];
  identicalImageClass = '';
  para.textContent = '';
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  shuffleImages();
}

// Shuffle the images and choose a random image to repeat
function shuffleImages() {
  const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
  identicalImageClass = imageClasses[Math.floor(Math.random() * imageClasses.length)];
  const imageUrls = `https://api.unsplash.com/photos/random?count=6&query=nature&client_id=${YOUR_UNSPLASH_API_KEY}`;
  fetch(imageUrls)
    .then(response => response.json())
    .then(data => {
      data.forEach((image, index) => {
        images[index].src = image.urls.small;
        images[index].classList.remove(...imageClasses);
        images[index].classList.add(imageClasses[index]);
        if (imageClasses[index] === identicalImageClass) {
          images[index].addEventListener('click', handleIdenticalImageClick);
        } else {
          images[index].addEventListener('click', handleNonIdenticalImageClick);
        }
      });
    })
    .catch(error => console.log(error));
}

// Handle click event on identical image
function handleIdenticalImageClick(event) {
  const clickedImageClass = event.target.classList[0];
  if (clickedImages.length === 2) {
    return;
  } else if (clickedImages.length === 1 && clickedImages[0] === clickedImageClass) {
    return;
  }
  clickedImages.push(clickedImageClass);
  event.target.style.border = '5px solid
