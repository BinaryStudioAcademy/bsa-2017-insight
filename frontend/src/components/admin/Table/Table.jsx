import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './styles.scss';

class UserInfoTable extends React.Component {
  render() {
    const statisticOptions = this.props.statisticOptions;
    return (
      <div className={styles.container}>
        <MuiThemeProvider>
          <Table onRowSelection={(rowIndex) => {
            this.props.toggleDrawer();
            console.log(`You clicked on user with the index of ${rowIndex}`);
          }}
          >
            <TableHeader adjustForCheckbox={false} displaySelectAll={false} >
              <TableRow>
                {statisticOptions.items.map((elem) => {
                  return <TableHeaderColumn style={{ fontSize: '16px' }}>{elem}</TableHeaderColumn>;
                })}
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {/* На этом месте будет нормальная таблица как только вытащу данные из БД */}
              <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>John Smith</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>2</TableRowColumn>
                <TableRowColumn>Randal White</TableRowColumn>
                <TableRowColumn>Unemployed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>3</TableRowColumn>
                <TableRowColumn>Stephanie Sanders</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>Steve Brown</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>5</TableRowColumn>
                <TableRowColumn>Christopher Nolan</TableRowColumn>
                <TableRowColumn>Unemployed</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    );
  }
}

UserInfoTable.propTypes = {
  statisticOptions: React.PropTypes.object.isRequired,
};

export default UserInfoTable;
