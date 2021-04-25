import { HeartOutlined } from "@ant-design/icons";
import { notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../contexts/CartContext";
import SaleContext from "../../contexts/SaleContext";
import "./ProductPage.css";

const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});
  const [sale] = useContext(SaleContext);
  const [cart, setCart] = useContext(CartContext);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/products/${match.params.productId}`); //`https://fakestoreapi.com/products/${match.params.productId}`);
      const json = await res.json();
      setProduct(json);
    }

    fetchData();
  }, [match.params.productId]);

  const AddProductToCart = (productId) => {
    const isProductExist = cart.products.find((product) => product.product === productId);
    if (isProductExist) {
      setCart({
        ...cart,
        products: cart.products.map(({ product, amount }) =>
          product === productId ? { product, amount: +amount + 1 } : { product, amount }
        ),
      });
    } else {
      const newProduct = { product: productId, amount: 1 };
      setCart({ ...cart, products: [...cart.products, newProduct] });
    }
  };

  const openNotification = (placement) => {
    notification.open({
      message: "Item added to cart",
      description: (
        <div className="description-add-product">
          <div
            style={{
              marginRight: "5px",
            }}
          >
            <div className="product-title">{product.title}</div>
            {sale && product.price > 60 ? (
              <div>
                <span className={"sale-price"}>{product.price * (50 / 100)}$</span>
                <span className={"normal-price"}>{product.price}$</span>
              </div>
            ) : (
              <h6>{product.price}$</h6>
            )}
          </div>
          <img src={product.image} alt="productImg" />
        </div>
      ),
      placement,
      duration: 2,
    });
  };

  return product ? (
    <div className="container">
      <div className="left">
        {sale && product.price > 60 && <span className="onSale-label">SALE</span>}
        <div className="images">
          <img src={product.image} alt="productImg" />
        </div>
        <div className="slideshow-buttons">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
          <div className="four"></div>
        </div>
        {(product.category === "women clothing" ||
          (product.category === "men clothing" &&
            product.title !== "FJALLRAVEN - FOLDSACK NO. 1 BACKPACK, FITS 15 LAPTOPS")) && (
          <React.Fragment>
            <p className="pick pTitle">choose size</p>
            <div className="sizes">
              <div className="size">5</div>
              <div className="size">6</div>
              <div className="size">7</div>
              <div className="size">8</div>
              <div className="size">9</div>
              <div className="size">10</div>
              <div className="size">11</div>
              <div className="size">12</div>
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="right">
        <div className="product">
          <p className="pCategory pTitle">{product.category}</p>
          <h1 id="productTitle">{product.title}</h1>
          {sale && product.price > 60 ? (
            <div>
              <span className={"sale-price"}>{product.price * (50 / 100)}$</span>
              <span className={"normal-price"}>{product.price}$</span>
            </div>
          ) : (
            <h6>{product.price}$</h6>
          )}
          <p className="desc">{product.description}</p>

          <div className="buttons">
            <button
              className="add"
              onClick={() => {
                AddProductToCart(product._id);
                openNotification("topRight");
              }}
            >
              Add to Cart
            </button>
            {/* <button className="like">
              <span>
                <HeartOutlined />
              </span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ProductPage;
