import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

export const Preview = ({ imageUrl, width, height }) => (
  <PhotoProvider>
    <PhotoView src={imageUrl}>
      <img src={imageUrl} width={width} height={height} alt="" />
    </PhotoView>
  </PhotoProvider>
)
