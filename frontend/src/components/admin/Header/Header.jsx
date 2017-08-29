import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
// import Key from 'material-ui/svg-icons/communication/vpn-key';
import { ListItem, List } from 'material-ui/List';
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
              style={{
                backgroundColor: 'rgba(0,0,0,0)',
                paddingBottom: 8,
              }}
            >
              <ToolbarGroup
                lastChild
              >
                <Toggle
                  onToggle={this.props.toggleTheme}
                  style={{ width: 170, marginRight: 30 }}
                  labelStyle={{ color: this.props.chosenTheme.palette.alternateTextColor }}
                  thumbStyle={{ background: this.props.chosenTheme.palette.accent3Color }}
                  trackStyle={{ background: this.props.chosenTheme.palette.primary3Color }}
                  label={`Turn ${this.props.chosenTheme.palette.canvasColor === '#ffffff' ? 'off' : 'on'} the light`}
                />
                {/* <ListItem
                  nestedListStyle={{ position: 'absolute', border: '1px solid #000', backgroundColor: '#fff', width: '120px', padding: '0' }}
                  hoverColor={'transparent'}
                  primaryText={'Settings'}
                  nestedItems={[<ListItem primaryText={'Log out'} innerDivStyle={{ padding: '7px' }} onClick={this.logout} />]}
                /> */}
                <ListItem
                  autoGenerateNestedIndicator={false}
                  primaryTogglesNestedList
                  style={{ color: this.props.chosenTheme.palette.alternateTextColor }}
                  leftAvatar={<Avatar src={`/avatars/${user.avatar}`} />}
                  primaryText={this.props.currentUser.username}
                  nestedListStyle={{ position: 'absolute', border: '1px solid #000', backgroundColor: '#fff', width: '157px', padding: '0' }}
                  nestedItems={[
                    <ListItem primaryText={'Log out'} innerDivStyle={{ padding: '7px' }} onClick={this.logout} />,
                  ]}
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
