using System;

public class ExceptionLog
{
    public DateTime Timestamp { get; set; }
    public string Service { get; set; }
    public string ExceptionType { get; set; }
    public string? Environment { get; set; } = null;
    public string Message { get; set; }
    public string? StackTrace { get; set; } = null;
    public string? Language { get; set; } = null;
    public dynamic? Context { get; set; } = null;
    public bool? Resolved { get; set; } = null;
    public string? ResolutionDetails { get; set; } = null;
}
