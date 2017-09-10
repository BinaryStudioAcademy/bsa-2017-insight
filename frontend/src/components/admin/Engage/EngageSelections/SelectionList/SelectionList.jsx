import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
// import { getAllSelections, getSingleSelection } from '../../../../../actions/selectionActions';

class SelectionList extends React.Component {
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }

  render() {
    return (
      <List
        style={{
          width: '20%',
          height: `calc(100vh - ${this.props.headerHeight + 16}px)`,
          overflowY: 'scroll',
        }}
      >
        <Subheader>Selections</Subheader>
        {this.props.selectionList ?
          this.props.selectionList.map((selection) => {
            return (
              <ListItem
                primaryText={selection.name}
                key={selection.id}
                onClick={() => {
                  this.props.getSingleSelection(selection.id);
                }}
              />
            );
          })
          : <div style={{ marginLeft: 20 }}>Loading...</div>}
      </List>
    );
  }
}

SelectionList.propTypes = {
  getSingleSelection: PropTypes.func,
  selectionList: PropTypes.arrayOf(PropTypes.object),
  headerHeight: PropTypes.number,
  getSelectionList: PropTypes.func,
};

export default SelectionList;

