import ImageComponent from '@/components/product/common/image';
import Service from '@/components/product/common/service';
import { objectSortByKey } from '@/helpers/misc';
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useSelector } from 'react-redux';
// import FilterPage from '@/components/shop/common/filter';
import AboutMe from '@/components/common/AboutMe/AboutMe';
import NewProduct from '@/components/product/common/newProduct';
import PostCategory from '../blogThemes/postCategory';
import RecentPost from '../blogThemes/recentPost';


const SidebarRender = ({ data }: { data: any }) => {
  let storeData = useSelector(selectStoreData);
  const sectionKey = storeData?.sectionKey;

  const sidebar: any = objectSortByKey(data)

  return (
    <div
      className='d-flex flex-column'
      style={{
        gap: '1.5rem',
      }}
    >
      {sectionKey && sidebar && Object.keys(sidebar).length > 0 ? (
        Object.keys(sidebar).map((key, i) => {
          let keySplit = key.split('_')

          return (
            <div key={i}>
              {keySplit[0] === sectionKey.TEXT && (
                <div className='collection-filter-block p-3  m-0'>
                  <div dangerouslySetInnerHTML={{ __html: sidebar[key].content }}></div>
                </div>
              )}
              {keySplit[0] === sectionKey.IMAGE && (
                <div className='m-0 rounded overflow-hidden'>
                  <ImageComponent src={sidebar[key].url} />
                </div>
              )}
              {/* {keySplit[0] === sectionKey.FILTER && <FilterPage />} */}
              {keySplit[0] === sectionKey.SERVICE && <Service />}
              {keySplit[0] === sectionKey.PRODUCTGRID && <NewProduct />}
              {keySplit[0] === sectionKey.RECENTPOST && <RecentPost data={sidebar[key]} />}
              {keySplit[0] === sectionKey.BLOGCATEGORY && <PostCategory data={sidebar[key]} />}
              {keySplit[0] === sectionKey.ABOUTME && <AboutMe data={sidebar[key]} />}
            </div>
          )
        })
      ) : (
        <div>Configure your sidebar</div>
      )}
    </div>
  )
}

export default SidebarRender
