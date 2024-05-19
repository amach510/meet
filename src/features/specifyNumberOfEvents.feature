Feature: Specify Number of Events
    Scenario: User did not specified a number.
        Given the user has not specified a number of events,
        When they view the events page,
        Then 32 events should be shown by default.

    Scenario: User changes the number of events displayed.
        Given the user is viewing a list of events,
        When they change the number of events to be displayed,
        Then the page should update to show the specified number of events (unless a cap is set per page).
