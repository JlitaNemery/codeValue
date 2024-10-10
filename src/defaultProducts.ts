import { Product } from "./types/types";

const defaultProducts:Product[] = [
    {
        id: 3,
        name: 'z',
        description: 'z',
        price: 40,
        creationDate: 1
    },
    {
        id: 4,
        name: 'a',
        description: 'd',
        price: 40,
        creationDate: new Date().getTime()
    }
];

export default defaultProducts;