// moved these to the global scope so everything can access them 
let imageId = 4637 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const deleteURL = `https://randopic.herokuapp.com/comments/`


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  
  
  renderImageData(imageURL);  
  increaseLike();
  commentSubmit();
})

//set image 
function renderImageData(url){
  const image = document.querySelector("#image"); 
  const imageName = document.querySelector("#name"); 
  const imageLikes = document.querySelector("#likes"); 
  const commentList = document.querySelector("#comments"); 

  fetch(url)
  .then(resp=>resp.json())
  .then(function(returnedImage){
    image.src = returnedImage.url; 
    imageName.innerText = returnedImage.name; 
    imageLikes.innerText = returnedImage.like_count;
    returnedImage.comments.forEach(function(comment){
      renderComment(comment); 
    })
  })
}

// add like functionality 
function increaseLike(){
  const likeButton = document.querySelector("#like_button"); 
  likeButton.addEventListener('click',function(e){
    // step 2: like feature front end 
    let imageLikes = document.querySelector("#likes");
    let imageLikesCount = parseInt(imageLikes.innerText); 
    imageLikesCount+=1; 
    imageLikes.innerText = imageLikesCount
    
    // step 3: persist likes on backend 
    let objectData = {
      image_id: imageId
    }
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objectData),
    })
    .then((response) => response.json()); 
  })
}

function commentSubmit(){
  // step 4: comment frontend 
  const submitBox = document.querySelector("#comment_form").children[1]; 
  submitBox.addEventListener('click',function(e){
    e.preventDefault(); 
    const commentBox = document.querySelector("#comment_input"); 

    /* the following was commented out to redo comments with pessimistic rendering 
    instead of optimistic. I did this because, even though I could use 
    optimistic rendering by rendering the comment and its delete box to the page, then 
    making the post request, then at the end of that (using a .then) finding the delete
    button and appending the comment's id to that delete key's dataset.id, that would be 
    a lot of useless code. 
    
    I hope what I did works well enough and my implementation passes! 
    */

    // const commentList = document.querySelector("#comments"); 
    // const commentLi = document.createElement('li'); 
    // commentLi.innerText = commentBox.value; 
    // commentList.appendChild(commentLi); 

    // step 5: persist comment 
    let objectData = {
      image_id: imageId,
      content: commentBox.value
    }
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objectData),
    })
    .then((response) => response.json())
    .then(function(comment){
      renderComment(comment); 
    })
    // clear comment box for next comment 
    commentBox.value = ""
  })
}

function renderComment(comment){
  // debugger
  const commentList = document.querySelector("#comments"); 
  const newLi = document.createElement('li'); 
  newLi.innerText = comment.content; 
  const deleteCommentBtn = document.createElement('button'); 
  deleteCommentBtn.innerText = "Delete"; 
  deleteCommentBtn.dataset.id = comment.id;
  deleteCommentBtn.addEventListener('click', function(e){
    // erase from database 
    fetch(`${deleteURL}${parseInt(this.dataset.id)}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(resp => resp.json())
    // verify comment was destroyed
    .then(json=>console.log(json))
    .then(this.parentElement.remove())
  })
  newLi.appendChild(deleteCommentBtn); 
  commentList.appendChild(newLi); 
}