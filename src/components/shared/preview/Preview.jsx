import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

export const Preview = ({ imageUrl, width }) => (
  <PhotoProvider>
    <PhotoView src={imageUrl}>
      <img src={imageUrl} width={width || 200} alt="" />
    </PhotoView>
  </PhotoProvider>
)
