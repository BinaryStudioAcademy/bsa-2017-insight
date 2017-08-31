import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import EngageSelections from './EngageSelections/EngageSelections';
import EngageMessages from './EngageMessages/EngageMessages';

class Engage extends React.Component {
  render() {
    return (
      <Tabs>
        <Tab label="Selections">
          <EngageSelections
            headerHeight={this.props.headerHeight}
            chosenTheme={this.props.chosenTheme}
          />
        </Tab>
        <Tab label="Messages">
          <EngageMessages
            headerHeight={this.props.headerHeight}
            chosenTheme={this.props.chosenTheme}
          />
        </Tab>
      </Tabs>
    );
  }
}

export default Engage;
