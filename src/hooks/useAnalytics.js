import { logEvent } from '../integrations/google/analytics.js';

export default function useAnalytics() {
  return { logEvent };
} 