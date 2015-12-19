@libraries=projects, people, assignments, staffing-process, error
Feature: Staffing process
As a staffing owner
I want the ability to find my assignments and match people to assignments.
So that I can staff people

Background:
    Given the following people
        -------------------------------------------------------
        | username | firstName | lastName | metro | title     |
        | kbunnell | Kelsey    | Bunnell  | BOS   | sras.staf |
        | mfeher   | Maria     | Feher    | BOS   | sras.staf |
        | kmurphy  | Kevin     | Murphy   | BOS   | mgr.pm    |
        | edana    | Evan      | Dana     | BOS   | srasl2.id |
        | dthomas  | David     | Thomas   | BOS   | srasl2.id |
        | jsmith   | John      | Smith    | NYC   | srasl2.id |
        | skumar   | Sanjay    | Kumar    | GGN   | srasl2.id |
        -------------------------------------------------------

    And the following projects
        ------------------------------------------
        | id                   | name            |
        | plbk-customer-portal | Customer Portal |
        | glsc-fund-finder     | Fund Finder     |
        ------------------------------------------

    And the following assignments
        ---------------------------------------------------------------------------------------------------------------------
        | id       | projId               | startDate  | endDate    | status | metro | title     | owner         | assignee |
        | pm-01    | plbk-customer-portal | 2016-01-04 | 2016-01-29 | CFRM   | BOS   | mgr.pm    | kbunnell      | kmurphy  |
        | dsgn-01  | plbk-customer-portal | 2016-01-11 | 2016-01-29 | OPEN   | BOS   | dir.cr    | kbunnell      |          |
        | dev-01   | plbk-customer-portal | 2016-01-18 | 2016-01-29 | OPEN   | BOS   | srasl2.id | kbunnell      |          |
        | dev-01   | glsc-fund-finder     | 2016-01-11 | 2016-02-05 | CFRM   | NYC   | srasl2.id | mfeher        | jsmith   |
        | dev-02   | glsc-fund-finder     | 2016-02-05 | 2016-02-19 | CFRM   | BOS   | srasl2.id | mfeher        | edana    |
        ---------------------------------------------------------------------------------------------------------------------

Scenario: Staffing owners can find their assignments by start date
    When staffing owner kbunnell asks for her assignments starting between 2016-01-04 and 2016-01-11

    Then the following assignments are shown
        ---------------------------------------------------------------------------------------------------------------------
        | id       | projId               | startDate  | endDate    | status | metro | title     | owner         | assignee |
        | pm-01    | plbk-customer-portal | 2016-01-04 | 2016-01-29 | CFRM   | BOS   | mgr.pm    | kbunnell      | kmurphy  |
        | dsgn-01  | plbk-customer-portal | 2016-01-11 | 2016-01-29 | OPEN   | BOS   | dir.cr    | kbunnell      |          |
        ---------------------------------------------------------------------------------------------------------------------

Scenario: Staffing owners can match people to assignments
    When a staffing owner asks for people matching assignment plbk-customer-portal:dev-01

    Then the following people should be shown
        -------
        |username   |
        |edana      |
        |dthomas    |
        |skumar     |
        -------
