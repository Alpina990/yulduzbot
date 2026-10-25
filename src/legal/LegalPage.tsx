import { useEffect, useState, type ReactNode } from 'react';
import Lottie from 'lottie-react';
import { ArrowUp, Mail, Monitor, Moon, Send, Sun } from 'lucide-react';
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
  type Section,
} from './content';

const BRAND_NAME = import.meta.env.VITE_BRAND_NAME || 'YulduzPay';
const IS_STARPAY = BRAND_NAME.replace(/[\s_-]/g, '').toLowerCase() === 'starpay';
const API_URL = (
  import.meta.env.VITE_API_URL || (IS_STARPAY ? 'https://api-app.starpay.uz' : '')
).replace(/\/+$/, '');
const BOT_URL = (import.meta.env.VITE_BOT_URL || '').replace(
  /^https?:\/\/(?:www\.)?t\.me\//i,
  'https://telegram.dog/',
);
const LOGO_PATH = `/${BRAND_NAME.toLowerCase()}_icon.png`;

export const LEGAL_PAGES: PageKey[] = ['privacy', 'terms', 'prices', 'support'];
const LANGS: Lang[] = ['ru', 'uz', 'en'];

type Theme = 'light' | 'dark' | 'system';
const THEME_KEY = 'sp-legal-theme';

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

const readTheme = (): Theme => {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
};

const systemDark = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

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
  isPopular: boolean;
}

// Page text edited in Admin; the bundled copy in ./content is the fallback.
interface RemotePage {
  edition?: string;
  sections?: Section[];
  intro?: string;
  gifts?: string;
  fees?: string;
  hours?: string;
  tip?: string;
}

const money = (n: number) => `${Math.round(n).toLocaleString('ru-RU')} UZS`;

