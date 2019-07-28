// make a to do List
// 1- type inside a form
// 2- click a button
// 3- add items to the
// 4- we want to strike through the taskes
// that are complete want to clear all tasks
// 5- calculate how many tasks are on our to do list


// these elements control the buttons
document.getElementById("addButton").onclick = addToList;
document.getElementById('clearComplete').onclick= clearComplete;
document.getElementById('clearButton').onclick= clearList;

// this count stands for the counters starter point
let count = 0


// let form = document.querySelector("form")
// form.addEventListener('submit', function(e) {
//   let item = document.getElementById("userInput").value;
//
//   console.log("this is the element",document.getElementById("userInput"))
//   // e stands for events// queryselector get first element on html with the paramneer that's passed into
//   e.preventDefault()// keeps you on the same page w/o refreshing
//
//   console.log("this is the item", item)
//   // if (item ==""){
//   //   alert ("please write something.")
//   // }else{
//   //   addToList()
//   //   document.getElementById('userInput').value = ""
//   // }
// })
// this is for the input
function addToList() {
  let item = document.getElementById("userInput").value;
  let ul = document.getElementById('listItems');
  let textNode = document.createTextNode(item)
  let li = document.createElement('li');
    console.log("this is the element",document.getElementById("userInput"))
    console.log("this is the item",item)


// // this is the value for the input. if the string is empty it will alert
// "please write something"
  if (item ==""){
    alert("please write something.")
  }else{
    li.appendChild(textNode);
    // this appendchild tells text to become a child of the ul and add it to the list on the dom
    ul.appendChild(li);
    count++
    document.getElementById('userInput').value = ""
    // document.getElementById("counterItems").innerHTML= count

    // this is the post that send items ti r=the data base
    fetch('todos', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'todo': item,
      })
    })
     .then(response => {
       console.log(response)
       window.location.reload(true)
     })
  }
}
// this is event delegation, targeted all the li's in the ul and if it is clicked on,
// all of things are given the classs name completed and goes away
let ul = document.querySelector("ul")
ul.addEventListener("click", function(e){
  console.log("toggle completed", e.target.innerText)
  if(e.target.tagName === 'LI'){
    e.target.classList.toggle("completed")
    let completedNumber = document.getElementsByClassName("completed").length
     let totalNumber = count - completedNumber
     // document.getElementById("counterItems").innerHTML=totalNumber
    console.log(e.target.classList.contains("completed"));

     fetch('todos', {
       method: 'put',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         'completed': e.target.classList.contains("completed"),
         'todo': e.target.innerText
       })
     })
     .then(response => {
       if (response.ok) return response.json()
     })
     .then(data => {
       console.log(data)
       window.location.reload(true)
     })
  }

})

function clearList(){
//ul.innerHTML=""
//count=0
// document.getElementById("counterItems").innerHTML= count

console.log("completed hit");
fetch('clearAll', {
  method: 'delete',
  headers: {
    'Content-Type': 'application/json'
  },
  // body: JSON.stringify({
  //
  //
  // })
}).then(function (response) {
window.location.reload()
  })
}


  function clearComplete(){
    let completed = ul.querySelectorAll(".completed")
    completed.forEach(function(li){
      // count--
      // ul.removeChild(li)
      // document.getElementById("counterItems").innerHTML= count
      console.log("completed hit");
      fetch('clearCompleted', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "completed": true

        })
      }).then(function (response) {
      window.location.reload()
        })
      });

    }
