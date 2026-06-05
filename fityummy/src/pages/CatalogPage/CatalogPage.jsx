import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS, CATEGORIES } from '../../shared/utils/products'
import ProductCard from '../../components/UI/ProductCard'

const SORT_OPTIONS = [
  { value: 'default', label: 'За замовчуванням' },
  { value: 'price_asc', label: 'Ціна: від дешевих' },
  { value: 'price_desc', label: 'Ціна: від дорогих' },
  { value: 'rating', label: 'За рейтингом' },
]

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState(100)

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory)
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.tagline.toLowerCase().includes(search.toLowerCase()))
    list = list.filter(p => p.price <= maxPrice)
    switch (sortBy) {
      case 'price_asc': list.sort((a, b) => a.price - b.price); break
      case 'price_desc': list.sort((a, b) => b.price - a.price); break
      case 'rating': list.sort((a, b) => b.rating - a.rating); break
    }
    return list
  }, [activeCategory, sortBy, search, maxPrice])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-choco-light py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-10"/>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-cream/50 font-body text-sm mb-4">
              <span>Головна</span>
              <span>→</span>
              <span className="text-mint">Каталог</span>
            </div>
            <h1 className="font-display text-6xl text-cream mb-4">
              Каталог <span className="text-mint">продуктів</span>
            </h1>
            <p className="font-body text-cream/70 max-w-xl">
              Знайди свій ідеальний смак серед {PRODUCTS.length} натуральних продуктів від FitYummy
            </p>
          </motion.div>
        </div>
        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z" fill="#f0fdf4"/>
          </svg>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filters row */}
          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Пошук продуктів..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-mint/30 bg-white font-body focus:outline-none focus:border-mint transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-choco">✕</button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-5 py-3.5 rounded-2xl border-2 border-mint/30 bg-white font-body font-semibold focus:outline-none focus:border-mint transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Category tabs */}
          <div className="flex gap-3 flex-wrap mb-8">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-bold text-sm transition-all ${
                  activeCategory === cat.id
                    ? 'bg-choco-light text-cream shadow-lg'
                    : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-mint'
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Price range */}
          <div className="bg-white rounded-2xl border-2 border-mint/20 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="font-body font-semibold text-gray-600 whitespace-nowrap">Макс. ціна:</span>
            <input
              type="range"
              min={40}
              max={100}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="flex-1 accent-mint"
            />
            <span className="font-display text-xl text-choco-ligth whitespace-nowrap">{maxPrice} грн</span>
          </div>

          {/* Results count */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${search}-${maxPrice}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-body text-gray-500 mb-6"
            >
              {filtered.length > 0
                ? `Знайдено ${filtered.length} продукт${filtered.length !== 1 ? 'ів' : ''}`
                : 'Нічого не знайдено'}
            </motion.div>
          </AnimatePresence>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`grid-${activeCategory}-${search}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-24"
              >
                <div className="text-7xl mb-4">🔍</div>
                <h3 className="font-display text-2xl text-choco-light mb-2">Нічого не знайдено</h3>
                <p className="font-body text-gray-500">Спробуй змінити фільтри або пошуковий запит</p>
                <button
                  onClick={() => { setSearch(''); setActiveCategory('all'); setMaxPrice(100) }}
                  className="mt-6 btn-primary"
                >
                  Скинути фільтри
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
