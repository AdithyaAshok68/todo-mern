import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoAdd from "../pages/TodoAdd";
import TodoEdit from "../pages/TodoEdit";
import TodoList from "../pages/TodoList";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <div className="relative bg-white h-screen ">
          <div className="">
            <Routes>
              <Route path="/">
                <Route index element={<TodoList />} />
                <Route path="add" element={<TodoAdd />} />
                <Route path="edit/:id" element={<TodoEdit />} />

              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
