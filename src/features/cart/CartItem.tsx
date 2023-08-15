import { formatCurrency } from "../../utils/helpers";
import { Pizza } from "../../entities/Pizza";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { useSelector } from "react-redux";
import { getCurrentQuantityById } from "./cartSlice";

interface Props {
  item: Pizza;
}

function CartItem({ item }: Props) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        {currentQuantity && currentQuantity >= 1 && (
          <UpdateItemQuantity id={pizzaId} currentQuent={currentQuantity} />
        )}
        <DeleteItem type="small" id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
