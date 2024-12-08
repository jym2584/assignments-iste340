// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {

    // news page
    $("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left");

    // index page for dynamic course loading
    $("#modal").dialog({
        autoOpen: false,
        modal: true,
        title: "Course Modal",
        width: 600,
        height: 300,
        position: { my: "center top", at: "center top+100", of: window }
    });

    $(".rotate").textrotator({
        animation: "dissolve", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
        separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
        speed: 2000 // How many milliseconds until the next word show.
    });

    // index page
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