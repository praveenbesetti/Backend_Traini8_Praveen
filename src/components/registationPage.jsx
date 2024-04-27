import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function TrainingCenterForm() {
   
    const navigator = useNavigate();
  const [generatedString, setGeneratedString] = useState('');
  const [generatedStrings, setGeneratedStrings] = useState([]);


    const [formData, setFormData] = useState({
        centerName: '',
        centerCode: '',
        address: {
            detailedAddress: '',
            city: '',
            state: '',
            pincode: ''
        },
        studentCapacity: '',
        coursesOffered: [],
        createdOn: '',
        contactEmail: '',
        contactPhone: ''
    });

   // const data = new Date;
    const [errors, setErrors] = useState({});
    const [selectedCourses, setSelectedCourses] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            address: {
                ...prevData.address,
                [name]: value
            }
        }));
    };

   const handleCourseChange = () => {
    setFormData(prevData => ({
        ...prevData,
        coursesOffered: selectedCourses
    }));
};
    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/training-centers/Code');
            
            setGeneratedStrings(response.data); // Assuming the data you need is in response.data
            generateAlphaNumeric();
        } catch (error) {
            console.error('Error fetching code:', error);
        }
    };

    fetchData(); // Call the fetchData function immediately
}, []);


 const generateAlphaNumeric = () => {
    const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
     let result = '';
      const today = new Date();

    // Format the date as desired
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
   

    do {
        result = '';
        for (let i = 0; i < 12; i++) {
            result += alphanumericChars.charAt(Math.floor(Math.random() * alphanumericChars.length));
        }
    } while (generatedStrings.includes(result));

    setGeneratedString(prevGeneratedString => {
      
        setGeneratedStrings([...generatedStrings, result]);
        setFormData(prevFormData => ({ ...prevFormData, centerCode: result, createdOn:formattedDate }));
        return result; // Return the updated generatedString
    });
};

    const Submit = async() =>
    {
        await axios.post("http://localhost:8080/api/training-centers/recive",formData);
     }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm(formData);
       
        if (Object.keys(validationErrors).length === 0) {
            // Form is valid, submit data(
            Submit();
            console.log(formData);
        
         navigator(`/code/${generatedString}`);


        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data) => {
        const errors = {};
        if (!data.centerName.trim() ||data.centerName.length >= 40  ) {
            errors.centerName = "Center Name is required in between 1 to 40 letters";
        }
       
        if (!data.address.detailedAddress.trim()) {
            errors.detailedAddress = "Detailed Address is required";
        }
        if (!data.address.city.trim()) {
            errors.city = "City is required";
        }
        if (!data.address.state.trim()) {
            errors.state = "State is required";
        }
        if (!data.address.pincode.trim()) {
            errors.pincode = "Pincode is required";
        }
        if (!data.studentCapacity.trim()) {
            errors.studentCapacity = "Student Capacity is required";
        } else if (isNaN(data.studentCapacity)) {
            errors.studentCapacity = "Student Capacity must be a number";
        }
        if (selectedCourses.length === 0) {
            errors.coursesOffered = "At least one course must be selected";
        }
        if (!data.contactEmail.trim()) {
            errors.contactEmail = "Contact Email is required";
        } else if (!isValidEmail(data.contactEmail)) {
            errors.contactEmail = "Invalid email format";
        }
        if (!data.contactPhone.trim()) {
            errors.contactPhone = "Contact Phone is required";
        } else if (!isValidPhone(data.contactPhone)) {
            errors.contactPhone = "Invalid phone number format";
        }
        return errors;
    };

    const isValidEmail = (email) => {
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone) => {
        // Simple phone number validation
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    return (
        <div className="lg:w-4/5 w-full  mx-auto lg:mt-10 p-6    flex flex-wrap   bg-slate-300 rounded-lg shadow-md">
           
            <h2 className="text-2xl font-bold mb-4 mx-auto ">Training Center Form</h2>
            <form onSubmit={handleSubmit}>
                 <div className="flex flex-wrap lg:justify-between justify-center">
                <div className="mb-4 lg:w-2/5 w-4/5  ">
                    <label htmlFor="centerName" className="block text-sm font-medium  lg:text-start sm:text-center text-gray-700">Center Name</label>
                    <input type="text" id="centerName" name="centerName" value={formData.centerName} onChange={handleChange} className={`mt-1 p-2 block w-full  border rounded-md focus:outline-none ${errors.centerName ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.centerName && <p className="text-red-500 text-sm mt-1">{errors.centerName}</p>}
                </div>
                {/* <div className="mb-4">
                    <label htmlFor="centerCode" className="block text-sm font-medium text-gray-700">Center Code</label>
                    <input type="text" id="centerCode" name="centerCode" value={formData.centerCode} onChange={handleChange} className={`mt-1 p-2 block w-full border rounded-md focus:outline-none ${errors.centerCode ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.centerCode && <p className="text-red-500 text-sm mt-1">{errors.centerCode}</p>}
                </div> */}
                <div className="mb-4 lg:w-2/5 w-4/5">
                    <label htmlFor="detailedAddress" className="block text-sm lg:text-start  sm:text-center font-medium text-gray-700">Detailed Address</label>
                    <input type="text" id="detailedAddress" name="detailedAddress" value={formData.address.detailedAddress} onChange={handleAddressChange} className={`mt-1 p-2 block w-full  border rounded-md focus:outline-none ${errors.detailedAddress ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.detailedAddress && <p className="text-red-500 text-sm mt-1">{errors.detailedAddress}</p>}
                </div>
                <div className="mb-4 lg:w-2/5 w-4/5">
                    <label htmlFor="city" className="block text-sm font-medium lg:text-start  sm:text-center text-gray-700">City</label>
                    <input type="text" id="city" name="city" value={formData.address.city} onChange={handleAddressChange} className={`mt-1 p-2 block w-full border  rounded-md focus:outline-none ${errors.city ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div className="mb-4 lg:w-2/5 w-4/5">
                    <label htmlFor="state" className="block text-sm font-medium lg:text-start  sm:text-center text-gray-700">State</label>
                    <input type="text" id="state" name="state" value={formData.address.state} onChange={handleAddressChange} className={`mt-1 p-2 block w-full  border rounded-md focus:outline-none ${errors.state ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
                <div className="mb-4 lg:w-2/5 w-4/5">
                    <label htmlFor="pincode" className="block text-sm font-medium lg:text-start  sm:text-center text-gray-700">Pincode</label>
                    <input type="text" id="pincode" name="pincode" value={formData.address.pincode} onChange={handleAddressChange} className={`mt-1 p-2 block w-full  border rounded-md focus:outline-none ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                </div>
                <div className="mb-4 lg:w-2/5 w-4/5">
                    <label htmlFor="studentCapacity" className="block lg:text-start  sm:text-center text-sm font-medium text-gray-700">Student Capacity</label>
                    <input type="text" id="studentCapacity" name="studentCapacity" value={formData.studentCapacity} onChange={handleChange} className={`mt-1 p-2 block w-full  border rounded-md focus:outline-none ${errors.studentCapacity ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.studentCapacity && <p className="text-red-500 text-sm mt-1">{errors.studentCapacity}</p>}
                </div>
                <div className="mb-4 lg:w-2/5 w-4/5">
                    <label className="block text-sm lg:text-start  sm:text-center font-medium w-full lg:w-3/5  text-gray-700">Courses Offered</label>
                  <input
                 type="text"
              value={selectedCourses.join(",")} // Join selected courses with comma and space
              onChange={(e) => {
            const inputValue = e.target.value;
             const courses = inputValue.split(",").map((course) => course.trim());
              setSelectedCourses([...courses]); // Assuming setSelectedCourses is a function to update the selected courses state
           }}
             className={`mt-1 p-2 block w-full border rounded-md  focus:outline-none ${
           errors.coursesOffered ? "border-red-500" : "border-gray-300"
           }`}
            />


                    {errors.coursesOffered && <p className="text-red-500 text-sm mt-1">{errors.coursesOffered}</p>}
                </div>
                <div className="mb-4 lg:w-2/5 w-4/5">
                    <label htmlFor="contactEmail" className="block text-sm  lg:text-start  sm:text-center font-medium  text-gray-700">Contact Email</label>
                    <input type="email" id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className={`mt-1 p-2 block  border w-full   rounded-md focus:outline-none ${errors.contactEmail ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
                </div>
                <div className="mb-4 lg:w-2/5 w-4/5">
                    <label htmlFor="contactPhone" className="block text-sm lg:text-start  sm:text-center font-medium text-gray-700">Contact Phone</label>
                    <input type="tel" id="contactPhone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className={`mt-1 p-2 block w-full border   rounded-md focus:outline-none ${errors.contactPhone ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
                </div>
                <div className="flex items-center justify-center">
                    <button type="submit" className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700" onClick={()=>{ handleCourseChange()}}>Submit</button>
                    </div>
                    </div>
            </form>
        </div>
    );
}

export default TrainingCenterForm;
