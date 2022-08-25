/****************************************
 * This is essentially what individual reducers are in Redux.
 ****************************************/

import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Activity } from '../models/activity';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';

export default class ActivityStore {
    //#region properties
    activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false; // changed from false to true to fix the flickering issue. see loadActivities() for other change. Changed back in section 11.
    //#endregion properties

    //#region constructor
    // easy way to make this observable (if everything in this class should be observable)
    constructor() {
        makeAutoObservable(this);
    }
    // another way to make observables (individually)
    // constructor() {
    //     makeObservable(this, {
    //         title: observable,
    //         setTitle: action
    //     })
    // }
    //#endregion constructor

    //#region helper methods
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => a.date!.getTime() - b.date!.getTime()
        );
    }

    //group activities by date
    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date]
                    ? [...activities[date], activity]
                    : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] })
        );
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    };

    private setActivity = (activity: Activity) => {
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    };
    //#endregion helper methods

    //#region Actions / Methods / Functions (if CRUD, make async)
    //#region CRUD
    // an action (a function that can that changes the state of the store)
    loadActivities = async () => {
        this.setLoadingInitial(true);

        // non-async code should be outside of the try/catch block
        try {
            //any async code that you want to run
            const activities = await agent.Activities.list();
            // runInAction(() => {
            // ******DIFF BETWEEN MOBX AND REDUX******
            // mutate the state of the store here. Which is OKAY in mobx, but an anti-pattern in redux.
            activities.forEach(activity => {
                // this.activities.push(activity);
                this.setActivity(activity);
            });

            this.setLoadingInitial(false);
            // })
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                });
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    };

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                // this.activities.push(activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                // this.activities =  [...this.activities.filter(a => a.id !== activity.id), activity];
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                // this.activities = [...this.activities.filter(a => a.id !== id)];
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
    //#endregion CRUD

    // [MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: ActivityStore@1.loadingInitial
    // to avoid the above warning, make setLoading it's own action so we dont have to use runInAction every time we want to update the loading state
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };
    //#endregion Actions
}
