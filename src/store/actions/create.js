import axios from "../../axios/axios-quiz";
import {
  RESET_TYPE_CREATION,
  CREATE_QUIZ_QUESTION
} from "./actionTypes";

export const createQuizQuestion = (item) => ({
  type: CREATE_QUIZ_QUESTION,
  item
});

export const resetQuizCreation = () => ({ type: RESET_TYPE_CREATION });

export const finishCreateQuiz = () => {
  return async (dispatch, getState) => {

    await axios.post('/quizes.json', getState().create.quiz);
    dispatch(resetQuizCreation())
  }
};
