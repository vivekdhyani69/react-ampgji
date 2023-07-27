import {atom} from 'recoil'
import {nanoid} from "nanoid"

export const list = atom({
  key : "list" ,
  default : [
    {text : "Running" , id : nanoid() ,Date :" 24-12-2022",Time : "15:32", isCompleted : false ,isEdit : false},
    {text : "Walking" , id : nanoid() ,Date :" 25-12-2022",Time : "19:32",isCompleted : false ,isEdit : false}
  ]
})