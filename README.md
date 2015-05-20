# mapbox-markers-cli

Requires a `MapboxAccessToken` environment variable with map:write permissions.

Includes three utilities

* `mapbox-data-get`: get GeoJSON data
* `mapbox-data-add`: add/update features in a dataset
* `mapbox-data-replace`: replace dataset with new GeoJSON data

They have common options:

* `--userid` required for all commands. Your mapbox user id.
* `--mapid` or `--datasetid`. `--datasetid` is preferred, otherwise the library
  has to look up what dataset is referred to by each map

```sh
$ npm install -g mapbox-markers-cli

$ mapbox-data-get --userid=USER --datasetid=DATASETID
$ mapbox-data-get --userid=USER --mapid=MAPID

$ mapbox-data-add --userid=USER --datasetid=DATASETID geojsonfile.geojson
$ mapbox-data-add --userid=USER --mapid=MAPID geojsonfile.geojson

$ mapbox-data-replace --userid=USER --datasetid=DATASETID geojsonfile.geojson
$ mapbox-data-replace --userid=USER --mapid=MAPID geojsonfile.geojson
```
