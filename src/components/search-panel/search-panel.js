import React from 'react';

import './search-panel.css';

const SearchPanel = () => {
  const searchText = 'Type here to search';
  const searchStyle = {
    fontSize: '25px'
  };

  return (
    <div className="col-7">
      <input className="form-control" style={ searchStyle } placeholder={ searchText } />
    </div>
  );
};

export default SearchPanel;
