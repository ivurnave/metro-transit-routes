const apiUrl = "https://svc.metrotransit.org/nextripv2/";
let stops = {};
let route = undefined;

function getTimeForId(id) {
    let xhr = new XMLHttpRequest();
    let url = apiUrl + id;
    xhr.open("GET", url);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                const data = JSON.parse(xhr.response);

                // update stops object with new data
                const stopId = data.stops[0]?.stop_id;
                const stopDesc = data.stops[0]?.description;
                const nextStop = data.departures[0]?.departure_text;
                const routeId = data.departures[0]?.route_id;

                stops[stopId] = {
                    'stopDesc': stopDesc,
                    'nextStop': nextStop,
                    'routeId': routeId,

                    // adding all response departure data to stops
                    'departures': data.departures
                }

                // if route is active, filter the stops to departures for that route
                if (route) {
                    updateStopInfoForRoute( stopId );
                } else {
                    stops[stopId] = {
                        'stopDesc': stopDesc,
                        'nextStop': nextStop,
                        'routeId': routeId,
    
                        // adding all response departure data to stops
                        'departures': data.departures
                    }
                }

                updateListFromStops();
                if (stops[stopId]) {
                    setStopsInStorage();
                }

                setLoadingIcon(false);
                
            } else {
                console.log("Error in getting stop information, see Network tab");
            }
        }
    }

    xhr.send();
}

// update stop info for the globally selected route
function updateStopInfoForRoute(stopId) {
    for (let i=0; i<stops[stopId].departures.length; i++) {
        let departure = stops[stopId].departures[i];
        if (departure.route_id === route) {
            stops[stopId].routeId = route;
            stops[stopId].stopDesc = departure.description;
            stops[stopId].nextStop = departure.departure_text;
            break;
        }
    }
}

function updateTimes() {
    setLoadingIcon(true);
    
    Object.keys(stops).forEach( (stopId) => {
        getTimeForId(stopId);
    })

    
}

function setRoute() {
    let elem = document.getElementById('routeIdInput');
    let routeId = elem.value;
    if (routeId && routeId > 1 && routeId < 1000) {
        route = routeId;
        setRouteInStorage();
        updateTimes();
    }
}

function clearRoute() {
    document.getElementById('routeIdInput').value = route = '';
    updateTimes();
}

function addStop() {
    let elem = document.getElementById('stopIdInput');
    let stopId = elem.value;
    if (stopId && !stops[stopId] && stopId > 0 && stopId < 30000) {
        stops[stopId] = {};
        updateTimes();
        elem.value = '';
    }
}

function removeStop(stopId) {
    delete stops[stopId];
    setStopsInStorage();
    updateListFromStops();
}

function updateListFromStops() {
    const list = document.getElementById('times');
    list.innerHTML = '';
    Object.keys(stops).forEach( (stopId) => {
        const newStop = buildListItem(stopId);
        if (newStop) {
            list.appendChild(newStop);
        }
    });

    if (list.innerHTML === '') {
        list.innerHTML += `<li class="list-group-item text-center"><em>No stops added yet</em></li>`;
    }
}

function buildListItem(stopId) {
    let data = stops[stopId];
    if (data) {
        let newStop = document.createElement('li');
        newStop.className = 'list-group-item d-flex row g-0';
        newStop.innerHTML = `
            <span class="col-lg-6 col-sm-12 mb-2 mb-lg-0"><b> ` + stopId + `:</b> ` + data.stopDesc + `</span>
            <span class="col-lg-6 col-sm-12 mb-2 mb-lg-0">Route `+ data.routeId + ` in ` + data.nextStop + `</span>
        `;
    
        if (!data.routeId) {
            newStop.innerHTML = `
                <span class="col-lg-6 col-sm-12 mb-2 mb-lg-0"><b> ` + stopId + `:</b> ` + data.stopDesc + `</span>
                <span class="col-lg-6 col-sm-12 mb-2 mb-lg-0 fst-italic">Stop closed</span>
            `;
        }
        newStop.innerHTML += 
                `<div class="item-interactions ">
                    <button class="rounded me-2 btn btn-outline-danger" onclick="removeStop(` + stopId + `)">
                        <span class="material-icons">
                            delete_outline
                        </span>
                    </button>
                </div>`;
    
        return newStop;
    } else {
        return false;
    }
}

function setStopsInStorage() {
    let data = JSON.stringify(stops);
    localStorage.setItem('stops', data);
}

function getStopsFromStorage() {
    const data = localStorage.getItem('stops');
    if (data) {
        stops = JSON.parse(data);
    }
}

function setRouteInStorage() {
    let data = JSON.stringify(route);
    localStorage.setItem('route', data);
}

function getRouteFromStorage() {
    const data = localStorage.getItem('route');
    if (data) {
        route = JSON.parse(data);
    }
}

function setRouteInputElem() {
    if (route) {
        const routeInputElem = document.getElementById('routeIdInput');
        routeInputElem.value = route;
        updateTimes();
    }
}

function setLoadingIcon(loading) {
    let loadingElem = document.getElementById('updateLoading');
    loadingElem.hidden = !loading;
}

window.onload = function () {
    getStopsFromStorage();
    getRouteFromStorage();
    setRouteInputElem();
    updateListFromStops();
}