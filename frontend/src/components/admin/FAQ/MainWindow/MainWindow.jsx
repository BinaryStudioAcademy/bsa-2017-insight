import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import QuestionAndAnswer from '../QuestionAndAnswer/QuestionAndAnswer';
import styles from './styles.scss';

class MainWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
    };
  }

  deleteQuestion() {
    if (this.props.currentQuestion._id != null) {
      this.props.setAction('delete');
      this.props.deleteQuestion(this.props.currentQuestion._id);
      this.props.setAction('');
    }
  }

  copyToClipboard() {
    const answer = document.getElementById('answer');
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '0';
    div.style.height = '0';
    div.style.background = 'transparent';
    div.innerHTML = answer.value || 'Something went wrong!';
    document.body.appendChild(div);
    const range = document.createRange();
    range.selectNode(div);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    const isSuccessful = document.execCommand('copy');
    console.log(`Copying text command was successful: ${isSuccessful}`);
    this.document.body.removeChild(div);
  }

  submit() {
    this.setState({
      disabled: true,
    });
    const question = document.getElementById('question');
    const answer = document.getElementById('answer');
    const body = {
      question: question.value,
      answer: answer.value,
      createdAt: new Date(),
    };
    if (this.props.action === 'add') {
      this.props.addQuestion(body);
    }
    else if (this.props.action === 'modify') {
      this.props.modifyQuestion(this.props.currentQuestion._id, body);
    }
    this.props.setAction('');
  }

  render() {
    return (
      <div className={styles.mainWindow}>
        <div>
          <RaisedButton
            onClick={() => this.props.handleAction('modify')}
            label="Modify"
            className={styles.raisedButton}
          />
          <RaisedButton
            onClick={() => this.copyToClipboard()}
            label="Copy"
            className={styles.raisedButton}
          />
          <RaisedButton
            onClick={() => this.deleteQuestion()}
            label="Delete"
            className={styles.raisedButton}
          />
        </div>
        <div>
          {
            (this.props.currentQuestion.question === '' && this.props.action !== 'add') ? <p>Choose the question</p>
              : <QuestionAndAnswer faq={this.props.currentQuestion} action={this.props.action} />
          }
          {
            ((this.props.currentQuestion !== '' && this.props.action === 'modify') || this.props.action === 'add') ?
              <RaisedButton onClick={() => this.submit()} label="Submit" type={'submit'} primary /> : null
          }
        </div>
      </div>
    );
  }
}

MainWindow.propTypes = {
  addQuestion: PropTypes.func,
  modifyQuestion: PropTypes.func,
  deleteQuestion: PropTypes.func,
  setAction: PropTypes.func,
  action: PropTypes.string,
  currentQuestion: PropTypes.shape({
    question: PropTypes.string,
    _id: PropTypes.string,
  }),
  handleAction: PropTypes.func,
};

export default MainWindow;
