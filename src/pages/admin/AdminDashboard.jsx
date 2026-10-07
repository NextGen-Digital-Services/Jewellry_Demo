import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, ShoppingBag, Users, Gem, AlertTriangle, Sparkles, ArrowUpRight } from 'lucide-react';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    ordersCount: 0,
    customersCount: 0,
    productsCount: 0,
    lowStockCount: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getOrders(),
      api.getCustomers(),
      api.getProducts(),
      api.getBespokeEnquiries()
    ]).then(([orders, customers, products, enquiries]) => {
      const revenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
      const lowStock = products.filter(p => p.stock < 5).length;

      setStats({
        revenue,
        ordersCount: orders.length,
        customersCount: customers.length,
        productsCount: products.length,
        lowStockCount: lowStock
      });

      setRecentOrders(orders.slice(0, 5));
      setRecentEnquiries(enquiries.slice(0, 4));
      setLoading(false);
    });
  }, []);

  const chartData = [
    { name: 'Oct 01', sales: 180000 },
    { name: 'Oct 02', sales: 240000 },
    { name: 'Oct 03', sales: 195000 },
    { name: 'Oct 04', sales: 385000 },
    { name: 'Oct 05', sales: 290000 },
    { name: 'Oct 06', sales: 420000 },
    { name: 'Oct 07', sales: 510000 }
  ];

  const pieData = [
    { name: 'Confirmed', value: 4, color: '#137333' },
    { name: 'Crafting', value: 3, color: '#B06000' },
    { name: 'Shipped', value: 2, color: '#1A73E8' },
    { name: 'Delivered', value: 1, color: '#0D652D' }
  ];

  if (loading) {
    return <div>Loading dashboard telemetry...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Executive Overview</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Real-time telemetry and store operations</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--stone)' }}>Total Revenue</span>
            <div className="kpi-val">{formatPrice(stats.revenue)}</div>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bone)', color: 'var(--bordeaux)', borderRadius: '2px' }}>
            <DollarSign size={24} />
          </div>
        </div>

        <div className="kpi-card">
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--stone)' }}>Total Orders</span>
            <div className="kpi-val">{stats.ordersCount}</div>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bone)', color: 'var(--bordeaux)', borderRadius: '2px' }}>
            <ShoppingBag size={24} />
          </div>
        </div>

        <div className="kpi-card">
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--stone)' }}>Active Collectors</span>
            <div className="kpi-val">{stats.customersCount}</div>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bone)', color: 'var(--bordeaux)', borderRadius: '2px' }}>
            <Users size={24} />
          </div>
        </div>

        <div className="kpi-card">
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--stone)' }}>Live Catalog Items</span>
            <div className="kpi-val">{stats.productsCount}</div>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bone)', color: 'var(--bordeaux)', borderRadius: '2px' }}>
            <Gem size={24} />
          </div>
        </div>

        <div className="kpi-card">
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--stone)' }}>Low Stock Alerts</span>
            <div className="kpi-val" style={{ color: stats.lowStockCount > 0 ? 'var(--error)' : 'var(--bordeaux)' }}>
              {stats.lowStockCount}
            </div>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bone)', color: 'var(--error)', borderRadius: '2px' }}>
            <AlertTriangle size={24} />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }} className="admin-dashboard-charts">
        {/* Sales Chart */}
        <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '1.5rem', borderRadius: '2px' }}>
          <h3 className="h3" style={{ fontSize: '1.1rem', color: 'var(--bordeaux)', marginBottom: '1.5rem' }}>Sales & Revenue Velocity</h3>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                <XAxis dataKey="name" stroke="var(--stone)" fontSize={12} />
                <YAxis stroke="var(--stone)" fontSize={12} />
                <Tooltip formatter={(value) => formatPrice(value)} />
                <Line type="monotone" dataKey="sales" stroke="var(--bordeaux)" strokeWidth={3} dot={{ r: 5, fill: 'var(--gold)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Donut */}
        <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '1.5rem', borderRadius: '2px' }}>
          <h3 className="h3" style={{ fontSize: '1.1rem', color: 'var(--bordeaux)', marginBottom: '1.5rem' }}>Order Fulfillment Distribution</h3>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.75rem', marginTop: '0.5rem' }}>
            {pieData.map(p => (
              <span key={p.name} style={{ color: p.color, fontWeight: 600 }}>● {p.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }} className="admin-dashboard-tables">
        {/* Recent Orders */}
        <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '1.5rem', borderRadius: '2px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 className="h3" style={{ fontSize: '1.1rem', color: 'var(--bordeaux)', margin: 0 }}>Recent Orders</h3>
            <Link to="/admin/orders" style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600 }}>View All →</Link>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id}>
                    <td>
                      <Link to={`/admin/orders/${o.id}`} style={{ fontWeight: 600, color: 'var(--bordeaux)' }}>
                        {o.id}
                      </Link>
                    </td>
                    <td>{o.customer.name}</td>
                    <td>{formatPrice(o.totalAmount)}</td>
                    <td><span className={`status-pill ${o.status.toLowerCase()}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Bespoke Enquiries */}
        <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '1.5rem', borderRadius: '2px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 className="h3" style={{ fontSize: '1.1rem', color: 'var(--bordeaux)', margin: 0 }}>Bespoke Enquiries</h3>
            <Link to="/admin/bespoke" style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600 }}>Manage →</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentEnquiries.map(enq => (
              <div key={enq.id} style={{ padding: '0.85rem', backgroundColor: 'var(--bone)', borderRadius: '2px', border: '1px solid var(--line)', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>{enq.name}</span>
                  <span style={{ color: 'var(--bordeaux)' }}>{enq.budget}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--stone)', marginTop: '0.2rem' }}>{enq.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .admin-dashboard-charts, .admin-dashboard-tables { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
