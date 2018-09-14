import axios from 'axios'; 
export const USERS = "REGISTER"; 


export const userRegister = (props) => {
    axios
    .post("http://localhost:3300/api/register", props.this.state)
    .then(res => {
        console.log('response', res); 
        localStorage.setItem('jwt', res.data.token);

    })
    .catch(err => {
        console.log(err);
    })
}


