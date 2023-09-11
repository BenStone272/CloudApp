// define the callAPI function that takes a first name and last name as parameters
globalID=null;
var callAPI = (u_id,date,excerise,weight,reps,key)=>{
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Authorization", accessToken);
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"e_type":"post","u_id":u_id,"date":date,"excerise":excerise,"weight":weight,"reps":reps,"key":key});
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://bvwxuic990.execute-api.us-east-1.amazonaws.com/prod", requestOptions)
    .then(response => response.text())
    .then(result => console.log(JSON.parse(result)))
    .catch(error => console.log('error', error));
}

function getAPI  (date,u_id){
    
    let url="https://bvwxuic990.execute-api.us-east-1.amazonaws.com/prod?date="+date+"&uid="+u_id
    fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': accessToken , // Replace 'Bearer' with the appropriate authorization scheme if needed
    },
  })

        
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse the response as JSON
  })
  .then((data) => {
    console.log(data); // Process the response data
    getData(data);
  })
  .catch((error) => {
    console.error(`Fetch error: ${error}`);
  });
}

function getAllData  (u_id){
    
    let url="https://bvwxuic990.execute-api.us-east-1.amazonaws.com/prod?date="+"all"+"&uid="+u_id
    fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': accessToken , // Replace 'Bearer' with the appropriate authorization scheme if needed
    },
  })

        
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse the response as JSON
  })
  .then((data) => {
    console.log(data); // Process the response data
    console.log("all")
  })
  .catch((error) => {
    console.error(`Fetch error: ${error}`);
  });
}

var updateAPI = (key,excerise,weight,reps)=>{
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Authorization", accessToken);
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"e_type":"update","key":key,"excerise":excerise,"weight":weight,"reps":reps});
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://bvwxuic990.execute-api.us-east-1.amazonaws.com/prod", requestOptions)
    .then(response => response.text())
    .then(result => console.log(JSON.parse(result).body))
    .catch(error => console.log('error', error));
}

function deleteAPI(itemId) {
  const apiUrl = 'https://bvwxuic990.execute-api.us-east-1.amazonaws.com/prod'; // Replace with your API endpoint
  const urlWithParam = `${apiUrl}?item_id=${encodeURIComponent(itemId)}`;

  fetch(urlWithParam, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json', // Adjust the content type if needed
       'Authorization': accessToken,
      // Add any other headers if required
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(`Item with ID ${itemId} deleted successfully`);
    })
    .catch((error) => {
      console.error(`Delete request failed: ${error}`);
    });
}



function getDate(){
    // Create a date object from a date string
    var today = new Date();

    // Get year, month, and day part from the date
    var year = today.toLocaleString("default", { year: "numeric" });
    var month = today.toLocaleString("default", { month: "2-digit" });
    var day = today.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = year + "-" + month + "-" + day;
    console.log(formattedDate);  // Prints: 2022-05-04
    return formattedDate;


}

function getData(jsonData){
    mydata = jsonData //JSON.parse(jsonData)
    for (var i = 0; i < mydata.length; i++) {
        console.log(mydata[i])
        addGets(mydata[i].Excerise,mydata[i].Weight,mydata[i].Reps,mydata[i].ID)
    }
}

function makeid() {
    let result = '';
    let length = 36;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function getAPI1  (date,u_id){
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Authorization", accessToken);
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"e_type":"get","date":date,"u_id":u_id});
    console.log(raw)
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,				
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://bvwxuic990.execute-api.us-east-1.amazonaws.com/prod", requestOptions)
    .then(response => response.text())
    .then(result =>  getData(result))
    .catch(error => console.log('error', error));
}


function authAPI2  (accessToken){
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Authorization", accessToken);
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"e_type":"get"});
    console.log(raw)
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,				
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://bvwxuic990.execute-api.us-east-1.amazonaws.com/prod", requestOptions)
    .then(response => response.text())
    .then(result =>  console.log(result))
    .catch(error => console.log('error', error));
}

getDate(username)

