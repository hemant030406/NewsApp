// import React, { Component } from 'react'
import loading from './loading.gif'
import React from 'react'


export default function spinner()  {
    return (
      <div className='text-center'>
       <img src={loading} alt='loading...' style={{backgroundColor:'none',height:'3rem'}} />
      </div>
    )
}

