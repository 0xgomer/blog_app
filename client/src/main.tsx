import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {store} from "./store";
import router from "./router";
import './styles/fonts.scss'
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>,
)
