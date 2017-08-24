import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Key from 'material-ui/svg-icons/communication/vpn-key';

class Header extends React.Component {
  logout(e) {
    e.preventDefault();
    fetch('/api/admin/logout', { credentials: 'include' })
      .then(response => window.location.replace(response.url));
  }

  render() {
    const user = window._injectedData;
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
                <Chip>
                  <Avatar src={`/avatars/${user.avatar}`} />
                  { this.props.currentUser.username }
                </Chip>
                {/* <Chip>
                  <Avatar src={`/avatars/${user.avatar}`} />
                  {`${user.firstName}  ${user.lastName}`}
                </Chip> */}
                <FlatButton
                  onTouchTap={this.logout}
                  style={{ color: 'black' }}
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

Header.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string
  })
};

export default Header;
