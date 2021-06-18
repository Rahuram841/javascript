// **** Select Items
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submitBtn");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clearBtn");
const container = document.querySelector(".grocery-container")

//edit
let editElement;
let editFlag = false;
let editId = "";

//submit form
form.addEventListener('submit',addItem);
clearBtn.addEventListener('click',clearItems);
window.addEventListener("DOMContentLoaded", setupItems);

//Function
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    
    const id = new Date().getTime().toString();
    if(value !=='' && editFlag === false)
    {
        const element = document.createElement("article");
        element.classList.add("grocery-item");
        //add id
        const attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        element.innerHTML =`
        <p class ="title">${value}</p>
        <div class = "btn-container">
         <button type = "button" class="edit-btn">
           <i class="fas fa-edit"></i>
         </button>
         <button type = "button" class="delete-btn">
           <i class="fas fa-trash"></i>
         </button>
        </div>
      `
        const deleteBtn = element.querySelector(".delete-btn");
        const editBtn = element.querySelector(".edit-btn");
        deleteBtn.addEventListener("click",deleteItem);
        editBtn.addEventListener("click",editItem);
        

      list.appendChild(element);
      displayAlert("Item added to the list",'success');
      container.classList.add("show-container");
      //add to local 
      addToLocalStorage(id,value);
      setBackToDefault();
    }
    else if(value !=='' && editFlag === true)
    {
      editElement.innerHTML = value ;
      displayAlert("Value changed","success");
      editLocalStorage(editId,value);
      setBackToDefault();
    }
    else
    {
        displayAlert("Please enter value","danger");
    }



}
//display text
function displayAlert(text,action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(function (){
        alert.textContent = '';
        alert.classList.add(`alert-${action}`);
    },1000);
}

//delete item
function deleteItem(e)
{
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id ;
  list.removeChild(element);
  if(list.children.length === 0)
  {
    container.classList.remove("show-container");
  }
  displayAlert("Item removed","danger");
  setBackToDefault();
  removeFromLocalStorage(id);




}
function editItem(e)
{
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitBtn.textContent = "edit";

}
//set back to default
function setBackToDefault()
{
  grocery.value = '';
  editFlag = false ;
  editId = '';
  submitBtn.textContent = "submit";
}
//clear items
function clearItems(){
  const items = document.querySelectorAll('.grocery-item');

  if(items.length>0)
  {
    items.forEach(function(item){
      list.removeChild(item);
    })
  }
  container.classList.remove("show-container");
  displayAlert("empty list","danger");
  setBackToDefault();
  localStorage.removeItem('list');
}
//**********LOCAL STORAGE ********/
function addToLocalStorage(id,value){
  const grocery = {id,value};
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list",JSON.stringify(items));


}
function getLocalStorage(){
  return localStorage.getItem('list')
  ? JSON.parse(localStorage.getItem('list')):[];
}
function removeFromLocalStorage(id){
  let items = getLocalStorage();
  items = items.filter(function(item){
    if(item.id === id){
      return item;
    }

  });
  localStorage.setItem('list',JSON.stringify(items));


}
function editLocalStorage(id,value){
  let items = getLocalStorage();
  items = items.filter(function(item){
    if(item.id === id){
      item.value = value;
    }

  });
  localStorage.setItem('list',JSON.stringify(items));

}
/*localStorage.setItem('rahuram',JSON.stringify(['item','item2']));
const oranges = JSON.parse(localStorage.getItem("rahuram"));
console.log(oranges);
localStorage.removeItem()*/

//set up items
function setupItems(){
  let items = getLocalStorage();
  if(items.length >0){
    items.forEach(function(item){
      createListItem(item.id,itemvalue);
    });
    container.classList.add("show-container");
  }
}

function clearListItem(id,value){
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttribute(attr);
  element.classList.add("grocery-item");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}