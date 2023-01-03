import { useState, useEffect } from "react";
import Script from "next/script";

export default function MonitoredCourses() {

    const [isToggleDisabled, SetIsToggleDisabled] = useState(true);
    
    const [isMonitoringOn, setIsMonitoringOn] = useState(false);

    useEffect(() => {
        SetIsToggleDisabled(true);
        fetch('/api/monitor-status')
        .then((res) => res.text()
        .then((data) => {
            setIsMonitoringOn(data == 'true');
            SetIsToggleDisabled(false);
        }));
    }, [])
    
    const getMonitoredCourses = async () => {
        let response = await fetch('/api/monitored-courses');
        response.json().then((res) => {
            console.log(res);
        });
    };

    const deleteMonitoredCourses = async () => {
        let classNumber = '5675'
        let response = await fetch('/api/monitored-courses?classNumber=' + classNumber, {
            method: 'DELETE',
        });
        response.json().then((res) => {
            console.log(res);
        });
    };

    const addCourse = async () => {
        let course = {
            classNumber: '4926',
            subject: 'ECON',
            catalogNumber: '101',
            sectionNumber: '001',
            term: '2022 Fall',
            instructor: 'Staub,Kalina Marie',
            isClassOpen: false //if seats > 0 then class is open (true); false other wise
        };
        
        let response = await fetch('/api/monitored-courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(course)
        });
        response.json().then((res) => {
            console.log(res);
        });
    };

    const onChange = async (state) => {
        SetIsToggleDisabled(true);
        let checked = state.target.checked;
        let response = await fetch('/api/monitor-status', {
            method: 'POST',
            body: checked
        });
        console.log(await response.text());
        setIsMonitoringOn(checked);
        SetIsToggleDisabled(false);
    };
    



    return (
        <div>
            <button onClick={getMonitoredCourses}>monitored button</button>
            <button onClick={deleteMonitoredCourses}>delete button</button>
            <button onClick={addCourse}>add button</button>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={onChange} checked={isMonitoringOn} disabled={isToggleDisabled}/>
                <label className="form-check-label">Checked switch checkbox input</label>
            </div>
        </div>
    );
}