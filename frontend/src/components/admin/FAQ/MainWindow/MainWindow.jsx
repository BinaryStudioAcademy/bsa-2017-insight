import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import QuestionAndAnswer from '../QuestionAndAnswer/QuestionAndAnswer';
import styles from './styles.scss';

class MainWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true
    };
  }

  deleteQuestion() { // selectedId не меняется.
    console.log('delete');
    console.log(this.props.selectedId);
    if (this.props.selectedId != null) {
      this.props.setAction('delete');
      this.props.deleteQuestion(this.props.selectedId);
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

  handleAction(action) {
    this.setState({
      disabled: false
    });
    this.props.setAction(action);
  }

  submit() {
    this.setState({
      disabled: true
    });
    const question = document.getElementById('question');
    const answer = document.getElementById('answer');
    const body = {
      question: question.value,
      answer: answer.value,
      createdAt: new Date()
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
      <div className={styles['main-window']}>
        <div>
          <List>
            <ListItem open={this.state.open} disableKeyboardFocus>
              <RaisedButton onClick={() => this.handleAction('modify')} label="Modify" style={{ margin: '10px' }} />
              <RaisedButton onClick={() => this.copyToClipboard()} label="Copy" style={{ margin: '10px' }} />
              <RaisedButton onClick={() => this.deleteQuestion()} label="Delete" style={{ margin: '10px' }} />
              <RaisedButton onClick={() => this.handleAction('add')} label="Add question" style={{ marginLeft: '40%' }} />
            </ListItem>
          </List>
        </div>
        <div>
          {
            (this.props.currentQuestion.question === '' && this.props.action !== 'add') ? <p>Choose the question</p> :
            <QuestionAndAnswer faq={this.props.currentQuestion} action={this.props.action} />
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
  addQuestion: React.PropTypes.func,
  modifyQuestion: React.PropTypes.func,
  deleteQuestion: React.PropTypes.func,
  setAction: React.PropTypes.func,
  action: React.PropTypes.string,
  faq: React.PropTypes.objectOf(),
  selectedId: React.PropTypes.string
};

export default MainWindow;
