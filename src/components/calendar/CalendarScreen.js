import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-message-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventSetActive, eventClearActiveEvent } from '../../actions/events'
import { AddNewFav } from '../ui/AddNewFav'
import { DeleteEventFav } from '../ui/DeleteEventFav'

moment.locale('es')

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {

    const { events, activeEvent } = useSelector(state => state.calendar)

    const dispatch = useDispatch()

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }
        return {
            style
        }
    }

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))
    }

    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent())
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                view={lastView}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
            />

            <AddNewFav />

            {activeEvent &&
                <DeleteEventFav />
            }
            <CalendarModal

            />
        </div>
    )
}
