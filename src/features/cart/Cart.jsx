import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "../../features/cart/CartItem";
import { useSelector } from "react-redux";

function Cart() {
  const cart = useSelector((store) => store.cart.cart);
  const userName = useSelector((store) => store.user.userName);

  return (
    <div className="px-4 py-4 ">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mb-4 text-3xl">Your cart, {userName}</h2>
      <ul
        className="mb-4 divide-y divide-stone-200
      border-b"
      >
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
