import clsx from "clsx";

type Props = {
  pagination: any;
  loading?: any;
  onChange: any;
};

function ClientPagination({ pagination, onChange, loading }: Props) {
  return (
    <div className="d-flex flex-column align-items-center py-5">
      <ul className="pagination">
        {pagination?.links?.map((link: any, i: any) => (
          <li
            key={`${link.label}d-${i}`}
            className={clsx("page-item", {
              active: link.active,
              disabled: loading,
              previous: link.label === "&laquo; Previous",
              next: link.label === "Next &raquo;",
            })}
          >
            {link.label === "..." ? (
              <span
                className={`page-link `}
                style={{ cursor: "pointer" }}
                dangerouslySetInnerHTML={{ __html: link.label }}
                onClick={() => onChange && onChange(link)}
              />
            ) : (
              <span
                className={`page-link`}
                style={{ cursor: "pointer" }}
                dangerouslySetInnerHTML={{ __html: link.label }}
                onClick={() => onChange && onChange(link)}
              ></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientPagination;
