# Resource Page Validation Plan

## Application Overview

Validate the Ennoventure Resources page at https://ennoventure.com/resources for content, navigation, links, and key resource entry points.

## Test Scenarios

### 1. Resource Page Validation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Load Resources page and verify main content

**File:** `tests/resource-page-plan.md`

**Steps:**
  1. -
    - expect: Page URL is https://ennoventure.com/resources
    - expect: Page title is Explore Our Brand Protection Resource Center
    - expect: Main H1 text includes Explore Our Brand Protection Resource Center
    - expect: Main H1 text includes Build Brand Trust. Stop Revenue Leakage.

#### 1.2. Verify top navigation and section link visibility

**File:** `tests/resource-page-plan.md`

**Steps:**
  1. Inspect the page header navigation menu
    - expect: Home, Technology, Solutions, Resources, About links are visible
    - expect: Resources link is active or highlighted as current page
  2. Verify resource section navigation buttons
    - expect: Read Articles button links to https://ennoventure.com/resources/articles
    - expect: View Guides button links to https://ennoventure.com/resources/guides
    - expect: Explore Cases button links to https://ennoventure.com/resources/case-studies
    - expect: Calculate ROI button links to https://ennoventure.com/resources/roi-calculator
    - expect: Compare Now button links to https://ennoventure.com/resources/compare
    - expect: Discover Key Terms button links to https://ennoventure.com/resources/glossary

#### 1.3. Validate call-to-action buttons on the Resources page

**File:** `tests/resource-page-plan.md`

**Steps:**
  1. Locate and click the See How Brands Stop Counterfeits CTA
    - expect: Button opens the contact page at https://ennoventure.com/contact or a contact form modal
  2. Locate and click the View the Technology CTA
    - expect: Button opens the Anti Counterfeit Solutions page at https://ennoventure.com/anti-counterfeit-solution

#### 1.4. Verify footer links and social navigation

**File:** `tests/resource-page-plan.md`

**Steps:**
  1. Scroll to the page footer
    - expect: About Us, Partner, Careers, Privacy Policy, Terms & Conditions, Contact Us links are visible
  2. Check social links in footer
    - expect: LinkedIn, YouTube, Twitter, Facebook, Instagram links are present and target external URLs

#### 1.5. Check page metadata and SEO-related elements

**File:** `tests/resource-page-plan.md`

**Steps:**
  1. Inspect page metadata
    - expect: Meta description is present and references brand protection and resource center content
  2. Verify that the page has no critical missing headers
    - expect: The page contains logical headings that describe sections such as Insightful Articles, Expert Guides, Case Studies, ROI Calculator, Compare Ennoventure, Glossary

#### 1.6. Negative case: broken link and missing section detection

**File:** `tests/resource-page-plan.md`

**Steps:**
  1. Check each visible resource section link on the page
    - expect: No resource section link returns a 4xx or 5xx status
    - expect: All primary resource CTA buttons resolve to valid pages
  2. Verify that required resource section headings are present
    - expect: Insightful Articles, Expert Guides, Case Studies, ROI Calculator, Compare Ennoventure, Glossary sections are present on the page
