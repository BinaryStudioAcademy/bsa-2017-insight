import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover/Popover';
import { Menu, MenuItem } from 'material-ui/Menu';
import { NavLink } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';

class PopoverSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom',
      },
      targetOrigin: {
        horizontal: 'right',
        vertical: 'top',
      },
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div>

        <NavLink to={'/admin/settings/general'}>
          <IconButton
            style={{ width: this.props.width }}
            tooltip={'Settings'}
            tooltipPosition={'bottom-right'}
            onClick={this.handleTouchTap}
          >
            <ActionSettings />
          </IconButton>
        </NavLink>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={this.state.anchorOrigin}
          targetOrigin={this.state.targetOrigin}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <NavLink to={'/admin/settings/general'}>
              <MenuItem primaryText="General" />
            </NavLink>
            <NavLink to={'/admin/settings/widget'}>
              <MenuItem primaryText="Widget" />
            </NavLink>
          </Menu>
        </Popover>
      </div>
    );
  }
}

PopoverSettings.propTypes = {
  width: PropTypes.number,
};

export default PopoverSettings;
