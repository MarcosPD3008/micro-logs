export interface ExceptionLog  {
    timestamp: Date;
    service: string; 
    exceptionType: string; 
    environment?: string; 
    message: string;
    stackTrace?: string; 
    language?: string; 
    context?: any;
    resolved?: boolean; 
    resolutionDetails?: string; 
}
  