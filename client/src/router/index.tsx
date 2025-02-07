import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import ErrorPage from "../pages/error-page/error-page.tsx";
import MainPage from "../pages/main-page/MainPage.tsx"
import LoginPage from "../pages/login-page/LoginPage.tsx";
import RegistrationPage from "../pages/registration-page/RegistrationPage.tsx";
import ProfilePage from "../pages/profile-page/ProfilePage.tsx";
import ArticlePage from "../pages/article-page/ArticlePage.tsx";
import ArticleAdd from "../pages/article-add/ArticleAdd.tsx";
import ArticleEdit from "../pages/article-edit/ArticleEdit.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index:true,
                element: <MainPage/>
            },
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/registration',
                element: <RegistrationPage/>
            },
            {
                path: '/profile',
                element: <ProfilePage/>
            },
            {
                path: '/article/:id',
                element: <ArticlePage/>
            },
            {
                path: '/article-add',
                element: <ArticleAdd/>
            },
            {
                path: '/article-edit/:id',
                element: <ArticleEdit/>
            },
        ]
    }
])

export default router