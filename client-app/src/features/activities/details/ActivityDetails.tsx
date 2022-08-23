import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';


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
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button as={Link} to={`/activities/manage/${activity.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to='/activities' basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})