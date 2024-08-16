import "./MenuListStyle.css";
import Item from "./Item";
import { useGlobalContext } from "./../context";
const MenuList = () => {
  const { menus } = useGlobalContext();
  return (
    <section className="section">
      <div className="menulist-container">
        <div className="menulist-center">
          {menus.map((item) => {
            return <Item key={item.id} {...item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default MenuList;
