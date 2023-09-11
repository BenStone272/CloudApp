
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
//var emptyRow = "<tr><td colspan='4' class='text-center'> No Records Available</td></tr>";
var emptyNewRow = "<tr class='trNewRow'>"; 
emptyNewRow = emptyNewRow + "    <td class='tdexcerise'>";
emptyNewRow = emptyNewRow + "        <input type='text' class='form-control txtexcerise' placeholder='Enter excerise'/>";
emptyNewRow = emptyNewRow + "    </td>";
emptyNewRow = emptyNewRow + "    <td class='tdweight'>";
emptyNewRow = emptyNewRow + "        <input type='number' class='form-control txtweight' placeholder='Enter weight'/>";
emptyNewRow = emptyNewRow + "    </td>";
emptyNewRow = emptyNewRow + "    <td class='tdReps'>";
emptyNewRow = emptyNewRow + "        <input type='number' class='form-control txtReps' placeholder='Enter Reps'/>";
emptyNewRow = emptyNewRow + "    </td>";
//emptyNewRow = emptyNewRow + "    <td class='tdMobile' >";
//emptyNewRow = emptyNewRow + "        <input type='text' class='form-control txtMobile' />";
// emptyNewRow = emptyNewRow + "    </td>";
emptyNewRow = emptyNewRow + "    <td class='tdAction'>";
emptyNewRow = emptyNewRow + "        <button class='btn btn-sm btn-success btn-save'> Save</button>";
emptyNewRow = emptyNewRow + "        <button class='btn btn-sm btn-success btn-cancel'> Cancel</button>";
emptyNewRow = emptyNewRow + "    </td>";
emptyNewRow = emptyNewRow + "</tr>";



var rowButtons ="<button class='btn btn-success btn-sm btn-edit' > Edit </button>  <button class='btn btn-danger btn-sm' > Delete </button> ";
var rowUpdateButtons ="<button class='btn btn-success btn-sm btn-update' > Update </button>  <button class='btn btn-sm btn-success btn-cancel' > Cancel </button> ";

$(document).ready(function () {
    debugger;
    //$("#tblData tbody").append(emptyRow); // adding empty row on page load 
    
    $("#btnAdd").click(function () { 
        debugger;
        if ($("#tblData tbody").children().children().length == 1) {
            $("#tblData tbody").html("");
        }
        debugger;
        $("#tblData tbody").append(emptyNewRow); // appending dynamic string to table tbody
    });
    
    $('#tblData').on('click', '.btn-save', function () {
        const dateElement = document.getElementById('pickDate'); // get the date element
        const dateValue = dateElement.value; // get the value of the date element
        const excerise =  $(this).parent().parent().find(".txtexcerise").val();
        $(this).parent().parent().find(".tdexcerise").html(""+excerise+""); 
        const weight =  $(this).parent().parent().find(".txtweight").val();
        $(this).parent().parent().find(".tdweight").html(""+weight+"");
        const reps =  $(this).parent().parent().find(".txtReps").val();
        $(this).parent().parent().find(".tdReps").html(""+reps+"");
       // const mobile =  $(this).parent().parent().find(".txtMobile").val();
        //$(this).parent().parent().find(".tdMobile").html(""+mobile+"");
        
        console.log("save")
        let key=username+makeid()
        $(this).closest('tr').attr('value',key);
        console.log($(this).closest('tr').attr('value'));
        callAPI(username,dateValue,excerise,weight,reps,key)
        //console.log(globalID)
       // $(this).parent().parent().find(".tdMobile").html(""+key+"");
        $(this).parent().parent().find(".tdAction").html(rowButtons);
    });
    $('#tblData').on('click', '.btn-update', function () {
        const excerise =  $(this).parent().parent().find(".txtexcerise").val();
        $(this).parent().parent().find(".tdexcerise").html(""+excerise+""); 
        const weight =  $(this).parent().parent().find(".txtweight").val();
        $(this).parent().parent().find(".tdweight").html(""+weight+"");
        const reps =  $(this).parent().parent().find(".txtReps").val();
        $(this).parent().parent().find(".tdReps").html(""+reps+"");
       // const mobile =  $(this).parent().parent().find(".txtMobile").val(); //old way of getting key
        //$(this).parent().parent().find(".tdMobile").html(""+mobile+"");
        let key=$(this).closest('tr').attr('value');
        console.log("update key is "+ key)
        updateAPI(key,excerise,weight,reps)
        $(this).parent().parent().find(".tdAction").html(rowButtons);
        console.log("update")
        
    });
     
    
    $('#tblData').on('click', '.btn-danger', function () { // registering function for delete button  
        //const key =  $(this).parent().parent().find(".tdMobile").html() old way of getting key
        let key=$(this).closest('tr').attr('value');
        deleteAPI(key)
        $(this).parent().parent().remove();
        console.log("delete")
        if ($("#tblData tbody").children().children().length == 0) {
            //$("#tblData tbody").append(emptyRow);
        }
    });
    

    $('#tblData').on('click', '.btn-cancel', function () { 
        $(this).parent().parent().remove();
        changedate($("#pickDate").val());
    });
    $('#tblData').on('click', '.btn-edit', function () { 
        const excerise =$(this).parent().parent().find(".tdexcerise").html();

        $(this).parent().parent().find(".tdexcerise").html("<input type='text' value='"+excerise+"' class='form-control txtexcerise' placeholder='Enter excerise'/>"); 


        const weight =$(this).parent().parent().find(".tdweight").html();

        $(this).parent().parent().find(".tdweight").html("<input type='number' value='"+weight+"' class='form-control txtweight' placeholder='Enter weight'/>"); 

        const reps =$(this).parent().parent().find(".tdReps").html();

        $(this).parent().parent().find(".tdReps").html("<input type='number' value='"+reps+"' class='form-control txtReps' placeholder='Enter Reps'/>"); 


        //const mobile =$(this).parent().parent().find(".tdMobile").html();

      //  $(this).parent().parent().find(".tdMobile").html("<input type='text' value='"+mobile+"' class='form-control txtMobile' placeholder='Don't Enter Key'/>"); 
        $(this).parent().parent().find(".tdAction").html(rowUpdateButtons);
        console.log("edit")
        
        
    });
});

