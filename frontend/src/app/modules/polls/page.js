'use client';
import React, { useState, useEffect } from 'react';

export default function PollsModule() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/polls');
      const data = await res.json();
      setPolls(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleVote = (pollId, option) => {
    alert(`You voted for: ${option}. (Dynamic backend update required)`);
    // In a real app, send a POST request to update the vote count
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-purple-900">📊 Society Polls</h1>
            <p className="text-gray-500 mt-2">Voice your opinion on society decisions.</p>
          </div>
          <a href="/" className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors shadow-sm">
            Home
          </a>
        </div>

        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading polls...</p>
          ) : polls.length === 0 ? (
             <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
              <span className="text-6xl mb-4 block">🗳️</span>
              <h3 className="text-xl font-bold text-gray-800">No active polls.</h3>
            </div>
          ) : (
            polls.map((poll, idx) => {
              const totalVotes = poll.votes_a + poll.votes_b;
              const percentA = totalVotes === 0 ? 0 : Math.round((poll.votes_a / totalVotes) * 100);
              const percentB = totalVotes === 0 ? 0 : Math.round((poll.votes_b / totalVotes) * 100);

              return (
                <div key={idx} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-purple-500"></div>
                  <div className="flex justify-between items-start mb-6 pl-4">
                    <h3 className="text-2xl font-bold text-gray-900">{poll.question}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full ml-4">Active</span>
                  </div>
                  
                  <div className="pl-4 space-y-4">
                    {/* Option A */}
                    <div 
                      onClick={() => handleVote(poll.id, poll.option_a)}
                      className="group relative cursor-pointer"
                    >
                      <div className="flex justify-between items-center mb-1 relative z-10 px-4 py-2 text-gray-800 font-medium group-hover:text-purple-800">
                        <span>{poll.option_a}</span>
                        <span>{percentA}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-xl h-10 absolute top-0 left-0 overflow-hidden">
                        <div className="h-full bg-purple-100 group-hover:bg-purple-200 transition-all duration-1000 ease-out" style={{ width: `${percentA}%` }}></div>
                      </div>
                    </div>

                    {/* Option B */}
                    <div 
                      onClick={() => handleVote(poll.id, poll.option_b)}
                      className="group relative cursor-pointer"
                    >
                      <div className="flex justify-between items-center mb-1 relative z-10 px-4 py-2 text-gray-800 font-medium group-hover:text-purple-800">
                        <span>{poll.option_b}</span>
                        <span>{percentB}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-xl h-10 absolute top-0 left-0 overflow-hidden">
                        <div className="h-full bg-purple-100 group-hover:bg-purple-200 transition-all duration-1000 ease-out" style={{ width: `${percentB}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-50 pl-4 text-sm text-gray-400 font-medium flex justify-between">
                    <span>Total Votes: {totalVotes}</span>
                    <span>Created by: {poll.created_by}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
