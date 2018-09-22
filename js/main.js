let restaurants,
  neighborhoods,
  cuisines
var newMap
var markers = []

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  initMap(); // added 
  fetchNeighborhoods();
  fetchCuisines();
});

/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}

/**
 * Fetch all cuisines and set their HTML.
 */
fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}

/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}

/**
 * Initialize leaflet map, called from HTML.
 */
initMap = () => {
  self.newMap = L.map('map', {
    center: [40.722216, -73.987501],
    zoom: 12,
    scrollWheelZoom: false
  });
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
    mapboxToken: 'pk.eyJ1IjoiamdhamVyYSIsImEiOiJjam01bXk0NGcwdnp6M3BxcDh2NjZtZ2UwIn0.Ptl2Q6RJY1P18GjRA_moMw',
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(newMap);

  updateRestaurants();
}
/* window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });
  updateRestaurants();
} */

/**
 * Update page and map for current restaurants.
 */
updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  if (self.markers) {
    self.markers.forEach(marker => marker.remove());
  }
  self.markers = [];
  self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');

  const image = document.createElement('img');
  image.className = 'restaurant-img';
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  li.append(image);

  const name = document.createElement('h1');
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.href = DBHelper.urlForRestaurant(restaurant);
  li.append(more)

  return li
}

/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.newMap);
    marker.on("click", onClick);

    function onClick() {
      window.location.href = marker.options.url;
    }
    self.markers.push(marker);
  });

  addImgAlts();

}
/* addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
} */




// add alt attributes to every restaurant image on the home page
function addImgAlts() {
  // grab array of images
  let imgArray = [...document.querySelectorAll(".restaurant-img")];
  // grab array length
  let imgArrayLength = imgArray.length;
  // grab array of restaurant names to use as alt attr
  let nameArray = [...document.querySelectorAll("#restaurants-list li h1")];
  // create blank array to push new values into
  let nameArrayNew = [];
  // loop over name array to create new alt attr and push into empty array
  for (i = 0; i < imgArrayLength; i++) {
    nameArrayNew.push(nameArray[i].innerHTML + " restaurant image");
  }
  // loop over image array to set alt attr to new array value
  for (j = 0; j < imgArrayLength; j++) {
    imgArray[j].setAttribute('alt', nameArrayNew[j]);
  }

  // add aria roles to <div>s with no semantic tags
  let mapDiv = document.querySelector('#map');
  mapDiv.setAttribute('role', 'application');

  let selectNeighborhood = document.querySelector('#neighborhoods-select');
  selectNeighborhood.setAttribute('aria-label', 'Select a neighborhood');
  selectNeighborhood.setAttribute('role', 'tablist');

  let selectCuisine = document.querySelector('#cuisines-select');
  selectCuisine.setAttribute('aria-label', 'Select a cuisine');
  selectCuisine.setAttribute('role', 'tablist');

  let ariaHome = document.querySelector('.home header a');
  console.log(ariaHome);
  ariaHome.setAttribute('aria-label', 'Home');


  // add tab-indexes
  let homeTitle = document.querySelector('.home header a');
  homeTitle.tabIndex = 1;
  selectNeighborhood.tabIndex = 2;
  selectCuisine.tabIndex = 3;

  let restaurantButtons = [...document.querySelectorAll("#restaurants-list a")];
  console.log(restaurantButtons);
  let restaurantButtonCount = restaurantButtons.length;
  let initialTabIndex = 4;

  for (k = 0; k < restaurantButtonCount; k++) {
    restaurantButtons[0].tabIndex = initialTabIndex;
    if (k > 0) {
      let lastNum = k - 1;
      let currentTabIndex = restaurantButtons[lastNum].tabIndex;
      restaurantButtons[k].tabIndex = currentTabIndex + 1;
    }
  }

  let mapTabIndex = restaurantButtonCount + initialTabIndex;
  mapDiv.tabIndex = mapTabIndex;
}