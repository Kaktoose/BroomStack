
document.addEventListener('DOMContentLoaded', () => {
    const csvFiles = ['/Stats/Men/Season/2022-2023.csv', '/Stats/Men/Season/2023-2024.csv']; // List your CSV files here
    const teamContainer = document.getElementById('teamContainer');
    const searchInput = document.getElementById('teamSearch');
    let allNames = new Set(); // Use a Set to store unique names

    // Function to read CSV file content
    const fetchCSV = async (file) => {
        const response = await fetch(file);
        const text = await response.text();
        return text;
    };

    // Function to parse CSV content and extract names from the first column
    const parseCSV = (text) => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const names = lines.map(line => line.split(',')[0].trim());
        return names;
    };

    // Function to display names in the HTML
    const displayNames = (names) => {

        

        // names.shift()
        const teamContainerDiv = document.createElement('div');
        teamContainer.innerHTML = ''; // Clear previous content
        teamContainerDiv.classList.add('teamContainerDiv')
        // console.log(names)

        names.forEach(name => {
            const listedName = document.createElement('a');
            listedName.textContent = name;
            listedName.classList.add('listedName')
            listedName.setAttribute('href', `javascript:;`)
            listedName.addEventListener('click', function() {
                buildPage(name);
            });
            teamContainerDiv.appendChild(listedName);
        });
        teamContainer.appendChild(teamContainerDiv);
    };

    // Function to filter and display names based on search input
    const filterNames = (query) => {
        const filteredNames = Array.from(allNames).filter(name => name.toLowerCase().includes(query.toLowerCase()));
        displayNames(filteredNames);
    };

    const removeFirstElement = (set) => {
        const arr = Array.from(set);
        arr.shift(); // Remove the first element
        return new Set(arr); // Return a new Set with the remaining elements
    };

    // Function to load and process CSV files
    const loadCSVFiles = async () => {
        for (const file of csvFiles) {
            const text = await fetchCSV(file);
            const names = parseCSV(text);
            names.forEach(name => allNames.add(name)); // Add names to Set to ensure uniqueness
        }
        allNames = removeFirstElement(allNames);
        displayNames(Array.from(allNames)); // Convert Set to Array for initial display
    };

    // Event listener for search input
    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        // console.log(searchInput.value)
        filterNames(query);
    });

    loadCSVFiles();
});

// function search() {
//     // Declare variables
//     var input, filter, table, tr, td, i, txtValue;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     table = document.getElementById("myTable");
//     tr = table.getElementsByTagName("tr");
  
//     // Loop through all table rows, and hide those who don't match the search query
//     for (i = 0; i < tr.length; i++) {
//       td = tr[i].getElementsByTagName("td")[1];
//       if (td) {
//         txtValue = td.textContent || td.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//           tr[i].style.display = "";
//         } else {
//           tr[i].style.display = "none";
//         }
//       }
//     }
//   }

