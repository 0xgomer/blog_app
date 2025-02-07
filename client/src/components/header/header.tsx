import {FC} from "react";
import Logo from '../../assets/icons/logo.svg';
import './header.scss'
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {logoutUser} from "../../store/slices/userReducer.ts";

const Header:FC = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state)

    return (
        <header className={'header'}>
           <div className="container">
               <Link to={'/'}><Logo/></Link>

               <div className="header__btns">
                   {user.isLogin ? <>
                           <button className={'primary'}><Link to={'/article-add'}>Add article</Link></button>
                           <button><Link to={'/profile'}>Profile</Link></button>
                           <button onClick={() => dispatch(logoutUser())}>Exit</button>
                       </>
                       :
                       <>
                           <button className={'primary'}><Link to={'/registration'}>Sign In</Link></button>
                           <button><Link to={'/login'}>Log In</Link></button>
                       </>
                   }
               </div>
           </div>
        </header>
    );
};

export default Header;