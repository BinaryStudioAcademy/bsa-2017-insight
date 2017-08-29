import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Question from './../Question/Question';
import QuestionAndAnswer from '../QuestionAndAnswer/QuestionAndAnswer';
import styles from './styles.scss';
import * as faqActions from '../../../../actions/faqActions';

class MainWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeQuestionId: null,     //DELETE??
      selectedQuestion: this.props.faq,
      question: "",
      answer: "",
      disabled: true,
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
  }

  addQuestion(){
    const body = {
      question: this.state.question,
      answer: this.state.answer,
      createdAt: new Date(),
    }
    this.props.addQuestion(body);
    this.props.setAction("");
  }

  modify(){
    const body = {
      question: this.state.question,
      answer: this.state.answer,
      createdAt: new Date(),
    }
    this.props.modifyQuestion(this.props.selectedId, body);
    this.props.setAction("");
  }

  deleteQuestion(){
    this.props.setAction("delete");
    this.props.deleteQuestion(this.props.selectedId);
    this.props.setAction("");
  }

  copyToClipboard(text) {
      var answer = document.getElementById("answer");
       let div = document.createElement("div");
        div.style.position = 'fixed';
        div.style.top = '0';
        div.style.left = '0';
        div.style.width = '0';
        div.style.height = '0';
        div.style.background = 'transparent';
        div.innerHTML = answer.value || 'Something went wrong!';
        document.body.appendChild(div);
        let range = document.createRange();  
        range.selectNode(div);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        let isSuccessful = document.execCommand('copy');
        console.log('Copying text command was successful: ' + isSuccessful);
        document.body.removeChild(div);
   }

  handleQuestionChange(e) {
    this.setState({
        question: e.target.value
    });
  }

  handleAnswerChange(e) {
    this.setState({
        answer: e.target.value
    });
  }

  handleModify(){
    this.setState({
      disabled: false,
    });
    this.props.setAction("modify");
  }

  handleAdd(){
    this.setState({
      disabled: false,
    });
    this.props.setAction("add");
  }

  submit(){
    this.setState({
      disabled: true,
    });
    if (this.props.action == "add")
      this.addQuestion();
    else if (this.props.action == "modify")
      this.modify();
  }

  render() {
    console.log("this.props.faq");
    console.log(this.props.faq);
    return (
      <div className={styles['main-window']}>
        <div>
          <List>
          <ListItem open={this.state.open} disableKeyboardFocus={true}>
            <RaisedButton onClick={()=>this.handleModify()} label="Modify" style={{ margin: '10px'}} />
            <RaisedButton onClick={()=>this.copyToClipboard()} label="Copy" style={{ margin: '10px'}} />
            <RaisedButton onClick={()=>this.deleteQuestion()} label="Delete" style={{ margin: '10px'}} />
            <RaisedButton onClick={()=>this.handleAdd()} label="Add question" style={{ marginLeft: '40%'}} />
          </ListItem>
          </List>
        </div>
        <div>
        {
          (this.props.faq.question == "" && this.props.action != "add") ? <p>Choose the question</p> : 
          <QuestionAndAnswer faq={this.props.faq} action={this.props.action} 
          handleAnswerChange={this.handleAnswerChange} handleQuestionChange={this.handleQuestionChange} />
        }
          {
            (this.props.action == "add" || this.props.action == "modify") ? 
            <RaisedButton onClick={()=>this.submit()} label="Submit" type={"submit"} primary /> : null
          }
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    activeQuestionId: state.faq.activeQuestionId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFAQById: (id) => {
      return dispatch(faqActions.getFAQById(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);