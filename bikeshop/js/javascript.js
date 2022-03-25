console.log("we're up and running")

// endpoint: http://clubjulie.dk/wordpress_as_a_database/wp-json/wp/v2/bike

const url = "http://clubjulie.dk/wordpress_as_a_database/wp-json/wp/v2/bike";

const options = {
    headers: {

    }
}

fetch(url, options)
.then((response) => {
    if (!response.ok){
        throw Error(response.statusText);
    }
    return response.json();
})
.then((data) =>{
    //We have the data
    console.log(data);
    handleData(data);
})
.catch((e) => {
    //Whoops something went wrong
    console.error("An error occured", e.message);
});

function handleData(data){
    console.log(data)
    data.forEach(showBike);
}

function showBike(bike) {
    console.log(bike);
    //grab the template
    const template = document.querySelector("#bikeTemplate").content;

    //clone it
    const copy = template.cloneNode(true);

    // change content
    // copy.querySelector("a")
    // copy.querySelector("img").src = bike._embedded["wp:featuredmedia"] [0].media_details.sizes.medium.source_url;
    copy.querySelector("img").src = bike.bikeimg.guid;
    copy.querySelector(".bikeName").textContent = bike.bikename;
    copy.querySelector(".bikeBrand").textContent = bike.bikebrand;
    // copy.querySelector(".bikeBrand").textContent = bike.categories;
    copy.querySelector(".bikePrice").textContent = bike.price;
    // copy.querySelector(".bikeColours").textContent = bike.colors;
    copy.querySelector(".bikeStock").textContent = bike.stock;

    //grab parent
    const parent = document.querySelector("#cardsOverview");

    //append
    parent.appendChild(copy);
}