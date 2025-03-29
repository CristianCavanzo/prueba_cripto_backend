export interface ErrorResponse {
    property: string;
    constraints: string | string[];
}

export interface ApiResponse<T> {
    status: number;
    data: T | undefined | ErrorResponse[] | ErrorResponse;
    error: boolean;
}
