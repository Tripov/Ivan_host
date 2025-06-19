// *********************
// IN DEVELOPMENT
// *********************

import React from 'react'

const UrgencyText = ({stock} : { stock: number }) => {
  return (
    <p className='text-success text-xl max-[500px]:text-lg'>Hurry up! only <span className='badge badge-success text-white text-xl max-[500px]:text-lg'>{stock}</span> Товары остались на складе!</p>
  )
}

export default UrgencyText