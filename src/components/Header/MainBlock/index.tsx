import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '@assets/svg/logo.svg';

import { Icons } from '../Icons';
import { NavigationBar } from '../NavigationBar';

import './MainBlock.scss';

export const MainBlock = () => {
  return (
    <div className="header-main">
      <Link to="/" className="header-main__link">
        <Logo className="header-main__logo" />
      </Link>
      <NavigationBar />
      <Icons />
    </div>
  );
};
