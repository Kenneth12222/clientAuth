import React from 'react'
import ImageUpload from '../components/ImageModel/ImageUpload'
import PublicGallery from '../components/ImageModel/PublicGallery'
import UserGallery from '../components/ImageModel/UserGallery'

function HomePage() {
  return (
    <div>
      <ImageUpload />
      <PublicGallery />
      <UserGallery />
    </div>
  )
}

export default HomePage
