import React, {useState, useContext,useEffect} from 'react';
import { Form, Button } from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import { Link,useNavigate } from 'react-router-dom'
import './styles/Login.css';
import {AuthContext} from '../context/auth';
import gql from 'graphql-tag';
import Boba from '../images/boba.png';
import {useForm} from '../util/hooks';

function Login () {
    const context = useContext(AuthContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user) {
            console.log("Welcome back, " + user.username);
            navigate('/home');
        }
    })
    const [errors, setErrors] = useState({});

    const {onChange, onSubmit, values} = useForm(loginUserCallback, {
        username: '',
        password: ''
    })

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, {data: {login: userData}}) {
            context.login(userData)
            navigate('/home')
        },
        onError(err){
            // console.log(err.graphQLErrors[0].extensions)
            console.log(errors)
            if (err.graphQLErrors[0].extensions.exception.stacktrace[0] === "UserInputError: Wrong credentials") {
                setErrors({standardError: "Incorrect username / password"})
            }
            else {
                setErrors(err.graphQLErrors[0].extensions.errors);
            }
            
        },
        variables: values
    })

    function loginUserCallback() {
        loginUser();
    };

    return (
        <div id="grid">
            <div className='login'>
                 <div className='login-content'>
                    <div className='login-flex'>
                        <h1 className='login-icon' style={{marginTop: "8px"}}>Boba Tracker </h1><img src={Boba} alt='Boba tracker icon' height={50} width={50} />
                    </div>
                    <hr />
                    <div className="form-container">
                        <Form onSubmit={onSubmit} noValidate className={loading ? "" : ""}>
                            <h1>Log in to your account</h1>
                            <Form.Input
                                label="Username"
                                // placeholder="Username"
                                name="username"
                                type="text"
                                value={values.username}
                                error={errors.username ? true : false}
                                onChange={onChange}/>
                            <Form.Input
                                label="Password"
                                // placeholder="Password"
                                name="password"
                                type="password"
                                value={values.password}
                                error={errors.password ? true : false}
                                onChange={onChange}/>
                            <div className='login-flex'>
                                <Button type="submit" primary>
                                    Login
                                </Button>
                                <p style={{marginTop: "8px", marginLeft: "1rem"}}>Don't have an account? <Link to="/register">Sign Up</Link></p>
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
                    <h1>Your own personal boba tracker</h1>
                    <p>How much boba do you drink in a week? A month? A year!</p>
                </div>
            </div>
        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
           id
           email
           username
           createdAt
           token 
        }
    }
`

export default Login;