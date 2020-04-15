import React from 'react'

function MonthComponent(props){
    const monthList = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    let classList;
    return(
        <div id="date">
            {
                monthList.map((item,key) => {
                    if(key == parseInt(props.month)){
                        classList = "month-btn selected";
                    }
                    else{
                        classList = "month-btn";
                    }
                   return <div 
                   id="date" 
                   className={classList}
                   key={key} 
                   value={key} 
                   onClick={props.changeHandler}>
                       {item}
                    </div>
                })
            }
        </div>
    );
}

export default MonthComponent;