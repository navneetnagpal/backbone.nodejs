@libraries=assignments, projects, people, error
Feature: Assignments
As a client executive
I want the ability to create, update and delete assignments
So that I can fulfill my contracts with clients

Background:
    Given the following people
        -------------------------------------------------------
        | username | firstName | lastName | metro | title     |
        | kbunnell | Kelsey    | Bunnell  | BOS   | sras.staf |
        | kmurphy  | Kevin     | Murphy   | BOS   | mgr.pm    |
        -------------------------------------------------------

    And the following projects
        ------------------------------------------
        | id                   | name            |
        | plbk-customer-portal | Customer Portal |
        ------------------------------------------

    And the following assignments
        ------------------------------------------------------------------------------------------
        | id       | projId               | startDate  | endDate    | status | metro | title     |
        | pm-01    | plbk-customer-portal | 2016-01-04 | 2016-01-29 | OPEN   | BOS   | mgr.pm    |
        ------------------------------------------------------------------------------------------

Scenario: Assignments can be created
    When I create the following assignment
        ------------------------------------------------------------------------------------------
        | id       | projId               | startDate  | endDate    | status | metro | title     |
        | dev-01   | plbk-customer-portal | 2016-01-04 | 2016-01-29 | OPEN   | BOS   | srasl2.id |
        ------------------------------------------------------------------------------------------

    And I ask for the assignment plbk-customer-portal:dev-01

    Then I should get the following assignment
        ------------------------------------------------------------------------------------------
        | id       | projId               | startDate  | endDate    | status | metro | title     |
        | dev-01   | plbk-customer-portal | 2016-01-04 | 2016-01-29 | OPEN   | BOS   | srasl2.id |
        ------------------------------------------------------------------------------------------

Scenario: Assignments can be updated
    Given the following assignment
        ------------------------------------------------------------------------------------------
        | id       | projId               | startDate  | endDate    | status | metro | title     |
        | dev-01   | plbk-customer-portal | 2016-01-04 | 2016-01-29 | OPEN   | BOS   | srasl2.id |
        ------------------------------------------------------------------------------------------

    When I change the assignment plbk-customer-portal:dev-01 as follows
        ------------------------------------------------------------------------------------------
        | id       | projId               | startDate  | endDate    | status | metro | title     |
        | arch-01  | plbk-customer-portal | 2016-01-04 | 2016-01-29 | OPEN   | BOS   | mgr.id    |
        ------------------------------------------------------------------------------------------

    And I ask for the assignment plbk-customer-portal:arch-01

    Then I should get the following assignment
        ------------------------------------------------------------------------------------------
        | id       | projId               | startDate  | endDate    | status | metro | title     |
        | arch-01  | plbk-customer-portal | 2016-01-04 | 2016-01-29 | OPEN   | BOS   | mgr.id    |
        ------------------------------------------------------------------------------------------

Scenario: A staffing owner can be assigned to an assignment
    When I assign kbunnell as the staffing owner for assignment plbk-customer-portal:pm-01

    And I ask for the assignment plbk-customer-portal:pm-01

    Then the assignment's staffing owner should be kbunnell

Scenario: A person can be assigned to an assignment
    When I assign kmurphy to the assignment plbk-customer-portal:pm-01

    And I ask for the assignment plbk-customer-portal:pm-01

    Then the assignment's assignee should be kmurphy

    And the assignment's status should be CFRM
