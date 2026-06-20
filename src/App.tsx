import { ArrowRight, CreditCard } from 'lucide-react';
import Lottie from 'lottie-react';
import giftAnimation from '../public/gift.json';

const BOT_URL = 'https://t.me/YulduzPayBot?start=auto';

export default function App() {
  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-b from-[#EAF4FB] via-[#F4F9FC] to-[#FFFFFF] flex flex-col items-center justify-center font-sans text-[#0F1B2A] selection:bg-[#2AABEE]/20 relative overflow-hidden">

      {/* Subtle blue hairline grid texture (the only background decoration) */}
      <div className="yp-grid-bg absolute inset-0 pointer-events-none" />

      {/* Main mobile container — scrollsiz, compact */}
      <div className="relative z-10 w-full max-w-[420px] min-h-[100dvh] sm:min-h-0 sm:h-[860px] flex flex-col mx-auto px-5 sm:px-6 py-6 sm:py-9 sm:rounded-[2.5rem] sm:bg-white/60 sm:backdrop-blur-xl sm:border sm:border-[#2AABEE]/15 sm:shadow-[0_30px_80px_-20px_rgba(42,171,238,0.25)]">

        {/* ───────── 1. Header ───────── */}
        <header className="relative flex justify-center items-center w-full entrance-fade-up" style={{ animationDelay: '0ms' }}>
          <a
            href={BOT_URL}
            className="relative inline-flex items-center group"
          >
            <div className="absolute right-full mr-2.5 w-8 h-8 flex items-center justify-center">
              <img src="/yulduzpay_icon.png" alt="YulduzPay" className="w-full h-full object-contain" />
            </div>
            <span className="text-[16px] font-semibold tracking-tight text-[#0F1B2A]">YulduzPay</span>
          </a>
        </header>

        {/* ───────── 2. Hero ───────── */}
        <section className="w-full mt-6 entrance-fade-up" style={{ animationDelay: '90ms' }}>
          <h1 className="text-[32px] sm:text-[36px] font-bold tracking-[-0.02em] text-[#0F1B2A] leading-[1.15] text-center">
            Telegram <span className="text-[#2AABEE]">Premium,</span><br />
            Stars va Gifts <span className="text-[#0F1B2A]">endi</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2AABEE] to-[#007AFF] font-bold tracking-tight">Milliy valyutada.</span>
          </h1>
          <p className="mt-3 text-[14px] font-medium text-[#0F1B2A]/60 leading-relaxed text-center">
            Akkauntingizni yangi darajaga olib chiqing
          </p>
        </section>

        {/* ───────── 3. Bento Grid: Premium (big) + Stars + Gifts ───────── */}
        <section
          className="w-full mt-5 grid grid-cols-3 grid-rows-2 gap-2.5"
          style={{ minHeight: '232px' }}
        >
          {/* Premium — featured (2x2) */}
          <a
            href={BOT_URL}
            className="entrance-scale-in col-span-2 row-span-2 relative rounded-[1.6rem] overflow-hidden border border-[#2AABEE]/25 bg-gradient-to-br from-[#DCEEFB] via-[#EAF4FB] to-[#FFFFFF] p-5 flex flex-col justify-between group transition-transform duration-300 hover:-translate-y-0.5 shadow-[0_8px_30px_-12px_rgba(42,171,238,0.4)]"
            style={{ animationDelay: '180ms' }}
          >
            {/* very subtle corner light, not neon */}
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#2AABEE]/15 blur-2xl pointer-events-none" />

            <div className="relative flex items-center">
              <span className="text-[10px] font-bold tracking-[0.15em] text-[#2AABEE] uppercase">Telegram Premium</span>
            </div>

            <div className="relative flex items-center justify-center flex-1 my-3">
              <img src="/Telegram Premium.svg" alt="Telegram Premium" className="w-[96px] h-[96px] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3" />
            </div>

            <div className="relative mt-1">
              <div className="text-[17px] font-bold tracking-tight text-[#0F1B2A] leading-tight">Cheksiz imkoniyatlar</div>
            </div>
          </a>

          {/* Stars — small (1x1) */}
          <a
            href={BOT_URL}
            className="entrance-scale-in col-span-1 row-span-1 relative rounded-[1.2rem] overflow-hidden border border-[#E8B400]/30 bg-gradient-to-br from-[#FFF8DD] via-[#FFFCEF] to-[#FFFFFF] p-3 flex flex-col items-center justify-center gap-2.5 group transition-transform duration-300 hover:-translate-y-0.5 shadow-[0_6px_20px_-12px_rgba(232,180,0,0.4)]"
            style={{ animationDelay: '260ms' }}
          >
            <img src="/star.svg" alt="Stars" className="w-12 h-12 object-contain" />
            <span className="text-[13px] font-bold tracking-[0.12em] text-[#B8860B] uppercase">Stars</span>
          </a>

          {/* Gifts — small (1x1) */}
          <a
            href={BOT_URL}
            className="entrance-scale-in col-span-1 row-span-1 relative rounded-[1.2rem] overflow-hidden border border-[#FF8FB1]/30 bg-gradient-to-br from-[#FFE8F0] via-[#FFF4F8] to-[#FFFFFF] p-3 flex flex-col items-center justify-center gap-2.5 group transition-transform duration-300 hover:-translate-y-0.5 shadow-[0_6px_20px_-12px_rgba(255,143,177,0.4)]"
            style={{ animationDelay: '340ms' }}
          >
            <Lottie
              animationData={giftAnimation}
              loop
              autoplay
              className="w-12 h-12"
            />
            <span className="text-[13px] font-bold tracking-[0.12em] text-[#E64380] uppercase">Gifts</span>
          </a>
        </section>

        {/* ───────── 4. CTA (single, no neon) ───────── */}
        <section className="w-full mt-6 entrance-fade-up" style={{ animationDelay: '420ms' }}>
          <a
            href={BOT_URL}
            className="group relative w-full flex items-center justify-center gap-2 bg-[#2AABEE] hover:bg-[#1E96DA] text-white font-semibold py-[1.05rem] px-5 rounded-[1.1rem] shadow-[0_10px_30px_-8px_rgba(42,171,238,0.6)] transition-all duration-200 active:scale-[0.98]"
          >
            <svg viewBox="0 0 100 100" className="w-[18px] h-[18px] fill-current text-white/95">
              <path d="M88.723,12.142C76.419,17.238,23.661,39.091,9.084,45.047c-9.776,3.815-4.053,7.392-4.053,7.392    s8.345,2.861,15.499,5.007c7.153,2.146,10.968-0.238,10.968-0.238l33.62-22.652c11.922-8.107,9.061-1.431,6.199,1.431    c-6.199,6.2-16.452,15.975-25.036,23.844c-3.815,3.338-1.908,6.199-0.238,7.63c6.199,5.246,23.129,15.976,24.082,16.691    c5.037,3.566,14.945,8.699,16.452-2.146c0,0,5.961-37.435,5.961-37.435c1.908-12.637,3.815-24.321,4.053-27.659    C97.307,8.804,88.723,12.142,88.723,12.142z"/>
            </svg>
            <span className="text-[15px] tracking-tight">Telegram orqali boshlash</span>
            <ArrowRight className="w-4 h-4 text-white/95 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </section>

        {/* ───────── 5. Trust row (payments below CTA) ───────── */}
        <section className="w-full mt-5 entrance-fade-up" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0F1B2A]/60">
            <CreditCard className="w-3.5 h-3.5 text-[#2AABEE] shrink-0" />
            <span className="uppercase tracking-wide">To'lov usullari</span>
          </div>

          <div className="mt-2.5 grid grid-cols-4 gap-2">
            <a href={BOT_URL} className="bg-white rounded-lg h-9 flex items-center justify-center px-1 shadow-sm border border-black/[0.04] transition-transform duration-200 hover:scale-105 active:scale-95">
              <img src="/click_logo_on_white.svg" alt="Click" className="h-[14px] w-auto object-contain" />
            </a>
            <a href={BOT_URL} className="bg-white rounded-lg h-9 flex items-center justify-center px-1 shadow-sm border border-black/[0.04] transition-transform duration-200 hover:scale-105 active:scale-95">
              <img src="/payme-logo.png" alt="Payme" className="h-[15px] w-auto object-contain" />
            </a>
            <a href={BOT_URL} className="bg-white rounded-lg h-9 flex items-center justify-center px-1 shadow-sm border border-black/[0.04] transition-transform duration-200 hover:scale-105 active:scale-95">
              <img src="/Uzum.svg" alt="Uzum" className="h-[15px] w-auto object-contain" />
            </a>
            <a href={BOT_URL} className="bg-white rounded-lg h-9 flex items-center justify-center px-1 shadow-sm border border-black/[0.04] transition-transform duration-200 hover:scale-105 active:scale-95">
              <img src="/Card_uzcard_humo.png" alt="Uzcard / Humo" className="h-[16px] w-auto object-contain" />
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
