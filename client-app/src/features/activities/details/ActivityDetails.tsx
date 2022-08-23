import { observer } from 'mobx-react-lite';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailChat from './ActivityDetailChat';
import ActivityDetailHeader from './ActivityDetailHeader';
import ActivityDetailInfo from './ActivityDetailInfo';


export default observer( function ActivityDetails() {
    
    // bring in activity state
    const { activityStore } = useStore();
    // destructure needed properties from activityStore
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    // get id from params
    const { id } = useParams<{id: string}>();
    // const { id } = useParams(); // same as above, evidently dont need specifying type for useParams

    React.useEffect(() => {
        if(id) loadActivity(id);
    } , [loadActivity, id]);

    // workaround to remove ts errors as we will never render this form if there is no selected activity (logic in ActivityDashboard)
    if(loadingInitial || !activity) return <LoadingComponent />;
    
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailHeader activity={activity} />
                <ActivityDetailInfo activity={activity} />
                <ActivityDetailChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailHeader activity={activity} />
            </Grid.Column>
        </Grid>
    )
})