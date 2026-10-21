import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = [['/about', 'About Lessy'], ['/services', 'Services'], ['/faq', 'Frequently asked questions'], ['/contact', 'Contact'], ['/privacy', 'Privacy Policy'], ['/projects', 'Projects'], ['/projects/rena', 'ReNa Farm'], ['/projects/jengo', 'Jengo']];

test.describe('content pages', () => {
  for (const [url, heading] of PAGES) {
    test(`${url} loads with one clear heading, navigation and a footer`, async ({ page }) => {
      const res = await page.goto(url);
      expect(res.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
      await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About' })).toBeVisible();
      await expect(page.locator('footer')).toContainText('Build by;');
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    });
  }

  test('the old addresses of real pages are served directly, not redirected', async ({ page }) => {
    for (const url of ['/about', '/contact', '/projects']) { await page.goto(url); expect(new URL(page.url()).pathname).toBe(url); }
  });

  test('FAQ answers open and close', async ({ page }) => {
    await page.goto('/faq');
    const second = page.locator('details').nth(1);
    await expect(second).not.toHaveAttribute('open', '');
    await second.locator('summary').click();
    await expect(second).toHaveAttribute('open', '');
    await expect(second).toContainText('Finehas Lesiamon Mpoe');
  });

  test('breadcrumbs and previous / next links work on a project page', async ({ page }) => {
    await page.goto('/projects/rena');
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' }).getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
    await page.getByRole('navigation', { name: 'More projects' }).getByRole('link').last().click();
    await expect(page).toHaveURL(/\/projects\/[a-z-]+$/);
    await expect(page.getByRole('heading', { level: 1 })).not.toHaveText('ReNa Farm');
  });

  test('the project page links on to the live site, the portfolio and email', async ({ page }) => {
    await page.goto('/projects/rena');
    await expect(page.getByRole('link', { name: /Public website/ })).toHaveAttribute('href', 'https://renafarm.co.ke');
    await expect(page.getByRole('link', { name: 'Open in the portfolio' })).toHaveAttribute('href', '/#project=rena');
    await expect(page.getByRole('link', { name: 'Ask about this' })).toHaveAttribute('href', /^mailto:lessy@prospergenics\.com/);
  });

  test('theme switch works and is remembered on content pages', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.locator('#theme-toggle').click();
    await page.goto('/faq');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('contact page copy buttons work', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
    await page.goto('/contact');
    await page.locator('.email-row').first().locator('.copy-btn').click();
    await expect(page.locator('#toast')).toContainText('lessy@prospergenics.com');
    await expect(page.locator('#socials-list, .socials-list a')).toHaveCount(8);
  });

  test('the home page leads to the new pages', async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('lessy-booted', '1'));
    await page.goto('/');
    await expect(page.locator('.directory a[href="/about"]')).toBeAttached();
    await expect(page.locator('.directory a[href="/projects/rena"]')).toBeAttached();
    await page.locator('.about-more a[href="/services"]').click();
    await expect(page).toHaveURL(/\/services$/);
  });
});

test.describe('accessibility of the content pages', () => {
  test.use({ reducedMotion: 'reduce' });
  test.setTimeout(120_000);
  for (const theme of ['light', 'dark']) {
    for (const [url] of PAGES) {
      test(`${url} (${theme}) has no WCAG A or AA violations`, async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop', 'same markup and styles on phone; desktop run is enough');
        await page.addInitScript(t => { try { localStorage.setItem('lessy-theme', t); } catch {} }, theme);
        await page.goto(url);
        await page.waitForTimeout(500);
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        const summary = results.violations.map(v => `${v.id} (${v.impact}): ${v.nodes[0].target.join(' ')}`);
        expect(summary, summary.join('\n')).toEqual([]);
      });
    }
  }
});