function buildPage(team){
    // console.log(team)
    teamContainer.innerHTML = ""
    document.getElementById('teamSearch').remove()



    document.getElementById('allTimeTeamName').innerHTML = team

    const filesToSearch = ['/Stats/Women/Season/2023-2024.csv', '/Stats/Men/Season/2022-2023.csv', '/Stats/Men/Season/2023-2024.csv']

    const table = document.createElement('table');

    const thead = document.createElement('thead');
    // const headerRow = document.createElement('tr');



    const tbody = document.createElement('tbody');
    const headerRow= document.createElement('tr')

    fetch('/Stats/Women/Season/2023-2024.csv')
    .then(response => response.text())
    .then(data =>{
        const linesofHeader = data.split("\n")
        const firstLine = linesofHeader[0]; 
        const headerValues = firstLine.split(",")
        headerValues[0] = "Season"
        headerValues.forEach(headerValue => {
            // console.log(headerValue)
            const headerCell = document.createElement('th');
            headerCell.textContent = headerValue; 
            headerRow.appendChild(headerCell);
        });
    
        thead.appendChild(headerRow)
        table.appendChild(thead)
    })

    let resultsObject ={
   

    }

    for (let i = 0; i < filesToSearch.length; i++) {
        console.log(filesToSearch[i], "-----", i)        
        fetch(filesToSearch[i])
        .then(response => response.text())
        .then(data =>{
            const lines = data.split("\n")
            let result = lines.find(line => line.includes(team))
            let year = filesToSearch[i].slice(-13)
            year = year.slice(0, -4)

            
            
            
            if(result){
                let newIndex = Object.keys(resultsObject).length + 1; 
                
                result = `${year},${result}`
                resultsObject[newIndex] = result

                //  console.log(resultsObject, '!!!!')

                const values = result.split(',');
                values.splice(1, 1);

                // console.log(values)
                // values.forEach(() => {
                //     const headerCell = document.createElement('th');
                //     headerCell.textContent = 'Value'; // This is the column header
                //     headerRow.appendChild(headerCell);
                // });

                // thead.appendChild(headerRow);
                // table.appendChild(thead);

                const tbody = document.createElement('tbody');
                const row = document.createElement('tr');
                
                values.forEach(value => {
                    // Create a new table row
                    // console.log(value)
                    const cell = document.createElement('td');
                    cell.textContent = value // Trim any extra spaces
                    row.appendChild(cell);
                });
            
                // tbody.appendChild(headerRow);

                // Append the table body to the table
                table.appendChild(row);
            
                // Append the table to the container div
                document.getElementById('statContainer').appendChild(table);
                
            }
            
            
            
            allTimeStats(resultsObject)
        })
        
        
    }
    
    
}

let atsTimesRan =0;
let catTimesRan =0;


function allTimeStats(resultsList){
    console.log('alltimstats ran')
    atsTimesRan++
    console.log(resultsList, '-----')

    try {
        // Resolve the promise to get the resultsList
        

        // console.log(resultsList, '****');

        // Ensure resultsList is an object
        if (typeof resultsList !== 'object' || resultsList === null) {
            throw new Error('Invalid input: resultsList must be a non-null object');
        }

        for (let key in resultsList) {
            if (resultsList.hasOwnProperty(key)) {
                const value = resultsList[key];

                // Check if the value is a string before attempting to split
                if (typeof value === 'string') {
                    resultsList[key] = value.split(',');
                } else {
                    console.warn(`Value of ${key} is not a string and cannot be split. Value type: ${typeof value}`);
                }
            }
        
        }
        calculateAllTime(resultsList, atsTimesRan)
        
        console.log(resultsList, '8888');
    } catch (error) {
        console.error('Error processing resultsList:', error);
        
        // Retry logic: Retry after a delay (e.g., 1 second)
        setTimeout(() => allTimeStats(resultsOject), 1000);
    }

}


