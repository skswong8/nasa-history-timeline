import { test, expect } from '@playwright/test'

test.describe('Page load', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	test('has title', async ({ page }) => {
		await expect(page).toHaveTitle(/NASA History Timeline/)
	})

	test('has logo', async ({ page }) => {
		const logo = page.getByAltText(/NASA logo/)
		await expect(logo).toBeVisible()
	})

	test('has description', async ({ page }) => {
		const description = page.getByRole('paragraph')
		await expect(description).toBeVisible()
	})

	test('first era is selected by default', async ({ page }) => {
		const firstEraButton = page.getByRole('button', { name: /1958/i })
		await expect(firstEraButton).toHaveClass(/timeline-filter__item--active/)
	})
})
