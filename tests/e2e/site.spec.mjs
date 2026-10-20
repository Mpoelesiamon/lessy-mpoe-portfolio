import { test, expect } from '@playwright/test';

const skipIntro = page => page.addInitScript(() => { try { sessionStorage.setItem('lessy-booted', '1'); } catch {} });
const desktopOnly = (testInfo) => test.skip(testInfo.project.name !== 'desktop', 'desktop-only behaviour');

test.beforeEach(async ({ page }) => { await skipIntro(page); });

test('loads clean with the right title and headline', async ({ page }) => {
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto('/');
  await expect(page).toHaveTitle(/Lessy/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Finehas Mpoe');
  await expect(page.locator('footer')).toContainText('Build by;');
  expect(errors, errors.join('\n')).toEqual([]);
});

test('intro plays on a first visit and can be skipped with a key', async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('#boot')).toBeAttached();
  await expect(page.locator('.boot-name')).toContainText('Finehas');
  await page.keyboard.press('Space');
  await expect(page.locator('#boot')).toHaveCount(0, { timeout: 12000 });
  await ctx.close();
});

test('no intro with reduced motion, and content is visible straight away', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('#boot')).toBeHidden();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('#work')).not.toHaveClass(/is-pinned/);
  await ctx.close();
});

test('work: case notes open from a slide, close with Escape, focus returns', async ({ page }) => {
  await page.goto('/');
  const trigger = page.locator('.slide [data-project="rena"]').last();
  await trigger.scrollIntoViewIfNeeded();
  await trigger.focus();
  await trigger.press('Enter');
  const dlg = page.locator('#case');
  await expect(dlg).toBeVisible();
  await expect(dlg.getByRole('heading', { name: 'ReNa Farm' })).toBeVisible();
  await expect(dlg.getByRole('link', { name: /Public website/ })).toHaveAttribute('rel', /noopener/);
  await page.keyboard.press('Escape');
  await expect(dlg).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('work: pinned horizontal scroll on desktop, plain stack on mobile', async ({ page }, testInfo) => {
  await page.goto('/');
  if (testInfo.project.name === 'desktop') await expect(page.locator('#work')).toHaveClass(/is-pinned/);
  else await expect(page.locator('#work')).not.toHaveClass(/is-pinned/);
});

test('index: type filter, tech filter and search narrow the list', async ({ page }) => {
  await page.goto('/');
  const lit = page.locator('.tile:not(.is-dim)');
  const total = await page.locator('.tile').count();
  expect(total).toBeGreaterThanOrEqual(20);
  await expect(lit).toHaveCount(total);
  await page.locator('[data-cat="AI"]').click();
  const ai = await lit.count();
  expect(ai).toBeGreaterThan(0); expect(ai).toBeLessThan(total);
  await page.locator('[data-cat="All"]').click();
  await page.locator('.tech', { hasText: 'WordPress' }).click();
  await expect(page.locator('#index-status')).toContainText('WordPress');
  expect(await lit.count()).toBeLessThan(total);
  await page.locator('.tech', { hasText: 'WordPress' }).click();   // toggle off
  await page.locator('#search').fill('vloer');
  await expect(lit).toHaveCount(1);
});

test('journey wall: one tab stop, arrow keys move between squares', async ({ page }) => {
  await page.goto('/');
  const cells = page.locator('#wall .cell');
  await expect(cells.first()).toHaveAttribute('tabindex', '0');
  await expect(cells.nth(1)).toHaveAttribute('tabindex', '-1');
  await cells.first().focus();
  await page.keyboard.press('ArrowRight');
  await expect(cells.nth(1)).toBeFocused();
  await page.keyboard.press('End');
  await expect(cells.last()).toBeFocused();
});

test('journey wall: one safe link per repository', async ({ page }) => {
  await page.goto('/');
  const cells = page.locator('#wall .cell');
  expect(await cells.count()).toBeGreaterThanOrEqual(50);
  await expect(page.locator('#repo-count')).toHaveText(String(await cells.count()));
  for (const i of [0, 10, 40]) {
    await expect(cells.nth(i)).toHaveAttribute('href', /^https:\/\/github\.com\/Mpoelesiamon\//);
    await expect(cells.nth(i)).toHaveAttribute('rel', /noopener/);
  }
});

test('command menu opens with Ctrl+K, filters, and opens a project', async ({ page }, testInfo) => {
  desktopOnly(testInfo);
  await page.goto('/');
  await page.keyboard.press('Control+k');
  const pal = page.locator('#palette');
  await expect(pal).toBeVisible();
  await page.keyboard.type('vloer');
  await expect(pal.locator('[role=option]')).toHaveCount(1);
  await page.keyboard.press('Enter');
  await expect(page.locator('#case').getByRole('heading', { name: 'VloerBot' })).toBeVisible();
});

test('theme toggle switches and persists across reloads', async ({ page }) => {
  await page.goto('/');
  const before = await page.locator('html').getAttribute('data-theme');
  await page.locator('#theme-toggle').click();
  const after = await page.locator('html').getAttribute('data-theme');
  expect(after).not.toBe(before);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', after);
});

test('portrait "view source" toggles the full ASCII view', async ({ page }) => {
  await page.goto('/');
  const btn = page.locator('#lens-toggle');
  await btn.click();
  await expect(btn).toHaveAttribute('aria-pressed', 'true');
  await btn.click();
  await expect(btn).toHaveAttribute('aria-pressed', 'false');
});

test('contact: both emails have a clipboard icon, and there is no separate copy button', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
  await page.goto('/');
  await expect(page.getByRole('button', { name: /^Copy email$/ })).toHaveCount(0);
  const rows = page.locator('.email-row');
  await expect(rows).toHaveCount(2);
  await expect(rows.nth(0).locator('a')).toHaveAttribute('href', 'mailto:lessy@prospergenics.com');
  await expect(rows.nth(1).locator('a')).toHaveAttribute('href', 'mailto:mpoelessy839@gmail.com');
  await rows.nth(0).locator('.copy-btn').click();
  await expect(page.locator('#toast')).toContainText('lessy@prospergenics.com');
  await expect(rows.nth(0).locator('.copy-btn')).toHaveClass(/done/);
  await expect(page.locator('#clock')).toHaveText(/^\d{2}:\d{2}$/);
});

test('contact: socials row has all eight links and they open safely', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('#socials-list a');
  await expect(links).toHaveCount(8);
  for (const name of ['LinkedIn', 'GitHub', 'Instagram', 'X', 'TikTok', 'Facebook', 'Reddit', 'WhatsApp']) {
    const l = page.locator('#socials-list a', { hasText: new RegExp(`^${name}$`) });
    await expect(l).toHaveAttribute('target', '_blank');
    await expect(l).toHaveAttribute('rel', /noopener/);
  }
  await expect(page.locator('#socials-list a', { hasText: 'WhatsApp' })).toHaveAttribute('href', 'https://wa.me/254793942458');
});

test('about: team and Martien link to the right places', async ({ page }) => {
  await page.goto('/');
  const about = page.locator('#about');
  await expect(about.getByRole('link', { name: 'Martien de Jong' })).toHaveAttribute('href', 'https://martiendejong.nl/');
  for (const [name, slug] of [['Martien', 'martien-de-jong'], ['Frank', 'frank'], ['Diko', 'diko'], ['Sandra', 'sandra']]) {
    const chip = about.locator('.team-chip', { hasText: name });
    await expect(chip).toHaveAttribute('href', `https://prospergenics.com/members/${slug}/`);
    await expect(chip).toHaveAttribute('rel', /noopener/);
  }
});

test('case notes: "Ask about this" is a working mail link and leaves the address behind', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
  await page.goto('/');
  await page.locator('.tile[data-project="vloer"]').click();
  const ask = page.locator('#case').getByRole('link', { name: 'Ask about this' });
  await expect(ask).toHaveAttribute('href', /^mailto:mpoelessy839@gmail\.com\?subject=/);
  await ask.evaluate(el => el.addEventListener('click', e => e.preventDefault()));   // stay on the page in the test
  await ask.click();
  await expect(page.locator('#toast')).toContainText('Email address copied');
});

test('index: every project card has an image, real cover or designed fallback', async ({ page }) => {
  await page.goto('/');
  const tiles = page.locator('.tile');
  const total = await tiles.count();
  expect(await page.locator('.tile-thumb').count()).toBe(total);
  expect(await page.locator('.tile-thumb img').count()).toBeGreaterThanOrEqual(10);
});

test('no horizontal scrolling at any viewport', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(800);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('every image on the page loads', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => { document.querySelectorAll('img[loading=lazy]').forEach(i => { i.loading = 'eager'; }); });
  await expect.poll(() => page.evaluate(() => [...document.images].filter(i => !i.complete).length), { timeout: 15000 }).toBe(0);
  const broken = await page.evaluate(() => [...document.images].filter(i => i.naturalWidth === 0).map(i => i.src));
  expect(broken).toEqual([]);
});
