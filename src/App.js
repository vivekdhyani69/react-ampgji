import React from "react";
import "./style.css";
import {nanoid} from 'nanoid'
import {useState ,useEffect} from 'react'
// import {useRecoilState} from 'recoil'
// import {list}  from './Data.js'

export default function App() {
  const list = [
    {text : "Running" , id : nanoid() ,Date :" 24-12-2022",Time : "15:32", isCompleted : false ,isEdit : false},
    {text : "Walking" , id : nanoid() ,Date :" 25-12-2022",Time : "19:32",isCompleted : false ,isEdit : false}
  ]

const [ items , setItems] = useState(list)
console.log(items)
const [ inputValue , setInputValue] = useState('')
const [ inputDate , setInputDate] = useState('')
const [ inputTime , setInputTime] = useState('')
const [ editedValue , setEditedValue] = useState('')
const [ searchValue , setSearchValue] = useState('')




function captureInput(e){
setInputValue(e.target.value)
}
function captureDate(e){
setInputDate(e.target.value)
}
function captureTime(e){
setInputTime(e.target.value)
}

//=====================================ADD TODO ===============================================================
function addTodo(){
  if(inputValue === ''){
    alert("PLEASE INPUT SOME TODO")
  }else{
  setItems([...items,{text : inputValue  , id : nanoid() ,Date : inputDate ,Time : inputTime , isCompleted : false , isEdit : false}])
  setInputValue('')
  setInputDate('')
  setInputTime('')
  }

  //setting item to local storage
  localStorage.setItem("items" ,JSON.stringify(items))
}

//====================================DELETE FUNCT========================
//used slice method to delete items
// function deleteObj(element){
//   let indexNo= items.indexOf(element)
//   console.log(indexNo)
//    const newItemsAfterDelet = items.slice(0,indexNo).concat(items.slice(indexNo + 1))
//    setItems(newItemsAfterDelet)
// }

//filter method delete the item
// function deleteObj(element){
//   const newItemAfterDelete = items.filter(item => item.id !== element.id)
//   setItems(newItemAfterDelete)
// }

//used Splice method and indexOf to delete items 
function deleteObj(element){
  let indexNo= items.indexOf(element)
  console.log(indexNo)
  items.splice(indexNo,1)
  console.log([...items])
   setItems([...items])
   
}
//================COMPLETE FUNCT=======================================
function complete(element){
  let indexNo= items.indexOf(element)
  // console.log(indexNo)
  const newCompletedItem = {text : element.text , id : element.id ,Date : element.Date,Time : element.Time, isCompleted : true , isEdit : element.isEdit}
   items.splice(indexNo,1,newCompletedItem)
  //  console.log(newCompletedItem)
  setItems([...items])
  
}
//=======================FOR STYLIND COMPLETED TASK CSS======================
//for completed task styling CSS
const myNotCompletedTask={
  textDecoration : "none",
  color : "red"
}
const myCompletedTask={
  textDecoration : "line-through",
  color : "green"
}

//===========================COUNTER================================

const filterCount = items.filter(x=>x.isCompleted === false)


//=============================EDITING ONLY STATUS OF EDIT==================

function editItem(element){
  let indexNo= items.indexOf(element)
  // console.log(indexNo)
  const newEditedItem = {text : element.text , id : element.id ,Date : element.Date,Time : element.Time, isCompleted : element.isCompleted , isEdit : true}
  // console.log(newEditedItem)
   items.splice(indexNo,1,newEditedItem)
   setItems([...items])
}
//======================AFTER EDIT PUSHING THAT ELEMENT TO THE LIST===========
 function captureEditedValue(e){
   setEditedValue(e.target.value)
 }
 function addEditedItem(element){
  let indexNo= items.indexOf(element)
  const newEditedUpdatedItem = {text : editedValue , id : nanoid() ,Date : element.Date,Time : element.Time, isCompleted : element.isCompleted , isEdit : false}
  console.log(newEditedUpdatedItem)
  items.splice(indexNo,1,newEditedUpdatedItem)
  setItems([...items])
 }

 //======================SEARCH BAR====================================

function captureSearchValue(e){
setSearchValue(e.target.value)
}
//====================LOCAL STORAGE=========================================

useEffect(()=>{
  if(localStorage.getItem("items")){
    setItems(JSON.parse(localStorage.getItem("items")))
  }
},[]) ;

//=================================================================================================================

  return (
    <div>
      <div>
      <h2>TODO - LIST</h2>
      <input placeholder="SEARCH TODO'S" value={searchValue} onChange={captureSearchValue} />
      </div>
      
      <hr/>
       <h3>Pending List &#x21d2;
         <span>{filterCount.length} </span>
        </h3>
     <input onChange={captureInput} value={inputValue}/>
     <input type="date" onChange={captureDate} value={inputDate} />
     <input type="time" onChange={captureTime} value={inputTime} />
     <button onClick={addTodo}>ADD TODO</button>
     <br/>
     <hr/>
         {
         items.filter(element=>
          element.text.toLowerCase().includes(searchValue.toLowerCase())
          ).map(element =>
            <li key={element.id}>
              {
              element.isEdit ? 
              <> 
              <input onChange={captureEditedValue} value={editedValue} /> 
              <button onClick={()=>addEditedItem(element)}>OK</button>
              </>
              : 
              <>
               <span style={ element.isCompleted ? myCompletedTask : myNotCompletedTask }>
              {element.text }
              </span>
              <button onClick={()=>editItem(element)}>Edit</button>
              </> }
            <span>{element.Date }</span> &nbsp;
            <span>{element.Time }</span> &nbsp;
            <button onClick={()=>deleteObj(element)}>Delete</button>
            <button onClick={()=>complete(element)}>Complete</button>
            </li>)
         }
    </div>
  );
}
