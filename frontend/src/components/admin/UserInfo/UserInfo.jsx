import React from 'react';
import {List, ListItem} from 'material-ui/List';
import GpsFixed from 'material-ui/svg-icons/device/gps-fixed';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Time from 'material-ui/svg-icons/device/access-time';
import Subheader from 'material-ui/Subheader';
import "./styles.scss"


const UserInfo = (props) => {
    const visitor = props.statistic.visitorId
    const statistic = props.statistic
    const userIsFrom = `${statistic.country} ${statistic.city}`
    const isOnline = statistic.online ? "online" : "offline"
    const lastUrl = statistic.viewedUrls.join(" , ")
    const browser = `${statistic.browser} ${statistic.browserVersion}`
    const screen = `${statistic.screenWidth} x ${statistic.screenHeight}`
    return(
    
      <div className="user-info">
        <List>
          <ListItem primaryText={visitor.name}  secondaryText={isOnline} leftAvatar={<Avatar src={visitor.avatar}/>} />
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
      </div>

    )


}

export default UserInfo