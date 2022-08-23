import React from 'react';
import { observer } from 'mobx-react-lite';
import { Header, Item } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

export default observer(function ActivityList() {
    // bring in activity state
    const { activityStore } = useStore();
    // destructure needed properties from activityStore
    const { groupedActivities } = activityStore;

    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <React.Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    <Item.Group divided>
                        {activities.map(activity => (
                            <ActivityListItem
                                key={activity.id}
                                activity={activity}
                            />
                        ))}
                    </Item.Group>
                </React.Fragment>
            ))}
        </>
    );
});
