import { useState } from 'react';
import api from '../utils/api';

export default function FileUpload({ onFileUploaded }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      await api.post('/files/upload', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('File uploaded successfully!');
      onFileUploaded();
    } catch (error) {
      alert('File upload failed: ' + error.response?.data?.error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
