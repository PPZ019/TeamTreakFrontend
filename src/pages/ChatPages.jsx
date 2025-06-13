import React, { useState, useEffect } from 'react';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleChat = () => {
    if (isChatOpen) {
      // Start closing animation
      setIsAnimating(false);
    } else {
      // Open immediately
      setIsChatOpen(true);
      setIsAnimating(true);
    }
  };

  useEffect(() => {
    if (!isAnimating && isChatOpen) {
      // Delay unmount to allow exit animation
      const timer = setTimeout(() => {
        setIsChatOpen(false);
      }, 300); // Match animation duration (300ms)
      return () => clearTimeout(timer);
    }
  }, [isAnimating, isChatOpen]);

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Embed Tailwind CSS animations */}
      <style jsx>{`
        @layer utilities {
          @keyframes slide-up {
            0% {
              transform: translateY(100%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes slide-down {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(100%);
              opacity: 0;
            }
          }

          .animate-slide-up {
            animation: slide-up 0.3s ease-out forwards;
          }

          .animate-slide-down {
            animation: slide-down 0.3s ease-in forwards;
          }
        }
      `}</style>

      {/* Chat Icon */}
      <div
        className="fixed bottom-8 right-8 z-50"
        onClick={toggleChat}
      >
        <div className="w-16 h-16 bg-blue-900 text-white text-4xl rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          {isChatOpen ? '✖' : '💬'}
        </div>
      </div>

      {/* Chat Box */}
      {isChatOpen && (
        <div
          className={`fixed bottom-16 right-5 z-40 ${isAnimating ? 'animate-slide-up' : 'animate-slide-down'}`}
        >
          <ChatBox />
        </div>
      )}
    </div>
  );
};

export default ChatPage;