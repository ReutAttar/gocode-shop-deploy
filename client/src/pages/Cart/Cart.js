import "./Cart.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import ProductsContext from "../../contexts/ProductsContext";
import Swal from "sweetalert2";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  const [products, setProducts] = useContext(ProductsContext);

  var reducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
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

  const calcTotalPrice = (productId, amount) => {
    const product = products.find((p) => p._id === productId);
    return product ? (product.price * amount).toFixed(2) : 0;
  };

  const getProductDetails = (productId, detail) => {
    const product = products.find((p) => p._id === productId);
    return product ? product[detail] : null;
  };

  const removeProduct = (productId) => {
    const newProducts = cart.products.filter((p) => p.product !== productId);
    setCart({ ...cart, products: newProducts });
  };
  const plus = (productId) => {
    setCart({
      ...cart,
      products: cart.products.map(({ product, amount }) =>
        product === productId ? { product, amount: +amount + 1 } : { product, amount }
      ),
    });
  };
  const minus = (productId) => {
    setCart({
      ...cart,
      products: cart.products.map(({ product, amount }) =>
        product === productId
          ? amount > 1
            ? { product, amount: +amount - 1 }
            : { product, amount }
          : { product, amount }
      ),
    });
  };
  const updateAmount = (productId, value) => {
    console.log(value);
    setCart({
      ...cart,
      products: cart.products.map(({ product, amount }) =>
        product === productId ? { product, amount: value } : { product, amount }
      ),
    });
  };

  return (
    cart &&
    (cart.products.length === 0 ? (
      <div className="empty-cart">
        <img src="https://www.apnashopping.in/assets/img/payment/Empty-Cart.jpg" alt="empty-cart"></img>
        <Link to={"/"} style={{ textAlign: " center" }}>
          <button className="to-purchase-btn">To purchase</button>
        </Link>
      </div>
    ) : (
      <div className="cart-container">
        <div className="products-list-wrapper">
          {cart.products.map(({ product, amount }) => (
            <div className="product-item" key={product}>
              <Link className="link-cart-product" to={`/products/${product}`}>
                <img className="cart-product-image" alt="example" src={getProductDetails(product, "image")} />
              </Link>
              <div className="cart-product-info-wrapper">
                <div className="cart-product-info">
                  <Link to={`/products/${product}`}>
                    <h1>{getProductDetails(product, "title")}</h1>
                  </Link>
                  <div>
                    <div className="input_group">
                      <span className="amount-span">amount:</span>
                      <button className="btn minus" onClick={() => minus(product)}>
                        -
                      </button>
                      <input
                        className="input-field"
                        type="number"
                        min="1"
                        value={amount}
                        onChange={(e) => {
                          console.log(e.target.value);
                          updateAmount(product, +e.target.value);
                        }}
                      />
                      <button className="btn plus" onClick={() => plus(product)}>
                        +
                      </button>
                    </div>

                    <div>price: {getProductDetails(product, "price")}$</div>
                  </div>
                </div>
                <div className="cart-product-total">
                  <div className="div-total-price">
                    <span>{calcTotalPrice(product, amount)}</span>$
                  </div>
                  <button
                    className="remove-product-btn"
                    onClick={() =>
                      Swal.fire({
                        title: "Are you sure you want to remove this product?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Yes, remove it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          removeProduct(product);
                        }
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="processing">
          <div className="cart-summary">
            <div className="cart-summary-title">
              <h4>Order Summary</h4>
            </div>
            <div className="order-summary">
              <div className="cart-subtotal">
                <span>subtotal</span>
                <span className="total-pay">{calcTotalPay()}$</span>
              </div>
              <div>
                <button className="check-btn">checkout securely</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  );
};

export default Cart;
