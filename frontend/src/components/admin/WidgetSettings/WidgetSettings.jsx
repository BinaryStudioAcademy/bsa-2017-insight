import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { SketchPicker } from 'react-color';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ChatLayout from './ChatLayout';
import Wallpapers from './Wallpapers';
import ForceMessage from './ForceMessage';

export default class WidgetSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'appearance',
      settings: this.getSettings(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.save = this.save.bind(this);
  }

  setSettings(option, value) {
    const newSettings = { ...this.state.settings, [option]: value };
    this.setState({ settings: newSettings });
  }

  getSettings() {
    const adminId = window._injectedData._id;
    fetch(`/api/widgets/${adminId}`, { credentials: 'include', method: 'GET' })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          settings: response.options,
        });
      });
  }
  save() {
    const adminId = window._injectedData._id;
    this.setState({ info: 'Saving...' });
    const dataToSend = {
      admin: adminId,
      options: this.state.settings,
    };
    console.log(dataToSend);
    dataToSend.admin = adminId;
    fetch(`/api/widgets/${adminId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(dataToSend),
      credentials: 'include',
    }).then((response) => {
      return response.json();
    }).then((response) => {
      if (response) {
        this.setState({ info: response.text });
      }
    });
  }
  handleChange(value) {
    this.setState({
      activeTab: value,
    });
  }

  render() {
    if (!this.state.settings) return <h3 style={{ textAlign: 'center' }}>Loading...</h3>;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '70%', marginTop: '20px' }}>
          <div>
            <RaisedButton
              label="Save"
              primary={true}
              onClick={this.save}
              style={{ margin: '15px' }}
            /> {this.state.info}
          </div>
          <Tabs
            value={this.state.activeTab}
            onChange={this.handleChange}
          >
            <Tab label="Customize appearance" value="appearance">
              <div>
                <h3>Customize appearance</h3>
                <p>Customize your Messenger’s color to suit your app or site, then choose a background wallpaper.</p>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                  <div>
                    <SketchPicker color={this.state.settings.primaryColor} onChange={color => this.setSettings('primaryColor', color.hex)} />
                    <Wallpapers set={this.setSettings} active={this.state.settings.backgroundImage} />
                    <h5>Widget position:</h5>
                    <SelectField
                      value={this.state.settings.widgetPosition}
                      onChange={(event, index, value) => this.setSettings('widgetPosition', value)}
                    >
                      <MenuItem value={'right'} primaryText="right" />
                      <MenuItem value={'left'} primaryText="left" />
                    </SelectField>
                  </div>
                  <ChatLayout settings={this.state.settings} />
                </div>
              </div>
            </Tab>
            <Tab label="Force message" value="localize">
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', marginTop: '35px' }} >
                <ForceMessage set={this.setSettings} settings={this.state.settings} />
                <ChatLayout settings={this.state.settings} />
              </div>
            </Tab>
            <Tab label="Install the Messenger" value="install">
              <h2>Install the Messenger</h2>
              <p>You’ll need to add a bit of code or configure an integration to see the 
              Insight Messenger appear on your website or app.</p>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
