import React from 'react';
import { List, ListItem } from 'material-ui/List';
import propTypes from 'prop-types';
import GpsFixed from 'material-ui/svg-icons/device/gps-fixed';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Time from 'material-ui/svg-icons/device/access-time';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './styles.scss';


const UserInfo = (props) => {
  const statistic = props.statistic;
  const user = statistic && props.statistic.userId;
  const isOnline = statistic && statistic.online ? 'online' : 'offline';
  const lastUrl = statistic && statistic.viewedUrls.join(' , ');
  const screen = statistic && `${statistic.screenWidth} x ${statistic.screenHeight}`;
  return (
    <MuiThemeProvider>
      {statistic && <div className={styles['user-info']}>
        <List>
          <ListItem primaryText={user.username} secondaryText={isOnline} leftAvatar={<Avatar src={'avatars/' + user.avatar} />} />
          <ListItem primaryText={statistic.country} secondaryText={statistic.city} leftIcon={<GpsFixed />} />
          <ListItem primaryText={statistic.timeZone} leftIcon={<Time />} />
        </List>

        <Divider />

        <List>
          <Subheader>Last visited</Subheader>
          <ListItem primaryText="Current url" secondaryText={statistic.currentUrl} />
          <ListItem primaryText="Previous urls" secondaryText={lastUrl} />
        </List>

        <Divider />

        <List>
          <Subheader>Details</Subheader>
          <ListItem primaryText="Signed up" secondaryText={statistic.signedUp} />
          <ListItem primaryText="IP" secondaryText={statistic.userIpAddress} />
          <ListItem primaryText="Browser" secondaryText={statistic.browser} />
          <ListItem primaryText="Browser lang" secondaryText={statistic.browserLanguage} />
          <ListItem primaryText="Device type" secondaryText={statistic.deviceType} />
          <ListItem primaryText="OS" secondaryText={statistic.os} />
          <ListItem primaryText="Screen" secondaryText={screen} />
        </List>
      </div>}
    </MuiThemeProvider>
  );
};

UserInfo.propTypes = {
  statistic: propTypes.shape({
    userId: propTypes.any,
    currentUrl: propTypes.string,
    viewedUrls: propTypes.arrayOf(propTypes.string),
    browserLanguage: propTypes.string,
    geoLocation: propTypes.string,
    online: propTypes.bool,
    coordinates: propTypes.string,
    userIpAddress: propTypes.string,
    country: propTypes.string,
    city: propTypes.string,
    screenWidth: propTypes.number,
    screenHeight: propTypes.number,
    userAgent: propTypes.string,
    timeZone: propTypes.string,
    signedUpDate: propTypes.any,
    sessionsCounts: propTypes.number,
  }),
};

export default UserInfo;
