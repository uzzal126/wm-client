import SliderComponent2 from "../Collections/slider/Slider2"

const GalleryHandler = ({ data }: any) => {
    return (
        <>
            <SliderComponent2 data={data} sectionClass='border-section small-section' />
        </>
    )
}

export default GalleryHandler