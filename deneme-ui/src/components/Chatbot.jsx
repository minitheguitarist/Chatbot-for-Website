import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

// İkonlar
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  // 'messages' state'i artık LLM'e göndereceğimiz format
  const [messages, setMessages] = useState([
    
    { role: 'assistant', content: 'Merhaba, ben KolayOptik Asistanı. Size nasıl yardımcı olabilirim? 😊' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Kullanıcının mesajını oluştur
    const userMessage = { role: 'user', content: inputValue };

    // Kullanıcının mesajını ve önceki tüm mesajları içeren yeni bir geçmiş oluştur
    const updatedHistory = [...messages, userMessage];
    
    // Mesajı ekranda göster
    setMessages(updatedHistory);
    setInputValue('');

    try {
      // Python Flask sunucumuza isteği
      const response = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // API'ye 'history' anahtarıyla güncel konuşma geçmişini gönderir
        body: JSON.stringify({ history: updatedHistory }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = { role: 'assistant', content: data.response };

      // Sunucudan gelen cevabı mesaj listesine ekle
      setMessages(prevMessages => [...prevMessages, botResponse]);

    } catch (error) {
      console.error("API'ye bağlanırken hata oluştu:", error);
      const errorResponse = { role: 'assistant', content: 'Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.' };
      setMessages(prevMessages => [...prevMessages, errorResponse]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <h3>Yardımcı Asistan</h3>
          <button onClick={toggleChat} className="close-btn"><CloseIcon /></button>
        </div>
        <div className="chat-messages">
          {/* Sadece 'assistant' ve 'user' rollerini ekranda göstermesi */}
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}>
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="chat-input-area" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Sorunuzu yazınız..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="send-btn">Gönder</button>
        </form>
      </div>
      <button onClick={toggleChat} className="chat-toggle-button">
        <ChatIcon />
      </button>
    </div>
  );
};

export default Chatbot;