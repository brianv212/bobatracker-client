import React, {useEffect,useState} from "react"
import BobaBar from "./BobaBar";
import "./styles/BobaChart.css";


function BobaChart({data}) {
    // Handles resizing events
    const [width, setWidth] = useState(0)
    let r = React.createRef();

    useEffect(() => {
        if(r.current){
            setWidth(r.current.getBoundingClientRect().width);
        }
    }, [r]);

    function resize (){
        setWidth(r.width);
    }
    window.onresize = resize;


    const barHeight = 30;
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let monthData = []
    let idx = 0;
    data.forEach(month => {
        while (idx < months.length && months[idx] !== month.month) {
            monthData.push({month: months[idx], val: 0});
            idx += 1;
        }
        monthData.push({month: month.month, val: month.val});
        idx += 1;
    });

    while (idx < months.length) {
        monthData.push({month: months[idx], val: 0});
        idx += 1;
    }
    let bobaGroups = monthData.map((d, i) => <g transform={`translate(0, ${i * barHeight})`} key={d.month}>
                                                <BobaBar 
                                                    d={d}
                                                    barHeight={barHeight} 
                                                    key={d.month}
                                                    containerSize={width}
                                                />
                                              </g>)
    return (
        <svg height="420" className="barchart" ref={r}>
            <g className="container">
                <text className="title" x="30" y="40" fontSize="24px" fontFamily="Lato">Your Boba at a Glance</text>
                <g className="chart" transform="translate(100,60)">{bobaGroups}</g>
            </g>
        </svg>
    )
}

export default BobaChart