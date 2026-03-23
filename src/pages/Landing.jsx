import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-between overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, hsl(252 80% 18%) 0%, hsl(230 30% 10%) 50%, hsl(280 60% 14%) 100%)',
      }}
    >
      <div
        className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full pointer-events-none"
        style={{ background: 'hsl(252 80% 55% / 0.18)', filter: 'blur(80px)' }}
      />
      <div
        className="absolute bottom-[-60px] right-[-60px] w-[260px] h-[260px] rounded-full pointer-events-none"
        style={{ background: 'hsl(280 70% 55% / 0.14)', filter: 'blur(70px)' }}
      />

      <div className="flex-1" />

      <div className="flex flex-col items-center text-center px-8 z-10">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, hsl(252 80% 55%), hsl(280 70% 55%))',
            boxShadow: '0 12px 40px hsl(252 80% 55% / 0.45)',
          }}
        >
          <Calculator className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-2">
            Omni<span style={{ color: 'hsl(252 80% 75%)' }}>Con</span>
          </h1>
          <p className="text-base font-medium" style={{ color: 'hsl(252 30% 65%)' }}>
            The only calculator you&apos;ll ever need
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mt-8"
        >
          {['Basic', 'Scientific', 'Unit Converter', 'Currency'].map((label) => (
            <span
              key={label}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'hsl(252 80% 55% / 0.18)',
                color: 'hsl(252 80% 80%)',
                border: '1px solid hsl(252 80% 55% / 0.3)',
              }}
            >
              {label}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="w-full px-10 pb-10 z-10"
      >
        <Link
          to="/app"
          className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl text-sm font-semibold text-white active:scale-95 transition-transform"
          style={{
            background: 'linear-gradient(135deg, hsl(252 80% 55%), hsl(280 70% 55%))',
            boxShadow: '0 8px 24px hsl(252 80% 55% / 0.4)',
          }}
        >
          Get Started <ChevronRight className="w-4 h-4" />
        </Link>
        <p className="text-center text-xs mt-3" style={{ color: 'hsl(252 20% 50%)' }}>
          Free {'\u00B7'} No sign-up required
        </p>
      </motion.div>
    </div>
  );
}
