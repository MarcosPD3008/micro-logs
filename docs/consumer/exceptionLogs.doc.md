# ExceptionLog Documentation

This page provides details on the `ExceptionLog` entity and describes how it is used once the project is running. The `ExceptionLog` entity is responsible for capturing and storing details about exceptions that occur within the system, including important metadata such as service context, exception type, and environment details. This document will help consumers understand what data is required or expected when interacting with the `ExceptionLog`.

## ExceptionLog Structure

The `ExceptionLog` entity is used to record exceptions that occur in the system. Each log entry contains several fields, which are described below:

### Fields

| Field Name          | Type                          | Description                                                                 |
|---------------------|-------------------------------|-----------------------------------------------------------------------------|
| timestamp           | `Date`                        | The exact time when the exception occurred.                                  |
| service             | `Types.ObjectId | Services`   | The service where the exception occurred, either as an ObjectId or reference.|
| exceptionType       | `string`                      | The type of exception that was raised (e.g., `TypeError`, `DatabaseError`).  |
| environment         | `string?`                     | (Optional) The environment in which the exception occurred (e.g., `production`, `development`). |
| message             | `string`                      | A brief message or description of the exception.                             |
| stackTrace          | `string?`                     | (Optional) The stack trace associated with the exception.                    |
| language            | `string?`                     | (Optional) The programming language used in the service where the exception occurred. |
| context             | `any?`                        | (Optional) Additional context that can provide more information about the exception. |
| resolved            | `boolean?`                    | (Optional) Indicates whether the exception has been resolved.                |
| resolutionDetails   | `string?`                     | (Optional) Additional details on how the exception was resolved.             |

## Usage Example

An `ExceptionLog` entry could look something like this:

```json
{
  "timestamp": "2023-09-04T12:00:00Z",
  "service": "64e2f6a4fc13ae3e1c000001",
  "exceptionType": "DatabaseError",
  "environment": "production",
  "message": "Unable to connect to database.",
  "stackTrace": "Error at connection.js:45:12",
  "language": "Node.js",
  "context": {
    "host": "db-service",
    "port": 5432
  },
  "resolved": false
}
````

## Entities

To facilitate easier integration across different programming languages, we provide the entity models used in the system in multiple languages. These models can be found in the [entities folder](./../entities), which contains representations of each entity in a variety of popular programming languages.