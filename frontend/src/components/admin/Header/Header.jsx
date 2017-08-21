import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Key from 'material-ui/svg-icons/communication/vpn-key';
import Person from 'material-ui/svg-icons/social/person';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    console.log('HEADER WILL RECEIVE PROPS:');
    console.log(this.props);
    console.log('HEADER STATE WILL BE:');
    console.log(this.state);
    this.setState({ currentUser: nextProps.currentUser });
  }

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
                  {this.state.currentUser ? this.state.currentUser.username : 'username'}
                </Chip>
                <FlatButton
                  onTouchTap={() => alert('Imagine... that you just logged out')}
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

// export default Header;


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  };
};

export default connect(mapStateToProps)(Header);
