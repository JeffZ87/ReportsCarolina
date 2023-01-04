import styles from './course.module.css';
import { useState } from 'react';
export default function Course({ courseObj, btnTxt, clickHandler}) {
    const [isDisable, setIsDisable] = useState(false);

    const onClick = async () => {
        setIsDisable(true);
        await clickHandler(courseObj);
        setIsDisable(false);
    }

    return(
        <div className='container-fluid p-0'>
            <div className={`m-1 row border border-dark ${styles['bg-unc-color']}`}>
                <div className='my-1 col-sm-12 col-lg-5 d-flex'>
                    <p className='my-auto align-self-center'>{courseObj.subject} {courseObj.catalogNumber} - {courseObj.sectionNumber}</p>
                </div>
                <div className='py-1 col-sm-12 col-md-7 col-lg-5 border-dark border-end border-start d-flex justify-content-center'>
                    <p className={`btn my-auto align-self-center text-light ${courseObj.isClassOpen?`btn-success ${styles['btn-success']}`:`btn-danger ${styles['btn-danger']}`}`}>{courseObj.isClassOpen?'OPEN':'CLOSE'}</p>
                </div>
                <div className='my-1 col-sm-12 col-md-5 col-lg-2 d-flex justify-content-center'>
                    <button type='button' onClick={onClick} className='btn btn-warning align-self-center' disabled={isDisable}>{btnTxt}</button>
                </div>
            </div>
        </div>
    );
}