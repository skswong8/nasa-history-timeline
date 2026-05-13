import { test, expect } from '@playwright/test'

test.describe('Page load', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	test('has title', async ({ page }) => {
		await expect(page).toHaveTitle(/NASA History Timeline/)
	})
})
