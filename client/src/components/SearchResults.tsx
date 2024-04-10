import { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import {SearchFn} from './Search';
import React from "react";
import Select from 'react-select';
import Navbar from './Navbar';
import Search from './Search';
import './Search.css';

const SearchResults = () => {
    const searchTag = String(useParams().search_tag);
    const options = [
      { value: 'asc', label: 'Low to High' },
      { value: 'dsc', label: 'High to Low' },
    ];
    const [sortby, setSortby] = useState(options[0]);
    const setOption = (e: any) => {
      if (e.value === 'asc') {
        setSortby(options[0]);
      } else {
        setSortby(options[1]);
    }};

    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        border: state.isFocused ? '2px solid #ffa500' : '2px solid #ccc',
        boxShadow: state.isFocused ? '0 0 0 2px #ffa500' : 'none',
        '&:hover': {
          border: '2px solid #ffa500'
        },
        padding: '9px',
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#ffa500' : 'transparent',
        color: state.isFocused ? '#fff' : '#333',
      }),
      indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '25px',
      }),
      container: (provided, state) => ({
        ...provided,
        width: '20%',
      }),
    };

    return (
        <div className='search-results-page'>
            <Navbar></Navbar>
            <Search></Search>
            <div id='select-align'>
              <h1>Search Results</h1>
              <Select value={sortby} onChange={setOption} options={options} isSearchable={false} placeholder="Sort by price" styles={customStyles}/>
            </div>
            <SearchFn product_name={searchTag} sort_by={sortby.value}/>
        </div>
    )
};

export default SearchResults;