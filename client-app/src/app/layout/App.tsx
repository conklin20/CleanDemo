import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import HomePage from '../../features/home/HomePage';
import NavBar from './NavBar';

function App() {
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/' && <NavBar />}
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='activities/*' element={<ActivityRoutes />} />
            </Routes>
        </>
    );
}

// Routes inside the main/body of the app
function ActivityRoutes() {
    return (
        <Container style={{ marginTop: '7em' }}>
            <Routes>
                <Route index element={<ActivityDashboard />} />
                <Route path=':id' element={<ActivityDetails />} />
                <Route path=':id/edit' element={<ActivityForm />} />
                <Route path='create' element={<ActivityForm />} />
            </Routes>
        </Container>
    );
}

// in order to observe whats going on in the store, we have to make the component an observer
export default observer(App);