import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import ImageCropper from './ImageCropper';

export default class AvatarPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.save = this.save.bind(this);
    this.setImage = this.setImage.bind(this);
  }

  componentDidMount() {
    return this.setImage(this.props.image);
  }

  componentWillReceiveProps(nextProps) {
    return this.setImage(nextProps.image);
  }

  setImage(image) {
    if (!image) return this.setState({ image: '' });

    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ image: reader.result });
    };
    return reader.readAsDataURL(image);
  }

  save(croppedImg) {
    if (croppedImg) {
      croppedImg.toBlob((blob) => {
        this.props.update(blob);
      });
    }

    this.setState({ open: false });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  render() {
    if (!this.state.image) return null;
    return (
      <div>
        <img src={this.state.image} id={'avatarPreview'} alt={'Avatar'} />
        <Dialog
          modal
          open={this.state.open}
          bodyStyle={{ margin: 0, padding: 0 }}
        >
          <ImageCropper image={this.state.image} save={this.save} />
        </Dialog>
        <RaisedButton label="Crop" onClick={this.handleOpen} />
      </div>
    );
  }
}

AvatarPreview.propTypes = {
  image: PropTypes.shape({}),
  update: PropTypes.func,
};
