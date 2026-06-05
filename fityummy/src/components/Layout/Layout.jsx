import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../../shared/hooks/useCart'
import CartSidebar from '../UI/CartSidebar'
import Toast from '../UI/Toast'

const NAV_LINKS = [
  { to: '/', label: 'Головна' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/about', label: 'Про нас' },
]

export default function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { count, openCart, isOpen, closeCart } = useCartStore()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Global toast event
  useEffect(() => {
    const handler = (e) => { setToast(e.detail); setTimeout(() => setToast(null), 3000) }
    window.addEventListener('fityummy:toast', handler)
    return () => window.removeEventListener('fityummy:toast', handler)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-mint/20' : 'bg-transparent'}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              className="w-10 h-10 rounded-2xl bg-choco-light flex items-center justify-center"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="text-cream text-xl font-display">F</span>
            </motion.div>
            <div className="font-display text-2xl">
              <span className="text-choco-light">Fit</span>
              <span className="text-mint">Yummy</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link   hover:text-croc ${location.pathname === to ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={openCart}
              className="relative w-11 h-11 bg-choco-light text-cream rounded-2xl flex items-center justify-center btn-jelly"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-berry text-white text-xs font-black rounded-full flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Burger */}
            <button
              className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-choco-light  block rounded-full"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-choco-light  block rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-choco-light  block rounded-full"
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white border-t border-mint/30"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {NAV_LINKS.map(({ to, label }) => (
                  <Link key={to} to={to} className="font-display text-xl bg-choco-light  hover:text-mint transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main content */}
      <main className="flex-1 pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-choco-light  text-cream mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="font-display text-3xl mb-3">
                <span className="text-cream">Fit</span>
                <span className="text-mint">Yummy</span>
              </div>
              <p className="text-cream/70 font-body leading-relaxed">
                Енергія спорту в кожному шматочку. Натуральні солодощі для людей, які активно займаються спортом.
              </p>
              <div className="flex gap-3 mt-4">
                {['🥝', '🥭', '🫐', '🍫', '🌿'].map((e, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl cursor-pointer"
                    whileHover={{ scale: 1.4, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >{e}</motion.span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display text-lg text-mint mb-3">Навігація</h4>
              <div className="flex flex-col gap-2">
                {[['/', 'Головна'], ['/catalog', 'Каталог'], ['/about', 'Про нас']].map(([to, label]) => (
                  <Link key={to} to={to} className="text-cream/60 hover:text-mint transition-colors font-body">{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display text-lg text-mint mb-3">Контакти</h4>
              <div className="flex flex-col gap-2 text-cream/60 font-body">
                <span>📍 Україна, Київ</span>
                <span>📞 +38 044 123 45 67</span>
                <span>✉️ hello@fityummy.ua</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-cream/40 font-body text-sm">
            © 2024 FitYummy. Зроблено з ❤️ та натуральними інгредієнтами. Crocorolo рекомендує!
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast key={toast.id} message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </div>
  )
}
