import React from 'react';
import { Download, TrendingUp, DollarSign } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatPrice';

const AdminReports = () => {
  const { addToast } = useToast();

  const salesByCategory = [
    { category: 'Rings & Solitaires', orders: 18, revenue: 1680000 },
    { category: 'Necklaces & Chokers', orders: 12, revenue: 2450000 },
    { category: 'Earrings & Studs', orders: 24, revenue: 1120000 },
    { category: 'Bracelets & Bangles', orders: 14, revenue: 1980000 },
    { category: 'Bridal Sets & Mangalsutra', orders: 6, revenue: 4200000 },
    { category: 'Gold Coins & Minted Bars', orders: 42, revenue: 3150000 }
  ];

  const exportReport = () => {
    let csvContent = 'data:text/csv;charset=utf-8,Category,Total Orders,Revenue (INR)\n';
    salesByCategory.forEach(r => {
      csvContent += `"${r.category}",${r.orders},${r.revenue}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'aurelia_sales_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Sales breakdown exported to CSV.', 'success');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Sales & Analytics Reports</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Category breakdown, order volume, and revenue reports</p>
        </div>
        <button onClick={exportReport} className="btn btn-gold btn-sm">
          <Download size={16} /> Export Sales CSV
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Jewellery Category</th>
              <th>Total Orders Handled</th>
              <th>Revenue Generated</th>
              <th>Share of Gross Sales</th>
            </tr>
          </thead>
          <tbody>
            {salesByCategory.map((row, idx) => (
              <tr key={idx}>
                <td><strong style={{ color: 'var(--ink)' }}>{row.category}</strong></td>
                <td>{row.orders} completed sales</td>
                <td><strong style={{ color: 'var(--bordeaux)' }}>{formatPrice(row.revenue)}</strong></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--line)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${Math.min(100, (row.revenue / 4200000) * 100)}%`, height: '100%', backgroundColor: 'var(--bordeaux)' }} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReports;
