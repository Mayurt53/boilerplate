import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import { getProducts } from '../../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'Electronics', name: 'Electronics', icon: '📱' },
    { id: 'Grocery', name: 'Grocery', icon: '🛒' },
    { id: 'Fashion', name: 'Fashion', icon: '👕' },
    { id: 'Home', name: 'Home & Garden', icon: '🏠' },
    { id: 'Books', name: 'Books', icon: '📚' },
    { id: 'Sports', name: 'Sports', icon: '⚽' },
    { id: 'Beauty', name: 'Beauty', icon: '💄' }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    }
    setIsLoading(false);
  };

  const handleAddToCart = (product) => {
    try {
      addToCart({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: 1
      });
      showToast('Product added to cart!', 'success');
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToast('Failed to add product to cart. Please try again.', 'error');
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-cyan mx-auto mb-4"></div>
            <p className="text-white/70">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-cyber font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover cutting-edge products from electronics to groceries, all designed for the future
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-neon-cyan text-dark-50 shadow-glow-cyan'
                    : 'bg-dark-200 text-white/70 hover:text-white hover:bg-dark-300 border border-dark-400'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} variant="glass" className="p-6 hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                {/* Product Image */}
                <div className="w-full h-48 mb-4 bg-gradient-cyber rounded-xl p-2">
                  <div className="w-full h-full bg-dark-200 rounded-lg overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-dark-200 rounded-lg flex items-center justify-center text-4xl hidden">
                      {product.category === 'electronics' ? '📱' :
                       product.category === 'grocery' ? '🛒' :
                       product.category === 'fashion' ? '👕' :
                       product.category === 'home' ? '🏠' :
                       product.category === 'books' ? '📚' :
                       product.category === 'sports' ? '⚽' :
                       product.category === 'beauty' ? '💄' : '🛍️'}
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-white/70 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="flex text-yellow-400 text-sm">
                    {getRatingStars(product.rating)}
                  </div>
                  <span className="text-white/50 text-sm">({product.reviews})</span>
                </div>

                {/* Price and Stock */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-neon-cyan">${product.price}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    product.stock > 20 ? 'bg-neon-green/20 text-neon-green' : 
                    product.stock > 5 ? 'bg-neon-orange/20 text-neon-orange' : 
                    'bg-neon-red/20 text-neon-red'
                  }`}>
                    {product.stock > 20 ? 'In Stock' : product.stock > 5 ? 'Low Stock' : 'Limited'}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="cyber"
                  size="lg"
                  onClick={() => handleAddToCart(product)}
                  icon="🛒"
                  className="w-full"
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-white mb-2">No Products Found</h3>
            <p className="text-white/70">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products; 