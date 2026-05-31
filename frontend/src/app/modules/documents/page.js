'use client';
import React, { useState } from 'react';
import { FilePlus, Search, Filter, Download, Upload, FolderOpen, FileText } from 'lucide-react';

export default function DocumentsModule() {
  const [documents, setDocuments] = useState([
    { id: 1, title: 'Society Bye-Laws 2026', category: 'Bye-Laws', date: '01 Jan 2026', size: '2.5 MB' },
    { id: 2, title: 'Fire Safety Certificate', category: 'Safety Certificate', date: '15 Mar 2026', size: '1.2 MB' },
    { id: 3, title: 'AGM Minutes of Meeting', category: 'MOM', date: '10 Apr 2026', size: '3.8 MB' },
    { id: 4, title: 'Annual Audit Report 2025', category: 'Audit Report', date: '20 Feb 2026', size: '5.1 MB' },
  ]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', file: null });
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    const newDoc = {
      id: documents.length + 1,
      title: formData.title,
      category: formData.category,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      size: formData.file ? (formData.file.size / 1024 / 1024).toFixed(1) + ' MB' : '0 MB'
    };
    setDocuments([newDoc, ...documents]);
    setShowUploadModal(false);
    setFormData({ title: '', category: '', file: null });
    alert('Document uploaded successfully!');
  };

  const handleDownload = (doc) => {
    alert(`Downloading: ${doc.title}`);
  };

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <FolderOpen size={24} className="text-white" />
              </div>
              Society Documents
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Manage and download official society documents</p>
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center gap-2"
          >
            <Upload size={18} /> Upload Document
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search documents..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 whitespace-nowrap transition-colors">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <FileText size={24} className="text-white" />
                </div>
                <button 
                  onClick={() => handleDownload(doc)}
                  className="text-blue-600 bg-blue-50 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Download size={18} />
                </button>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{doc.title}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg uppercase">{doc.category}</span>
                <span className="text-xs text-gray-500">{doc.size}</span>
              </div>
              <p className="text-xs text-gray-400">{doc.date}</p>
            </div>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FolderOpen size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-semibold">No documents found</p>
            <p className="text-sm">Try adjusting your search or upload a new document</p>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Upload size={20} className="text-white" />
                  </div>
                  Upload Document
                </h2>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleUpload} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Document Title
                  </label>
                  <input 
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter document title"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 font-medium"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Bye-Laws">Bye-Laws</option>
                    <option value="Safety Certificate">Safety Certificate</option>
                    <option value="MOM">MOM</option>
                    <option value="Audit Report">Audit Report</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                    <input 
                      type="file"
                      onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 font-bold rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
