import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import { ListItem } from 'material-ui/List';
import propTypes from 'prop-types';
import styles from './styles.scss';

export default class ChatLayout extends React.Component {
  render() {
    const user = window._injectedData;
    return (
      <div className={'chat-display-wrapper'}>
        <div className={'chat-header'} style={{ backgroundColor: this.props.settings.primaryColor }}>
          <IconButton style={{ marginRight: '10px' }}>
            <FontIcon className={'material-icons'} color={'#fff'}>arrow_back</FontIcon>
          </IconButton>
          <Avatar
            src={`/avatars/${user.avatar}`}
            style={{ marginRight: '10px' }}
          />{`${user.firstName} ${user.lastName} `}
        </div>
        <div
          className={'chat-body'}
          style={{ backgroundImage: `url(${this.props.settings.backgroundImage}.png)` }}
        >
          <ListItem
            leftAvatar={<Avatar src={`/avatars/${user.avatar}`} />}
            primaryText={user.firstName}
            secondaryText={this.props.settings.forceMessage}
          />
          <div style={{ width: '85%', margin: '25px auto' }}>
            <div className={'dummy-message'}>
              <h3 style={{ color: this.props.settings.primaryColor }}>
                Our best practice guide for staying personal at scale
              </h3>
              <span>Hi, our marketing team created a best practice guide
              for staying personal at scale using Intercom.</span>
            </div>
            <RaisedButton
              className={styles['question-button']}
              label="Hi, is there any online version of the book?"
              labelStyle={{ fontSize: '12px', color: '#fff' }}
              backgroundColor={this.props.settings.primaryColor}
            />
          </div>
        </div>
        <div className={'input-area'}>
          <span>Write a reply...</span>
        </div>
      </div>
    );
  }
}

ChatLayout.propTypes = {
  settings: propTypes.shape({
    backgroundImage: propTypes.string,
    primaryColor: propTypes.string,
    widgetPosition: propTypes.string,
    forceMessage: propTypes.string,
  }),
};
