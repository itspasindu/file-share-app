import { useEffect, useState } from 'react';
import api from '../utils/api';
import FileUpload from '../components/FileUpload';

export default function Dashboard() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/files', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(response.data);
    } catch (error) {
      alert('Failed to load files.');
    }
  };

  const handleDelete = async (filename) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/files/${filename}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('File deleted successfully!');
      fetchFiles();
    } catch (error) {
      alert('Failed to delete file: ' + error.response?.data?.error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <FileUpload onFileUploaded={fetchFiles} />
      <h2>Your Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            {file.filename}
            <a
              href={`http://localhost:5000/uploads/${file.filename}`}
              download
              style={{ marginLeft: '10px' }}
            >
              Download
            </a>
            <button onClick={() => handleDelete(file.filename)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
