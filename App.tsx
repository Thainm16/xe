import { useState } from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';

const cars = [
  {
    id: 1,
    name: 'Lamborghini Aventador SVJ',
    price: '48.000.000.000',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    specs: 'V12 6.5L | 770 HP | 0-100: 2.8s | Tốc độ tối đa: 350 km/h',
    sound: 'v12'
  },
  {
    id: 2,
    name: 'Ferrari SF90 Stradale',
    price: '52.000.000.000',
    image: 'https://images.unsplash.com/photo-1675426513824-25a43c3ae0ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    specs: 'V8 Hybrid | 1000 HP | 0-100: 2.5s | Tốc độ tối đa: 340 km/h',
    sound: 'f1'
  },
  {
    id: 3,
    name: 'Bugatti Chiron',
    price: '120.000.000.000',
    image: 'https://images.unsplash.com/photo-1627454820516-dc767bcb4d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    specs: 'W16 8.0L | 1500 HP | 0-100: 2.4s | Tốc độ tối đa: 420 km/h',
    sound: 'turbine'
  },
  {
    id: 4,
    name: 'Porsche 911 GT3 RS',
    price: '22.000.000.000',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    specs: 'Flat-6 4.0L | 525 HP | 0-100: 3.2s | Tốc độ tối đa: 296 km/h',
    sound: 'v12'
  },
  {
    id: 5,
    name: 'McLaren 720S',
    price: '28.000.000.000',
    image: 'https://images.unsplash.com/photo-1728522298299-bf2476f378f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    specs: 'V8 Twin-Turbo | 720 HP | 0-100: 2.9s | Tốc độ tối đa: 341 km/h',
    sound: 'f1'
  },
  {
    id: 6,
    name: 'Aston Martin DBS Superleggera',
    price: '35.000.000.000',
    image: 'https://images.unsplash.com/photo-1584082411947-dfa856e714eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    specs: 'V12 5.2L | 715 HP | 0-100: 3.4s | Tốc độ tối đa: 340 km/h',
    sound: 'v12'
  },
  {
    id: 7,
    name: 'Koenigsegg Jesko',
    price: '85.000.000.000',
    image: 'https://images.unsplash.com/photo-1679858617731-70b37a0d2140?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    specs: 'V8 Twin-Turbo | 1600 HP | 0-100: 2.5s | Tốc độ tối đa: 480 km/h',
    sound: 'turbine'
  },
  {
    id: 8,
    name: 'Rimac Nevera',
    price: '55.000.000.000',
    image: 'https://images.unsplash.com/photo-1750376864186-c8d3249389eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    specs: 'Electric | 1914 HP | 0-100: 1.85s | Tốc độ tối đa: 412 km/h',
    sound: 'f1'
  },
  {
    id: 9,
    name: 'Pagani Huayra',
    price: '95.000.000.000',
    image: 'https://images.unsplash.com/photo-1597935526289-3fb74b52e2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    specs: 'V12 Twin-Turbo | 730 HP | 0-100: 3.2s | Tốc độ tối đa: 383 km/h',
    sound: 'v12'
  },
  {
    id: 10,
    name: 'Tesla Roadster',
    price: '18.000.000.000',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    specs: 'Electric | 1020 HP | 0-100: 1.9s | Tốc độ tối đa: 400 km/h',
    sound: 'f1'
  }
];

// Simple sound effect simulation using Web Audio API
const playEngineSound = (type: string) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Different frequencies for different engine types
  if (type === 'v12') {
    oscillator.frequency.value = 220; // Deep V12 rumble
  } else if (type === 'f1') {
    oscillator.frequency.value = 440; // High-pitched F1 scream
  } else if (type === 'turbine') {
    oscillator.frequency.value = 330; // Jet-like turbine
  }
  
  oscillator.type = 'sawtooth';
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
};

