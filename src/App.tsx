import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import FirstPage from "./components/firstPage";
import ChapterPage from "./components/chapterPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <FirstPage />,
    },
    {
        path: "/chapter/:id",
        element: <ChapterPage />,
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
