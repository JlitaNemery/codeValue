import { Product } from "./types/types";

export const defaultProduct: Omit<Product, "creationDate"> = {
  id: 0,
  name: "",
  description: "",
  price: 1,
};

const defaultProducts: Product[] = [
  {
    id: 3,
    name: "Eitan Lavi",
    description: "My name is Eitan",
    price: 40,
    creationDate: 1,
  },
  {
    id: 4,
    name: "Web Developer",
    description: `I build the web`,
    price: 40,
    creationDate: new Date().getTime(),
  },
];

export default defaultProducts;
