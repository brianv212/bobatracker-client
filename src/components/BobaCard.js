import React from 'react';
import { Card,Rating } from 'semantic-ui-react';
import moment from 'moment';
import './styles/BobaCard.css'
import Boba from '../images/boba.png'
import Calendar from '../images/calendar.png'
import DeleteButton from './DeleteButton';

function BobaCard({post: {boba, date, description, id, location, rating, username}}) {
    // Add edit and remove functions
    let bobaDate = moment(date).format('MMMM Do, YYYY')
    let fullDate = "- " + bobaDate + " at " + moment(date).format('h:mm:ss a')
    return (
        <div className='bobacard'>
            <Card fluid>
            <Card.Content>
                <div style={{display: "flex", flexDirections: "row", justifyContent: "space-between"}}>
                    <h3 className='bobacard-responsive'>
                        <img src={Calendar} alt='Boba icon' height={25} width={25} style={{margin: "0 4px 4px 0"}}/>
                        <p>{bobaDate}</p>
                        <img src={Boba} alt='Boba icon' height={25} width={25} style={{margin: "0 3px 4px 4px"}}/>
                        <p>{boba} from {location}</p>
                    </h3>
                    <Card.Description>
                        <Rating 
                            icon='heart' 
                            value={rating}
                            defaultRating={rating} 
                            maxRating={10}
                            size='mini'
                            disabled={true}
                        />
                    </Card.Description>             
                </div>
            </Card.Content>
            <Card.Content extra className='bobacard-extra'>
                <div className='bobacard-extra' style={{width: "95%"}}>
                    <p>{description}&nbsp;<em className='bobacard-phone'>{fullDate}</em></p>
                </div>
                <DeleteButton cardId={id} cardOp={username}/>
            </Card.Content>
            </Card>
        </div>

    )
}

// as={Link} to={`/posts/${id}`}
export default BobaCard