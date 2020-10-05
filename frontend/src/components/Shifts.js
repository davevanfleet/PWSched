import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { requestShift } from '../actions/requestShift';

const Shifts = (props) => {

    const handleClick = (e) => {
        e.preventDefault()
        props.history.push('/create_shift')
    }

    const handleShiftRequest = (e) => {
        e.preventDefault()
        props.requestShift(props.currentUser.id, e.target.value, props.currentUser.congregation.id)
    }

    const shifts = props.shifts.map(shift => {
        return (
            <tr key={shift.id}>
                <td>{new Date(shift.start_time).toDateString()}</td>
                <td>{new Date(shift.start_time).toLocaleTimeString()}</td>
                <td>{new Date(shift.end_time).toLocaleTimeString()}</td>
                <td>{shift.location}</td>
                <td>{shift.volunteers[0]}</td>
                <td>{shift.volunteers[1]}</td>
                <td>
                    {props.currentUser.requested_shifts.some(req => req.id === shift.id) ?
                        "Already Requested" :
                        <button className="btn btn-primary"
                                value={shift.id}
                                onClick={handleShiftRequest}>Here I am! Send Me!</button>
                    }
                </td>
            </tr>
        )
    })

    return (
        <>
            <h1>Your Congregation's Shifts</h1>
            <table id="shift-table" className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Location</th>
                        <th>Volunteer 1</th>
                        <th>Volunteer 2</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {shifts}
                </tbody>
            </table>
            {props.currentUser.role === "admin" && <button className="btn btn-primary" onClick={handleClick}>Add New Shift</button>}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        shifts: state.currentUser.congregation.shifts,
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestShift: (userId, shiftId, congId) => dispatch(requestShift(userId, shiftId, congId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Shifts));