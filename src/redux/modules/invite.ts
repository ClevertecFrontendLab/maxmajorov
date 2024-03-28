import { ApplicationState } from '@redux/configure-store';
import { Invite, UserJointTrainigList } from '@redux/types/invite.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from 'src/types/nullable';

export type InviteState = {
    inviteList: Invite[];
    selectedUser: UserJointTrainigList;
    jointTrainingList: UserJointTrainigList[];
    acceptedUsersList: UserJointTrainigList[];
};

export const initialState: InviteState = {
    inviteList: [],
    selectedUser: {} as UserJointTrainigList,
    jointTrainingList: [],
    acceptedUsersList: [],
};

export const inviteSlice = createSlice({
    name: 'invite',
    initialState,
    reducers: {
        setInviteList(state, { payload: inviteList }: PayloadAction<Invite[]>) {
            state.inviteList = inviteList;
        },
        setSelectedUser(state, { payload: selectedUser }: PayloadAction<UserJointTrainigList>) {
            state.selectedUser = selectedUser;
        },
        addPartner(state, { payload: partner }: PayloadAction<UserJointTrainigList>) {
            // eslint-disable-next-line
            state.acceptedUsersList = [ ...state.acceptedUsersList, partner];
        },
        removeInvite(state, { payload: id }: PayloadAction<string>) {
            // eslint-disable-next-line
            state.inviteList = state.inviteList.filter((invite) => invite._id !== id);
        },
        setUserJointTraining(state, { payload: jointTrainingList }) {
            state.jointTrainingList = jointTrainingList;
        },
        setAcceptedUsersList(
            state,
            { payload: acceptedList }: PayloadAction<UserJointTrainigList[]>,
        ) {
            state.acceptedUsersList = acceptedList;
        },
        setJointTrainingStatus(
            state,
            { payload: { id, status } }: PayloadAction<{ id: string; status: string }>,
        ) {
            state.jointTrainingList = state.jointTrainingList.map(el => el.id === id ? { ...el, status } : el);
        },
        removeJointTraining(
            state,
            { payload: { inviteId } }: PayloadAction<{ inviteId: Nullable<string>}>,
        ) {
            state.acceptedUsersList = state.acceptedUsersList.filter(el => el.inviteId !== inviteId);
        },
    },
});

export const inviteListSelector = (state: ApplicationState) => state.invite.inviteList;
export const selectedUserSelector = (state: ApplicationState) => state.invite.selectedUser;
export const jointTrainingListSelector = (state: ApplicationState) =>
    state.invite.jointTrainingList;
export const acceptedUsersListSelector = (state: ApplicationState) =>
    state.invite.acceptedUsersList;

export const {
    setInviteList,
    addPartner,
    removeInvite,
    setAcceptedUsersList,
    setUserJointTraining,
    setSelectedUser,
    setJointTrainingStatus,
    removeJointTraining
} = inviteSlice.actions;

export default inviteSlice.reducer;
