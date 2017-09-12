const initialState = {
  data: [],
  currentQuestion: { question: '', answer: '', createdAt: '' },
};

const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FAQ_SUCCESS':
      return Object.assign({}, state, { data: action.payload });
    case 'GET_FAQ_BY_ID_SUCCESS':
      return Object.assign({}, state, { currentQuestion: action.payload });
    case 'ADD_FAQ_SUCCESS':
      return { data: [...state.data, action.payload], currentQuestion: action.payload };
    case 'MODIFY_FAQ_SUCCESS':
    {
      const newData = [...state.data];
      const index = newData.findIndex((elem) => {
        return elem._id === action.payload.id;
      });
      if (index !== -1) {
        newData[index].question = action.payload.Body.question;
        newData[index].answer = action.payload.Body.answer;
        newData[index].createdAt = action.payload.Body.createdAt;
      }
      return { data: newData, currentQuestion: newData[index] };
    }
    case 'DELETE_FAQ_SUCCESS':
    {
      const newData = [...state.data];
      const index = newData.findIndex((elem) => {
        return elem._id === action.payload;
      });
      if (index !== -1) {
        newData.splice(index, 1);
      }
      return { data: newData, currentQuestion: newData[0] || initialState.currentQuestion };
    }
    case 'SET_CURRENT_FAQ_SUCCESS':
    {
      const newData = [...state.data];
      const currentQuestion = newData.find(item => item._id === action.payload.id);
      return { data: newData, currentQuestion: currentQuestion || initialState.currentQuestion };
    }
    default:
      return state;
  }
};

export default faqReducer;
