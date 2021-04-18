import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import "./Cart.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import ProductsContext from "../../contexts/ProductsContext";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  const [products, setProducts] = useContext(ProductsContext);

  const calcTotalPrice = (productId, amount) => {
    const product = products.find((p) => p._id === productId);
    // console.log(product);
    return product ? (product.price * amount).toFixed(2) : 0;
  };

  const getProductDetails = (productId, detail) => {
    // console.log(products);
    const product = products.find((p) => p._id === productId);
    // console.log(product);
    return product ? product[detail] : null;
  };

  return (
    <div className="cart-container">
      <div className="processing"></div>
      <div className="products-list-wrapper">
        {cart &&
          cart.products.map(({ product, amount }) => (
            <div className="product-item" key={product}>
              <Link className="image-link" to={`/products/${product}`}>
                <img className="cart-image" alt="example" src={getProductDetails(product, "image")} />
              </Link>
              <div className="cart-product-info-wrapper">
                <div className="cart-product-info">
                  <h1>{getProductDetails(product, "title")}</h1>
                  <div>
                    <span>amount: {amount}</span>
                    <div>price: {getProductDetails(product, "price")}$</div>
                  </div>
                </div>
                <div className="cart-product-total">
                  <span>{calcTotalPrice(product, amount)}</span>$
                </div>
              </div>
              {/* <Card
                hoverable
                cover={
                  <Link to={`/products/`}>
                    <img className="card-image" alt="example" src={getProductDetails(product, "image")} />
                  </Link>
                }
              >
                <Meta
                  title={getProductDetails(product, "title")}
                  description={
                    <div>
                      <div>price: {getProductDetails(product, "price")}$</div>
                      <span>amount: {amount}</span>
                    </div>
                  }
                />
              </Card> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cart;
