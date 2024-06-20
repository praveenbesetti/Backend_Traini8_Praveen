import './form.css';
import React, { useState } from 'react';
import useForm from './useForm';
import validate from './validate';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: white;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: #9CA3AF;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: white;
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid rgb(0, 170, 255);
  outline: none;
  font-size: 18px;
  color: #9CA3AF;
  border-radius: 12px;
  padding: 12px 16px;
  width: 100%;
  &:focus {
    border: 1px solid linear-gradient(225deg, rgb(0, 42, 255) 0%, rgb(0, 170, 255) 100%);
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: rgb(0, 136, 255);
  background: linear-gradient(225deg, rgb(0, 42, 255) 0%, rgb(0, 170, 255) 100%);
  background: -moz-linear-gradient(225deg, rgb(0, 42, 255) 0%, rgb(0, 170, 255) 100%);
  background: -webkit-linear-gradient(225deg, rgb(0, 42, 255) 0%, rgb(0, 170, 255) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const RegistrationForm = () => {
  const [open, setOpen] = useState(false);

  const initialState = {
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'no',
    guestName: '',
  };

  const toggleForm = () => {
    setOpen(!open); // Toggle the open state
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
   
  } = useForm(initialState, validate, submit);

  function submit() {
    alert(JSON.stringify(values, null, 2));
    
   
    
    }
  

  return (
    <Container className='bg-slate-900 h-screen'>
     
          <Wrapper>
            <Title>Basic Dynamic Form with Conditional Fields</Title>
            <ContactForm onSubmit={handleSubmit} className="max-w-lg box mx-auto p-4 md:p-6 lg:p-8 shadow-lg rounded-lg">
              <div className="mb-4 justify-center items-center">
                <ContactInput
                  type="text"
                  name="name"
                  id="name"
                  placeholder='Your Name'
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
              </div>

              <div className="mb-4">
                <ContactInput
                  type="email"
                  name="email"
                  id="email"
                  placeholder='Your Email'
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <ContactInput
                  type="number"
                  name="age"
                  id="age"
                  placeholder='Your Age'
                  value={values.age}
                  onChange={handleChange}
                />
                {errors.age && <p className="text-red-500 text-xs italic">{errors.age}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-white text-xl font-title font-bold mb-2">
                  Are you attending with a guest?
                </label>
                <div className="flex items-center justify-center">
                  <input
                    type="radio"
                    name="attendingWithGuest"
                    id="attendingWithGuestYes"
                    value="yes"
                    checked={values.attendingWithGuest === 'yes'}
                    onChange={handleChange}
                    className="mr-2 leading-tight"
                  />
                  <label htmlFor="attendingWithGuestYes" className="text-white text-xl font-title">
                    Yes
                  </label>
                  <input
                    type="radio"
                    name="attendingWithGuest"
                    id="attendingWithGuestNo"
                    value="no"
                    checked={values.attendingWithGuest === 'no'}
                    onChange={handleChange}
                    className="ml-4 mr-2 leading-tight"
                  />
                  <label htmlFor="attendingWithGuestNo" className="text-white text-xl font-title">
                    No
                  </label>
                </div>
              </div>

              {values.attendingWithGuest === 'yes' && (
                <div className="mb-4 text-white text-xl font-title">
                  <ContactInput
                    type="text"
                    name="guestName"
                    id="guestName"
                    placeholder='Guest Name'
                    value={values.guestName}
                    onChange={handleChange}
                  />
                  {errors.guestName && <p className="text-red-500 text-xs italic">{errors.guestName}</p>}
                </div>
              )}

              <div className="flex items-center justify-between">
                <ContactButton
                  type="submit"
                  value='Submit'
                  className="gradient w-40"
                />
              </div>
            </ContactForm>
          </Wrapper>
       
    </Container>
  );
}

export default RegistrationForm;
