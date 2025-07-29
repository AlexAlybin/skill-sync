import axios from "@/lib/axios";
import { useState } from "react";

export const UploadSkillsForm = ({ onSkillAdded }: { onSkillAdded: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

     await axios.post('/upload/skills', formData, {
       headers: { 'Content-Type': 'multipart/form-data' },
     });

      alert('File uploaded successfully!');
      onSkillAdded();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while uploading the file.');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="border border-gray-300 my-3 px-3 py-2 rounded shadow-sm"/>
      <button type="submit" disabled={uploading} className="bg-blue-600 text-red px-4 py-2 rounded hover:bg-blue-700">
        {uploading ? 'Uploading...' : 'Upload Skills'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}