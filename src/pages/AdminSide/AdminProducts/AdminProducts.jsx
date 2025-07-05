import React, { useState } from 'react';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Modal from '../../../components/Modal';
import DataTable from '../../../components/DataTable';
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../../../services/apiSlice';

const AdminProducts = () => {
  // RTK Query hooks
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery();
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    inStock: true,
    rating: 4.5,
    reviews: 0
  });

  const categories = [
    { id: 'Electronics', name: 'Electronics', icon: '📱' },
    { id: 'Grocery', name: 'Grocery', icon: '🛒' },
    { id: 'Fashion', name: 'Fashion', icon: '👕' },
    { id: 'Home', name: 'Home & Garden', icon: '🏠' },
    { id: 'Books', name: 'Books', icon: '📚' },
    { id: 'Sports', name: 'Sports', icon: '⚽' },
    { id: 'Beauty', name: 'Beauty', icon: '💄' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews)
    };
    try {
      if (editingProduct) {
        await updateProduct({ id: editingProduct.id, ...productData });
      } else {
        await addProduct(productData);
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        inStock: true,
        rating: 4.5,
        reviews: 0
      });
      refetch();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      category: product.category || '',
      image: product.image || '',
      inStock: product.inStock ?? true,
      rating: product.rating?.toString() || '4.5',
      reviews: product.reviews?.toString() || '0'
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const getStatusColor = (inStock) => {
    return inStock ? 'neon-green' : 'neon-red';
  };

  const getStatusText = (inStock) => {
    // Handle undefined/null values
    if (inStock === undefined || inStock === null) return 'Unknown';
    
    // Handle boolean values (inStock)
    if (typeof inStock === 'boolean') {
      return inStock ? 'In Stock' : 'Out of Stock';
    }
    
    // Handle string values (status) - fallback for compatibility
    if (typeof inStock === 'string') {
      return inStock.charAt(0).toUpperCase() + inStock.slice(1);
    }
    
    // Default fallback
    return 'Unknown';
  };

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (product) => (
        <div className="w-12 h-12 bg-gradient-cyber rounded-lg p-1">
          <div className="w-full h-full bg-dark-200 rounded-lg flex items-center justify-center text-xl">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              '📦'
            )}
          </div>
        </div>
      )
    },
    {
      key: 'name',
      label: 'Product',
      render: (product) => (
        <div>
          <div className="font-bold text-white">{product.name}</div>
          <div className="text-white/70 text-sm">{product.description}</div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (product) => (
        <span className="text-neon-cyan font-mono text-sm">{product.category}</span>
      )
    },
    {
      key: 'price',
      label: 'Price',
      render: (product) => (
        <span className="text-neon-cyan font-bold">${(product.price ?? 0).toLocaleString()}</span>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (product) => (
        <div className="flex items-center space-x-1">
          <span className="text-yellow-400">⭐</span>
          <span className="text-white">{product.rating ?? 0}</span>
          <span className="text-white/70 text-xs">({product.reviews ?? 0})</span>
        </div>
      )
    },
    {
      key: 'inStock',
      label: 'Status',
      render: (product) => {
        // Handle both inStock boolean and status string
        const statusValue = product.inStock !== undefined ? product.inStock : product.status;
        const inStock = typeof statusValue === 'boolean' ? statusValue : true; // Default to true for strings
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${getStatusColor(inStock)}/20 text-${getStatusColor(inStock)} border border-${getStatusColor(inStock)}`}>
            {getStatusText(statusValue)}
          </span>
        );
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (product) => (
        <div className="flex space-x-2">
          <Button
            variant="neon"
            size="sm"
            icon="✏️"
            onClick={() => handleEdit(product)}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(product.id)}
            icon="🗑️"
            className="text-neon-red hover:text-neon-red/80"
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-dark-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-cyber font-bold text-white mb-2">
              Product Management
            </h1>
            <p className="text-white/70">
              Manage your product catalog and inventory
            </p>
          </div>
          <Button
            variant="cyber"
            size="lg"
            onClick={() => setIsModalOpen(true)}
            icon="➕"
          >
            Add Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-white">{products.length}</p>
              </div>
              <div className="text-4xl">📦</div>
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Available</p>
                <p className="text-3xl font-bold text-white">
                  {products.filter(p => p.inStock).length}
                </p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Out of Stock</p>
                <p className="text-3xl font-bold text-white">
                  {products.filter(p => !p.inStock).length}
                </p>
              </div>
              <div className="text-4xl">⚠️</div>
            </div>
          </Card>
        </div>

        {/* Products Table */}
        <Card variant="glass" className="p-6">
          <DataTable
            columns={columns}
            data={products}
            isLoading={isLoading || isAdding || isUpdating || isDeleting}
            emptyMessage="No products found. Add your first product to get started."
          />
        </Card>

        {/* Add/Edit Product Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
            setFormData({
              name: '',
              description: '',
              price: '',
              category: '',
              image: '',
              inStock: true,
              rating: 4.5,
              reviews: 0
            });
          }}
          title={editingProduct ? 'Edit Product' : 'Add New Product'}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              required
              icon="📦"
            />

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description"
                required
                rows={3}
                className="input resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
                icon="💰"
              />

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Enter image URL"
                required
                icon="🖼️"
              />

              <div className="form-group">
                <label className="form-label">In Stock</label>
                <select
                  name="inStock"
                  value={formData.inStock ? 'true' : 'false'}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.value === 'true' })}
                  className="input"
                  required
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Rating"
                name="rating"
                type="number"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                placeholder="4.5"
                required
                icon="⭐"
              />

              <Input
                label="Reviews"
                name="reviews"
                type="number"
                value={formData.reviews}
                onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                placeholder="0"
                required
                icon="📝"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="cyber"
                loading={isLoading || isAdding || isUpdating}
                icon="💾"
                className="flex-1"
              >
                {isLoading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
                icon="❌"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminProducts; 