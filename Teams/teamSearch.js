
let csvFiles= []
document.addEventListener('DOMContentLoaded', () => {
    let mensFiles = [
        '/Stats/Men/Season/2011-2012.csv',
        '/Stats/Men/Season/2012-2013.csv',
        '/Stats/Men/Season/2013-2014.csv',
        '/Stats/Men/Season/2014-2015.csv',
        '/Stats/Men/Season/2015-2016.csv',
        '/Stats/Men/Season/2016-2017.csv',
        '/Stats/Men/Season/2017-2018.csv',
        '/Stats/Men/Season/2018-2019.csv',
        '/Stats/Men/Season/2019-2020.csv',
        '/Stats/Men/Season/2020-2021.csv',
        '/Stats/Men/Season/2021-2022.csv',
        '/Stats/Men/Season/2022-2023.csv',
        '/Stats/Men/Season/2023-2024.csv'
    ];     
    let womensFiles = [
        '/Stats/Women/Season/2011-2012.csv',
        '/Stats/Women/Season/2012-2013.csv',
        '/Stats/Women/Season/2013-2014.csv',
        '/Stats/Women/Season/2014-2015.csv',
        '/Stats/Women/Season/2015-2016.csv',
        '/Stats/Women/Season/2016-2017.csv',
        '/Stats/Women/Season/2017-2018.csv',
        '/Stats/Women/Season/2018-2019.csv',
        '/Stats/Women/Season/2019-2020.csv',
        '/Stats/Women/Season/2020-2021.csv',
        '/Stats/Women/Season/2021-2022.csv',
        '/Stats/Women/Season/2022-2023.csv',
        '/Stats/Women/Season/2023-2024.csv'
    ];    
    const csvFiles = [
        '/Stats/Women/Season/2011-2012.csv',
        '/Stats/Women/Season/2012-2013.csv',
        '/Stats/Women/Season/2013-2014.csv',
        '/Stats/Women/Season/2014-2015.csv',
        '/Stats/Women/Season/2015-2016.csv',
        '/Stats/Women/Season/2016-2017.csv',
        '/Stats/Women/Season/2017-2018.csv',
        '/Stats/Women/Season/2018-2019.csv',
        '/Stats/Women/Season/2019-2020.csv',
        '/Stats/Women/Season/2020-2021.csv',
        '/Stats/Women/Season/2021-2022.csv',
        '/Stats/Women/Season/2022-2023.csv',
        '/Stats/Women/Season/2023-2024.csv',
        '/Stats/Men/Season/2011-2012.csv',
        '/Stats/Men/Season/2012-2013.csv',
        '/Stats/Men/Season/2013-2014.csv',
        '/Stats/Men/Season/2014-2015.csv',
        '/Stats/Men/Season/2015-2016.csv',
        '/Stats/Men/Season/2016-2017.csv',
        '/Stats/Men/Season/2017-2018.csv',
        '/Stats/Men/Season/2018-2019.csv',
        '/Stats/Men/Season/2019-2020.csv',
        '/Stats/Men/Season/2020-2021.csv',
        '/Stats/Men/Season/2021-2022.csv',
        '/Stats/Men/Season/2022-2023.csv',
        '/Stats/Men/Season/2023-2024.csv'
    ]

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

        
        names.sort()
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

function buildPage(team) {
    // Clear the existing content
    const teamContainer = document.getElementById('teamContainer'); // Make sure to set this correctly
    teamContainer.innerHTML = "";
    document.getElementById('teamSearch').remove();

    document.getElementById('allTimeTeamName').innerHTML = team;

    const filesToSearch = [
        '/Stats/Women/Season/2011-2012.csv',
        '/Stats/Women/Season/2012-2013.csv',
        '/Stats/Women/Season/2013-2014.csv',
        '/Stats/Women/Season/2014-2015.csv',
        '/Stats/Women/Season/2015-2016.csv',
        '/Stats/Women/Season/2016-2017.csv',
        '/Stats/Women/Season/2017-2018.csv',
        '/Stats/Women/Season/2018-2019.csv',
        '/Stats/Women/Season/2019-2020.csv',
        '/Stats/Women/Season/2020-2021.csv',
        '/Stats/Women/Season/2021-2022.csv',
        '/Stats/Women/Season/2022-2023.csv',
        '/Stats/Women/Season/2023-2024.csv',
        '/Stats/Men/Season/2011-2012.csv',
        '/Stats/Men/Season/2012-2013.csv',
        '/Stats/Men/Season/2013-2014.csv',
        '/Stats/Men/Season/2014-2015.csv',
        '/Stats/Men/Season/2015-2016.csv',
        '/Stats/Men/Season/2016-2017.csv',
        '/Stats/Men/Season/2017-2018.csv',
        '/Stats/Men/Season/2018-2019.csv',
        '/Stats/Men/Season/2019-2020.csv',
        '/Stats/Men/Season/2020-2021.csv',
        '/Stats/Men/Season/2021-2022.csv',
        '/Stats/Men/Season/2022-2023.csv',
        '/Stats/Men/Season/2023-2024.csv'
    ];

    const table = document.createElement('table');
    table.id = 'myTable';

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');

    let resultsObject ={
   

    }

    fetch('/Stats/Women/Season/2023-2024.csv')
        .then(response => response.text())
        .then(data => {
            const linesofHeader = data.split("\n");
            const firstLine = linesofHeader[0]; 
            const headerValues = firstLine.split(",");
            headerValues[0] = "Season";
            headerValues.forEach(headerValue => {
                const headerCell = document.createElement('th');
                headerCell.textContent = headerValue; 
                headerRow.appendChild(headerCell);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            return Promise.all(filesToSearch.map(file => fetch(file).then(response => response.text())));
        })
        .then(allFilesData => {
            let tableRows = [];

            allFilesData.forEach((data, index) => {
                const file = filesToSearch[index];
                const lines = data.split("\n");
                let result = lines.find(line => line.includes(team));
                let year = file.slice(-13);
                year = year.slice(0, -4);

                if (result) {
                    let newIndex = Object.keys(resultsObject).length + 1; 
                    result = `${year},${result}`;
                    resultsObject[newIndex] = result;

                    const values = result.split(',');
                    values.splice(1, 1);
                    if(values[6] != "N/A"){

                        values[6] = values[6] *= 100
            
                        values[6]  =`${values[6]}%`
                    }
                    if(values[24] != "N/A"){
            
                        values[24] = values[24] *= 100
            
                        values[24]  =`${values[24]}%`
                    }
                    if(values[25] != "N/A"){
            
                        values[25] = values[25] *= 100
            
                        values[25]  =`${values[25]}%`
                    }
                    if(values[26] != "N/A"){
            
                        values[26] = values[26] *= 100
            
                        values[26]  =`${values[26]}%`
                    }
                    const row = document.createElement('tr');
                    values.forEach(value => {
                        const cell = document.createElement('td');
                        cell.textContent = value;
                        row.appendChild(cell);
                    });

                    tableRows.push(row);
                }
            });

            tableRows.forEach(row => tbody.appendChild(row));
            table.appendChild(tbody);

            document.getElementById('statContainer').appendChild(table);

            sortTable(); // Call sortTable after table is appended to DOM
            allTimeStats(resultsObject)
        });
}

function sortTable() {
    const table = document.getElementById('myTable');
    const tbody = table.querySelector('tbody');
    const rowsArray = Array.from(tbody.getElementsByTagName('tr'));

    rowsArray.sort((rowA, rowB) => {
        const cellA = rowA.getElementsByTagName('td')[0].textContent;
        const cellB = rowB.getElementsByTagName('td')[0].textContent;
        const lastTwoA = cellA.slice(-2);
        const lastTwoB = cellB.slice(-2);

        return lastTwoA.localeCompare(lastTwoB);
    });

    rowsArray.forEach(row => tbody.appendChild(row));
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
    console.log(catTimesRan, ',', results)
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
              console.log(parseInt(array[2]), 'array')
              
               allTimeGames += parseInt(array[2])
               allTimeWins += parseInt(array[3])
               allTimeLosses += parseInt(array[4])
               allTimeTies += parseInt(array[5])

               allTimePCT += parseFloat(array[6])
               allTimeEEH += parseFloat(array[8])
               allTimeEES += parseFloat(array[9])





                
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

    allTimeFE *= listLength 
    allTimHE *= listLength 

    allTimeSE *= listLength 

    allTimeFE = `${allTimeFE}%`
    allTimHE += "%" 

    allTimeSE += "%" 





    const statsToPutIn = [
        allTimeGames,
        allTimeWins,
        allTimeLosses,
        allTimeTies,
        allTimePCT,
        allTimeEEH,
        allTimeEES,


    ]
    allTimeStatsArray.push('All-Time')
    for(let i=0; i < statsToPutIn.length; i++){
        if(statsToPutIn != "N/A"){

            allTimeStatsArray.push(statsToPutIn[i])
        } else{
            allTimeStatsArray.push('N/A')
        }
    }
    
    
    console.log(allTimePCT, 'allTimePCT');
    console.log(listLength, 'listlength');
    // if(timesRan==8){

        makeAllTimeTable(allTimeStatsArray)
    // }
    





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
        const firstLine = " ,Games, Wins, Losses, Ties, PCT, ExtraEndHammer, ExtraEndSteal"; 
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

// function sortTable() {
//     const table = document.getElementById('myTable');
//     const tbody = table.querySelector('tbody');
//     const rowsArray = Array.from(tbody.getElementsByTagName('tr'));

//     // Sort the rows based on the last 2 characters of the first column's cell
//     rowsArray.sort((rowA, rowB) => {
//         const cellA = rowA.getElementsByTagName('td')[0].textContent;
//         const cellB = rowB.getElementsByTagName('td')[0].textContent;
//         const lastTwoA = cellA.slice(-2);
//         const lastTwoB = cellB.slice(-2);

//         // Compare the last two characters
//         return lastTwoA.localeCompare(lastTwoB);
//     });

//     // Re-append the sorted rows to the tbody
//     rowsArray.forEach(row => tbody.appendChild(row));
// }