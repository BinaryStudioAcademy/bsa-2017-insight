import React from 'react';
import { ListItem } from 'material-ui/List';
import propTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import EmojiRender from '../../../emojiRender';
import styles from './styles.scss';

const SingleConversation = (props) => {
  const messages = props.conversation.messages;
  const author = !!messages.length && messages[messages.length - 1].author ?
    messages[messages.length - 1].author : null;
  const userName = author ? (author.item.firstName || author.item.username) : null;
  const userAvatar = author ? author.item.avatar : 'avatar.png';
  const active = props.active ? 'conversation-item-active' : '';
  return (
    <div>
      {!messages.length ?
        <ListItem
          style={{ padding: '0px' }}
          className={`${styles['conversation-item']} ${styles[active]}`}
          onClick={() => {
            props.handler();
            props.setStatistic(props.conversation);
          }}
          primaryText={'No messages in conversation'}
        />
        :
        <ListItem
          style={{ padding: '0px' }}
          className={`${styles['conversation-item']} ${styles[active]}`}
          onClick={() => {
            props.handler();
            props.setStatistic(props.conversation);
          }}
          leftAvatar={<Avatar src={`${userAvatar}`} />}
          primaryText={typeof messages[messages.length - 1].body === 'object' ?
            `${messages[messages.length - 1].body.fileName}.${messages[messages.length - 1].body.fileType}` :
            <EmojiRender text={messages[messages.length - 1].body} />}
          secondaryText={userName}
          secondaryTextLines={2}
        />}
      <Divider inset />
    </div>);
};

SingleConversation.propTypes = {
  setStatistic: propTypes.func,
  conversation: propTypes.shape({
    _id: propTypes.string.isRequired,
    participants: propTypes.arrayOf(propTypes.shape({
      userType: propTypes.string,
      user: propTypes.any,
    })).isRequired,
    messages: propTypes.arrayOf(propTypes.any).isRequired,
    open: propTypes.bool,
    createdAt: propTypes.oneOfType([propTypes.number, propTypes.string]),
  }),
  handler: propTypes.func,
  active: propTypes.bool,
};
export default SingleConversation;
