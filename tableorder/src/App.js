import {
  Navbar,
  Category,
  MenuList,
  AddItems,
  ModalItem,
  OrderCheck,
  OrderCompleted,
} from "./components/";
import "./index.css";

function App() {
  return (
    <main>
      <Navbar />
      <Category />
      <MenuList />
      <AddItems />
      <ModalItem />
      <OrderCheck />
      <OrderCompleted />
    </main>
  );
}

export default App;
