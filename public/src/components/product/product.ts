// src/components/Product/Product.ts
import { ProductType } from '../../types/products'

export enum Attribute {
    "image" = "image",
    "productTitle" = "title",
    "description" = "description",
    "category" = "category",
    "price" = "price",
    "rating" = "rating",
}

class Product extends HTMLElement {
    image?: string;
    productTitle?: string;
    description?: string;
    category?: string;  
    price?: string;
    rating?: string;

    static get observedAttributes() {
        return Object.keys(Attribute); // Esto observará cambios en los atributos del componente
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    attributeChangedCallback(propName: string, _: string, newValue: string) {
        switch (propName) {
            case Attribute.image:
                this.image = newValue;
                break;
            case Attribute.productTitle:
                this.productTitle = newValue;
                break;
            case Attribute.description:
                this.description = newValue;
                break;
            case Attribute.category:
                this.category = newValue;
                break;
            case Attribute.price:
                this.price = newValue;
                break;
            case Attribute.rating:
                this.rating = newValue;
                break;
            default:
                break;
        }
        this.render();  // Re-renderizar cada vez que se cambie un atributo
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                            <style>
                :host {
                    display: block;
                    max-width: 300px;
                    margin: 1rem;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                section {
                    background-color: #fff;
                    border-radius: 16px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    padding: 16px;
                    transition: transform 0.2s ease-in-out;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }

                section:hover {
                    transform: translateY(-4px);
                }

                img.image-character {
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                    border-radius: 12px;
                }

                h1 {
                    font-size: 1.2rem;
                    color: #222;
                    margin: 0;
                    text-align: center;
                }

                h2 {
                    font-size: 0.95rem;
                    color: #555;
                    margin: 0;
                    text-align: center;
                }

                h2:nth-of-type(4) {
                    font-weight: bold;
                    color: #28a745; /* Verde para el precio */
                }

                h2:nth-of-type(5) {
                    color: #f39c12; /* Amarillo para el rating */
                }
            </style>
                <section>
                    <img class="image-character" src="${this.image || ''}" alt="${this.productTitle || ''}">
                    <h1>${this.productTitle}</h1>
                    <h2>Description: ${this.description || 'Unknown'}</h2>
                    <h2>Category: ${this.category || 'Unknown'}</h2>
                    <h2>Price: $${this.price || 'Unknown'}</h2>
                    <h2>Rating: ${this.rating || 'Unknown'}</h2>
                </section>
            `;
        }
    }
}

customElements.define("my-product", Product);
export default Product;
