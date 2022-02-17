import React, {Component} from 'react';
import './styles/CurrentTime.css';

class Timer extends Component {
    state = {
        date: new Date(),
        hasChecked: false,
        displayMessage: ""
    };

    times = [
        {time: '00:00:00', message: "It's a bit late for some boba. Maybe tomorrow"},
        {time: '08:00:00', message:  "Boba in the morning? Sure, why not!"},
        {time: '12:00:00', message: "What a perfect time to get boba!"},
        {time: '17:00:00', message: "You deserve some boba."},
        {time: '19:00:00', message: "It's after dinner, go get some boba!"},
        {time: '21:00:00', message: "The shops may still be open!"},
        {time: '22:00:00', message: "Maybe they're all closed now."}
    ];

    checkMessage() {
        let getMessage = 0;
        for (let i = 0; i < this.times.length; i++) {
            let checker = new Date();
            let vals = this.times[i].time.split(":")
            checker.setHours(vals[0]);
            checker.setMinutes(vals[1]);
            checker.setSeconds(vals[2]);
            if (checker < this.state.date.getTime()) {
                getMessage = i;
            }
            else {
                break;
            }
        }
        this.setState({displayMessage: this.times[getMessage].message, hasChecked: true});        
    }

    tick() {
        this.setState({date: new Date()});
        if (this.state.date.getMinutes() === 0 && !(this.state.hasChecked)) {
            console.log("Checking")
            this.checkMessage();
        }
        else if (this.state.date.getMinutes() >= 1 && this.state.hasChecked){
            console.log("Checked!")
            this.setState({hasChecked: false});
        }
    };

    componentDidMount() {
        this.checkMessage();
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className='timer-container'>
                <h1>The current time is</h1>
                <h2 className='timer-time'>{this.state.date.toLocaleTimeString()}</h2>
                {/* <p className='timer-desc'>What a perfect time to get boba!</p> */}
                <fieldset className="title">
                    <legend>{this.state.displayMessage}</legend>
                </fieldset>
            </div>
        )
    }
}

export default Timer;