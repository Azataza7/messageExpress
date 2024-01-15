export interface message {
    message: string;
    datetime: string;
}

export type messageUser = Omit<message, 'datetime'>

