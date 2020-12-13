import React, { useEffect } from 'react';
import classes from './QuizList.module.scss';
import { NavLink } from "react-router-dom";
import Loader from '../../components/UI/Loader/Loader';
import { useSelector, useDispatch } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

const QuizList = () => {
  const quizes = useSelector(state => state.quiz.quizes);
  const loading = useSelector(state => state.quiz.loading);
  const dispatch = useDispatch();

  const renderQuizes = () => {
    return quizes.map(quiz => {
      return (
        <li
        key={quiz.id}
        >
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  };

  useEffect( () => {
    dispatch(fetchQuizes());
  }, [dispatch]);

  return (
      <div className={classes.QuizList} >
        <h1>Список тестов</h1>

        {
          loading
            ? <Loader />
            : <ul>
              {renderQuizes()}
              </ul>
        }
      </div>
    );
};

export default QuizList;
