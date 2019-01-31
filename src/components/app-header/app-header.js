import React from 'react';

import './app-header.css';

const AppHeader = ({ toDo, done }) => {
  return (
    <div className="row align-items-end">
      <div className="col-12 col-sm-6">
        <h1 className="title">Todo List</h1>
      </div>
      <div className="col-12 col-sm-6">
        <h2 className="counters">{ toDo } more to do, { done } done</h2>
      </div>
    </div>
  );
};

export default AppHeader;
