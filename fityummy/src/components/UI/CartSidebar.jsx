import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../shared/hooks/useCart'

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, count } = useCartStore()
  const navigate = useNavigate()

  const handleCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-choco/40 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-mint/20">
              <div>
                <h2 className="font-display text-2xl text-choco">Кошик</h2>
                <p className="text-sm text-gray-500 font-body">{count} товарів</p>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-mint/20 transition-colors"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-6xl"
                  >🛒</motion.div>
                  <p className="font-display text-xl text-gray-400">Кошик порожній</p>
                  <button
                    onClick={() => { closeCart(); navigate('/catalog') }}
                    className="btn-primary text-base px-6 py-3"
                  >
                    Перейти до каталогу
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50 hover:bg-mint/10 transition-colors"
                      >
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                          style={{ background: item.bgColor }}
                        >
                          {item.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-choco truncate">{item.name}</p>
                          <p className="text-sm text-gray-500 font-body">{item.weight}</p>
                          <p className="font-black text-mint text-sm">{item.price} грн</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-mint transition-colors text-sm font-black"
                          >−</button>
                          <span className="w-6 text-center font-black text-sm">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-mint transition-colors text-sm font-black"
                          >+</button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors flex-shrink-0"
                        >
                          <svg width="12" height="12" fill="none" stroke="#ef4444" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-mint/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-body text-gray-600">Разом:</span>
                  <span className="font-display text-2xl text-choco">{total} грн</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary text-center block text-center btn-jelly"
                >
                  Оформити замовлення →
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
