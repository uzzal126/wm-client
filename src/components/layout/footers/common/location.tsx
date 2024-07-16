import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useSelector } from "react-redux";

const Location = ({ id, locationList }: any) => {
  let storeData = useSelector(selectStoreData);
  const { data } = storeData;
  let locations = data?.locations;
  let location = locations?.filter((f: any) => f.id === id);

  if (!location) return <></>;

  return (
    location &&
    location?.length > 0 &&
    (!locationList ? (
      <ul className="contact-list">
        <li>
          <i className="fa fa-map-marker"></i>
          {location[0]?.address}
        </li>
        <li>
          <i className="fa fa-phone"></i> {location[0]?.mobile}
        </li>
        <li>
          <i className="fa fa-envelope"></i> {location[0]?.email}
        </li>
      </ul>
    ) : (
      <ul className="contact-details">
        <li>{location[0]?.address}</li>
        <li>
          Call Us:{" "}
          <a href={`phone:${location[0]?.mobile}`}>{location[0]?.mobile}</a>
        </li>
        <li>
          Email Us:{" "}
          <a href={`mailto:${location[0]?.email}`}>{location[0]?.email}</a>
        </li>
      </ul>
    ))
  );
};

export default Location;
