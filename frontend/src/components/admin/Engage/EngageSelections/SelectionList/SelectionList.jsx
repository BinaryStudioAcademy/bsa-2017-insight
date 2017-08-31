import React from 'react';
import { connect } from 'react-redux';
import { getAllSelections, getSingleSelection } from '../../../../../actions/selectionActions';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

class SelectionList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.props.getSelectionList();
  }

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
        {this.props.selectionList.map((selection) => {
          return (
            <ListItem
              primaryText={selection.name}
              onClick={() => {
                this.props.getSingleSelection(selection._id);
              }}
            />
          );
        })}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectionList: state.selection.selections,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSelectionList: () => {
      return dispatch(getAllSelections());
    },
    getSingleSelection: (id) => {
      return dispatch(getSingleSelection(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionList);

