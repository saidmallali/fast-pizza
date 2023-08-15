import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import {
  addItem,
  getCurrentQuantityById,
  getPizzaItemById,
  increaseItemQuantity,
} from "../cart/cartSlice";
import { useSelector } from "react-redux";
import { Pizza } from "../../entities/Pizza";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

interface Props {
  pizza: Pizza;
}

function MenuItem({ pizza }: Props) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  console.log("cureentQuent", currentQuantity);
  const pizzaItem = useSelector(getPizzaItemById(id));
  console.log("pizzaItem", pizzaItem);
  if (!pizza) return null;
  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: 1 * unitPrice,
    };

    dispatch(addItem(newItem));
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
            <>
              {currentQuantity && currentQuantity >= 1 && (
                <div className="flex items-center gap-3 sm:gap-8">
                  <UpdateItemQuantity id={id} currentQuent={currentQuantity} />
                  <DeleteItem type="small" id={id} />
                </div>
              )}

              {!currentQuantity && (
                <Button onClick={handleAddToCart} type="small">
                  {pizzaItem?.pizzaId === id
                    ? `Add to cart: ${pizzaItem?.quantity}`
                    : "Add to cart"}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
