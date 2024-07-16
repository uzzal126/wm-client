import { getAuth } from "@/helpers/auth/AuthHelper";
import { PRODUCT_REVIEW } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { getThumbnail } from "../../helpers/misc";

const ReviewSubmit = ({ data, user }: { data: any; user: any }) => {
  const router = useRouter();
  const [hoverRating, setHoverRating] = useState(0);
  const attr_id = router?.query?.key;
  const customer = getAuth();
  const queryParams = useSearchParams();
  const productComment = queryParams.get("comment");
  const productRating = queryParams.get("rating");
  const [comment, setComment] = useState(productComment);
  const [rating, setRating] = useState(productRating);

  const getAttrIndx = (item: any, attr_id: any) => {
    if (!item || !attr_id) {
      return null;
    }
    if (Array.isArray(item?.variants)) {
      for (let i = 0; i < item?.variants.length; i++) {
        if (item?.variants[i]?.id == attr_id) {
          return i;
        }
      }
    }
    return null;
  };

  const key = getAttrIndx(data, attr_id) || 0;

  const handleRatingClick = (newRating: any) => {
    setRating(newRating);
  };

  const handleRatingHover = (newHoverRating: any) => {
    setHoverRating(newHoverRating);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await queryRequest(PRODUCT_REVIEW, {
      customer_details: {
        customer_id: customer?.id,
        name: user?.name,
        email: user?.email,
      },
      review_details: {
        product_id: data?.id,
        rating: rating,
        message: comment,
      },
    });

    if (res?.success) {
      toast.success(res?.message);
      router.push("/account/profile");
    }
  };

  return (
    <div className="review-submit-container">
      <h5>Rate and review purchased product:</h5>
      <div className={`d-flex`}>
        <div className={`mr-3`}>
          <img
            src={
              (Array.isArray(data?.variants) &&
                data?.variants?.length > 0 &&
                data?.variants[key]?.thumbnail) ||
              getThumbnail(data)
            }
            height={75}
            width={75}
          />
        </div>
        <div>
          <h4>{data?.name}</h4>
          {Array.isArray(data?.variants) &&
            data?.variants?.length > 1 &&
            key >= 0 && (
              <>
                {data?.variants[key]?.option1 &&
                  data?.variants[key]?.value1 && (
                    <span
                      style={{
                        display: "block",
                      }}
                    >{`${data?.variants[key]?.option1} : ${data?.variants[key]?.value1}`}</span>
                  )}
                {data?.variants[key]?.option2 &&
                  data?.variants[key]?.value2 && (
                    <span
                      style={{
                        display: "block",
                      }}
                    >{`${data?.variants[key]?.option2} : ${data?.variants[key]?.value2}`}</span>
                  )}
                {data?.variants[key]?.option3 &&
                  data?.variants[key]?.value3 && (
                    <span
                      style={{
                        display: "block",
                      }}
                    >{`${data?.variants[key]?.option3} : ${data?.variants[key]?.value3}`}</span>
                  )}
              </>
            )}
        </div>
      </div>
      <div className="rating-container py-2">
        {[...Array(5)].map((_, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => handleRatingClick(ratingValue)}
                style={{ display: "none" }}
              />
              <FaStar
                className="star"
                color={
                  ratingValue <= (hoverRating || Number(rating))
                    ? "#ffc107"
                    : "#e4e5e9"
                }
                size={30}
                onMouseEnter={() => handleRatingHover(ratingValue)}
                onMouseLeave={() => handleRatingHover(0)}
              />
            </label>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            name="comment"
            value={comment ?? ""}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewSubmit;
