import { useState } from "react";
import { Product } from "../types/types";
import { editItem, addItem } from "../store/productsSlice";
import { useDispatch } from "react-redux";
import viteLogo from "/vite.svg";
import "./scss/Item.scss";
import { clear } from "../store/editSlice";

interface ItemProps {
  product: Product | Omit<Product, "creationDate"> | null;
}

export default function Item({ product }: ItemProps) {
  const dispatch = useDispatch();
  console.log(product?.id);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 1,
  });
  const [formValidation, setFormValidation] = useState({
    name: true,
    description: true,
    price: true,
  });
  const [canSave, setCanSave] = useState(false);

  const handleChange = (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    let isValidated = true;
    switch (name) {
      case "name":
        if (value.length < 1 || value.length > 30) {
          isValidated = false;
        }
        break;
      case "description":
        if (value.length > 200) {
          isValidated = false;
        }
        break;
      case "price":
        if (value) {
          const intval = parseInt(value);
          if (intval <= 0) {
            isValidated = false;
          }
        } else {
          isValidated = false;
        }
        break;
    }
    let isAllValidated = true;
    for (const [, val] of Object.entries(formValidation)) {
      if (!val) {
        isAllValidated = false;
      }
    }
    setCanSave(isAllValidated);
    setFormValidation((prev) => ({ ...prev, [name]: isValidated }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(product);
    if (product && product.id != 0) {
      dispatch(
        editItem({
          id: product.id,
          name: formData.name,
          description: formData.description,
          price: formData.price,
        })
      );
      alert(
        `Saved the item:\nName: ${formData.name}, \ndescription: ${formData.description}, \nprice: ${formData.price}`
      );
    } else {
      dispatch(
        addItem({
          name: formData.name,
          description: formData.description,
          price: formData.price,
        })
      );
      alert(
        `Saved new item: \nName: ${formData.name}, \ndescription: ${formData.description}, \nprice: ${formData.price}`
      );
    }
    dispatch(clear());
  };

  return (
    <div className="product">
      <h4 className="title">{`Product ${formData.name} details`}</h4>
      <div className="img">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </div>
      <form className="itemForm" onSubmit={handleSubmit}>
        <div className="nameInput field">
          <label htmlFor="name">Name:</label>
          {formValidation.name ? (
            <></>
          ) : (
            <div className="error">
              must have a name shorter then 20 characters
            </div>
          )}
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="descriptionInput field">
          <label htmlFor="description">Description:</label>
          {formValidation.description ? (
            <></>
          ) : (
            <div className="error">
              description needs to have up to 200 characters
            </div>
          )}
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="priceInput field">
          <label htmlFor="price">Price:</label>
          {formValidation.price ? (
            <></>
          ) : (
            <div className="error">price must be positive</div>
          )}
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="saveButton">
          <button type="submit" disabled={!canSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
