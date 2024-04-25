/* Lingxi Dai - B00859041 */

import React, { useState } from 'react';
import './css/SearchBar.css' 

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    const { value } = event.target;
    setQuery(value);
    onSearch(value); // pass the search query up to the parent component
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;


