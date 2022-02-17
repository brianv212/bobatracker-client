import React from "react"
import "./styles/BobaBar.css"

function BobaBar(props) {
    const MAX_DAYS = 31;
    const CONTAINER = (props.containerSize > 150 ? props.containerSize - 150 : 0);
    let barPadding = 2
    let barColour = '#D5F2F9'

    let barWidth = CONTAINER * (props.d.val / MAX_DAYS);
    let yMid = props.barHeight * 0.5;

    let label = barWidth !== 0 ? <text className="value-label" x={barWidth - 8} y={yMid} alignmentBaseline="middle">{props.d.val}</text> :
                              <div></div>
  
    return (
        <g className="bar-group">
            <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.month}</text>
            <rect y={barPadding * 0.5} width={4 + barWidth} height={props.barHeight - barPadding} fill={barColour} className="bar"/>
            {label}
        </g>
    )
}

export default BobaBar