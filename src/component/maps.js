import React, {Component} from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import _ from 'lodash';

import Map from './map';
import MigrationLine from './migrationline';

function migrationSources(data, centroids, nameIdMap) {
    return Object.keys(data.source)
                 .filter(name => centroids[nameIdMap[name]])
                 .filter(name => data.source[name] !== 0)
}

const CountryMigrations = ({ data, nameIdMap, centroids }) => {
     const destination = centroids[data.id];

    //  console.log(d3.extent(sources.map(name => data.source[name])));

     const sources = migrationSources(data, centroids, nameIdMap),
           color = d3.scale.log()
                    .domain(d3.extent(sources.map(name => data.source[name])))
                    .range([0, 1]);

    const interpolateColor = d3.interpolateHsl("hsl(62,100%,90%)", "hsl(222,30%,20%)");

    const N = d3.scale.linear()
                .domain(d3.extent(sources.map(name => data.source[name])))
                .range([1, 10]);

     return (
         <g>
           {sources.map((name, i) => (
             <MigrationLine start={centroids[nameIdMap[name]]}
                            end={destination}
                            color={interpolateColor(color(data.source[name]))}
                            key={`${data.id}-${i}`}
                            Ncircles={N(data.source[name])}
             />
            ))}
         </g>
     )
 };

 const Migrations = ({ topology, projection, data, nameIdMap, focusCountry}) => {
     if (!data) {
         return null;
     }

     const countries = topojson.feature(topology, topology.objects.countries),
           path = d3.geo.path().projection(projection),
           centroids = _.fromPairs(countries.features
                                            .map(country => [country.id,
                                                             path.centroid(country)]));


     const dataToDraw = data.filter(({ id }) => id === focusCountry)
                            .filter(({ id }) => !!centroids[id]);
     return (
         <g>
           {dataToDraw.map(data => (
               <CountryMigrations data={data} nameIdMap={nameIdMap}
                                  centroids={centroids}
                                  key={`migrations-${data.id}`} />
           ))}
         </g>
     );
 };

 class World extends Component {
   constructor(props) {
     super(props);
     this.state = { topology: null };
   }

   projection = d3.geo.equirectangular()
                    .center([-50, 40])
                    .scale(200)

     componentWillMount() {
         d3.json('http://128.199.99.233:3000/api/jsonworld',
                 (err, topology) => {
                     this.setState({
                         topology: topology
                     });
                 });
     }

     render() {
         const { width, height } = this.props,
               { topology } = this.state;

         let Maps;
         let Migration;

         if (!topology) {
             return null;
         }

         if(this.props.data != null){
           Migration = (
             <Migrations topology={topology} projection={this.projection}
                  data={this.props.data} nameIdMap={this.props.nameIdMap}
                  focusCountry={this.props.focusCountry} />
           );
           Maps = (
             <Map topology={topology} projection={this.projection}
                  data={this.props.data} nameIdMap={this.props.nameIdMap}
                  focusCountry={this.props.focusCountry} />
           );
         }

        //  console.log(this.props.year);

         return (
             <svg width={width} height={height}>
              <text x='50' y='550' stroke={'Black'} fontSize={50}>{this.props.year}</text>
              {Maps}
              {Migration}
           </svg>
         )
     }
 }

 export { World };
