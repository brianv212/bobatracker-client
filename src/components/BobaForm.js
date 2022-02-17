import React, {useState,useEffect} from 'react';
import { Button, Form, Rating } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// import FileBase from 'react-file-base64';
import {Grid} from 'semantic-ui-react';
import GridLoader from "react-spinners/GridLoader";
import { useNavigate } from "react-router-dom";

import { useForm } from '../util/hooks';

function BobaForm() {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        bobaName: '',
        bobaLocation: '',
        bobaDescription: ''
    });
    const [errors, setErrors] = useState({})
    const [ratingSize,setRatingSize] = useState("massive");
    const [ratingValue,setRatingValue] = useState(5);
    const [submitted,setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        function handleResize() {
            let newRatingSize = window.innerWidth < 600 ? "large" : "massive";
            setRatingSize(newRatingSize);
        }
        window.addEventListener('resize', handleResize);
    })

    const [createPost, { error }] = useMutation(CREATE_BOBA_MUTATION, {
        variables: {
            boba: values.bobaName,
            rating: ratingValue,
            location: values.bobaLocation,
            description: values.bobaDescription
        },
        update(proxy, result) {
            setSubmitted(true);
            setTimeout(() => {
                navigate("/home");
                window.location.reload();
            }, 2500)
        },
        onError(err){
            let message = err.graphQLErrors[0].message
            if (message.includes("location")) {
                setErrors({location: "Boba needs a location!"})
            }
            if (message.includes("name")) {
                setErrors({name: "Boba needs a name!"})
            }
            console.log(error)
        }
    });

    function createPostCallback() {
        createPost();
        // console.log({...values,ratingValue});
    }

    return (
        <div>
            {submitted ? 
            <div>
                <div style={{textAlign: "center", padding: "5rem 2rem 2rem 2rem"}}>
                    <h1>Boba Logged!</h1>
                    <h4 style={{fontStyle: "italic", color: "#BF8A49"}}>hang on while we update your homepage.</h4>
                </div>
                <GridLoader color="black" size={30} margin={2}/>
            </div> : 
            <div>
                <h2 style={{fontWeight: "bold", fontSize: "2rem", marginTop: "2rem"}}>What Did You Drink Today?</h2>
                <Form onSubmit={onSubmit}>
                    <Form.Field>
                        <Grid columns={1}>
                            <Grid.Column>
                                <Grid columns={2}>
                                    <Grid.Column>
                                        <Form.Input
                                            label="Boba Name"
                                            placeholder="What'd you get?"
                                            name="bobaName"
                                            onChange={onChange}
                                            value={values.bobaName}
                                            error={errors.name ? true : false}
                                            style={{whiteSpace: "pre-wrap"}}
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form.Input
                                            label="Store Name"
                                            placeholder="Where did you get it?"
                                            name="bobaLocation"
                                            onChange={onChange}
                                            value={values.bobaLocation}
                                            error={errors.location ? true : false}
                                            style={{whiteSpace: "pre-wrap"}}
                                        />
                                    </Grid.Column> 
                                </Grid>
                            </Grid.Column>
                            <Grid.Column style={{marginBottom: "2rem"}}>
                                <Form.TextArea
                                    label="Additional Info"
                                    placeholder="Anything special to note about your drink? (Optional)"
                                    name="bobaDescription"
                                    onChange={onChange}
                                    value={values.bobaDescription}
                                    style={{whiteSpace: "pre-wrap"}}
                                />
                            </Grid.Column>
                            <p style={{fontWeight: "bold", margin: "auto"}}>How would you rate it?</p>
                            <Grid.Column>
                                <Rating 
                                    icon='heart' 
                                    value={ratingValue}
                                    defaultRating={ratingValue} 
                                    maxRating={10} 
                                    size={`${ratingSize}`} 
                                    onRate={(e, obj) => {
                                        e.preventDefault();
                                        setRatingValue(obj.rating);
                                    }}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Button type="submit" color="teal">
                                    Submit
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form.Field>
                </Form>
                {/* {errors && (
                    <div className="ui error message" style={{ marginBottom: 20 }}>
                        <ul className="list">
                            <li>{errors}</li>
                        </ul>
                    </div>
                )} */}
            </div>}
        </div>

    );
}

const CREATE_BOBA_MUTATION = gql`
  mutation createBoba($boba: String!, $rating: Int!, $location: String!, $description: String) {
    createBoba(boba: $boba, rating: $rating, location: $location, description: $description) {
        id,
        date,
        boba,
        rating,
        location,
        description,
        username
    }
  }
`;

export default BobaForm;