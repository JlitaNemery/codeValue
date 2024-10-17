import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Items from "./components/Items";
import Item from "./components/Item";
import "./App.scss";

function App() {
  const location = useLocation();

  const RenderRoutes = () => {
    const product = location?.state?.product;
    return product ? (
      <Routes>
        <Route path="/new" element={<Item product={product} />} />
        <Route
          path={`/:id`}
          element={<Item product={product} key={product.id} />}
        />
      </Routes>
    ) : (
      <></>
    );
  };

  return (
    <>
      <Navbar />
      <div className="pageContent">
        <Items />
        <RenderRoutes />
      </div>
    </>
  );
}

export default App;
