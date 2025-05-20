'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Property {
  _id: string;
  title: string;
  type: string;
  address: string;
  price: number;
  dealType: string;
  photos: string[]; // Убедитесь, что поле `image` существует в данных
}

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const [language, setLanguage] = useState<'ru' | 'uz'>('ru');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = status === "authenticated" && !!session?.user;

  // Фильтры
  const [type, setType] = useState('');
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  
  const handleLogout = () => {
    signOut();
  };

  // Получение данных
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (type) params.append('type', type);
      if (city) params.append('city', city);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);

      try {
        const res = await fetch(`/api/properties?${params.toString()}`);
        const data = await res.json();
        setProperties(data.payload || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [type, city, minPrice, maxPrice]); // Фильтр применяется при изменении

  const resetFilters = () => {
    setType('');
    setCity('');
    setMinPrice('');
    setMaxPrice('');
  };

  

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ru' ? 'uz' : 'ru');
  };

  // Примеры отзывов
  const reviews: Review[] = [
    {
      id: '1',
      name: 'Алексей Иванов',
      rating: 5,
      comment: 'Отличный сервис! Нашел квартиру своей мечты за неделю. Очень доволен работой команды.',
      date: '15.04.2023',
      avatar: '/placeholder.svg?height=50&width=50',
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      rating: 4,
      comment: 'Быстро продала свою квартиру благодаря этому сайту. Рекомендую всем, кто хочет сэкономить время.',
      date: '23.05.2023',
      avatar: '/placeholder.svg?height=50&width=50',
    },
    {
      id: '3',
      name: 'Дмитрий Петров',
      rating: 5,
      comment: 'Профессиональный подход и отличная поддержка на всех этапах сделки. Буду обращаться еще!',
      date: '07.06.2023',
      avatar: '/placeholder.svg?height=50&width=50',
    },
  ];

  // Тексты для разных языков
  const texts = {
    ru: {
      nav: {
        home: 'Главная',
        catalog: 'Каталог недвижимости',
        reviews: 'Отзывы',
        contacts: 'Контакты',
        login: 'Вход',
        register: 'Регистрация',
        profile: 'Профиль',
        logout: 'Выйти',
      },
      hero: {
        title: 'Найдите идеальную недвижимость',
        subtitle: 'Тысячи объектов недвижимости ждут вас. Начните поиск прямо сейчас!',
      },
      search: {
        propertyType: 'Тип недвижимости',
        apartment: 'Квартира',
        house: 'Дом',
        commercial: 'Коммерческая',
        land: 'Земля',
        city: 'Город или район',
        minPrice: 'Минимальная цена',
        maxPrice: 'Максимальная цена',
        reset: 'Сбросить фильтры',
        find: 'Найти',
      },
      properties: {
        title: 'Доступные объекты недвижимости',
        subtitle: 'Выберите из нашей коллекции тщательно отобранных объектов недвижимости',
        loading: 'Загрузка...',
        notFound: 'Объекты не найдены',
        tryAgain: 'Попробуйте изменить параметры поиска',
      },
      features: {
        title: 'Почему выбирают нас',
        subtitle: 'Мы предлагаем лучший сервис для поиска и продажи недвижимости',
        search: {
          title: 'Удобный поиск',
          text: 'Находите идеальную недвижимость с помощью нашего интуитивно понятного поиска и фильтров',
        },
        security: {
          title: 'Безопасные сделки',
          text: 'Гарантируем безопасность и прозрачность всех сделок с недвижимостью',
        },
        support: {
          title: 'Профессиональная поддержка',
          text: 'Наши эксперты всегда готовы помочь вам на каждом этапе сделки',
        },
      },
      reviews: {
        title: 'Отзывы наших клиентов',
        subtitle: 'Узнайте, что говорят о нас те, кто уже воспользовался нашими услугами',
      },
      cta: {
        title: 'Хотите продать свою недвижимость?',
        text: 'Разместите объявление и найдите покупателя быстро и без лишних хлопот',
        button: 'Разместить объявление',
      },
      footer: {
        about: 'О компании',
        aboutText: 'Мы помогаем вам найти, продать или арендовать недвижимость по Ташкенту.',
        contacts: 'Контакты',
        links: 'Полезные ссылки',
        terms: 'Условия использования',
        privacy: 'Политика конфиденциальности',
        social: 'Социальные сети',
        categories: 'Категории',
        apartments: 'Квартиры',
        houses: 'Дома',
        rent: 'Аренда',
        sale: 'Продажа',
        language: 'Язык',
        russian: 'Русский',
        uzbek: 'Узбекский',
        rights: 'Все права защищены',
      },
    },
    uz: {
      nav: {
        home: 'Asosiy',
        catalog: 'Ko\'chmas mulk katalogi',
        reviews: 'Sharhlar',
        contacts: 'Kontaktlar',
        login: 'Kirish',
        register: 'Ro\'yxatdan o\'tish',
        profile: 'Profil',
        logout: 'Chiqish',
      },
      hero: {
        title: 'Ideal ko\'chmas mulkni toping',
        subtitle: 'Minglab ko\'chmas mulk obyektlari sizni kutmoqda. Hoziroq qidirishni boshlang!',
      },
      search: {
        propertyType: 'Ko\'chmas mulk turi',
        apartment: 'Kvartira',
        house: 'Uy',
        commercial: 'Tijorat',
        land: 'Yer',
        city: 'Shahar yoki tuman',
        minPrice: 'Minimal narx',
        maxPrice: 'Maksimal narx',
        reset: 'Filtrlarni tiklash',
        find: 'Topish',
      },
      properties: {
        title: 'Mavjud ko\'chmas mulk obyektlari',
        subtitle: 'Bizning diqqat bilan tanlangan ko\'chmas mulk kolleksiyamizdan tanlang',
        loading: 'Yuklanmoqda...',
        notFound: 'Obyektlar topilmadi',
        tryAgain: 'Qidiruv parametrlarini o\'zgartirib ko\'ring',
      },
      features: {
        title: 'Nega bizni tanlashadi',
        subtitle: 'Biz ko\'chmas mulkni qidirish va sotish uchun eng yaxshi xizmatni taklif qilamiz',
        search: {
          title: 'Qulay qidiruv',
          text: 'Bizning intuitiv qidiruv va filtrlar yordamida ideal ko\'chmas mulkni toping',
        },
        security: {
          title: 'Xavfsiz bitimlar',
          text: 'Barcha ko\'chmas mulk bitimlarining xavfsizligi va shaffofligini kafolatlaymiz',
        },
        support: {
          title: 'Professional yordam',
          text: 'Bizning mutaxassislarimiz bitimning har bir bosqichida yordam berishga tayyor',
        },
      },
      reviews: {
        title: 'Mijozlarimizning sharhlari',
        subtitle: 'Bizning xizmatlarimizdan foydalangan odamlar nima deyishini bilib oling',
      },
      cta: {
        title: 'Ko\'chmas mulkingizni sotmoqchimisiz?',
        text: 'E\'lon joylashtiring va xaridor tez va muammosiz toping',
        button: 'E\'lon joylashtirish',
      },
      footer: {
        about: 'Kompaniya haqida',
        aboutText: 'Biz sizga Toshkent bo\'ylab ko\'chmas mulkni topish, sotish yoki ijaraga olishda yordam beramiz.',
        contacts: 'Kontaktlar',
        links: 'Foydali havolalar',
        terms: 'Foydalanish shartlari',
        privacy: 'Maxfiylik siyosati',
        social: 'Ijtimoiy tarmoqlar',
        categories: 'Kategoriyalar',
        apartments: 'Kvartiralar',
        houses: 'Uylar',
        rent: 'Ijara',
        sale: 'Sotish',
        language: 'Til',
        russian: 'Ruscha',
        uzbek: 'O\'zbekcha',
        rights: 'Barcha huquqlar himoyalangan',
      },
    },
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f7fa] to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3498db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="ml-2 text-xl font-bold text-[#2c3e50]">RealEstate</span>
              </Link>
              <div className="hidden md:ml-6 md:flex md:space-x-6">
                <a href="#home" className="inline-flex items-center px-1 pt-1 text-[#3498db] border-b-2 border-[#3498db] text-sm font-medium">
                  {t.nav.home}
                </a>
                <a href="#properties" className="inline-flex items-center px-1 pt-1 text-[#64748b] border-b-2 border-transparent hover:border-[#3498db] hover:text-[#3498db] text-sm font-medium">
                  {t.nav.catalog}
                </a>
                <a href="#reviews" className="inline-flex items-center px-1 pt-1 text-[#64748b] border-b-2 border-transparent hover:border-[#3498db] hover:text-[#3498db] text-sm font-medium">
                  {t.nav.reviews}
                </a>
                <a href="#footer" className="inline-flex items-center px-1 pt-1 text-[#64748b] border-b-2 border-transparent hover:border-[#3498db] hover:text-[#3498db] text-sm font-medium">
                  {t.nav.contacts}
                </a>
              </div>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4">
              <button 
                onClick={toggleLanguage}
                className="px-3 py-1 rounded-md text-sm font-medium text-[#64748b] hover:text-[#3498db]"
              >
                {language === 'ru' ? 'UZ' : 'RU'}
              </button>
              
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="px-3 py-2 rounded-md text-sm font-medium text-[#64748b] hover:text-[#3498db]">
                    {t.nav.profile}
                  </Link>
                  <Link href="/my-requests" className="px-3 py-2 rounded-md text-sm font-medium text-[#64748b] hover:text-[#3498db]">
                    Мои заявки
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#3498db] hover:bg-[#2980b9]"
                  >
                    {t.nav.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium text-[#64748b] hover:text-[#3498db]">
                    {t.nav.login}
                  </Link>
                  <Link href="/register" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#3498db] hover:bg-[#2980b9]">
                    {t.nav.register}
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#64748b] hover:text-[#3498db] hover:bg-gray-100 focus:outline-none"
              >
                <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            <a href="#home" className="block pl-3 pr-4 py-2 border-l-4 border-[#3498db] text-[#3498db] bg-[#ebf5ff] text-base font-medium">
              {t.nav.home}
            </a>
            <a href="#properties" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-[#64748b] hover:bg-gray-50 hover:border-[#3498db] hover:text-[#3498db] text-base font-medium">
              {t.nav.catalog}
            </a>
            <a href="#reviews" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-[#64748b] hover:bg-gray-50 hover:border-[#3498db] hover:text-[#3498db] text-base font-medium">
              {t.nav.reviews}
            </a>
            <a href="#footer" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-[#64748b] hover:bg-gray-50 hover:border-[#3498db] hover:text-[#3498db] text-base font-medium">
              {t.nav.contacts}
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <button 
                onClick={toggleLanguage}
                className="px-3 py-1 rounded-md text-sm font-medium text-[#64748b] hover:text-[#3498db]"
              >
                {language === 'ru' ? 'UZ' : 'RU'}
              </button>
              
              {isLoggedIn ? (
                <div className="ml-auto flex space-x-2">
                  <Link href="/profile" className="px-3 py-2 rounded-md text-sm font-medium text-[#64748b] hover:text-[#3498db]">
                    {t.nav.profile}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#3498db] hover:bg-[#2980b9]"
                  >
                    {t.nav.logout}
                  </button>
                </div>
              ) : (
                <div className="ml-auto flex space-x-2">
                  <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium text-[#64748b] hover:text-[#3498db]">
                    {t.nav.login}
                  </Link>
                  <Link href="/register" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#3498db] hover:bg-[#2980b9]">
                    {t.nav.register}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Здесь будет ваше изображение */}
          <div className="w-full h-full bg-[#e0e7ee] opacity-80"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#2c3e50]">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-[#34495e] max-w-2xl">
            {t.hero.subtitle}
          </p>
          
          {/* Поисковая форма */}
          <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select 
                className="w-full p-3 rounded-lg border border-[#cbd5e0] focus:outline-none focus:ring-2 focus:ring-[#3498db] transition-all bg-white"
                value={type} 
                onChange={e => setType(e.target.value)}
              >
                <option value="">{t.search.propertyType}</option>
                <option value="квартира">{t.search.apartment}</option>
                <option value="дом">{t.search.house}</option>
                <option value="коммерческая">{t.search.commercial}</option>
                <option value="земля">{t.search.land}</option>
              </select>

              <input
                type="text"
                placeholder={t.search.city}
                className="w-full p-3 rounded-lg border border-[#cbd5e0] focus:outline-none focus:ring-2 focus:ring-[#3498db] transition-all"
                value={city}
                onChange={e => setCity(e.target.value)}
              />

              <input
                type="number"
                placeholder={t.search.minPrice}
                className="w-full p-3 rounded-lg border border-[#cbd5e0] focus:outline-none focus:ring-2 focus:ring-[#3498db] transition-all"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
              />

              <input
                type="number"
                placeholder={t.search.maxPrice}
                className="w-full p-3 rounded-lg border border-[#cbd5e0] focus:outline-none focus:ring-2 focus:ring-[#3498db] transition-all"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
              />
            </div>
            
            <div className="flex justify-between mt-4">
              <button
                onClick={resetFilters}
                className="text-[#3498db] hover:text-[#2980b9] transition-colors"
              >
                {t.search.reset}
              </button>
              <button 
                className="bg-[#3498db] hover:bg-[#2980b9] text-white px-6 py-2 rounded-lg transition-colors shadow-md"
              >
                {t.search.find}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="properties" className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#2c3e50] mb-2">{t.properties.title}</h2>
          <p className="text-[#34495e] max-w-2xl mx-auto">
            {t.properties.subtitle}
          </p>
        </div>

        {/* Список недвижимости */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3498db]"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="text-2xl font-semibold text-[#2c3e50] mb-2">{t.properties.notFound}</h3>
            <p className="text-[#34495e]">{t.properties.tryAgain}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link href={`/properties/${property._id}`} key={property._id} className="block group">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full border border-[#e2e8f0]">
                  {/* Место для изображения */}
                  <div className="relative h-48 bg-[#e0e7ee] overflow-hidden">
  {property.photos && property.photos.length > 0 ? (
    <Image
      src={property.photos[0]}
      alt={property.title}
      fill
      className="rounded-t-xl object-cover"
      priority
    />
  ) : (
    <div className="w-full h-full bg-[#e0e7ee] flex items-center justify-center text-gray-500">
      Нет изображения
    </div>
  )}
  <div className="absolute top-2 right-2 bg-[#2c3e50] text-white px-3 py-1 rounded-full text-sm">
    {property.dealType}
  </div>
</div>

                  
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-[#2c3e50] group-hover:text-[#3498db] transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-[#34495e] mt-1">{property.address}</p>
                      </div>
                      <span className="bg-[#f1f5f9] text-[#3498db] px-2 py-1 rounded text-sm">
                        {property.type}
                      </span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
                      <div className="flex justify-between items-center">
                        <p className="text-2xl font-bold text-[#2c3e50]">
                          {property.price.toLocaleString()} USD
                        </p>
                        <button className="text-[#94a3b8] hover:text-[#3498db]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-[#f1f5f9] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#2c3e50] mb-2">{t.features.title}</h2>
            <p className="text-[#34495e] max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-[#e2e8f0]">
              <div className="w-12 h-12 bg-[#ebf5ff] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3498db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">{t.features.search.title}</h3>
              <p className="text-[#34495e]">
                {t.features.search.text}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-[#e2e8f0]">
              <div className="w-12 h-12 bg-[#ebf5ff] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3498db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">{t.features.security.title}</h3>
              <p className="text-[#34495e]">
                {t.features.security.text}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-[#e2e8f0]">
              <div className="w-12 h-12 bg-[#ebf5ff] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3498db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">{t.features.support.title}</h3>
              <p className="text-[#34495e]">
                {t.features.support.text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div id="reviews" className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#2c3e50] mb-2">{t.reviews.title}</h2>
          <p className="text-[#34495e] max-w-2xl mx-auto">
            {t.reviews.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-xl shadow-md border border-[#e2e8f0]">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-[#e0e7ee] overflow-hidden mr-4">
                  {/* Место для аватара */}
                </div>
                <div>
                  <h4 className="font-semibold text-[#2c3e50]">{review.name}</h4>
                  <p className="text-sm text-[#64748b]">{review.date}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-[#34495e]">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#2c3e50] to-[#3498db] rounded-2xl overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                {t.cta.title}
              </h2>
              <p className="text-blue-100 mb-6">
                {t.cta.text}
              </p>
              <Link href="/add-property">
                <button className="bg-white text-[#2c3e50] hover:bg-[#f8fafc] px-6 py-3 rounded-lg font-medium transition-colors shadow-md">
                  {t.cta.button}
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 relative min-h-[300px]">
              {/* Здесь будет ваше изображение */}
              <div className="w-full h-full bg-[#1a2530] opacity-30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="footer" className="bg-[#2c3e50] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* О компании */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.about}</h3>
              <p className="text-blue-100 mb-4">{t.footer.aboutText}</p>
              <div className="flex space-x-4">
                {/* Социальные сети */}
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Контакты */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.contacts}</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-blue-100">+998 71 123 45 67</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-blue-100">info@realestate.uz</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-blue-100">г. Ташкент, ул. Амира Темура, 105</span>
                </li>
              </ul>
            </div>

            {/* Полезные ссылки */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.links}</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    {t.footer.terms}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    {t.footer.privacy}
                  </a>
                </li>
              </ul>
            </div>

            {/* Категории */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.categories}</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    {t.footer.apartments}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    {t.footer.houses}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    {t.footer.rent}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    {t.footer.sale}
                  </a>
                </li>
              </ul>
            </div>

            {/* Язык */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.language}</h3>
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => setLanguage('ru')}
                  className={`text-left px-3 py-2 rounded-md ${language === 'ru' ? 'bg-[#3498db] text-white' : 'text-blue-100 hover:bg-[#34495e]'}`}
                >
                  {t.footer.russian}
                </button>
                <button 
                  onClick={() => setLanguage('uz')}
                  className={`text-left px-3 py-2 rounded-md ${language === 'uz' ? 'bg-[#3498db] text-white' : 'text-blue-100 hover:bg-[#34495e]'}`}
                >
                  {t.footer.uzbek}
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#34495e] pt-8 text-center">
            <p className="text-blue-100">
              &copy; {new Date().getFullYear()} RealEstate. {t.footer.rights}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}