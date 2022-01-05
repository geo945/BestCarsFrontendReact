export const environment = {
    production: false,
    apiBaseUrl: "http://localhost:8080"
}

export const headers: {
    Authorization: string;
    'Content-type': string;
    'Accept': string;
} = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
    Authorization: "",
};