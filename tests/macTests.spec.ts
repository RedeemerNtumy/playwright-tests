import { test, expect } from '@playwright/test';
import { MacPage } from '../pages/macpage';

test.describe('Apple Mac Tests', () => {
    test.beforeEach(async ({ page }) => {
        const macPage = new MacPage(page);
        await macPage.navigate();
    });

    test('Buy MacBook', async ({ page }) => {
        const macPage = new MacPage(page);
        await macPage.buyMacbook();
    });
});
