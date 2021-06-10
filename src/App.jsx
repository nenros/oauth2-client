import 'bootstrap/dist/css/bootstrap.min.css';
import {OAuth2} from 'fetch-mw-oauth2';
import React, {createContext,  useContext, useEffect, useState} from 'react';
import {Container, Table} from "react-bootstrap";
import {BrowserRouter, Route, Switch,  useHistory} from "react-router-dom";
import './App.css';
import Navbar from "./Navbar";

const Timetable = () => {
    const [trains, setTrains] = useState([])
    const {oauth2} = useContext(AuthorizationContext)

    useEffect(() => {
        const fetchTrains = async () => {
            console.log(oauth2)
            const response = await oauth2.fetch('http://localhost:8081/trains');
            console.log(response)
        }
         if(oauth2 != null) { fetchTrains() }
        return
    }, [oauth2])

    return <Table>
        <thead>
        <tr>
            <th key='id'>ID</th>
            <th key='destination'>destination</th>
            <th key='name'>name</th>
            <th key='speed'>speed</th>
            <th key='coord'>coord</th>
        </tr>
        </thead>
        <tbody>
        {trains.map(() => null)}
        </tbody>
    </Table>
}

const Authorized = ()=>{
    const history = useHistory()
    const search = new URLSearchParams(history.location.search)
    const {setCode} = useContext(AuthorizationContext)
    const code = search.get('code')
    useEffect(()=>{
        if( code.length > 0) {
            setCode(code)
            history.push("/")
        }
    }, [code])

    return null
}


const defaultAuthContext  = {
    code: '',
    profile: null,
    oauth2: null ,
    setCode: (code) => {}
}

const AuthorizationContext = createContext(defaultAuthContext);

const AuthorizationProvider = ({children} ) => {
    const [code, setCode] = useState('');
    const [oauth2, setOauth2] = useState(null);

    useEffect(()=> {
        const fetchToken = async function() {
            const oAuth2 = new OAuth2({
                grantType: 'authorization_code',
                clientId: 'front',
                code: code,
                redirectUri: 'http://localhost:3000/authorized',
                tokenEndpoint: 'http://localhost:8080/oauth2/token'
            })
            setOauth2(oAuth2)
        }
        if(code.length === 0 ){return}
        fetchToken()
        //
    }, [code])


   return <AuthorizationContext.Provider value={{code: code,
        profile: null,
        oauth2, setCode}}>{children}</AuthorizationContext.Provider>
}

function App() {
    return (<AuthorizationProvider>
        <Container>
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route path={"/authorized"} component={Authorized}/>
                    <Route path={"/"} component={Timetable}/>
                    <Route path={"/login"}/>
                    <Route path={"/logout"}/>

                    <Route path={"/register"}/>
                </Switch>
            </BrowserRouter>
        </Container>
        </AuthorizationProvider>
    );
}

export default App;
