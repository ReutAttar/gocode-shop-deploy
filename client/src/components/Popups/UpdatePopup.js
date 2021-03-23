import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { CloseOutlined } from "@ant-design/icons";
import AdminContext from "../../contexts/AdminContext";

const UpdatePopup = ({ id, closePopup }) => {
  //   const [inputEmail, setInputEmail] = useState("");
  //   const [inputPassword, setInputPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //   const [admin, setadmin] = useContext(AdminContext);
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function getProduct() {
      const res = await fetch(`/api/products/${id}`); //`https://fakestoreapi.com/products/${match.params.productId}`);
      const json = await res.json();
      console.log(json);
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
    console.log(data);
    // if (data) {
    //   if (data.errorMessage) {
    //     setErrorMessage(data.errorMessage);
    //     setIsError(true);
    //   } else {
    //     // setadmin(true);
    //     setIsError(false);
    //     // setTimeout(close(), 60000);
    //   }
    // }
  };

  return (
    <div className="popup">
      <div className="popup_inner">
        <button className="close" onClick={closePopup}>
          <CloseOutlined />
        </button>
        <div className="update">
          <h1>update product</h1>
          <div className="left-side">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              placeholder="add title"
            ></input>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              placeholder="add price"
            ></input>
            <label for="category">Category:</label>
            <select name="category" id="category">
              <option value="men clothing">men clothing</option>
              <option value="jewelry">jewelry</option>
              <option value="electronics">electronics</option>
              <option value="women clothing">women clothing</option>
            </select>
            <input
              type="text"
              name="img"
              value={product.image}
              onChange={(e) => setProduct({ ...product, image: e.target.value })}
              placeholder="add image url address"
            ></input>
          </div>
          <div className="right-side">
            <textarea
              rows="3"
              cols="30"
              name="description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              placeholder="add description of the product"
            ></textarea>
            <button
              onClick={() => {
                update(product, closePopup);
                //   setInputEmail("");
                //   setInputPassword("");
              }}
            >
              Add product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePopup;
