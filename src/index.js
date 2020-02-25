document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4638

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage(imageURL);

})

function fetchImage(imageURL) {
  fetch(imageURL)
  .then(res => res.json())
  .then((image) => {
    return displayImage(image);
  });
}

function displayImage(image) {
  const mainContainer = document.querySelector('.container')
  const divImage = document.createElement('div')
  divImage.querySelector('#image_content')
  const img = document.createElement('img')
  img.querySelector('#image')
  img.dataset.imageId = image.id
  img.innerText = image.url
  mainContainer.append
  mainContainer.appendChild(divImage)
  divImage.appendChild(img)
  console.log(img)

  //okay I'm throwing in the towel

}
