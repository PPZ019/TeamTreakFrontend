import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ChatBox = () => {
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: 'Hello! I\'m TeamTreak HR Assistant. How can I help you today?'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await axios.post('http://localhost:5500/api/chat/public', {
                message: input
            });

            setMessages(prev => [...prev, {
                sender: 'bot',
                text: res.data.reply,
                isFallback: res.data.fallback,
                isCached: res.data.cached
            }]);
        } catch (err) {
            setMessages(prev => [...prev, {
                sender: 'bot',
                text: 'Service unavailable. Please contact HR at hr@teamtreak.com',
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const quickQueries = [
        'Apply for leave',
        'Leave balance',
        'Regularize attendance',
        'Payday info',
        'HR contact',
       
    ];

    return (
        <div className="flex flex-col mb-10 h-[400px] h-150 w-[300px] border mx-auto bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="bg-blue-900 text-white p-2.5 flex items-center">
                <div className="bg-white p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </div>
                <div>
                    <h2 className="font-semibold text-sm">TeamTreak HR</h2>
                    <p className="text-[10px] opacity-80">AI Assistant</p>
                </div>
            </div>

            <div className="flex-1 p-2.5 overflow-y-auto bg-gray-100">
                {messages.map((msg, i) => (
                    <div key={i} className={`mb-1.5 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] rounded-lg px-2.5 py-1 text-xs ${msg.isError ? 'bg-red-100 text-red-800' : msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 shadow-sm border border-gray-200'}`}>
                            {msg.text}
                            {msg.sender === 'bot' && !msg.isError && (
                                <>
                                    <p className="text-[9px] mt-0.5 text-gray-500">HR Assistant • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    {msg.isFallback && (
                                        <div className="text-[9px] text-yellow-600 mt-0.5">
                                            (Local response)
                                        </div>
                                    )}
                                    {msg.isCached && (
                                        <div className="text-[9px] text-gray-400 mt-0.5">
                                            (Cached)
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="px-2.5 py-1 bg-gray-200 border-t flex flex-wrap gap-1">
                {quickQueries.map((query, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setInput(query);
                            setTimeout(() => {
                                handleSend();
                            }, 0);
                        }}
                        className="text-[10px] bg-white hover:bg-blue-900 text-blue-600 px-2 py-0.5 rounded-full border border-blue-200 transition-colors duration-200"
                    >
                        {query}
                    </button>
                ))}
            </div>

            <div className="p-2.5 border-t bg-white">
                <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about HR..."
                        className="flex-1 border border-gray-300 rounded-l-md px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="bg-blue-800 hover:bg-blue-900 text-white px-2.5 rounded-r-md disabled:opacity-50 flex items-center text-xs transition-colors duration-200"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Send'
                        )}
                    </button>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                    Contact HR: hr@teamtreak.com
                </p>
            </div>
        </div>
    );
};

export default ChatBox;