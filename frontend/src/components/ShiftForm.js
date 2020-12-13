import React, {useState} from 'react';
import { connect } from 'react-redux';
import { createShift } from '../actions/createShift';

const ShiftForm = (props) => {
    const [location, setLocation] = useState('')
    const handleLocationChange = (e) => {
        e.preventDefault()
        setLocation(e.target.value)
    }

    const [date, setDate] = useState()
    const handleDateChange = (e) => {
        e.preventDefault()
        setDate(e.target.value)
    }

    const [startTime, setStartTime] = useState('')
    const handleStartTimeChange = (e) => {
        e.preventDefault()
        setStartTime(e.target.value)
    }

    const [endTime, setEndTime] = useState('')
    const handleEndTimeChange = (e) => {
        e.preventDefault()
        setEndTime(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const shift = { location, date, startTime, endTime }
        props.createShift(shift, props.congId)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="input">
                    <label htmlFor="location">Location:</label><input type="text"
                                                                      value={location}
                                                                      onChange={handleLocationChange}
                                                                      name="location" />
                </div>
                <div className="input">
                    <label htmlFor="date">Date:</label><input type="date"
                                                              value={date}
                                                              onChange={handleDateChange}
                                                              name="date" />
                </div>
                <div className="input">
                    <label htmlFor="startTime">Start Time:</label><input type="time"
                                                                         value={startTime}
                                                                         onChange={handleStartTimeChange}
                                                                         name="startTime" />
                </div>
                <div className="input">
                    <label htmlFor="endTime">End Time:</label><input type="time"
                                                                     value={endTime}
                                                                     onChange={handleEndTimeChange}
                                                                     name="startTime" />
                </div>
                <input type="submit" value="Create Shift" className="btn btn-primary" />
            </form>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        congid: state.currentUser.congregation.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createShift: (shift, congId) => dispatch(createShift(shift, congId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftForm)