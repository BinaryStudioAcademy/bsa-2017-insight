import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import WidgetSettings from './WidgetSettings/WidgetSettings';
import GeneralSettings from './GeneralSettings';
import styles from './styles.scss';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentToRender: 'GeneralSettings',
    };
    this.getComponentToRender = this.getComponentToRender.bind(this);
    this.setComponentToRender = this.setComponentToRender.bind(this);
  }

  getComponentToRender() {
    switch (this.state.componentToRender) {
      case 'WidgetSettings': {
        return <WidgetSettings />;
      }
      case 'GeneralSettings': {
        return <GeneralSettings />;
      }
      default:
        return <GeneralSettings />;
    }
  }

 setComponentToRender(text) {
     this.setState({ componentToRender: text })
 }

  render() {
    return (
      <div className={styles['general-settings']}>
        <div>
          <Paper style={style}>
            <Menu>
              <MenuItem primaryText="General" onClick={() => this.setComponentToRender('General')} />
              <MenuItem primaryText="Widget" onClick={() => this.setComponentToRender('WidgetSettings')} />
            </Menu>
          </Paper>
        </div>
        <div>
          {this.getComponentToRender()}
        </div>
       
      </div>
    );
  }
}

export default Settings;
