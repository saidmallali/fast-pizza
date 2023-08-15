import { useSelector } from "react-redux";
import { getTotaleCartItems, getTotaleCartPrice } from "./cartSlice";
import { Link } from "react-router-dom";
function CartOverview() {
  const totaleCartPrice = useSelector(getTotaleCartPrice);
  const totaleCartItems = useSelector(getTotaleCartItems);
  if (!totaleCartItems) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totaleCartItems} pizzas</span>
        <span>${totaleCartPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr; </Link>
    </div>
  );
}

export default CartOverview;
