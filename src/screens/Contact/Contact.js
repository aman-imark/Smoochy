import React, {useEffect, useState} from 'react';

import { Link } from 'react-router-dom';
import TopHeader from '../../components/TopHeader';
import BottomTabs from '../../components/BottomTabs';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


import { BiChevronRight } from "react-icons/bi";
import { contact, getData } from '../../services/authService';
import { setStore, getStore, getUserToken, removeStore, clearStore } from '../../services/storageService';

import LoaderService from '../../services/loader';

import {Accordion, AccordionItem, AccordionItemHeading, 
  AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import styles from './Contact.css';


const Contact = () => {
  const [faqsContent, setFAQsContent] = useState([]);
  const [expandedQuestion, setExpandedQuestion] = useState(faqsContent);

  const [isLoading, setIsLoading] = useState(false);


  const [showContactForm, setShowContactForm] = useState(true);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});




  useEffect(() => {
      handleFAQs_Data();
  }, []);



  const handleFAQs_Data = () => {
    setIsLoading(true);
    getData('/faq', '').then((res) => {
       console.log(res)
       if(res.status === 'success'){ 
        setIsLoading(false);
        setFAQsContent(res.data);
       }else if(res.error){
        setIsLoading(false);
       }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };


  const toggleQuestion = (id) => {
    setExpandedQuestion(id === expandedQuestion ? null : id);
  };


  const handleSpaceKeyDown = (event) => {
    if (event.key === ' ') {
      event.preventDefault(); // Prevent the space character from being entered
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'subject') {
      setSubject(value);
    } else if (name === 'message') {
      setMessage(value);
    }
  };


  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Validate name
    if (!name) {
      formIsValid = false;
      newErrors.name = 'Name is required';
    }

    // Validate email
    if (!email) {
      formIsValid = false;
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      formIsValid = false;
      newErrors.email = 'Email is invalid';
    }

    // Validate subject
    if (!subject) {
      formIsValid = false;
      newErrors.subject = 'Subject is required';
    } 

    // Validate message
    if (!message) {
      formIsValid = false;
      newErrors.message = 'Message is required';
    } 

    setErrors(newErrors);
    return formIsValid;
  };


  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    console.log('Form submitted:', { name, email, subject, message });

    if (validateForm()) {
      setIsLoading(true);
      contact(name, email, subject, message).then((res) => {
        console.log(res)
        if(res.status === 'success'){ 
          setTimeout( () => {
            setIsLoading(false); 
            setShowContactForm(false);
          }, 1500);
          setIsLoading(false);
        }else if(res.error){
          setIsLoading(false);
           newErrors.server = res.error;
           setErrors(newErrors);
        }
      }).catch(error => {
          setIsLoading(false);
           newErrors.server = error;
           setErrors(newErrors);
      });
    }
  }



  return (
    <div className="app">

      <TopHeader></TopHeader>


      <main className="content-main">
      <div className="dashboard-content">
        <div style={{width: '90%', margin: '0px auto'}}>

        <Tabs style={{width: '100%'}}>
        <TabList>
          <Tab>Contact</Tab>
          <Tab>FAQ's</Tab>
        </TabList>
        <br />


        <TabPanel>

          {showContactForm ? (
          <form onSubmit={handleFormSubmit} noValidate>
            <div style={{padding: 10}}>
              <div style={{marginBottom: 20}}>
                <p style={{padding: '0px 25px', color: '#000', fontSize: 14, marginBottom: 6}}>Name</p>
                <div className="input-outer-div">
                  <input type="text" className="left-input" style={{color: '#333'}}
                   name="name" value={name}  onChange={handleInputChange}/>
                </div>
                {errors.name && <p style={{color: '#ff0037', padding: '0px 25px', marginTop: 6, marginBottm: 0}}>{errors.name}</p>}
              </div>
           

              <div style={{marginBottom: 20}}>
                <p style={{padding: '0px 25px', color: '#000', fontSize: 14, marginBottom: 6}}>Subject</p>
                <div className="input-outer-div">
                  <input type="text" className="left-input" style={{color: '#333'}}
                  name="subject" value={subject}  onChange={handleInputChange}/>
                </div>
                {errors.subject && <p style={{color: '#ff0037', padding: '0px 25px', marginTop: 6, marginBottm: 0}}>{errors.subject}</p>}
              </div>
             

              <div style={{marginBottom: 20}}>
                <p style={{padding: '0px 25px', color: '#000', fontSize: 14, marginBottom: 6}}>Email</p>
                <div className="input-outer-div">
                  <input type="email" className="left-input" style={{color: '#333'}}
                  name="email" value={email}  onChange={handleInputChange}  onKeyDown={handleSpaceKeyDown}/>
                </div>
                {errors.email && <p style={{color: '#ff0037', padding: '0px 25px', marginTop: 6, marginBottm: 0}}>{errors.email}</p>}
              </div>
         

              <div style={{marginBottom: 20}}>
                <p style={{padding: '0px 25px', color: '#000', fontSize: 14, marginBottom: 6}}>Message</p>
                <div className="input-outer-div">
                  <textarea id="message" rows="4" cols="50" className="left-input-textarea" style={{color: '#333'}}
                  name="message" value={message}  onChange={handleInputChange}/>
                </div>
                {errors.message && <p style={{color: '#ff0037', padding: '0px 25px', marginTop: 6, marginBottm: 0}}>{errors.message}</p>}
              </div>
            </div>

            <div style={{margin: '10px 10px 20px'}}>
                <button type="submit" className="button-A" style={{margin: 0}}>Submit</button>
            </div>
          </form>
          ) : (
          <div style={{padding: 25, height: 100, display: 'flex', alignItems: 'center'}}>
            <h4>Thank you for contact us. we will contact you shortly.</h4>
          </div>
          )}
        </TabPanel>


        <TabPanel>
        <div>
          {faqsContent.length > 0 ? (
            <Accordion allowZeroExpanded>
            {faqsContent.map((q, index) => (
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>{q.name}</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div style={{paddingInline: 12}}>
                    <p>{q.detail}</p>
                    </div>
                      
                  </AccordionItemPanel>
              </AccordionItem>
            ))}
            </Accordion>
          ) : (
            <div className="no-data-msg">No FAQ's data found!</div>
          )}
        </div>

        </TabPanel>
        </Tabs>
    
        </div>
      </div>
      </main>



      <BottomTabs></BottomTabs>
    
      {isLoading && <LoaderService />}
    </div>
  );
};

export default Contact;