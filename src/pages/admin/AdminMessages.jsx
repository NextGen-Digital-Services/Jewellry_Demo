import React, { useState, useEffect } from 'react';
import { Mail, Download, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [activeTab, setActiveTab] = useState('messages');
  const { addToast } = useToast();

  useEffect(() => {
    api.getContactMessages().then(res => setMessages(res));
    api.getNewsletterSubscribers().then(res => setSubscribers(res));
  }, []);

  const exportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    if (activeTab === 'subscribers') {
      csvContent += 'ID,Email,Date\n';
      subscribers.forEach(s => { csvContent += `${s.id},${s.email},${s.date}\n`; });
    } else {
      csvContent += 'ID,Name,Email,Subject,Message,Date\n';
      messages.forEach(m => { csvContent += `${m.id},"${m.name}","${m.email}","${m.subject}","${m.message}",${m.date}\n`; });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aurelia_${activeTab}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast(`Exported ${activeTab} as CSV.`, 'success');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Inbox & Subscribers</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Client inquiries and newsletter mailing list</p>
        </div>
        <button onClick={exportCSV} className="btn btn-gold btn-sm">
          <Download size={16} /> Export {activeTab} CSV
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('messages')}
          className={`btn ${activeTab === 'messages' ? 'btn-bordeaux' : 'btn-outline'}`}
        >
          Concierge Messages ({messages.length})
        </button>
        <button
          onClick={() => setActiveTab('subscribers')}
          className={`btn ${activeTab === 'subscribers' ? 'btn-bordeaux' : 'btn-outline'}`}
        >
          Newsletter Subscribers ({subscribers.length})
        </button>
      </div>

      {activeTab === 'messages' ? (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client Name</th>
                <th>Subject</th>
                <th>Message Content</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(m => (
                <tr key={m.id}>
                  <td>{m.date}</td>
                  <td>
                    <strong>{m.name}</strong>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--stone)' }}>{m.email}</span>
                  </td>
                  <td><strong style={{ color: 'var(--bordeaux)' }}>{m.subject}</strong></td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>{m.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Subscribed Email</th>
                <th>Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map(s => (
                <tr key={s.id}>
                  <td><strong>{s.id}</strong></td>
                  <td><strong style={{ color: 'var(--bordeaux)' }}>{s.email}</strong></td>
                  <td>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
