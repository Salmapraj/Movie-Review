import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'


function About() {
const [data,setData] = useState('')
const getdatas= async()=>{
    const res = await axios.get('http://localhost:3000/api/getData')
    setData(res.data)
}

useEffect(()=>{
    getdatas()
},[])
  return (
    <div>{data}</div>
  )
}

export default About