/* eslint-disable */
import '@testing-library/jest-dom';
import 'jest-canvas-mock';

/**
 * the code bellow is from react chartjs github repo
 * https://github.com/reactchartjs/react-chartjs-2/blob/master/test/setup.js
 */

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
