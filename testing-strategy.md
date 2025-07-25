# Testing Strategy for Sales Report App

This document outlines the testing approach for the Sales Report App to ensure quality, reliability, and proper functionality across all components.

## Testing Levels

### 1. Unit Testing

Unit tests focus on testing individual components and functions in isolation.

#### Frontend Unit Tests

- **Components Testing**
  - Test each React component in isolation
  - Verify component rendering
  - Test component state changes
  - Validate props handling
  - Test event handlers

- **Hooks Testing**
  - Test custom hooks functionality
  - Verify state management
  - Test side effects

- **Context Testing**
  - Test context providers
  - Verify context consumers receive correct values
  - Test context state updates

- **Utility Functions**
  - Test helper functions
  - Validate data transformations
  - Test validation functions

#### Backend Unit Tests

- **Controllers Testing**
  - Test controller functions in isolation
  - Mock request and response objects
  - Verify correct handling of different scenarios

- **Service Layer Testing**
  - Test business logic functions
  - Verify data processing
  - Test error handling

- **Middleware Testing**
  - Test authentication middleware
  - Verify validation middleware
  - Test error handling middleware

### 2. Integration Testing

Integration tests verify that different parts of the application work together correctly.

#### Frontend Integration Tests

- **Form Flow Testing**
  - Test complete form submission flows
  - Verify multi-step form navigation
  - Test form validation across steps

- **API Integration Testing**
  - Test API service functions with mock server
  - Verify correct data formatting for requests
  - Test handling of different response scenarios

#### Backend Integration Tests

- **API Endpoint Testing**
  - Test complete API endpoints
  - Verify request validation
  - Test database interactions
  - Verify response formatting

- **Database Integration Testing**
  - Test Supabase client interactions
  - Verify query construction
  - Test transaction handling

### 3. End-to-End Testing

E2E tests verify the complete application workflow from the user's perspective.

- **User Flows Testing**
  - Test complete user journeys
  - Verify authentication flow
  - Test shop visit recording flow
  - Verify contact management flow

- **Cross-Browser Testing**
  - Test on Chrome, Firefox, Safari, Edge
  - Verify responsive design on different screen sizes
  - Test on mobile browsers

## Testing Tools and Libraries

### Frontend Testing

- **Jest**: JavaScript testing framework
- **React Testing Library**: For testing React components
- **MSW (Mock Service Worker)**: For mocking API requests
- **Cypress**: For end-to-end testing

### Backend Testing

- **Jest**: JavaScript testing framework
- **Supertest**: For HTTP assertions
- **Sinon**: For mocks, stubs, and spies
- **Nock**: For HTTP request mocking

## Test Coverage Goals

- Unit Tests: 80%+ coverage
- Integration Tests: Key workflows covered
- E2E Tests: Critical user journeys covered

## Testing Approach by Feature

### 1. Authentication

#### Unit Tests
- Test login form validation
- Test authentication context
- Test authentication API endpoint

#### Integration Tests
- Test complete login flow
- Verify authentication persistence

#### E2E Tests
- Test login with valid credentials
- Test login with invalid credentials

### 2. Chat Interface

#### Unit Tests
- Test message components
- Test chat context
- Test input handling

#### Integration Tests
- Test message flow
- Verify form state management

#### E2E Tests
- Test complete conversation flow

### 3. Shop Autocomplete

#### Unit Tests
- Test debounce functionality
- Test autocomplete component
- Test customer search API endpoint

#### Integration Tests
- Test search and selection flow
- Verify API integration

#### E2E Tests
- Test typing and selecting from suggestions

### 4. Geolocation Capture

#### Unit Tests
- Test geolocation hook
- Test location capture component
- Test location storage in form state

#### Integration Tests
- Test location capture flow
- Verify location data formatting

#### E2E Tests
- Test location permission handling
- Verify location capture UI

### 5. Customer Contact Management

#### Unit Tests
- Test contact form components
- Test contact API endpoints
- Test phone number validation

#### Integration Tests
- Test complete contact creation flow
- Verify phone number logic

#### E2E Tests
- Test adding contact information
- Verify phone number handling

## Test Data Management

### Test Database
- Use a separate test database in Supabase
- Reset database state before test runs
- Seed with known test data

### Mock Data
- Create mock data factories for each entity
- Use consistent test data across test suites
- Create realistic test scenarios

## Continuous Integration

- Run unit and integration tests on every pull request
- Run E2E tests on main branch merges
- Enforce minimum test coverage requirements
- Generate test reports for review

## Manual Testing Checklist

### Usability Testing
- Verify form flow is intuitive
- Test on different devices and screen sizes
- Verify error messages are clear and helpful

### Performance Testing
- Test application load time
- Verify form submission performance
- Test autocomplete responsiveness

