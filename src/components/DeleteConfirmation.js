import React from 'react';
import './styles/DeleteConfirmation.css';
import { Button } from 'semantic-ui-react';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function DeleteButtonConfirmation(props) {
    const [deleteBobaMutation] = useMutation(DELETE_BOBA_MUTATION, {
        update(proxy) {
            window.location.reload(false);
            props.setTrigger(false)
        },
        variables: {
            bobaId:props.cardId
        }
    });

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button className='close-button' onClick={() => props.setTrigger(false)}>X</button>
                {/* {props.cardOp} {props.cardId} */}
                <h2 className='popup-innertext'>Are you sure you want to delete your boba?</h2>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <p className='popup-innertext' style={{marginTop: "4px", marginRight: "4rem"}}><em>It will be lost forever!</em></p>
                    <div>
                        <Button onClick={deleteBobaMutation} floated="right">Do it!</Button>
                        <Button color="red" floated="right" onClick={() => props.setTrigger(false)}>Nevermind</Button>                           
                    </div> 
                </div>
            </div>
        </div>
    ) : "";
}

const DELETE_BOBA_MUTATION = gql`
  mutation deleteBoba($bobaId: ID!) {
    deleteBoba(bobaId: $bobaId)
  }
`;

export default DeleteButtonConfirmation;

