import React, { Component } from "react";
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import _ from 'lodash';
import Country from './country';

function migrationSources(data, centroids, nameIdMap) {
    return Object.keys(data.source)
                 .filter(name => centroids[nameIdMap[name]])
                 .filter(name => data.source[name] !== 0)
}

class Map extends Component {
    constructor(props) {
      super(props);
    }

    render(){
        const {topology, projection, data, nameIdMap, focusCountry} = this.props;
        const D = d3.geo.path().projection(projection),
              countries = topojson.feature(topology, topology.objects.countries),
              centroids = _.fromPairs(countries.features
                                     .map(country => [country.id,
                                                      D.centroid(country)])),
              idNameMap = _.invert(nameIdMap);

        let sources = [],
            focusData = data.find(({ id }) => id === focusCountry),
            colorScale = _.noop;

        if (focusData) {
            // console.log(focusData);
            sources = migrationSources(focusData,
                                       centroids, nameIdMap);
            colorScale = d3.scale.log()
                           .domain(d3.extent(sources.map(name => focusData.source[name])))
                           .range([0, 1]);
        }

        const interpolateColor = d3.scale.linear().domain([0, 1]).range(['hsl(57, 87%, 55%)', 'hsl(288, 98%, 17%)']);
        const isSource = (country) => sources.includes(idNameMap[country.id]),
              color = (country) => {
                  if (isSource(country) && focusData){
                      return interpolateColor(colorScale(
                          focusData.source[idNameMap[country.id]]
                      ));
                  }else{
                      return 'grey';
                  }
              };
      // console.log(focusData);
       return(
         <g id='map'>
             {countries.features.map((country, i) => (
               <Country d={D(country)}
                        country={country}
                        mapId={idNameMap}
                        data={focusData}
                        key={`${country.id}-${i}`}
                        isSource={isSource(country)}
                        style={{stroke: 'white',
                                strokeWidth: '0.25px',
                                fillOpacity: isSource(country) ? 1 : 0.5,
                                fill: color(country)}} />
             ))}
         </g>
       );
    }
}

export default Map;
