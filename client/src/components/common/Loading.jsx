import React from 'react'

import loadingImage from '../../assets/loading.svg'

const Loading = () => {
    return (
        <div className='w-full h-screen z-50 absolute top-0 left-0 flex justify-center items-center select-none'>
            <img src={loadingImage} alt="" className='w-20 h-20 object-cover' />
        </div>
    )
}

export default Loading