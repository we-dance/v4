Feature: Account Settings Management
  As a registered user
  I want to manage my account settings
  So that I can control my personal information and security preferences

  Background:
    Given I am logged in as a registered user
    And I am on the settings page

  Scenario: Update email address
    When I navigate to the "Account" settings tab
    And I enter a new email address "new-email@example.com"
    And I click "Save Changes"
    Then I should see a success notification "Account updated"
    And my email should be updated to "new-email@example.com"

  Scenario: Update password successfully
    When I navigate to the "Account" settings tab
    And I enter my current password "CurrentPassword123"
    And I enter a new password "NewPassword456" that meets the requirements
    And I confirm the new password "NewPassword456"
    And I click "Update Password"
    Then I should see a success notification "Password updated"
    And I should be able to log in with my new password

  Scenario: Password update validation
    When I navigate to the "Account" settings tab
    And I enter a new password that doesn't meet the requirements
    Then I should see visual indicators showing which requirements are not met
    And the "Update Password" button should be disabled

  Scenario: Delete account
    When I navigate to the "Account" settings tab
    And I click "Delete Account"
    Then I should see a confirmation dialog
    When I type "delete my account" in the confirmation field
    And I click the confirmation "Delete Account" button
    Then I should be logged out
    And I should be redirected to the home page
    And I should see a notification "Account deleted"
    
  Scenario: Password visibility toggle
    When I navigate to the "Account" settings tab
    And I enter my current password "CurrentPassword123"
    Then my password should be masked
    When I click the visibility toggle button
    Then my password should be visible as "CurrentPassword123"
    When I click the visibility toggle button again
    Then my password should be masked

  Scenario: Password strength indicator
    When I navigate to the "Account" settings tab
    And I enter a weak password "pass"
    Then I should see a "weak" strength indicator
    When I enter a medium strength password "password12345"
    Then I should see a "medium" strength indicator
    When I enter a strong password "this is a very memorable and long passphrase"
    Then I should see a "strong" strength indicator
    When I enter a strong password with special characters "P@s$w0rd!"
    Then I should see a "strong" strength indicator 