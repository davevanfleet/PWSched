import React from 'react';
import { connect } from 'react-redux';

const Shifts = (props) => {
    const shifts = props.currentCongregation.shifts.map(shift => {
        const date = new Date(shift.datetime).toLocaleString()
        return (
            <tr>
                <td>{date}</td>
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
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        currentCongregation: state.currentCongregation
    }
}

export default connect(mapStateToProps, null)(Shifts);