Feature: Angular practice form
  Scenario: Submit valid practice details
    Given I open the Angular practice form
    When I submit valid practice details
    Then I should see the form submission success message