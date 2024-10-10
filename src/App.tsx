// import { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectEdit } from './store/editSlice';
import { selectIsAdd } from './store/addSlice';
import Navbar from './components/Navbar';
import Items from './components/Items';
import Item from './components/Item';
import './App.scss';

function App() {
  const editItem = useSelector(selectEdit);
  const isAdd = useSelector(selectIsAdd);

  const RenderItem = () => {
    if (!isAdd) {
      return editItem ? <Item product={editItem}/> : <></>
    }
    return <Item/>
  }

  return (
    <>
      <Navbar />
      <div className='pageContent'>
        <Items />
        <RenderItem/>
      </div>
    </>
  )
}

export default App
