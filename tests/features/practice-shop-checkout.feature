Feature: Practice shop checkout
  Scenario: Purchase Blackberry from the practice shop
    Given I log in to the practice shop
    When I view the available products and add "Blackberry" to the cart
    Then the cart should contain "Blackberry"
    When I proceed to checkout and enter "India" as the delivery location
    And I accept the terms and purchase
    Then I should see the order confirmation
