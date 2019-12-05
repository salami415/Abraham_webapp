import "/src/styles.css";
import $ from "jquery";
$(document).ready(function() {
  var listViewWrapper = function() {
    $("#main").html(`<div class="container"><div class="row card-deck">
  </div></div>`);
  };
  var addCard = function(row) {
    $(".card-deck").append(
      ` <div class="col-md-4 d-flex align-items-stretch"><div class="card">
  <img src="` +
        row.fields.picture[0].thumbnails.large.url +
        `" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">` +
        row.fields.places +
        `</h5>
        <button type="button" class="listButton btn btn-primary btn-sm" data-rowid="` +
        row.id +
        `">(☞ﾟ∀ﾟ)☞ more info</button>
        <p class="card-text"><small class="text-muted">` +
        row.fields.hours +
        `</small> •ᴥ• </p>
  </div>

</div></div>`
    );
    $(".listButton").click(function() {
      var row = window.placeData[$(this).data("rowid")];
      $("#main").html(
        `<div class="container"><div class="row">
<h3>` +
          row.fields.places +
          ` </h3>
<p>` +
          row.fields.info +
          ` </p>
          <p class="card-text"><small class="text-muted">` +
          row.fields.hours +
          `</small></p>
          <button type="button" class="backButton btn btn-primary btn-sm"> ＼(º □ º l|l)/ go back </button>
      </div> ᵔᴥᵔ </div>`
      );
      $(".backButton").click(function() {
        listViewWrapper();
        $.each(window.placeData, function(i, row) {
          addCard(row);
        });
      });
    });
  };
  listViewWrapper();

  $.getJSON(
    "https://api.airtable.com/v0/appH0fPj1CQ4SO91O/Table%201?api_key=key9X0ZZASuKSz10e",
    function(data) {
      window.airTableData = data;
      window.placeData = {};
      $.each(data.records, function(i, row) {
        window.placeData[row.id] = row;
        addCard(row);
      });
    }
  );
});
