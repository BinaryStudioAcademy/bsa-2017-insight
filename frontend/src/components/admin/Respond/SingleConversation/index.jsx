import React from "react"
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

const SingleConversation = () =>{
   return (
       <div>
        <List>
            <Subheader>Today</Subheader>
            <ListItem
            leftAvatar={<Avatar src="images/ok-128.jpg" />}
            primaryText="Brunch this weekend?"
            secondaryText={
                <p>
                <span style={{color: darkBlack}}>Brendan Lim</span> --
                I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                </p>
            }
            secondaryTextLines={2}
            />
            <Divider inset={true} />
        </List>
       </div>
   )
}

export default SingleConversation