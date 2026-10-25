import { useEffect, useState, type ReactNode } from 'react';
import Lottie from 'lottie-react';
import giftAnimation from '../gift.json';
import starAnimation from '../star.json';
import {
  EDITION,
  PRICES_TEXT,
  PRIVACY,
  SUPPORT_TEXT,
  TERMS,
  UI,
  type Company,
  type Lang,
  type PageKey,
} from './content';

const BRAND_NAME = import.meta.env.VITE_BRAND_NAME || 'YulduzPay';
const IS_STARPAY = BRAND_NAME.replace(/[\s_-]/g, '').toLowerCase() === 'starpay';
const API_URL = (
  import.meta.env.VITE_API_URL || (IS_STARPAY ? 'https://api-app.starpay.uz' : '')
).replace(/\/+$/, '');
const LOGO_PATH = `/${BRAND_NAME.toLowerCase()}_icon.png`;

export const LEGAL_PAGES: PageKey[] = ['privacy', 'terms', 'prices', 'support'];
const LANGS: Lang[] = ['ru', 'uz', 'en'];

export const legalPageFromPath = (path: string): PageKey | null => {
  const key = path.replace(/^\/+|\/+$/g, '') as PageKey;
  return LEGAL_PAGES.includes(key) ? key : null;
};

const pickLang = (): Lang => {
  const q = new URLSearchParams(window.location.search).get('lang');
  if (q === 'ru' || q === 'uz' || q === 'en') return q;
  const nav = navigator.language.toLowerCase();
  return nav.startsWith('uz') ? 'uz' : nav.startsWith('en') ? 'en' : 'ru';
};

const EMPTY: Company = { name: '', taxId: '', address: '', email: '', telegram: '' };

