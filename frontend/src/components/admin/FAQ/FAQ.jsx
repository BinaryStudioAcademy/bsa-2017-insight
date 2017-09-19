import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import FAQList from './FAQList/FAQList';
import MainWindow from './MainWindow/MainWindow';
import * as faqActions from '../../../actions/faqActions';

class FAQ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: null,
      action: null, /* add, show or modify */
      searchedData: [],
      disabled: true,
    };

    this.setSelectedId = this.setSelectedId.bind(this);
    this.setAction = this.setAction.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.modifyQuestion = this.modifyQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.searchQuestion = this.searchQuestion.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  componentWillMount() {
    this.props.getFAQ();
  }

  setSelectedId(id) {
    const searchField = document.getElementById('search');
    searchField.value = '';
    this.setState({
      action: 'show',
    });
    this.props.setCurrentFAQ(id);
  }

  setAction(action) {
    this.setState({
      action,
    });
  }

  handleAction(action) {
    this.setState({
      disabled: false,
    });
    this.setAction(action);
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
    const data = this.props.data;
    for (let i = 0; i < data.length; i++) {
      if (data[i].question.toLowerCase().indexOf(searchField.value.toLowerCase()) !== -1) {
        results.push(data[i]);
      }
    }
    this.setState({
      searchedData: results,
      action: 'search',
    });
  }

  render() {
    return (
      <div>
        <FAQList
          faqs={this.props.data}
          action={this.state.action}
          disabled={this.state.disabled}
          addQuestion={this.addQuestion}
          handleAction={this.handleAction}
          setSelectedId={this.setSelectedId}
          searchQuestion={this.searchQuestion}
          searchedData={this.state.searchedData}
          selectedId={this.props.currentQuestion._id}
        />
        <MainWindow
          setAction={this.setAction}
          action={this.state.action}
          addQuestion={this.addQuestion}
          disabled={this.state.disabled}
          handleAction={this.handleAction}
          modifyQuestion={this.modifyQuestion}
          deleteQuestion={this.deleteQuestion}
          currentQuestion={this.props.currentQuestion}
        />
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
    },
    setCurrentFAQ: (id) => {
      return dispatch(faqActions.setCurrentFAQ(id));
    },
  };
};

FAQ.propTypes = {
  addFAQ: propTypes.func,
  modifyFAQ: propTypes.func,
  deleteFAQ: propTypes.func,
  getFAQ: propTypes.func,
  data: React.PropTypes.arrayOf(propTypes.shape({
    _id: propTypes.string.isRequired,
    answer: propTypes.string.isRequired,
    question: propTypes.string.isRequired,
    createdAt: propTypes.any.isRequired,
  })),
  currentQuestion: propTypes.shape({
    _id: propTypes.string,
    answer: propTypes.string,
    question: propTypes.string,
    createdAt: propTypes.any,
  }),
  setCurrentFAQ: propTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);

