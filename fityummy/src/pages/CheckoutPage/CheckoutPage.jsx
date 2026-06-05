import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../../shared/hooks/useCart'

const STEPS = ['Контакти', 'Доставка', 'Оплата', 'Підтвердження']

const DELIVERY_OPTIONS = [
  { id: 'nova', label: 'Нова Пошта', desc: 'Доставка 1-3 дні', price: 50, icon: '📦' },
  { id: 'ukr', label: 'Укрпошта', desc: 'Доставка 3-5 днів', price: 30, icon: '✉️' },
  { id: 'courier', label: 'Кур\'єр', desc: 'Доставка сьогодні', price: 100, icon: '🏍️' },
]

const PAYMENT_OPTIONS = [
  { id: 'card', label: 'Банківська карта', icon: '💳' },
  { id: 'cash', label: 'Оплата при отриманні', icon: '💵' },
  { id: 'liqpay', label: 'LiqPay', icon: '📱' },
]

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                background: i < current ? '#4ecb8c' : i === current ? '#2d1a0e' : '#e5e7eb',
                scale: i === current ? 1.15 : 1,
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center font-display text-sm"
              style={{ color: i <= current ? 'white' : '#9ca3af' }}
            >
              {i < current ? '✓' : i + 1}
            </motion.div>
            <span className={`text-xs font-body mt-1 hidden sm:block ${i === current ? 'text-choco font-bold' : 'text-gray-400'}`}>
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="w-12 sm:w-20 h-0.5 mx-1 mb-4" style={{ background: i < current ? '#4ecb8c' : '#e5e7eb' }}/>
          )}
        </div>
      ))}
    </div>
  )
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [delivery, setDelivery] = useState('nova')
  const [payment, setPayment] = useState('card')
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', address: '' })
  const [ordered, setOrdered] = useState(false)

  const deliveryPrice = DELIVERY_OPTIONS.find(d => d.id === delivery)?.price || 50
  const finalTotal = total + (total >= 500 ? 0 : deliveryPrice)

  const handleOrder = () => {
    setOrdered(true)
    clearCart()
    setTimeout(() => navigate('/'), 4000)
  }

  if (ordered) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 150 }}
        className="text-center px-6"
      >
        <motion.div
          className="text-8xl mb-6"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: 2 }}
        >🎉</motion.div>
        <h1 className="font-display text-5xl text-choco mb-4">Замовлення оформлено!</h1>
        <p className="font-body text-gray-500 text-lg mb-2">Дякуємо за покупку! Crocorolo вже їде до тебе 🐊</p>
        <p className="font-body text-gray-400 text-sm">Перенаправляємо на головну сторінку...</p>
        <div className="mt-6 loader mx-auto"/>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-sm font-body text-gray-400 mb-4">
            <Link to="/" className="hover:text-mint">Головна</Link>
            <span>→</span>
            <Link to="/cart" className="hover:text-mint">Кошик</Link>
            <span>→</span>
            <span className="text-choco font-semibold">Оформлення</span>
          </div>
          <h1 className="font-display text-4xl text-choco">Оформлення замовлення</h1>
        </motion.div>

        <StepIndicator current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 0: Contacts */}
              {step === 0 && (
                <motion.div
                  key="contacts"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl border-2 border-mint/20 p-6"
                >
                  <h2 className="font-display text-2xl text-choco mb-6">Контактні дані</h2>
                  <div className="space-y-4">
                    {[
                      { key: 'name', label: "Ім'я та прізвище", type: 'text', placeholder: 'Іван Іваненко' },
                      { key: 'phone', label: 'Телефон', type: 'tel', placeholder: '+38 0XX XXX XX XX' },
                      { key: 'email', label: 'Email', type: 'email', placeholder: 'example@mail.com' },
                    ].map(({ key, label, type, placeholder }) => (
                      <div key={key}>
                        <label className="block font-body text-sm font-semibold text-gray-600 mb-1.5">{label}</label>
                        <input
                          type={type}
                          value={form[key]}
                          onChange={e => setForm({ ...form, [key]: e.target.value })}
                          placeholder={placeholder}
                          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 font-body focus:outline-none focus:border-mint transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="mt-6 btn-primary w-full"
                    disabled={!form.name || !form.phone}
                  >
                    Далі: Доставка →
                  </button>
                </motion.div>
              )}

              {/* Step 1: Delivery */}
              {step === 1 && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl border-2 border-mint/20 p-6"
                >
                  <h2 className="font-display text-2xl text-choco mb-6">Спосіб доставки</h2>
                  <div className="space-y-3 mb-6">
                    {DELIVERY_OPTIONS.map(opt => (
                      <motion.button
                        key={opt.id}
                        onClick={() => setDelivery(opt.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                          delivery === opt.id ? 'border-choco bg-choco/5' : 'border-gray-200 hover:border-mint'
                        }`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <span className="text-3xl">{opt.icon}</span>
                        <div className="flex-1">
                          <div className="font-display text-lg text-choco">{opt.label}</div>
                          <div className="font-body text-sm text-gray-500">{opt.desc}</div>
                        </div>
                        <div className="font-display text-lg text-mint">{total >= 500 ? 'Безкоштовно' : `${opt.price} грн`}</div>
                        {delivery === opt.id && <div className="w-5 h-5 rounded-full bg-choco flex items-center justify-center text-white text-xs">✓</div>}
                      </motion.button>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { key: 'city', label: 'Місто', placeholder: 'Київ' },
                      { key: 'address', label: 'Адреса / відділення', placeholder: 'вул. Хрещатик 1, або №5' },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="block font-body text-sm font-semibold text-gray-600 mb-1.5">{label}</label>
                        <input
                          value={form[key]}
                          onChange={e => setForm({ ...form, [key]: e.target.value })}
                          placeholder={placeholder}
                          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 font-body focus:outline-none focus:border-mint transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(0)} className="btn-outline flex-1">← Назад</button>
                    <button onClick={() => setStep(2)} className="btn-primary flex-1">Далі: Оплата →</button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl border-2 border-mint/20 p-6"
                >
                  <h2 className="font-display text-2xl text-choco mb-6">Спосіб оплати</h2>
                  <div className="space-y-3 mb-6">
                    {PAYMENT_OPTIONS.map(opt => (
                      <motion.button
                        key={opt.id}
                        onClick={() => setPayment(opt.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                          payment === opt.id ? 'border-choco bg-choco/5' : 'border-gray-200 hover:border-mint'
                        }`}
                        whileHover={{ scale: 1.01 }}
                      >
                        <span className="text-3xl">{opt.icon}</span>
                        <span className="font-display text-lg text-choco flex-1">{opt.label}</span>
                        {payment === opt.id && <div className="w-5 h-5 rounded-full bg-choco flex items-center justify-center text-white text-xs">✓</div>}
                      </motion.button>
                    ))}
                  </div>

                  {payment === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-gray-50 rounded-2xl p-5 mb-6 space-y-3"
                    >
                      <input placeholder="Номер картки" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 font-body focus:outline-none focus:border-mint" />
                      <div className="flex gap-3">
                        <input placeholder="MM/YY" className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 font-body focus:outline-none focus:border-mint" />
                        <input placeholder="CVV" className="w-24 px-4 py-3 rounded-xl border-2 border-gray-200 font-body focus:outline-none focus:border-mint" />
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="btn-outline flex-1">← Назад</button>
                    <button onClick={() => setStep(3)} className="btn-primary flex-1">Переглянути →</button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl border-2 border-mint/20 p-6"
                >
                  <h2 className="font-display text-2xl text-choco mb-6">Підтвердження</h2>

                  <div className="space-y-4 mb-6">
                    {[
                      { label: 'Отримувач', value: form.name },
                      { label: 'Телефон', value: form.phone },
                      { label: 'Email', value: form.email },
                      { label: 'Доставка', value: DELIVERY_OPTIONS.find(d => d.id === delivery)?.label },
                      { label: 'Адреса', value: `${form.city}, ${form.address}` },
                      { label: 'Оплата', value: PAYMENT_OPTIONS.find(p => p.id === payment)?.label },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-body text-sm text-gray-500">{label}</span>
                        <span className="font-body font-semibold text-choco text-sm">{value || '—'}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="btn-outline flex-1">← Змінити</button>
                    <button onClick={handleOrder} className="btn-primary flex-1 btn-jelly">
                      🎉 Підтвердити!
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-3xl border-2 border-mint/20 p-5 h-fit">
            <h3 className="font-display text-lg text-choco mb-4">Ваше замовлення</h3>
            <div className="space-y-2 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-2 text-sm font-body">
                  <span>{item.emoji}</span>
                  <span className="flex-1 text-gray-600 truncate">{item.name} × {item.qty}</span>
                  <span className="font-semibold text-choco">{item.price * item.qty} грн</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-1">
              <div className="flex justify-between text-sm font-body text-gray-500">
                <span>Товари ({items.length})</span>
                <span>{total} грн</span>
              </div>
              <div className="flex justify-between text-sm font-body text-gray-500">
                <span>Доставка</span>
                <span className={total >= 500 ? 'text-mint font-semibold' : ''}>{total >= 500 ? 'Безкоштовно' : `${deliveryPrice} грн`}</span>
              </div>
              <div className="flex justify-between font-display text-xl text-choco pt-2 border-t border-gray-100">
                <span>Разом:</span>
                <span>{finalTotal} грн</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
