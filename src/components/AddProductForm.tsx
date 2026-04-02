import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Product } from '../types';

interface AddProductFormProps {
  onSubmit: (product: Omit<Product, 'id'>) => void;
  onCancel: () => void;
  initialData?: Product;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    brand: initialData?.brand || '',
    price: initialData?.price?.toString() || '',
    image: initialData?.image || '',
    category: initialData?.category || 'smartphones',
    description: initialData?.description || '',
    display: initialData?.specs?.display || '',
    processor: initialData?.specs?.processor || '',
    ram: initialData?.specs?.ram || '',
    storage: initialData?.specs?.storage || '',
    camera: initialData?.specs?.camera || '',
    battery: initialData?.specs?.battery || '',
    colors: initialData?.colors?.length ? initialData.colors : [''],
    storageOptions: initialData?.storageOptions?.length ? initialData.storageOptions : [''],
    isNew: initialData?.isNew || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const product: Omit<Product, 'id'> = {
      name: formData.name,
      brand: formData.brand,
      price: parseInt(formData.price),
      image: formData.image,
      category: formData.category,
      description: formData.description,
      specs: {
        display: formData.display,
        processor: formData.processor,
        ram: formData.ram,
        storage: formData.storage,
        camera: formData.camera,
        battery: formData.battery
      },
      colors: formData.colors.filter(c => c.trim() !== ''),
      storageOptions: formData.storageOptions.filter(s => s.trim() !== ''),
      isNew: formData.isNew
    };

    onSubmit(product);
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, '']
    }));
  };

  const updateColor = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.map((color, i) => i === index ? value : color)
    }));
  };

  const removeColor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const addStorage = () => {
    setFormData(prev => ({
      ...prev,
      storageOptions: [...prev.storageOptions, '']
    }));
  };

  const updateStorage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      storageOptions: prev.storageOptions.map((storage, i) => i === index ? value : storage)
    }));
  };

  const removeStorage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      storageOptions: prev.storageOptions.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline font-bold text-2xl">{initialData ? 'Edit Product' : 'Add New Product'}</h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-2">
              Product Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="e.g. Galaxy S24 Ultra"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-2">
              Brand *
            </label>
            <input
              type="text"
              required
              value={formData.brand}
              onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
              className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="e.g. Samsung"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-2">
              Price (KSh) *
            </label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="e.g. 150000"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option value="smartphones">Smartphones</option>
              <option value="tablets">Tablets</option>
              <option value="accessories">Accessories</option>
              <option value="special_offers">Special Offers</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-2">
            Image URL *
          </label>
          <input
            type="url"
            required
            value={formData.image}
            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
            className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-2">
            Description *
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            placeholder="Brief description of the product..."
          />
        </div>

        {/* Specifications */}
        <div className="border-t border-surface-container-high pt-6">
          <h3 className="font-headline font-bold text-lg mb-4">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-2">
                Display
              </label>
              <input
                type="text"
                value={formData.display}
                onChange={(e) => setFormData(prev => ({ ...prev, display: e.target.value }))}
                className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="e.g. 6.8-inch Dynamic AMOLED"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-2">
                Processor
              </label>
              <input
                type="text"
                value={formData.processor}
                onChange={(e) => setFormData(prev => ({ ...prev, processor: e.target.value }))}
                className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="e.g. Snapdragon 8 Gen 3"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-2">
                RAM
              </label>
              <input
                type="text"
                value={formData.ram}
                onChange={(e) => setFormData(prev => ({ ...prev, ram: e.target.value }))}
                className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="e.g. 12GB"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-2">
                Storage
              </label>
              <input
                type="text"
                value={formData.storage}
                onChange={(e) => setFormData(prev => ({ ...prev, storage: e.target.value }))}
                className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="e.g. 256GB,512GB"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-2">
                Camera
              </label>
              <input
                type="text"
                value={formData.camera}
                onChange={(e) => setFormData(prev => ({ ...prev, camera: e.target.value }))}
                className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="e.g. 200MP Quad Camera"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-2">
                Battery
              </label>
              <input
                type="text"
                value={formData.battery}
                onChange={(e) => setFormData(prev => ({ ...prev, battery: e.target.value }))}
                className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="e.g. 5000 mAh"
              />
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="border-t border-surface-container-high pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline font-bold text-lg">Available Colors</h3>
            <button
              type="button"
              onClick={addColor}
              className="text-primary hover:text-primary/80 font-bold text-sm"
            >
              + Add Color
            </button>
          </div>
          <div className="space-y-3">
            {formData.colors.map((color, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={color}
                  onChange={(e) => updateColor(index, e.target.value)}
                  className="flex-1 bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="e.g. #000000 or Black"
                />
                {formData.colors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Storage Options */}
        <div className="border-t border-surface-container-high pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline font-bold text-lg">Storage Options</h3>
            <button
              type="button"
              onClick={addStorage}
              className="text-primary hover:text-primary/80 font-bold text-sm"
            >
              + Add Storage
            </button>
          </div>
          <div className="space-y-3">
            {formData.storageOptions.map((storage, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={storage}
                  onChange={(e) => updateStorage(index, e.target.value)}
                  className="flex-1 bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="e.g. 128GB"
                />
                {formData.storageOptions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStorage(index)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* New Arrival */}
        <div className="border-t border-surface-container-high pt-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isNew}
              onChange={(e) => setFormData(prev => ({ ...prev, isNew: e.target.checked }))}
              className="w-5 h-5 text-primary bg-surface-container-low border-surface-container-high rounded focus:ring-primary/20"
            />
            <span className="text-sm font-bold text-primary uppercase tracking-widest">
              Mark as New Arrival
            </span>
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-6 border-t border-surface-container-high">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-surface-container-high hover:bg-surface-container-low text-on-surface font-bold py-4 px-6 rounded-xl transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20"
          >
            {initialData ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};