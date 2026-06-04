import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Trash2, Send, Loader2, Gamepad2 } from 'lucide-react';
import { auth, db, handleFirestoreError, signInWithGoogle, OperationType } from '../firebase';
import { collection, onSnapshot, query, where, orderBy, setDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

interface Post {
  id: string;
  userId: string;
  authorName: string;
  content: string;
  type: 'comment' | 'request';
  visibility: 'public';
  createdAt: any;
}

export function Forum() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostType, setNewPostType] = useState<'comment' | 'request'>('comment');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('visibility', '==', 'public'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(pData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'posts');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newPostContent.trim()) return;
    
    setIsSubmitting(true);
    const newDocRef = doc(collection(db, 'posts'));
    
    try {
      await setDoc(newDocRef, {
        userId: user.uid,
        authorName: user.displayName || 'Anonymous Player',
        content: newPostContent.trim(),
        type: newPostType,
        visibility: 'public',
        createdAt: serverTimestamp()
      });
      setNewPostContent('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'posts');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `posts/${postId}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-black italic uppercase text-white">Community Forum</h2>
        </div>
        
        {!user ? (
          <button 
            onClick={signInWithGoogle}
            className="px-6 py-2 bg-white text-black font-bold uppercase rounded-full hover:bg-gray-200 transition-colors text-sm"
          >
            Sign in with Google to post
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-purple-200 text-sm font-semibold">Welcome, {user.displayName}</span>
          </div>
        )}
      </div>

      {user && (
        <form onSubmit={handleSubmit} className="mb-10 bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex space-x-2 mb-4">
            <button
              type="button"
              onClick={() => setNewPostType('comment')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${newPostType === 'comment' ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'}`}
            >
              General Comment
            </button>
            <button
              type="button"
              onClick={() => setNewPostType('request')}
              className={`flex flex-row items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${newPostType === 'request' ? 'bg-pink-600 text-white shadow-[0_0_10px_rgba(219,39,119,0.5)]' : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'}`}
            >
              <Gamepad2 className="w-3.5 h-3.5"/> Game Request
            </button>
          </div>
          
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder={newPostType === 'comment' ? "What's on your mind?..." : "What game should we add next?..."}
            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 min-h-[100px] outline-none focus:border-purple-500/50 transition-colors resize-y"
            maxLength={1000}
            required
          />
          
          <div className="flex justify-end mt-3">
            <button 
              type="submit" 
              disabled={isSubmitting || !newPostContent.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl disabled:opacity-50 transition-all uppercase text-sm cursor-pointer"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Post
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center p-10">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center p-12 bg-white/5 border border-white/5 rounded-2xl text-gray-400 font-medium">
          No posts yet. Be the first to start the conversation!
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl relative group ${post.type === 'request' ? 'bg-gradient-to-br from-pink-900/20 to-black border border-pink-500/30' : 'bg-white/5 border border-white/10'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={`text-xs font-black uppercase px-2 py-0.5 rounded-full ${post.type === 'request' ? 'bg-pink-500/20 text-pink-300' : 'bg-purple-500/20 text-purple-300'}`}>
                    {post.type}
                  </div>
                  <span className="font-bold text-white text-sm">{post.authorName}</span>
                </div>
                
                {user && user.uid === post.userId && (
                  <button 
                    onClick={() => handleDelete(post.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                    title="Delete post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-gray-300 whitespace-pre-wrap font-sans text-sm">{post.content}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
