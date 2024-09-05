using System;

public enum ActionType
{
    CREATE,
    UPDATE,
    DELETE
}

public class EntityLogs
{
    public string Service { get; set; }
    public string EntityName { get; set; }
    public ActionType Action { get; set; }
    public DateTime Timestamp { get; set; }
    public string? UserId { get; set; } = null;
    public string? UserName { get; set; } = null;
    public dynamic? Changes { get; set; } = null;
    public dynamic? OldValues { get; set; } = null;
    public dynamic? NewValues { get; set; } = null;
}
