import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import './App.css';

// Sayfalar
function Home() {
  return (
    <div className="home-container">
      {/* Sol taraf: Fotoğraf */}
      <div className="home-left">
        <img 
          src="/profile.jpg"   
          alt="Benim Fotoğrafım" 
          className="profile-pic"
        />
      </div>

      {/* Sağ taraf: Özgeçmiş */}
      <div className="home-right">
        <h1>Semih Murat ARSLAN</h1>

        <section>
          <h2>Başlangıç</h2>
          <p>
            2020 yılında başlayan teknoloji serüvenim, T3 Vakfı'nın Deneyap atölyelerinde aldığım kapsamlı eğitimlerle şekillendi. 
            Dört yıl süren bu programda:
          </p>
          <ul>
            <li>Arduino ve Deneyap Kart ile gömülü sistemlerin temellerini öğrendim,</li>
            <li>Linux işletim sistemi üzerinde yetkinlik kazandım,</li>
            <li>AutoCAD Fusion 360 ile 3D tasarım ve modelleme becerilerimi geliştirdim.</li>
          </ul>
        </section>

        <section>
          <h2>Akademik Yolculuk</h2>
          <p>
            2024 yılında Yozgat Bozok Üniversitesi Bilgisayar Mühendisliği bölümüne başlayarak bu alandaki tutkumu akademik bir kariyere taşıdım.
          </p>
        </section>

        <section>
          <h2>Staj Deneyimi</h2>
          <p>
            Teorik bilgilerimi pratiğe dökmek amacıyla 2025 yılında ilk gönüllü stajımı KolaySoft bünyesindeki CFN Teknoloji'de gerçekleştirdim. 
            Bu süreçte özellikle <strong>Prompt Engineering</strong> üzerine yoğunlaştım.
          </p>
          <ul>
            <li>Bir web portalı için yapay zeka asistanının "system prompt"unu hazırladım.</li>
            <li>Kullanıcının deneyiminde karşılaşabileceği hataları inceleyip, yapay zekayı system prompt üzerinden optimize ederek yönlendirdim.</li>
            <li>Daha sonra yapay zeka asistanının tasarımını yaparak web portalına entegre ettim.</li>
            <li>KOSGEB ve Avrupa Birliği destekli projelerin toplantılarına aktif katıldım.</li>
          </ul>
        </section>

        <section>
          <h2>Şu An</h2>
          <p>
            2025-2026 dönemini kapsayan, Yapay Zeka ile İşletim Sistemleri arasındaki ilişkiyi inceleyen yenilikçi bir proje üzerinde araştırmalarımı sürdürüyorum.
          </p>
        </section>
      </div>
    </div>
  );
}



function Projects() {
  return (
    <header className="App-header">
      <h1>Github Profilim</h1>
      <p>
        <a 
          href="https://github.com/minitheguitarist" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: 'white', textDecoration: 'underline' }}
        >
          https://github.com/minitheguitarist
        </a>
      </p>
    </header>
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        {/* Sol üst menü */}
        <nav style={{ position: 'absolute', top: '10px', left: '10px' }}>
          <Link to="/">
            <button>Hakkımda</button>
          </Link>
          <Link to="/projects">
            <button>Projelerim</button>
          </Link>
        </nav>

        {/* Sayfalar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>

        {/* Chatbot her sayfada sağ altta */}
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
