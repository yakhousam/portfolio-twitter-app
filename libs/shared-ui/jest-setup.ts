/* eslint-disable */
import '@testing-library/jest-dom';
import 'jest-canvas-mock';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

class MutationObserver {
  disconnect() {}
  unobserve() {}
  observe() {}
}

// @ts-ignore: Unreachable code error
window.MutationObserver = MutationObserver;
