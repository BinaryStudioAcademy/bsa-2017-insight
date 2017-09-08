import React from 'react';
import { List } from 'material-ui/List';
import styles from './styles.scss';
import Filter from '../Filter/Filter';

class ColumnsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
    this.expandList = this.expandList.bind(this);
  }

  expandList(){
    this.setState({
      opened: !this.state.opened
    })
  }

  render() {
    return (
	  <Filter
	    selectedFields={this.props.selectedFields}
	    statisticOptions={this.props.statisticOptions}
	    updateFields={this.props.updateFields}
	  />
    );
  }
}

export default ColumnsFilter;