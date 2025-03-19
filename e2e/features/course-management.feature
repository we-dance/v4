Feature: Course Management
  As a dance instructor
  I want to create and manage courses
  So that I can share my knowledge with students

  Background:
    Given I am logged in as a dance instructor
    and go to /admin/courses
    I see all the courses I created previously
    And I see a button to create a new course with the text "Create Course"
    and link to /admin/courses/new

  Scenario: Create a new course
    When I click to "Create Course" button
    it opens a new page with the title "Create Course" and link to /admin/courses/new
    I see a form with the following fields:
      | Field       | Value                           |
      | Title       | Salsa Fundamentals              |
      | Description | Learn the basics of Cuban Salsa |
      | Price       | 99                              |
    And I upload a course video
    And I click "Create Course" button
    Then I should see "Course created successfully" message
    And I should be redirected to the course details page

  Scenario: Edit an existing course
    Given I have created a course
    When I navigate to my course details page
    And I click "Edit Course" button
    And I update the course title to "Advanced Salsa"
    And I click "Save Changes" button
    Then I should see "Course updated successfully" message
    And I should see the updated title "Advanced Salsa" 