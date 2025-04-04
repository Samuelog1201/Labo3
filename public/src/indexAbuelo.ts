import * as components from "./components/indexPadre";
import Product, { Attribute } from "./components/product/product";
import { getProducts } from "./services/getProducts";

class AppContainer extends HTMLElement {
    cards: Product[] = []; // Arreglo de tarjetas

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.loadData(); // Cargamos los datos de productos
    }

    async loadData() {
        try {
            const products = await getProducts(); 

            // Creamos una tarjeta para cada producto
            products.forEach((product) => {
                const card = this.ownerDocument.createElement("my-product") as Product;
                card.setAttribute(Attribute.image, product.image);
                card.setAttribute(Attribute.productTitle, product.title);
                card.setAttribute(Attribute.description, product.description);
                card.setAttribute(Attribute.category, product.category);
                card.setAttribute(Attribute.price, product.price.toString());
                card.setAttribute(Attribute.rating, product.rating.toString());
                this.cards.push(card);
            });

            this.render(); // Renderiza los productos una vez cargados
        } catch (error) {
            console.error("Error loading products:", error);
        }
    }

    render() {
        const shadowRoot = this.shadowRoot;
        if (shadowRoot) {
            shadowRoot.innerHTML = ''; // Limpiamos antes de renderizar

            this.cards.forEach((card) => {
                if (card) {
                    shadowRoot.appendChild(card); // Añadimos cada tarjeta al shadow DOM
                }
            });
        } else {
            console.error("Shadow root is null");
        }
    }
}

customElements.define("app-container", AppContainer);
