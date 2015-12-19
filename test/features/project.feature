@libraries=projects, error
Feature: Project
As a client executive
I want the ability to create, update and delete projects
So that I can fulfill my contracts with clients

Scenario: Projects can be created
    When I create a project called "Customer Portal", identified by "plbk-customer-portal"

    And I ask for the project plbk-customer-portal

    Then I should get the "Customer Portal" project

Scenario: Projects can be updated
    Given a project called "Customer Portal", identified by "plbk-customer-portal"

    When I change the name of the project plbk-customer-portal to "People's Bank - Customer Portal"

    And I ask for the project plbk-customer-portal

    Then I should get the "People's Bank - Customer Portal" project

Scenario: Projects can be deleted
    Given a project called "Customer Portal", identified by "plbk-customer-portal"

    When I remove the project plbk-customer-portal

    And I ask for the project plbk-customer-portal

    Then a 404 Not Found error should be returned