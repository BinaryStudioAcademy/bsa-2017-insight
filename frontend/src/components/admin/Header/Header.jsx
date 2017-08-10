import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Key from 'material-ui/svg-icons/communication/vpn-key';
import Person from 'material-ui/svg-icons/social/person';

class Header extends React.Component {
  render() {
    return (
      <div>
        <AppBar
          title={'InSight admin panel'}
          showMenuIconButton={false}
          iconElementRight={
            <Toolbar
              style={{ backgroundColor: 'rgba(0,0,0,0)', paddingBottom: 8 }}
            >
              <ToolbarGroup
                lastChild
              >
                <Chip
                  onTouchTap={() => alert('Imagine... that you see your user info')}
                >
                  <Avatar>
                    <Person />
                  </Avatar>
                  User Name
                </Chip>
                <FlatButton
                  onTouchTap={() => alert('Imagine... that you just logged out')}
                  label={'Log out'}
                  icon={<Key />}
                  secondary
                />
              </ToolbarGroup>
            </Toolbar>
          }
        />
      </div>
    );
  }
}

export default Header;
