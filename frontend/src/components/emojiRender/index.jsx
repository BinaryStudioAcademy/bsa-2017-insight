
import React from "react";
import PropTypes from 'prop-types';
import * as parserService from "./logic/parserService"



let EmojiRender = (props)=>{
  
      return (
           <div> {
             props.category ? parserService.category(props.category) : parserService.get(props.text)
             } </div>
        )
  
}

EmojiRender.propTypes = {
  text: PropTypes.string,
  category:  PropTypes.string
};



export default EmojiRender

