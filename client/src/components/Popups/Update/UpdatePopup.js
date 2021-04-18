import React, { useContext, useEffect, useState } from "react";
import "./UpdatePopup.css";
import { CloseOutlined } from "@ant-design/icons";
import ProductsContext from "../../../contexts/ProductsContext";

const UpdatePopup = ({ id, closePopup }) => {
  const [products, setProducts] = useContext(ProductsContext);
  const [product, setProduct] = useState({ title: "", price: "", description: "", category: "", image: "" });
  // const [imgUrl, setImgUrl]=useState(null);

  useEffect(() => {
    async function getProduct() {
      const res = await fetch(`/api/products/${id}`); //`https://fakestoreapi.com/products/${match.params.productId}`);
      const json = await res.json();
      setProduct(json);
    }
    getProduct();
  }, [id]);

  const update = async (product, close) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await res.json();

    const newData = products.map((product) => {
      if (product._id === data._id) return data;
      return product;
    });
    setProducts(newData);
    setTimeout(close(), 60000);
  };

  return (
    <div className="popup">
      <div className="popup_inner">
        <button className="close" onClick={closePopup}>
          <CloseOutlined />
        </button>
        <h1 className="update-title">Update product</h1>
        <div className="update-container">
          <div className="left-side">
            <img src={product.image} alt="productImg" />
            <input
              className="input-url"
              type="text"
              name="img"
              value={product.image}
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
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
              ></input>
            </div>
            <div className="details">
              <label htmlFor="category">Category: </label>
              <select
                value={product.category}
                name="category"
                id="category"
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
              >
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
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
              ></textarea>
            </div>
            <button
              className="update-button"
              onClick={() => {
                update(product, closePopup);
              }}
            >
              Update product
            </button>
          </div>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default UpdatePopup;
