import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../../shared/utils/products'
import ProductCard from '../../components/UI/ProductCard'
import { useCartStore } from '../../shared/hooks/useCart'

const MARQUEE_ITEMS = ['🥝 Ківі', '🥭 Манго', '🫐 Чорниця', '🍫 Шоколад', '🌿 М\'ята', '🍌 Банан', '🥝 Ківі', '🥭 Манго', '🫐 Чорниця', '🍫 Шоколад', '🌿 М\'ята', '🍌 Банан']

const FEATURES = [
  { icon: '🌱', title: '100% Натуральне', desc: 'Тільки перевірені природні інгредієнти без хімії та ГМО' },
  { icon: '💪', title: 'Для спортсменів', desc: 'Збалансований склад для активних тренувань та відновлення' },
  { icon: '🔬', title: 'Науковий підхід', desc: 'Формули розроблені нутриціологами та спортивними дієтологами' },
  { icon: '🚀', title: 'Швидка енергія', desc: 'Максимум енергії без зайвого цукру та порожніх калорій' },
]

function CrocoMascot() {
  return (
    <motion.div
      className="relative w-64 h-64 mx-auto"
      animate={{ y: [0, -12, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
        {/* Body */}
        <ellipse cx="100" cy="130" rx="55" ry="45" fill="#6bbf47"/>
        {/* Belly */}
        <ellipse cx="100" cy="135" rx="38" ry="32" fill="#a3d96e"/>
        {/* Head */}
        <ellipse cx="100" cy="78" rx="45" ry="38" fill="#6bbf47"/>
        {/* Snout */}
        <ellipse cx="100" cy="102" rx="28" ry="16" fill="#6bbf47"/>
        {/* Smile */}
        <path d="M 82 108 Q 100 118 118 108" stroke="#2d1a0e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Teeth */}
        <rect x="88" y="107" width="6" height="8" rx="2" fill="white"/>
        <rect x="106" y="107" width="6" height="8" rx="2" fill="white"/>
        {/* Eyes */}
        <circle cx="84" cy="68" r="12" fill="white"/>
        <circle cx="116" cy="68" r="12" fill="white"/>
        <circle cx="87" cy="70" r="7" fill="#2d1a0e"/>
        <circle cx="119" cy="70" r="7" fill="#2d1a0e"/>
        <circle cx="89" cy="68" r="2.5" fill="white"/>
        <circle cx="121" cy="68" r="2.5" fill="white"/>
        {/* Cap */}
        <ellipse cx="100" cy="48" rx="32" ry="8" fill="#e84393"/>
        <rect x="68" y="28" width="64" height="22" rx="10" fill="#e84393"/>
        <circle cx="100" cy="26" r="5" fill="#fcd34d"/>
        {/* Scales on head */}
        <path d="M 80 55 L 86 48 L 92 55" fill="#4a8c2e" opacity="0.4"/>
        <path d="M 108 55 L 114 48 L 120 55" fill="#4a8c2e" opacity="0.4"/>
        {/* Arms */}
        <ellipse cx="52" cy="130" rx="12" ry="20" fill="#6bbf47" transform="rotate(-20 52 130)"/>
        <ellipse cx="148" cy="130" rx="12" ry="20" fill="#6bbf47" transform="rotate(20 148 130)"/>
        {/* Rollerblades */}
        <rect x="72" y="168" width="25" height="12" rx="6" fill="#2d1a0e"/>
        <rect x="103" y="168" width="25" height="12" rx="6" fill="#2d1a0e"/>
        <circle cx="79" cy="182" r="4" fill="#f5a623"/>
        <circle cx="92" cy="182" r="4" fill="#f5a623"/>
        <circle cx="110" cy="182" r="4" fill="#f5a623"/>
        <circle cx="123" cy="182" r="4" fill="#f5a623"/>
        {/* FitYummy bar in hand */}
        <rect x="148" y="115" width="28" height="14" rx="4" fill="#f5a623"/>
        <text x="150" y="125" fontSize="6" fill="white" fontFamily="Arial" fontWeight="bold">FIT</text>
        {/* Tail */}
        <path d="M 145 155 Q 175 165 185 150 Q 195 135 180 128" stroke="#6bbf47" strokeWidth="14" fill="none" strokeLinecap="round"/>
        {/* Dots on back */}
        <circle cx="95" cy="115" r="3" fill="#4a8c2e" opacity="0.5"/>
        <circle cx="108" cy="110" r="2.5" fill="#4a8c2e" opacity="0.5"/>
        <circle cx="100" cy="125" r="2" fill="#4a8c2e" opacity="0.5"/>
        {/* Blush */}
        <ellipse cx="73" cy="86" rx="9" ry="5" fill="#f472b6" opacity="0.35"/>
        <ellipse cx="127" cy="86" rx="9" ry="5" fill="#f472b6" opacity="0.35"/>
      </svg>

      {/* Speech bubble */}
      <motion.div
        className="absolute -top-4 -right-8 bg-white rounded-2xl rounded-bl-none px-4 py-2 shadow-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      >
        <span className="font-display text-sm text-choco">Смакуй!</span>
        <div className="absolute -bottom-2 left-2 w-3 h-3 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}/>
      </motion.div>
    </motion.div>
  )
}

function StatCard({ number, label, delay = 0 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true)
        let start = 0
        const target = parseInt(number)
        const step = target / 60
        const timer = setInterval(() => {
          start += step
          if (start >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 16)
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [number, started])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="font-display text-5xl text-choco">
        {count}<span className="text-mint">+</span>
      </div>
      <div className="font-body text-gray-500 mt-1">{label}</div>
    </motion.div>
  )
}

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  const featuredProducts = PRODUCTS.slice(0, 3)

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center dot-bg">
        {/* BG Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-10 w-80 h-80 bg-mint/20 blob-1"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-60 h-60 bg-berry/15 blob-2"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-40 h-40 bg-mango/20 blob-3"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white border border-mint/30 rounded-full px-4 py-2 mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse"/>
              <span className="font-body text-sm font-semibold text-choco/70">Натуральні солодощі для спортсменів</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-6xl md:text-7xl text-choco leading-none mb-6"
            >
              Енергія
              <br />
              спорту в
              <br />
              <span className="relative inline-block">
                <span className="gradient-text">кожному</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-mint rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
              <br />
              шматочку
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-body text-lg text-gray-600 leading-relaxed mb-8 max-w-lg"
            >
              FitYummy — бренд натуральних солодощів для людей, які активно займаються спортом і стежать за здоров'ям. Смачно, корисно, енергійно!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/catalog" className="btn-primary btn-jelly">
                Переглянути каталог →
              </Link>
              <Link to="/about" className="btn-outline btn-jelly">
                Дізнатись більше
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-6 mt-10 flex-wrap"
            >
              {[['🌿', '100% Натурально'], ['⚡', 'Без цукру'], ['🏆', 'Топ якість']].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-xl">{icon}</span>
                  <span className="font-body text-sm font-semibold text-gray-600">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.3, type: 'spring', stiffness: 100 }}
            className="flex justify-center"
          >
            <CrocoMascot />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <span className="text-xs font-body text-gray-400">Скролюй вниз</span>
          <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"/>
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="bg-choco-light py-5 overflow-hidden">
        <div className="flex overflow-hidden">
          <div className="marquee-inner flex gap-8 whitespace-nowrap">
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={i} className="font-display text-xl text-cream flex items-center gap-2">
                {item} <span className="text-mint">•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-5xl text-choco mb-4">Чому <span className="text-mint">FitYummy?</span></h2>
            <p className="font-body text-gray-500 max-w-xl mx-auto">Ми поєднали шоколад, йогурт та свіжі фрукти, щоб дати тобі силу для нових перемог</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, rotate: 0.5 }}
                className="bg-white rounded-3xl p-6 border-2 border-mint/20 hover:border-mint/60 transition-colors hover:shadow-lg hover:shadow-mint/15"
              >
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                >
                  {f.icon}
                </motion.div>
                <h3 className="font-display text-xl text-choco mb-2">{f.title}</h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 px-6 bg-mint/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-5xl text-choco">Топ <span className="text-berry">смаки</span></h2>
              <p className="font-body text-gray-500 mt-2">Найулюбленіші продукти наших клієнтів</p>
            </motion.div>
            <Link to="/catalog" className="hidden md:block btn-outline">
              Всі продукти →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/catalog" className="btn-outline">Всі продукти →</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 bg-choco-light ">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 ">
          {[
            { n: '50000', label: 'щасливих клієнтів' },
            { n: '15', label: 'смаків на вибір' },
            { n: '100', label: '% натуральне' },
            { n: '3', label: 'роки на ринку' },
          ].map(({ n, label }, i) => (
            <StatCard key={label} number={n} label={label} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-choco-light rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-8 overflow-hidden relative"
          >
            {/* BG decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-mint/10 rounded-full -translate-y-1/3 translate-x-1/3"/>
            <div className="absolute bottom-0 left-20 w-40 h-40 bg-berry/10 rounded-full translate-y-1/3"/>

            <div className="flex-1 relative z-10">
              <h2 className="font-display text-4xl md:text-5xl text-cream mb-4">
                Спробуй вже <span className="text-mint">сьогодні!</span>
              </h2>
              <p className="font-body text-cream/70 leading-relaxed mb-6">
                Кожна покупка — це крок до твоєї мети. Crocorolo вже чекає на тебе! 🐊
              </p>
              <Link to="/catalog" className="inline-block bg-mint text-choco font-display text-lg px-8 py-4 rounded-full hover:bg-croc transition-colors btn-jelly">
                Почати зараз →
              </Link>
            </div>

            <motion.div
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="relative z-10 text-9xl select-none"
            >
              🐊
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FLAVOR SHOWCASE */}
      <section className="py-16 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl text-choco-light text-center mb-12"
          >
            Всі <span className="text-mango">смаки</span> Crocorolo
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring' }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Link
                  to={`/product/${p.slug}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-full border-2 font-body font-bold hover:text-white transition-all"
                  style={{ borderColor: p.color, color: p.color, '--hover-bg': p.color }}
                  onMouseEnter={e => e.currentTarget.style.background = p.color}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <span className="text-xl">{p.emoji}</span>
                  <span>{p.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
