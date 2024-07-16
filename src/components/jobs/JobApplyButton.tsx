import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

type Props = {
  user: any;
  setShow: any;
  setShowLogin: any;
  disabled?: boolean;
};

function JobApplyButton({
  user,
  setShow,
  setShowLogin,
  disabled = false,
}: Props) {
  const queryParams = useSearchParams();
  const applied: any = queryParams.get("applied");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
  return (
    <Button
      variant="success"
      className="px-4 ml-0 ml-lg-auto"
      style={{ textTransform: "none", borderRadius: 5 }}
      disabled={applied || disabled}
      onClick={() => {
        if (user) {
          setShow(true);
        }
        if (!user) {
          setShowLogin(true);
        }
      }}
    >
      {user ? (!applied ? "Apply Now !" : "Already Applied") : "Apply Now !"}
    </Button>
  );
}

export default JobApplyButton;
