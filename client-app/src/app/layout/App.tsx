import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
    const location = useLocation();

    return (
        <>
            {/* Only show NavBar if not at the / route */}
            {location.pathname !== '/' && <NavBar />}
            <Container style={{ marginTop: '7em' }}>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/activities' element={<ActivityDashboard />} />
                    <Route
                        path='/activities/:id'
                        element={<ActivityDetails />}
                    />
                    <Route
                        key={`c_${location.key}`}
                        path='/activities/create'
                        element={<ActivityForm />}
                    />
                    <Route
                        key={`m_${location.key}`}
                        path='/activities/manage/:id'
                        element={<ActivityForm />}
                    />
                    {/* <Route key={location.key} path={['/activities/manage/:id', '/activities/create']} element={<ActivityForm />} /> <-- how he did it in the course, doesnt look like RR supports path array anymore */}
                </Routes>
            </Container>
        </>
    );
}

// in order to observe whats going on in the store, we have to make the component an observer
export default observer(App);

/*#region --------------  Notes --------------
  v6 Info and breaking changes
    https://reactrouter.com/docs/en/v6/upgrading/v5
    React Router is a library that allows us to create a navigation system that allows us to navigate between pages.
    
    - <Route exact> is gone. Instead, routes with descendant routes (defined in other components) use a trailing * in their path to indicate they match deeply
#endregion -----------  Notes --------------
*/
