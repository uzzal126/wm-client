import clsx from "clsx";
import Link from "next/link";

type Props = {
  pagination: any;
  loading?: any;
  prefix: string | number;
};

function CustomPagination({ pagination, loading, prefix }: Props) {
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
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ) : (
              <Link
                href={`/${prefix}${link.url}`}
                className={`page-link ${
                  link.label === "&laquo; Previous" ||
                  link.label === "Next &raquo;"
                    ? "page-text"
                    : ""
                }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
                style={{ cursor: "pointer" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomPagination;
