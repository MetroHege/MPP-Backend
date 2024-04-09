const rateLimits = new Map<string, { endpoint: string; lastRequest: number }>();

export default rateLimits;
