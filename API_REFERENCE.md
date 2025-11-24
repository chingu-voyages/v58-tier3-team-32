# API Reference

## Members Endpoint

### `GET /api/members`

Get members with pagination and filtering.

**Query Parameters:**

| Parameter       |  Type  | Required | Default | Description                                                  |
| :-------------- | :----: | :------: | :-----: | :----------------------------------------------------------- |
| map             |  any   |    No    | (none)  | Returns count per country code instead (ignores page params) |
| page            |  int   |    No    |    1    | Page number (default: 1)                                     |
| pageSize        |  int   |    No    |   10    | Items per page (default/min: 10, max: 100)                   |
| gender          | string |    No    | (none)  | Filter by gender                                             |
| countryCode     | string |    No    | (none)  | Filter by two-letter country code                            |
| yearJoined      |  int   |    No    | (none)  | Filter by year joined                                        |
| roleType        | string |    No    | (none)  | Filter by voyage role type                                   |
| role            | string |    No    | (none)  | Filter by voyage role                                        |
| soloProjectTier |  int   |    No    | (none)  | Filter by solo project tier (1, 2, or 3)                     |
| voyageTier      | string |    No    | (none)  | Filter by voyage joined (requires `voyageTier`)              |
| voyage          | string |    No    | (none)  | Filter by tier in voyage joined (requires `voyage`)          |

**Example:**

`GET /api/members?voyage=V54`

```json
{
    "data": [
        {
            "id": "cmi8t0gdy00uqepuws2qbjl0l",
            "yearJoined": 2025,
            "gender": "FEMALE",
            "timezone": 0,
            "countryCode": "GB",
            "goal": "GAINEXPERIENCE",
            "source": "PERSONALNETWORK",
            "soloProjectTier": null,
            "role": "PRODUCTOWNER",
            "roleType": null,
            "voyages": [
                {
                    "name": "V54",
                    "tier": "Tier 2"
                }
            ]
        },
        ...
    ],
    "filterParams": {
        "voyage": "V54"
    }
}
```

`GET /api/members?map&yearJoined=2019`

```json
{
    "data": [
        {
            "_count": 1,
            "countryCode": "DK"
        },
        {
            "_count": 1,
            "countryCode": "CZ"
        },
        ...
    ],
    "filterParams": {
        "yearJoined": 2019
    }
}
```
