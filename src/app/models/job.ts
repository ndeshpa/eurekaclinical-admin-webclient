export class Job {
    id: number;
    logInfo: any;
    startTimestamp: number;
    sourceConfigId: string;
    destinationId: string;
    username: string;
    status: string;
    jobEvents: any;
    links: any;
    getStatisticsSupported: boolean;
    finishTimestamp: number; 
}