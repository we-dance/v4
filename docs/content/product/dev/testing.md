# Testing Strategy

## Overview

We follow a comprehensive testing pyramid approach for the WeDance platform:

1. **Unit/Integration Tests** (Vitest)

   - Fast execution
   - Component isolation
   - Business logic validation
   - State management

2. **End-to-End Tests** (Cypress + Cucumber)
   - User behavior validation
   - Full system integration
   - Real browser testing

## Technology Stack

### 1. Vitest for Unit/Integration Testing

```typescript
// components/calendar/__tests__/CalendarView.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CalendarView from '../CalendarView.vue'

describe('CalendarView', () => {
  it('renders month view by default', () => {
    const wrapper = mount(CalendarView)
    expect(wrapper.find('[data-test="month-view"]').exists()).toBe(true)
  })

  it('filters events by style', async () => {
    const wrapper = mount(CalendarView, {
      props: {
        events: [
          { id: 1, style: 'Salsa Cubana' },
          { id: 2, style: 'Bachata' },
        ],
      },
    })

    await wrapper.vm.filterByStyle('Salsa Cubana')
    const visibleEvents = wrapper.findAll('[data-test="calendar-event"]')
    expect(visibleEvents).toHaveLength(1)
  })

  it('handles recurring events', () => {
    const event = {
      title: 'Weekly Salsa',
      recurrence: {
        frequency: 'weekly',
        day: 'friday',
      },
    }
    const wrapper = mount(CalendarView, {
      props: { events: [event] },
    })

    const recurringEvents = wrapper.vm.expandRecurringEvent(event)
    expect(recurringEvents).toHaveLength(4) // Next 4 occurrences
  })
})
```

### 2. Cypress + Cucumber for E2E Testing

We use `cypress-cucumber-preprocessor` to combine:

1. **Cucumber's BDD Features**

   - Human-readable specifications
   - Business-focused scenarios
   - Shared understanding
   - Living documentation

2. **Cypress's Testing Power**
   - Real browser testing
   - Time-travel debugging
   - Network stubbing
   - Visual testing tools
   - CI/CD integration

Example integration:

```javascript
// cypress/integration/calendar/view.feature
Feature: Calendar View for Events
  As a Dancer
  I want to view events in a calendar format
  So that I can better plan my dance activities

  Background:
    Given I am on the events calendar page
    And there are upcoming dance events

  Scenario: View events in month format
    When I view the calendar in month format
    Then I should see all events for the current month

// cypress/integration/calendar/view/steps.js
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am on the events calendar page', () => {
  cy.visit('/events/calendar');
});

When('I view the calendar in month format', () => {
  cy.get('[data-test="month-view"]').click();
});

Then('I should see all events for the current month', () => {
  cy.get('[data-test="calendar-event"]').should('be.visible');
  cy.get('[data-test="calendar-event"]').should('have.length.gt', 0);
});

// Example of reusable step with parameters
When('I select {string} from the style filter', (style) => {
  cy.get('[data-test="style-filter"]').click();
  cy.get(`[data-test="style-option-${style}"]`).click();
});
```

### Key Benefits of Integration

1. **Readable Tests**

   - Business stakeholders can review scenarios
   - Developers can implement precise tests
   - QA can execute and maintain tests

2. **Development Workflow**

   - Write feature file (Product/Business)
   - Implement step definitions (Development)
   - Execute tests (QA/Development)
   - Review results (All stakeholders)

3. **Maintenance**
   - Centralized step definitions
   - Reusable test components
   - Clear failure reporting
   - Visual test debugging

## Test Structure

Our tests are organized in the `features/` directory with the following structure:

```
features/
├── calendar/
│   ├── view.feature     # Calendar visualization
│   ├── create.feature   # Event creation
│   └── browse.feature   # Public event browsing
└── ...
```

## Feature Files

Each feature file follows the Gherkin syntax and includes:

1. Feature description
2. Background setup
3. Multiple scenarios
4. Data tables for complex inputs

### Example: Calendar View

```gherkin
Feature: Calendar View for Events
  As a Dancer
  I want to view events in a calendar format
  So that I can better plan my dance activities

  Background:
    Given I am on the events calendar page
    And there are upcoming dance events

  Scenario: View events in month format
    When I view the calendar in month format
    Then I should see all events for the current month
```

## Test Categories

### 1. Calendar View Features

- Month/Week/Day view switching
- Event display in calendar
- Navigation between time periods
- Style-based filtering
- Mobile responsiveness

### 2. Event Creation Features

- Basic event creation
- Recurring events
- Image uploads
- Draft saving
- Form validation
- Custom registration fields

### 3. Public Browsing Features

- Event listing
- Multi-criteria filtering
- Search functionality
- Mobile browsing
- Preference saving

## Running Tests

```bash
# Run unit/integration tests
npm run test:unit

# Run unit tests with coverage
npm run test:unit:coverage

# Run E2E tests
npm run test:e2e

# Run specific feature
npm run test:e2e -- --spec features/calendar/view.feature

# Run all tests
npm run test
```

## Best Practices

1. **Unit Tests (Vitest)**

   - Test one thing at a time
   - Use meaningful test descriptions
   - Mock external dependencies
   - Keep tests fast and isolated

2. **Integration Tests (Vitest)**

   - Focus on component interactions
   - Test Vuex store integration
   - Validate API calls
   - Test form submissions

3. **E2E Tests (Cypress + Cucumber)**

   - Focus on critical user paths
   - Write readable scenarios
   - Reuse step definitions
   - Handle test data cleanup

4. **Data Tables**

   - Use for complex input data
   - Keep columns aligned
   - Include header row
   - Use consistent formatting

5. **Step Definitions**

   - Keep steps reusable
   - Use parameter types
   - Handle cleanup in hooks
   - Maintain test isolation

6. **Mobile Testing**
   - Include responsive scenarios
   - Test touch interactions
   - Verify layout changes
   - Check performance

## Continuous Integration

Tests are automatically run:

- On pull requests
- Before deployment
- Nightly on main branch

## Maintenance

1. **Regular Updates**

   - Review scenarios monthly
   - Update for new features
   - Remove obsolete tests
   - Check for flaky tests

2. **Documentation**
   - Keep feature files updated
   - Document new step definitions
   - Maintain test coverage report
   - Update run instructions

## Testing Pyramid Strategy

Our testing approach follows the pyramid model:

1. **Unit Tests (Base Layer)**

   - Test individual components
   - Validate business logic
   - Mock external dependencies
   - Fast execution
   - High coverage

2. **Integration Tests (Middle Layer)**

   - Test component interactions
   - Validate state management
   - Test API integration
   - Database interactions

3. **E2E Tests (Top Layer)**
   - Test complete user flows
   - Real browser testing
   - Full system integration
   - Business requirements validation

### Example Test Distribution

```
70% - Unit Tests (Vitest)
20% - Integration Tests (Vitest)
10% - E2E Tests (Cypress + Cucumber)
```
