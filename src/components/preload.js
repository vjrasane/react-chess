import React from 'react'

const Preload = ({ images }) => (
  <div className="preload">
    {images.map((i, n) => (
      <img
        src={ i }
        key={ n }
        alt="" />
    ))}
  </div>
)

export default Preload