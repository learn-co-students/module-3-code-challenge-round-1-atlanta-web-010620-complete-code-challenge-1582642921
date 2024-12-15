document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4638
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  
  fetchImage(imageURL);
  
})


  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
 

const img = document.getElementById('image')
const imgTitle = document.getElementById('name')
const imgLikes = document.getElementById('likes')
const ulList = document.getElementById('comments')
const likeBtn = document.getElementById('like_button')
const form = document.getElementById('comment_form')



function fetchImage(imageURL) {
  fetch(imageURL)
  .then(res => res.json())
  .then(image => renderImage(image))
}

function renderImage(image) {
  
  img.src = image.url
  imgTitle.innerText = image.name
  imgLikes.innerText = image.like_count
  
  likeBtn.addEventListener('click', function() {
      fetchforLikes() 
  })
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = form.querySelector('#comment_input').value

    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: 4638,
        content: input
      })
    }).then(res => res.json())
      .then(comment => {

        handleComments(comment)
        form.reset()

      })

  })
  commentList(image.comments)
}


function fetchforLikes() {
  fetch(likeURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      image_id: 4638
    })
  }).then(res => res.json())
  .then(like => {
    handleLikes()
  }
  )
}

function commentList(comments) {
  comments.forEach(comment => {
    handleComments(comment)
  })
}

function handleComments(comment){
  const newLi = document.createElement('li')
  newLi.innerText = comment.content + " - "
  newLi.dataset.id = comment.id
  const deleteBtn = document.createElement('button')
  deleteBtn.innerText = "✌🏼"
  deleteBtn.addEventListener('click', function(e) {
    const parentLi = e.target.parentElement
    fetch(commentsURL + parentLi.dataset.id, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        parentLi.remove()
      }

    })
  })

  newLi.appendChild(deleteBtn)
  ulList.appendChild(newLi)
}

function handleLikes(){
  let oldLikes = parseInt(imgLikes.innerText) 
  imgLikes.innerText = oldLikes + 1
}
  
  
  