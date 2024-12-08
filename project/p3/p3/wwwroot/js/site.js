// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {

    $("#modal").dialog({
        autoOpen: false,
        modal: true,
        title: "Course Modal",
        width: 600,
        height: 300
    });

    $('#programAcc').accordion({ collapsible: true });
    $('#degreeAcc').accordion({ collapsible: true });
    $('#gradDegreeAcc').accordion({ collapsible: true });
    $('#minorsAcc').accordion({ collapsible: true });

    // open accordion for people
    $('#testAcc').accordion({ collapsible: true });

    // coursesTable
    $('#coursesTable').DataTable();

    //coop table
    $('#coopTable').DataTable();
    //employment table
    $('#employmentTable').DataTable();
});