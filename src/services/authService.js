import axios from 'axios';

  const API_URL = 'https://smoochy.customerdevsites.com/api'; // Replace with your API URL

  // const authService = axios.create({
  //   baseURL: API_URL,
  // });

  // const login = (email, password) => {
  //     return axios
  //       .post(API_URL + "login", {email, password}).then(response => {
  //         console.log(response);
  //         // if (response.data.accessToken) {
  //         //   localStorage.setItem("user", JSON.stringify(response.data));
  //         // }
    
  //         return response.data;
  //       });
  // }



  const login = async (email, password) => {
      let nativeHeaders = {
           'Content-Type': 'application/json', 
           'Access-Control-Allow-Origin': '*',
           'mode': 'no-cors'
      };

      const res = await fetch(API_URL + "/login", {method: 'POST', headers: nativeHeaders, body: JSON.stringify({ email, password })});
      const finalRes = await res.json();
      return finalRes;
  }

    
  const register = async (payload)  => {
      let nativeHeaders = {
           'Content-Type': 'application/json', 
           'Access-Control-Allow-Origin': '*',
           'mode': 'no-cors'
      };
      console.log(payload);
      const res = await fetch(API_URL + "/register", {method: 'POST', headers: nativeHeaders, body: JSON.stringify(payload)});
      const finalRes = await res.json();
      return finalRes;
  }


  const forget = async (email)  => {
    let nativeHeaders = {
         'Content-Type': 'application/json', 
         'Access-Control-Allow-Origin': '*',
         'mode': 'no-cors'
    };
    console.log(email);
    const res = await fetch(API_URL + "/forget-Password", {method: 'POST', headers: nativeHeaders, body: JSON.stringify({email})});
    const finalRes = await res.json();
    return finalRes;
}

    

  const contact = async (name, email, subject, message) => {
    let nativeHeaders = {
         'Content-Type': 'application/json', 
         'Access-Control-Allow-Origin': '*',
         'mode': 'no-cors'
    };
    const res = await fetch(API_URL + "/contact", {method: 'POST', headers: nativeHeaders, body: JSON.stringify({ name, email, subject, message })});
    const finalRes = await res.json();
    return finalRes;
  }



  const postData = async (route, payload, token) => {
    let nativeHeaders;
    if(token === '') {
        nativeHeaders = {
           'Content-Type': 'application/json', 
           'Access-Control-Allow-Origin': '*', 
           'mode': 'no-cors'
        };
    }else {
        nativeHeaders = {
           'Content-Type': 'application/json', 
           'Access-Control-Allow-Origin': '*',
           'Authorization': `Bearer ${token}`,
           'mode': 'no-cors'
        };
    }

    // console.log('payload',payload);
    
    const res = await fetch(API_URL + route, {method: 'POST', headers: nativeHeaders, body: JSON.stringify(payload)});
    // console.log(res);
    const finalRes = await res.json();
    return finalRes;
  }



  const postFormData = async (route, payload, token) => {
    let nativeHeaders;
    if(token === '') {
        nativeHeaders = {
           'Content-Type': 'application/json', 
           'Access-Control-Allow-Origin': '*',
           'mode': 'no-cors'
        };
    }else {
        nativeHeaders = {
           'Content-Type': 'application/json', 
           'Access-Control-Allow-Origin': '*',
           'Authorization': `Bearer ${token}`,
           'mode': 'no-cors'
        };
    }
    const res = await fetch(API_URL + route, {method: 'POST', headers: nativeHeaders, body: JSON.stringify(payload)});
    console.log(res);
    const finalRes = await res.json();
    return finalRes;
  }




  const getData = async (route, token: String) => {
    let nativeHeaders;
    if(token === '') {
        nativeHeaders = {
           'Content-Type': 'application/json', 
           'Access-Control-Allow-Origin': '*', 
        };
    }else {
        nativeHeaders = {
           'Content-Type': 'application/json', 
           'Access-Control-Allow-Origin': '*',
           'Authorization': `Bearer ${token}`
        };
    }
    const res = await fetch(API_URL + route, {method: 'GET', headers: nativeHeaders});
    // console.log(res);
    const finalRes = await res.json();
    return finalRes;
  }




export {login, register, forget, contact, postData, postFormData, getData}