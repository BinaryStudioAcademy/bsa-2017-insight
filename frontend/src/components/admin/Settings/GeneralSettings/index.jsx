import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import AdminList from './AdminList';

class GeneralSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
      value: 'Admin list',
      isSuperUser: false,
      moderator: false,
    };
    this.fetchAdmins = this.fetchAdmins.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({ isSuperUser: window._injectedData.isSuperUser, moderator: window._injectedData.moderator });
  }

  componentDidMount() {
    this.fetchAdmins();
  }

  fetchAdmins() {
    fetch(`${window._injectedData.insightHost}/api/admins`, { credentials: 'include', method: 'GET' })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          admins: response,
        });
      });
  }

  handleChange(value) {
    this.setState({
      value,
    });
  }

  render() {
    return (
      <div>
        <Tabs value={this.state.value} onChange={this.handleChange}>
          <Tab label="Admin list" value="Admin list">
            <div>
              {this.state.admins.map((e) => {
                return (
                  <AdminList
                    key={e._id}
                    access={this.state.isSuperUser || this.state.moderator}
                    handleVerify={this.handleVerify}
                    {...e}
                  />
                );
              })}
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default GeneralSettings;
