import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAdd } from '../store/addSlice';
import { setItem, clearById } from '../store/editSlice';
import { selectProducts, sortByName, sortByDate, removeItem, setAll } from '../store/productsSlice';
import { useDebounce } from 'use-debounce';
import defaultProducts from '../defaultProducts';
import './scss/Items.scss';
import viteLogo from '/vite.svg';
import { Product } from '../types/types';

export default function Items() {
    const dispatch = useDispatch();
    const items = useSelector(selectProducts);
    const [searchVal, setSearchVal] = useState('');
    const [debouncedFilter] = useDebounce(searchVal, 400);

    useEffect(() => {
        const localItemsStr = localStorage.getItem('products');        
        if (localItemsStr !== null && localItemsStr !== 'undefined') {
            const localItems = JSON.parse(localItemsStr);
            dispatch(setAll(localItems));
        } else {
            dispatch(setAll(defaultProducts));
        }
        dispatch(sortByName());
    }, []);

    const sortItems = (sortBy: string) => {
        if (sortBy === 'name') {
            dispatch(sortByName());
        } else {
            dispatch(sortByDate());
        }
    }

    const deleteItem = (i: number) => {        
        dispatch(clearById(items[i].id));
        dispatch(removeItem(i));
    }

    const filterDebounce = (item: Product) => {
        if (debouncedFilter !== '') {
            const debouncedFilterLower = debouncedFilter.toLowerCase();
            const descriptionLower = item.description.toLowerCase();
            const nameLower = item.name.toLowerCase();
            if (descriptionLower.includes(debouncedFilterLower) || nameLower.includes(debouncedFilterLower)) {
                return true;
            }
            return false;
        }
        return true;
    };

    return (
        <div className="itemsEnv">
            <div className="itemsNav">
                <div className="add">
                    <button onClick={() => dispatch(setIsAdd())}>+ add</button>
                </div>
                <div className="search">
                    <input type="text" onChange={(e) => setSearchVal(e.target.value)}/>
                </div>
                <div className="sorter">
                    <label className="title">Sort by
                        <select
                            onChange={(e) => sortItems(e.target.value)}
                        >
                            <option value='name'>name</option>
                            <option value='date'>date</option>
                        </select>
                    </label>
                </div>
                
            </div>
            {items.filter((item) => filterDebounce(item)).map((item, i) => (
                <div className="item" key={i}>
                    <div className="clickable"  onClick={() => dispatch(setItem(item))}>
                        <div className="img">
                            <img src={viteLogo} className="logo" alt="Vite logo" />
                        </div>
                        <div className="itemText">
                            <h4>{`Product ${item.name}`}</h4>
                            <span>{item.description}</span>
                        </div>
                    </div>
                    <div className="delete">
                        <button
                            onClick={() => deleteItem(i)}
                        >Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
};