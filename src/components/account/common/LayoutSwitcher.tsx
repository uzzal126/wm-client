import { TbRectangleVertical, TbRectangleVerticalFilled } from "react-icons/tb";
type Props = {
  setLayout: any;
  value?: any;
};
function LayoutSwitcher({ setLayout, value }: Props) {
  return (
    <ul>
      <li onClick={() => setLayout("col-lg-6")} style={{ cursor: "pointer" }}>
        {value === "col-lg-6" ? (
          <>
            <TbRectangleVerticalFilled color="var(--theme-deafult)" />
            <TbRectangleVerticalFilled
              color="var(--theme-deafult)"
              style={{ marginLeft: "-2" }}
            />
          </>
        ) : (
          <>
            <TbRectangleVertical color="#343434" />
            <TbRectangleVertical color="#343434" style={{ marginLeft: "-2" }} />
          </>
        )}
      </li>
      <li onClick={() => setLayout("col-lg-4")} style={{ cursor: "pointer" }}>
        {value === "col-lg-4" ? (
          <>
            <TbRectangleVerticalFilled color="var(--theme-deafult)" />
            <TbRectangleVerticalFilled
              color="var(--theme-deafult)"
              style={{ marginLeft: "-2" }}
            />
            <TbRectangleVerticalFilled
              color="var(--theme-deafult)"
              style={{ marginLeft: "-2" }}
            />
          </>
        ) : (
          <>
            <TbRectangleVertical color="#343434" />
            <TbRectangleVertical color="#343434" style={{ marginLeft: "-2" }} />
            <TbRectangleVertical color="#343434" style={{ marginLeft: "-2" }} />
          </>
        )}
      </li>
      <li onClick={() => setLayout("col-lg-3")} style={{ cursor: "pointer" }}>
        {value === "col-lg-3" || value === "col-xl-3 col-6 col-grid-box" ? (
          <>
            <TbRectangleVerticalFilled color="var(--theme-deafult)" />
            <TbRectangleVerticalFilled
              color="var(--theme-deafult)"
              style={{ marginLeft: "-2" }}
            />
            <TbRectangleVerticalFilled
              color="var(--theme-deafult)"
              style={{ marginLeft: "-2" }}
            />
            <TbRectangleVerticalFilled
              color="var(--theme-deafult)"
              style={{ marginLeft: "-2" }}
            />
          </>
        ) : (
          <>
            <TbRectangleVertical color="#343434" />
            <TbRectangleVertical color="#343434" style={{ marginLeft: "-2" }} />
            <TbRectangleVertical color="#343434" style={{ marginLeft: "-2" }} />
            <TbRectangleVertical color="#343434" style={{ marginLeft: "-2" }} />
          </>
        )}
      </li>
      <li onClick={() => setLayout("col-lg-2")} style={{ cursor: "pointer" }}>
        {value === "col-lg-2" || value === "col-xl-2 col-6 col-grid-box" ? (
          <>
            <TbRectangleVerticalFilled color="var(--theme-deafult)" />
            <TbRectangleVerticalFilled
              color="var(--theme-deafult)"
              style={{ marginLeft: "-2" }}
            />
            <TbRectangleVerticalFilled
              color="var(--theme-deafult)"
              style={{ marginLeft: "-2" }}
            />
            <TbRectangleVerticalFilled
              color="var(--theme-deafult)"
              style={{ marginLeft: "-2" }}
            />
            <TbRectangleVerticalFilled
              color="var(--theme-deafult)"
              style={{ marginLeft: "-2" }}
            />
            <TbRectangleVerticalFilled
              color="var(--theme-deafult)"
              style={{ marginLeft: "-2" }}
            />
          </>
        ) : (
          <>
            <TbRectangleVertical color="#343434" />
            <TbRectangleVertical color="#343434" style={{ marginLeft: "-2" }} />
            <TbRectangleVertical color="#343434" style={{ marginLeft: "-2" }} />
            <TbRectangleVertical color="#343434" style={{ marginLeft: "-2" }} />
            <TbRectangleVertical color="#343434" style={{ marginLeft: "-2" }} />
            <TbRectangleVertical color="#343434" style={{ marginLeft: "-2" }} />
          </>
        )}
      </li>
    </ul>
  );
}

export default LayoutSwitcher;
