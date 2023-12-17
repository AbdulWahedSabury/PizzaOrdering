import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "../../features/cart/CartItem";
import { useSelector } from "react-redux";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;
  const userName = useSelector((store)=>store.user.userName)

  return (
    <div className="px-4 py-4 ">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mb-4 text-3xl">Your cart, {userName}</h2>
      <ul className="divide-y divide-stone-200 border-b
      mb-4">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
      <div className="space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type='secondary'>Clear cart</Button >
      </div>
    </div>
  );
}

export default Cart;
