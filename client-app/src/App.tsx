import React from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(res => {
        setActivities(res.data);
      }).catch(err => {
        console.log(err);
      });

      return () => {}

  } , []);

  // console.log(activities);
  return (
    <React.Fragment>
      <Header as='h2' icon='users' content='Activities' />

      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </React.Fragment>
  );
}

export default App;
