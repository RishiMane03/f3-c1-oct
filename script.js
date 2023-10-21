// SearchInput:-

const searchBtn = document.getElementById('searchBtn')

searchBtn.addEventListener('click',()=>{
    // console.log('bappu');
    
    // Get the search query from the input field
    var locationSearch = document.getElementById('locationSearch').value
    var CheckInSearch= document.getElementById('CheckInSearch').value;
    var CheckOutSearch = document.getElementById('CheckOutSearch').value;
    var GuestsSearch = document.getElementById('GuestsSearch').value;

    // console.log(locationSearch);

    // Store the search query in a session cookie or local storage for passing to the next page
    sessionStorage.setItem("location", locationSearch);
    sessionStorage.setItem("CheckIn", CheckInSearch);
    sessionStorage.setItem("CheckOut", CheckOutSearch);
    sessionStorage.setItem("Guests", GuestsSearch);

    // Redirect to the result page
    window.location.href = "index2.html";
})


    // On the result page, retrieve and display the search query
    // var searchResult = document.getElementById("searchResult");
    var LocationSearchQuery = sessionStorage.getItem("location");
    var DateSearchQuery = sessionStorage.getItem("CheckIn");
    var GuestsSearchQuery = sessionStorage.getItem("Guests");

    document.getElementById('locationSearch2').value = LocationSearchQuery
    document.getElementById('CheckInSearch2').value = DateSearchQuery
    document.getElementById('GuestsSearch2').value = GuestsSearchQuery


    var locationToFilter = LocationSearchQuery.toLowerCase();
    var guestsToFilter = GuestsSearchQuery.toLowerCase();


// API DATA:-

const url =
  "https://airbnb13.p.rapidapi.com/search-location?location=Paris&checkin=2024-09-16&checkout=2024-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD";
  
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0c53385a04msh1537c9c01f83922p1d86ffjsnb55029407ebd", //ram
    "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
  },
};

async function getData() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    renderData(result.results);
  } catch (error) {
    console.error(error);
  }
}




// Card:-

const cards = document.getElementById('cards')
const leftpage = document.getElementById('leftpage')
// console.log(cards);

function renderData(arrayOfHotel) {
  const filteredData = arrayOfHotel.filter(item => item.address.toLowerCase().includes(locationToFilter));

  let totalFilterHotel = filteredData.length

  const ptag = document.createElement("p")
  ptag.textContent = `${totalFilterHotel} stays in ${locationToFilter}`;
  leftpage.appendChild(ptag);


  mapLocation(filteredData[0].lat,filteredData[0].lng);
  filteredData.forEach((hotel) => {
      const hotelCard = document.createElement("div");
      hotelCard.id = 'card'
      hotelCard.style.borderTop = "1px solid rgb(151, 151, 151)";
      hotelCard.style.paddingTop = "20px"
      hotelCard.innerHTML = `
            <div class="leftimg">
              <img src="${hotel.images[0]}" alt="img" />
            </div>
            <div class="right">
              <p>Entire home in ${locationToFilter}</p>
              <h3>${hotel.name}</h3>
              <div style="border-top: 1px solid rgb(151, 151, 151); height: 3px; width:80px; margin-left:25px"></div>
              
              <p class="info">
                ${hotel.persons} guests · ${hotel.type} · ${hotel.beds} beds · ${hotel.bathrooms} bath <br />
                ${hotel.previewAmenities}
              </p>
              <div style="border-top: 1px solid rgb(151, 151, 151); height: 3px; width:80px; margin-left:25px"></div>

              <div class="bottom">
                <div class="leftend">
                  <p>
                  ${hotel.rating} <i class="fa-solid fa-star" style="color: #f0cc19"></i>
                    <!-- <img src="./assetsimg/star.png" width="30px" height="30px" alt=""> -->
                    (${hotel.reviewsCount} reviews)
                  </p>
                </div>
                <div class="rightend">
                  <p>$ ${hotel.price.total}/night</p>
                </div>
              </div>
            </div>
      `

      cards.appendChild(hotelCard);
      
    });
}

// MAP
function mapLocation(latitude, longitude) {
  const lati = latitude;
  const long = longitude;
  console.log(latitude,longitude);
  const maptag = document.getElementById("rightPageMAP");
  const iframe = document.createElement("iframe");

  const url = `https://maps.google.com/maps?q=${lati},${long}&z=15&output=embed`;
  iframe.src = url;
  iframe.className = "map";
  maptag.appendChild(iframe);
}

getData();


/* MAP
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TRY</title>
  <style>
    .map{
     width: 600px;
     height: 680px; 
    }
  </style>
</head>
<body>
  <div id="map"></div>

  <script>
    function mapLocation(latitude, longitude) {
          const lati = latitude;
          const long = longitude;
          console.log(latitude,longitude);
          const maptag = document.getElementById("map");
          const iframe = document.createElement("iframe");

          const url = `https://maps.google.com/maps?q=${lati},${long}&z=15&output=embed`;
          iframe.src = url;
          iframe.className = "map";
          maptag.appendChild(iframe);
    }
    mapLocation(48.85194,2.34577)
  </script>
</body>
</html>
*/