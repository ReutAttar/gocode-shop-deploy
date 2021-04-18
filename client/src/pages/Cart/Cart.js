import { useContext } from "react";
import CartContext from "../../contexts/CartContext";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);

  return (
    <div className="cart-container">
      {cart ? cart.products.map(({ product, amount }) => <div>{product}</div>) : <div>Your cart is empty</div>}
    </div>
  );
};

export default Cart;
