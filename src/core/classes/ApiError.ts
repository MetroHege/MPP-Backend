import debux from "debux";

class ApiError extends Error {
    constructor(
        public readonly status: number,
        public readonly message: string
    ) {
        super(message);
        debux().log(`ApiError: ${status} ${message}`);
    }
}

export default ApiError;
