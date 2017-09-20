import Cropper from 'cropperjs';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';
import '../../../../../node_modules/cropperjs/dist/cropper.min.css';
import './styles.scss';

export default class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.crop = this.crop.bind(this);
    this.getCroppedAndSave = this.getCroppedAndSave.bind(this);
  }

  componentDidMount() {
    this.cropper = new Cropper(document.getElementById('croppedImg'));
  }

  getCroppedAndSave() {
    this.props.save(this.cropper.getCroppedCanvas());
  }

  crop(action) {
    switch (action) {
      case 'zoom+':
        this.cropper.zoom(0.1);
        break;
      case 'zoom-':
        this.cropper.zoom(-0.1);
        break;
      case 'rotate45':
        this.cropper.rotate(45);
        break;
      case 'rotate-45':
        this.cropper.rotate(-45);
        break;
      case 'reset':
        this.cropper.reset();
        break;
      case 'up':
        this.cropper.move(0, -2);
        break;
      case 'down':
        this.cropper.move(0, 2);
        break;
      case 'left':
        this.cropper.move(-2, 0);
        break;
      case 'right':
        this.cropper.move(2, 0);
        break;
      default: break;
    }
  }

  render() {
    return (
      <div className={'cropper'}>
        <img src={this.props.image} id={'croppedImg'} alt={'Avatar'} />
        <div className={'cropper-tools'}>
          <IconButton tooltip="Zoom out" onClick={() => this.crop('zoom+')}>
            <FontIcon className="material-icons md-18">zoom_in</FontIcon>
          </IconButton>
          <IconButton tooltip="Zoom in" onClick={() => this.crop('zoom-')}>
            <FontIcon className="material-icons md-18">zoom_out</FontIcon>
          </IconButton>
          <IconButton tooltip="Rotate left" onClick={() => this.crop('rotate-45')}>
            <FontIcon className="material-icons md-18">rotate_left</FontIcon>
          </IconButton>
          <IconButton tooltip="Rotate right" onClick={() => this.crop('rotate45')}>
            <FontIcon className="material-icons md-18">rotate_right</FontIcon>
          </IconButton>
          <IconButton tooltip="Move up" onClick={() => this.crop('up')}>
            <FontIcon className="material-icons md-18">keyboard_arrow_up</FontIcon>
          </IconButton>
          <IconButton tooltip="Move down" onClick={() => this.crop('down')}>
            <FontIcon className="material-icons md-18">keyboard_arrow_down</FontIcon>
          </IconButton>
          <IconButton tooltip="Move left" onClick={() => this.crop('left')}>
            <FontIcon className="material-icons md-18">keyboard_arrow_left</FontIcon>
          </IconButton>
          <IconButton tooltip="Move right" onClick={() => this.crop('right')}>
            <FontIcon className="material-icons md-18">keyboard_arrow_right</FontIcon>
          </IconButton>
        </div>
        <div className={'actionBtns'}>
          <FlatButton label="Reset" onClick={() => this.crop('reset')} />
          <FlatButton label="Cancel" onClick={() => this.props.save(null)} />
          <FlatButton label="Save" onClick={this.getCroppedAndSave} />
        </div>
      </div>
    );
  }
}

ImageCropper.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  save: PropTypes.func,
};

