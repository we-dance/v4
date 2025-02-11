Feature: Groups Page
  As a user
  I want to visit the groups page
  So that I can see dance groups

  Scenario: Visit groups page
    When I visit the groups page
    Then I should see the page title
    And I should see the filter
    And I should see the list of dance groups 
