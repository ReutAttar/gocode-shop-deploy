import React, { useContext } from "react";
import "./Product.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ThemeContext from "../../contexts/ThemeContext";

const Product = ({ sale, image, title, price, id }) => {
  const theme = useContext(ThemeContext);
  return (
    <div className="product-card" style={{ background: theme.background }}>
      {sale && <span className="onSale-label">SALE</span>}
      <div className="product-image">
        <Link to={`/products/${id}`}>
          <img src={image} alt="productImg" />
        </Link>
      </div>
      <div className="product-info">
        <Link to={`/products/${id}`}>
          <h5 style={{ color: theme.foreground }}>{title}</h5>
        </Link>
        {sale ? (
          <div>
            <span className={"sale-price"}>{price * (50 / 100)}$</span>
            <span className={"normal-price"}>{price}$</span>
          </div>
        ) : (
          <h6>{price}$</h6>
        )}
      </div>
    </div>
  );
};

Product.propTypes = {
  sale: PropTypes.bool,
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
};

export default Product;
