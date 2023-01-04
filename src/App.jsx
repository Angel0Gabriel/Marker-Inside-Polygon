import { FeatureGroup, MapContainer, TileLayer, Marker, useMap, LayerGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css'
import '@turf/turf';

import * as L from 'leaflet'
import { useState } from 'react';

function App() {

  const [markersIn, setMarkersIn] = useState([]);

  function Teste() {

    const map = useMap();

    L.Rectangle.include({
      // Single marker case
      contains: function (marker) {
        return this.getBounds().contains(marker.getLatLng());
      },
      // Array of markers
      contains: function (markers) {
        var markersContained = [];
        markers.forEach(marker => {
          markersContained.push(this.getBounds().contains(marker.getLatLng()));
        })
        return markersContained;
      }
    });

    map.on(L.Draw.Event.CREATED, function (geometry) {
      
      let markers = [];
      
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          markers.push(layer);
          
        }
        
      });
      
      function jsonToArray(jsonObject) {
        var result = [];
        var keys = Object.keys(jsonObject);
        keys.forEach(function (key) {
          result.push(jsonObject[key]);
        });
        return result;
      }
      
      var result = geometry.layer.contains(markers);
      
      const markersPosition = markers.map((marker) => {
        marker.getLatLng();
      })

      setMarkersIn(markersPosition.filter((marker, index) => {
        result[index];
      }))

    });

  }

  console.log(markersIn);

  const onCreated = e => {
    console.log(e.layer.getLatLngs());
  };




  return (
    <>
      <MapContainer
        center={[-3.74, -38.5]}
        zoom={12}
        minZoom={3}
        scrollWheelZoom={true}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup>
          <EditControl
            draw={{
              polyline: false,
              circle: false,
              polygon: false,
              marker: false,
              circlemarker: false,
              rectangle: { showArea: false },
            }}
            onCreated={onCreated}
          />
        </FeatureGroup>

        <Teste />

        <LayerGroup>
          <Marker position={[-3.758402527194762, -38.54604721069337]}></Marker>
          {/* <Marker position={[-3.7092402896704764, -38.54604721069337]}></Marker> */}
        </LayerGroup>
      </MapContainer>
    </>
  )
}

export default App
