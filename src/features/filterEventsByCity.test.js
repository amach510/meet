import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
    test('User did not search for a city.', ({ given, when, then }) => {
      given('that the user has not searched for a city,', () => {
  
      });
      
      let AppComponent;
      when('the user views upcoming events,', () => {
        AppComponent = render(<App />);
      });
  
      then('they should see upcoming events in all the cities.', async () => {
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector('#event-list');

        await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(32);
          });
      });
    });
  
    test('User searches for a city.', ({ given, when, then }) => {
      let AppComponent;
      given('that the user is on the event search page,', () => {
        AppComponent = render(<App />);
      });
  
      let CitySearchDOM;
      when('the user searches for a city,', async () => {
        const user = userEvent.setup();
        const AppDOM = AppComponent.container.firstChild;
        CitySearchDOM = AppDOM.querySelector('#city-search');
        const citySearchInput = within(CitySearchDOM).queryByRole('textbox');  
        await user.type(citySearchInput, "Berlin");
      });
  
      then('they should see a list of suggestions.', async () => {
        const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(2);
      });
    });
  
  
    test('User selects a city from suggestions.', ({ given, and, when, then }) => {
      let AppComponent;
      let AppDOM;
      let CitySearchDOM;
      let citySearchInput;
      given('the user has or has not searched for a city based on their history,', async () => {
        AppComponent = render(<App />);
        const user = userEvent.setup();
        AppDOM = AppComponent.container.firstChild;
        CitySearchDOM = AppDOM.querySelector('#city-search');
        citySearchInput = within(CitySearchDOM).queryByRole('textbox');  
        await user.type(citySearchInput, "Berlin");
      });

      let suggestionListItems;
      and('the list of suggested cities is showing,', () => {
        suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
        expect(suggestionListItems).toHaveLength(2);
      });
  
      when('they select a city from the suggested list,', async () => {
        const user = userEvent.setup();
        await user.click(suggestionListItems[0]);
      });
  
      then('they should be able to view events for the selected city.', () => {
        expect(citySearchInput.value).toBe('Berlin, Germany');
      });
  
      and('the user should receive a list of upcoming events in that city.', async () => {
        const EventListDOM = AppDOM.querySelector('#event-list');
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        const allEvents = await getEvents();
  
        // filtering the list of all events down to events located in Germany
        // citySearchInput.value should have the value "Berlin, Germany" at this point
        const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value)
        expect(EventListItems).toHaveLength(berlinEvents.length);
      });
    });
  });