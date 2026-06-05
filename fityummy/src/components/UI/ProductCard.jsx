import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../shared/hooks/useCart'

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCartStore()

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    window.dispatchEvent(new CustomEvent('fityummy:toast', {
      detail: { id: Date.now(), message: `${product.name} додано! 🎉`, type: 'success' }
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/product/${product.slug}`} className="block">
        <motion.div
          className="relative rounded-3xl overflow-hidden border-2 border-transparent hover:border-mint/40 cursor-pointer group bg-white"
          style={{ borderColor: `${product.color}30` }}
          whileHover={{ y: -8, rotate: -0.5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Badge */}
          {product.badge && (
            <div
              className="absolute top-4 left-4 z-10 font-display text-xs text-white px-3 py-1 rounded-full"
              style={{ background: product.badgeColor }}
            >
              {product.badge}
            </div>
          )}

          {/* Emoji area */}
          <div
            className="relative h-44 flex items-center justify-center overflow-hidden"
            style={{ background: product.bgColor }}
          >
            {/* Decorative circles */}
            <div
              className="absolute -right-6 -top-6 w-20 h-20 rounded-full opacity-20"
              style={{ background: product.color }}
            />
            <div
              className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full opacity-15"
              style={{ background: product.color }}
            />

            <motion.div
              className="text-7xl select-none"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: index * 0.3 }}
            >
              {product.emoji}
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-display text-xl text-choco">{product.name}</h3>
              <span className="text-xs font-body text-gray-400 mt-1">{product.weight}</span>
            </div>
            <p className="text-sm font-body text-gray-500 italic mb-3">{product.tagline}</p>

            {/* Macros */}
            <div className="flex gap-3 mb-4">
              {[
                { label: 'Б', value: product.protein, color: '#4ecb8c' },
                { label: 'Ж', value: product.fat, color: '#f5a623' },
                { label: 'В', value: product.carbs, color: '#e84393' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex-1 text-center">
                  <div className="text-xs font-body text-gray-400">{label}</div>
                  <div className="text-sm font-black" style={{ color }}>{value}г</div>
                </div>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xs" style={{ color: i < Math.floor(product.rating) ? '#f5a623' : '#e5e7eb' }}>★</span>
              ))}
              <span className="text-xs text-gray-400 font-body ml-1">({product.reviews})</span>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-display text-2xl text-choco-light">{product.price} грн</span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through ml-2 font-body">{product.oldPrice} грн</span>
                )}
              </div>
              <motion.button
                onClick={handleAdd}
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black btn-jelly"
                style={{ background: product.color }}
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.1 }}
              >
                +
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
