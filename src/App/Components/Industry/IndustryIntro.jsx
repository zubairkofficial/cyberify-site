import React from 'react'
import jsonData from './dummycontent'

const IndustryIntro = ({heroHeading,heroDescription}) => {
    const descriptionParts = heroDescription.split("\n");
  return (
    <div className='industry-margin'>
        <h3 className='my-2'>{heroHeading}</h3>
        {descriptionParts.map(description => (
            <p className='industry-para'>{description}</p>
        ))}
    </div>
  )
}

export default IndustryIntro