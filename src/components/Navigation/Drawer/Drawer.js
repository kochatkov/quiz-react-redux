import React from 'react';
import classes from './Drawer.module.scss';
import { NavLink } from 'react-router-dom';
import Backdrop from "../../UI/Backdrop/Backdrop";

const Drawer = props => {
  const cls = [classes.Drawer];

  if (!props.isOpen) {
    cls.push(classes.close)
  }

  const links = [
    {to: '/', label: 'Список', exact: true}
  ];

  if (props.isAuthenticated) {
    links.push({to: '/quiz-creator', label: 'Создать тест', exact: false});
    links.push({to: '/logout', label: 'Выйти', exact: false});
  } else {
    links.push({to: '/auth', label: 'Авторизация', exact: false})
  }

  const clickHandler = () => {
    props.onClose();
  };

  const renderLinks = (links) => {
    return links.map((link, index) => {
      return (
        <li key={index} >
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  return (
    <>
      <nav className={cls.join(' ')}>
        <ul>
          {renderLinks(links)}
        </ul>
      </nav>
      {props.isOpen && <Backdrop onClick={props.onClose} />}
    </>
  )
}

export default Drawer;
