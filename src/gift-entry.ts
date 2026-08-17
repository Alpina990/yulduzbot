const brandName = import.meta.env.VITE_BRAND_NAME || 'YulduzPay';
const isStarPay = brandName.replace(/[\s_-]/g, '').toLowerCase() === 'starpay';

if (isStarPay) {
  void import('./gift/main.js');
} else {
  window.location.replace('/');
}
