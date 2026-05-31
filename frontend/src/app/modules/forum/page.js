'use client';
import React, { useState } from 'react';

export default function CommunityForumModule() {
  const [posts, setPosts] = useState([
    { author: 'Rahul Sharma', flat: 'A-402', category: 'Notice', content: 'Water supply will be affected from 2 PM to 4 PM tomorrow due to tank cleaning.', likes: 12, time: '2 hours ago' },
    { author: 'Priya Patel', flat: 'C-105', category: 'Event', content: 'Anyone up for weekend Badminton tournament? We need 4 more players!', likes: 8, time: '5 hours ago' },
    { author: 'Vikram Singh', flat: 'B-201', category: 'Lost & Found', content: 'Found a set of car keys near the basement lift lobby. Please DM if yours.', likes: 3, time: '1 day ago' },
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setPosts([{ author: 'Me', flat: 'My Flat', category: 'Discussion', content: newPost, likes: 0, time: 'Just now' }, ...posts]);
    setNewPost('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-3xl font-extrabold text-teal-800">💬 Community Forum</h1>
            <p className="text-gray-500 mt-1">Connect, discuss, and stay updated with your neighbors.</p>
          </div>
          <a href="/" className="px-5 py-2.5 bg-teal-50 text-teal-700 font-semibold rounded-lg hover:bg-teal-100 transition-colors">
            Dashboard
          </a>
        </div>

        {/* Create Post */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <form onSubmit={handlePost}>
            <textarea 
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's happening in the society?"
              className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-teal-500 outline-none resize-none h-24 mb-4"
            ></textarea>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button type="button" className="p-2 text-gray-400 hover:text-teal-600 bg-gray-50 rounded-lg">📷 Photo</button>
                <button type="button" className="p-2 text-gray-400 hover:text-teal-600 bg-gray-50 rounded-lg">📊 Poll</button>
              </div>
              <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors">
                Post
              </button>
            </div>
          </form>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map((post, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xl mr-4">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{post.author}</h3>
                    <p className="text-xs text-gray-500 font-medium">Flat {post.flat} &bull; {post.time}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase ${
                  post.category === 'Notice' ? 'bg-red-100 text-red-700' :
                  post.category === 'Event' ? 'bg-purple-100 text-purple-700' :
                  post.category === 'Lost & Found' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {post.category}
                </span>
              </div>
              <p className="text-gray-800 mb-4">{post.content}</p>
              <div className="border-t border-gray-100 pt-4 flex space-x-6">
                <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors font-medium text-sm">
                  <span className="mr-2">❤️</span> {post.likes} Likes
                </button>
                <button className="flex items-center text-gray-500 hover:text-teal-600 transition-colors font-medium text-sm">
                  <span className="mr-2">💬</span> Reply
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
