import { youtube_parser } from "@/helpers/misc";
import EditorComp from "../components/editor";
import ImageComp from "../components/image";

const CompHelper = ({ data }) => {
  return (
    <>
      {data?.type === "editor" && <EditorComp data={data?.body} />}
      {data?.type === "image" && <ImageComp data={data?.body} />}

      {data?.type === "map" && (
        <span
          className="map-iframe-container"
          dangerouslySetInnerHTML={{ __html: data.body.content.url }}
        ></span>
      )}
      {data?.type === "video" && (
        <span className="video-iframe-container">
          <iframe
            src={`https://youtube.com/embed/${youtube_parser(
              data.body.content.url
            )}`}
            allowFullScreen
            width="100%"
            height="500px"
          ></iframe>
        </span>
      )}
      {data?.type === "accordion" && (
        <div className="card p-4 mb-4">
          {data.body.content?.accordions?.map((item, index) => (
            <div className="mb-4" key={index}>
              <h4>{item.title}</h4>
              <p className="p-0 pl-3">{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CompHelper;
