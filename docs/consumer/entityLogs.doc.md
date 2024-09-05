# EntityLogs Documentation

This page provides details on the `EntityLogs` entity and describes how it is used once the project is running. The `EntityLogs` is responsible for recording changes or actions performed on entities in the system, logging critical information such as the entity name, action performed, user details, and timestamps. This document will help consumers understand what data is required or expected when interacting with the `EntityLogs`.

## EntityLogs Structure

The `EntityLogs` entity is used to record actions performed on system entities. Each log entry contains several fields, which are described below:

### Fields

| Field Name  | Type        | Description                                                                 |
|-------------|-------------|-----------------------------------------------------------------------------|
| service     | `string`    | The name or ID of the service responsible for generating the log entry.      |
| entityName  | `string`    | The name of the entity being logged (e.g., `User`, `Order`).                 |
| action      | `ActionType`| The action performed on the entity. This could be `CREATE`, `UPDATE`, or `DELETE`. |
| timestamp   | `Date`      | The exact time when the action was performed.                                |
| userId      | `string?`   | (Optional) The unique identifier of the user who performed the action.       |
| userName    | `string?`   | (Optional) The name of the user who performed the action.                    |
| changes     | `any?`      | (Optional) A record of changes made to the entity, typically as a diff between the old and new state. |

## ActionType Enum

The `ActionType` enum is used to indicate the type of action performed on the entity. This enum has the following values:

- `CREATE`: Indicates that a new entity was created.
- `UPDATE`: Indicates that an existing entity was updated.
- `DELETE`: Indicates that an existing entity was deleted.

## Automatic Change Detection

If both `oldValue` and `newValue` are provided when logging an entity update, the system will automatically generate the `changes` field. The difference between the old and new values will be calculated and logged as part of the `EntityLogs`. This allows the system to keep track of modifications made to the entity without the need for manual change calculation.

- Changes Format
```
[
    {
        type: 'UPDATE',
        key: 'planet',
        value: 'Alderaan',
        oldValue: 'Tatooine'
    },
    {
        type: 'UPDATE',
        key: 'faction',
        value: 'Rebel Alliance',
        oldValue: 'Jedi'
    }
]
```

## Usage Example

When logging actions, the system will create an `EntityLogs` entry that may look something like this:

```json
{
  "service": "user-service",
  "entityName": "User",
  "action": "UPDATE",
  "timestamp": "2023-09-04T12:00:00Z",
  "userId": "12345",
  "userName": "jdoe",
  "oldValue": {
    "email": "oldemail@example.com"
  },
  "newValue": {
    "email": "newemail@example.com"
  }
}
```

## Entities

To facilitate easier integration across different programming languages, we provide the entity models used in the system in multiple languages. These models can be found in the [entities folder](./../entities), which contains representations of each entity in a variety of popular programming languages.