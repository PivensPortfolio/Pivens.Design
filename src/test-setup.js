import '@testing-library/jest-dom'

// Polyfill IntersectionObserver for framer-motion whileInView in jsdom
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback
  }
  observe(element) {
    // Immediately fire as intersecting so whileInView resolves in tests
    this.callback([{ isIntersecting: true, target: element }], this)
  }
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = IntersectionObserverMock
