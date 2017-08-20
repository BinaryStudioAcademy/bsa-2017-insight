import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './styles.scss';

class UserInfoTable extends React.Component {
  generateRows() {
    return this.props.statistics.map((row, index) => (
      <TableRow key={'row ' + index} value={row}>
        {
          this.props.options.map(elem => (
            <TableRowColumn key={'row ' + index + ',column' + elem} style={{ fontSize: '12px', width: '200px', padding: '5px' }}>
              <span>{row[elem]}</span>
            </TableRowColumn>
          ))
        }
      </TableRow>
    ));
  }


  render() {
    return (
      <div className={styles.container}>
        <MuiThemeProvider>
          <Table bodyStyle={{ overflow: 'visible' }}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false} >
              <TableRow>
                {this.props.options.map((elem) => {
                  return <TableHeaderColumn key={elem} style={{ fontSize: '12px', width: '200px', padding: '5px' }}>{elem}</TableHeaderColumn>;
                })}
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {
                this.generateRows()
              }
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    );
  }
}

UserInfoTable.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.string),
  statistics: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default UserInfoTable;
