'use client';
import React, { useState, useEffect } from 'react';

export default function StockModule() {
  const [stockItems, setStockItems] = useState([
    { item: 'Floor Cleaner (5L)', quantity: 15, status: 'In Stock', lastUpdated: 'Today, 09:00 AM' },
    { item: 'LED Bulbs (12W)', quantity: 4, status: 'Low Stock', lastUpdated: 'Yesterday, 04:30 PM' },
    { item: 'Garbage Bags', quantity: 120, status: 'In Stock', lastUpdated: 'Today, 11:15 AM' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Floor Cleaner (5L)');
  const [transactionType, setTransactionType] = useState('IN');
  const [qty, setQty] = useState('');
  const [purpose, setPurpose] = useState('Restock');
  const [submitting, setSubmitting] = useState(false);

  // Load stock items from localStorage on mount
  useEffect(() => {
    const storedStock = localStorage.getItem('society_stock');
    if (storedStock) {
      setStockItems(JSON.parse(storedStock));
    }
    
    // Sync with backend on load if any transactions exist
    fetch('http://localhost:5000/api/stock')
      .then(res => res.json())
      .then(transactions => {
        if (transactions && transactions.length > 0) {
          // Recompute current balances based on transactions
          const updatedItems = storedStock ? JSON.parse(storedStock) : [...stockItems];
          transactions.forEach(tx => {
            const index = updatedItems.findIndex(i => i.item === tx.item_id_barcode);
            if (index !== -1) {
              const qtyNum = parseFloat(tx.quantity);
              if (tx.transaction_type === 'IN') {
                updatedItems[index].quantity += qtyNum;
              } else if (tx.transaction_type === 'OUT') {
                updatedItems[index].quantity = Math.max(0, updatedItems[index].quantity - qtyNum);
              }
              updatedItems[index].status = updatedItems[index].quantity >= 5 ? 'In Stock' : 'Low Stock';
              updatedItems[index].lastUpdated = new Date(tx.createdAt || tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date(tx.createdAt || tx.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' });
            }
          });
          setStockItems(updatedItems);
        }
      })
      .catch(err => console.error("Could not sync with backend transactions history", err));
  }, []);

  // Save stock items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('society_stock', JSON.stringify(stockItems));
  }, [stockItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const qtyNum = parseFloat(qty);
    if (isNaN(qtyNum) || qtyNum <= 0) return;

    setSubmitting(true);

    // Calculate new local balance
    const updatedItems = stockItems.map(item => {
      if (item.item === selectedItem) {
        let newQty = item.quantity;
        if (transactionType === 'IN') {
          newQty += qtyNum;
        } else {
          newQty = Math.max(0, newQty - qtyNum);
        }
        const newStatus = newQty >= 5 ? 'In Stock' : 'Low Stock';
        
        const now = new Date();
        const lastUpdatedStr = 'Today, ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return {
          ...item,
          quantity: newQty,
          status: newStatus,
          lastUpdated: lastUpdatedStr
        };
      }
      return item;
    });

    const targetItem = updatedItems.find(i => i.item === selectedItem);

    try {
      // Post to backend Stock API
      const res = await fetch('http://localhost:5000/api/stock/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_id_barcode: selectedItem,
          transaction_type: transactionType,
          quantity: qtyNum,
          balance_after: targetItem.quantity,
          purpose: purpose
        })
      });

      if (!res.ok) throw new Error('API request failed');

      // Update local state reactively
      setStockItems(updatedItems);
      setIsModalOpen(false);
      setQty('');
      setPurpose('Restock');
    } catch (err) {
      console.error(err);
      alert("Failed to submit transaction: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Material & Stock</h1>
            <p className="text-gray-500 mt-1 text-sm">Barcode tracking and inventory audit</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Current Inventory</h2>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-orange-700 hover:shadow-lg transition-all flex items-center gap-2"
              >
                ➕ Add Stock
              </button>
            </div>
            
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-orange-50 text-orange-800 text-sm tracking-wider">
                  <th className="p-4 rounded-tl-lg font-semibold">Item Name</th>
                  <th className="p-4 font-semibold">Quantity</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 rounded-tr-lg font-semibold">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stockItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{item.item}</td>
                    <td className="p-4 font-bold text-gray-600">{item.quantity}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">{item.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Premium Scan & Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100 transform transition-all animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">📦</span>
                </div>
                Stock Transaction
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Current Stock Info */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 mb-6 border border-orange-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Selected Item</p>
                  <p className="text-sm font-bold text-gray-800">{selectedItem}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Current Stock</p>
                  <p className="text-2xl font-black text-orange-600">
                    {stockItems.find(i => i.item === selectedItem)?.quantity || 0}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Select Item
                </label>
                <select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-800 font-medium"
                >
                  {stockItems.map((item, idx) => (
                    <option key={idx} value={item.item}>{item.item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Transaction Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center justify-center gap-2 p-4 border-2 rounded-xl cursor-pointer transition-all ${transactionType === 'IN' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                    <input 
                      type="radio" 
                      name="txType"
                      value="IN"
                      checked={transactionType === 'IN'}
                      onChange={() => setTransactionType('IN')}
                      className="hidden"
                    />
                    <span className="text-2xl">📥</span>
                    <span className="text-sm font-bold text-gray-700">Stock IN</span>
                  </label>

                  <label className={`flex items-center justify-center gap-2 p-4 border-2 rounded-xl cursor-pointer transition-all ${transactionType === 'OUT' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}>
                    <input 
                      type="radio" 
                      name="txType"
                      value="OUT"
                      checked={transactionType === 'OUT'}
                      onChange={() => setTransactionType('OUT')}
                      className="hidden"
                    />
                    <span className="text-2xl">📤</span>
                    <span className="text-sm font-bold text-gray-700">Stock OUT</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Quantity
                  </label>
                  <input 
                    type="number"
                    min="1"
                    step="any"
                    required
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    placeholder="Enter quantity"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Purpose
                  </label>
                  <input 
                    type="text"
                    required
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="e.g. Restock"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-800 font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-bold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Processing...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
