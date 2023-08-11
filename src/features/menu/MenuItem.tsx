import { formatCurrency } from "../../utils/helpers";

interface Pizza {
  id?: number;
  name?: string;
  unitPrice?: number;
  imageUrl?: string;
  ingredients?: string[];
  soldOut?: boolean;
}

interface Props {
  pizza: Pizza;
}

function MenuItem({ pizza }: Props) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  if (!pizza) return null;
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <div>
        <p>{name}</p>
        <p>{ingredients?.join(", ")}</p>
        <div>
          {!soldOut ? (
            <p>{unitPrice && formatCurrency(unitPrice)}</p>
          ) : (
            <p>Sold out</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
