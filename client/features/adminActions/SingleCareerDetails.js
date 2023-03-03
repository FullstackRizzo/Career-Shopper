import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCareerAsync, selectSingleCareer } from "./singleCareerDetailsSlice";
import EditSingleCareer from "./EditSingleCareer";

const SingleCareerDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    
    const singleCareer = useSelector(selectSingleCareer);
    const {name, salary, timeOfCompletion, description, cost, imageUrl, category} = singleCareer;
    useEffect(()=>{
        dispatch(fetchSingleCareerAsync(id));
    }, [dispatch]);

    return(
        <div>
            <h1>{name}</h1>
            <img src={imageUrl} alt={name} />
            <p>{description}</p>
            <p>Salary: ${salary}</p>
            <p>Time of Completion: {timeOfCompletion} years</p>
            <p>Cost: ${cost}</p>
            <p>Category: {category}</p>
            <EditSingleCareer/>
        </div>
    )
}

export default SingleCareerDetails