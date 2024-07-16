import PostLoader from "@/helpers/preloader/PostLoader";
import { Col } from "react-bootstrap";

export default function ShopLoader() {
    return (
        <Col xs="12">
            <div className='row mx-0 margin-default'>
                <div className='col-xl-3 col-lg-4 col-6'>
                    <PostLoader />
                </div>
                <div className='col-xl-3 col-lg-4 col-6'>
                    <PostLoader />
                </div>
                <div className='col-xl-3 col-lg-4 col-6'>
                    <PostLoader />
                </div>
                <div className='col-xl-3 col-lg-4 col-6'>
                    <PostLoader />
                </div>
            </div>
        </Col>
    )
}