import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.module.css';
export default function Dashboard() {
  const [details, setDetails] = useState([]);
  const [person, setPerson] = useState({
    name: '',
    email: '',
    number: '',
    age: '',
    address: ''
  });
  const [editingIndex, setEditingIndex] = useState(null); 
  const navigate = useNavigate();

  const isValidName = (name) => {
    return /^[A-Za-z\s'-]+$/.test(name); 
  };
  const isValidEmail = (email) => {
    return email.includes('@') && email.endsWith('.com'); 
  };
  const isValidPhoneNumber = (number) => {
    return number.length === 11 && /^[0-9]+$/.test(number);
  };
  const isValidAge = (age) => {
    return age.length === 2 && /^[0-9]+$/.test(age); 
  };

  const handleName = (e) => {
    setPerson({ ...person, name: e.target.value });
  };
  const handleEmail = (e) => {
    setPerson({ ...person, email: e.target.value });
  };
  const handleNumber = (e) => {
    setPerson({ ...person, number: e.target.value });
  };
  const handleAge = (e) => {
    setPerson({ ...person, age: e.target.value });
  };
  const handleAddress = (e) => {
    setPerson({ ...person, address: e.target.value });
  };
  const handleLogout = () => {
    navigate('/Home');  
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!person.name || !person.email || !person.number || !person.age || !person.address) {
      alert('All fields must be filled out');
      return;
    }
    if (!isValidName(person.name)) {
      alert('Invalid name. It must only contain letters (A-Z), spaces, apostrophes, or hyphens.');
      return;
    }
    if (!isValidEmail(person.email)) {
      alert('Invalid email address. It must contain "@" and end with ".com".');
      return;
    }
    if (!isValidPhoneNumber(person.number)) {
      alert('Invalid phone number. It must be exactly 11 digits long.');
      return;
    }
    if (!isValidAge(person.age)) {
      alert('Invalid age. It must be exactly 2 digits long.');
      return;
    }
    if (editingIndex !== null) {
      const updatedDetails = details.map((item, index) =>
        index === editingIndex ? person : item
      );
      setDetails(updatedDetails);
      setEditingIndex(null); 
    } else {
      setDetails([...details, person]);
    }
    setPerson({ name: '', email: '', number: '', age: '', address: '' });
  };

  const handleEdit = (index) => {
    setPerson(details[index]); 
    setEditingIndex(index); 
  };
  const handleDelete = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
    if (editingIndex === index) {
      setPerson({ name: '', email: '', number: '', age: '', address: '' });
      setEditingIndex(null);
    }
  };
  return (
    <>
     <div className="dashboard-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Age</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td>{person.number}</td>
              <td>{person.age}</td>
              <td>{person.address}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className='form-dashboard'>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={person.name} onChange={handleName} />
        
        <label htmlFor="email">Email Address:</label>
        <input type="email" id="email" value={person.email} onChange={handleEmail} />
        
        <label htmlFor="number">Phone Number:</label>
        <input type="number" id="number" value={person.number} onChange={handleNumber} />
        
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" value={person.age} onChange={handleAge} />
        
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={person.address} onChange={handleAddress} />

        <button type="button" className="addButton" onClick={handleAddOrUpdate}>
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </form>
      <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}