import React, { useContext, useState } from "react";
import "./Product.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ThemeContext from "../../contexts/ThemeContext";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AdminContext from "../../contexts/AdminContext";
import UpdatePopup from "../Popups/Update/UpdatePopup";
import Swal from "sweetalert2";
import ProductsContext from "../../contexts/ProductsContext";

const Product = ({ sale, image, title, price, id }) => {
  const [admin] = useContext(AdminContext);
  const theme = useContext(ThemeContext);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [products, setProducts] = useContext(ProductsContext);

  const deleteProduct = async () => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(product),
    });

    const data = await res.json();

    if (data) {
      setProducts(data);
      Swal.fire("Deleted!", "The product has been deleted.", "success");
    } else {
      console.log("ERROR DELETE");
    }
  };

  return (
    <div className="product-card" style={{ background: theme.background }}>
      {admin && (
        <div className="adminButtons">
          <button
            className="deleteProduct"
            onClick={() =>
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteProduct();
                }
              })
            }
          >
            <DeleteOutlined />
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
