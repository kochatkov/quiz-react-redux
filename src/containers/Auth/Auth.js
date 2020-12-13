import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Button from "../../components/UI/Button/Button";
import Input from '../../components/UI/Input/Input';
import { auth } from "../../store/actions/auth";
import is from 'is_js';
import axios from 'axios';

import classes from './Auth.module.scss';

const Auth = props => {
  const dispatch = useDispatch();
  const [isFormValid, setIsFormValid] = useState(false);
  const [formControls, setFormControls] = useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите корректный email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Введите корректный password',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  });

  const loginHandler =  () => {
    dispatch(auth(
      formControls.email.value,
      formControls.password.value,
      true
    ));
  };

  const registerHandler =  () => {
    dispatch(auth(
      formControls.email.value,
      formControls.password.value,
      false
    ));
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  const changeHandler = (e, controlName) => {
    const controls = {...formControls};
    const control = {...formControls[controlName]};

    control.value = e.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    controls[controlName] = control;

    let isFormValid = true;

    Object.keys(controls).forEach(name => {
      isFormValid = controls[name].valid && isFormValid;
    });

    setIsFormValid(isFormValid);
    setFormControls(controls);
  };

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName]

      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => changeHandler(event, controlName)}
        />
      )
    })
  }

    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form onSubmit={submitHandler} className={classes.AuthForm}>

            {renderInputs()}

            <Button
              type='success'
              onClick={loginHandler}
              disabled={!isFormValid}
            >
              Войти
            </Button>
            <Button
              type='primary'
              onClick={registerHandler}
              disabled={!isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
}

export default Auth;
