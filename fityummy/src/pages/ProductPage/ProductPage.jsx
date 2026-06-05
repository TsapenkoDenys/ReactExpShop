import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS } from '../../shared/utils/products'
import { useCartStore } from '../../shared/hooks/useCart'
import ProductCard from '../../components/UI/ProductCard'

const TABS = ['Опис', 'Склад', 'Поживність', 'Відгуки']

const REVIEWS = [
  { name: 'Олексій К.', rating: 5, text: 'Смачно та корисно! Беру щотижня після тренування. Ківі-йогурт — просто бомба!', date: '12 лист 2024', avatar: '🏋️' },
  { name: 'Марія В.', rating: 5, text: 'Нарешті знайшла здорову альтернативу цукеркам. Crocorolo — мій друг на тренуваннях!', date: '8 лист 2024', avatar: '🤸' },
  { name: 'Іван П.', rating: 4, text: 'Хороший склад, достатньо білку. Трохи солодкувато, але дуже смачно.', date: '3 лист 2024', avatar: '🚴' },
]

export default function ProductPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('Опис')
  const [added, setAdded] = useState(false)

  const product = PRODUCTS.find(p => p.slug === slug)
  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="font-display text-3xl text-choco mb-4">Продукт не знайдено</h2>
        <Link to="/catalog" className="btn-primary">До каталогу</Link>
      </div>
    </div>
  )

  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    window.dispatchEvent(new CustomEvent('fityummy:toast', {
      detail: { id: Date.now(), message: `${product.name} × ${qty} додано! 🎉`, type: 'success' }
    }))
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-2 text-sm font-body text-gray-400">
          <Link to="/" className="hover:text-mint transition-colors">Головна</Link>
          <span>→</span>
          <Link to="/catalog" className="hover:text-mint transition-colors">Каталог</Link>
          <span>→</span>
          <span className="text-choco font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-28"
          >
            <div
              className="relative rounded-[40px] overflow-hidden aspect-square flex items-center justify-center"
              style={{ background: product.bgColor }}
            >
              {/* Decorative BG */}
              <div className="absolute inset-0 dot-bg opacity-30"/>
              <motion.div
                className="absolute top-8 right-8 w-32 h-32 rounded-full opacity-30"
                style={{ background: product.color }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              <motion.div
                className="absolute bottom-8 left-8 w-20 h-20 rounded-full opacity-20"
                style={{ background: product.color }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              />

              {/* Emoji */}
              <motion.div
                className="text-[160px] select-none relative z-10"
                animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              >
                {product.emoji}
              </motion.div>

              {/* Badge */}
              {product.badge && (
                <div
                  className="absolute top-6 left-6 font-display text-white px-4 py-1.5 rounded-full text-sm z-20"
                  style={{ background: product.badgeColor }}
                >
                  {product.badge}
                </div>
              )}
            </div>

            {/* Macro pills */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[
                { label: 'Ккал', value: product.calories, color: '#8b5cf6' },
                { label: 'Білок', value: `${product.protein}г`, color: '#4ecb8c' },
                { label: 'Жири', value: `${product.fat}г`, color: '#f5a623' },
                { label: 'Вугл.', value: `${product.carbs}г`, color: '#e84393' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-white rounded-2xl p-3 text-center border-2" style={{ borderColor: `${color}40` }}>
                  <div className="font-black text-lg" style={{ color }}>{value}</div>
                  <div className="text-xs font-body text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xl" style={{ color: i < Math.floor(product.rating) ? '#f5a623' : '#e5e7eb' }}>★</span>
              ))}
              <span className="font-body text-gray-500">({product.reviews} відгуків)</span>
            </div>

            <h1 className="font-display text-5xl text-choco mb-2">{product.name}</h1>
            <p className="font-body text-lg text-gray-500 italic mb-6">{product.tagline}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display text-5xl text-choco">{product.price} грн</span>
              {product.oldPrice && (
                <span className="font-body text-xl text-gray-400 line-through">{product.oldPrice} грн</span>
              )}
              <span className="font-body text-sm text-gray-400">/ {product.weight}</span>
            </div>

            {/* Qty & Add */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-0 bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center text-xl font-black hover:bg-gray-50 transition-colors"
                >−</button>
                <span className="w-12 text-center font-display text-xl">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-12 h-12 flex items-center justify-center text-xl font-black hover:bg-gray-50 transition-colors"
                >+</button>
              </div>

              <motion.button
                onClick={handleAdd}
                className="flex-1 py-3.5 rounded-2xl font-display text-lg text-white transition-all btn-jelly"
                style={{ background: added ? '#4ecb8c' : product.color }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={added ? 'added' : 'add'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {added ? '✓ Додано в кошик!' : 'Додати в кошик'}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6 flex gap-0">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 font-body font-bold text-sm transition-all relative ${
                    activeTab === tab ? 'text-choco-light' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-mint"
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'Опис' && (
                  <p className="font-body text-gray-600 leading-relaxed">{product.description}</p>
                )}
                {activeTab === 'Склад' && (
                  <div>
                    <p className="font-body text-gray-600 leading-relaxed">{product.ingredients}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.ingredients.split(',').map(ing => (
                        <span key={ing} className="px-3 py-1 rounded-full bg-mint/10 text-mint font-body text-sm font-semibold">
                          {ing.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'Поживність' && (
                  <div className="space-y-3">
                    {[
                      { label: 'Калорійність', value: `${product.calories} ккал` },
                      { label: 'Білки', value: `${product.protein} г` },
                      { label: 'Жири', value: `${product.fat} г` },
                      { label: 'Вуглеводи', value: `${product.carbs} г` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-body text-gray-600">{label}</span>
                        <span className="font-black text-choco-light">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'Відгуки' && (
                  <div className="space-y-4">
                    {REVIEWS.map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-gray-50 rounded-2xl p-4"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{r.avatar}</span>
                          <div>
                            <div className="font-bold text-sm text-choco-light">{r.name}</div>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, j) => (
                                <span key={j} className="text-xs" style={{ color: j < r.rating ? '#f5a623' : '#e5e7eb' }}>★</span>
                              ))}
                            </div>
                          </div>
                          <span className="ml-auto text-xs text-gray-400 font-body">{r.date}</span>
                        </div>
                        <p className="font-body text-sm text-gray-600">{r.text}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Related products */}
      <section className="bg-mint/5 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl text-choco-light mb-8">Також рекомендуємо</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
