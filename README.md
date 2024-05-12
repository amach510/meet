## Meet App

## Project Description:
An app for users to meet up in cities based on events that they are interested in attending.

## Key Features
- ## Filter Events By City
  - Scenario: User did not search for a city.
    - Given that the user has not searched for a city,
    - When the user views upcoming events,
    - Then they should see upcoming events in all the cities.
   
  - Scenario: User searches for a city.
    - Given that the user is on the event search page,
    - When the user searches for a city,
    - Then they should see a list of suggestions.
   
  - Scenario: User selects a city from suggestions.
    - Given the user has or has not searched for a city based on their history,
    - When they select a city from the suggested list,
    - Then they should be able to view events for the selected city.

- ## Show/Hide Event Details
  - Scenario: Event element is collapsed by default.
    - Given the user is viewing a list of events,
    - When they navigate to the event details section,
    - Then the event details should collapse by default.
  
  - Scenario: User opens event details.
    - Given the user is viewing a collapsed event,
    - When they click to expand the event,
    - Then they should be able to see the event details.
  
  - Scenario: User minimizes/closes event details.
    - Given the user is viewing expanded event details,
    - When they click to collapse the event,
    - Then they should no longer see the event details.

- ## Specify Number of Events
   - Scenario: User did not specified a number
     - Given the user has not specified a number of events,
     - When they view the events page,
     - Then 32 events should be shown by default.
  
   - Scenario: User changes the number of events displayed
     - Given the user is viewing a list of events,
     - When they change the number of events to be displayed,
     - Then the page should update to show the specified number of events (unless a cap is set per page).
    
- ## Use the App When Offline

  - Scenario: Show cached data when offline.
    - Given the user has previously accessed the app and there is cached data available,
    - When the user goes offline,
    - Then they should see the cached data.

  - Scenario: Show error when changing search settings offline.
    - Given the user is offline,
    - When they attempt to change search settings (city, number of events,
    - Then they should receive an error message.

- ## Add an App Shortcut to the Home Screen

  - Scenario: User installs app shortcut.
    - Given the user is accessing the app on their device,
    - When they opt to add a shortcut to the home screen,
    - Then they should be able to install the app shortcut successfully.

- ## Display Charts Visualizing Event Details

  - Scenario: Show chart with upcoming events in each city.
    - Given the user is viewing event details,
    - When they navigate to the chart section,
    - Then they should see a chart displaying the number of upcoming events in each city.
    - 

## Serverless Function
In the app itself, the serverless function will handle authorizing access to public calendar events from the Google Calendar API within the app. Authorization is essential for users to fetch event data displayed in the React app. These functions offer a streamlined approach compared to maintaining a full server. They will handle generating access tokens, ensuring secure interaction with the Google Calendar API. AWS Lambda is the preferred cloud-service provider for implementing these functions, enhancing the app's scalability and cost efficiency.
