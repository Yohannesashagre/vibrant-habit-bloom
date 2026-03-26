
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, BarChart3, Calendar, CheckCircle, Zap, ArrowRight, Sparkles, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onGetStarted: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  })
};

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    { icon: Target, title: "Smart Goals", description: "Set daily, weekly, or custom frequency habits with intelligent reminders" },
    { icon: BarChart3, title: "Deep Analytics", description: "Visualize progress with beautiful charts and actionable insights" },
    { icon: Calendar, title: "Calendar View", description: "Track completions across time with an intuitive calendar heatmap" },
    { icon: CheckCircle, title: "Streak Tracking", description: "Build momentum and never break the chain with streak counters" },
    { icon: Zap, title: "Quick Actions", description: "Mark habits complete with a single tap — frictionless tracking" },
    { icon: Shield, title: "Secure & Private", description: "Your data stays safe with encrypted storage and private accounts" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between py-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-premium">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight font-['Outfit']">HabitFlow</span>
          </div>
          <Button onClick={onGetStarted} variant="outline" className="rounded-full px-6">
            Sign In
          </Button>
        </motion.nav>

        {/* Hero */}
        <section className="pt-16 pb-20 text-center">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-muted-foreground mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              Build habits that stick
            </span>
          </motion.div>

          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 font-['Outfit']"
          >
            Transform your life,<br />
            <span className="text-gradient">one habit at a time</span>
          </motion.h1>

          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The most beautiful and intuitive habit tracker. Set goals, track streaks,
            analyze progress — all in one premium experience.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="rounded-full px-8 py-6 text-base font-semibold shadow-premium bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-base font-semibold"
              onClick={onGetStarted}
            >
              Learn More
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="flex justify-center gap-12 mt-16"
          >
            {[
              { label: 'Active Users', value: '10K+' },
              { label: 'Habits Tracked', value: '500K+' },
              { label: 'Success Rate', value: '94%' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Features */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] mb-4">Everything you need to succeed</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Powerful features wrapped in a beautiful, distraction-free interface.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group p-6 rounded-2xl glass hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] mb-4">Loved by thousands</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { name: 'Sarah K.', text: 'HabitFlow completely changed my morning routine. The streak tracking keeps me accountable every day!', stars: 5 },
              { name: 'Michael R.', text: 'The analytics are incredible. I can actually see my progress over weeks and months. Highly recommended.', stars: 5 },
              { name: 'Emily T.', text: 'Beautiful design and so easy to use. I have tried dozens of habit trackers and this is by far the best.', stars: 5 },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-6 rounded-2xl glass"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">"{t.text}"</p>
                <p className="font-semibold text-sm">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-primary p-12 text-center shadow-premium"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground font-['Outfit'] mb-4">
              Ready to build better habits?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Join thousands of people who have transformed their daily routines with HabitFlow.
            </p>
            <Button
              onClick={onGetStarted}
              size="lg"
              variant="secondary"
              className="rounded-full px-8 py-6 text-base font-semibold hover:scale-105 transition-transform"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
          <p>© 2026 HabitFlow. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
