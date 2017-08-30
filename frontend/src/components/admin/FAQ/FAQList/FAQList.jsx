import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
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

  render() {
    let faqs = (this.props.action === 'search') ? this.props.searchedData : this.props.faqs;
    return (
      <div className={styles['FAQ-list']}>
        <TextField hintText="Search" id="search" onInput={this.props.searchQuestion} /><br />
        <List>
          {faqs && faqs.map((faq) => {
            const highlight = (this.props.selectedId === faq._id);
            return (
              <ListItem innerDivStyle={{ padding: '0px' }} className={styles['ListItem-highlight-' + `${highlight}`]} key={uniqueId++}>
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
    );
  }
}

FAQList.propTypes = {
  faqs: React.PropTypes.arrayOf(),
  setSelectedId: React.PropTypes.func,
  selectedId: React.PropTypes.string,
  searchQuestion: React.PropTypes.func,
  searchedData: React.PropTypes.arrayOf(),
  action: React.PropTypes.string
};

export default FAQList;

