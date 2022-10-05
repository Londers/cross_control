import {
    YMaps,
    Map,
    SearchControl,
    ZoomControl,
    TrafficControl,
    RulerControl,
    GeolocationControl,
    FullscreenControl,
    YMapsApi,
} from 'react-yandex-maps';
import * as React from 'react';
import {Grid} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCrossInfo, setDgis, setScale} from "../crossInfoSlice";
import {setZoom} from "../additionalInfoSlice";

function MapContainer() {
    const state = useAppSelector(selectCrossInfo)
    const dispatch = useAppDispatch()

    const [showBox, setShowBox] = useState(false)

    const mapRef = useRef<any>(null);
    const [ymaps, setYmaps] = useState<YMapsApi | null>(null)

    // const boxPoint = useAppSelector(state => state.mapContent.boxPoint)
    // const bounds = useMemo(
    //     () => [[boxPoint.point0.Y, boxPoint.point0.X], [boxPoint.point1.Y, boxPoint.point1.X]],
    //     [boxPoint.point0.X, boxPoint.point0.Y, boxPoint.point1.X, boxPoint.point1.Y]
    // )
    // const [zoom, setZoom] = useState<number>(18)

    const [mapState, setMapState] = useState({
        // bounds,
        center: state.state?.dgis.split(",").map(coord => Number(coord)) ?? [0, 0],
        zoom: 15,
        autoFitToViewport: true,
    })
    // useEffect(() => {
    //     setMapState({...mapState, autoFitToViewport: true})
    // }, [center])

    return (
        <Grid container height={"96.5vh"}>
            <YMaps query={{apikey: "65162f5f-2d15-41d1-a881-6c1acf34cfa1", lang: "ru_RU"}}>
                <Map
                    onLoad={(ref) => {
                        if (ref) {
                            setYmaps(ref)
                            // ymapsRef.current = ref
                        }
                    }}
                    modules={["templateLayoutFactory", "formatter", "coordSystem.geo"]}
                    //"coordSystem", "formatter"
                    state={mapState}
                    instanceRef={(ref) => {
                        if (ref) {
                            mapRef.current = ref
                            mapRef.current.events.add(["click"], (e: any) => {
                                // console.log(e)
                                // console.log(e.originalEvent.map.getCenter())
                                // console.log(e._sourceEvent.get('coords'))

                                const coords = e._sourceEvent.get('coords')
                                let map = e.originalEvent.map

                                map.balloon.open(coords, {
                                    contentHeader: 'Светофор появится здесь!',
                                });

                                const centerX = window.innerWidth / 2
                                const centerY = window.innerHeight / 2
                                const projection = map.options.get('projection');

                                const minus = projection.fromGlobalPixels(
                                    map.converter.pageToGlobal([centerX - 225, centerY + 225]), map.getZoom()
                                );
                                const plus = projection.fromGlobalPixels(
                                    map.converter.pageToGlobal([centerX + 225, centerY - 225]), map.getZoom()
                                );
                                const distance = ymaps?.formatter.distance(
                                    ymaps?.coordSystem.geo.getDistance([plus[0], minus[1]], [plus[0], plus[1]]), 10
                                ).split('&#160;');

                                if (distance) {
                                    const scale = ((distance[1] === 'км') ? parseFloat(distance[0]) * 1000 : parseFloat(distance[0])) / 450;
                                    dispatch(setScale(scale))
                                    dispatch(setDgis(coords))
                                    dispatch(setZoom(map.getZoom()))
                                }

                                setMapState({...mapState, center: [coords[0].toPrecision(9), coords[1].toPrecision(9)]})
                                setShowBox(!showBox)
                                // data.state.scale = ((distance[1] === 'км') ? parseFloat(distance[0]) * 1000 : parseFloat(distance[0])) / 450;
                            })
                        }
                    }}
                    width={"100vw"}
                    height={"100%"}
                >
                    <GeolocationControl options={{float: 'left'}}/>
                    <ZoomControl options={{float: 'right'}}/>
                    <SearchControl
                        // instanceRef={(ref) => {
                        //     if (ref) searchRef.current = ref;
                        // }}
                        options={{
                            float: "left",
                            provider: "yandex#search",
                            size: "large"
                        }}
                    />
                    <TrafficControl options={{float: 'right'}}/>
                    <FullscreenControl/>
                    <RulerControl options={{float: 'right'}}/>
                </Map>
            </YMaps>
            {showBox &&
                <div>
                    <div style={{
                        position: "absolute",
                        top: ((window.innerHeight / 2) - 225 + 25),
                        left: ((window.innerWidth / 2) - 225 - 5),
                        zIndex: 3,
                        height: "5px",
                        width: "460px",
                        backgroundColor: "black"
                    }}/>
                    <div style={{
                        position: "absolute",
                        bottom: ((window.innerHeight / 2) - 225 - 35),
                        left: ((window.innerWidth / 2) - 225 - 5),
                        zIndex: 3,
                        height: "5px",
                        width: "460px",
                        backgroundColor: "black"
                    }}/>
                    <div style={{
                        position: "absolute",
                        top: ((window.innerHeight / 2) - 225 + 25),
                        left: ((window.innerWidth / 2) - 225 - 5),
                        zIndex: 3,
                        width: "5px",
                        height: "460px",
                        backgroundColor: "black"
                    }}/>
                    <div style={{
                        position: "absolute",
                        top: ((window.innerHeight / 2) - 225 + 25),
                        right: ((window.innerWidth / 2) - 225 - 5),
                        zIndex: 3,
                        width: "5px",
                        height: "460px",
                        backgroundColor: "black"
                    }}/>
                </div>}
        </Grid>
    )
}

export default MapContainer;