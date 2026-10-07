import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit2, Search } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { formatPrice, formatDate } from '../../utils/formatPrice';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToast } = useToast();

  const loadOrders = () => {
    api.getOrders().then(res => setOrders(res));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    await api.updateOrderStatus(orderId, newStatus);
    loadOrders();
    addToast(`Order ${orderId} updated to ${newStatus}.`, 'success');
  };

  const filtered = orders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || o.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || o.status.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Orders & Fulfillment</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Manage hallmarking, crafting, and insured courier dispatches</p>
      </div>

      {/* Filter Bar */}
      <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '1.25rem', borderRadius: '2px', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Search Order ID or Customer Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, minWidth: '220px' }}
        />

        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ width: 'auto', minWidth: '180px' }}
        >
          <option value="All">All Statuses</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Crafting">Crafting</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Fulfillment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id}>
                <td><strong style={{ color: 'var(--bordeaux)' }}>{o.id}</strong></td>
                <td>{formatDate(o.date)}</td>
                <td>
                  <strong>{o.customer.name}</strong>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--stone)' }}>{o.customer.email}</span>
                </td>
                <td><strong>{formatPrice(o.totalAmount)}</strong></td>
                <td>{o.paymentMethod} ({o.paymentStatus})</td>
                <td>
                  <select
                    value={o.status}
                    onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                    className="form-select"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.78rem', width: 'auto' }}
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Crafting">Crafting</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <Link to={`/admin/orders/${o.id}`} className="btn btn-outline-gold btn-sm" style={{ padding: '0.3rem 0.6rem' }}>
                    <Eye size={14} /> Detail / Invoice
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