async function getJson<T>(path: string): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}${path}`);
    if (!res.ok) return null;
    const body = await res.json();
    return (body?.data ?? body) as T;
  } catch {
    return null;
  }
}

interface Product {
  stars: number;
  premiumMonths: number | null;
  priceUzs: number;
  basePriceUzs: number;
  discountPercent: number;
}

const money = (n: number) => `${Math.round(n).toLocaleString('ru-RU')} UZS`;

export default function LegalPage({ page }: { page: PageKey }) {
  const [lang, setLang] = useState<Lang>(pickLang);
  const [company, setCompany] = useState<Company>(EMPTY);
  const [stars, setStars] = useState<Product[] | null>(null);
  const [premium, setPremium] = useState<Product[] | null>(null);
  const ui = UI[lang];

  useEffect(() => {
    void getJson<{ company?: Company }>('/api/v1/public/legal').then((c) => {
      if (c?.company) setCompany(c.company);
    });
    if (page === 'prices') {
      void getJson<{ items: Product[] }>('/api/v1/public/products?type=stars').then((r) =>
        setStars(r?.items ?? []),
      );
      void getJson<{ items: Product[] }>('/api/v1/public/products?type=premium').then((r) =>
        setPremium(r?.items ?? []),
      );
    }
  }, [page]);

  // On phones the menu is one scrollable row: bring the open page into view.
  useEffect(() => {
    document
      .querySelector('nav [aria-current="page"]')
      ?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }, [page]);

  useEffect(() => {
    document.title = `${ui.nav[page]} | ${BRAND_NAME}`;
    document.documentElement.lang = lang;
  }, [page, lang, ui]);

  const telegram = company.telegram || (IS_STARPAY ? '@StarPay_help' : '');
  const fill = (text: string) =>
    text
      .replace(/\{brand\}/g, BRAND_NAME)
      .replace(/\{company\}/g, company.name || ui.placeholder.name)
      .replace(/\{taxId\}/g, company.taxId || ui.placeholder.taxId)
      .replace(/\{address\}/g, company.address || ui.placeholder.address)
      .replace(/\{email\}/g, company.email || ui.placeholder.email)
      .replace(/\{telegram\}/g, telegram);

  const switchLang = (l: Lang) => {
    setLang(l);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', l);
    window.history.replaceState(null, '', url);
  };

  const sections = page === 'privacy' ? PRIVACY[lang] : page === 'terms' ? TERMS[lang] : null;

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-b from-[#EAF4FB] via-[#F4F9FC] to-[#FFFFFF] font-sans text-[#0F1B2A]">
      <div className="mx-auto w-full max-w-[1040px] px-5 py-8 sm:py-12">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <a href="/" className="inline-flex items-center gap-2.5">
            <img src={LOGO_PATH} alt={BRAND_NAME} className="h-8 w-8 shrink-0 object-contain" />
            <span className="text-[16px] font-semibold tracking-tight">{BRAND_NAME}</span>
          </a>
          <div className="flex gap-1 rounded-full bg-white/70 p-1 shadow-sm">
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => switchLang(l)}
                className={`rounded-full px-3 py-1 text-[12px] font-semibold uppercase ${
                  l === lang ? 'bg-[#2AABEE] text-white' : 'text-[#0F1B2A]/60'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </header>

        <div className="md:grid md:grid-cols-[230px_minmax(0,1fr)] md:items-start md:gap-8">
        {/* Mobile: one scrollable row on top. Desktop: a sticky column on the left. */}
        <nav className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:sticky md:top-6 md:mx-0 md:mb-0 md:flex-col md:gap-1 md:overflow-visible md:rounded-3xl md:bg-white/70 md:p-2 md:shadow-sm">
          {LEGAL_PAGES.map((p) => {
            const active = p === page;
            return (
              <a
                key={p}
                href={`/${p}?lang=${lang}`}
                aria-current={active ? 'page' : undefined}
                className={`shrink-0 rounded-full px-4 py-2 text-[14px] font-medium whitespace-nowrap transition-colors md:rounded-2xl md:py-2.5 ${
                  active
                    ? 'bg-[#2AABEE] text-white shadow-[0_8px_20px_-8px_rgba(42,171,238,0.7)]'
                    : 'bg-white/80 text-[#0F1B2A]/70 shadow-sm hover:bg-[#2AABEE]/10 hover:text-[#0F1B2A] md:bg-transparent md:shadow-none'
                }`}
              >
                {ui.nav[p]}
              </a>
            );
          })}
        </nav>

        <main className="rounded-3xl bg-white/80 p-6 shadow-[0_20px_60px_-25px_rgba(42,171,238,0.35)] sm:p-9">
          <h1 className="text-[26px] font-bold leading-tight tracking-tight">{ui.nav[page]}</h1>
          {sections ? (
            <p className="mt-1 text-[13px] text-[#0F1B2A]/50">
              {ui.updated} {EDITION}
            </p>
          ) : null}

          {sections ? (
            <div className="mt-6 space-y-6">
              {sections.map((s) => (
                <section key={s.title}>
                  <h2 className="mb-2 text-[17px] font-semibold">{s.title}</h2>
                  {s.body.map((p, i) => (
                    <p key={i} className="mb-2 text-[15px] leading-relaxed text-[#0F1B2A]/80">
                      {fill(p)}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          ) : null}

          {page === 'prices' ? (
            <div className="mt-5 space-y-7">
              <p className="text-[15px] leading-relaxed text-[#0F1B2A]/80">
                {fill(PRICES_TEXT[lang].intro)}
              </p>
              <PriceTable
                icon={<Lottie animationData={starAnimation} loop className="h-8 w-8 shrink-0" />}
                title={PRICES_TEXT[lang].stars}
                head={[PRICES_TEXT[lang].pack, PRICES_TEXT[lang].price]}
                rows={stars?.map((p) => [
                  <span key="s" className="inline-flex items-center gap-1.5">
                    {p.stars.toLocaleString('ru-RU')}
                    <img src="/star.svg" alt="Stars" className="h-[18px] w-[18px] shrink-0" />
                  </span>,
                  money(p.priceUzs),
                ])}
                loading={ui.loading}
              />
              <PriceTable
                icon={
                  <img src="/Telegram Premium.svg" alt="Telegram Premium" className="h-8 w-8 object-contain" />
                }
                title={PRICES_TEXT[lang].premium}
                head={[PRICES_TEXT[lang].pack, PRICES_TEXT[lang].price]}
                rows={premium?.map((p) => [
                  `${p.premiumMonths} ${PRICES_TEXT[lang].months}`,
                  money(p.priceUzs),
                ])}
                loading={ui.loading}
              />
              <p className="flex items-start gap-3 text-[15px] leading-relaxed text-[#0F1B2A]/80">
                <Lottie animationData={giftAnimation} loop className="h-9 w-9 shrink-0" />
                <span className="pt-1.5">{PRICES_TEXT[lang].gifts}</span>
              </p>
              <p className="text-[13px] leading-relaxed text-[#0F1B2A]/55">{PRICES_TEXT[lang].fees}</p>
            </div>
          ) : null}

          {page === 'support' ? (
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed">
              <p className="text-[#0F1B2A]/80">{SUPPORT_TEXT[lang].intro}</p>
              <div className="space-y-2 rounded-2xl bg-[#F4F9FC] p-5">
                <p>
                  <span className="text-[#0F1B2A]/55">{SUPPORT_TEXT[lang].telegram}: </span>
                  <a
                    href={`https://t.me/${telegram.replace(/^@/, '')}`}
                    className="font-semibold text-[#2AABEE]"
                  >
                    {telegram}
                  </a>
                </p>
                <p>
                  <span className="text-[#0F1B2A]/55">{SUPPORT_TEXT[lang].email}: </span>
                  {company.email ? (
                    <a href={`mailto:${company.email}`} className="font-semibold text-[#2AABEE]">
                      {company.email}
                    </a>
                  ) : (
                    <span className="font-semibold">{ui.placeholder.email}</span>
                  )}
                </p>
              </div>
              <p className="text-[#0F1B2A]/80">{SUPPORT_TEXT[lang].hours}</p>
              <p className="text-[#0F1B2A]/80">{SUPPORT_TEXT[lang].tip}</p>
            </div>
          ) : null}
        </main>
        </div>

        <footer className="mt-8 space-y-1 text-[13px] text-[#0F1B2A]/55">
          <p>
            {ui.seller}: {company.name || ui.placeholder.name} · {ui.taxId}:{' '}
            {company.taxId || ui.placeholder.taxId}
          </p>
          <p>
            {ui.address}: {company.address || ui.placeholder.address}
          </p>
          <p>
            {ui.support}: {telegram}
            {company.email ? ` · ${company.email}` : ''}
          </p>
          <p className="pt-2">
            <a href="/" className="text-[#2AABEE]">
              ← {ui.home}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

function PriceTable({
  icon,
  title,
  head,
  rows,
  loading,
}: {
  icon: ReactNode;
  title: string;
  head: [string, string];
  rows: Array<[ReactNode, string]> | undefined;
  loading: string;
}) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-[17px] font-semibold">
        {icon}
        {title}
      </h2>
      <div className="overflow-hidden rounded-2xl border border-[#2AABEE]/15">
        <table className="w-full text-[15px]">
          <thead className="bg-[#F4F9FC] text-left text-[13px] text-[#0F1B2A]/55">
            <tr>
              <th className="px-4 py-2.5 font-medium">{head[0]}</th>
              <th className="px-4 py-2.5 text-right font-medium">{head[1]}</th>
            </tr>
          </thead>
          <tbody>
            {rows === undefined ? (
              <tr>
                <td className="px-4 py-3 text-[#0F1B2A]/50" colSpan={2}>
                  {loading}
                </td>
              </tr>
            ) : (
              rows.map(([a, b], i) => (
                <tr key={i} className="border-t border-[#2AABEE]/10">
                  <td className="px-4 py-2.5">{a}</td>
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums">{b}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
