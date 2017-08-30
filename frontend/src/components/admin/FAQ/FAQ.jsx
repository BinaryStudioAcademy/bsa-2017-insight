import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import FAQList from './FAQList/FAQList';
import MainWindow from './MainWindow/MainWindow';
import * as faqActions from '../../../actions/faqActions';

const faqs = [
  { question: '',
    answer: '',
    createdAt: '',
    _id: '-1' }
];

class FAQ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: null,
      action: null, /* add, show or modify */ 
      selectedFAQ: { question: '', answer: '', createdAt: '' },
      data: [],
      searchedData: []
    };

    this.setSelectedId = this.setSelectedId.bind(this);
    this.setSelectedFAQ = this.setSelectedFAQ.bind(this);
    this.setAction = this.setAction.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.modifyQuestion = this.modifyQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.searchQuestion = this.searchQuestion.bind(this);
  }

  componentWillMount() {
    this.props.getFAQ();
    this.setState({
      data: this.props.data
    });
  }

  setSelectedFAQ(props, state) {
    const index = props.data.findIndex((faq) => {
      return faq._id === state.selectedId;
    });
    let newSelectedFAQ = {};
    if (state.action === 'add') {
      newSelectedFAQ = faqs[0]; 
    } else if (state.action === '') { 
      newSelectedFAQ = props.currentQuestion; 
    } else { 
      newSelectedFAQ = (index !== -1) ? props.data[index] : faqs[0]; 
    }
    this.setState({
      selectedFAQ: newSelectedFAQ
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if ((this.state.selectedFAQ !== nextState.selectedFAQ) || (this.state.action !== nextState.action)) {
      this.setSelectedFAQ(nextProps, nextState);
    }
  }

  setSelectedId(id) {
    const searchField = document.getElementById('search');
    searchField.value = '';
    this.setState({
      action: "show"
    })
    this.props.setCurrentFAQ(id);
  }

  setAction(action) {
    this.setState({
      action
    });
  }

  addQuestion(body) {
    this.props.addFAQ(body);
  }

  modifyQuestion(id, body) {
    this.props.modifyFAQ(id, body);
  }

  deleteQuestion(id) {
    this.props.deleteFAQ(id);
  }

  searchQuestion() {
    const searchField = document.getElementById('search');
    const results = [];
    for (let i = 0; i < this.props.data.length; i++) {
      if (this.props.data[i].question.toLowerCase().indexOf(searchField.value.toLowerCase()) !== -1) { 
        results.push(this.props.data[i]); 
      }
    }
    this.setState({
      searchedData: results,
      action: 'search'
    });
  }

  render() {
    return (
      <div className={styles.chat}>
        <FAQList
          faqs={this.props.data}
          setSelectedId={this.setSelectedId}
          selectedId={this.props.currentQuestion._id}
          searchQuestion={this.searchQuestion}
          searchedData={this.state.searchedData}
          action={this.state.action}
        />
        <MainWindow
          setAction={this.setAction}
          action={this.state.action}


          currentQuestion={this.props.currentQuestion}

          selectedId={this.state.selectedId}
          addQuestion={this.addQuestion}
          modifyQuestion={this.modifyQuestion}
          deleteQuestion={this.deleteQuestion}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.faq.data,
    currentQuestion: state.faq.currentQuestion
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
    },
    setCurrentFAQ: (id) => {
      return dispatch(faqActions.setCurrentFAQ(id));
    }
  };
};

FAQ.propTypes = {
  addFAQ: React.PropTypes.func,
  modifyFAQ: React.PropTypes.func,
  deleteFAQ: React.PropTypes.func,
  getFAQ: React.PropTypes.func,
  data: React.PropTypes.arrayOf(PropTypes.objectOf(propTypes.oneOfType([propTypes.number, propTypes.string]))),
  currentQuestion: React.PropTypes.objectOf(propTypes.oneOfType([propTypes.number, propTypes.string]))
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);