const CarCard = ({ car }: { car: typeof cars[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (!isFlipped) {
      playEngineSound(car.sound);
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="perspective-1000 h-96 cursor-pointer group"
      onClick={handleClick}
    >
      <div 
        className={`relative w-full h-full transition-all duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180 scale-110' : 'hover:scale-105'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg) scale(1.1)' : 'rotateY(0deg)',
          transition: 'transform 0.7s cubic-bezier(0.4, 0.0, 0.2, 1), box-shadow 0.3s'
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute inset-0 bg-black rounded-xl overflow-hidden shadow-2xl backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white mb-2">{car.name}</h3>
              <p className="text-red-500">{car.price} VNĐ</p>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black rounded-xl p-6 shadow-2xl backface-hidden flex flex-col justify-center items-center text-center"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <h3 className="text-white mb-4">{car.name}</h3>
          <p className="text-zinc-300 mb-6">{car.specs}</p>
          <p className="text-red-500 mb-6">{car.price} VNĐ</p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
            Liên hệ Cần Đước
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Preload Inter font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap&subset=vietnamese" rel="stylesheet" />

      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm z-50 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="text-red-600">
              <h1>THÁI PHÁT MOTORS</h1>
            </div>
            <div className="flex gap-8">
              {[
                { id: 'home', label: 'Trang chủ' },
                { id: 'xe', label: 'XE' },
                { id: 'about', label: 'Về chúng tôi' },
                { id: 'team', label: 'Đội ngũ' },
                { id: 'news', label: 'Tin tức' },
                { id: 'contact', label: 'Liên hệ' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`transition-colors ${
                    activeSection === item.id ? 'text-red-500' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        {/* Hero Section */}
        {activeSection === 'home' && (
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1621135802920-133df287f89c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)',
                filter: 'brightness(0.3)'
              }}
            />
            <div className="relative z-10 text-center px-4">
              <h2 className="text-red-600 mb-4">THÁI PHÁT MOTORS</h2>
              <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
                Showroom siêu xe hàng đầu tại Cần Đước, Long An
              </p>
              <button 
                onClick={() => setActiveSection('xe')}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105"
              >
                Khám phá bộ sưu tập
              </button>
            </div>
          </section>
        )}

        {/* Cars Section */}
        {activeSection === 'xe' && (
          <section className="min-h-screen py-20 px-4">
            <div className="container mx-auto">
              <h2 className="text-center text-red-600 mb-12">BỘ SƯU TẬP SIÊU XE</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {cars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <section className="min-h-screen py-20 px-4 flex items-center">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-center text-red-600 mb-12">VỀ CHÚNG TÔI</h2>
              <div className="bg-zinc-900 rounded-xl p-8">
                <p className="text-zinc-300 mb-6">
                  Thái Phát Motors là showroom siêu xe cao cấp hàng đầu tại Long An, chuyên cung cấp 
                  các dòng xe thể thao và siêu xe từ những thương hiệu danh tiếng nhất thế giới.
                </p>
                <p className="text-zinc-300 mb-6">
                  Với vị trí thuận lợi tại Trường Cao đẳng Long An, Thị trấn Cần Đước, chúng tôi 
                  mang đến trải nghiệm mua sắm đẳng cấp và dịch vụ chăm sóc khách hàng tận tâm.
                </p>
                <p className="text-zinc-300">
                  Đội ngũ chuyên viên tư vấn giàu kinh nghiệm của chúng tôi luôn sẵn sàng hỗ trợ 
                  quý khách trong việc lựa chọn chiếc siêu xe phù hợp nhất.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Team Section */}
        {activeSection === 'team' && (
          <section className="min-h-screen py-20 px-4 flex items-center">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-center text-red-600 mb-12">ĐỘI NGŨ LÃNH ĐẠO</h2>
              <div className="bg-zinc-900 rounded-xl p-8 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-800 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                  NT
                </div>
                <h3 className="text-white mb-2">Nguyễn Minh Thái</h3>
                <p className="text-red-500 mb-4">Owner & CEO</p>
                <p className="text-zinc-300 max-w-2xl mx-auto">
                  Với tầm nhìn chiến lược và đam mê siêu xe, ông Nguyễn Minh Thái đã xây dựng 
                  Thái Phát Motors trở thành điểm đến uy tín cho những tín đồ siêu xe tại Việt Nam.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* News Section */}
        {activeSection === 'news' && (
          <section className="min-h-screen py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-center text-red-600 mb-12">TIN TỨC MỚI NHẤT</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: 'Lamborghini Aventador SVJ mới về showroom', date: '10/11/2025' },
                  { title: 'Chương trình ưu đãi đặc biệt tháng 11', date: '05/11/2025' },
                  { title: 'Ferrari SF90 - Công nghệ hybrid đỉnh cao', date: '01/11/2025' }
                ].map((news, idx) => (
                  <div key={idx} className="bg-zinc-900 rounded-xl p-6 hover:bg-zinc-800 transition-colors cursor-pointer">
                    <p className="text-red-500 mb-2">{news.date}</p>
                    <h3 className="text-white">{news.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <section className="min-h-screen py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-center text-red-600 mb-12">LIÊN HỆ</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-zinc-900 rounded-xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <MapPin className="text-red-500 flex-shrink-0" size={24} />
                    <div>
                      <p className="text-white mb-1">Địa chỉ</p>
                      <p className="text-zinc-400">
                        Trường Cao đẳng Long An<br />
                        Thị trấn Cần Đước, Huyện Cần Đước<br />
                        Tỉnh Long An, Việt Nam
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <Phone className="text-red-500 flex-shrink-0" size={24} />
                    <div>
                      <p className="text-white mb-1">Điện thoại</p>
                      <p className="text-zinc-400">+84 123 456 789</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="text-red-500 flex-shrink-0" size={24} />
                    <div>
                      <p className="text-white mb-1">Email</p>
                      <p className="text-zinc-400">info@thaiphatmotors.vn</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden h-96">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.5789!2d106.5789!3d10.4789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDI4JzQ0LjAiTiAxMDbCsDM0JzQ0LjAiRQ!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Thái Phát Motors Location"
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-zinc-500">
            © 2025 NGUYỄN MINH THÁI Motors – Cần Đước, Long An
          </p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
