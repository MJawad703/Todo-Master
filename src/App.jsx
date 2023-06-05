import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Authentication from "./pages/Authentication/Authentication";
import Home from "./pages/Home/Home";
import NavBar from "./components/Navbar/Navbar";
import useTokenStore from "./store/userStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskContainer from "./pages/TaskContainer/TaskContainer";

const queryClient = new QueryClient();

function App() {
  const { token, userId, userName } = useTokenStore();

  console.log({ token, userId, userName });
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <BrowserRouter>
        <NavBar token={token} />
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route
            path="/home"
            element={
              token ? (
                <Home userId={userId} userName={userName} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/board/:boardId/task-containers"
            element={token ? <TaskContainer /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
