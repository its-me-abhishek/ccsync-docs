# API Documentation

## Endpoints

| Method | Endpoints        | Description                     |
| ------ | ---------------- | ------------------------------- |
| `GET`  | `/tasks`         | Fetch Tasks                     |
| `POST` | `/edit-task`     | Edit task (description only)    |
| `POST` | `/modify-task`   | Edit task (multiple parameters) |
| `POST` | `/add-task`      | Add a task                      |
| `POST` | `/complete-task` | Mark a task as completed        |
| `POST` | `/delete-task`   | Mark a task as deleted          |

## Sample payloads for requests

- `/tasks` :

```
    api/tasks?email=email&origin=container-origin&UUID=clientID&encryptionSecret=encryptionSecret
```

- `/edit-task` :

```
{
    "email": "email",
    "encryptionSecret": "encryptionSecret",
    "UUID": "clientID",
    "taskID": "any task id",
    "description": "new description for the task"
}
```

- `/add-task` :

```
{
      "email": "email",
      "encryptionSecret": "encryptionSecret",
      "UUID": "clientID",
      "description": "task description",
      "project": "task project",
      "due": "Date in the format: DD-MM-YYYY",
      "priority": "task priority"
}
```

- `/complete-task` :

```
{
    "email": "email",
    "encryptionSecret": "encryptionSecret",
    "UUID": "clientID",
    "taskuuid": "uuid of the task to be marked as completed"
}
```

- `/delete-task` :

```
{
    "email": "email",
    "encryptionSecret": "encryptionSecret",
    "UUID": "clientID",
    "taskuuid": "uuid of the task to be marked as deleted"
}
```

- `Note`: Mark a task as deleted tells that the tasks are soft deleted on taskchampion-sync-server, i.e., they are first marked as deleted, and then deleted after a period of time, typically 180 days.
