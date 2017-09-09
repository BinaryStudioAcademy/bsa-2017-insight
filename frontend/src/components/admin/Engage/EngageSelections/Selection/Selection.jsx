import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import styles from './styles.scss';
// import Table from '../../../Table/TableItself';

class Selection extends React.Component {
  constructor() {
    super();
    this.state = {
      chosenSelection: null,
      membersExpanded: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chosenSelection !== this.state.chosenSelection) {
      this.setState({ chosenSelection: nextProps.chosenSelection });
    }
  }

  render() {
    return (
      <div style={{
        height: `calc(100vh - ${this.props.headerHeight + 61}px)`,
        overflowY: 'scroll',
        flexGrow: '1',
        padding: '20px',
      }}
      >
        <emailIcon />
        { this.state.chosenSelection ?
          <Card
            expanded={this.state.membersExpanded}
            containerStyle={{
              backgroundColor: this.props.chosenTheme.palette.borderColor,
              padding: 10,
            }}
          >
            <CardHeader
              title={this.props.chosenSelection.name}
              subtitle={`${this.props.chosenSelection.stats.member_count} users, ${this.props.chosenSelection.stats.campaign_count} mailings`}
            />
            {/* <CardText>
              {this.props.chosenSelection.description}
            </CardText> */}
            <CardActions>
              <RaisedButton
                className={styles['selection-button']}
                label="User list"
                onClick={() => this.setState({ membersExpanded: !this.state.membersExpanded })}
              />
              <RaisedButton
                className={styles['selection-button']}
                label="Go to MailChimp"
                onClick={() => window.open('http://mailchimp.com')}
              />
              <RaisedButton
                className={styles['selection-button']}
                label="Delete selection"
                onClick={() => {
                  this.props.deleteSelection(this.props.chosenSelection.id, this.props.getSelectionList);
                  this.setState({ chosenSelection: null });
                }}
              />
            </CardActions>
            <CardText expandable>
              {/* <Table
                options={this.props.fieldsToDisplay}
                statistics={statistics}
              /> */}
              <List>
                { this.props.chosenSelection.members.map(selection => {
                  return (<ListItem
                    key={selection.id}
                    primaryText={selection.email_address}
                    leftIcon={<div><EmailIcon /></div>}
                  />);
                },
                ) }
              </List>
            </CardText>
          </Card> :
          'Choose a selection first' }
      </div>
    );
  }
}

Selection.propTypes = {
  headerHeight: PropTypes.number,
  chosenSelection: PropTypes.shape({
    users: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    description: PropTypes.description,
    mailings: PropTypes.arrayOf(PropTypes.object),
    _id: PropTypes.string,
  }),
  getSelectionList: PropTypes.func,
  deleteSelection: PropTypes.func,
  chosenTheme: PropTypes.shape({
    palette: PropTypes.shape({
      borderColor: PropTypes.string,
    }),
  }),
};

export default Selection;
