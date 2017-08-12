import map from "../map.json"
import React from "react";   

const  link = "https://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/"
const categories = {}



categories.people  = setCategory("people")
categories.nature  = setCategory("nature")
categories.objects = setCategory("objects")             
categories.places  = setCategory("places")
categories.symbols = setCategory("symbols") 


function get(stringToParse){
    let lastChar = stringToParse.length
    let indexes = []
    let itemsToRender = []
    let result  = null
    let regExp = /:\S+[^:]+:/g

    while(result = regExp.exec(stringToParse)){
        indexes.push(result.index,regExp.lastIndex)
    }
  
    if(indexes[0] !==0 ){
        indexes.unshift(0)
    }

    if(indexes[indexes.length-1] !== lastChar){
        indexes.push(lastChar)
    }
        console.log(indexes)
    indexes.reduce((prev,curr)=>{
        itemsToRender.push(stringToParse.slice(prev,curr)) 
        return prev = curr
    })  
        console.log(itemsToRender)
    let newItemsToRender = itemsToRender.map((e)=>{
        let search = e.trim()  
        let firstCond  = /:\S+[^:]+:/g.test(search)
        let secondCond  =  map[search] ? map[search]["status"] : false

        if(firstCond  && !secondCond ){
             return  trim(search) 
        } else return  search
            
    })
        console.log(newItemsToRender)
        return getParseString(newItemsToRender)
    }

    function category(category){
        category = category.toLowerCase()
        let categoryExist = categories[category] ? categories[category] : false
        return categoryExist ? getParseString(categoryExist) : getParseString(Object.keys(map))
    }

    function setCategory(category){
        return  Object.keys(map).filter((e)=>{
                  return  map[e]["category"] === category
                })
    }

    function trim(string){
        let stringToTrim = string
        let lastIndex = stringToTrim.lastIndexOf(":")
        return stringToTrim.slice(1,lastIndex)
    }

    function getStyles(emojiName){
        const emoji = trim(emojiName)
        return {
           marginRight: ".5em",
           marginLeft: ".5em",
           width: "20px",
           height: "20px",
           display: "inline-block",
           backgroundSize: "20px 20px",
           backgroundImage: `url(${link}${emoji}.png)`
        }
    }

    function  getParseString(res){
       
         return  res.map((e)=>{
          
            if(/:\S+[^:]+:/.test(e) || /:\S+:/.test(e)){
                       
                let key = (Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)).slice(0,24) 
               
                return <span 
                key={`${trim(e)}${key}`}
                style={getStyles(e)}></span>
                
            }

            return  e

         })
     }

export {get,category}