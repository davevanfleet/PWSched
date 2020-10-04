import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

const Shifts = (props) => {

    const handleClick = (e) => {
        e.preventDefault()
        props.history.push('/create_shift')
    }

    const shifts = props.shifts.map(shift => {
        return (
            <tr>
                <td>{new Date(shift.start_time).toDateString()}</td>
                <td>{new Date(shift.start_time).toLocaleTimeString()}</td>
                <td>{new Date(shift.end_time).toLocaleTimeString()}</td>
                <td>{shift.location}</td>
                <td>{shift.volunteers[0]}</td>
                <td>{shift.volunteers[1]}</td>
                <td>request btn here</td>
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
        shifts: state.shifts,
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, null)(Shifts));