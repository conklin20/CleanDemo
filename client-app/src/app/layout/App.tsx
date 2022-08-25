import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import HomePage from '../../features/home/HomePage';
import NavBar from './NavBar';
import NotFound from '../../features/errors/NotFound';
import TestErrors from '../../features/errors/TestError';
import ServerError from '../../features/errors/ServerError';

function App() {
    const location = useLocation();
    const atRoot = location.pathname === '/';
    
    return (
        <>
            <ToastContainer
                position='bottom-right'
                hideProgressBar
                theme='colored'
            />
            {!atRoot && <NavBar />}
            <Container style={{ marginTop: atRoot ? 0 : '7em', width: atRoot ? '100%' : '80vw' }}>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/activities'>
                        <Route index element={<ActivityDashboard />} />
                        <Route path=':id' element={<ActivityDetails />} />
                        <Route path=':id/edit' element={<ActivityForm />} />
                        <Route path='create' element={<ActivityForm />} />
                    </Route>
                    <Route path='/tests'>
                        <Route index element={<TestErrors />} />
                        <Route path='errors' element={<TestErrors />} />
                    </Route>
                    <Route path='/server-error' element={<ServerError />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Container>
        </>
    );
}

// in order to observe whats going on in the store, we have to make the component an observer
export default observer(App);