function calculateAllTime(results, timesRan){
    catTimesRan++
    // console.log(results, '%%%%')
    //create a for loop that loops through object then calculates simultaneously
    console.log(catTimesRan, ',', timesRan)
    let listLength = Object.keys(results).length
    let allTimeStatsArray=[]

    let allTimeGames =0;
    let allTimeWins=0;
    let allTimeLosses =0
    let allTimeTies =0;
    let allTimeEnds=0;
    let allTimePF=0
    let allTimePA=0

    //Averages
    let allTimePCT=0
    let allTimHE=0
    let allTimeEEH=0;
    let allTimeEES=0
    let alltimePFG=0
    let alltimePAG=0
    let allTimeDiff=0
    let allTimeHammerPFE=0
    let allTimeHammerPAE=0
    let allTimeNoHammerPFE=0
    let allTimenoHammerPAE=0
    let allTimeEFG=0
    let allTimeEAG=0
    let allTimePFE=0
    let allTimePAE=0
    let allTimeBEG=0
    let allTimeSD=0
    let allTimeFE=0
    let allTimeSE=0




    for(key in results){

            if (results.hasOwnProperty(key)) {
              const array = results[key];
              
               allTimeGames += parseInt(array[2])
               allTimeWins += parseInt(array[3])
               allTimeLosses += parseInt(array[4])
               allTimeTies += parseInt(array[5])
               allTimeEnds += parseInt(array[10])
               allTimePF += parseInt(array[11])
               allTimePA += parseInt(array[12])

               allTimePCT += parseFloat(array[6])
               allTimHE += parseFloat(array[7])
               allTimeEEH += parseFloat(array[8])
               allTimeEES += parseFloat(array[9])
               alltimePFG += parseFloat(array[13])
               alltimePAG += parseFloat(array[14])
               allTimeDiff += parseFloat(array[15])
               allTimeHammerPFE+= parseFloat(array[16])
               allTimeHammerPAE+= parseFloat(array[17])
               allTimeNoHammerPFE+= parseFloat(array[18])
               allTimenoHammerPAE+= parseFloat(array[19])
               allTimeEFG+= parseFloat(array[20])
               allTimeEAG+= parseFloat(array[21])
               allTimePFE+= parseFloat(array[22])
               allTimePAE+= parseFloat(array[23])
               allTimeBEG+= parseFloat(array[24])
               allTimeSD+= parseFloat(array[25])
               allTimeFE+= parseFloat(array[26])
               allTimeSE+= parseFloat(array[27])




                
        }
    }

    allTimePCT /= listLength 
    allTimHE /= listLength 
    allTimeEEH /= listLength 
    allTimeEES /= listLength 
    alltimePFG /= listLength 
    alltimePAG /= listLength 
    allTimeDiff /= listLength 
    allTimeHammerPFE /= listLength 
    allTimeHammerPAE /= listLength 
    allTimeNoHammerPFE /= listLength 
    allTimenoHammerPAE /= listLength 
    allTimeEFG /= listLength 
    allTimeEAG /= listLength 
    allTimePFE /= listLength 
    allTimePAE /= listLength 
    allTimeBEG /= listLength 
    allTimeSD /= listLength 
    allTimeFE /= listLength 
    allTimeSE /= listLength 




    const statsToPutIn = [
        allTimeGames,
        allTimeWins,
        allTimeLosses,
        allTimeTies,
        allTimePCT,
        allTimHE,
        allTimeEEH,
        allTimeEES,
        allTimeEnds,
        allTimePF,
        allTimePA,
    
        //Averages
        alltimePFG,
        alltimePAG,
        allTimeDiff,
        allTimeHammerPFE,
        allTimeHammerPAE,
        allTimeNoHammerPFE,
        allTimenoHammerPAE,
        allTimeEFG,
        allTimeEAG,
        allTimePFE,
        allTimePAE,
        allTimeBEG,
        allTimeSD,
        allTimeFE,
        allTimeSE,
    ]
    allTimeStatsArray.push('All-Time')
    for(let i=0; i < statsToPutIn.length; i++){
        allTimeStatsArray.push(statsToPutIn[i])
    }
    
    
    console.log(allTimePCT, 'allTimePCT');
    console.log(listLength, 'listlength');
    if(timesRan==3){

        makeAllTimeTable(allTimeStatsArray)
    }
    





    function makeAllTimeTable(array){
    const table = document.createElement('table');
    table.id= "allTimeTable"

        document.getElementById('all-time').innerHTML ='All Time'

    const thead = document.createElement('thead');
    // const headerRow = document.createElement('tr');



    const tbody = document.createElement('tbody');
    const headerRow= document.createElement('tr')

    fetch('/Stats/Women/Season/2023-2024.csv')
    .then(response => response.text())
    .then(data =>{
        const linesofHeader = data.split("\n")
        const firstLine = linesofHeader[0]; 
        const headerValues = firstLine.split(",")
        headerValues[0] = ""
        headerValues.forEach(headerValue => {
            // console.log(headerValue)
            const headerCell = document.createElement('th');
            headerCell.textContent = headerValue; 
            headerRow.append(headerCell);
        });
    
        thead.append(headerRow)
        table.append(thead)

        const tbody = document.createElement('tbody');
        const row = document.createElement('tr');

        array.forEach(stat => {
            // Create a new table row
            // console.log(value)
            const cell = document.createElement('td');
            cell.textContent = stat // Trim any extra spaces
            row.appendChild(cell);
            
        });
        table.append(row);
    })
    
        
    // Append the table to the container div
    document.getElementById('allTimeContainer').appendChild(table);
}

    console.log(allTimeStatsArray)


}