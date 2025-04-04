import { ProductType } from '../types/products';

export const getProducts = async (): Promise<ProductType[]> => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const products: ProductType[] = await response.json();
        return products; // Retorna el array de productos
    } catch (error) {
        console.error("Error fetching products:", error);
        return []; // Retornar un array vacío en caso de error
    }
};
