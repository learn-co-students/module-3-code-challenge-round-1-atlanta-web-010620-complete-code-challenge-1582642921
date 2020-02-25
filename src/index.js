// moved these to the global scope so everything can access them 
let imageId = 4637 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`


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
      const newLi = document.createElement('li'); 
      newLi.innerText = comment.content; 
      commentList.appendChild(newLi); 
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
    const commentList = document.querySelector("#comments"); 
    const commentLi = document.createElement('li'); 
    commentLi.innerText = commentBox.value; 
    commentList.appendChild(commentLi); 
    
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
    // clear comment box for next comment 
    commentBox.value = ""
  })
}