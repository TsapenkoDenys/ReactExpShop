import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../shared/hooks/useCart'

export default function CartPage() {
  const { items, removeItem, updateQty, total, count, clearCart } = useCartStore()

  if (items.length === 0) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          className="text-8xl mb-6"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >🛒</motion.div>
        <h2 className="font-display text-4xl text-choco mb-3">Кошик порожній</h2>
        <p className="font-body text-gray-500 mb-8">Додай щось смачне від Crocorolo!</p>
        <Link to="/catalog" className="btn-primary">
          Перейти до каталогу →
        </Link>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-sm font-body text-gray-400 mb-4">
            <Link to="/" className="hover:text-mint">Головна</Link>
            <span>→</span>
            <span className="text-choco font-semibold">Кошик</span>
          </div>
          <div className="flex items-end justify-between">
            <h1 className="font-display text-5xl text-choco">
              Мій кошик <span className="text-mint">({count})</span>
            </h1>
            <button
              onClick={clearCart}
              className="text-sm text-red-400 hover:text-red-600 font-body font-semibold transition-colors"
            >
              Очистити кошик
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-3xl p-5 border-2 border-gray-100 hover:border-mint/30 transition-colors flex items-center gap-5"
                >
                  <Link to={`/product/${item.slug}`}>
                    <motion.div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 cursor-pointer"
                      style={{ background: item.bgColor }}
                      whileHover={{ scale: 1.08, rotate: 5 }}
                    >
                      {item.emoji}
                    </motion.div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.slug}`}>
                      <h3 className="font-display text-xl text-choco hover:text-mint transition-colors">{item.name}</h3>
                    </Link>
                    <p className="font-body text-sm text-gray-400">{item.weight} · {item.tagline}</p>
                    <p className="font-black text-lg mt-1" style={{ color: item.color }}>{item.price} грн</p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-0 border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-9 h-9 flex items-center justify-center font-black hover:bg-gray-50 transition-colors"
                      >−</button>
                      <span className="w-8 text-center font-display text-lg">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-9 h-9 flex items-center justify-center font-black hover:bg-gray-50 transition-colors"
                      >+</button>
                    </div>

                    <div className="text-right w-20">
                      <div className="font-display text-lg text-choco">{item.price * item.qty} грн</div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                    >
                      <svg width="14" height="14" fill="none" stroke="#ef4444" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:sticky lg:top-28 h-fit"
          >
            <div className="bg-white rounded-3xl border-2 border-mint/20 p-6">
              <h2 className="font-display text-2xl text-choco mb-6">Ваше замовлення</h2>

              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm font-body">
                    <span className="text-gray-600">{item.name} × {item.qty}</span>
                    <span className="font-semibold text-choco">{item.price * item.qty} грн</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-2">
                <div className="flex justify-between font-body text-sm text-gray-500">
                  <span>Доставка</span>
                  <span className="text-mint font-semibold">{total >= 500 ? 'Безкоштовно' : '50 грн'}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-body font-semibold text-gray-700">Разом:</span>
                  <span className="font-display text-3xl text-choco">{total + (total >= 500 ? 0 : 50)} грн</span>
                </div>
                {total < 500 && (
                  <p className="text-xs text-gray-400 font-body mt-2">
                    Додай ще {500 - total} грн для безкоштовної доставки 🚀
                  </p>
                )}
              </div>

              {/* Promo */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Промокод"
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 font-body text-sm focus:outline-none focus:border-mint transition-colors"
                />
                <button className="px-4 py-2.5 bg-choco text-cream rounded-xl font-body text-sm font-bold hover:bg-croc transition-colors">
                  OK
                </button>
              </div>

              <Link
                to="/checkout"
                className="btn-primary w-full text-center block btn-jelly"
              >
                Оформити замовлення →
              </Link>

              <Link to="/catalog" className="block text-center mt-4 text-sm font-body text-gray-400 hover:text-mint transition-colors">
                ← Продовжити покупки
              </Link>
            </div>

            {/* Crocorolo tip */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="mt-4 bg-mint/10 rounded-2xl p-4 flex items-center gap-3"
            >
              <span className="text-3xl">🐊</span>
              <p className="text-sm font-body text-choco/80">
                Crocorolo каже: чудовий вибір! Твоє тіло дякує тобі 💪
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
