import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

const ForceMessagesTable = (props) => {
  return (
    <table className={styles['force-messages-table']}>
      <thead className={styles['force-messages-table-header']}>
        <tr>
          <th>Page</th>
          <th>Message</th>
          <th>Timeout</th>
          <th className={styles['delete-button-th']} />
        </tr>
      </thead>
      <tbody>
        {props.forceMessages.length > 0 && props.forceMessages.map((forceMessage) => {
          return (
            <tr className={styles['force-messages-table-body-row']} key={forceMessage._id}>
              <td className={styles['force-messages-table-cell']}>{forceMessage.page}</td>
              <td className={styles['force-messages-table-cell']}>{forceMessage.body}</td>
              <td className={styles['force-messages-table-cell']}>{forceMessage.timer / 1000} s</td>
              <td className={styles['force-messages-table-delete-cell']}>
                <img
                  src={`${window._injectedData.insightHost}/resources/force-messages/delete-force-message.png`}
                  alt="delete"
                  onClick={() => props.onDeleteButtonClick(forceMessage._id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

ForceMessagesTable.propTypes = {
  forceMessages: propTypes.arrayOf(propTypes.shape({
    _id: propTypes.string,
    appId: propTypes.string,
    page: propTypes.string,
    body: propTypes.string,
    timer: propTypes.number,
    conditions: propTypes.object,
  })),
};

export default ForceMessagesTable;