### Accessibility Testing
- Verify keyboard navigation
- Test screen reader compatibility
- Check color contrast compliance

## Bug Tracking and Resolution

1. Document bugs with clear reproduction steps
2. Categorize by severity and priority
3. Create regression tests for fixed bugs
4. Verify fixes across all affected areas

## Example Test Cases

### Unit Test Example (React Component)

```javascript
// Testing the ShopAutocomplete component
describe('ShopAutocomplete', () => {
  it('should show suggestions when typing 3+ characters', async () => {
    // Mock the search service
    jest.spyOn(customerService, 'searchCustomers').mockResolvedValue([
      { code: 1, name: 'ABC Store' },
      { code: 2, name: 'ABC Supermarket' }
    ]);
    
    render(<ShopAutocomplete />);
    
    // Type in the search box
    const input = screen.getByPlaceholderText('Enter shop name');
    fireEvent.change(input, { target: { value: 'ABC' } });
    
    // Wait for suggestions to appear
    const suggestions = await screen.findAllByRole('listitem');
    expect(suggestions).toHaveLength(2);
    expect(suggestions[0]).toHaveTextContent('ABC Store');
    expect(suggestions[1]).toHaveTextContent('ABC Supermarket');
  });
});
```

### Integration Test Example (API Endpoint)

```javascript
// Testing the customer search API
describe('GET /api/customers/search', () => {
  it('should return matching customers', async () => {
    // Setup test data in database
    await setupTestCustomers();
    
    const response = await request(app)
      .get('/api/customers/search?query=ABC')
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.customers).toHaveLength(2);
    expect(response.body.customers[0]).toHaveProperty('code');
    expect(response.body.customers[0]).toHaveProperty('name');
  });
  
  it('should return 400 if query is less than 3 characters', async () => {
    const response = await request(app)
      .get('/api/customers/search?query=AB')
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
```

### E2E Test Example (Cypress)

```javascript
// Testing the complete shop visit recording flow
describe('Shop Visit Recording', () => {
  beforeEach(() => {
    // Login before each test
    cy.login('EMP123');
  });
  
  it('should allow recording a complete shop visit', () => {
    // Start the form
    cy.visit('/');
    
    // Enter shop name
    cy.get('input[placeholder*="shop name"]').type('ABC');
    cy.contains('ABC Store').click();
    
    // Enter shop rating
    cy.contains('How would you rate this shop').should('be.visible');
    cy.get('button').contains('4').click();
    
    // Answer line added question
    cy.contains('Did you add a new product line').should('be.visible');
    cy.get('button').contains('Yes').click();
    
    // Enter meeting comments
    cy.contains('Please add any comments').should('be.visible');
    cy.get('input[placeholder*="comments"]').type('Great meeting with the owner');
    cy.get('button').contains('Send').click();
    
    // Mock location capture (since Cypress can't access real geolocation)
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
        return cb({
          coords: {
            latitude: 13.756331,
            longitude: 100.501762
          }
        });
      });
    });
    cy.get('button').contains('Share My Location').click();
    
    // Verify location captured message
    cy.contains('Location captured successfully').should('be.visible');
    
    // Complete contact information
    cy.contains('Did you speak with a specific person').should('be.visible');
    cy.get('button').contains('Yes').click();
    
    cy.contains('What is their name').should('be.visible');
    cy.get('input').type('John Smith');
    cy.get('button').contains('Send').click();
    
    cy.contains('What is their position').should('be.visible');
    cy.get('input').type('Store Manager');
    cy.get('button').contains('Send').click();
    
    cy.contains('How would you rate this contact').should('be.visible');
    cy.get('button').contains('5').click();
    
    cy.contains('What is their phone number').should('be.visible');
    cy.get('input').type('0812345678');
    cy.get('button').contains('Send').click();
    
    // Submit the report
    cy.contains('Here\'s a summary of your report').should('be.visible');
    cy.get('button').contains('Submit Report').click();
    
    // Verify success message
    cy.contains('Your report has been successfully submitted').should('be.visible');
  });
});
```

## Testing Schedule

1. **Development Phase**
   - Write unit tests alongside feature development
   - Implement integration tests for completed features
   - Regular test runs during development

2. **Pre-Release Phase**
   - Complete E2E test implementation
   - Full regression testing
   - Cross-browser compatibility testing
   - Performance testing

3. **Maintenance Phase**
   - Regression testing for bug fixes
   - Test updates for new features
   - Periodic full test suite runs

## Conclusion

This testing strategy provides a comprehensive approach to ensure the Sales Report App functions correctly, delivers a good user experience, and maintains data integrity. By implementing tests at all levels (unit, integration, and E2E), we can catch issues early and ensure a high-quality application.