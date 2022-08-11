import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  //bring in (destructure) activity store using our custom 'store' hook
  const { activityStore } = useStore();

  React.useEffect(() => {
    activityStore.loadActivities();

  }, [activityStore])


  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />;

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard />
      </Container>

    </>
  );
}

// in order to observe whats going on in the store, we have to make the component an observer
export default observer(App);
