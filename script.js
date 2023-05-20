let pointSystem;

document
  .getElementById("votingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve form values
    var participantQuantity = parseInt(
      document.getElementById("participantQuantity").value
    );
    var voteCount = parseInt(document.getElementById("voteCount").value);
    pointSystem = parseInt(document.getElementById("pointSystem").value);

    // Create table
    var table = document.createElement("table");
    var thead = table.createTHead();
    var tbody = table.createTBody();
    var headerRow = thead.insertRow();
    var participantHeader = headerRow.insertCell();
    participantHeader.textContent = "Participants";
    var juryHeader = headerRow.insertCell();
    juryHeader.textContent = "Jury";

    // Generate rows for participants and jury
    for (var i = 1; i <= participantQuantity; i++) {
      var row = tbody.insertRow();
      var participantCell = row.insertCell();
      var participantInput = document.createElement("input");
      participantInput.type = "text";
      participantInput.value = "Participant " + i;
      participantCell.appendChild(participantInput);

      var juryCell = row.insertCell();
      if (i <= voteCount) {
        var juryInput = document.createElement("input");
        juryInput.type = "text";
        juryInput.value = "Jury " + i;
        juryCell.appendChild(juryInput);
      }
    }

    // Append table to the document
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    resultDiv.appendChild(table);

    // Clear form fields
    document.getElementById("votingForm").reset();
  });
document
  .getElementById("generateTableButton")
  .addEventListener("click", function (event) {
    // Retrieve participant and jury names from the table
    var participants = [];
    var juryMembers = [];

    var rows = document.getElementById("result").getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName("td");
      participants.push(cells[0].querySelector("input").value);
      if (cells.length > 1) {
        juryMembers.push(cells[1].querySelector("input").value);
      }
    }

    // Create final table
    var finalTable = document.createElement("table");
    var finalThead = finalTable.createTHead();
    var finalTbody = finalTable.createTBody();

    // Generate rows for final table based on renamed participants and jury
    var finalHeaderRow = finalThead.insertRow();
    var participantHeader = finalHeaderRow.insertCell();
    participantHeader.textContent = "Participants";
    participantHeader.classList.add("sortable");

    for (var j = 0; j < juryMembers.length; j++) {
      var juryHeader = finalHeaderRow.insertCell();
      juryHeader.textContent = juryMembers[j];
      juryHeader.classList.add("sortable");
    }

    var totalPointsHeader = finalHeaderRow.insertCell();
    totalPointsHeader.textContent = "Total Points";
    totalPointsHeader.classList.add("sortable");

    for (var k = 0; k < participants.length; k++) {
      var finalRow = finalTbody.insertRow();
      var participantCell = finalRow.insertCell();
      participantCell.textContent = participants[k];

      var totalPoints = 0;

      for (var l = 0; l < juryMembers.length; l++) {
        var randomPoints = Math.floor(Math.random() * (pointSystem + 1));
        totalPoints += randomPoints;
        var juryCell = finalRow.insertCell();
        juryCell.textContent = randomPoints;
      }

      var totalPointsCell = finalRow.insertCell();
      totalPointsCell.textContent = totalPoints;
    }

    // Append final table to the document
    var finalResultDiv = document.getElementById("finalResult");
    finalResultDiv.innerHTML = "";
    finalResultDiv.appendChild(finalTable);

    // Enable sorting on table headers
    var sortableHeaders = document.querySelectorAll("#finalResult td.sortable");
    console.log("🚀 ~ file: script.js:113 ~ sortableHeaders:", sortableHeaders);
    sortableHeaders.forEach(function (header, index) {
      header.addEventListener("click", function () {
        sortTable(finalTable, index);
      });
    });
  });

function sortTable(table, column) {
  var rows = Array.from(table.tBodies[0].rows);
  var sortOrder = table.dataset.sortOrder === "desc" ? 1 : -1; // Toggle sort order
  console.log("Sort Order:", sortOrder);

  rows.sort(function (rowA, rowB) {
    var cellA = rowA.cells[column].textContent;
    var cellB = rowB.cells[column].textContent;

    if (column !== 0 && column !== rows[0].cells.length - 1) {
      // For non-first and non-last columns, compare as numbers
      return sortOrder * (parseInt(cellA) - parseInt(cellB));
    } else {
      // For first and last columns, compare as strings
      return sortOrder * cellA.localeCompare(cellB);
    }
  });

  // Update the sort order in the table dataset
  table.dataset.sortOrder = sortOrder === 1 ? "asc" : "desc";

  // Remove the "asc" or "desc" class from other sortable headers
  var sortableHeaders = table.tHead.querySelectorAll("th.sortable");
  sortableHeaders.forEach(function (header) {
    header.classList.remove("asc", "desc");
  });

  // Add the appropriate class to the clicked header
  var clickedHeader = table.tHead.querySelector(
    "th.sortable:nth-child(" + (column + 1) + ")"
  );

  if (clickedHeader) {
    clickedHeader.classList.add(sortOrder === 1 ? "asc" : "desc");
  } else {
    console.error("Clicked header not found or is not sortable");
  }

  // Reorder the rows in the table
  rows.forEach(function (row) {
    table.tBodies[0].appendChild(row);
  });
}
