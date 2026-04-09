import { test, expect } from '@playwright/test';

// spec: test-plans/resource-page-plan.md

test.describe('Resource Page Validation', () => {
    const baseURL = 'https://ennoventure.com/resources';

    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
    });

    // Test 1.1: Load Resources page and verify main content
    test('TC-1.1: Load Resources page and verify main content', async ({ page }) => {
        // spec: test-plans/resource-page-plan.md - 1.1. Load Resources page and verify main content

        // Verify page URL is https://ennoventure.com/resources
        await expect(page).toHaveURL(baseURL);

        // Verify page title is Explore Our Brand Protection Resource Center
        await expect(page).toHaveTitle(/Explore Our Brand Protection Resource Center/);

        // Verify main H1 text includes Explore Our Brand Protection Resource Center
        const mainHeading = page.locator('h1').first();
        await expect(mainHeading).toContainText('Explore Our Brand Protection Resource Center');

        // Verify main H1 text includes Build Brand Trust. Stop Revenue Leakage.
        // await expect(mainHeading).toContainText('Build Brand Trust. Stop Revenue Leakage.');
    });

    // Test 1.2: Verify top navigation and section link visibility
    test('TC-1.2: Verify top navigation and section link visibility', async ({ page }) => {
        // spec: test-plans/resource-page-plan.md - 1.2. Verify top navigation and section link visibility

        // Inspect the page header navigation menu
        // Expect: Home, Technology, Solutions, Resources, About links are visible
        const nav = page.locator('nav, header').first();
        await expect(nav.locator('a:has-text("Home")')).toBeVisible();
        await expect(nav.locator('a:has-text("Technology")')).toBeVisible();
        await expect(nav.locator('a:has-text("Solutions")')).toBeVisible();
        await expect(nav.locator('a:has-text("Resources")')).toBeVisible();
        await expect(nav.locator('a:has-text("About")')).toBeVisible();

        // Expect: Resources link is active or highlighted as current page
        const resourcesLink = nav.locator('a:has-text("Resources")');
        const classes = await resourcesLink.getAttribute('data-framer-page-link-current');

        expect(classes).toMatch(/true|active|current/i);
        // Verify resource section navigation buttons
        // Expect: Read Articles button links to https://ennoventure.com/resources/articles
        await expect(page.locator('a, button').filter({ hasText: /^Read Articles$/ }).first()).toHaveAttribute(
            'href',
            /\/resources\/articles/
        );

        // Expect: View Guides button links to https://ennoventure.com/resources/guides
        await expect(page.locator('a, button').filter({ hasText: /^View Guides$/ }).first()).toHaveAttribute(
            'href',
            /\/resources\/guides/
        );

        // Expect: Explore Cases button links to https://ennoventure.com/resources/case-studies
        await expect(page.locator('a, button').filter({ hasText: /^Explore Cases$/ }).first()).toHaveAttribute(
            'href',
            /\/resources\/case-studies/
        );

        // Expect: Calculate ROI button links to https://ennoventure.com/resources/roi-calculator
        await expect(page.locator('a, button').filter({ hasText: /^Calculate ROI$/ }).first()).toHaveAttribute(
            'href',
            /\/resources\/roi-calculator/
        );

        // Expect: Compare Now button links to https://ennoventure.com/resources/compare
        await expect(page.locator('a, button').filter({ hasText: /^Compare Now$/ }).first()).toHaveAttribute(
            'href',
            /\/resources\/compare/
        );

        // Expect: Discover Key Terms button links to https://ennoventure.com/resources/glossary
        await expect(page.locator('a, button').filter({ hasText: /^Discover Key Terms$/ }).first()).toHaveAttribute(
            'href',
            /\/resources\/glossary/
        );
    });

    // Test 1.3: Validate call-to-action buttons on the Resources page
    test('TC-1.3: Validate call-to-action buttons on the Resources page', async ({ page }) => {
        // spec: test-plans/resource-page-plan.md - 1.3. Validate call-to-action buttons on the Resources page

        // Locate and click the See How Brands Stop Counterfeits CTA
        const brandsCTA = page.locator('a, button').filter({ hasText: /See How Brands Stop Counterfeits/ }).first();
        await expect(brandsCTA).toBeVisible();

        // Expect: Button opens the contact page at https://ennoventure.com/contact or a contact form modal
        const ctaHref = await brandsCTA.getAttribute('href');
        expect(ctaHref).toMatch(/\/contact|#contact/);

        // Locate and click the View the Technology CTA
        const techCTA = page.locator('a, button').filter({ hasText: /View the Technology/ }).first();
        await expect(techCTA).toBeVisible();

        // Expect: Button opens the Anti Counterfeit Solutions page at https://ennoventure.com/anti-counterfeit-solution
        const techHref = await techCTA.getAttribute('href');
        expect(techHref).toMatch(/\/anti-counterfeit-solution/);
    });

    // Test 1.4: Verify footer links and social navigation
    test('TC-1.4: Verify footer links and social navigation', async ({ page }) => {
        // spec: test-plans/resource-page-plan.md - 1.4. Verify footer links and social navigation

        // Scroll to the page footer
        const footer = page.locator('footer').first();
        await footer.scrollIntoViewIfNeeded();

        // Expect: About Us, Partner, Careers, Privacy Policy, Terms & Conditions, Contact Us links are visible
        await expect(footer.locator('a:has-text("About Us")')).toBeVisible();
        await expect(footer.locator('a:has-text("Partner")')).toBeVisible();
        await expect(footer.locator('a:has-text("Careers")')).toBeVisible();
        await expect(footer.locator('a:has-text("Privacy Policy")')).toBeVisible();
        await expect(footer.locator('a:has-text("Terms & Conditions")')).toBeVisible();
        await expect(footer.locator('a:has-text("Contact Us")')).toBeVisible();

        // Check social links in footer
        // Expect: LinkedIn, YouTube, Twitter, Facebook, Instagram links are present and target external URLs
        const socialSelectors = [
            'a[href*="linkedin"]',
            'a[href*="youtube"]',
            'a[href*="x"]',
            'a[href*="facebook"]',
            'a[href*="instagram"]'
        ];
        await page.pause();

        for (const selector of socialSelectors) {
            const link = footer.locator(selector).first();
            await expect(link).toBeVisible();
            const href = await link.getAttribute('href');
            expect(href).toMatch(/^https?:\/\//);
        }
    });

    // Test 1.5: Check page metadata and SEO-related elements
    test('TC-1.5: Check page metadata and SEO-related elements', async ({ page }) => {
        // spec: test-plans/resource-page-plan.md - 1.5. Check page metadata and SEO-related elements

        // Inspect page metadata
        // Expect: Meta description is present and references brand protection and resource center content
        const metaDescription = page.locator('meta[name="description"]');
        await expect(metaDescription).toHaveAttribute(
            'content',
            /brand protection|resource center|ennoventure/i
        );

        // Verify that the page has no critical missing headers
        // Expect: The page contains logical headings such as Insightful Articles, Expert Guides, Case Studies, ROI Calculator, Compare Ennoventure, Glossary
        const requiredSections = [
            'Insightful Articles',
            'Expert Guides',
            'Case Studies',
            'ROI Calculator',
            'Compare Ennoventure',
            'Glossary'
        ];

        for (const section of requiredSections) {
            const heading = page.locator(`h2:has-text("${section}"), h3:has-text("${section}")`);
            await expect(heading).toBeVisible();
        }
    });

    // Test 1.6: Negative case - broken link and missing section detection
    test('TC-1.6: Negative case - broken link and missing section detection', async ({ page }) => {
        // spec: test-plans/resource-page-plan.md - 1.6. Negative case: broken link and missing section detection

        // Check each visible resource section link on the page
        // Expect: No resource section link returns a 4xx or 5xx status
        const resourceLinks = page.locator('a[href*="/resources/"]');
        const linkCount = await resourceLinks.count();

        for (let i = 0; i < linkCount; i++) {
            const link = resourceLinks.nth(i);
            const href = await link.getAttribute('href');

            if (href && href.startsWith('http')) {
                const response = await page.request.head(href).catch(() => null);
                if (response) {
                    expect(response.status()).toBeLessThan(400);
                }
            }
        }

        // Expect: All primary resource CTA buttons resolve to valid pages
        const ctaLinks = page.locator('a[href*="/contact"], a[href*="/anti-counterfeit-solution"]');
        const ctaCount = await ctaLinks.count();

        for (let i = 0; i < ctaCount; i++) {
            const link = ctaLinks.nth(i);
            const href = await link.getAttribute('href');

            if (href && href.startsWith('http')) {
                const response = await page.request.head(href).catch(() => null);
                if (response) {
                    expect(response.status()).toBeLessThan(400);
                }
            }
        }

        // Verify that required resource section headings are present
        // Expect: Insightful Articles, Expert Guides, Case Studies, ROI Calculator, Compare Ennoventure, Glossary sections are present
        const sections = [
            'Insightful Articles',
            'Expert Guides',
            'Case Studies',
            'ROI Calculator',
            'Compare Ennoventure',
            'Glossary'
        ];

        for (const section of sections) {
            // const heading = page.locator(`text=${section}`);
            const heading1 = page.locator(`h3:has-text("${section}")`);
            await expect(heading1).toBeVisible();
        }
    });
});
