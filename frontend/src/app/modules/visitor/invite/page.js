'use client';
import React, { useState } from 'react';

export default function WhatsAppInviteModule() {
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [date, setDate] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [passCode, setPassCode] = useState('');

  const generatePassCode = () => {
    const code = 'INV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setPassCode(code);
    return code;
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    const code = generatePassCode();
    setShowQR(true);
  };

  const handleWhatsAppShare = () => {
    const message = `Hello ${visitorName}, you are invited to visit on ${date}. Your Gate Pass Code: ${passCode}. Show this code at the main gate for direct entry!`;
    const whatsappUrl = `https://wa.me/${visitorPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-3xl font-extrabold text-green-700 tracking-tight">📱 WhatsApp QR Invite</h1>
            <p className="text-gray-500 mt-1 text-sm">Send a pre-approved Gatepass to your guests.</p>
          </div>
          <a href="/modules/visitor" className="mt-4 sm:mt-0 px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors shadow-sm">
            Back to Visitors
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h3 className="font-bold text-gray-800 text-lg mb-6 border-b pb-4">Generate Pass</h3>
            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Guest Name</label>
                <input type="text" value={visitorName} onChange={e => setVisitorName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none" required placeholder="e.g. Rahul Sharma" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
                <input type="tel" value={visitorPhone} onChange={e => setVisitorPhone(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none" required placeholder="+91 9876543210" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Visit</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none" required />
              </div>
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5 mt-4">
                Generate QR & Send
              </button>
            </form>
          </div>

          {/* Mock WhatsApp UI */}
          {showQR && (
            <div className="bg-[#EFEAE2] rounded-3xl shadow-2xl border-8 border-gray-900 p-4 relative overflow-hidden flex flex-col h-[500px] animate-fade-in-up">
              {/* Fake Phone Header */}
              <div className="bg-[#075E54] -mx-4 -mt-4 p-4 text-white flex items-center shadow-md z-10">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold mr-3">RS</div>
                <div className="font-bold text-lg">{visitorName}</div>
              </div>
              
              {/* WhatsApp Message Bubble */}
              <div className="bg-white rounded-xl rounded-tl-none p-4 mt-6 shadow-sm self-start max-w-[85%] relative">
                <div className="absolute top-0 -left-2 w-0 h-0 border-t-8 border-t-white border-l-8 border-l-transparent"></div>
                <div className="font-bold text-[#075E54] text-sm mb-2">MyGate Invitation</div>
                <p className="text-sm text-gray-800 mb-4">
                  Hello {visitorName}, you are invited to visit on {date}. Your Gate Pass Code is: <strong>{passCode}</strong>. Show this code at the main gate for direct entry!
                </p>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center mb-2">
                  {/* QR Code Display */}
                  <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center border-2 border-gray-300">
                    <div className="text-center">
                      <div className="text-4xl mb-1">📱</div>
                      <p className="text-xs font-bold text-gray-800">{passCode}</p>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-gray-400 text-right mt-1">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              </div>

              {/* WhatsApp Share Button */}
              <div className="mt-4 flex justify-center">
                <button 
                  onClick={handleWhatsAppShare}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Share via WhatsApp
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
