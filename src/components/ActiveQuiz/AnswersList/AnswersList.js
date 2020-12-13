import React from 'react';
import classes from './AnswersList.module.scss';
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = ({ answers = [], state = [], onAnswerClick}) => {
  return (
    <ul className={classes.AnswersList}>
      { answers.map((answer, index) => (
        <AnswerItem
          state={state ? [state[answer.id]] : null}
          answer={answer}
          key={index}
          onAnswerClick={onAnswerClick}
        />
      ))}
    </ul>
  )
}

export default AnswersList;
