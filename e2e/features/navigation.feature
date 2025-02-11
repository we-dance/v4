Feature: Navigation
  As a user
  I want to navigate through the site
  So that I can access different sections

  Scenario: Navigate to Feed
    When I click on "Feed" link
    Then I should be on the feed page

  Scenario: Navigate to Events
    When I click on "Events" link
    Then I should be on the events page

  Scenario: Navigate to Groups
    When I click on "Groups" link
    Then I should be on the groups page

  Scenario: Navigate to Artists
    When I click on "Artists" link
    Then I should be on the artists page

  Scenario: Navigate to Venues
    When I click on "Venues" link
    Then I should be on the venues page
