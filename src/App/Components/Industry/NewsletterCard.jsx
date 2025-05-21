import React from 'react'

const NewsletterCard = () => {
  return (
    <div>
        <div className='p-4 industry-newsletter-card mr-4' >
            <h4 className=''>Interested in AI Solutions for Your Business?</h4>
            <p className='my-2'>Sign Up for Our Newsletter <br/>
            Be the First to Know About Our Latest Updates!</p>
            <input type="email" className='mt-3 mb-3' name="newsletterEmail" id="" placeholder='Enter your email'/>
            <button className='px-4 py-2' type='submit'>Join</button>
        </div>
    </div>
  )
}

export default NewsletterCard
