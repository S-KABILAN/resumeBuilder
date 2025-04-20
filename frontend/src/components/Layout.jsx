import Sidebar from "./ui/sidebar";
import Footer from "./ui/footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
