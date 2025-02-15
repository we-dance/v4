Feature: Authentication and Authorization
  As a user
  I want to manage my account access
  So that I can securely use the platform features

  Scenario: Login
    Given I am on the login page
    When I enter my email "user@example.com"
    And I enter my password "password123"
    And I submit a form
    Then I should see my profile menu
