// import { useState } from 'react'
import { useSelector } from "react-redux";
import { selectEdit } from "./store/editSlice";
import Navbar from "./components/Navbar";
import Items from "./components/Items";
import Item from "./components/Item";
import "./App.scss";

function App() {
  const editItem = useSelector(selectEdit);
  return (
    <>
      <Navbar />
      <div className="pageContent">
        <Items />
        {editItem ? <Item product={editItem} key={editItem.id} /> : <></>}
      </div>
    </>
  );
}

export default App;
