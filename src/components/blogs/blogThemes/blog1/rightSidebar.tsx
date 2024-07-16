import SidebarHandler from '../helper/sidebarHandler'

const RightSidebar = ({data}: {data: any}) => {
  // console.log('data-right', data)
  return (
    <div>
      <div className='blog-sidebar'>
        <SidebarHandler data={data} />
      </div>
    </div>
  )
}

export default RightSidebar
