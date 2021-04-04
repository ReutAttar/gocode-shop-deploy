import React, { useContext, useState } from "react";
import "./AddPopup.css";
import { CloseOutlined, FileImageOutlined } from "@ant-design/icons";
import ProductsContext from "../../../contexts/ProductsContext";
// import AdminContext from "../../contexts/AdminContext";

const AddPopup = ({ closePopup }) => {
  //   const [isError, setIsError] = useState(false);
  //   const [errorMessage, setErrorMessage] = useState("");

  const [products, setProducts] = useContext(ProductsContext);
  const [product, setProduct] = useState({ title: "", price: "", description: "", category: "", image: "" });

  const add = async (product, close) => {
    const res = await fetch(`/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await res.json();

    if (data) {
      setProducts([data, ...products]);
      setTimeout(close(), 60000);
    } else {
      console.log("error add");
    }
  };

  return (
    <div className="popup">
      <div className="popup_inner">
        <button className="close" onClick={closePopup}>
          <CloseOutlined />
        </button>
        <h1 className="add-title">Add product</h1>
        <div className="add-container">
          <div className="left-side">
            {product.image ? (
              <img src={product.image} alt="productImg" />
            ) : (
              <div style={{ margin: "auto" }}>
                <FileImageOutlined style={{ fontSize: "150px" }} />
              </div>
            )}
            <input
              className="input-url"
              type="text"
              name="img"
              value={product.image}
              placeholder="add image url address"
              onChange={(e) => setProduct({ ...product, image: e.target.value })}
            ></input>
          </div>
          <div className="right-side">
            <div className="details">
              <label htmlFor="title">Title: </label>
              <input
                style={{ width: "100%" }}
                type="text"
                name="title"
                id="title"
                value={product.title}
                placeholder="add title"
                onChange={(e) => setProduct({ ...product, title: e.target.value })}
              ></input>
            </div>
            <div className="details">
              <label htmlFor="price">Price: </label>
              <input
                type="number"
                name="price"
                id="price"
                value={product.price}
                placeholder="add price"
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
              ></input>
            </div>
            <div className="details">
              <label htmlFor="category">Category: </label>
              <select
                name="category"
                id="category"
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
              >
                <option value="choose category" disabled selected>
                  choose category
                </option>
                <option value="men clothing">men clothing</option>
                <option value="jewelry">jewelry</option>
                <option value="electronics">electronics</option>
                <option value="women clothing">women clothing</option>
              </select>
            </div>
            <div className="details description">
              <label htmlFor="description">Description: </label>
              <textarea
                rows="10"
                // cols="30"
                name="description"
                id="description"
                value={product.description}
                placeholder="add description of the product"
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
              ></textarea>
            </div>
            <button
              className="add-button"
              onClick={() => {
                add(product, closePopup);
              }}
            >
              Add product
            </button>
          </div>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default AddPopup;
