@libraries=people, error
Feature: People
As a recruiter
I want the ability to create, update and delete people
So that staffing owners can assign people to projects

Scenario: People can be created
    When I create the following person
        -------------------------------------------------------
        | username | firstName | lastName | metro | title     |
        | edana    | Evan      | Dana     | BOS   | srasl2.id |
        -------------------------------------------------------

    And I ask for the person edana

    Then I should get the following person
        -------------------------------------------------------
        | username | firstName | lastName | metro | title     |
        | edana    | Evan      | Dana     | BOS   | srasl2.id |
        -------------------------------------------------------

Scenario: People can be updated
    Given the following person
        -------------------------------------------------------
        | username | firstName | lastName | metro | title     |
        | edana    | Evan      | Dana     | BOS   | srasl2.id |
        -------------------------------------------------------

    When I change the person edana as follows
        -------------------------------------------------------
        | username | firstName | lastName | metro | title     |
        | edana    | Evan      | Dana     | NYC   | mgr.id    |
        -------------------------------------------------------

    And I ask for the person edana

    Then I should get the following person
        -------------------------------------------------------
        | username | firstName | lastName | metro | title     |
        | edana    | Evan      | Dana     | NYC   | mgr.id    |
        -------------------------------------------------------
        
Scenario: People can be released from company
     Given the following person
        -------------------------------------------------------
        | username | firstName  | lastName   | metro     | title     |
        | wayne    | Wayne      | Bruce     | NYC       | batman    |
        -------------------------------------------------------

    When I release the person wayne 
    And I ask for the person wayne
    Then I should get the following message
        -------------------------------------
        | message                            |
        | Wayne, Bruce left the company      |
        -------------------------------------
Scenario: People cann't be created with duplicate username
     Given the following person
        -------------------------------------------------------
        | username | firstName  | lastName   | metro     | title     |
        | wayne    | Wayne      | Bruce      | NYC       | batman    |
        -------------------------------------------------------

    When I create the following person
        -------------------------------------------------------
        | username | firstName | lastName | metro | title     |
        | wayne    | Evan      | Dana     | BOS   | srasl2.id |
        -------------------------------------------------------
    Then I should get the following message
        -------------------------------------------------------------------------
        | message                                                               |
        | 'wayne' as username already exists please use another username        |
        -------------------------------------------------------------------------
Scenario: Person existance in syste
    When I ask for the person oliver
 
    Then a 404 Not Found error should be returned
