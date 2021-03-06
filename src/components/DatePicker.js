import React, { Component } from 'react';
import YearComponent from './yearComponent';
import MonthComponent from './MonthComponent';
import DateComponent from './DateComponent';
import TestUtils from 'react-dom/test-utils';
import {Helmet} from 'react-helmet'
import './date-picker.css'

const DATE_PICKER_STYLES = {
    width: "250px",
    minHeight: "210px",
    overflow: "auto",
    position: "absolute",
    backgroundColor:"#E0E5EC",
    boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)",
}

const month = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.componentReference = React.createRef();
        this.INPUT_FIELD = {
            inputElement: '',
            color: '#ffffff',
            dateElement: ''
        };
        this.state = {
            s_date: this.props.selected?  new Date(this.props.selected):new Date(),
            start_d: new Date(this.props.start),
            end_d: new Date(this.props.end),
            default_d: this.props.selected?  new Date(this.props.selected):new Date(),
            show: false,
            flag: '100',
            displayJSX: <></>
        }
    }

    getInputfield = () => {
        this.INPUT_FIELD.dateElement = this.componentReference.current;
        this.INPUT_FIELD.inputElement = this.componentReference.current.parentElement.getElementsByTagName('input')[0];
        DATE_PICKER_STYLES.width = this.INPUT_FIELD.inputElement.offsetWidth;
    }

    addWatcher = () => {
        this.INPUT_FIELD.inputElement.addEventListener("focus", this.showDatePicker);
        document.addEventListener("click", this.hideDatePicker);
    }

    removeWatcher = () => {
        this.INPUT_FIELD.inputElement.removeEventListener("focus", this.showDatePicker);
        document.removeEventListener("click", this.hideDatePicker);
    }

    showDatePicker = (e) => {
        this.setState({
            show: true
        });
    }

    hideDatePicker = (e) => {
        if (e.target !== this.INPUT_FIELD.inputElement && e.target.id !== 'date') {
            this.closeDatePicker(this.INPUT_FIELD.inputElement.value);
            // this.setState({
            //     show: false
            // });
        }
    }

    updateInputfield = () => {
        this.INPUT_FIELD.inputElement.value = this.state.s_date;
        TestUtils.Simulate.change(this.INPUT_FIELD.inputElement);
    }
    closeDatePicker = (value) => {
        if(value){
           this.updateInputfield();
        }
        this.setState({
            show: false
        });
    }

    updateDisplay = () => {
        if(this.INPUT_FIELD.inputElement.value){
            this.updateInputfield();
        }
        let temp;
        if(this.state.flag === '100')
            {
                temp = <YearComponent year= {this.state.default_d.getFullYear()} end={this.state.end_d} selected={this.state.s_date.getFullYear()} changeHandler={this.yearUpdateHandler}/>
            }
        else if(this.state.flag === '010'){
                temp = <MonthComponent month={this.state.default_d.getMonth()} selected={this.state.s_date.getMonth()} changeHandler={this.monthUpdateHandler}/>
        }
        else{
            temp =  <DateComponent date={this.state.default_d} selected={this.state.s_date} changeHandler={this.dateUpdateHandler}/> 
        }
        this.setState({
            displayJSX: temp
        });
    }

    yearUpdateHandler = (e) => {
        let yy = e.target.getAttribute('value');
        this.setState({
            flag: '010',
            default_d: new Date(this.state.default_d.setFullYear(yy)),
            s_date: new Date(this.state.s_date.setFullYear(yy))
        },this.updateDisplay);
    }

    monthUpdateHandler = (e) => {
        let mm = e.target.getAttribute('value');
        this.setState({
            flag: '001',
            default_d: new Date(this.state.default_d.setMonth(mm)),
            s_date: new Date(this.state.s_date.setMonth(mm))
        },this.updateDisplay);
    }

    dateUpdateHandler = (e) => {
        let dd = e.target.getAttribute('value');
        this.setState({
            default_d: new Date(this.state.default_d.setDate(dd)),
            s_date: new Date(this.state.default_d.setDate(dd))
        },() => {
            this.updateDisplay();
            this.closeDatePicker(this.state.default_d);
        });
    }

    showMonth = () => {
        this.setState({
             flag: '010'
            },this.updateDisplay)
    }

    showYear = () => {
        this.setState({
             flag: '100'
            },this.updateDisplay)
    }

    setDefaultYear = (yy) => {
        this.setState({
            default_d: new Date(this.state.default_d.setFullYear(yy))
        },this.updateDisplay);
    }
     setDefaultDate = (dd) => {
        this.setState({
            default_d: dd
        },this.updateDisplay);
     }

    navigate_Left = () => {
        if(this.state.flag == '100'){
        let yy = this.state.default_d.getFullYear() - 15;
        this.setDefaultYear(yy);
        }
        else if(this.state.flag == '001'){
            let dd = new Date(this.state.default_d);
            dd.setMonth(this.state.default_d.getMonth() - 1);
            this.setDefaultDate(dd);
        }
    }

    navigate_right = () => {
        if(this.state.flag == '100'){
        let yy = this.state.default_d.getFullYear() + 15;
        this.setDefaultYear(yy);
        }
        else if(this.state.flag == '001'){
            let dd = new Date(this.state.default_d);
            dd.setMonth(this.state.default_d.getMonth() + 1);
            this.setDefaultDate(dd);
        }
    }

    componentDidMount() {
        this.getInputfield();
        this.updateDisplay();
        this.addWatcher();
    }

    componentWillUnmount(){
        this.removeWatcher();
    }
    render() {

        return (
            <div ref={this.componentReference} id="date">
                <Helmet>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700;900&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                </Helmet>
                {
                    this.state.show ?
                        <div id="date" style={DATE_PICKER_STYLES}>
                            <div id="date" className="date-head">
                                <div id="date" className="nav-arrow-btn" onClick={this.navigate_Left}><span id="date" className="material-icons">navigate_before</span></div>
                                <div id="date" className="month-year">
                                    <div id="date" className="display-month" onClick = {this.showMonth}>{month[this.state.default_d.getMonth()]},</div>
                                    <div id="date" className="display-year" onClick = {this.showYear}>{this.state.default_d.getFullYear()}</div>
                                </div>
                                <div id="date" className="nav-arrow-btn" style={{}} onClick={this.navigate_right}><span id="date" className="material-icons">navigate_next</span></div>
                            </div>
                            <div id="date" className = "date-body">
                             {this.state.displayJSX}
                            </div>
                        </div>
                        : null
                }
            </div>
        );
    }
}

export default DatePicker;