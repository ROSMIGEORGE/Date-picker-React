import React,{Component} from 'react';

class YearComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            yearList: []
        }
    }

    getYearList(){
        let yearList = [];
        let year = this.props.year ? parseInt(this.props.year): new Date().getFullYear()
        let currentYear = new Date().getFullYear();
        let index = Math.floor((currentYear - year)/15);
        let start = currentYear - index*15;
        let end = start - 14;
        for(let i=start;i>=end;i--){
            yearList.push(i);
        }
        this.setState({
            yearList: yearList
        });
       
    }

    componentDidMount(){
        this.getYearList();
    }

    componentDidUpdate(prevProps,prevStates){
        if(prevProps != this.props)
        {
            this.getYearList();
        }
    }
    render(){
    return(
        <div id="date">
            {
                this.state.yearList.map(item => {
                return <div id="date" key={item} className="year-btn" value={item} onClick={this.props.changeHandler}>{item}</div>
                })
            }
        </div>
    );
    }
}

export default YearComponent;