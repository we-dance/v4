  Feature: Courses Page
    As a user
    I want to visit the courses page
    So that I can see available courses

    Scenario: Visit courses page
      When I visit the courses page
      Then I should see the list of dance courses

    Scenario: User journey Yarima class
      When I visit the courses page
      And I click on "Salsa Ladies Styling" course
      Then I should be redirected to the course details page
      When I click on "View Pricing Plans" button
      Then I should see a dialog with title "Choose Your Plan"
      When I click on "Regular Plan" button