function addGets(excerise,weight,reps,key){
    var FillNewRow = "<tr class='trNewRow' value="+key+">"; 
    FillNewRow = FillNewRow + "    <td class='tdexcerise'>";
    FillNewRow = FillNewRow + "        <input type='text' class='form-control txtexcerise' value='"+excerise+"'/>";
    console.log(excerise)
    FillNewRow = FillNewRow + "    </td>";
    FillNewRow = FillNewRow + "    <td class='tdweight'>";
    FillNewRow = FillNewRow + "        <input type='number' class='form-control txtweight' value='"+ weight + "'' />";
    FillNewRow = FillNewRow + "    </td>";
    FillNewRow = FillNewRow + "    <td class='tdReps'>";
    FillNewRow = FillNewRow + "        <input type='number' class='form-control txtReps' value='"+ reps + "'' />";
    FillNewRow = FillNewRow + "    </td>";
   // FillNewRow = FillNewRow + "    <td class='tdMobile'>";
   // FillNewRow = FillNewRow + "        <input type='text' class='form-control txtMobile' value='"+ key + "'' />";
   // FillNewRow = FillNewRow + "    </td>";
    FillNewRow = FillNewRow + "    <td class='tdAction'>";
    FillNewRow = FillNewRow + "        <button class='btn btn-sm btn-success btn-save'> Save</button>";
    FillNewRow = FillNewRow + "        <button class='btn btn-sm btn-success btn-cancel'> Cancel</button>";
    FillNewRow = FillNewRow + "    </td>";
    FillNewRow = FillNewRow + "</tr>";
    $("#tblData tbody").append(FillNewRow); // appending dynamic string to table tbody
    saveGets()
}
       
function saveGets(){
    $('.btn-save').each(function(){
        
        let excerise =  $(this).parent().parent().find(".txtexcerise").val();
        console.log(excerise)
        $(this).parent().parent().find(".tdexcerise").html(""+excerise+""); 
        let weight =  $(this).parent().parent().find(".txtweight").val();
        $(this).parent().parent().find(".tdweight").html(""+weight+"");
        let reps =  $(this).parent().parent().find(".txtReps").val();
        $(this).parent().parent().find(".tdReps").html(""+reps+"");
        //let mobile =  $(this).parent().parent().find(".txtMobile").val();
       // $(this).parent().parent().find(".tdMobile").html(""+mobile+"");
        $(this).parent().parent().find(".tdAction").html(rowButtons);
        $(this).parent().css({"color": "red", "border": "2px solid red"});

        
    });
}
function deleteAllTableRows() {
    const rows = document.getElementsByTagName('tr'); // get all tr elements
    const rowCount = rows.length; // get the number of rows

    // loop through each row and delete it
    for (let i = rowCount - 1; i >= 0; i--) {
        rows[i].parentNode.removeChild(rows[i]);
    }
}
function deleteElementsWithClass() {
    const elements = document.getElementsByClassName("trNewRow"); // get all elements with the given class
    const elementCount = elements.length; // get the number of elements

    // loop through each element and delete it
    for (let i = elementCount - 1; i >= 0; i--) {
        elements[i].parentNode.removeChild(elements[i]);
    }
    }

function changedate(date){
    deleteElementsWithClass()
    getAPI(date,username)
}


const params = new URLSearchParams(window.location.hash.substr(1));
const accessToken = params.get('access_token');
const id_token = params.get('id_token');
if(accessToken == null){
    if (confirm("Log In")) {
      window.location.href = 'https://gymkeeper.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=367lf40iplnldb73opaqvk9fmr&redirect_uri=https://main.d2dw3kg2zmglnw.amplifyapp.com/';
    } else {
      console.log("not logged in")
    }
}   
console.log("accessToken = "+accessToken)
console.log("id_token = "+id_token)

//authAPI2(accessToken)
const idToken = 'YOUR_ID_TOKEN';

// Decode the ID token and get user information
const tokenPayload = id_token.split('.')[1];
const decodedToken = JSON.parse(atob(tokenPayload));
const username = decodedToken['cognito:username'];
const email = decodedToken['email'];
const groups = decodedToken['cognito:groups'];

console.log('Username:', username);
console.log('Email:', email);
const dateElement = document.getElementById('pickDate'); // get the date element
dateElement.value = getDate();
const dateValue = dateElement.value; // get the value of the date element
getAPI  (dateValue,username)
getAllData(username)
