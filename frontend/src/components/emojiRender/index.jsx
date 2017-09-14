import React from 'react';
import PropTypes from 'prop-types';
import * as parserService from './logic/parserService';

const EmojiRender = (props) => {
  const handler = props.handler ? props.handler : null;
  return (
    <div> {
      props.category ? parserService.category(props.category, handler) : parserService.get(props.text)
    } </div>
  );
};

EmojiRender.propTypes = {
  text: PropTypes.string,
  category: PropTypes.string,
  handler: PropTypes.func,
};

export default EmojiRender;
