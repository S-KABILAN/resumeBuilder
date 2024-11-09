import Sidebar from "./ui/sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1">{children}</div>
    </div>
  );
};

export default Layout;
