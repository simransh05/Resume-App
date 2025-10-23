import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Form.css'

function Create() {
    const navigate = useNavigate();
    
    return (
        <div className='container'>
            <h3 className='data'>Name: </h3>
            <h3 className='data'>Email: </h3>
            <h3 className='data'>Phone: </h3>
            <h3 className='data'>Summary: </h3>
            <h3 className='data'>Education:</h3>
            <h3 className='data'>Skills: </h3>
            <h3 className='data'>Projects: </h3>
            <h3 className='data'>Experience: </h3>
            <h3 className='data'>Date Of Birth:</h3>
            <button onClick={()=>navigate("/form")} className='btnCreate'>Create Resume</button>
        </div>
    )
}

export default Create
