import { Page, expect } from '@playwright/test';

class MacPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.apple.com//');
    }

    async buyMacbook() {
        await this.page.getByRole("button").nth(11).click();
        await this.page.getByPlaceholder("Search apple.com").fill("Macbook");
        await this.page.getByPlaceholder("Search apple.com").press('Enter');
        await this.page.reload();
        await this.page.getByText("Macbook Pro").nth(1).click();
        await this.page.locator('text="Buy"').nth(2).scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.page.locator('text="Buy"').nth(2).click();
        await this.page.locator('button[data-autom="filterButton-16inch"]').click();
        await expect(this.page.getByText("Choose your new MacBook Pro.", {exact:true})).toBeVisible();
    }
}

export { MacPage };
