import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import MyDate from '../../../app/common/form/MyDate';
import MySelect from '../../../app/common/form/MySelect';
import MyText from '../../../app/common/form/MyText';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityForm() {
    const navigate = useNavigate();
    const { activityStore } = useStore();
    const {
        createActivity,
        updateActivity,
        loading,
        loadActivity,
        loadingInitial,
    } = activityStore;
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: '',
    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        } else {
            // wasnt necessary in the course, but I wasnt able to get the form to clear otherwise (the key prop being set in App.tsx was supposed to handle this)
            setActivity({
                id: '',
                title: '',
                category: '',
                description: '',
                date: null,
                city: '',
                venue: '',
            });
        }
    }, [id, loadActivity]);

    const validationSchema = Yup.object({
        title: Yup.string().required(),
        category: Yup.string().required(),
        description: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(), // specify the error message for a cleaner error message
        city: Yup.string().required(),
        venue: Yup.string().required(),
    });

    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid(),
            };
            createActivity(newActivity).then(() =>
                navigate(`/activities/${newActivity.id}`)
            );
        } else {
            updateActivity(activity).then(() =>
                navigate(`/activities/${activity.id}`)
            );
        }
    }

    if (loadingInitial)
        return <LoadingComponent content='Loading activity...' />;

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                    <Form
                        className='ui form'
                        onSubmit={handleSubmit}
                        autoComplete='off'
                    >
                        <MyText name='title' placeholder='Title' />
                        <MyTextArea
                            name='description'
                            placeholder='Description'
                            rows={3}
                        />
                        <MySelect
                            name='category'
                            placeholder='Category'
                            options={categoryOptions}
                        />
                        <MyDate
                            name='date'
                            placeholderText='Date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyText name='city' placeholder='City' />
                        <MyText name='venue' placeholder='Venue' />
                        <Button
                            disabled={!dirty || !isValid || isSubmitting}
                            loading={loading}
                            floated='right'
                            positive
                            type='submit'
                            content='Submit'
                        />
                        <Button
                            as={Link}
                            to='/activities'
                            floated='right'
                            type='button'
                            content='Cancel'
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
});
