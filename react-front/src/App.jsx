import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostList from "./pages/PostList";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Front from "./pages/Front";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import EditStudent from './pages/EditStudent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Front />} />

        <Route path="/postlist" element={<PostList />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/edit/:id" element={<EditPost />} />

        <Route path="/studentlist" element={<StudentList />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/editstudent/:id" element={<EditStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
