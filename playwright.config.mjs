import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  expect: { timeout: 7_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: { baseURL: 'http://127.0.0.1:4174', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  webServer: { command: 'node scripts/serve.mjs', env: { PORT: '4174' }, url: 'http://127.0.0.1:4174', reuseExistingServer: !process.env.CI, timeout: 20_000 },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
