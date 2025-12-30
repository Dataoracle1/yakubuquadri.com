import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  addToWishlist: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, addToWishlist }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
        <button 
          className="wishlist-btn" 
          onClick={() => addToWishlist(product)}
          aria-label="Add to wishlist"
        >
          <Heart size={18} />
        </button>
      </div>
      <div className="product-info">
        <h4 className="product-title">{product.name}</h4>
        <div className="product-price">
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
          <span className={product.originalPrice ? 'sale-price' : ''}>
            ${product.price.toFixed(2)}
          </span>
        </div>
        <button 
          className="btn add-to-cart"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;