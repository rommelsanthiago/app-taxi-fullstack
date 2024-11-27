import { Routes, Route, useLocation } from 'react-router-dom';

import TravelRequest from '../pages/TravelRequest';
import TravelOptions from '../pages/TravelOptions';

const Routers = () => {
    const location = useLocation();

    return (
        <Routes location={location} key={location.key}>
            <Route index element={ <TravelRequest /> } ></Route>
            <Route path='motoristas' element={ <TravelOptions /> } />
        </Routes>
    )
}

export default Routers;