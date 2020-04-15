import React from 'react'

function MonthComponent(props){
    const monthList = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    return(
        <div id="date">
            {
                monthList.map((item,key) => {
                   return <div id="date" className="month-btn" key={key} value={key} onClick={props.changeHandler}>{item}</div>
                })
            }
        </div>
    );
}

export default MonthComponent;