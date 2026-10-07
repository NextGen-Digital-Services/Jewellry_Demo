import React, { useState, useEffect } from 'react';
import { Plus, Copy, Trash2, Upload } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import SmartImage from '../../components/common/SmartImage';

const AdminMediaLibrary = () => {
  const [media, setMedia] = useState([]);
  const [urlInput, setUrlInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const { addToast } = useToast();

  const loadMedia = () => {
    api.getMediaLibrary().then(res => setMedia(res));
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleAddUrl = async (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      await api.addMediaItem({ url: urlInput.trim(), name: nameInput || 'Media Asset' });
      setUrlInput('');
      setNameInput('');
      loadMedia();
      addToast('Media asset added to library.', 'success');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await api.addMediaItem({ url: reader.result, name: file.name });
        loadMedia();
        addToast('File uploaded to media library.', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    addToast('Image URL copied to clipboard!', 'info');
  };

  const handleDelete = async (id) => {
    await api.deleteMediaItem(id);
    loadMedia();
    addToast('Media asset deleted.', 'info');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Media Library Assets</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Upload, manage, and copy asset links for catalog & editorial use</p>
      </div>

      {/* Add Media Bar */}
      <form onSubmit={handleAddUrl} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '1.5rem', borderRadius: '2px', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Asset Name (e.g. Ring Banner)"
          className="form-input"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          style={{ width: '200px' }}
        />
        <input
          type="text"
          placeholder="Enter Unsplash Image URL..."
          className="form-input"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          style={{ flex: 1, minWidth: '250px' }}
        />
        <button type="submit" className="btn btn-gold btn-sm">
          <Plus size={16} /> Add Image URL
        </button>

        <label htmlFor="media-upload-file" className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
          <Upload size={16} /> Upload File
        </label>
        <input type="file" id="media-upload-file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
      </form>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {media.map(m => (
          <div key={m.id} className="card" style={{ padding: '0.75rem', position: 'relative' }}>
            <SmartImage src={m.url} alt={m.name} aspectRatio="1/1" />
            <div style={{ marginTop: '0.75rem' }}>
              <strong style={{ display: 'block', fontSize: '0.85rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{m.name}</strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--stone)' }}>{m.date}</span>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <button onClick={() => handleCopyUrl(m.url)} className="btn btn-outline-gold btn-sm" style={{ flex: 1, padding: '0.3rem', fontSize: '0.72rem' }}>
                  <Copy size={12} /> Copy URL
                </button>
                <button onClick={() => handleDelete(m.id)} style={{ color: 'var(--error)', padding: '0.3rem' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMediaLibrary;
