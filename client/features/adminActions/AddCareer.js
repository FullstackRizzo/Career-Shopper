import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCareerAsync } from './viewCareersSlice';

const AddCareer = () =>{
    const [name, setName] = useState('');
    const [salary, setSalary] = useState(0);
    const [timeOfCompletion, setTimeOfCompletion] = useState(0);
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) =>{
        event.preventDefault()
        dispatch(addCareerAsync({
            name: `${name}`,
            salary: salary,
            timeOfCompletion: timeOfCompletion,
            description: `${description}`,
            cost: cost,
            imageUrl: `${imageUrl}`,
            category: `${category}`
        }))
        setName('')
        setSalary(0)
        setTimeOfCompletion(0)
        setDescription('')
        setCost(0)
        setImageUrl('')
        setCategory('')
    }


    
    return(
        <form className='addCareerForm' onSubmit={handleSubmit}>
        <h1>Add New Career</h1>
        <div>
        <label>Name</label>
        <input placeholder = {"name..."} type='text' value= {name} onChange={ev => setName(ev.target.value)}/>
        <label>Salary</label>
        <input type='number' step ='any' value = {salary} onChange={ev => setSalary(ev.target.value)}/>
        <label>Time of Completion</label>
        <input type='number' step = 'any' value ={timeOfCompletion} onChange={ev => setTimeOfCompletion(ev.target.value)}/>
        <label>Cost</label>
        <input type= 'number' step = 'any' value= {cost} onChange={ev => setCost(ev.target.value)}/>
        <label>Category</label>
        <input placeholder = {'category...'} type= 'text' value = {category} onChange={ev => setCategory(ev.target.value)}/>
        <label>Image Url</label>
        <input placeholder = {'paste link to picture...'} type = 'text' value= {imageUrl} onChange={ev => setImageUrl(ev.target.value)}/>
        <label>Description</label>
        <textarea placeholder='description...' type = 'text' value= {description} onChange={ev => setDescription(ev.target.value)}/>
        <button type='submit'>Submit</button>
        </div>
    </form>
    )
}

export default AddCareer