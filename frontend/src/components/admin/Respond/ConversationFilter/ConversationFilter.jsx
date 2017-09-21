import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import Dialog from 'material-ui/Dialog';
import styles from './styles.scss';

class ConversationFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: this.props.filters,
      dialogOpen: false,
    };
    this.setTextValue = this.setTextValue.bind(this);
    this.setDate = this.setDate.bind(this);
    this.changeDateFilter = this.changeDateFilter.bind(this);
    this.resetForms = this.resetForms.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setSelectValue = this.setSelectValue.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.removeFilters = this.removeFilters.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
  }

  componentDidMount() {
    this[this.state.filters.activeGroup].classList.add('active');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filters: nextProps.filters,
    });
    this[this.state.filters.activeGroup].classList.remove('active');
    this[nextProps.filters.activeGroup].classList.add('active');
  }

  setTextValue(e) {
    const newFilters = { ...this.state.filters };
    newFilters[e.target.id] = e.target.value;
    this.setState({
      filters: newFilters,
    });
  }

  setSelectValue(type, value) {
    const newFilters = { ...this.state.filters };
    newFilters[type] = value;
    this.setState({
      filters: newFilters,
    });
  }

  setDate(type, date) {
    const newFilters = { ...this.state.filters };
    newFilters.date[type] = date;
    this.setState({
      filters: newFilters,
    });
  }

  changeDateFilter(e, value) {
    const newFilters = { ...this.state.filters };
    newFilters.date = {};
    newFilters.activeDateFilter = value;
    this.setState({
      filters: newFilters,
      dateError: '',
    });
  }

  applyFilters() {
    if (this.state.filters.activeDateFilter === 'range') {
      if ((this.state.filters.date.from && !this.state.filters.date.to) ||
        (this.state.filters.date.to && !this.state.filters.date.from)
      ) {
        return this.setState({
          dateError: 'Incorrect date range',
        });
      }
    }
    const newFilters = { ...this.state.filters };
    newFilters.isFilterApplied = true;

    return this.setState({
      dialogOpen: false,
      filters: newFilters,
      dateError: '',
    }, () => {
      this.props.removeConversations();
      this.props.setConversationFilters(this.state.filters);
      this.props.getConversationsByFilters(this.state.filters);
    });
  }

  resetForms() {
    this.setState({
      dateError: '',
      filters: {
        date: {},
        isFilterApplied: this.state.filters.isFilterApplied,
        activeDateFilter: 'range',
        activeGroup: this.state.filters.activeGroup,
      },
    });
  }

  handleClose() {
    this.setState({
      dialogOpen: false,
    });
  }

  removeFilters(e) {
    e.preventDefault();
    this.setState({
      isFilterApplied: false,
      dateError: '',
      filters: {
        date: {},
        activeGroup: this.state.filters.activeGroup,
        activeDateFilter: this.state.filters.activeDateFilter,
      },
    }, () => {
      this.props.setConversationFilters(this.state.filters);
      this.props.getConversationsByFilters(this.state.filters);
    });
  }

  changeGroup(e) {
    e.preventDefault();
    const newFilters = { ...this.state.filters, activeGroup: e.target.id };

    this[this.state.filters.activeGroup].classList.remove('active');
    this.setState({
      filters: newFilters,
    }, () => {
      this[this.state.filters.activeGroup].classList.add('active');
      this.props.removeConversations();
      this.props.setConversationFilters(this.state.filters);
      this.props.getConversationsByFilters(this.state.filters);
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Reset"
        primary
        onClick={this.resetForms}
        className={'dialog-btn'}
      />,
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
        className={'dialog-btn'}
      />,
      <FlatButton
        label="Submit"
        primary
        onClick={this.applyFilters}
        className={'dialog-btn'}
      />,
    ];
    return (
      <div>
        <div className={'filter-panel'}>
          <FilterIcon
            onClick={() => this.setState({ dialogOpen: true })}
            style={this.state.filters.isFilterApplied ? { color: '#fbc110', margin: '12px' } : { margin: '12px' }}
          />
          {
            this.state.filters.isFilterApplied &&
            <a
              onClick={this.removeFilters}
              className={'remove-filter'}
              role="button"
              tabIndex="0"
            >
              remove filters
            </a>
          }
          <span style={{ margin: '0 5px 0 0' }}>|</span>
          <span>show conversations:</span>
          <div style={{ margin: '0 10px' }}>
            <a
              role="button"
              tabIndex="0"
              className={'filter-panel-link'}
              id={'all'}
              onClick={this.changeGroup}
              ref={(el) => {
                this.all = el;
                return undefined;
              }}
            >all({this.props.conversationGroupsCount.all})</a>
            <a
              role="button"
              tabIndex="0"
              className={'filter-panel-link'}
              id={'mine'}
              onClick={this.changeGroup}
              ref={(el) => {
                this.mine = el;
                return undefined;
              }}
            >mine({this.props.conversationGroupsCount.mine})</a>
            <a
              role="button"
              tabIndex="0"
              className={'filter-panel-link'}
              id={'unpicked'}
              onClick={this.changeGroup}
              ref={(el) => {
                this.unpicked = el;
                return undefined;
              }}
            >unpicked({this.props.conversationGroupsCount.unpicked})</a>
          </div>
        </div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          className={styles['conv-filter-dialog']}
          bodyStyle={{ padding: '12px' }}
        >
          <div className={'conversation-filter'}>
            <div className={'date-tab'}>
              <div className={'tab-name'}>Date</div>
              <div className={'date-type'}>
                <RadioButtonGroup
                  name={'dateFilter'}
                  defaultSelected={this.state.filters.activeDateFilter}
                  onChange={this.changeDateFilter}
                >
                  <RadioButton
                    value={'range'}
                    label={'Range'}
                    style={{ width: '120px', display: 'inline-block' }}
                  />
                  <RadioButton
                    value={'exact'}
                    label={'Exact'}
                    style={{ width: '120px', display: 'inline-block' }}
                  />
                  <RadioButton
                    value={'greater'}
                    label={'Greater than'}
                    style={{ width: '170px', display: 'inline-block' }}
                  />
                  <RadioButton
                    value={'less'}
                    label={'Less than'}
                    style={{ width: '150px', display: 'inline-block' }}
                  />
                </RadioButtonGroup>
                <span style={{ fontSize: '12px', color: '#f00' }}>
                  {this.state.dateError}
                </span>
              </div>
              <div className={'content-body'}>
                {
                  this.state.filters.activeDateFilter === 'range' ?
                    <div>
                      <DatePicker
                        hintText="from"
                        onChange={(e, date) => this.setDate('from', date)}
                        value={this.state.filters.date.from}
                        style={{ width: '170px', display: 'inline-block', marginRight: '20px' }}
                        textFieldStyle={{ width: '170px' }}
                      />
                      <DatePicker
                        hintText="to"
                        onChange={(e, date) => this.setDate('to', date)}
                        value={this.state.filters.date.to}
                        style={{ width: '170px', display: 'inline-block' }}
                        textFieldStyle={{ width: '170px' }}
                      />
                    </div>
                    :
                    <DatePicker
                      hintText="choose date"
                      onChange={(e, date) => this.setDate(this.state.filters.activeDateFilter, date)}
                      value={this.state.filters.date[this.state.filters.activeDateFilter]}
                      textFieldStyle={{ width: '170px' }}
                    />
                }
              </div>
            </div>
            <div className={'user-tab'}>
              <div className={'tab-name'}>User info</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                  hintText={'Username'}
                  floatingLabelText="Username"
                  onChange={this.setTextValue}
                  value={this.state.filters.username || ''}
                  id={'username'}
                  style={{ width: '150px', marginRight: '20px' }}
                />
                <TextField
                  hintText={'Email'}
                  floatingLabelText="Email"
                  onChange={this.setTextValue}
                  value={this.state.filters.email || ''}
                  id={'email'}
                  style={{ width: '150px', marginRight: '20px' }}
                />
              </div>
            </div>
            <div className={'conv-tab'}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <div className={'tab-name'}>Conversations options</div>
                <TextField
                  hintText={'Limit'}
                  floatingLabelText="Limit"
                  type={'number'}
                  onChange={this.setTextValue}
                  value={this.state.filters.limit || ''}
                  id={'limit'}
                  style={{ width: '150px', marginRight: '20px' }}
                />
                <SelectField
                  onChange={(e, i, value) => this.setSelectValue('sort', value)}
                  id={'sort'}
                  value={this.state.filters.sort}
                  floatingLabelText="Sort by date"
                  style={{ width: '150px', marginRight: '20px' }}
                >
                  <MenuItem value={'new'} primaryText="New" />
                  <MenuItem value={'old'} primaryText="Old" />
                </SelectField>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

ConversationFilter.propTypes = {
  removeConversations: PropTypes.func,
  setConversationFilters: PropTypes.func,
  getConversationsByFilters: PropTypes.func,
  filters: PropTypes.PropTypes.shape(),
  conversationGroupsCount: PropTypes.shape({
    all: PropTypes.number,
    mine: PropTypes.number,
    unpicked: PropTypes.number,
  }),
};

export default ConversationFilter;
