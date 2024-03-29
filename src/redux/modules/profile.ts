import { AuthFieldNames, ProfileFieldNames } from '@common-types/credentials';
import { ApplicationState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UploadFile } from 'antd';

export type ProfileAvatar = {
    file: UploadFile;
};

type Period = {
    text: string;
    cost: number;
    days: number;
};

export type Tarif = {
    _id: string;
    name: string;
    periods: Period[];
};

export type ProfileState = typeof initialState;
export type ProfileCredential = {
    [ProfileFieldNames.name]: string;
    [ProfileFieldNames.surname]: string;
    [ProfileFieldNames.birthday]: string;
    [AuthFieldNames.email]: string;
    [ProfileFieldNames.avatar]: string | ProfileAvatar;
    [ProfileFieldNames.notifications]: boolean;
    [ProfileFieldNames.trainings]: boolean;
    password?: string;
    tariff?: {
        tariffId: string;
        expired: string;
    };
};

export const initialState = {
    credential: {} as ProfileCredential,
    tarifs: [] as Tarif[],
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileCredential(state, { payload: credential }: PayloadAction<ProfileCredential>) {
            state.credential = {
                ...state.credential,
                ...credential,
            };
        },
        setTarifs(state, { payload }: PayloadAction<Tarif[]>) {
            state.tarifs = payload;
        },
        clearProfileStateOnLogout: () => initialState,
    },
});

export const profileCredentialSelector = (state: ApplicationState) => state.profile.credential;
export const profileTarifs = (state: ApplicationState) => state.profile.tarifs;

export const { setProfileCredential, setTarifs, clearProfileStateOnLogout } = profileSlice.actions;

export default profileSlice.reducer;
