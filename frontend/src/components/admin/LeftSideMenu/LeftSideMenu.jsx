import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import HomeAdminIcon from 'material-ui/svg-icons/editor/insert-chart';
import RespondIcon from 'material-ui/svg-icons/communication/chat';
import EngageIcon from 'material-ui/svg-icons/social/group';
import AppsIcon from 'material-ui/svg-icons/action/list';
import FAQIcon from 'material-ui/svg-icons/action/question-answer';
import PopoverSettings from './PopoverSettings';
import './styles.scss';

class LeftSideMenu extends React.Component {
  render() {
    return (
      <div>
        <Drawer
          width={this.props.width}
        >
          <NavLink to={'/admin'}>
            <IconButton
              style={{ width: this.props.width }}
              tooltip={'Home'}
              tooltipPosition={'bottom-right'}
              iconStyle={{ fill: this.props.chosenTheme.palette.textColor }}
            >
              <HomeAdminIcon />
            </IconButton>
          </NavLink>
          <Divider />
          <NavLink to={'/admin/messenger'}>
            <div style={{ position: 'relative' }}>
              <IconButton
                style={{ width: this.props.width }}
                tooltip={'Messenger'}
                tooltipPosition={'bottom-right'}
                iconStyle={{ fill: this.props.chosenTheme.palette.textColor }}
              >
                <RespondIcon />
              </IconButton>
              { (this.props.unreadMessages.length > 0) ?
                <span className={'badge red-badge'}>{this.props.unreadMessages.length}</span> :
                null
              }
              { (this.props.reassignedConversations.length > 0) ?
                <span className={'badge blue-badge'}>{this.props.reassignedConversations.length}</span> :
                null
              }
            </div>
          </NavLink>
          <Divider />
          <NavLink to={'/admin/selections'}>
            <IconButton
              style={{ width: this.props.width }}
              tooltip={'Selections'}
              tooltipPosition={'bottom-right'}
              iconStyle={{ fill: this.props.chosenTheme.palette.textColor }}
            >
              <EngageIcon />
            </IconButton>
          </NavLink>
          <Divider />
          <NavLink to={'/admin/faq'}>
            <IconButton
              style={{ width: this.props.width }}
              tooltip={'FAQ'}
              tooltipPosition={'bottom-right'}
              iconStyle={{ fill: this.props.chosenTheme.palette.textColor }}
            >
              <FAQIcon />
            </IconButton>
          </NavLink>
          <Divider />
          <PopoverSettings width={this.props.width} chosenTheme={this.props.chosenTheme} />
          <Divider />
          {this.props.currentUser.isServiceAdmin ?
            <div>
              <NavLink to={'/admin/apps'}>
                <IconButton
                  style={{ width: this.props.width }}
                  tooltip={'Apps'}
                  tooltipPosition={'bottom-right'}
                  iconStyle={{ fill: this.props.chosenTheme.palette.textColor }}
                >
                  <AppsIcon />
                </IconButton>
              </NavLink>
              <Divider />
            </div> : ''
          }
        </Drawer>
      </div>
    );
  }
}

LeftSideMenu.propTypes = {
  width: PropTypes.number,
  chosenTheme: PropTypes.shape({
    palette: PropTypes.shape({
      textColor: PropTypes.string,
    }),
  }),
  currentUser: PropTypes.shape({
    isServiceAdmin: PropTypes.bool,
  }),
  reassignedConversations: PropTypes.arrayOf(PropTypes.string),
  unreadMessages: PropTypes.arrayOf(PropTypes.string),
};

export default LeftSideMenu;
