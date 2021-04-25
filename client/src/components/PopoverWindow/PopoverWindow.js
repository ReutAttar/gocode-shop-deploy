import "./PopoverWindow.css";
import { Card, Popover } from "antd";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../contexts/CartContext";
import ProductsContext from "../../contexts/ProductsContext";
import { ShoppingCartOutlined } from "@ant-design/icons";

const PopoverWindow = () => {
  const [cart, setCart] = useContext(CartContext);
  const [products, setProducts] = useContext(ProductsContext);
  const [clickedPopover, setClickedPopover] = useState(false);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    // { width: 768, itemsToShow: 3 },
  ];

  useEffect(() => {
    if (!cart)
      setCart({
        products: [],
        timeStump: Date.now(),
        isCheckedOut: false,
      });
  }, [cart, setCart]);

  var reducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
  };

  const calcTotalAmount = () => {
    return cart ? (cart.products.length === 0 ? 0 : cart.products.map(({ amount }) => amount).reduce(reducer)) : 0;
  };

  const calcTotalPay = () => {
    return cart
      ? cart.products.length === 0
        ? 0
        : cart.products
            .map((product) => {
              const oneProduct = products.find((p) => p._id === product.product);
              return oneProduct ? oneProduct.price * product.amount : 0;
            })
            .reduce(reducer)
            .toFixed(2)
      : 0;
  };

  const getProductDetails = (productId, detail) => {
    const product = products.find((p) => p._id === productId);
    return product ? product[detail] : null;
  };
  const removeProduct = (productId) => {
    const newProducts = cart.products.filter((p) => p.product !== productId);
    setCart({ ...cart, products: newProducts });
  };

  return (
    <Popover
      content={
        cart &&
        (cart.products.length === 0 ? (
          <div className="empty-cart">
            <img src="https://www.apnashopping.in/assets/img/payment/Empty-Cart.jpg" alt="empty-cart"></img>
          </div>
        ) : (
          <div className="cart-menu">
            <div className="cart-menu-details">
              <div>
                <p>{calcTotalAmount()} products at cart</p>
                {/* <Link to={"/cart"}>View shopping cart</Link> */}
              </div>
              <div>
                <div>
                  Total: <span>{calcTotalPay()}</span>$
                </div>
                <Link to={"/cart"} onClick={() => setClickedPopover(false)}>
                  <button className="view-cart">View shopping cart</button>
                </Link>
              </div>
            </div>
            <div className="cart-menu-carousel">
              <Carousel itemPadding={[10, 5]} breakPoints={breakPoints}>
                {cart.products.map(({ product, amount }) => (
                  <Link to={`/products/${product}`} key={product} onClick={() => setClickedPopover(false)}>
                    <Card
                      hoverable
                      cover={<img className="card-image" alt="example" src={getProductDetails(product, "image")} />}
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
                      <div className="remove-btn-div">
                        <button
                          className="remove-product-btn"
                          onClick={(ev) => {
                            ev.preventDefault();
                            removeProduct(product);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
        ))
      }
      trigger="click" //"hover"
      visible={clickedPopover}
      onVisibleChange={setClickedPopover}
    >
      <span className="shopping-cart">
        <ShoppingCartOutlined style={{ fontSize: "40px", verticalAlign: "middle" }} />
        <span className="cart-amount">{calcTotalAmount()}</span>
      </span>
    </Popover>
  );
};

export default PopoverWindow;
