import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Question from './../Question/Question';
import styles from './styles.scss';

let uniqueId = 0;

class FAQList extends Component {
  constructor(props) {
    super(props);
    this.setSelectedId = this.setSelectedId.bind(this);
  }

  setSelectedId(id) {
    this.props.setSelectedId(id);
  }

  addQuestion() {
    this.props.handleAction('add');
  }

  render() {
    const faqs = (this.props.action === 'search') ? this.props.searchedData : this.props.faqs;
    return (
      <div className={styles.container}>
        <div>
          <TextField
            hintText="Search"
            id="search"
            onInput={this.props.searchQuestion}
            className={styles.search}
          />
          <br />
          <List className={styles.list} style={{}}>
            {faqs && faqs.map((faq) => {
              const highlight = (this.props.selectedId === faq._id);
              return (
                <ListItem
                  innerDivStyle={{ padding: '0px' }}
                  className={styles['ListItem-highlight-' + `${highlight}`]}
                  key={uniqueId++}
                >
                  <Question
                    setSelectedId={() => this.setSelectedId(faq._id)}
                    key={uniqueId++}
                    question={faq.question}
                    highlight={highlight}
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
        <div className={styles.addButton}>
          <RaisedButton
            primary
            onClick={() => this.addQuestion()}
            label="Add question"
          />
        </div>
      </div>
    );
  }
}

FAQList.propTypes = {
  faqs: React.PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    createdAt: PropTypes.any.isRequired,
  })),
  setSelectedId: React.PropTypes.func,
  selectedId: React.PropTypes.string,
  searchQuestion: React.PropTypes.func,
  searchedData: React.PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    createdAt: PropTypes.any.isRequired,
  })),
  action: React.PropTypes.string,
  handleAction: PropTypes.func,
};

export default FAQList;

