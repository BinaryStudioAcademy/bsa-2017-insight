import React, { Component } from 'react';
import Question from './../Question/Question';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import styles from './styles.scss';

let uniqueId = 0;

class FAQList extends Component {
    constructor(props) {
    super(props);

    this.setSelectedId = this.setSelectedId.bind(this);
  }

  setSelectedId(id){
    this.props.setSelectedId(id);
  }

  render(){
    let faqs;
    if (this.props.action == "search"){
      faqs = this.props.searchedData;
    }
    else
      faqs = this.props.faqs;
  return (
    <div className={styles['FAQ-list']}>
      <TextField hintText="Search" id="search" onInput={this.props.searchQuestion} /><br />
      <List>
        {faqs && faqs.map((faq) => {
          const lighting = (this.props.selectedId == faq._id) ? true : false; 
          return (
            <ListItem innerDivStyle={{padding: '10px'}} className={styles['ListItem']} key={uniqueId++}>
            <Question setSelectedId={()=> this.setSelectedId(faq._id)}
              key={uniqueId++}
              question={faq.question}
            />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}
};

export default FAQList;

