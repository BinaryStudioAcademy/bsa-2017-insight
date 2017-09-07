import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

const FileList = (props) => {
  return (
    <ul className={styles['files-list']}>
      {props && props.files.map((file) => {
        return (
          <li
            className={styles['file-list-item']}
            key={file.lastModified}
          >
            <span>{file.name}</span>
            <img
              onClick={() => props.onUnselectFileButtonClick(file.name)}
              className={styles['close-button']}
              src="http://localhost:3000/resources/widget/images/unselect-file-button.png"
              alt="unselect-file"
            />
          </li>
        );
      })}
    </ul>
  );
};

FileList.propTypes = {
  files: propTypes.arrayOf(propTypes.shape({
    lastModified: propTypes.number,
    lastModifiedDate: propTypes.object,
    name: propTypes.string,
    size: propTypes.number,
    type: propTypes.string,
    webkitRelativePath: propTypes.string,
  })),
  onUnselectFileButtonClick: propTypes.func,
};

export default FileList;
