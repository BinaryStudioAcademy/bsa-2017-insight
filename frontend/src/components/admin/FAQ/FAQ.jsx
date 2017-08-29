import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import FAQList from './FAQList/FAQList';
import MainWindow from './MainWindow/MainWindow';
import * as faqActions from '../../../actions/faqActions';

const faqs = [
  {question:'',
  answer:'',
  createdAt:'',
  _id: '-1'},
]

class FAQ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: null,
      action: "",         /* add, show or modify */ 
      selectedFAQ: {question:"", answer: "", createdAt:""},
      data: [],
      searchedData: [],
    }

    this.setSelectedId = this.setSelectedId.bind(this);
    this.setAction = this.setAction.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.modifyQuestion = this.modifyQuestion.bind(this);
    this.getSelectedFAQ = this.getSelectedFAQ.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.searchQuestion = this.searchQuestion.bind(this);
  }

  setSelectedId(id){
    var searchField = document.getElementById('search');
    searchField.value = "";
    this.setState({
      selectedId: id,
      action: "show",
    }, () => this.getSelectedFAQ());
  }


  setAction(action){
    this.setState({
      action: action,
    }, () => this.getSelectedFAQ());
  }

  componentWillMount() {
    this.props.getFAQ();
    this.setState({
      data: this.props.data,
    })
  }

  addQuestion(body){
    this.props.addFAQ(body);
    this.setState({
      selectedFAQ: body,
    }, () => this.getSelectedFAQ())
  }

  modifyQuestion(id, body){
    this.props.modifyFAQ(id, body);
    this.props.getFAQ();
    this.getSelectedFAQ();
  }

  deleteQuestion(id){ 
    this.props.deleteFAQ(id);
    this.setState({
      selectedFAQ: {question:"", answer: "", createdAt:""},
    }, () => this.getSelectedFAQ())
  }

  searchQuestion(){
    var searchField = document.getElementById('search');
    let results = [];
    for (let i = 0; i < this.props.data.length; i++){
      if (this.props.data[i].question.toLowerCase().indexOf(searchField.value.toLowerCase()) != -1)
          results.push(this.props.data[i]);
    }
    this.setState({
      searchedData: results,
      action:"search"
    })
  }

  getSelectedFAQ(){
    const index = this.props.data.findIndex((faq) => {
       return faq._id === this.state.selectedId
    });
    let newSelectedFAQ = {};
    if (this.state.action != "add")
    {
      newSelectedFAQ = (index !== -1)
         ? this.props.data[index]
         : faqs[0];
    }
    else
      newSelectedFAQ = faqs[0];
    this.setState({
      selectedFAQ: newSelectedFAQ,
    })
  }

  render() {
    let data;
    (this.state.data.length == 0) ? data = this.props.data : data = this.state.data;
    return (
      <div className={styles.chat}>
        <FAQList faqs={this.props.data} setSelectedId={this.setSelectedId} selectedId={this.state.selectedId} 
        searchQuestion={this.searchQuestion} searchedData={this.state.searchedData} action={this.state.action} />
        <MainWindow faq={this.state.selectedFAQ} selectedId={this.state.selectedId} 
        addQuestion={this.addQuestion} modifyQuestion={this.modifyQuestion} 
        setAction={this.setAction} deleteQuestion={this.deleteQuestion} action={this.state.action} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.faq.data,
    currentQuestion: state.faq.currentQuestion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFAQ: () => {
      return dispatch(faqActions.getFAQ());
    },
    addFAQ: (Body) => {
      return dispatch(faqActions.addFAQ(Body));
    },
    deleteFAQ: (id) => {
      return dispatch(faqActions.deleteFAQ(id));
    },
    modifyFAQ: (id, Body) => {
      return dispatch(faqActions.modifyFAQ(id, Body));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);

