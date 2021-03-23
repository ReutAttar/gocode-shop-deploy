import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import PropTypes from "prop-types";
import { MY_APP_NAME } from "../../constants";
import { Slider } from "antd";
import ThemeContext from "../../contexts/ThemeContext";

const Header = ({ categories, selectedFilter, selectedRange, MIN, MAX }) => {
  const [minPrice, setMinPrice] = useState(MIN);
  const [maxPrice, setMaxPrice] = useState(MAX);
  const theme = useContext(ThemeContext);

  function onChange(value) {
    // console.log("onChange: ", value);
    const [min, max] = value;
    setMaxPrice(max);
    setMinPrice(min);
  }

  // useEffect(() => {
  //   if (MIN !== 0 && MAX !== 0) {
  //     setMinPrice(MIN);
  //     setMaxPrice(MAX);
  //   }
  // }, [MAX, MIN]);

  function onAfterChange(value) {
    selectedRange(value);
  }
  return (
    <nav className="product-filter" style={{ background: theme.background }}>
      <h1 id="appTitle" style={{ color: theme.foreground }}>
        {MY_APP_NAME}
      </h1>
      <div className="filters">
        <div className="sort">
          <div className="collection-sort">
            <label style={{ color: theme.foreground }}>Filter by:</label>
            <select onChange={(event) => selectedFilter(event.target.value)}>
              <option value="All">All</option>
              {categories.map((category) => (
                <option value={category} key={categories.indexOf(category)}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="collection-sort">
            <label style={{ color: theme.foreground }}>Sort by:</label>
            <select>
              <option value="/">Featured</option>
              <option value="/">Best Selling</option>
              <option value="/">Alphabetically, A-Z</option>
              <option value="/">Alphabetically, Z-A</option>
              <option value="/">Price, low to high</option>
              <option value="/">Price, high to low</option>
              <option value="/">Date, new to old</option>
              <option value="/">Date, old to new</option>
            </select>
          </div>
        </div>

        <div className="slider" style={{ color: theme.foreground }}>
          <Slider
            range
            defaultValue={[minPrice, maxPrice]}
            max={MAX}
            min={MIN}
            onAfterChange={onAfterChange}
            onChange={onChange}
          />
          <div className="price-label">
            <span className="from">{`${minPrice}$`}</span> - <span className="to">{`${maxPrice}$`}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
Header.propTypes = {
  categories: PropTypes.array,
  selectFilter: PropTypes.func,
};

export default Header;
