let imageId = 4630

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`


document.addEventListener('DOMContentLoaded', (e) => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')


  
  getTheData()

})

function getTheData()
fetch(imageURL)
.then (resp => resp.json())
.then (resp => getImage(resp))

function getImage(object){
  let image = document.querySelector('#image')
  image.src = object.url

  let imgName = document.querySelector('#name')
  imgName.name = object.name

  let likes = document.querySelector('span')
  likes.dataset.id = object.id
  likes.innerText = object.like_count

  let likeButton = document.querySelector('#like_button')
  likeButton.dataset.id = object.id

  let likeInput = document.querySelector('#comment_input')
  likeInput.dataset.id = object.id

  let submitButton = document.querySelector('#submit')

  submitButton.addEventListener('click', function(e){
    let li = document.createElement('li')

    let ul = document.querySelector('#comments')
    
    li.innerText = document.querySelector('#comment_input').value
    ul.appendChild(li)
    let commentData = document.querySelector('#comment_input').value

    let comment = {
      image_id: `${imageId}`, 
      content: commentData}
    addChange(comment)
    // debugger;
  })

  likeButton.addEventListener('click', function(e){
    
      let span = document.querySelector('span');
      let addLikes = parseInt(document.querySelector('span').innerText)
        addLikes++
        span.innerText = addLIKES
      })
    }

    function frontEnd(newLikes){
      fetch('likeURL', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLikes),
      })
      .then((response) => response.json())
      .then((newLikes) => {
      console.log('Success:', newLikes)
      })

    function backEnd(comment){
      fetch('commentsURL', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      })
      .then(response => response.json())
      .then((comment) => {
        console.log('Success:', data)
    })
}