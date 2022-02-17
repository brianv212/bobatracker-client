import React, {useContext,useState} from 'react';
import {Form, Button} from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import { Link,useNavigate } from 'react-router-dom'
import gql from 'graphql-tag'
import './styles/Login.css';

import { AuthContext } from '../context/auth';
import {useForm} from '../util/hooks'

import Boba from '../images/boba.png';


function Register (props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_, {data: {register: userData}}) {
            context.login(userData)
            navigate('/home')
        },
        onError(err){
            console.log(err.graphQLErrors[0].extensions)
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    // Brought up and read initially! Recognized earlier than consts
    function registerUser(){
        addUser();
    }


    return(
        <div id="grid">
        <div className='login'>
            <div className='login-content'>
                <div className='login-flex'>
                    <h1 className='login-icon' style={{marginTop: "8px"}}>Boba Tracker </h1><img src={Boba} alt='Boba tracker icon' height={50} width={50} />
                </div>
                <hr />
                <div className="form-container">
                    <Form onSubmit={onSubmit} noValidate className={loading ? "" : ""}>
                        <h1>Register</h1>
                        <Form.Input
                            label="Username"
                            placeholder="Username"
                            name="username"
                            type="text"
                            value={values.username}
                            error={errors.username ? true : false}
                            onChange={onChange}/>
                        <Form.Input
                            label="Email"
                            placeholder="Email.."
                            name="email"
                            type="text"
                            value={values.email}
                            error={errors.email ? true : false}
                            onChange={onChange}/>
                        <Form.Input
                            label="Password"
                            placeholder="Password.."
                            name="password"
                            type="password"
                            value={values.password}
                            error={errors.password ? true : false}
                            onChange={onChange}/>
                        <Form.Input
                            label="Confirm Password"
                            placeholder="Confirm Password.."
                            name="confirmPassword"
                            type="password"
                            value={values.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            onChange={onChange}/>
                        <div className='login-flex'>
                            <Button type="submit" primary>
                                Register
                            </Button>
                            <p style={{marginTop: "8px", marginLeft: "1rem"}}><Link to="/">Return to Login</Link></p>
                        </div>
                    </Form>
                    {Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(errors).map(value => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                    )}
                </div>
                {/* <fieldset class="title">
                    <legend>or</legend>
                </fieldset> */}
            </div>
        </div>
        <div className='backdrop'>
            <div className='backdrop-content'>
                <h1>Your own personal tracker</h1>
                <p>How much boba do you drink in a week? A month? A year!</p>
            </div>
        </div>
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            token
            username
            createdAt
        }
    }
`

export default Register;