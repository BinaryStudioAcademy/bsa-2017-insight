
import React from 'react';
import PropTypes from 'prop-types';
import * as parserService from './logic/parserService';

const EmojiRender = (props) => {
  const hendler = props.hendler ? props.hendler : null
  return (
    <div> {
      props.category ? parserService.category(props.category, hendler) : parserService.get(props.text)
    } </div>
  );
};

EmojiRender.propTypes = {
  text: PropTypes.string,
  category: PropTypes.string,
};

export default EmojiRender;
