Feature: Filter Events By City
    Scenario: User did not search for a city.
        Given that the user has not searched for a city,
        When the user views upcoming events,
        Then they should see upcoming events in all the cities.

    Scenario: User searches for a city.
        Given that the user is on the event search page,
        When the user searches for a city,
        Then they should see a list of suggestions.

    Scenario: User selects a city from suggestions.
        Given the user has or has not searched for a city based on their history,
        And the list of suggested cities is showing,
        When they select a city from the suggested list,
        Then they should be able to view events for the selected city.
        And the user should receive a list of upcoming events in that city.