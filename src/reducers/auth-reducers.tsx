export interface State {
    isLogged: boolean;
    isLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userInfos: any;
}

export const initState: State = {
    isLogged: false,
    isLoading: false,
    userInfos: null,
};

export enum Actions {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    SET_LOADING = "SET_LOADING",
    UPDATE_USER_INFOS = "UPDATE_USER_INFOS"
}

export interface Action {
    type: string;
    payload?: unknown;
}

export const authReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case Actions.LOGIN:
            return {
                ...state,
                isLogged: true,
                isLoading: false,
                userInfos: action.payload,
            };
        case Actions.SET_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case Actions.UPDATE_USER_INFOS:
            return {
                ...state,
                isLoading: false,
                userInfos: action.payload,
            };
        case Actions.LOGOUT:
            return {
                ...state,
                isLogged: false,
                userInfos: initState.userInfos,
            };
        default:
            return state;
    }
};
