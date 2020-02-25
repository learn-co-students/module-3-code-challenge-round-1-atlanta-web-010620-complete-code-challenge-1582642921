document.addEventListener('DOMContentLoaded', () => {
  getImage()
})

let imageId = 4636//Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

const imageCon = document.querySelector('#image')

const imageName = document.querySelector('#name')

const likesDisp = document.querySelector('#likes')

const commentForm = document.querySelector('#comment_form')

const commentCont = document.querySelector('#comments')

const likeButton = document.querySelector('#like_button')

function getImage() {
  fetch(imageURL)
  .then((response) => {
    return response.json();
  })
  .then((image) => {
    renderImage(image);
  });
}

function renderImage(image) {
  imageCon.src = image.url
  imageCon.dataset.id = image.id  

  imageName.innerText = image.name 

  likesDisp.innerText = image.like_count

  likeButton.addEventListener('click', function(e){
    addLike(e)
  })

  commentForm.addEventListener('submit', function(e) {
    e.preventDefault()
    makeComment(e)
  })

  image.comments.forEach( function(comment){
    let commentLi = renderComment(comment.content)
    commentLi.dataset.id = comment.id
  })
}

function renderComment(comment) {
  const commentListItem = document.createElement('li')
  commentListItem.innerText = comment

  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'Delete'
  
  deleteButton.addEventListener('click', function(e){
    deleteComment(e)
  })

  commentListItem.appendChild(deleteButton)

  commentCont.appendChild(commentListItem)

  return commentListItem
}

function addLike(e) {
  let likes = parseInt(likesDisp.innerText) + 1
  likesDisp.innerText = likes

  let data = {image_id: imageId}

  let dataObj = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }

  fetch(likeURL, dataObj);
  
}

function makeComment(e) {
  renderComment(e.target.comment.value)
  let content = e.target.comment.value

  e.target.comment.value = ''

  const data = {
    image_id: imageId,
    content: content
  }

  let dataObj = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }

  fetch(commentsURL, dataObj)
  .then((response) => {
    return response.json();
  })
  .then((comment) => {
    commentCont.lastChild.dataset.id = comment.id
  });
}

function deleteComment(e) {
  dataObj = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  const deleteURL = commentsURL + '/' + e.target.parentElement.dataset.id

  fetch(deleteURL, dataObj)
  .then((response) => {
    return response.json();
  })
  .then((comment) => {
    e.target.parentElement.remove()
  })
}