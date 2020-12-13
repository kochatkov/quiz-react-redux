import React, { useEffect } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from '../../components/UI/Loader/Loader';
import { fetchQuizById, quizAnswerClick, retryQuiz } from "../../store/actions/quiz";
import { connect } from 'react-redux';

const Quiz = (props) => {
   useEffect(() => {
    props.fetchQuizById(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div className={classes.Quiz}>
      <div className={classes['Quiz__wrapper']}>
        <h1>Ответьте на все вопросы</h1>

        {
          props.loading || !props.quiz
            ? <Loader/>
            : props.isFinished
              ? <FinishedQuiz
                results={props.results}
                quiz={props.quiz}
                onRetry={props.retryQuiz}
              />
              : <ActiveQuiz
                answers={props.quiz[props.activeQuestion].answers}
                question={props.quiz[props.activeQuestion].question}
                onAnswerClick={props.quizAnswerClick}
                quizLength={props.quiz.length}
                answerNumber={props.activeQuestion + 1}
                state={props.answerState}
              />
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    results: state.quiz.results,
    quiz: state.quiz.quiz,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    loading: state.quiz.loading,
    isFinished: state.quiz.isFinished
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
