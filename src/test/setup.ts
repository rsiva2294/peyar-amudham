import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Worker for JSDOM
class MockWorker {
  onmessage: ((ev: MessageEvent) => void) | null = null;
  postMessage() {}
  terminate() {}
  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() { return true; }
  onerror: ((ev: ErrorEvent) => void) | null = null;
}

vi.stubGlobal('Worker', MockWorker);
