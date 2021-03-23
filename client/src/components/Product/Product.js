import React, { useContext, useState } from "react";
import "./Product.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ThemeContext from "../../contexts/ThemeContext";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import AdminContext from "../../contexts/AdminContext";
import UpdatePopup from "../Popups/UpdatePopup";

const Product = ({ sale, image, title, price, id }) => {
  const [admin, setadmin] = useContext(AdminContext);
  const theme = useContext(ThemeContext);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  return (
    <div className="product-card" style={{ background: theme.background }}>
      {admin && (
        <div className="adminButtons">
          <button className="deleteProduct" onClick={() => console.log("delete item")}>
            <CloseOutlined />
          </button>
          <button className="updateProduct" onClick={() => setShowUpdatePopup(true)}>
            <EditOutlined />
          </button>
          {showUpdatePopup && (
            <UpdatePopup
              id={id}
              closePopup={() => {
                setShowUpdatePopup(false);
              }}
            />
          )}
        </div>
      )}
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
