import React, {useContext} from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
// import {useParams} from 'react-router-dom';
import {AuthContext} from '../context/auth';
import BobaCard from '../components/BobaCard';
import BobaChart from '../components/BobaChart';
import moment from 'moment';
import GridLoader from "react-spinners/GridLoader";


import './styles/MyBoba.css';

// import { AuthContext } from '../context/auth';

function MyBoba() {
    // userId === user.id
    // const { userId } = useParams();
    // console.log(userId)
    const { user } = useContext(AuthContext);
    const userId = user.id

    const {data} = 
        useQuery(FETCH_USER_BOBA, {
            variables: {
                userId
        }
    });

    const quotes = [
        {quote: "A woman is like a tea bag — you never know how strong she is until she gets in hot water.", quoter: "Eleanor Roosevelt"},
        {quote: "Would you like an adventure now, or shall we have our tea first?", quoter: "Alice in Wonderland"},
        {quote: "The secret to a well balanced life is a cup of tea in one hand and a good book in the other.", quoter: "The Tea Spot"},
        {quote: "I would rather have nothing but tea.", quoter: "Jane Austen"},
        {quote: "Tea, tea, a wonderful drink, the more you have the more think, the more you think the better you write, so let's drink tea all day and night.", quoter: "Daniel Dalton"},
        {quote: "Life is the bubbles.", quoter: "The Little Mermaid"},
        {quote: "There is something in the nature of tea that leads us into a world of quiet contemplation of life.", quoter: "Lin Yutang"}
    ]
    const quotesIdx = Math.floor(Math.random() * quotes.length);

    // Check if the user and userId match


    let postMarkup;

    if (!data) {
        postMarkup = (
            <div style={{textAlign: "center", padding: "5rem 2rem 2rem 2rem"}}>
                <GridLoader color="black" size={30} margin={2}/>
            </div>
        );
    }

    else {
        const bobaArr = data.getBobasByUser;
        let bobaDates = [];
        for (let i = 0; i < bobaArr.length; i++) {
            bobaDates.push(moment(bobaArr[i].date).format('MMMM Do, YYYY'));
        }

        let bobaByMonth = [];
        for (let i = 0; i < bobaDates.length; i++) {
            let getMonth = moment(bobaArr[i].date).format('MMMM');
            const bobaIdx = bobaByMonth.findIndex((el => 
                el.month === getMonth
            ));

            if (bobaIdx > -1) {
                bobaByMonth[bobaIdx].val += 1;
            }
            else {
                bobaByMonth.push({month: getMonth, val: 1});
            }
        }

        postMarkup = (
            <>
                <div className='boba-container'>
                    <div className='boba-data'>
                        {bobaArr && bobaArr.slice(0).reverse().map((boba) => (
                            <BobaCard post={boba} key={boba.id}/>
                        ))}                        
                    </div>
                </div>
                <div className='quote-container'>
                    <h1>"{quotes[quotesIdx].quote}"</h1>
                    <h4>- {quotes[quotesIdx].quoter}</h4>
                </div>
                <div className='data-container'>
                    <BobaChart data={bobaByMonth} key="bobachart"/>
                </div>
            </>

        )        
    }

    return postMarkup;
}

export default MyBoba;

const FETCH_USER_BOBA = gql`
  query($userId: String!) {
    getBobasByUser(userId: $userId) {
        id
        date
        boba
        rating
        location
        description
        username
    }
  }
`;