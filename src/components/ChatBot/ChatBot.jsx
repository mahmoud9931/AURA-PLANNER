import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './ChatBot.css';

const WELCOME_MESSAGE = {
    id: 'welcome',
    role: 'bot',
    text: 'أهلاً بيك في AURA! أنا مساعدك الذكي — اسألني عن القاعات، المناسبات، أو أي حاجة تحتاج مساعدة فيها.',
};

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([WELCOME_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            inputRef.current?.focus();
        }
    }, [isOpen, messages, isLoading]);

    const sendMessage = async (event) => {
        event?.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        const userMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            text: trimmed,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const { data } = await axios.post('/api/chat', { message: trimmed });
            const reply = data?.reply || data?.message || 'لم أستطع الحصول على رد. حاول مرة أخرى.';

            setMessages((prev) => [
                ...prev,
                {
                    id: `bot-${Date.now()}`,
                    role: 'bot',
                    text: reply,
                },
            ]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                {
                    id: `error-${Date.now()}`,
                    role: 'bot',
                    text: 'حدث خطأ أثناء إرسال الرسالة. تأكد من الاتصال بالإنترنت وحاول مرة أخرى.',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-root">
            <div className={`chatbot-panel ${isOpen ? 'chatbot-panel--open' : ''}`}>
                <header className="chatbot-header">
                    <div className="chatbot-header-info">
                        <div className="chatbot-avatar">
                            <ChatIcon />
                        </div>
                        <div>
                            <h3 className="chatbot-title">AURA Assistant</h3>
                            <span className="chatbot-status">
                                <span className="chatbot-status-dot" />
                                متصل الآن
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="chatbot-close"
                        onClick={() => setIsOpen(false)}
                        aria-label="إغلاق المحادثة"
                    >
                        <CloseIcon />
                    </button>
                </header>

                <div className="chatbot-messages">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`chatbot-bubble chatbot-bubble--${msg.role}`}
                        >
                            {msg.role === 'bot' && (
                                <div className="chatbot-bubble-avatar">
                                    <ChatIcon />
                                </div>
                            )}
                            <p className="chatbot-bubble-text">{msg.text}</p>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="chatbot-bubble chatbot-bubble--bot">
                            <div className="chatbot-bubble-avatar">
                                <ChatIcon />
                            </div>
                            <div className="chatbot-typing">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chatbot-input-area" onSubmit={sendMessage}>
                    <input
                        ref={inputRef}
                        type="text"
                        className="chatbot-input"
                        placeholder="اكتب رسالتك هنا..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className="chatbot-send"
                        disabled={!input.trim() || isLoading}
                        aria-label="إرسال"
                    >
                        <SendIcon />
                    </button>
                </form>
            </div>

            <button
                type="button"
                className={`chatbot-fab ${isOpen ? 'chatbot-fab--open' : ''}`}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? 'إغلاق المحادثة' : 'فتح المحادثة'}
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
                {!isOpen && <span className="chatbot-fab-pulse" />}
            </button>
        </div>
    );
}

function ChatIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

function SendIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
    );
}
