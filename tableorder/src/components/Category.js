import data from "../data";
import "./CategoryStyle.css";
import { useGlobalContext } from "./../context";
const allCategories = ["전체", ...new Set(data.map((item) => item.category))];

const Category = () => {
  const { toggleCategories } = useGlobalContext();

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <h3 className="category-title">메뉴</h3>
        {allCategories.map((category) => {
          return (
            <button
              key={category}
              className="filter-btn"
              onClick={() => toggleCategories(category)}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
