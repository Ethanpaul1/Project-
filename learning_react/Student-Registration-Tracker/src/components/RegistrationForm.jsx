import React from 'react';
import { useFormik } from 'formik';

const AdmissionForm = () => {
    const courses = [
        'Computer Science',
        'Information Technology',
        'CyberSecurity',
        'Data Science',
        'Networking'
    ]

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      DateOfBirth: '',
      Course: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },

    
  });
  return (

    
    <form className='formik' onSubmit={formik.handleSubmit}>
      <label htmlFor="fullName">Full Name</label>
      <input
        id="fullName"
        name="fullName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.fullName}
      />

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <label htmlFor="dob">Date of Birth</label>
      <input
        id="dob"
        name="dob"
        type="date"
        onChange={formik.handleChange}
        value={formik.values.DateOfBirth}
      />

      <label htmlFor="course">Course</label>
      <input
        id="course"
        name="course"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.Course}
      />

      <button type="submit">Submit</button>
    </form>
  );

};

export default AdmissionForm