import Layout from "@/components/layouts/Layout";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Layout>
      <main className="p-10">
        <Outlet />
      </main>
    </Layout>
  );
}

export default App;