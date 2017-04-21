var monthLiteral = null,// Global variables for content
    curYear = null;

function createCalendar(id, year, month) {
    var calendar = document.getElementById('calendar'),
        monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        curMonth = month - 1, // months in JS go from 0 to 11, not from 1 to 12
        curDate = new Date(year, curMonth),
        table = '<table><tr><td id="calendarHeader" colspan="7"></td></tr><tr>';
    table = table + '<th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>';
    monthLiteral = monthList[curMonth];
    curYear = year;

    for (var i = 0; i < getDay(curDate); i++) {  //Fill the first row from Monday and until the day the month// begins:// * * * | 1 2 3 4
        table = table + '<td></td>';
    }

    while (curDate.getMonth() == curMonth) { //Fill in calendar cells with dates
        table = table + '<td>' + curDate.getDate() + '</td>';

        if (getDay(curDate) % 7 == 6) { //Sunday is the last day - line feed
            table = table + '</tr><tr>';
        }
        curDate.setDate(curDate.getDate() + 1);
    }

    if (getDay(curDate) != 0) { // finish the table with empty cells if needed
        for (var i = getDay(curDate); i < 7; i++) {
            table = table + '<td></td>';
        }
    }

    table = table + '</tr></table>'; //close the table
    calendar.innerHTML = table;
}

function getDay(date) {
    var day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

createCalendar('calendar', 1983, 6);

var header = document.getElementById('calendarHeader'); //Content of calendar header
console.dir(header);
header.innerText = monthLiteral + ' ' + curYear;

var cells = document.getElementsByTagName('td'); // Paint weekend days on red
for (var i = 0; i < cells.length; i++) {
    if (cells[i].cellIndex == 6 || cells[i].cellIndex == 5) {
        cells[i].style.color = 'red';
    }
}

var wrapper = document.getElementById('wrapper'),
    btn = document.getElementsByTagName('tbody'),
    close = document.getElementById('close'),
    modal = document.getElementById('curModal');

btn[0].onclick = function (e) { // Events on click
    if (e.target.innerText && e.target != header && e.target.nodeName != 'TH') {
        wrapper.style.display = 'block';
        modal.innerText = monthLiteral + ' ' + e.target.innerText + ', ' + curYear;
    }
};

close.onclick = function () {
    wrapper.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == wrapper) {
        wrapper.style.display = 'none';
    }
};