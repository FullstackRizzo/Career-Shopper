import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editSingleCareerAsync } from "./singleCareerDetailsSlice";

const EditSingleCareer = () =>{
    const dispatch = useDispatch();
    const {id} = useParams();
    const [name, setName] = useState('');
    const [salary, setSalary] = useState(0);
    const [timeOfCompletion, setTimeOfCompletion] = useState(0);
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async(event)=>{
        event.preventDefault();
        await dispatch(editSingleCareerAsync({id, name, salary, timeOfCompletion, description, cost, imageUrl, category}))
        setName('')
        setSalary(0)
        setTimeOfCompletion(0)
        setDescription('')
        setCost(0)
        setImageUrl('')
        setCategory('')
    }
    return(
        <form className='EditCareerForm' onSubmit={handleSubmit}>
            <h1>Edit Career</h1>
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

export default EditSingleCareer