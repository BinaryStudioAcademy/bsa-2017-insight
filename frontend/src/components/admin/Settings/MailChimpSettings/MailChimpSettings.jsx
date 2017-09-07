import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class MailChimpSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  componentWillUpdate(nextProps, nextState) {}

  render() {
    return (
      <div>
        <form style={{ textAlign: 'center', margin: '20px auto' }}>
          <h3>Info for MailChimp mailings</h3>
          <TextField
            hintText="API key"
            required
            id="api-key"
          /><br />
          <TextField
            hintText="Company"
            id="selection-company"
            style={{ marginBottom: 30 }}
          /><br />
          <TextField
            hintText='Address ("Far Far Away" by default)'
            id="selection-address"
            style={{ marginBottom: 30 }}
          /><br />
          <TextField
            hintText='City ("Far Far Away" by default)'
            id="selection-city"
            style={{ marginBottom: 30 }}
          /><br />
          <TextField
            hintText="State (optional)"
            id="selection-state"
            style={{ marginBottom: 30 }}
          /><br />
          <TextField
            hintText="ZIP (optional)"
            id="selection-zip"
            style={{ marginBottom: 30 }}
          /><br />
          <TextField
            hintText="Country (optional)"
            id="selection-country"
            style={{ marginBottom: 30 }}
          /><br />
          <RaisedButton
            label="Cancel"
            onClick={() => this.toggleSelectionDialog(this.state.selDialogOpen)}
          />
          <RaisedButton
            label="Create"
            type="submit"
          />
        </form>
      </div>
    );
  }
}

MailChimpSettings.propTypes = {
};

export default MailChimpSettings;
