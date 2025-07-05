import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import DataTable from '../../../components/DataTable';
import Modal from '../../../components/Modal';
import {
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from '../../../services/apiSlice';

const AdminOrders = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // RTK Query hooks
  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useGetOrdersQuery();
  const [addOrder, { isLoading: isAdding }] = useAddOrderMutation();
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'neon-green';
      case 'pending': return 'neon-orange';
      case 'processing': return 'neon-cyan';
      case 'cancelled': return 'neon-red';
      case 'shipped': return 'neon-purple';
      default: return 'neon-gray';
    }
  };

  const getStatusText = (status) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    await updateOrder({ id: orderId, status: newStatus });
    refetch();
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleExportOrders = () => {
    const csvContent = [
      ['Order ID', 'Customer', 'Email', 'Products', 'Total', 'Status', 'Date', 'Payment Method'],
      ...orders.map(order => [
        order.id,
        order.customer ?? order.user ?? 'Unknown',
        order.email ?? 'Not provided',
        (order.products ?? order.items ?? []).map(p => p.name ?? p).join(', '),
        order.total ?? 0,
        order.status ?? 'Unknown',
        order.date ?? 'Unknown',
        order.paymentMethod ?? 'Not specified'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const columns = [
    {
      key: 'orderId',
      label: 'Order ID',
      render: (order) => (
        <span className="font-mono text-neon-cyan">#{order.id}</span>
      )
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (order) => (
        <div>
          <div className="font-bold text-white">{order.customer ?? order.user ?? 'Unknown'}</div>
          <div className="text-white/70 text-sm">{order.email ?? 'No email'}</div>
        </div>
      )
    },
    {
      key: 'items',
      label: 'Items',
      render: (order) => (
        <div className="space-y-1">
          {(order.products ?? order.items ?? []).map((item, index) => (
            <div key={index} className="text-sm">
              <span className="text-white">{item.name ?? item}</span>
              <span className="text-white/70"> x{item.qty ?? 1}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'total',
      label: 'Total',
      render: (order) => (
        <span className="text-neon-cyan font-bold">${(order.total ?? 0).toLocaleString()}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (order) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${getStatusColor(order.status)}/20 text-${getStatusColor(order.status)} border border-${getStatusColor(order.status)}`}>
          {getStatusText(order.status)}
        </span>
      )
    },
    {
      key: 'date',
      label: 'Date',
      render: (order) => (
        <span className="text-white/70 text-sm">{order.date ?? 'Unknown'}</span>
      )
    },
    {
      key: 'payment',
      label: 'Payment',
      render: (order) => (
        <span className="text-white/80 text-sm">{order.paymentMethod ?? 'N/A'}</span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (order) => (
        <div className="flex space-x-2">
          <Button
            variant="neon"
            size="sm"
            icon="👁️"
            onClick={() => handleViewOrder(order)}
          >
            View
          </Button>
          <div className="relative">
            <select
              value={order.status}
              onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
              className="bg-dark-300 border border-dark-400 text-white text-sm rounded-lg px-3 py-1 focus:outline-none focus:border-neon-cyan"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      )
    }
  ];

  const stats = [
    {
      label: 'Total Orders',
      value: orders.length,
      icon: '📦',
      color: 'neon-cyan'
    },
    {
      label: 'Completed',
      value: orders.filter(o => o.status === 'completed').length,
      icon: '✅',
      color: 'neon-green'
    },
    {
      label: 'Pending',
      value: orders.filter(o => o.status === 'pending').length,
      icon: '⏳',
      color: 'neon-orange'
    },
    {
      label: 'Processing',
      value: orders.filter(o => o.status === 'processing').length,
      icon: '⚙️',
      color: 'neon-purple'
    }
  ];

  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-dark-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-cyber font-bold text-white mb-2">
            Order Management
          </h1>
          <p className="text-white/70">
            Track and manage customer orders
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} variant="glass" className="p-6">
              <div className="flex items-center justify-between">
    <div>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Revenue Card */}
        <Card variant="glass" className="p-6 mb-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Total Revenue</h3>
            <p className="text-4xl font-cyber font-bold text-neon-cyan">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-white/70 text-sm mt-2">From completed orders</p>
      </div>
        </Card>

        {/* Filters */}
        <Card variant="glass" className="p-6 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Orders</h3>
            <div className="flex space-x-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-dark-300 border border-dark-400 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-neon-cyan"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <Button variant="neon" size="sm" icon="📊" onClick={handleExportOrders}>
                Export
              </Button>
            </div>
          </div>
        </Card>

        {/* Orders Table */}
        <Card variant="glass" className="p-6">
          <DataTable
            data={filteredOrders.filter(Boolean)}
            columns={columns}
            loading={isLoading}
            emptyMessage="No orders found."
            searchable={true}
            sortable={true}
            pagination={true}
            itemsPerPage={5}
          />
        </Card>

        {/* Recent Activity */}
        <Card variant="glass" className="p-6 mt-8">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-dark-300 rounded-xl border border-dark-400">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full bg-${getStatusColor(order.status)}`}></div>
                  <div>
                    <p className="text-white font-medium">
                      Order #{order.id} - {order.customer ?? order.user ?? 'Unknown'}
                    </p>
                    <p className="text-white/70 text-sm">
                      {(order.products ?? order.items ?? []).length} product(s) • ${(order.total ?? 0).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/70 text-sm">{order.date ?? 'Unknown'}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${getStatusColor(order.status)}/20 text-${getStatusColor(order.status)} border border-${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                    </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <Modal
          isOpen={showOrderModal}
          onClose={() => setShowOrderModal(false)}
          title={`Order #${selectedOrder.id} Details`}
        >
          <div className="space-y-6">
            {/* Customer Information */}
            <div>
              <h4 className="text-lg font-bold text-white mb-3">Customer Information</h4>
              <div className="bg-dark-300 rounded-xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Name:</span>
                  <span className="text-white font-medium">{selectedOrder.customer ?? selectedOrder.user ?? 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Email:</span>
                  <span className="text-white">{selectedOrder.email ?? 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Phone:</span>
                  <span className="text-white">{selectedOrder.phone ?? 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Address:</span>
                  <span className="text-white text-right">{selectedOrder.address ?? 'Not provided'}</span>
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div>
              <h4 className="text-lg font-bold text-white mb-3">Order Information</h4>
              <div className="bg-dark-300 rounded-xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Order ID:</span>
                  <span className="text-neon-cyan font-mono font-bold">#{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Date:</span>
                  <span className="text-white">{selectedOrder.date ?? 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${getStatusColor(selectedOrder.status)}/20 text-${getStatusColor(selectedOrder.status)} border border-${getStatusColor(selectedOrder.status)}`}>
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Payment Method:</span>
                  <span className="text-white">{selectedOrder.paymentMethod ?? 'Not specified'}</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-lg font-bold text-white mb-3">Products</h4>
              <div className="bg-dark-300 rounded-xl p-4">
                {(selectedOrder.products ?? selectedOrder.items ?? []).map((product, index) => (
                  <div key={index} className="flex items-center space-x-3 py-2">
                    <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                    <span className="text-white">{product.name ?? product}</span>
                    <span className="text-white/70 text-sm">x{product.qty ?? 1}</span>
                  </div>
                ))}
                {((selectedOrder.products ?? selectedOrder.items ?? []).length === 0) && (
                  <span className="text-white/50 text-sm">No products listed</span>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-dark-400 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">Total Amount:</span>
                <span className="text-3xl font-cyber font-bold text-neon-cyan">
                  ${(selectedOrder.total ?? 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                variant="cyber"
                size="lg"
                icon="📧"
                className="flex-1"
                onClick={() => {
                  // Simulate sending email
                  alert('Order confirmation email sent!');
                }}
              >
                Send Confirmation
              </Button>
              <Button
                variant="neon"
                size="lg"
                icon="📄"
                className="flex-1"
                onClick={() => {
                  // Generate invoice
                  const invoiceHTML = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <title>Order Invoice #${selectedOrder.id}</title>
                      <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .details { display: flex; justify-content: space-between; margin-bottom: 30px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                        .total { font-weight: bold; font-size: 18px; }
                      </style>
                    </head>
                    <body>
                      <div class="header">
                        <h1>Order Invoice</h1>
                        <h2>#${selectedOrder.id}</h2>
                      </div>
                      <div class="details">
                        <div>
                          <h3>Customer:</h3>
                          <p>${selectedOrder.customer}<br>${selectedOrder.email}<br>${selectedOrder.address}</p>
                        </div>
                        <div>
                          <p><strong>Date:</strong> ${selectedOrder.date}</p>
                          <p><strong>Status:</strong> ${getStatusText(selectedOrder.status)}</p>
                        </div>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${selectedOrder.products.map(product => `
                            <tr>
                              <td>${product}</td>
                              <td>$${(selectedOrder.total / selectedOrder.products.length).toFixed(2)}</td>
                            </tr>
                          `).join('')}
                        </tbody>
                        <tfoot>
                          <tr class="total">
                            <td>Total</td>
                            <td>$${selectedOrder.total.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </body>
                    </html>
                  `;
                  
                  const blob = new Blob([invoiceHTML], { type: 'text/html' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `order-${selectedOrder.id}-invoice.html`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
                }}
              >
                Generate Invoice
              </Button>
            </div>
        </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminOrders; 