# SDET Automation Project

An end-to-end UI test automation framework built with **Playwright** and **TypeScript**, testing [SauceDemo](https://www.saucedemo.com/) — a public e-commerce demo application.

This project was built to strengthen hands-on SDET/QA automation skills: writing resilient locators, designing a maintainable Page Object Model, and running tests in CI.

## Tech Stack

- [Playwright](https://playwright.dev/) — browser automation
- TypeScript
- GitHub Actions — CI pipeline

## Project Structure

```text
sdet-automation-project/
├── tests/
│   └── login.spec.ts        # Test suite (login, inventory, cart, checkout, logout)
├── pages/
│   ├── BasePage.ts          # Shared base class for all page objects
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── playwright.config.ts
├── package.json
└── .github/workflows/       # CI pipeline (GitHub Actions)
```

## Design Approach

- **Page Object Model (POM):** each page/component of the app (login, inventory, cart, checkout) has its own class encapsulating its locators and actions. Tests read as user flows, not raw DOM interactions.
- **BasePage:** shared `page` property and common behavior are inherited by every page object, avoiding duplication.
- **Scoped locators:** locators are always scoped to a specific component (e.g. a single product card) rather than matching ambiguous elements across the page — avoids clicking the wrong "Add to cart" button when multiple products share the same button text.
- **Test isolation:** each test relies on Playwright's built-in per-test browser context rather than manual cleanup, so tests can run in any order without shared state.
- **Meaningful assertions:** each test asserts the specific outcome it claims to verify (e.g. cart badge count, not just "no errors thrown").

## Test Coverage

| Area | Scenarios |
|---|---|
| Login | Valid login, invalid password, empty username, empty password |
| Inventory | All products visible on page load |
| Cart | Add single product, add multiple products, remove product |
| Checkout | Full checkout flow with order confirmation |
| Logout | Successful logout |

## Running Tests Locally

```bash
npm install
npx playwright install
npx playwright test
```

Run in headed mode (see the browser):
```bash
npx playwright test --headed
```

View the HTML report after a run:
```bash
npx playwright show-report
```

## CI

Tests run automatically via GitHub Actions on every push. See the [Actions tab](../../actions) for run history.

## Roadmap

- [ ] Custom fixtures for authenticated sessions
- [ ] API testing layer
- [ ] Database validation layer
- [ ] Smoke vs. regression test tagging in CI
