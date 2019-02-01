import React, { Component } from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import TodoList from '../todo-list/todo-list';
import AddItem from '../add-item/add-item';
import './app-container.css';

export default class AppContainer extends Component {

  constructor() {
    super();
    this.maxId = 100;
    this.state = {
      todoData: [
        this.createItem('Drink Coffee'),
        this.createItem('Make Awesome App'),
        this.createItem('Have a lunch')
      ],
      term: '',
      filter: 'all'
    }
  }

  createItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  addItem(text) {
    const newItem = this.createItem(text);

    this.setState((state) => {
      const newTodoData = [
        ...state.todoData,
        newItem
      ];

      return {
        todoData: newTodoData
      }
    });
  }

  deleteItem(id) {
    this.setState((state) => {
      const index  = state.todoData.findIndex((el) => el.id === id);

      const before = state.todoData.slice(0, index);
      const after = state.todoData.slice(index + 1);

      const newTodoData = [...before, ...after];

      return {
        todoData: newTodoData
      };
    });
  }

  toggleProperty(arr, id, propName) {
    const index  = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [
      ...arr.slice(0, index),
      newItem,
      ...arr.slice(index + 1)
    ];
  }

  onToggleImportant(id) {
    this.setState((state) => {
      return {
        todoData: this.toggleProperty(state.todoData, id, 'important')
      }
    });
  }

  onToggleDone(id) {
    this.setState((state) => {
      return {
        todoData: this.toggleProperty(state.todoData, id, 'done')
      }
    });
  }

  onItemSearch = (e) => {
    this.setState({
      term: e.target.value
    });
  }

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  onItemFilter = (filter) => {
    this.setState({
      filter: filter
    });
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleItems = this.filter(this.search(todoData, term), filter);

    return (
      <div className="container">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel row">
          <SearchPanel onItemSearch={this.onItemSearch}/>
          <ItemStatusFilter filter={filter} onFilterChange={this.onItemFilter} />
        </div>
        <TodoList
          todos={ visibleItems }
          onDeleted={ this.deleteItem.bind(this) }
          onToggleImportant={ this.onToggleImportant.bind(this) }
          onToggleDone={this.onToggleDone.bind(this)} />
        <AddItem onAddItem={ this.addItem.bind(this) }/>
      </div>
    );
  }

};
