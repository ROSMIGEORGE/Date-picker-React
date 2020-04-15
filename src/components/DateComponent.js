import React,{Component} from 'react';

class DateComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            dateList: this.getDateList()
        }
    }
    getDateList() {
        let dayList = [];
        let currentDate = this.props.date?new Date(this.props.date): new Date();
        currentDate.setDate(1);
        let currentMonth = currentDate.getMonth();
        let startDay = currentDate.getDay();
        for (let i = 0; i < startDay; i++) {
            dayList.push(null);
        }
        while (currentDate.getMonth() == currentMonth) {
            dayList.push(currentDate.getDate());
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dayList;
    }

    componentDidUpdate(prevProps,prevStates){
        if(prevProps != this.props)
        {
           this.setState({
            dateList: this.getDateList()
        })
        }
    }
    render(){
        const [d_default,d_selected] = [new Date(this.props.date),new Date(this.props.selected)]
        let flag = (d_default.getMonth() == d_selected.getMonth() && d_default.getFullYear() == d_selected.getFullYear());
        let dd = d_selected.getDate();
        let classList;
        return (
            <div id="date">
                {
                    this.state.dateList.map((item,key)=> {
                        if(item){
                            if(item == dd && flag){
                                classList = "date-btn selected";
                            }
                            else{
                                classList = "date-btn";
                            }
                        return <div id="date" 
                                    className={classList} 
                                    key={key} value={item} 
                                    onClick={this.props.changeHandler}>
                                        {item}
                                </div>
                        }
                        else{
                            return <div key={key} className="empty-date-btn"></div>
                        }
                    })
                }
            </div>
        );
    }
}

export default DateComponent;