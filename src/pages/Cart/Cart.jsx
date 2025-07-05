import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import Button from '../../components/Button';
import Card from '../../components/Card';
import {
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from '../../services/apiSlice';

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [quantityInput, setQuantityInput] = useState({});
  const [feedback, setFeedback] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    navigate('/payment');
  };

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setQuantityInput((prev) => ({ ...prev, [id]: qty }));
  };

  const handleQuantityBlur = (id, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    updateQuantity(id, qty);
    setFeedback('Quantity updated!');
    setTimeout(() => setFeedback(''), 1000);
  };

  const generateInvoice = () => {
    const invoiceNumber = `INV-${Date.now()}`;
    const invoiceDate = new Date().toLocaleDateString();
    
    const invoiceData = {
      invoiceNumber,
      invoiceDate,
      items: cart,
      subtotal,
      tax,
      total,
      customerInfo: {
        name: 'Customer Name',
        email: 'customer@example.com',
        address: 'Customer Address'
      }
    };

    // Create invoice HTML
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .invoice-header { text-align: center; margin-bottom: 30px; }
          .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f8f9fa; }
          .total-row { font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #666; }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <h1>INVOICE</h1>
          <h2>${invoiceNumber}</h2>
        </div>
        
        <div class="invoice-details">
          <div>
            <h3>Bill To:</h3>
            <p>${invoiceData.customerInfo.name}<br>
            ${invoiceData.customerInfo.email}<br>
            ${invoiceData.customerInfo.address}</p>
          </div>
          <div>
            <p><strong>Invoice Date:</strong> ${invoiceDate}</p>
            <p><strong>Due Date:</strong> ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</p>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${cart.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="text-align: right;"><strong>Subtotal:</strong></td>
              <td>$${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="3" style="text-align: right;"><strong>Tax (8%):</strong></td>
              <td>$${tax.toFixed(2)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="3" style="text-align: right;"><strong>Total:</strong></td>
              <td>$${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        
        <div class="footer">
          <p>Thank you for your business!</p>
        </div>
      </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showToast('Invoice generated successfully!', 'success');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-dark-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/10 via-transparent to-neon-purple/10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300"></div>
        </div>

        <div className="relative max-w-md w-full text-center">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-3xl font-cyber font-bold text-white mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-white/70 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button variant="cyber" size="lg" icon="🚀">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-cyber font-bold mb-4">
            <span className="text-gradient-cyber">Shopping</span>
            <br />
            <span className="text-white">Cart</span>
          </h1>
          <p className="text-xl text-white/70">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <Card key={item.id} variant="glass" className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-cyber rounded-xl p-1">
                      <div className="w-full h-full bg-dark-200 rounded-xl overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-dark-200 rounded-xl flex items-center justify-center text-2xl hidden">
                          {item.category === 'electronics' ? '📱' :
                           item.category === 'grocery' ? '🛒' :
                           item.category === 'fashion' ? '👕' :
                           item.category === 'home' ? '🏠' :
                           item.category === 'books' ? '📚' :
                           item.category === 'sports' ? '⚽' :
                           item.category === 'beauty' ? '💄' : '🛍️'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-white/70 text-sm mb-3 line-clamp-2">
                      {item.description || 'Product description not available'}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 bg-dark-300 rounded-lg flex items-center justify-center text-white hover:bg-dark-400 transition-colors duration-300"
                        >
                          -
                        </button>
                        <span className="text-white font-mono w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-dark-300 rounded-lg flex items-center justify-center text-white hover:bg-dark-400 transition-colors duration-300"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          showToast('Item removed from cart', 'success');
                        }}
                        className="text-neon-red hover:text-neon-red/80 transition-colors duration-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex-shrink-0 text-right">
                    <div className="text-xl font-bold text-neon-cyan">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-white/50 text-sm">
                      ${item.price.toFixed(2)} each
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card variant="glass" className="p-6 sticky top-6">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-dark-400 pt-4">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span className="text-neon-cyan">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  variant="cyber" 
                  size="lg" 
                  icon="💳" 
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                
                <Button 
                  variant="neon" 
                  size="lg" 
                  icon="📄" 
                  className="w-full"
                  onClick={generateInvoice}
                >
                  Generate Invoice
                </Button>
                
                <Link to="/products">
                  <Button variant="ghost" size="lg" icon="🛍️" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t border-dark-400">
                <h4 className="text-sm font-medium text-white mb-3">Have a promo code?</h4>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 bg-dark-200 border border-dark-400 rounded-lg text-white text-sm focus:border-neon-cyan focus:outline-none"
                  />
                  <Button variant="neon" size="sm" icon="🎫">
                    Apply
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div className="fixed top-4 right-4 bg-neon-green text-dark-50 px-4 py-2 rounded-lg shadow-lg z-50">
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart; 