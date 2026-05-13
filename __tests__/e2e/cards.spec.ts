import { test, expect } from '@playwright/test'

test.describe('Cards', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	test('has card', async ({ page }) => {
		const cards = page.locator('.timeline-card')
		await expect(cards.first()).toBeVisible()
		expect(await cards.count()).toBeGreaterThan(0)
	})

	test('each card has title, year, tag and image', async ({ page }) => {
		const card = page.locator('.timeline-card').first()
		await expect(card.getByRole('heading', { level: 2 })).toBeVisible()
		await expect(card.getByTestId('card-year')).toBeVisible()
		await expect(card.locator('.timeline-card__tag')).toBeVisible()
		await expect(card.getByRole('img')).toBeVisible()
	})

	test('card with link shows learn more button and is external', async ({
		page,
	}) => {
		const cardWithLink = page
			.locator('.timeline-card[data-has-link="true"]')
			.first()
		await expect(cardWithLink).toBeVisible()

		const learnMore = cardWithLink.getByRole('link', { name: /learn more/i })
		await expect(learnMore).toBeVisible()

		const externalLink = page.locator('[data-link-type="external"]').first()
		await expect(externalLink).toHaveAttribute('target', '_blank')

		const opensInNewTab = externalLink.getByText(/opens in a new tab/i)
		await expect(opensInNewTab).toBeAttached()
	})

	test('card without link will not show button', async ({ page }) => {
		const cardWithOutLink = page
			.locator('.timeline-card[data-has-link="false"]')
			.first()
		const learnMore = cardWithOutLink.getByRole('link', { name: /learn more/i })
		await expect(learnMore).not.toBeVisible()
	})
})
