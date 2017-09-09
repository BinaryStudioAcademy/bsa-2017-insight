import React from 'react';
import TextField from 'material-ui/TextField';
import propTypes from 'prop-types';
import styles from './styles.scss';

export default class ForceMessage extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update(e) {
    this.props.set(e.target.id, e.target.value);
  }

  render() {
    return (
      <div className={styles['force-message-form']}>
        <div>Force message:</div>
        <TextField
          hintText={'Force message'}
          id={'forceMessage'}
          onChange={this.update}
          value={this.props.settings.forceMessage}
          style={{ marginBottom: '15px' }}
        />
        <div>Force message appears in</div>
        <TextField
          hintText={'Timeout seconds'}
          id={'timeout'}
          onChange={this.update}
          value={this.props.settings.timeout}
        />
      </div>
    );
  }
}

ForceMessage.propTypes = {
  set: propTypes.func,
  settings: propTypes.object,
};
