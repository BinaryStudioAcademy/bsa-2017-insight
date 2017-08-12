
import React from "react";   
import * as setups from "../settings"

const categories = setCategory(setups.categories)

function get(stringToParse){
    let lastChar = stringToParse.length
    let indexes = []
    let itemsToRender = []
    let result  = null
    let regExp = /:\S[^:]+:/g

    while(result = regExp.exec(stringToParse)){
        indexes.push(result.index,regExp.lastIndex)
    }
  
    if(indexes[0] !==0 ){
        indexes.unshift(0)
    }

    if(indexes[indexes.length-1] !== lastChar){
        indexes.push(lastChar)
    }
        
    indexes.reduce((prev,curr)=>{
        itemsToRender.push(stringToParse.slice(prev,curr)) 
        return prev = curr
    })  
        
    let newItemsToRender = itemsToRender.map((e)=>{
        let search = e.trim()  
        let firstCond  = /:\S[^:]+:/g.test(search)
        let secondCond  =  setups.map[search] ? setups.map[search]["status"] : false

        if(firstCond  && !secondCond ){
             return  trim(search) 
        } else return  search
            
    })
     
        return getParseString(newItemsToRender)
    }

    function category(category){
        category = category.toLowerCase()
        let categoryExist = categories[category] ? categories[category] : false
        return categoryExist ? getParseString(categoryExist) : getParseString(Object.keys(setups.map))
    }

    function setCategory(arr){
        const cat = {}
        arr.forEach(function(category) {
            cat[category] = Object.keys(setups.map).filter((e)=>{
                  return  setups.map[e]["category"] === category
                })
        });
           
        return cat
    }

    function trim(string){
        let stringToTrim = string
        let lastIndex = stringToTrim.lastIndexOf(":")
        return stringToTrim.slice(1,lastIndex)
    }

    function getStyles(emojiName){
        const emoji = trim(emojiName)
        const styles = Object.assign({},setups.styles)
        styles.backgroundImage = `url(${setups.link}${emoji}.png)`
        return styles
     }

    function  getParseString(res){
       
        return  res.map((e)=>{
          
            if(/:\S[^:]+:/.test(e) || /:\S+:/.test(e)){
                       
                let key = (Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)).slice(0,24) 
               
                return <span 
                key={`${trim(e)}${key}`}
                style={getStyles(e)}></span>
                
            }

            return  e

         })
       
     }

    

export {get,category}