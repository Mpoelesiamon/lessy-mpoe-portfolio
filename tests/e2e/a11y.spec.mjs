import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Reduced motion keeps every element in its final state while axe measures contrast.
test.use({ reducedMotion: 'reduce' });
test.setTimeout(120_000);   // axe walks a long page; it is slow when several browsers run at once

for (const theme of ['light', 'dark']) {
  test(`accessibility (WCAG 2 A and AA): ${theme} theme`, async ({ page }) => {
    await page.addInitScript(t => { try { sessionStorage.setItem('lessy-booted', '1'); localStorage.setItem('lessy-theme', t); } catch {} }, theme);
    await page.goto('/');
    await page.waitForTimeout(1000);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const summary = results.violations.map(v => `${v.id} (${v.impact}): ${v.nodes.length} node(s), e.g. ${v.nodes[0].target.join(' ')}`);
    expect(summary, summary.join('\n')).toEqual([]);
  });
}

test('keyboard: skip link is the first tab stop and works', async ({ page }) => {
  await page.addInitScript(() => { try { sessionStorage.setItem('lessy-booted', '1'); } catch {} });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});
