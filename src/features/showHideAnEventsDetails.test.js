import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('Event element is collapsed by default.', ({ given, when, then }) => {
        let AppComponent;
        given('the user is viewing a list of events,', () => {
            AppComponent = render(<App />);
        });
      
        when('they navigate to the event details section,', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM  = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
  
        then('the event details should collapse by default.', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector('.details');
            expect(eventDetails).not.toBeInTheDocument();
        });
    });

    test('User opens event details.', ({ given, when, then }) => {
        let EventComponent;
        let allEvents;
        given('the user is viewing a collapsed event,', async () => {
            allEvents = await getEvents();
            EventComponent = render(<Event event={allEvents[0]} />);
            expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
        });

        when('they click to expand the event,', async () => {
            const showDetails = EventComponent.queryByText('show details');
            const user = userEvent.setup();
            await user.click(showDetails);
        });

        then('they should be able to see the event details.', () => {
            expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
            expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
        })
    });
    
    test('User minimizes/closes event details.', ({ given, when, then }) => {
        let EventComponent;
        let allEvents;
        given('the user is viewing expanded event details,', async () => {
            allEvents = await getEvents();
            EventComponent = render(<Event event={allEvents[0]} />);
            const user = userEvent.setup();
            await user.click(EventComponent.queryByText('show details'));
            expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
        });

        when('they click to collapse the event,', async () => {
            const hideDetails = EventComponent.queryByText('hide details');
            const user = userEvent.setup();
            await user.click(hideDetails);
        });

        then('they should no longer see the event details.', async () => {
            expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
            expect(EventComponent.queryByText('hide details')).not.toBeInTheDocument();
        })
    });
});