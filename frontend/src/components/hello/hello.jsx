import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import * as usersActions from '../../actions/usersActions';

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('codename', this.input.files[0]);
    const options = {
      body: formData,
      method: 'POST',
    };
    fetch('http://localhost:3000/api/uploads', options)
      .then((response) => {
        console.log('data sent succesfully');
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(`error has occurred ${err}`);
      });
  }

  render() {
    return (
      <div>
        <div className={styles['project-name']}>Insight</div>
        <button
          onClick={() => {
            this.props.getAllUsers();
          }}
        > GET USERS
        </button>
        <form>
          <input
            name="fileToUpload"
            type="file"
            ref={(node) => {
              this.input = node;
            }}
          />
          <button type="submit" onClick={this.onSubmit}>
            Send File
          </button>
        </form>
      </div>
    );
  }
}

Hello.propTypes = {
  getAllUsers: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => {
      dispatch(usersActions.getAllUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
