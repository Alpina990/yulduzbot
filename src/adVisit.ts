// Ties a Meta ad click to the buyer in the bot: a tap on a bot link swaps its start code for start=ad_<code>
// and sends the visitor's Meta browser ids (_fbc / fbclid, _fbp) under that code to the YulduzPay API. On /start
// the bot links the code to the Telegram user, and the API reports their checkout and paid orders to the
// Meta Conversions API (InitiateCheckout, Purchase). No ids (no ad click, pixel blocked): the link stays as it is.
const AD_VISITS_URL = 'https://api.yulduzpay.uz/api/v1/public/ad-visits';
const CODE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const LANDED_AT = Date.now();

function cookie(name: string): string {
  const entry = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : '';
}

// The pixel writes _fbc from fbclid only once it has loaded; a quick tap may come first.
function clickId(): string {
  const fbclid = new URLSearchParams(window.location.search).get('fbclid');
  return cookie('_fbc') || (fbclid ? `fb.1.${LANDED_AT}.${fbclid}` : '');
}

function randomCode(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(20)), (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join('');
}

export function trackBotLinks(): () => void {
  const code = randomCode();
  const onClick = (event: MouseEvent) => {
    const target = event.target instanceof Element ? event.target : null;
    const link = target?.closest<HTMLAnchorElement>('a[href*="telegram.dog/"], a[href*="t.me/"]');
    if (!link) return;
    const fbc = clickId();
    const fbp = cookie('_fbp');
    if (!fbc && !fbp) return;
    const url = new URL(link.href);
    url.searchParams.set('start', `ad_${code}`);
    link.href = url.toString();
    const body = new URLSearchParams({ code, url: `${window.location.origin}${window.location.pathname}` });
    if (fbc) body.set('fbc', fbc);
    if (fbp) body.set('fbp', fbp);
    navigator.sendBeacon?.(AD_VISITS_URL, body);
  };
  // Capture: runs before React's handlers and before the browser follows the link.
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}
