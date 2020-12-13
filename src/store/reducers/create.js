import {CREATE_QUIZ_QUESTION, RESET_TYPE_CREATION} from "../actions/actionTypes";

const initialState = {
  quiz: [],
}

export const createReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      }
    case RESET_TYPE_CREATION:
      return {
        ...state, quiz: []
      }
    default:
      return state;
  }
}
