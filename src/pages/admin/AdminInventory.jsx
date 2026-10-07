import React, { useState } from 'react';
import { Save, AlertTriangle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatPrice';

const AdminInventory = () => {
  const { products, refreshData } = useData();
  const { addToast } = useToast();

  const [stockMap, setStockMap] = useState({});

  const handleStockChange = (id, val) => {
    setStockMap(prev => ({ ...prev, [id]: Number(val) }));
  };

  const handleSaveStock = async (prod) => {
    const newQty = stockMap[prod.id] !== undefined ? stockMap[prod.id] : prod.stock;
    await api.saveProduct({ ...prod, stock: newQty });
    refreshData();
    addToast(`Stock for ${prod.name} updated to ${newQty} units.`, 'success');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Inventory & Stock Management</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Quick stock quantity updates and low-stock alerts</p>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>SKU Code</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Current Stock</th>
              <th>Quick Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td><strong>{p.sku}</strong></td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{formatPrice(p.price)}</td>
                <td>
                  <span style={{ fontWeight: 600, color: p.stock < 5 ? 'var(--error)' : 'var(--success)' }}>
                    {p.stock} units {p.stock < 5 && <AlertTriangle size={14} style={{ display: 'inline', marginLeft: '0.2rem' }} />}
                  </span>
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    className="form-input"
                    value={stockMap[p.id] !== undefined ? stockMap[p.id] : p.stock}
                    onChange={(e) => handleStockChange(p.id, e.target.value)}
                    style={{ width: '90px', padding: '0.35rem 0.5rem', fontSize: '0.85rem' }}
                  />
                </td>
                <td>
                  <button onClick={() => handleSaveStock(p)} className="btn btn-gold btn-sm" style={{ padding: '0.35rem 0.75rem' }}>
                    <Save size={14} /> Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInventory;
