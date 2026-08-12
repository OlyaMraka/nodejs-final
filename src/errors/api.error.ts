export class ApiError extends Error {
    public statusCode: number;

    constructor(
        public status: number,
        message: string
    ) {
        super(message);
        this.statusCode = status;
    }
}
