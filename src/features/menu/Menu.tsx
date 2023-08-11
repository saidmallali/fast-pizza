import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { Pizza } from "../../entities/Pizza";

function Menu() {
  const menu = useLoaderData() as Pizza[];

  return (
    <ul>
      {/* { menu.map((pizza) => <MenuItem key={pizza.id} pizza={pizza} />)} */}
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
