const ImageComp = ({ data }) => {
  return (
    <div style={{ textAlign: `${data?.setting?.position}` }}>
      <img
        alt="banner"
        src={data?.content?.url || data?.content?.link}
        className="img-fluid"
      />
    </div>
  );
};

export default ImageComp;
