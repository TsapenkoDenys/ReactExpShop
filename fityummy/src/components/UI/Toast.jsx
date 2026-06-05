import { motion } from 'framer-motion'

export default function Toast({ message, type = 'success' }) {
  const colors = {
    success: { bg: 'bg-choco', icon: '✅' },
    error: { bg: 'bg-red-600', icon: '❌' },
    info: { bg: 'bg-blue-600', icon: 'ℹ️' },
  }
  const { bg, icon } = colors[type] || colors.success

  return (
    <motion.div
      initial={{ x: '120%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '120%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`fixed bottom-6 right-6 z-[100] ${bg} text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-body font-bold max-w-xs`}
    >
      <span className="text-xl">{icon}</span>
      <span>{message}</span>
    </motion.div>
  )
}
