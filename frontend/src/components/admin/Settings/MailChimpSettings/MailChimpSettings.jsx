import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMailchimpSettings, updateMailchimpSettings } from '../../../../actions/mailchimpSettingsActions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles.scss';

class MailChimpSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.getMailchimpSettings();
  }

  componentWillReceiveProps(nextProps) {
    console.log(JSON.stringify(nextProps.mailChimpSettings));
    // console.log(nextProps.mailChimpSettings);
  }

  componentWillUpdate(nextProps, nextState) {}

  render() {
    return (
      <div>
        <form
          className={styles['mailchimp-settings-form']}
          onSubmit={(e) => {
            e.preventDefault();
            const values = {
              email_type_option: true,

              from_email: document.getElementById('settings-from_email').value || undefined,
              from_name: document.getElementById('settings-from_name').value || undefined,
              language: document.getElementById('settings-language').value || undefined,
              subject: document.getElementById('settings-subject').value || undefined,

              permission_reminder: document.getElementById('settings-permission_reminder').value || undefined,

              country: document.getElementById('settings-country').value || undefined,
              zip: document.getElementById('settings-zip').value || undefined,
              state: document.getElementById('settings-state').value || undefined,
              city: document.getElementById('settings-city').value || undefined,
              address: document.getElementById('settings-address').value || undefined,
              company: document.getElementById('settings-company').value || undefined,

              apiKey: document.getElementById('settings-apiKey').value || undefined,
            };
            this.props.updateMailchimpSettings(values);
          }}
        >
          <h3>Info for MailChimp mailings</h3>
          <TextField
            floatingLabelText="API key"
            id="settings-apiKey"
            hintText={`currently: ${this.props.mailChimpSettings ? this.props.mailChimpSettings.apiKey : ''}`}
          /><br />
          <TextField
            floatingLabelText="Company"
            id="settings-company"
            hintText={`currently: ${this.props.mailChimpSettings ? this.props.mailChimpSettings.contact.company : ''}`}
          /><br />
          <TextField
            floatingLabelText="Address"
            id="settings-address"
            hintText={`currently: ${this.props.mailChimpSettings ? this.props.mailChimpSettings.contact.address : ''}`}
          /><br />
          <TextField
            floatingLabelText="City"
            id="settings-city"
            hintText={`currently: ${this.props.mailChimpSettings ? this.props.mailChimpSettings.contact.city : ''}`}
          /><br />
          <TextField
            floatingLabelText="State"
            id="settings-state"
            hintText={`currently: ${this.props.mailChimpSettings ? this.props.mailChimpSettings.contact.state : ''}`}
          /><br />
          <TextField
            floatingLabelText="ZIP"
            id="settings-zip"
            hintText={`currently: ${this.props.mailChimpSettings ? this.props.mailChimpSettings.contact.zip : ''}`}
          /><br />
          <TextField
            floatingLabelText="Country"
            id="settings-country"
            hintText={`currently: ${this.props.mailChimpSettings ? this.props.mailChimpSettings.contact.country : ''}`}
          /><br />
          <TextField
            floatingLabelText="Permission reminder"
            id="settings-permission_reminder"
            hintText={`currently: ${this.props.mailChimpSettings ? this.props.mailChimpSettings.permission_reminder : ''}`}
          /><br />
          <TextField
            floatingLabelText="Language"
            id="settings-language"
            hintText={`currently: ${this.props.mailChimpSettings ? this.props.mailChimpSettings.campaign_defaults.language : ''}`}
          /><br />
          <TextField
            floatingLabelText="Subject"
            id="settings-subject"
            hintText={`currently: ${this.props.mailChimpSettings ? this.props.mailChimpSettings.campaign_defaults.subject : ''}`}
          /><br />
          <TextField
            floatingLabelText="From email"
            id="settings-from_email"
            type="email"
            hintText={`currently: ${this.props.mailChimpSettings ? this.props.mailChimpSettings.campaign_defaults.from_email : ''}`}
          /><br />
          <TextField
            floatingLabelText="From name"
            id="settings-from_name"
            hintText={`currently: ${this.props.mailChimpSettings ? this.props.mailChimpSettings.campaign_defaults.from_name : ''}`}
          /><br />
          <br />
          <br />
          <RaisedButton
            label="Update"
            primary
            type="submit"
          />
        </form>
      </div>
    );
  }
}

MailChimpSettings.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    mailChimpSettings: state.mailchimpSettings.mailchimpSettings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMailchimpSettings: () => dispatch(getMailchimpSettings()),
    updateMailchimpSettings: body => dispatch(updateMailchimpSettings(body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailChimpSettings);

// export default MailChimpSettings;
