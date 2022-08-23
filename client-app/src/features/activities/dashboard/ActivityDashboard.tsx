import React from 'react';
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

export default observer (function ActivityDashboard() {

    // bring in activity state
    const { activityStore } = useStore();
    // destructure needed properties from activityStore
    const {loadActivities, activityRegistry} = activityStore;
   
    React.useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
      }, [activityRegistry.size, loadActivities])
    
      if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
  

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})