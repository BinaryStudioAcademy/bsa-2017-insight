import React from 'react';
import PropTypes from 'prop-types';
import EmojiRender from '../../emojiRender';
import Category from './Category';
import style from './styles.scss';

class EmojiContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ['People', 'Nature', 'Objects', 'Places', 'Symbols'],
      activeCategory: 'People',
    }
    this.clickOnSmile = this.clickOnSmile.bind(this);
    this.setCategory = this.setCategory.bind(this);
  }
  setCategory(e) {
    e.stopPropagation();
    const catName = e.target.getAttribute('data-name');
    this.setState({ activeCategory: catName });
  }
  clickOnSmile(e) {
    e.stopPropagation();
    this.props.setEmojiToInput(e.target.getAttribute('data-name'));
  }

  render() {
    return (
      <div className={style['emoji-container']}>
        <div>
          {this.state.categories.map((e) => {
            return (<Category
              key={e}
              categoryName={e}
              activeCategory={this.state.activeCategory}
              setCategory={this.setCategory}
            />);
          })}
          <EmojiRender category={this.state.activeCategory} handler={e => this.clickOnSmile(e)} />
        </div>
      </div>
    );
  }
}

EmojiContainer.propTypes = {
  setEmojiToInput: PropTypes.func,
};

export default EmojiContainer;
