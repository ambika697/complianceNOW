Feature: Practice shop checkout
  Scenario: Purchase Blackberry from the practice shop
    Given I log in to the practice shop
    When I view the available products and add "Blackberry" to the cart
    Then the cart should contain "Blackberry"
    When I enter "India" as the delivery location and click on purchase
    Then I should see the success message "Success! Thank you! Your order will be delivered in next few weeks :-)."
