import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: JSX.Element }) => {
  const session = await getServerSession();
  if (!session) redirect("/auth");
  return children;
};
export default Layout;
