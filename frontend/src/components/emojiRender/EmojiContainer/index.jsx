import React from 'react';
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
    console.log(catName)
    this.setState({ activeCategory: catName });
  }
  clickOnSmile(e) {
    console.log(e.target.getAttribute('data-name'))
    e.stopPropagation();
    this.props.setEmojiToInput(e.target.getAttribute('data-name'))
  }

  

  render() {
    const cat = this.state.category;
    return (
      <div className={style['emoji-container']}>
        <div>
          {this.state.categories.map((e) => {
            return <Category key={e} categoryName={e} activeCategory={this.state.activeCategory} setCategory={this.setCategory} />
          })}
          <EmojiRender category={this.state.activeCategory} hendler={e => this.clickOnSmile(e)}/>
      </div>
      </div>
    )
}
}

export default EmojiContainer;
