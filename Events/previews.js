const listContainer = document.getElementById('eventContainer')

    //Every Event Code
    // tourChallengeM: 
    // tourChallengeW: 
    // panContM:
    // panContW:
    // canadianOpenM
    // canadianOpenW
    // eurosM
    // eurosM
    // nationalM
    // nationalW
    // mastersM
    // mastersW
    // ontTankard
    // ontScotties
    // saskTankard
    // saskScotties
    // manScotties
    // bostonPizza
    // viterraMan
    // scotties
    // brier
    // worldWomens
    // worldMens



let lineups = {
    tourChallengeM: [], 
    tourChallengeW: [], 
    panContM: [],
    panContW: [],
    canadianOpenM: [],
    canadianOpenW: [],
    eurosM: [],
    eurosM: [],
    nationalM: [],
    nationalW: [],
    mastersM: [],
    mastersW: [],
    ontTankard: [],
    ontScotties: [],
    saskTankard: [],
    saskScotties: [],
    manScotties: [],
    bostonPizza: [],
    viterraMan: [],
    scotties: [],
    brier: [],
    worldWomens: [],
    worldMens: [],
}

let eventNames = {
    tourChallengeM: "M: Hearing Life Tour Challenge",
    tourChallengeW: "W: Hearing Life Tour Challenge",
    panContM: "M: Pan Continental Championships",
    panContW: "W: Pan Continental Championships",
    canadianOpenM: 'M: Co-Op Canadian Open',
    canadianOpenW: 'W: Co-Op Canadian Open',
    eurosM: 'M: European Championship',
    eurosM: 'W: European Championship',
    nationalM: 'M: Kioti National',
    nationalW: 'W: Kioti National',
    mastersM: 'M: WFG Masters',
    mastersW: 'W: WFG Masters',
    ontTankard: 'Ontario Tankard',
    ontScotties: 'Ontario Scotties',
    saskTankard: 'Saskatchewan Tankard',
    saskScotties: 'Saskatchewan Scotties',
    manScotties: 'Manitoba RME Women of The Rings',
    bostonPizza :'Alberta Boston Pizza Cup',
    viterraMan: "Manitoba Viterra Men's Championship",
    scotties: "Scotties Tournament of Hearts",
    brier: "Montana's Brier",
    worldWomens: 'World Womens',
    worldMens: 'World Mens',





}



async function generatePreview(eventName){


    listContainer.innerHTML=""
    const womensCSV = '/Stats/Women/2024-2025.csv'
    const eventLineup = lineups[eventName]
    const mensCSV = '/Stats/Men/2024-2025.csv'
    buildPage(eventLineup, eventName)
    
    
    let title = document.createElement('h2')
    title.style.textAlign  ='center'
    title.innerText = `${eventNames[eventName]} Event Preview`
    listContainer.appendChild(title)
    
}







