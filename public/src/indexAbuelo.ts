import * as components from "./components/indexPadre";
import Product, { Attribute } from "./components/product/product";
import { getProducts } from "./services/getProducts";

class AppContainer extends HTMLElement {
    cards: Product[] = []; 
    popUp?: HTMLElement;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.loadData(); 
    }

    async loadData() {
        try {
            const products = await getProducts(); 

            products.forEach((product) => {
                const card = this.ownerDocument.createElement("my-product") as Product;
                card.setAttribute(Attribute.image, product.image);
                card.setAttribute(Attribute.title, product.title);
                card.setAttribute(Attribute.description, product.description);
                card.setAttribute(Attribute.category, product.category);
                card.setAttribute(Attribute.price, product.price.toString());
                card.setAttribute(Attribute.rating, product.rating.toString());

                card.addEventListener('click', () => {
                    this.showDetails(product);
                });

                this.cards.push(card);
            });

            this.render(); 
        } catch (error) {
            console.error("Error loading products:", error);
        }
    }

    showDetails(product: any) {
        if (!this.popUp) {
            this.createPopUp(product);
        }
        this.popUp!.style.display = 'block';  
    }

    createPopUp(product: any) {
        this.popUp = document.createElement('div');
        this.popUp.style.position = 'fixed';
        this.popUp.style.top = '0';
        this.popUp.style.left = '0';
        this.popUp.style.width = '100vw';
        this.popUp.style.height = '100vh';
        this.popUp.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        this.popUp.style.display = 'none';
        this.popUp.style.justifyContent = 'center';
        this.popUp.style.alignItems = 'center';
        this.popUp.style.zIndex = '9999';

        const content = document.createElement('div');
        content.style.backgroundColor = 'white';
        content.style.padding = '20px';
        content.style.borderRadius = '10px';
        content.innerHTML = `
            <h1>${product.title}</h1>
            <p>${product.description}</p>
            <h2>Price: $${product.price}</h2>
            <h2>Rating: ${product.rating}</h2>
            <button id="closeButton">Close</button>
        `;

        this.popUp.appendChild(content);

        this.shadowRoot?.appendChild(this.popUp);

        const closeButton = this.popUp.querySelector('#closeButton');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.popUp!.style.display = 'none';  
            });
        }
    }

    render() {
        const shadowRoot = this.shadowRoot;
        if (shadowRoot) {
            shadowRoot.innerHTML = `
                <style>
                    .product-container {
                        display: flex;
                        gap: 1rem;
                        overflow-x: auto;
                        padding: 1rem;
                        scroll-snap-type: x mandatory;
                    }

                    .product-container::-webkit-scrollbar {
                        height: 8px;
                    }

                    .product-container::-webkit-scrollbar-thumb {
                        background: #ccc;
                        border-radius: 4px;
                    }

                    .product-container > my-product {
                        scroll-snap-align: start;
                        flex: 0 0 auto;
                    }
                </style>
                <div class="product-container"></div>
            `;
    
            const container = shadowRoot.querySelector(".product-container");
            if (container) {
                this.cards.forEach((card) => {
                    container.appendChild(card);
                });
            }
        } else {
            console.error("Shadow root is null");
        }
    }
}

customElements.define("app-container", AppContainer);