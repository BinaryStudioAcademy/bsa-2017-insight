import React from 'react';
import * as setups from '../settings';

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

function getParseString(res, handler) {
  return res.map((e) => {
    if (/:\S[^:]+:/.test(e) || /:\S+:/.test(e)) {
      const key = (Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)).slice(0, 24);
      if (handler) {
        return <span onClick={event => handler(event)} role="presentation" data-name={e} key={`${trim(e)}${key}`} style={getStyles(e)} />;
      }
      return <span key={`${trim(e)}${key}`} data-name={e} style={getStyles(e)} />;
    }
    return e;
  });
}

function get(stringToParse) {
  const lastChar = stringToParse.length;
  const indexes = [];
  const itemsToRender = [];
  let result = null;
  const regExp = /:\S[^:]+:/g;

  while (result = regExp.exec(stringToParse)) {
    indexes.push(result.index, regExp.lastIndex);
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
    const search = e.trim();
    const firstCond = /:\S[^:]+:/g.test(search);
    const secondCond = setups.map[search] ? setups.map[search].status : false;

    if (firstCond && !secondCond) {
      return trim(search);
    }
    return search;
  });

  return getParseString(newItemsToRender);
}

function setCategory(arr) {
  const localCat = {};
  arr.forEach((cat) => {
    localCat[cat] = Object.keys(setups.map).filter((e) => {
      return setups.map[e].category === cat;
    });
  });
  return localCat;
}

const categories = setCategory(setups.categories);

function category(categoryFromComp, handler) {
  const cat = categoryFromComp.toLowerCase();
  const categoryExist = categories[cat] ? categories[cat] : false;
  return categoryExist ? getParseString(categoryExist, handler) : getParseString(Object.keys(setups.map), handler);
}

export { get, category };
