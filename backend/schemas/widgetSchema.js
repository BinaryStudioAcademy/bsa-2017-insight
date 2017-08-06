const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const widgetSchema = new Schema({
  user: { type: Schema.Types.Object, ref: 'Visitor' },
  options: {
    // думаю можно будет создать несколько наиболее потимальных пресетов по позиции и использовать по ключевому слову
    // соответствующий
    position: String,
    width: Number, // or string? +px?
    height: Number,
    primaryColor: String,
    secondaryColor: String,
    background: String,
    // другие настройки окна чата на стороне клиента
  },
});

module.exports = mongoose.model('Widget', widgetSchema);
