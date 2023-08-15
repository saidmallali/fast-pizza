import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import Button from "../../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import { getUserName } from "../user/userSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useSelector(getUserName);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const handelClear = () => {
    dispatch(clearCart());
  };

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={`${item.name}-${item.pizzaId}`} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button to="/order/new">Order pizzas</Button>
        <Button onClick={handelClear} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