function buildPage(team, eventName) {
    // Clear the existing content
    

    // let fileToSearch = [

    //     '/Stats/Women/Season/2023-2024.csv',

    //     '/Stats/Men/Season/2023-2024.csv'
    // ];


    if(eventName.slice(-1) == "M"){
        fileToSearch = '/Stats/Men/Season/2023-2024.csv'
    } else if(eventName.slice(-1) == "W"){
        
        fileToSearch = '/Stats/Women/Season/2023-2024.csv'
    } else{
        console.error('invalid selection')
    }


    const table = document.createElement('table');
    table.id = 'previewTable';

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');


    fetch(fileToSearch)
        .then(response => response.text())
        .then(data => {
            const linesofHeader = data.split("\n");
            const firstLine = linesofHeader[0]; 
            let headerValues = firstLine.split(",");
            headerValues.unshift('#')
            // headerValues.forEach(headerValue => {
            //     const headerCell = document.createElement('th');
            //     headerCell.textContent = headerValue; 
            //     headerRow.appendChild(headerCell);
            // });

            headerValues.forEach((header, index) => {
                const th = document.createElement('th');
                th.classList.add('unsorted'); // Add class to each header
                th.textContent = header;
                th.setAttribute('onclick', `sortTable(${index})`);
                headerRow.appendChild(th);
            });


            thead.appendChild(headerRow);
            table.appendChild(thead);

            return fetch(fileToSearch).then(response => response.text());
            })
        .then(allFilesData => {
            let tableRows = [];

            team.forEach(((teamName, rowIndex) => {
                
                console.log(teamName)
                const file = fileToSearch;
                const lines = allFilesData.split("\n");
                let result = lines.find(line => line.includes(teamName));                
                
                console.log(rowIndex)

                

                if (result) {
                    
                    result = ` , ${result}`
                    // let newIndex = Object.keys(resultsObject).length + 1; 
                    // result =`${result}`;

                    const values = result.split(',');
                    console.log(values)
                    if(values[6] != "N/A" | values[6] != NaN){

                        values[6] = values[6] *= 100
                        values[6] = parseFloat(values[6].toFixed(4))
            
                        values[6]  =`${values[6]}`
                    }
                    if(values[7] != "N/A"){
            
                        values[7] = values[7] *= 100
                        values[7] = parseFloat(values[7].toFixed(4))
            
                        values[7]  =`${values[7]}`
                    }
                    if(values[8] != "N/A"){
            
                        values[8] = values[8] *= 100
                        values[8] = parseFloat(values[8].toFixed(4))
            
                        values[8]  =`${values[8]}`
                    }
                    if(values[9] != "N/A"){
            
                        values[9] = values[9] *= 100
                        values[9] = parseFloat(values[9].toFixed(4))
            
                        values[9]  =`${values[9]}`
                    }
                    const row = document.createElement('tr');
                    values.forEach(value => {
                        const cell = document.createElement('td');
                        cell.textContent = value;
                        row.appendChild(cell);
                    });

                    tableRows.push(row);
                }
            }));
            tableRows.forEach(row => tbody.appendChild(row));
            table.appendChild(tbody);

            document.getElementById('eventContainer').appendChild(table);

            sortTable(); // Call sortTable after table is appended to DOM
        });
}

// function sortTable() {
//     const table = document.getElementById('myTable');
//     const tbody = table.querySelector('tbody');
//     const rowsArray = Array.from(tbody.getElementsByTagName('tr'));

//     rowsArray.sort((rowA, rowB) => {
//         const cellA = rowA.getElementsByTagName('td')[0].textContent;
//         const cellB = rowB.getElementsByTagName('td')[0].textContent;
//         const lastTwoA = cellA.slice(-2);
//         const lastTwoB = cellB.slice(-2);

//         return lastTwoA.localeCompare(lastTwoB);
//     });

//     rowsArray.forEach(row => tbody.appendChild(row));
// }


function sortTable(columnIndex) {
    const table = document.getElementById('previewTable');
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    const rowsArray = Array.from(tbody.querySelectorAll('tr'));
    const isAscending = table.getAttribute('data-sort') === 'asc';
    table.setAttribute('data-sort', isAscending ? 'desc' : 'asc');
    

    // Get column headers
    const headers = thead.querySelectorAll('th');
    headers.forEach(header => {
        header.style.fontWeight = 'normal';
        header.classList.remove('sorted-asc', 'sorted-desc', 'unsorted'); // Remove classes for arrows
        

    });

    // Add bold styling to the currently sorted header
    if (headers[columnIndex ]) {
        headers[columnIndex ].style.fontWeight = 'bold';
        headers[columnIndex ].classList.add(isAscending ? 'sorted-asc' : 'sorted-desc');
    }



    // Sort rows based on the selected column
    rowsArray.sort((rowA, rowB) => {
    console.log(rowA)

        const cellA = rowA.children[columnIndex ].textContent.trim();  // Adjust index for row cells
        const cellB = rowB.children[columnIndex ].textContent.trim();  // Adjust index for row cells

        const a = isNaN(cellA) ? cellA.toLowerCase() : parseFloat(cellA);
        const b = isNaN(cellB) ? cellB.toLowerCase() : parseFloat(cellB);

        return isAscending ? (a > b ? 1 : -1) : (a < b ? 1 : -1);
    });

    // Update row numbers based on the new sorting order
    rowsArray.forEach((row, index) => {
        row.children[0].textContent = !isAscending ? index + 1 : rowsArray.length - index;

    });

    // Append rows in the sorted order
    rowsArray.forEach(row => tbody.appendChild(row));
}