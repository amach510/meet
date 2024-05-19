Feature: Show/Hide Event Details
    Scenario: Event element is collapsed by default.
        Given the user is viewing a list of events,
        When they navigate to the event details section,
        Then the event details should collapse by default.

    Scenario: User opens event details.
        Given the user is viewing a collapsed event,
        When they click to expand the event,
        Then they should be able to see the event details.

    Scenario: User minimizes/closes event details.
        Given the user is viewing expanded event details,
        When they click to collapse the event,
        Then they should no longer see the event details.