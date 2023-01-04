import { useState, useEffect } from 'react';
import Course from '../course/course';
import Image from 'next/image';

export default function WaitListPanel({ watchList, setWatchList}) {
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

    useEffect(() => {
        fetch('/api/monitored-courses')
        .then((res) => res.json()
        .then((data) => {
          setWatchList(data);
        }));
      }, [])
    
    const updateWatchList = async () => {
        let response = await fetch('/api/monitored-courses');
        response.json().then((res) => {
            setWatchList(res);
        });
    };

    const deleteWatchCourses = async (course) => {
        let classNumber = course.classNumber;
        let response = await fetch('/api/monitored-courses?classNumber=' + classNumber, {
            method: 'DELETE',
        });
        response.json().then((res) => {
            setWatchList(res);
        });
    };


    const onChange = async (state) => {
        SetIsToggleDisabled(true);
        let checked = state.target.checked;
        let response = await fetch('/api/monitor-status', {
            method: 'POST',
            body: checked
        });
        setIsMonitoringOn(checked);
        SetIsToggleDisabled(false);
    };
    



    return (
        <div className='container p-0'>
            <div className='row pt-2'>
                <div className='col-sm-12 col-lg-6 d-flex justify-content-center'>
                    <button className='btn align-self-center d-flex' onClick={updateWatchList}><Image className='align-self-center me-1' src='/refresh.svg' width={20} height={20} /> Refresh</button>
                </div>
                <div className='col-sm-12 col-lg-6 form-check form-switch d-flex justify-content-center'>
                    <input className='form-check-input align-self-center' type='checkbox' onChange={onChange} checked={isMonitoringOn} disabled={isToggleDisabled}/>
                    <label className='form-check-label align-self-center ps-1'>Notification</label>
                </div>
            </div>
            <hr />
            {watchList.map((course) => (
            <Course key={course.classNumber} courseObj={course} btnTxt='X' clickHandler={deleteWatchCourses} />
            ))}
        </div>
    );
}