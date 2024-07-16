import NavBar from "./navbar";

const NavbarHandler = ({ data }: any) => {
  return (
    <div>
      <div className="main-navbar">
        <div id="mainnav">
          <NavBar data={data} />
        </div>
      </div>
    </div>
  );
};

export default NavbarHandler;
