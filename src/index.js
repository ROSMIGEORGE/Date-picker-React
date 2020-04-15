import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import DatePicker from './components/DatePicker.js'

const TODAY = new Date();
const month = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            f_date: '',
            s_date: '',
            start: TODAY,
            end: TODAY
        }
    }

    inputHandler = (e) => {
        let val = new Date(e.target.value);
        this.setState({
            f_date: val.getDate() + ' '+month[val.getMonth()]+','+val.getFullYear(),
            s_date: val
        })
    }

    render() {
        return (
            <div className="date-container">
                <div className="title-container">
                    <div className="main-title">DATE PICKER</div>
                </div>
                <div className="date-input-container">
                    <input className="date-input" value={this.state.f_date} onChange={this.inputHandler}/>
                    <DatePicker selected={this.state.s_date} start={this.state.start} end={this.state.end}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>,document.getElementById('root'));