import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCareerAsync } from './viewCareersSlice';

const AddCareer = () =>{
    const [formValues, setFormValues] = useState({
        name: '',
        salary: 0,
        timeOfCompletion: 0,
        description: '',
        cost: 0,
        imageUrl: '',
        category: '',
      });
    
      const dispatch = useDispatch();
    
      const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addCareerAsync(formValues));
        setFormValues({
          name: '',
          salary: 0,
          timeOfCompletion: 0,
          description: '',
          cost: 0,
          imageUrl: '',
          category: '',
        });
      };

    
    return(
        <form className='addCareerForm' onSubmit={handleSubmit}>
        <h1>Add New Career</h1>
        <div>
        <label>Name</label>
        <input placeholder = {"name..."} type='text' value= {formValues.name} onChange={(event)=>setFormValues({...formValues, name: event.target.value})}/>
        <label>Salary</label>
        <input type='number' step ='any' value = {formValues.salary} onChange={(event)=>setFormValues({...formValues, salary: event.target.value})}/>
        <label>Time of Completion</label>
        <input type='number' step = 'any' value ={formValues.timeOfCompletion} onChange={(event)=>setFormValues({...formValues, timeOfCompletion: event.target.value})}/>
        <label>Cost</label>
        <input type= 'number' step = 'any' value= {formValues.cost} onChange={(event)=>setFormValues({...formValues, cost: event.target.value})}/>
        <label>Category</label>
        <input placeholder = {'category...'} type= 'text' value = {formValues.category} onChange={(event)=>setFormValues({...formValues, category: event.target.value})}/>
        <label>Image Url</label>
        <input placeholder = {'paste link to picture...'} type = 'text' value= {formValues.imageUrl} onChange={(event)=>setFormValues({...formValues, imageUrl: event.target.value})}/>
        <label>Description</label>
        <textarea placeholder='description...' type = 'text' value= {formValues.description} onChange={(event)=>setFormValues({...formValues, description: event.target.value})}/>
        <button type='submit'>Submit</button>
        </div>
        </form>
    )
}

export default AddCareer