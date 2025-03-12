Feature: Auth
  As a user
  I want to register or log in
  so that I can access my account

  Scenario: Register with valid credentials
    When I visit the register page
    And I fill in "username" with a unique username
    And I fill in "email" with a valid email
    And I fill in "password" with a valid password
    And I check the email consent checkbox
    And I click the "Register" button
    Then I should be redirected to the home page
    And I should be logged in
    And I clean up the test environment

  # Scenario: Register with existing username
  #   When I visit the register page
  #   And I fill in "username" with an existing username
  #   And I fill in "email" with a valid email
  #   And I fill in "password" with a valid password
  #   And I check the email consent checkbox
  #   And I click the "Register" button
  #   Then I should see an error message about the username being taken

  # Scenario: Register with invalid email
  #   When I visit the register page
  #   And I fill in "username" with a unique username
  #   And I fill in "email" with an invalid email
  #   And I fill in "password" with a valid password
  #   And I check the email consent checkbox
  #   And I click the "Register" button
  #   Then I should see an error message about the invalid email

  # Scenario: Register with short password
  #   When I visit the register page
  #   And I fill in "username" with a unique username
  #   And I fill in "email" with a valid email
  #   And I fill in "password" with a short password
  #   And I check the email consent checkbox
  #   And I click the "Register" button
  #   Then I should see an error message about the password being too short

  # Scenario: Register without email consent
  #   When I visit the register page
  #   And I fill in "username" with a unique username
  #   And I fill in "email" with a valid email
  #   And I fill in "password" with a valid password
  #   And I click the "Register" button
  #   Then I should see an error message about email consent being required

  # Scenario: Login with valid credentials
  #   Given I am a registered user
  #   When I visit the login page
  #   And I fill in "email" with my email
  #   And I fill in "password" with my password
  #   And I click the "Login" button
  #   Then I should be redirected to the home page
  #   And I should be logged in

  # Scenario: Login with invalid email
  #   When I visit the login page
  #   And I fill in "email" with an invalid email
  #   And I fill in "password" with a valid password
  #   And I click the "Login" button
  #   Then I should see an error message about the invalid email

  # Scenario: Login with incorrect password
  #   Given I am a registered user
  #   When I visit the login page
  #   And I fill in "email" with my email
  #   And I fill in "password" with an incorrect password
  #   And I click the "Login" button
  #   Then I should see an error message about invalid credentials

  # Scenario: Logout
  #   Given I am logged in
  #   When I click on the user menu
  #   And I click the "Sign Out" button
  #   Then I should be logged out
  #   And I should see the login button

  # Scenario: Access protected page when not logged in
  #   When I try to visit a protected page
  #   Then I should be redirected to the login page

  # Scenario: Access protected page when logged in
  #   Given I am logged in
  #   When I visit a protected page
  #   Then I should see the protected page content 
