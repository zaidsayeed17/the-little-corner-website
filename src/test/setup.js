import '@testing-library/jest-dom';

// Polyfill in-memory localStorage for jsdom if needed
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Polyfill window.scrollTo and Element.prototype.scrollIntoView
window.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};
