import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Key from 'material-ui/svg-icons/communication/vpn-key';
import Toggle from 'material-ui/Toggle';

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
                <Toggle
                  onToggle={this.props.toggleTheme}
                  style={{ width: 170, marginRight: 30 }}
                  thumbStyle={{ background: this.props.chosenTheme.palette.accent3Color }}
                  trackStyle={{ background: this.props.chosenTheme.palette.primary3Color }}
                  label={`Turn ${this.props.chosenTheme.palette.canvasColor === '#ffffff' ? 'off' : 'on'} the light`}
                />
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
                  style={{ color: this.props.chosenTheme.palette.textColor }}
                  label={'Log out'}
                  icon={<Key />}
                  containerElement={'label'}
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
    username: PropTypes.string,
  }),
};

export default Header;
