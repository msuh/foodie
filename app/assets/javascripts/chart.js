function createChart() {
    $("#chart").kendoChart({
        title: {
            text: "04/04/14 - 04/11/14",
            color: "#00A19B"      
        },
        legend: {
           visible: false           
        },
        seriesDefaults: {
            labels: {
                template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                position: "center",
                visible: true,
                background: "transparent",
                size: 20
            }
        },
        series: [{
            type: "pie",
            data: [{
                category: "Pad Thai",
                value: 50
            }, {
                category: "Pad See Ew",
                value: 40
            }, {
                category: "Ramen",
                value: 10
            }]
        }],
        tooltip: {
            visible: false,
            template: "#= category # : #= kendo.format('{0:P}', percentage) #"
        },

        chartArea: {
            width: 305,
            height: 400            
        }
    });
}

function refresh() {
    var chart = $("#chart").data("kendoChart"),
        pieSeries = chart.options.series[0],
        labels = $("#labels").prop("checked"),
        alignInputs = $("input[name='alignType']"),
        alignLabels = alignInputs.filter(":checked").val();

    chart.options.transitions = false;
    pieSeries.labels.visible = labels;
    pieSeries.labels.align = alignLabels;

    alignInputs.attr("disabled", !labels);

    chart.refresh();
}

$(document).ready(function() {
    createChart();
    $(document).bind("kendo:skinChange", createChart);
    $(".configuration-horizontal").bind("change", refresh);
});

