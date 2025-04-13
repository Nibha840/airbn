
	// mapboxgl.accessToken = mapToken;

    // const map = new mapboxgl.Map({
    //     container: "map", // container ID
    //     style: 'mapbox://styles/mapbox/streets-v12', // style URL
    //     center: [77.209, 28.6139], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    //     zoom: 9 // starting zoom
    // });

    // console.log(coordinates);

    // const marker = new mapboxgl.Marker()
    //     .setLngLat([12.554729, 55.70651])   ///listings.geometry.coordinates[0], listings.geometry.coordinates[1])
    //     .addTo(map);


        mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        
        style: "mapbox://styles/mapbox/streets-v12", // style url
        center: coordinates, 
        zoom: 7, // starting zoom
    });
    
    const marker = new mapboxgl.Marker({color: "red"})
    .setLngLat(coordinates) 
    .setPopup(
        new mapboxgl.Popup({offset: 25}).setHTML(
         `<h3>${listing.location}</h3><p>Exact Location will be provided after booking</p>`
       )
     )
    .addTo(map);