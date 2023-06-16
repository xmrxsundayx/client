import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);

const Calendar = ({ currentPath }) => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // create a new event
    const createEvent = (event) => {
        axios
            .post('http://localhost:8000/api/event', event)
            .then((res) => {
                setEvents([...events, res.data]);
            })
            .catch((err) => console.log(err));
    };

    // read all events from the database
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/event')
            .then((res) => {
                setEvents(
                    res.data.map((event) => ({
                        ...event,
                        start: moment(event.start).toDate(),
                        end: moment(event.end).toDate(),
                    }))
                );
            })
            .catch((err) => console.log(err));
    }, []);

    // read a single event from the database
    const readEvent = (id) => {
        axios
            .get(`http://localhost:8000/api/event/${id}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    };

    // update a single event
    const updateEvent = (id, event) => {
        axios
            .put(`http://localhost:8000/api/event/${id}`, event)
            .then((res) => {
                setEvents(
                    events.map((event) => (event.id === id ? { ...event, ...res.data } : event))
                );
            })
            .catch((err) => console.log(err));
    };

    // delete a single event
    const deleteEvent = (id) => {
        axios
            .delete(`http://localhost:8000/api/event/${id}`)
            .then((res) => {
                setEvents(events.filter((event) => event.id !== id));
            })
            .catch((err) => console.log(err));
    };

    const handleSlotSelect = (slotInfo) => {
        const title = window.prompt('New Event Name');
        if (title) {
            const newEvent = {
                start: slotInfo.start,
                end: slotInfo.end,
                title,
            };
            setEvents([...events, newEvent]);
            createEvent(newEvent);
        }
    };

    const handleEventSelect = (event) => {
        setSelectedEvent(event);
        readEvent(event.id);
    };

    const handleEventUpdate = (updatedEvent) => {
        const updatedEvents = events.map((event) =>
            event === selectedEvent ? updatedEvent : event
        );
        setEvents(updatedEvents);
        updateEvent(selectedEvent.id, updatedEvent);
        setSelectedEvent(null);
    };

    const handleEventDelete = () => {
        const updatedEvents = events.filter((event) => event !== selectedEvent);
        setEvents(updatedEvents);
        deleteEvent(selectedEvent.id);
        setSelectedEvent(null);
    };

    return (
        <div style={{ height: '80vh' }}>
            {currentPath === '/' ? (
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    selectable={true}
                    onSelectSlot={handleSlotSelect}
                    onSelectEvent={handleEventSelect}
                    startAccessor="start"
                    endAccessor="end"
                    view={'day'}
                    toolbar={false}
                    max={moment('2023-06-13t23:00:00').toDate()}
                    min={moment('2023-06-13t06:00:00').toDate()}
                />
            ) : (
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    selectable={true}
                    onSelectSlot={handleSlotSelect}
                    onSelectEvent={handleEventSelect}
                />
            )}
            {selectedEvent && (
                <div className="event-popup">
                    <h3>{selectedEvent.title}</h3>
                    <p>Start: {selectedEvent.start.toString()}</p>
                    <p>End: {selectedEvent.end.toString()}</p>
                    <form onSubmit={handleEventUpdate}>
                        <label>
                            Title:
                            <input
                                type="text"
                                value={selectedEvent.title}
                                onChange={(e) =>
                                    setSelectedEvent({ ...selectedEvent, title: e.target.value })
                                }
                            />
                        </label>
                        <br />
                        <label>
                            Start:
                            <input
                                type="datetime-local"
                                value={moment(selectedEvent.start).format('YYYY-MM-DDTHH:mm')}
                                onChange={(e) =>
                                    setSelectedEvent({
                                        ...selectedEvent,
                                        start: moment(e.target.value).toDate(),
                                    })
                                }
                            />
                        </label>
                        <br />
                        <label>
                            End:
                            <input
                                type="datetime-local"
                                value={moment(selectedEvent.end).format('YYYY-MM-DDTHH:mm')}
                                onChange={(e) =>
                                    setSelectedEvent({
                                        ...selectedEvent,
                                        end: moment(e.target.value).toDate(),
                                    })
                                }
                            />
                        </label>
                        <br />
                        <button type="submit">Update</button>
                        <button onClick={handleEventDelete}>Delete</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Calendar;