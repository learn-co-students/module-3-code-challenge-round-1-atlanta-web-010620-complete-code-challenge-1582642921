let imageId = 4630

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

getData()
  
})

function getData() {
fetch(imageURL)
.then(resp => resp.json()) 
.then(resp => renderInfo(resp))
}

function renderInfo(pic) {
  let image = document.querySelector('#image')
  image.src = pic.url

  let name = document.querySelector('#name')
  name.innerText = pic.name
  getLikes()
}

function getLikesFrontEnd() {
  
  let likes = document.querySelector('#likes')
  let likeButton = document.querySelector('#like_button')
  likeButton.addEventListener('click',function(e) {
    let addLikes = parseInt(likes.innerText)
      addLikes = 0
      addLikes++
      likes.innerText = addLikes
      getLikesBackEnd()
})
}


function getLikesBackEnd(data) {
  fetch(imageURL), {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data),
}
.then((response) => response.json())
.then((data) => {
  console.log('Success:', data);
})
// })
}
// I got stuck right in here trying to get this to work. I wasn't able to look at the MDN docs
// to figure out what i needed to do.
