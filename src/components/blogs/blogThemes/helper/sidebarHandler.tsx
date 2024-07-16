import SidebarRender from "../../sidebars/sidebarRender";

const SidebarHandler = ({ data }: { data: any }) => {
  return <SidebarRender data={data?.list} />;
};

export default SidebarHandler;
