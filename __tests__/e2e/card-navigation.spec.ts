import { test, expect } from '@playwright/test'

test.describe('Card Navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	test('previous button is disabled on first era', async ({
		page,
		isMobile,
	}) => {
		test.skip(isMobile, 'desktop only')

		const eraButton = page.getByRole('button', { name: /1958/i })
		await expect(eraButton.first()).toHaveClass(/timeline-filter__item--active/)

		const navigationButtons = page.locator('.timeline-navigation__button')
		await expect(navigationButtons.first()).toHaveClass(/hidden/)
	})

	test('clicking next navigates to next era and makes next era active and clicking previous reverts back to the original era', async ({
		page,
		isMobile,
	}) => {
		test.skip(isMobile, 'desktop only')

		const prevNavButton = page.locator('.timeline-navigation__button').nth(0)
		const nextNavButton = page.locator('.timeline-navigation__button').nth(1)
		const prevEraButton = page.locator('.timeline-filter__item').nth(0)
		const nextEraButton = page.locator('.timeline-filter__item').nth(1)

		// Next
		await nextNavButton.click()
		await expect(prevNavButton).not.toHaveClass(/hidden/)
		await expect(prevEraButton).not.toHaveClass(/timeline-filter__item--active/)
		await expect(nextEraButton).toHaveClass(/timeline-filter__item--active/)

		// Previous
		await prevNavButton.click()
		await expect(nextEraButton).not.toHaveClass(/timeline-filter__item--active/)
		await expect(prevEraButton).toHaveClass(/timeline-filter__item--active/)
	})

	test('next button is disabled on last era', async ({ page, isMobile }) => {
		test.skip(isMobile, 'desktop only')

		const nextNavButton = page.locator('.timeline-navigation__button').nth(1)

		const clickCount = 4
		for (let i = 0; i < clickCount; i++) {
			await nextNavButton.click()
		}
		await expect(nextNavButton).toHaveClass(/hidden/)
	})
})
