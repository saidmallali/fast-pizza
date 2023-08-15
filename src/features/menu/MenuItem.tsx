import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { addItem, increaseItemQuantity } from "../cart/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
interface Pizza {
  id?: number;
  name?: string;
  unitPrice: number;
  imageUrl?: string;
  ingredients?: string[];
  soldOut?: boolean;
}

interface Props {
  pizza: Pizza;
}

function MenuItem({ pizza }: Props) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const existedItem = cart.find((item) => item.pizzaId === id);
  if (!pizza) return null;

  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: 1 * unitPrice,
    };

    if (existedItem) dispatch(increaseItemQuantity(id));
    if (!existedItem) dispatch(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2 ">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients?.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{unitPrice && formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && (
            <Button onClick={handleAddToCart} type="small">
              {existedItem?.pizzaId === id
                ? `Add more to cart: ${existedItem?.quantity}`
                : "Add to cart"}
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
