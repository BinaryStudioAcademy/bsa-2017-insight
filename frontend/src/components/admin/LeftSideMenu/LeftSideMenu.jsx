import React from 'react';
import PropTypes from 'prop-types';
// import { NavLink } from 'react-router';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import HomeAdminIcon from 'material-ui/svg-icons/action/dashboard';
import RespondIcon from 'material-ui/svg-icons/communication/chat';
import EngageIcon from 'material-ui/svg-icons/editor/insert-chart';

class LeftSideMenu extends React.Component {
  render() {
    {console.log(this.props)}
    return (
      <div>
        <Drawer
          width={this.props.width}
        >
          <IconButton
            style={{ width: this.props.width }}
            tooltip={'Home'}
            tooltipPosition={'bottom-right'}
          >
            <HomeAdminIcon />
          </IconButton>
          <Divider />
          <IconButton
            style={{ width: this.props.width }}
            tooltip={'Respond'}
            tooltipPosition={'bottom-right'}
          >
            <RespondIcon />
          </IconButton>
          <Divider />
          <IconButton
            style={{ width: this.props.width }}
            tooltip={'Engage'}
            tooltipPosition={'bottom-right'}
          >
            <EngageIcon />
          </IconButton>
          <Divider />
        </Drawer>
      </div>
    );
  }
}

LeftSideMenu.propTypes = {
  width: PropTypes.number,
};

export default LeftSideMenu;
