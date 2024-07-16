import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Nav, SplitButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import { linkHandler, list_to_tree } from "../../../../../helpers/misc";
import { selectStoreData } from "../../../../../redux-handler/reducers/storeDataReducer";

type Props = {
  item: any;
  setShow?: any;
};

const MenuChild = ({ item, setShow }: Props) => {
  const router = useRouter();
  let { menu_all } = useSelector(selectStoreData);
  const allMenus = menu_all?.length > 0 ? menu_all : [];

  return (
    <SplitButton
      title={item.text}
      id={`NavbarDropdown-${item.id}`}
      href={linkHandler(item, allMenus)}
      as="a"
      variant="nav-link"
    >
      {item.children.map((subitem: any, j: number) => (
        <Fragment key={j}>
          {subitem.children && subitem.children.length > 0 ? (
            <MenuChild item={subitem} />
          ) : (
            <Link
              href={
                subitem.custom ? subitem.path : linkHandler(subitem, allMenus)
              }
              className={`${
                router.asPath.includes(subitem.path) ? "active" : ""
              } nav-link`}
              target={subitem.target || "_self"}
              onClick={() => setShow(false)}
            >
              {subitem.text}
            </Link>
          )}
        </Fragment>
      ))}
    </SplitButton>
  );
};

type TypeMainMenu = {
  data: any;
  setShow?: any;
};

const MainMenu = ({ data, setShow }: TypeMainMenu) => {
  const router = useRouter();
  let storeData = useSelector(selectStoreData);
  const { menu_all } = storeData;
  const allMenus = menu_all?.length > 0 ? menu_all : [];
  const menuList = list_to_tree(data);

  return (
    <div>
      <Nav className="d-flex flex-column justify-content-end flex-grow-1 pe-3">
        {menuList &&
          menuList.length > 0 &&
          menuList.map((item, i) => (
            <Fragment key={i}>
              {item.children && item.children.length > 0 ? (
                <MenuChild item={item} setShow={setShow} />
              ) : item.custom ? (
                <Link
                  href={item.path}
                  className={`${
                    router.pathname === item.url ? "active" : ""
                  } nav-link`}
                  target={item.target || "_self"}
                  onClick={() => setShow(false)}
                >
                  {item.text}
                </Link>
              ) : (
                <Link
                  href={linkHandler(item, allMenus)}
                  className={`${
                    router.pathname === item.url ? "active" : ""
                  } nav-link`}
                  onClick={() => setShow(false)}
                >
                  {item.text}
                </Link>
              )}
            </Fragment>
          ))}
      </Nav>
    </div>
  );
};

export default MainMenu;
