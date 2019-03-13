# Road-Condition-Monitoring
RCM is a tool for gathering data from [DATEX II](https://datex2.eu/) and presenting the data in a informative and user friendly way.

## Prerequisite
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [MySQL](https://www.tutorialspoint.com/mysql/mysql-installation.htm)
- Either [OpenJDK](https://openjdk.java.net/install/) or [Rust](https://www.rust-lang.org/tools/install)

## Installation


```
git clone https://github.com/dynematic/rcm-d0020e.git
```

### Webserver
```
cd /rcm-d0020e/app/
npm install
npm start
```
### JavaBackend

```
cd /rcm-d0020e/JavaBackend/src/XML_fetch/
java -jar Run.java
```

### RustBackend

```
cd /rcm-d0020e/RustBackend/
cargo build
cargo run
```

### Database
See [Docs](https://dev.mysql.com/doc/).

## Built With
* [Leaflet](https://leafletjs.com/) - A JavaScript library for interactive maps
* [OpenStreetMap](https://www.openstreetmap.org/#map=5/62.994/17.637) -  Free wiki world map
* [MapBox](https://www.mapbox.com/) - An open source mapping platform for custom designed maps
* [Chart.js](https://www.chartjs.org/) - Flexible JavaScript charting
* [Boundary-Canvas](https://github.com/aparshin/leaflet-boundary-canvas/) - A plugin for Leaflet mapping library to draw tiled raster layers with arbitrary boundary
* [GeoData](http://kodapan.se/geodata/data/2015-06-26/laen-kustlinjer.geo.json) - Data for county boundaries in Sweden

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Authors
* **Gustav Hansson** - *Database, Map* - [97gushan](https://github.com/97gushan)
* **Robert Högberg** - *Map* - [Greybert](https://github.com/Greybert)
* **Oscar Ferm** - *Map* - [Slashy27](https://github.com/Slashy27)
* **William Antti** - *Graph* - [wilant](https://github.com/wilant)
* **Anton Grahn** - *Graph* - [Grumme2](https://github.com/Grumme2)
* **Aron Strandberg** - *Scrum Master* - [dynematic](https://github.com/dynematic) 



## License
[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgments
Continuous work of [https://github.com/Rovva/D0020E](https://github.com/Rovva/D0020E). A tool built by students at Luleå University of Technology.