export interface AddUserRequest {
    devicetype: string;
}

export interface AddUserSuccessResponse {
    username: string;
}

export interface AddUserErrorResponse  {
    type: number;
    address: string;
    description: string;
}

export interface AddUserResponse {
    success?: AddUserSuccessResponse;
    error?: AddUserErrorResponse;
}

export const errorTypes = {
    linkButtonNotPressed: 101
};