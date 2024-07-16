import React from 'react'

const ImageComp = ({data}) => {
  return (
    <div>
      <img alt='' src={data?.content?.url} className='img-fluid' />
    </div>
  )
}

export default ImageComp
