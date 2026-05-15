import { test, expect } from '@playwright/test'

test.describe('Era Navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	test('first era button is active on load', async ({ page }) => {
		const button = page.getByRole('button', { name: /1958/i })
		await expect(button.first()).toHaveClass(/timeline-filter__item--active/)
	})

	test('clicking second era updates active button', async ({ page }) => {
		const firstButton = page.locator('.timeline-filter__item').nth(0)
		const secondButton = page.locator('.timeline-filter__item').nth(1)
		await secondButton.click()
		await expect(firstButton).not.toHaveClass(/timeline-filter__item--active/)
		await expect(secondButton).toHaveClass(/timeline-filter__item--active/)
	})

	test('clicking second era updates description', async ({ page }) => {
		const description = page.locator('.timeline-description')
		const oldText = await description.innerText()
		const secondButton = page.locator('.timeline-filter__item').nth(1)
		await secondButton.click()
		await expect(description).not.toHaveText(oldText)
		await page.waitForTimeout(200)
		await expect(description).toHaveText(/Post-Apollo/)
	})

	test('clicking second era updates cards', async ({ page }) => {
		const card = page.locator('.timeline-card').first()
		const oldTitle = await card.getByRole('heading', { level: 2 }).innerText()
		const secondButton = page.locator('.timeline-filter__item').nth(1)
		await secondButton.click()
		await expect(card).not.toHaveText(oldTitle)
		await expect(card).toHaveText(/Mariner 9 Mars Orbiter/)
	})

	test('all five era buttons are present', async ({ page }) => {
		const buttons = page.locator('.timeline-filter__item')
		await expect(buttons).toHaveCount(5)
	})
})
