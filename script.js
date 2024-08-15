// document.addEventListener('DOMContentLoaded', () => {


    season = document.getElementById('seasonTitle').innerText

    function getCSV(file){

        // TODO
        // take the name of the title of the season page and 
        // correlate it to the csv file your gonna use
        console.log(`/Stats/${file}/season/${season}.csv`)
        fetch(`/Stats/${file}/Season/${season}.csv`)  // Replace with the path to your CSV file
        .then(response => response.text())
        .then(csvData => {
            const tableContainer = document.getElementById('tableContainer');
            tableContainer.innerHTML = '';
            tableContainer.appendChild(csvToTable(csvData));
        })
        .catch(error => console.error('Error fetching CSV file:', error));
    }
// });

// Function to convert CSV to HTML Table
function csvToTable(csv) {
    const rows = csv.trim().split('\n');
    const siteContent = document.getElementById('siteContent')
    const table = document.createElement('table');
    table.id = 'myTable';  // Set the table ID
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create table headers
    const headerRow = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = '#';  // Header for row numbers
    headerRow.appendChild(th);

    const headers = rows[0].split(',');
    headers.forEach((header, index) => {
        const th = document.createElement('th');
        th.classList.add('unsorted'); // Add class to each header
        th.textContent = header;
        th.setAttribute('onclick', `sortTable(${index})`);
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    rows.slice(1).forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        const rowNumberCell = document.createElement('td');
        rowNumberCell.textContent = rowIndex + 1;  // Row numbers start at 1
        tr.appendChild(rowNumberCell);

        const cells = row.split(',');
        if(cells[6] != "N/A"){

            cells[6] = cells[6] *= 100
            cells[6] = parseFloat(cells[6].toFixed(4))
            cells[6]  =`${cells[6]}`
        }
        if(cells[7] != "N/A"){

            cells[7] = cells[7] *= 100
            cells[7] = parseFloat(cells[7].toFixed(4))

            cells[7]  =`${cells[7]}`
        }
        if(cells[8] != "N/A"){

            cells[8] = cells[8] *= 100
            cells[8] = parseFloat(cells[8].toFixed(4))


            cells[8]  =`${cells[8]}`
        }
        if(cells[9] != "N/A"){

            cells[9] = cells[9] *= 100
            cells[9] = parseFloat(cells[9].toFixed(4))


            cells[9]  =`${cells[9]}`
        }
        cells.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);




    return table;
}


function sortTable(columnIndex) {
    const table = document.getElementById('myTable');
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
    if (headers[columnIndex + 1]) {
        headers[columnIndex + 1].style.fontWeight = 'bold';
        headers[columnIndex + 1].classList.add(isAscending ? 'sorted-asc' : 'sorted-desc');
    }

    // Sort rows based on the selected column
    rowsArray.sort((rowA, rowB) => {
        const cellA = rowA.children[columnIndex + 1].textContent.trim();  // Adjust index for row cells
        const cellB = rowB.children[columnIndex + 1].textContent.trim();  // Adjust index for row cells

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
function search() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }









