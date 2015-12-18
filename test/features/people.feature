@libraries=people, error
Feature: Peoples
In order to manage my people,
as a Hiring Manager,
I want the ability to create, update and delete peoples.

Scenario: People Creation
    When I create an people called Josh

    And I ask for the people

    Then I should get the people called Josh

Scenario: Account Update
    Given an account called BofA Checking

    When I change the account name to Bank of America Checking

    And I ask for the account

    Then I should get the account called Bank of America Checking


Scenario: Account Deletion
    Given an account called BofA Checking

    When I delete the account

    And I ask for the account

    Then a 404 Not Found error should be returned
