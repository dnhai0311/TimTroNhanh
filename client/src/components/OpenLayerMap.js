import React, { useState, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { apiGetCoord } from '../services/index';
import { showToastError } from '../utils/commons/ToastUtil';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const OpenLayerMap = ({ address }) => {
    const [map, setMap] = useState(null);
    const [markerFeature, setMarkerFeature] = useState(null);

    useEffect(() => {
        const initialMap = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([105.827057, 21.028511]), // Hà Nội
                zoom: 15,
            }),
        });

        setMap(initialMap);

        const markerLayer = new VectorLayer({
            source: new VectorSource(),
            style: new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    src: 'https://openlayers.org/en/latest/examples/data/icon.png',
                }),
            }),
        });
        initialMap.addLayer(markerLayer);

        // Set up marker feature
        const feature = new Feature();
        markerLayer.getSource().addFeature(feature);
        setMarkerFeature(feature);

        return () => {
            if (initialMap) {
                initialMap.setTarget(null);
            }
        };
    }, []);

    useEffect(() => {
        const handleSearch = async () => {
            if (address === '') return;
            const response = await apiGetCoord(address);
            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                const coordinates = fromLonLat([parseFloat(lon), parseFloat(lat)]);

                if (map && markerFeature) {
                    map.getView().animate({ center: coordinates, zoom: 15 });
                    markerFeature.setGeometry(new Point(coordinates));
                }
            } else {
                showToastError('Không tìm thấy địa chỉ.');
            }
        };
        map && markerFeature && address && handleSearch();
    }, [address, map, markerFeature]);

    return <div id="map" className="mb-3" style={{ width: '100%', height: '50vh' }}></div>;
};

export default OpenLayerMap;
