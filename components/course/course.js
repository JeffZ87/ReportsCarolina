import styles from './course.module.css';

export default function Course({ courseObj, btnTxt, clickHandler}) {
    const onClick = async () => {
        await clickHandler(courseObj);
    }

    return(
        <div className={`m-1 row border border-dark ${styles['bg-unc-color']}`}>
            <div className='my-1 col-sm-6 d-flex'>
                <p className='my-auto align-self-center'>{courseObj.subject} {courseObj.catalogNumber} - {courseObj.sectionNumber}</p>
            </div>
            <div className='py-1 col-sm-4 border-end border-start d-flex'>
                <p className={`btn my-auto align-self-center text-light ${courseObj.isClassOpen?`btn-success ${styles['btn-success']}`:`btn-danger ${styles['btn-danger']}`}`}>{courseObj.isClassOpen?'OPEN':'CLOSE'}</p>
            </div>
            <div className='my-1 col-sm-2'>
                <button type='button' onClick={onClick} className={`btn ${styles['btn-unc-color']}`}>{btnTxt}</button>
            </div>
        </div>
    );
}