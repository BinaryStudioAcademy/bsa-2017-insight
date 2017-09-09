import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSelection, getAllSelections, getSingleSelection } from '../../../../actions/selectionActions';
import SelectionList from './SelectionList/SelectionList';
import Selection from './Selection/Selection';

class EngageSelections extends React.Component {
  constructor() {
    super();
    this.state = {
      selectionList: null,
    };
  }

  componentWillMount() {
    this.props.getSelectionList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectionList: nextProps.selectionList });
  }

  render() {
    return (
      <div style={{
        height: `calc(100vh - ${this.props.headerHeight + 61}px)`,
        overflow: 'hidden',
        display: 'flex',
      }}
      >
        <SelectionList
          headerHeight={this.props.headerHeight}
          chosenTheme={this.props.chosenTheme}
          getSelectionList={this.props.getSelectionList}
          getSingleSelection={this.props.getSingleSelection}
          selectionList={this.state.selectionList}
        />
        <Selection
          headerHeight={this.props.headerHeight}
          chosenTheme={this.props.chosenTheme}
          getSelectionList={this.props.getSelectionList}
          deleteSelection={this.props.deleteSelection}
          chosenSelection={
            this.state.selectionList &&
            this.props.chosenSelection &&
            this.state.selectionList.some(sel => sel.id === this.props.chosenSelection.id) ?
              this.props.chosenSelection : null
          }
        />
      </div>
    );
  }
}

EngageSelections.propTypes = {
  headerHeight: PropTypes.number,
  chosenTheme: PropTypes.shape({}),
};

const mapStateToProps = (state) => {
  return {
    selectionList: state.selection.selections,
    chosenSelection: state.selection.chosenSelection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSelection: (id, cb) => {
      return dispatch(deleteSelection(id, cb));
    },
    getSelectionList: () => {
      return dispatch(getAllSelections());
    },
    getSingleSelection: (id) => {
      return dispatch(getSingleSelection(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EngageSelections);