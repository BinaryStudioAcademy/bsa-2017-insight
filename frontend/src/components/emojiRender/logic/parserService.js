import React from 'react';
import * as setups from '../settings';

const categories = setCategory(setups.categories);

function get(stringToParse) {
  const lastChar = stringToParse.length;
  const indexes = [];
  const itemsToRender = [];
  let result = null;
  const regExp = /:\S[^:]+:/g;

  while (result = regExp.exec(stringToParse)) {
    indexes.push(result.index,regExp.lastIndex);
  }
  
  if (indexes[0] !== 0) {
    indexes.unshift(0);
  }

  if (indexes[indexes.length - 1] !== lastChar) {
    indexes.push(lastChar);
  }
        
  indexes.reduce((prev, curr) => {
    itemsToRender.push(stringToParse.slice(prev, curr));
    return prev = curr;
  });  

  const newItemsToRender = itemsToRender.map((e) => {
    const search = e.trim()  
    const firstCond = /:\S[^:]+:/g.test(search);
    const secondCond = setups.map[search] ? setups.map[search].status : false;

    if (firstCond && !secondCond) {
      return  trim(search); 
    } 
    return search;
  });

  return getParseString(newItemsToRender);
}

function category(categoryFromComp, hendler) {
  const cat = categoryFromComp.toLowerCase();
  const categoryExist = categories[cat] ? categories[cat] : false;
  return categoryExist ? getParseString(categoryExist, hendler) : getParseString(Object.keys(setups.map), hendler);
}

function setCategory(arr) {
  const localCat = {};
  arr.forEach((cat) => {
    localCat[cat] = Object.keys(setups.map).filter((e) => {
      return setups.map[e].category === cat;
    });
  });
console.log(localCat)
  return localCat;
}

function trim(string) {
  const stringToTrim = string;
  const lastIndex = stringToTrim.lastIndexOf(':');
  return stringToTrim.slice(1, lastIndex);
}

function getStyles(emojiName) {
  const emoji = trim(emojiName);
  const styles = Object.assign({}, setups.styles);
  styles.backgroundImage = `url(${setups.link}${emoji}.png)`;
  return styles;
}

function getParseString(res, hendler) {
  return res.map((e) => {
    if (/:\S[^:]+:/.test(e) || /:\S+:/.test(e)) {
      const key = (Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)).slice(0, 24);
      if (hendler) {
        return <span  onClick={(event) => hendler(event) } role="presentation" data-name={e}  key={`${trim(e)}${key}`} style={getStyles(e)} />
      }
      return <span key={`${trim(e)}${key}`} data-name={e} style={getStyles(e)} />
    }
    return e;
  });
}

export { get, category };
