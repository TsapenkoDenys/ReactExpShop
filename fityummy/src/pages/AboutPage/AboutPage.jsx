import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const TEAM = [
  { name: 'Crocorolo', role: 'Головний тестувальник', emoji: '🐊', bio: 'Народився у Французькій Гвіані. Майстер ролерів та знавець смаків.' },
  { name: 'Ріко', role: 'Нутриціолог', emoji: '🦎', bio: 'Розробляє рецептури для максимальної корисності.' },
  { name: 'Сіко', role: 'Дизайнер смаків', emoji: '🐢', bio: 'Поєднує неймовірні смакові комбінації.' },
  { name: 'Кріко', role: 'Менеджер якості', emoji: '🦕', bio: 'Гарантує 100% натуральний склад.' },
]

const VALUES = [
  { title: 'Натуральність', desc: 'Жодних штучних барвників, консервантів та підсилювачів смаку. Тільки природа!', icon: '🌿', color: '#4ecb8c' },
  { title: 'Спорт', desc: 'Ми живемо активним способом життя і створюємо продукти для таких же як ми.', icon: '⚡', color: '#f5a623' },
  { title: 'Смак', desc: 'Корисне має бути смачним. Ми доводимо це кожним нашим продуктом.', icon: '😋', color: '#e84393' },
  { title: 'Наука', desc: 'Кожна формула розроблена фахівцями і підтверджена дослідженнями.', icon: '🔬', color: '#8b5cf6' },
]

const TIMELINE = [
  { year: '2021', title: 'Початок', desc: 'Crocorolo з\'їхав з Мадагаскару до України з мрією про корисні солодощі' },
  { year: '2022', title: 'Перші продукти', desc: 'Запустили три смаки: Ківі, Манго та Малина. Перші тисячі клієнтів!' },
  { year: '2023', title: 'Розширення', desc: 'Додали протеїнові лінійки, партнерство з фітнес-клубами по всій Україні' },
  { year: '2024', title: 'Зараз', desc: '15 смаків, 50 000+ клієнтів і Crocorolo все ще на роликах!' },
]

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-28 px-6 bg-choco-light overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 right-20 w-64 h-64 bg-mint/10 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
          <motion.div
            className="absolute bottom-10 left-20 w-40 h-40 bg-berry/10 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 5, delay: 1 }}
          />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6"
          >
            <span className="text-mint text-sm font-body font-semibold">Наша історія</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-7xl text-cream mb-6"
          >
            Про <span className="text-mint">FitYummy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="font-body text-xl text-cream/70 leading-relaxed max-w-2xl mx-auto"
          >
            Бренд натуральних солодощів для людей, які активно займаються спортом і стежать за здоров'ям. Ми поєднали шоколад, йогурт та свіжі фрукти, щоб дати тобі силу для нових перемог.
          </motion.p>
        </div>
        <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 1440 60" fill="none">
          <path d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z" fill="#f0fdf4"/>
        </svg>
      </section>

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl text-choco-light mb-6">
              Смакуй.<br/>
              <span className="text-mint">Заряджайся.</span><br/>
              Перемагай.
            </h2>
            <p className="font-body text-gray-600 leading-relaxed mb-4">
              FitYummy народився з простої ідеї: корисне харчування не має бути нудним. Ми вірили, що можна створити щось смачне та натуральне водночас.
            </p>
            <p className="font-body text-gray-600 leading-relaxed mb-8">
              Сьогодні мільйони спортсменів та здоровелюбів по всій Україні обирають FitYummy як свій улюблений снек після тренування, на перекус або просто щоб порадувати себе.
            </p>
            <Link to="/catalog" className="btn-primary">
              Спробувати зараз →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-5 border-2 hover:shadow-lg transition-shadow"
                style={{ borderColor: `${v.color}40` }}
              >
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-display text-lg text-choco-light mb-1">{v.title}</h3>
                <p className="font-body text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-mint/5">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl text-choco-light text-center mb-16"
          >
            Наш <span className="text-berry">шлях</span>
          </motion.h2>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-mint/30 -translate-x-1/2"/>

            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} ml-16 md:ml-0`}>
                    <div className="bg-white rounded-2xl p-5 border-2 border-mint/20 hover:border-mint/60 transition-colors inline-block text-left">
                      <div className="font-display text-2xl text-mint mb-1">{item.year}</div>
                      <h3 className="font-display text-xl text-choco-light mb-2">{item.title}</h3>
                      <p className="font-body text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-choco-light border-4 border-white shadow-md mt-5 z-10"
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                  />

                  <div className="flex-1 hidden md:block"/>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-5xl text-choco-light mb-4">Наша <span className="text-mango">команда</span></h2>
            <p className="font-body text-gray-500">Знайомтесь зі зеленою командою Crocorolo!</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, rotate: i % 2 === 0 ? 1 : -1 }}
                className="bg-white rounded-3xl p-6 border-2 border-mint/20 text-center hover:border-mint/60 hover:shadow-xl hover:shadow-mint/15 transition-all"
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4 }}
                >
                  {member.emoji}
                </motion.div>
                <h3 className="font-display text-xl text-choco-light mb-1">{member.name}</h3>
                <div className="text-sm font-body text-mint font-semibold mb-3">{member.role}</div>
                <p className="text-xs font-body text-gray-500 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-choco-light">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-7xl mb-6"
            >🐊</motion.div>
            <h2 className="font-display text-5xl text-cream mb-4">
              Приєднуйся до <span className="text-mint">FitYummy</span>!
            </h2>
            <p className="font-body text-cream/70 mb-8 text-lg">
              Спробуй та відчуй різницю. Crocorolo вже чекає!
            </p>
            <Link to="/catalog" className="inline-block bg-mint text-choco-light font-display text-xl px-10 py-5 rounded-full hover:bg-croc transition-colors btn-jelly">
              Перейти до каталогу →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
