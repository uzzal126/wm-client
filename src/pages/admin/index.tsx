import { useRouter } from "next/router";
import { useEffect } from "react";

function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("https://admin.webmanza.com/dashboard");
  }, []);

  return (
    <div className="container text-center">
      <h3>Redirecting ....</h3>
    </div>
  );
}

export default AdminPage;
