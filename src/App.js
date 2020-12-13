import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Layout from "./hoc/layout/layout";
import Auth from './containers/Auth/Auth';
import QuizList from './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Logout from "./components/Logout/Logout";
import Quiz from './containers/Quiz/Quiz';
import { autoLogin } from "./store/actions/auth";

const App = () => {
  const isAuthenticated = useSelector(state => !!state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  let routes = (
    <Switch>
      <Route path={'/auth'} component={Auth} />
      <Route path={'/quiz/:id'} component={Quiz} />
      <Route path={'/'} exact component={QuizList} />
      <Redirect to={'/'} />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path={'/quiz-creator'} component={QuizCreator} />
        <Route path={'/quiz/:id'} component={Quiz} />
        <Route path={'/logout'} component={Logout} />
        <Route path={'/'} exact component={QuizList} />
        <Redirect to={'/'} />
      </Switch>
    )
  }

    return (
      <Layout>
        { routes }
      </Layout>
    );
};

export default App;
