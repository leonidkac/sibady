import { NavLink, useLocation } from 'react-router-dom';
import { PAGE_URL_HASH } from './object/PageUrlHash'; 

export default function NavigationDataResponse(){
    const location = useLocation();

    return (
        <ul className="nav">
            {PAGE_URL_HASH.map(el => {
                const isActive = location.search === `?id=${el.index}`;
                return (
                    <li key={el.url}>
                        <NavLink
                            className={isActive ? "active-link" : null}
                            to={`page?id=${el.index}`}>
                            {el.name}
                        </NavLink>
                    </li>
                );
            })}
        </ul>
    );
}