export default function LegalPage({ page }: { page: PageKey }) {
  const [lang, setLang] = useState<Lang>(pickLang);
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [dark, setDark] = useState(() => readTheme() === 'dark' || (readTheme() === 'system' && systemDark()));
  const [company, setCompany] = useState<Company>(EMPTY);
  const [stars, setStars] = useState<Product[] | null>(null);
  const [premium, setPremium] = useState<Product[] | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [remote, setRemote] = useState<{ key: string; content: RemotePage } | null>(null);
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

  useEffect(() => {
    let alive = true;
    void getJson<{ content: RemotePage }>(`/api/v1/public/legal/pages/${page}/${lang}`).then((r) => {
      if (alive && r?.content) setRemote({ key: `${page}/${lang}`, content: r.content });
    });
    return () => {
      alive = false;
    };
  }, [page, lang]);

  // The visitor's choice wins; "system" follows the OS, also when it changes.
  useEffect(() => {
    try {
      if (theme === 'system') localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage blocked: the choice just lasts for this visit */
    }
    if (theme !== 'system') {
      setDark(theme === 'dark');
      return;
    }
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    setDark(mq?.matches ?? false);
    const on = (e: MediaQueryListEvent) => setDark(e.matches);
    mq?.addEventListener('change', on);
    return () => mq?.removeEventListener('change', on);
  }, [theme]);

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

  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const telegram = company.telegram || (IS_STARPAY ? '@StarPay_help' : '');
  const telegramUrl = `https://t.me/${telegram.replace(/^@/, '')}`;
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

  const live = remote?.key === `${page}/${lang}` ? remote.content : null;
  const bundled = page === 'privacy' ? PRIVACY[lang] : page === 'terms' ? TERMS[lang] : null;
  const sections = bundled ? (live?.sections?.length ? live.sections : bundled) : null;
  const edition = live?.edition || EDITION;
  const pricesText = { ...PRICES_TEXT[lang], ...pick(live, ['intro', 'gifts', 'fees']) };
  const supportText = { ...SUPPORT_TEXT[lang], ...pick(live, ['intro', 'hours', 'tip']) };
  const themes: Array<{ key: Theme; icon: ReactNode }> = [
    { key: 'light', icon: <Sun className="h-4 w-4" /> },
    { key: 'dark', icon: <Moon className="h-4 w-4" /> },
    { key: 'system', icon: <Monitor className="h-4 w-4" /> },
  ];

  return (
    <div
      className={`lp ${dark ? 'lp-dark' : ''} min-h-[100dvh] w-full bg-linear-to-b from-(--lp-bg-from) to-(--lp-bg-to) font-sans text-(--lp-fg) transition-colors`}
    >
      <div className="mx-auto w-full max-w-[1040px] px-5 py-6 sm:py-10">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <a href="/" className="inline-flex items-center gap-2.5">
            <img src={LOGO_PATH} alt={BRAND_NAME} className="h-8 w-8 shrink-0 object-contain" />
            <span className="text-[16px] font-semibold tracking-tight">{BRAND_NAME}</span>
          </a>
          <div className="flex items-center gap-2">
            <Segmented>
              {themes.map((t) => (
                <SegButton
                  key={t.key}
                  active={theme === t.key}
                  label={ui.theme[t.key]}
                  onClick={() => setTheme(t.key)}
                >
                  {t.icon}
                </SegButton>
              ))}
            </Segmented>
            <Segmented>
              {LANGS.map((l) => (
                <SegButton key={l} active={l === lang} label={l.toUpperCase()} onClick={() => switchLang(l)}>
                  <span className="text-[12px] font-semibold uppercase">{l}</span>
                </SegButton>
              ))}
            </Segmented>
          </div>
        </header>

        <div className="md:grid md:grid-cols-[250px_minmax(0,1fr)] md:items-start md:gap-8">
          {/* Mobile: one scrollable row on top. Desktop: a sticky column on the left. */}
          <aside className="md:sticky md:top-6 md:space-y-4">
            <nav className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:mb-0 md:flex-col md:gap-1 md:overflow-visible md:rounded-3xl md:bg-(--lp-card) md:p-2 md:shadow-sm">
              {LEGAL_PAGES.map((p) => {
                const active = p === page;
                return (
                  <a
                    key={p}
                    href={`/${p}?lang=${lang}`}
                    aria-current={active ? 'page' : undefined}
                    className={`shrink-0 rounded-full px-4 py-2 text-[14px] font-medium whitespace-nowrap transition-colors md:rounded-2xl md:py-2.5 md:whitespace-normal md:leading-snug ${
                      active
                        ? 'bg-(--lp-accent) text-white shadow-[0_8px_20px_-8px_rgba(42,171,238,0.7)]'
                        : 'bg-(--lp-card) text-(--lp-muted) shadow-sm hover:bg-(--lp-accent)/10 hover:text-(--lp-fg) md:bg-transparent md:shadow-none'
                    }`}
                  >
                    {ui.nav[p]}
                  </a>
                );
              })}
            </nav>

            {sections ? (
              <div className="hidden rounded-3xl bg-(--lp-card) p-4 shadow-sm md:mt-4 md:block">
                <p className="mb-2 px-2 text-[12px] font-semibold uppercase tracking-wide text-(--lp-muted)">
                  {ui.contents}
                </p>
                <ol className="space-y-0.5">
                  {sections.map((s, i) => (
                    <li key={s.title}>
                      <a
                        href={`#s${i + 1}`}
                        className="block rounded-xl px-2 py-1.5 text-[13px] leading-snug text-(--lp-muted) hover:bg-(--lp-accent)/10 hover:text-(--lp-fg)"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </aside>

          <main className="rounded-3xl bg-(--lp-card) p-6 shadow-[0_20px_60px_-25px_rgba(42,171,238,0.35)] sm:p-9">
            <h1 className="text-[26px] font-bold leading-tight tracking-tight sm:text-[30px]">
              {ui.nav[page]}
            </h1>
            {sections ? (
              <p className="mt-1 text-[13px] text-(--lp-muted)">
                {ui.updated} {edition}
              </p>
            ) : null}

            {sections ? (
              <div className="mt-6 max-w-[68ch] space-y-7">
                {sections.map((s, i) => (
                  <section key={s.title} id={`s${i + 1}`} className="scroll-mt-6">
                    <h2 className="mb-2 text-[17px] font-semibold">{s.title}</h2>
                    {s.body.map((p, j) => (
                      <p key={j} className="mb-2.5 text-[15px] leading-relaxed text-(--lp-fg)/80">
                        {fill(p)}
                      </p>
                    ))}
                  </section>
                ))}
              </div>
            ) : null}

            {page === 'prices' ? (
              <div className="mt-5 space-y-7">
                <p className="text-[15px] leading-relaxed text-(--lp-fg)/80">
                  {fill(pricesText.intro)}
                </p>
                <PriceTable
                  icon={<Lottie animationData={starAnimation} loop className="h-8 w-8 shrink-0" />}
                  title={PRICES_TEXT[lang].stars}
                  head={[PRICES_TEXT[lang].pack, PRICES_TEXT[lang].price]}
                  popular={ui.popular}
                  rows={stars?.map((p) => ({
                    label: (
                      <span className="inline-flex items-center gap-1.5">
                        {p.stars.toLocaleString('ru-RU')}
                        <img src="/star.svg" alt="Stars" className="h-[18px] w-[18px] shrink-0" />
                      </span>
                    ),
                    price: money(p.priceUzs),
                    popular: p.isPopular,
                  }))}
                  loading={ui.loading}
                />
                <PriceTable
                  icon={
                    <img
                      src="/Telegram Premium.svg"
                      alt="Telegram Premium"
                      className="h-8 w-8 shrink-0 object-contain"
                    />
                  }
                  title={PRICES_TEXT[lang].premium}
                  head={[PRICES_TEXT[lang].pack, PRICES_TEXT[lang].price]}
                  popular={ui.popular}
                  rows={premium?.map((p) => ({
                    label: `${p.premiumMonths} ${PRICES_TEXT[lang].months}`,
                    price: money(p.priceUzs),
                    popular: p.isPopular,
                  }))}
                  loading={ui.loading}
                />
                <p className="flex items-start gap-3 rounded-2xl bg-(--lp-soft) p-4 text-[15px] leading-relaxed text-(--lp-fg)/80">
                  <Lottie animationData={giftAnimation} loop className="h-9 w-9 shrink-0" />
                  <span className="pt-1.5">{fill(pricesText.gifts)}</span>
                </p>
                <p className="text-[13px] leading-relaxed text-(--lp-muted)">{fill(pricesText.fees)}</p>
                {BOT_URL ? <PrimaryButton href={BOT_URL} icon={<Send className="h-4 w-4" />}>{ui.buy}</PrimaryButton> : null}
              </div>
            ) : null}

            {page === 'support' ? (
              <div className="mt-5 space-y-5 text-[15px] leading-relaxed">
                <p className="text-(--lp-fg)/80">{fill(supportText.intro)}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ContactCard
                    icon={<Send className="h-5 w-5" />}
                    label={SUPPORT_TEXT[lang].telegram}
                    value={telegram}
                    href={telegramUrl}
                  />
                  <ContactCard
                    icon={<Mail className="h-5 w-5" />}
                    label={SUPPORT_TEXT[lang].email}
                    value={company.email || ui.placeholder.email}
                    href={company.email ? `mailto:${company.email}` : undefined}
                  />
                </div>
                <p className="text-(--lp-fg)/80">{fill(supportText.hours)}</p>
                <p className="rounded-2xl bg-(--lp-soft) p-4 text-(--lp-fg)/80">{fill(supportText.tip)}</p>
                <PrimaryButton href={telegramUrl} icon={<Send className="h-4 w-4" />}>
                  {ui.write}
                </PrimaryButton>
              </div>
            ) : null}
          </main>
        </div>

        <footer className="mt-8 space-y-1 text-[13px] text-(--lp-muted)">
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
            <a href="/" className="text-(--lp-accent)">
              ← {ui.home}
            </a>
          </p>
        </footer>
      </div>

      {showTop ? (
        <button
          type="button"
          aria-label={ui.toTop}
          title={ui.toTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] flex h-11 w-11 items-center justify-center rounded-full bg-(--lp-accent) text-white shadow-lg transition-transform active:scale-95"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      ) : null}
    </div>
  );
}

function pick(src: RemotePage | null, keys: Array<keyof RemotePage>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = src?.[k];
    if (typeof v === 'string' && v.trim()) out[k] = v;
  }
  return out;
}

const Segmented = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-0.5 rounded-full bg-(--lp-card) p-1 shadow-sm">{children}</div>
);

const SegButton = ({
  active,
  label,
  onClick,
  children,
}: {
  key?: string;
  active: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    title={label}
    aria-label={label}
    aria-pressed={active}
    onClick={onClick}
    className={`flex h-8 min-w-8 items-center justify-center rounded-full px-2.5 transition-colors ${
      active ? 'bg-(--lp-accent) text-white' : 'text-(--lp-muted) hover:text-(--lp-fg)'
    }`}
  >
    {children}
  </button>
);

const PrimaryButton = ({
  href,
  icon,
  children,
}: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}) => (
  <a
    href={href}
    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-(--lp-accent) px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(42,171,238,0.6)] transition-transform active:scale-[0.98] sm:w-auto sm:inline-flex"
  >
    {icon}
    {children}
  </a>
);

const ContactCard = ({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) => {
  const body = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--lp-accent)/12 text-(--lp-accent)">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[12px] text-(--lp-muted)">{label}</span>
        <span className="block truncate font-semibold">{value}</span>
      </span>
    </>
  );
  const cls = 'flex items-center gap-3 rounded-2xl border border-(--lp-line) bg-(--lp-soft) p-4';
  return href ? (
    <a href={href} className={`${cls} transition-colors hover:border-(--lp-accent)`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
};

interface PriceRow {
  label: ReactNode;
  price: string;
  popular: boolean;
}

function PriceTable({
  icon,
  title,
  head,
  rows,
  popular,
  loading,
}: {
  icon: ReactNode;
  title: string;
  head: [string, string];
  rows: PriceRow[] | undefined;
  popular: string;
  loading: string;
}) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-[17px] font-semibold">
        {icon}
        {title}
      </h2>
      <div className="overflow-hidden rounded-2xl border border-(--lp-line)">
        <table className="w-full text-[15px]">
          <thead className="bg-(--lp-soft) text-left text-[13px] text-(--lp-muted)">
            <tr>
              <th className="px-4 py-2.5 font-medium">{head[0]}</th>
              <th className="px-4 py-2.5 text-right font-medium">{head[1]}</th>
            </tr>
          </thead>
          <tbody>
            {rows === undefined ? (
              <tr>
                <td className="px-4 py-3 text-(--lp-muted)" colSpan={2}>
                  {loading}
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr
                  key={i}
                  className={`border-t border-(--lp-line) ${r.popular ? 'bg-(--lp-accent)/8' : ''}`}
                >
                  <td className="px-4 py-2.5">
                    <span className="inline-flex flex-wrap items-center gap-2">
                      {r.label}
                      {r.popular ? (
                        <span className="rounded-full bg-(--lp-accent) px-2 py-0.5 text-[11px] font-semibold text-white">
                          {popular}
                        </span>
                      ) : null}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums">{r.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
