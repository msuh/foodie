$(document).ready(function() {
  var today = new Date(2014, 4, 20);
      // events = [
      //    +new Date(today.getFullYear(), today.getMonth(), 4),
      //    +new Date(today.getFullYear(), today.getMonth(), 5),
      //    +new Date(today.getFullYear(), today.getMonth(), 6),
      //    +new Date(today.getFullYear(), today.getMonth(), 7),
      //    +new Date(today.getFullYear(), today.getMonth(), 8),
      //    +new Date(today.getFullYear(), today.getMonth(), 9),
      //    +new Date(today.getFullYear(), today.getMonth(), 10),
      //    +new Date(today.getFullYear(), today.getMonth(), 11)
      // ];

  $("#calendar").kendoCalendar({
      value: today,
      // dates: events,
      month: {
          // template for dates in month view
          content: '# if ($.inArray(+data.date, data.dates) != -1) { #' +
                      '<div class="' +
                         '# if (data.value < 13) { #' +
                             "exhibition" +
                         '# } else if ( data.value < 20 ) { #' +
                             "party" +
                         '# } else { #' +
                             "cocktail" +
                         '# } #' +
                      '">#= data.value #</div>' +
                   '# } else { #' +
                   '#= data.value #' +
                   '# } #'
      },
      footer: false     

  });
});