import React from 'react';

import './search-panel.css';

const SearchPanel = ({ onItemSearch }) => {
  const searchText = 'Type here to search';

  return (
    <div className="col-7">
      <input className="form-control" placeholder={ searchText } onChange={ onItemSearch }/>
    </div>
  );
};

export default SearchPanel;
