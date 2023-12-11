import React from 'react';
import { Title } from './title'
import { Login } from './login'
import { Menu } from './menu'
import { ChaptersList } from './chaptersLists';

const FirstPage = () => {
  return (
    <div>
      <Title />
      <Login />
      <Menu />
      <ChaptersList />
    </div>
  );
};

export default FirstPage;
