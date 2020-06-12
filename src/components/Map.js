import { functions, isEqual, omit } from 'lodash'
import React, { useState, useEffect, useRef } from 'react'
import '../styles/Map.scss';

const mapStyles = {
  width: '400px',
  height: '300px',
};

function Map({ options, onMount, className, onMountProps }) {
  const ref = useRef()
  const [map, setMap] = useState()

  useEffect(() => {
    // The Google Maps API modifies the options object passed to
    // the Map constructor in place by adding a mapTypeId with default
    // value 'roadmap'. { ...options } prevents this by creating a copy.
    const onLoad = () =>
      setMap(new window.google.maps.Map(ref.current, { ...options }))
    if (!window.google) {
      const script = document.createElement(`script`)
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=` +
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      document.head.append(script)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()
  }, [options])

  if (map && typeof onMount === `function`) onMount(map, onMountProps)

  return (
    <div id="map-container">
      <div
        style={mapStyles}
        {...{ ref, className }}
      />
    </div>
  )
}

function shouldNotUpdate(props, nextProps) {
  const [funcs, nextFuncs] = [functions(props), functions(nextProps)]
  const noPropChange = isEqual(omit(props, funcs), omit(nextProps, nextFuncs))
  const noFuncChange =
    funcs.length === nextFuncs.length &&
    funcs.every(fn => props[fn].toString() === nextProps[fn].toString())
  return noPropChange && noFuncChange
}

export default React.memo(Map, shouldNotUpdate)

Map.defaultProps = {
  options: {
    center: { lat: 43.6560811, lng: -79.3823601 },
    zoom: 14,
  },
}