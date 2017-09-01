import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
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
                <ListItem
                  autoGenerateNestedIndicator={false}
                  primaryTogglesNestedList
                  style={{ color: this.props.chosenTheme.palette.alternateTextColor }}
                  leftAvatar={<Avatar src={`/avatars/${user.avatar}`} />}
                  primaryText={this.props.currentUser.username}
                  nestedListStyle={{
                    position: 'absolute',
                    border: `1px solid ${this.props.chosenTheme.palette.primary1Color}`,
                    backgroundColor: this.props.chosenTheme.palette.canvasColor,
                    width: '157px',
                    padding: '0',
                    color: this.props.chosenTheme.palette.textColor,
                  }}
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
  chosenTheme: PropTypes.shape({
    palette: PropTypes.shape({
      textColor: PropTypes.string,
      alternateTextColor: PropTypes.string,
      canvasColor: PropTypes.string,
      accent3Color: PropTypes.string,
      primary1Color: PropTypes.string,
      primary3Color: PropTypes.string,
    }),
  }),
  toggleTheme: PropTypes.func,
};

export default Header;
