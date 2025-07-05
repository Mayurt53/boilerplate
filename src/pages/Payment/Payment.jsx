import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import {
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from '../../services/apiSlice';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';

function Payment() {
  const { cart, clearCart } = useCart();
  const [isPaid, setIsPaid] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Store cart items for bill generation
  const [orderSummary, setOrderSummary] = useState({ subtotal: 0, tax: 0, total: 0 });
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    card: '',
    expiry: '',
    cvc: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [addOrder, { isLoading: isAddingOrder }] = useAddOrderMutation();

  // Always calculate from cart for the form/checkout view
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const generateBill = (customerName, items, summary) => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const invoiceNumber = 'INV-' + Date.now().toString().slice(-6);

    // Set document properties
    doc.setProperties({
      title: 'DreamWorld Invoice',
      subject: 'Purchase Invoice',
      author: 'DreamWorld',
      creator: 'DreamWorld Billing System'
    });

    // Company Header with Logo Placeholder
    doc.setFillColor(88, 28, 135); // Purple background
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont(undefined, 'bold');
    doc.text('DreamWorld', 20, 25);
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Innovation & Technology Solutions', 20, 35);

    // Company Contact Info (right side of header)
    doc.setFontSize(8);
    doc.text('123 Innovation Street', 150, 20);
    doc.text('Tech City, TC 12345', 150, 25);
    doc.text('Phone: (555) 123-4567', 150, 30);
    doc.text('Email: billing@dreamworld.com', 150, 35);

    // Invoice Details Box
    doc.setFillColor(245, 245, 245);
    doc.rect(20, 50, 170, 30, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.rect(20, 50, 170, 30, 'S');
    
    doc.setFontSize(16);
    doc.setTextColor(88, 28, 135);
    doc.setFont(undefined, 'bold');
    doc.text('INVOICE', 30, 65);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont(undefined, 'normal');
    doc.text(`Invoice #: ${invoiceNumber}`, 120, 60);
    doc.text(`Date: ${currentDate}`, 120, 67);
    doc.text(`Due Date: ${currentDate}`, 120, 74);

    // Customer Information
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.setFont(undefined, 'bold');
    doc.text('Bill To:', 20, 100);
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(customerName, 20, 110);
    doc.text(form.address, 20, 117);

    // Items Table Header
    doc.setFillColor(88, 28, 135);
    doc.rect(20, 130, 170, 12, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.text('Item Description', 25, 139);
    doc.text('Qty', 100, 139);
    doc.text('Unit Price', 130, 139);
    doc.text('Total', 170, 139);

    // Items
    let yPosition = 150;
    let itemCount = 0;
    
    items.forEach((item, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
        
        // Repeat header on new page
        doc.setFillColor(88, 28, 135);
        doc.rect(20, yPosition, 170, 12, 'F');
        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.text('Item Description', 25, yPosition + 9);
        doc.text('Qty', 100, yPosition + 9);
        doc.text('Unit Price', 130, yPosition + 9);
        doc.text('Total', 170, yPosition + 9);
        yPosition += 20;
      }
      
      // Item row background (alternating)
      if (itemCount % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(20, yPosition - 5, 170, 10, 'F');
      }
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.setFont(undefined, 'normal');
      
      // Handle long item names by truncating or wrapping
      const itemName = item.name.length > 25 ? item.name.substring(0, 25) + '...' : item.name;
      doc.text(itemName, 25, yPosition);
      doc.text(item.quantity.toString(), 100, yPosition);
      doc.text(`$${item.price.toFixed(2)}`, 130, yPosition);
      doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 170, yPosition);
      
      yPosition += 12;
      itemCount++;
    });

    // Totals Section
    yPosition += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 10;

    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text('Subtotal:', 150, yPosition);
    doc.text(`$${summary.subtotal.toFixed(2)}`, 190, yPosition, { align: 'right' });
    yPosition += 8;

    doc.text('Tax (8%):', 150, yPosition);
    doc.text(`$${summary.tax.toFixed(2)}`, 190, yPosition, { align: 'right' });
    yPosition += 8;

    doc.setFontSize(13);
    doc.setTextColor(30, 30, 30);
    doc.setFont(undefined, 'bold');
    doc.text('Total Amount:', 150, yPosition);
    doc.text(`$${summary.total.toFixed(2)}`, 190, yPosition, { align: 'right' });

    // Payment Terms
    yPosition += 15;
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('Payment Terms: Due upon receipt', 20, yPosition);
    doc.text('Payment Method: Credit Card', 20, yPosition + 5);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(88, 28, 135);
    doc.setFont(undefined, 'bold');
    doc.text('Thank you for choosing DreamWorld!', 20, 280);
    
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.setFont(undefined, 'normal');
    doc.text('For any questions about this invoice, please contact us at billing@dreamworld.com', 20, 287);
    doc.text('This is a computer-generated invoice. No signature required.', 20, 294);

    // Save the PDF
    const fileName = `DreamWorld_Bill_${customerName.replace(/\s+/g, '_')}_${invoiceNumber}.pdf`;
    doc.save(fileName);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm({
        ...form,
        [parent]: {
          ...form[parent],
          [child]: value
        }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handlePay = (e) => {
    e.preventDefault();
    // Simple validation
    if (!form.name || !form.card || !form.expiry || !form.cvc || !form.address) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.card.length < 16 || form.cvc.length < 3) {
      setError('Invalid card details.');
      return;
    }
    setError('');
    // Store cart items and summary before clearing
    const items = [...cart];
    const summary = {
      subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      tax: items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.08,
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.08,
    };
    setCartItems(items);
    setOrderSummary(summary);
    setIsPaid(true);
    
    // Add order to database with all required fields
    const orderData = {
      user: form.name,
      customer: form.name,
      email: form.email || '',
      phone: form.phone || '',
      address: form.address,
      items: items.map(item => ({ name: item.name, qty: item.quantity })),
      products: items.map(item => ({ name: item.name, qty: item.quantity })),
      total: summary.total,
      date: new Date().toISOString().slice(0, 10),
      status: 'pending',
      paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 
                    paymentMethod === 'paypal' ? 'PayPal' : 'Cryptocurrency'
    };
    
    addOrder(orderData)
      .then(res => {
        console.log('Order posted successfully:', res.data);
      })
      .catch(err => {
        console.error('Order post error:', err);
      });
    clearCart();
  };

  // Auto-generate and download bill when payment is successful
  useEffect(() => {
    if (isPaid && form.name && cartItems.length > 0) {
      // Small delay to ensure state is updated
      setTimeout(() => {
        generateBill(form.name, cartItems, orderSummary);
      }, 500);
    }
  }, [isPaid, form.name, cartItems, orderSummary]);

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: '💳', color: 'neon-cyan' },
    { id: 'paypal', name: 'PayPal', icon: '🔵', color: 'neon-blue' },
    { id: 'crypto', name: 'Cryptocurrency', icon: '₿', color: 'neon-orange' }
  ];

  if (isPaid) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center"
        >
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-lg text-gray-600 mb-4">Thank you for your purchase, {form.name}!</p>
          <p className="text-sm text-green-600 mb-6">Your professional bill has been automatically downloaded.</p>
          
          <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <ul className="mb-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between text-gray-700 mb-1">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-gray-700 mb-1">
              <span>Subtotal</span>
              <span>${orderSummary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-1">
              <span>Tax (8%)</span>
              <span>${orderSummary.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-lg mt-2">
              <span>Total</span>
              <span>${orderSummary.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => generateBill(form.name, cartItems, orderSummary)} 
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Download Bill Again
            </button>
            <button 
              onClick={() => navigate('/products')} 
              className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-cyber font-bold mb-4">
            <span className="text-gradient-cyber">Secure</span>
            <br />
            <span className="text-white">Payment</span>
          </h1>
          <p className="text-xl text-white/70">
            Complete your purchase with our secure payment system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            {/* Payment Method Selection */}
            <Card variant="glass" className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      paymentMethod === method.id
                        ? `border-${method.color} bg-${method.color}/10`
                        : 'border-dark-400 hover:border-dark-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <div className="text-white font-medium">{method.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Payment Form */}
            {paymentMethod === 'card' && (
              <Card variant="glass" className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Card Information</h3>
                <form onSubmit={handlePay} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Cardholder Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      icon="👤"
                    />
                    <Input
                      label="Phone Number"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      icon="📞"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      icon="📧"
                    />
                    <Input
                      label="Expiry Date"
                      name="expiry"
                      value={form.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      icon="📅"
                      maxLength="5"
                    />
                  </div>

                  <Input
                    label="Card Number"
                    name="card"
                    value={form.card}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    icon="💳"
                    maxLength="19"
                  />

                  <Input
                    label="CVV"
                    name="cvc"
                    value={form.cvc}
                    onChange={handleChange}
                    placeholder="123"
                    icon="🔒"
                    maxLength="4"
                  />

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">Billing Address</h4>
                    <Input
                      label="Street Address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Main St"
                      icon="📍"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="San Francisco"
                        icon="🏙️"
                      />
                      <Input
                        label="State"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        placeholder="CA"
                        icon="🗺️"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="ZIP Code"
                        name="zipCode"
                        value={form.zipCode}
                        onChange={handleChange}
                        placeholder="94105"
                        icon="📮"
                      />
                      <Input
                        label="Country"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        placeholder="United States"
                        icon="🌍"
                      />
                    </div>
                  </div>

                  {error && <div className="text-red-600 text-sm">{error}</div>}
                  <Button
                    type="submit"
                    variant="cyber"
                    size="lg"
                    loading={isProcessing}
                    icon="🚀"
                    className="w-full"
                  >
                    {isProcessing ? 'Processing Payment...' : `Pay $${total.toLocaleString()}`}
                  </Button>
                </form>
              </Card>
            )}

            {paymentMethod === 'paypal' && (
              <Card variant="glass" className="p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔵</div>
                  <h3 className="text-xl font-bold text-white mb-4">PayPal Checkout</h3>
                  <p className="text-white/70 mb-6">
                    You will be redirected to PayPal to complete your payment securely.
                  </p>
                  <Button
                    variant="cyber"
                    size="lg"
                    icon="🔵"
                    className="w-full"
                  >
                    Continue with PayPal
                  </Button>
                </div>
              </Card>
            )}

            {paymentMethod === 'crypto' && (
              <Card variant="glass" className="p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">₿</div>
                  <h3 className="text-xl font-bold text-white mb-4">Cryptocurrency Payment</h3>
                  <p className="text-white/70 mb-6">
                    Pay with Bitcoin, Ethereum, or other supported cryptocurrencies.
                  </p>
                  <div className="bg-dark-300 rounded-xl p-4 mb-6">
                    <p className="text-white/70 text-sm mb-2">Payment Address:</p>
                    <p className="text-neon-cyan font-mono text-sm break-all">
                      bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                    </p>
                  </div>
                  <Button
                    variant="cyber"
                    size="lg"
                    icon="₿"
                    className="w-full"
                  >
                    Generate QR Code
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card variant="glass" className="p-6 sticky top-6">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-white/50 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-white">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
                
                <div className="border-t border-dark-400 pt-4 space-y-2">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Tax (8%)</span>
                    <span>${tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-lg border-t border-dark-400 pt-2">
                    <span>Total</span>
                    <span className="text-neon-cyan">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-dark-300 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">🔒</span>
                  <h4 className="text-white font-medium">Secure Payment</h4>
                </div>
                <p className="text-white/70 text-sm">
                  Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
                </p>
              </div>
            </Card>

            {/* Return Policy */}
            <Card variant="glass" className="p-6">
              <h4 className="text-lg font-bold text-white mb-4">Return Policy</h4>
              <p className="text-white/70 text-sm mb-4">
                We offer a 30-day money-back guarantee on all our products. If you're not satisfied, contact our support team.
              </p>
              <div className="flex items-center space-x-2 text-neon-cyan text-sm">
                <span>📞</span>
                <span>24/7 Support Available</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment; 