import React from 'react';
import Chatbot from './components/Chatbot'; 
import './App.css'; 

function App() {
  return (
    <div className="App">
      {/*web sitenin ana içeriği */}
      <header className="App-header">
        <h1>KolayOptik</h1>
        <p>
          Chatbot sağ altta yer alıyor.
        </p>
      </header>

      {/* Chatbot componenti */}
      <Chatbot />
    </div>
  );
}

export default App;