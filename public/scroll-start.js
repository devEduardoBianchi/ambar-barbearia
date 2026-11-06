// Run before the document is painted so refreshing starts at the hero without a scroll jump.
(() => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const navigation = performance.getEntriesByType('navigation')[0];
  if (navigation?.type !== 'reload') return;

  if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
  const resetPosition = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  resetPosition();
  window.addEventListener('pageshow', resetPosition, { once: true });
})();
