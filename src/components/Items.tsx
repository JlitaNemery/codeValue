import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "../store/store";
import { selectProducts, removeItem } from "../store/productsSlice";
import { useDebounce } from "use-debounce";
import "./scss/Items.scss";
import viteLogo from "/vite.svg";
import { Product } from "../types/types";

const ITEMS_PER_PAGE = 5;

export default function Items() {
  const dispatch = useDispatch();
  const items = useSelector(selectProducts);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [searchVal, setSearchVal] = useState("");
  const [debouncedFilter] = useDebounce(searchVal, 400);
  const navigate = useNavigate();

  store.subscribe(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(store.getState().products.value)
    );
  });

  useEffect(() => {
    setPage(0);
  }, [sortBy, debouncedFilter]);

  const sortItems = (a: Product, b: Product) => {
    if (sortBy === "name") {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    } else {
      return b.creationDate - a.creationDate;
    }
  };

  const deleteItem = (id: number, numItems: number) => {
    if (numItems % (ITEMS_PER_PAGE - 1) === 1 && page > 0) {
      setPage((prev) => prev - 1);
    }
    dispatch(removeItem(id));
  };

  const filterDebounce = (item: Product) => {
    if (debouncedFilter !== "") {
      const debouncedFilterLower = debouncedFilter.toLowerCase();
      const descriptionLower = item.description.toLowerCase();
      const nameLower = item.name.toLowerCase();
      if (
        descriptionLower.includes(debouncedFilterLower) ||
        nameLower.includes(debouncedFilterLower)
      ) {
        return true;
      }
      return false;
    }
    return true;
  };

  const renderItems = items
    .filter((item) => filterDebounce(item))
    .sort((a: Product, b: Product) => sortItems(a, b));

  return (
    <div className="itemsEnv">
      <div className="itemsNav">
        <div className="add">
          <button
            onClick={() =>
              navigate("/new", {
                state: {
                  product: { id: 0, name: "", description: "", price: 1 },
                },
              })
            }
          >
            + add
          </button>
        </div>
        <div className="search">
          <input type="text" onChange={(e) => setSearchVal(e.target.value)} />
        </div>
        <div className="sorter">
          <label className="title">
            Sort by
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">name</option>
              <option value="date">date</option>
            </select>
          </label>
        </div>
      </div>
      {renderItems
        .slice(
          page * (ITEMS_PER_PAGE - 1),
          page * (ITEMS_PER_PAGE - 1) + ITEMS_PER_PAGE - 1
        )
        .map((item) => (
          <div className="item" key={item.id}>
            <div
              className="clickable"
              onClick={() =>
                navigate(`/:${item.id}`, { state: { product: item } })
              }
            >
              <div className="img">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </div>
              <div className="itemText">
                <h4>{`Product ${item.name}`}</h4>
                <span>{item.description}</span>
              </div>
            </div>
            <div className="delete">
              <button onClick={() => deleteItem(item.id, renderItems.length)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      <div className="paging">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page ? false : true}
        >
          prev page
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={
            page + 1 < Math.ceil(renderItems.length / (ITEMS_PER_PAGE - 1))
              ? false
              : true
          }
        >
          next page
        </button>
      </div>
    </div>
  );
}
