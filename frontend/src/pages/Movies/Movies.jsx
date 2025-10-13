import React from 'react'
import { getMovies } from '../../api/tmdbapi'

import { useEffect } from 'react'
function Movies() {

    useEffect(()=>{
           const data= getMovies()
    },[])
  return (
    <>
    <div>
        
        Movies</div></>
  )
}

export default Movies