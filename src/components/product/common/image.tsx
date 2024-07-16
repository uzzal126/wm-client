import Link from 'next/link'
import {Media} from 'reactstrap'

const ImageComponent = ({src}: any) => {
  return (
    <div className='collection-sidebar-banner m-0'>
      <Link href={'#'}>
        <Media src={src || ''} className='img-fluid blur-up lazyload' alt='' />
      </Link>
    </div>
  )
}

export default ImageComponent
