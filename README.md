# RadikoApi

Promise based radiko's api client.

You can get below data via unofficial radiko api.

- stations list
- programs
- area id

## Installation

```
npm install radiko-api
```

## Usage

```
const radikoApi = require('radiko-api');
```


### Get area ID
```
// Get area id (depends on your location).

radikoApi.getAreaId()
  .then( res => console.log(res) ) //  ex) JP13
```

### Get stations list

```
// Get enable stations list in your area.

radikoApi.stations()
  .then( res => console.log(res) )
```

### Get programs infomation

##### today

```
// Get today's programs data
//   params: stationId (optional)

radikoApi.progs.today()
  .then( res => console.log(res) )

const stationId = "TBS";
radikoApi.progs.today(stationId)
  .then( res => console.log(res) )
```

##### now
```
// Get programs data broadcasting right now.

radikoApi.progs.now()
  .then( res => console.log(res) )
```

##### weekly
```
// Get a weekly programs data on specific station.
//   params: stationId (required)

const stationId = "TBS";
radikoApi.progs.weekly(stationId)
  .then( res => console.log(res) )
```

##### specific date
```
// Get programs data broadcasted/broadcasting on specific date.
//   params:
//     - date      (required): yyyymmdd as string. ex) 20180430
//     - stationId (optional): You can specify a station.

const date = "20180430";
radikoApi.progs.date(date)
  .then( res => console.log(res) )

const stationId = "TBS";
radikoApi.progs.date(date, stationId)
  .then( res => console.log(res) )
```

## License
MIT

