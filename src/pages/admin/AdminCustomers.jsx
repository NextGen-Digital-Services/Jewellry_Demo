import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatPrice';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const { addToast } = useToast();

  const loadCustomers = () => {
    api.getCustomers().then(res => setCustomers(res));
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const toggleStatus = async (cust) => {
    const nextStatus = cust.status === 'Active' ? 'Blocked' : 'Active';
    await api.updateCustomerStatus(cust.id, nextStatus);
    loadCustomers();
    addToast(`Customer ${cust.name} marked as ${nextStatus}.`, 'info');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Registered Collectors & Customers</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Privé member profiles, order history, and status management</p>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Collector Name</th>
              <th>Contact Info</th>
              <th>City</th>
              <th>Total Orders</th>
              <th>Lifetime Spend</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td><strong style={{ color: 'var(--ink)' }}>{c.name}</strong></td>
                <td>
                  <div>{c.email}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>{c.phone}</span>
                </td>
                <td>{c.city}</td>
                <td><strong>{c.ordersCount} orders</strong></td>
                <td><strong style={{ color: 'var(--bordeaux)' }}>{formatPrice(c.totalSpent)}</strong></td>
                <td>
                  <span className={`status-pill ${c.status === 'Active' ? 'confirmed' : 'cancelled'}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => toggleStatus(c)}
                    className="btn btn-outline btn-sm"
                    style={{ color: c.status === 'Active' ? 'var(--error)' : 'var(--success)' }}
                  >
                    {c.status === 'Active' ? 'Block Access' : 'Unblock Access'}
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

export default AdminCustomers;
