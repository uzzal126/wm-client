import SidebarHandler from '../helper/sidebarHandler'

const LeftSidebar = ({data}: {data: any}) => {
  return (
    <div>
      <div className='blog-sidebar'>
        <SidebarHandler data={data} />
      </div>
    </div>
  )
}

export default LeftSidebar
