const countriesEurope = [
  "Albania",
  "Andorra",
  "Armenia",
  "Austria",
  "Azerbaijan",
  "Belarus",
  "Belgium",
  "Bosnia and Herzegovina",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "Ireland",
  "Italy",
  "Kosovo",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Malta",
  "Moldova",
  "Monaco",
  "Montenegro",
  "The Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "San Marino",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Turkey",
  "Ukraine",
  "United Kingdom",
  "Vatican City",
];

var width = 800,
  height = 860,
  innerRadius = 60,
  outerRadius = 300,
  nodeRadius = 3.3,
  heroNoderadius = 5,
  nodeOtherWidth = 5,
  keySize = 10,
  keySpacing = 10,
  radial = "year",
  animationDuration = 2000,
  keyWidth = 160,
  keyHeight = 260,
  filter = 0,
  filterKey = "",
  clientFilter = "All Startups",
  geoFilter = "All Startups",
  filters = { type: "All Startups", geotype: "All Startups" };
(logoPath = "assets/logoIngka.png"),
  (titleLogoWidth = 80),
  (titleLogoHeight = 50),
  (hoverOn = 0);
(hoverSegment = ""),
  (leftWidth = 1100),
  (leftHeight = 650),
  (bar_width = 900),
  (bar_height = 460),
  (popupMode = { page: "none", type: "none" }),
  (indexTracker = {}),
  (selectedFilter = "none"),
  (heroFilterActive = "false");
indexTrackerYear = {};
eu = true;

// mapbox access token
const accessToken =
  "pk.eyJ1IjoiZWRkaWVsOTIiLCJhIjoiY2thb2VhZ2RsMDJsaDJ0cW4wYmppNzFwbCJ9.qo71Gruasxg7YdwOSVtmZw";

L.mapbox.accessToken = accessToken;

var categoryFontObject = [
  { name: "themeFont", dy_upper: "-1.15em", dy_lower: "1.85em" },
  {
    fontSize: "30px",
    letterSpacing: "5px",
    letterSpaceVal: 5,
    dy_upper: "-1.05em",
    dy_lower: "1.8em",
  },
  {
    fontSize: "24px",
    letterSpacing: "4px",
    letterSpaceVal: 4,
    dy_upper: "-1.25em",
    dy_lower: "2em",
  },
];

// loader settings
var opts = {
  lines: 9, // The number of lines to draw
  length: 7, // The length of each line
  width: 8, // The line thickness
  radius: 24, // The radius of the inner circle
  top: "57%",
  left: "38.5%",
  color: " #0058ab", // #rgb or #rrggbb or array of colors
  speed: 1.9, // Rounds per second
  trail: 40, // Afterglow percentage
  className: "spinner", // The CSS class to assign to the spinner
};

var target = document.getElementById("chart-container");

var spinner = new Spinner(opts).spin(target);

d3.select("#radar-toggle-btn").attr("class", "left-sidebar-btn active");
d3.select(".popup-bg").style("display", "none");

var svg = d3
  .select("#chart-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var chartSVG = svg
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 20) + ")");

var keySVG = d3
  .select("#key-container")
  .append("svg")
  .attr("width", keyWidth)
  .attr("height", keyHeight)
  .append("g")
  .attr("transform", "translate(" + keyWidth / 2 + "," + keyHeight / 2 + ")");

var hoverSVG = d3
  .select("#hover-info-container")
  .append("svg")
  .attr("width", 200)
  .attr("height", 300)
  .append("g")
  .attr("transform", "translate(" + 200 / 2 + "," + 300 / 2 + ")");

var chartTitle = chartSVG
  .append("text")
  .attr("class", "chart-title")
  .text("Ingka - Workspace as a service Compass")
  .attr("y", (-height * 4.55) / 10);

d3.select(".map-container").style("display", "none");
d3.select(".map-tooltip").style("display", "none");

var chartLogo = chartSVG
  .append("image")
  .attr("xlink:href", logoPath)
  .attr("width", titleLogoWidth)
  .attr("height", titleLogoHeight)
  .attr("y", -titleLogoHeight / 2)
  .attr("x", -titleLogoWidth / 2)
  .style("display", "none");
var filteredDataWhenIncCompass = [];
d3.csv("INGKA_RM_L@W_Startup4.csv").then(function (data) {
  // let data = dat.filter(row =>
  // row['Founded'].trim() != '#N/A'
  // &&
  // row['Founded'].trim() != ''
  // &&
  // row['Inc.-Compass'] ==  1
  // )
  // debugger
  var compassOne = "1. Accessing a global network of flexible workspaces";
  var compassSecond = "2. The entrepreneurial space to work and grow with IKEA";

  //compassOne = compassSecond;
  data.forEach((row) => {
    if (row["Business Model Option"].includes("(")) {
      row["Business Model Option"] =
        row["Business Model Option"].split(") ")[1];
    } else {
      row["Business Model Option"] = row["Business Model Option"];
    }

    //if (row['Inc. Compass'] == "TRUE" && (row['Play'].replace(/\s/g, '') == compassOne.replace(/\s/g, ''))) {
    // debugger
    if (
      row["Inc. Compass"] == "TRUE" &&
      (row["Play"].replace(/\s/g, "") == compassOne.replace(/\s/g, "") ||
        row["Play"].replace(/\s/g, "") == compassSecond.replace(/\s/g, ""))
    ) {
      //   if (row['Inc. Compass'] == "TRUE"){
      if (row["Business Model Option"] == "") {
        row["Business Model Option"] = "blank";
      }
      // console.log(row)
      filteredDataWhenIncCompass.push(row);
    }
  });

  //   data.forEach((row) => {
  //     if (row["Region"].includes("(")) {
  //       row["Region"] = row["Region"].split(") ")[1];
  //     } else {
  //       row["Region"] = row["Region"];
  //     }
  //     if (row["Inc. Compass"] == "TRUE") {
  //       filteredDataWhenIncCompass.push(row);
  //     }
  //   });

  data = filteredDataWhenIncCompass;
  var check = d3
    .nest()
    .key(function (d) {
      return d["Play"];
    })
    .key(function (d) {
      return d["Business Model Option"];
    })
    .entries(data);

  let focusArea = [];
  data.forEach((row) => {
    // if(row['Play'].trim() == 'Space Design & Mgmt'){
    //   row['Play'] = 'Space Design & Management'
    // }
    // if(row['Play'].trim() == 'Space Design & Management​'){
    //   row['Play'] = 'Space Design & Management'
    // }
    // if(row['Play'].trim() == 'Finance'){
    //   row['Play'] = 'Financing'
    // }
    // if(row['Play'].trim() == 'IT'){
    //   row['Play'] = ''
    // }
    focusArea.push(row["Play"]);

    if (countriesEurope.includes(row.Country)) {
      row.Country = "Europe";
    } else {
      row.Country = "Global";
    }
  });

  const uniqFocusArea = [...new Set(focusArea)];
  let oppSpaceObj = {};
  uniqFocusArea.forEach((key) => {
    oppSpaceObj[key] = [];
  });
  data.forEach((row) => {
    if (!oppSpaceObj[row["Play"]].includes(row["Business Model Option"])) {
      oppSpaceObj[row["Play"]].push(row["Business Model Option"]);
    }
  });

  data = data.filter(function (d) {
    return +d["Founded"] >= 2012 && d["Play"] != "";
  });

  var transform = d3.geoTransform({ point: projectPoint });
  var path = d3.geoPath().projection(transform);

  d3.select("#map")
    .attr("width", window.innerWidth + "px")
    .attr("height", window.innerHeight + "px")
    .style("width", window.innerWidth + "px");

  var map = new L.Map("map", {
    center: [0, 100],
    zoom: 2,
    minZoom: 2,
    maxZoom: 6,
  })
    .whenReady(function () {
      setTimeout(function () {
        map.invalidateSize(true);
      }, 400);
      //L.Map.invalidateSize()
    })
    .addLayer(
      new L.TileLayer(
        "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=" +
          accessToken,
        {
          attribution:
            '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      )
    );

  spinner.stop();
  d3.select("#save-button").style("display", "block");
  d3.select(".chart-title").style("display", "");
  chartLogo.style("display", "block");

  $(document).ready(function () {
    $("#toggle-button1").addClass("active");
  });

  $(document).ready(function () {
    $("#toggle-btn1").addClass("active");
  });

  d3.json("assets/world_countries.json").then(function (json) {
    d3.csv("assets/worldcities.csv").then(function (cityData) {
      var q = d3.queue();

      d3.select("#radar-toggle-btn").on("click", function () {
        d3.select("#map-toggle-btn").attr("class", "left-sidebar-btn");
        d3.select("#analysis-toggle-btn").attr("class", "left-sidebar-btn");
        d3.select("#air-table-toggle-btn").attr("class", "left-sidebar-btn");
        d3.select("#radar-toggle-btn").attr("class", "left-sidebar-btn active");
        d3.select("body").style("background-color", "white");
        toggle_map("off");
      });

      // MAP
      // country MapBox hover
      function country_hover(d, i) {
        d3.selectAll(".country-circle")
          .attr("fill", function (v) {
            if (v.properties.name === d.properties.name) {
              return "#247DC5";
            } else {
              return "#7DCCFF";
            }
          })
          .attr("stroke", function (v) {
            if (v.properties.name === d.properties.name) {
              return "#247DC5";
            } else {
              return "#7DCCFF";
            }
          });

        var tooltip = "<div>" + d.properties.name + "</div>";
        tooltip += "<div>Startups: " + d.properties.startups + "</div>";
        d3.select(".map-tooltip")
          .html(tooltip)
          .style("top", function () {
            return d3.event.y + "px";
          })
          .style("left", function () {
            return d3.event.x - 136 + "px";
          })
          .style("display", "");

        d3.select(".sidebar-title").html(d.properties.name);

        startup_list = [];
        data.forEach(function (w) {
          let countryName;
          if (w["Headquarters Location"]) {
            countryName = w["Headquarters Location"].split(",")[2];
            countryName = countryName.trim();
            if (countryName == "United States") {
              countryName == "USA";
            }
          }
          if (countryName === d.properties.name) {
            var obj = {
              Name: w["Organization Name"],
              Funding: w["Total Funding (USD)"],
              Website: w["Organization Name URL"],
              Founded: w["Founded"],
            };
            startup_list.push(obj);
          }
        });

        var table = "";
        table += "<table class='startup-table'>";
        table +=
          "<tr class='table-header'><td>Company:</td><td>Funding:</td><td>Founded:</td></tr>";
        startup_list.forEach(function (v) {
          table +=
            "<tr><td><a href='" +
            v.Website +
            "' target='_blank'>" +
            v["Name"] +
            "</a></td><td>$" +
            formatFunding(v.Funding) +
            "</td><td>" +
            v["Founded"] +
            "</td></tr>";
        });
        table += "</table>";
        d3.select("#startup-list").html(table);
      }

      // country MapBox click
      function country_click(d) {
        d3.select(".popup-container").attr("class", "popup-container added");
        d3.select(".popup-bg").style("display", "");
        d3.select(".popup-section-a").style("display", "none");
        d3.select(".popup-section-b").style("display", "");
        d3.select(".analysis-btn").style("display", "none");
        d3.select(".map-tooltip").style("display", "none");

        bar_data = [];
        data.forEach(function (w) {
          if (w.Country === d.properties.name) {
            var obj = {
              Name: w["Name"],
              Funding: w["Total Funding (USD)"],
              Website: w["Website"],
              Founded: w["Founded"],
              Maturity: w["Maturity"],
            };
            bar_data.push(obj);
          }
        });
        update_bar("Amount of Funding");
      }

      var svgLayer = L.svg();
      svgLayer.addTo(map);

      var mapSvg = d3
        .select("#map")
        .select("svg")
        .style("pointer-events", "auto");
      var mapG = d3.select("#map").select("svg").append("g");
      mapG.attr("class", "leaflet-zoom-hide");

      data_country = d3
        .nest()
        .key(function (d) {
          return d.Country;
        })
        .entries(data);

      json_country = d3
        .nest()
        .key(function (d) {
          return d.properties.name;
        })
        .entries(json.features);

      data.forEach(function (v) {
        let countryName;
        if (v["Headquarters Location"]) {
          countryName = v["Headquarters Location"].split(",")[2];
          countryName = countryName.trim();
          if (countryName == "United States") {
            countryName == "USA";
          }
        }
        json.features.forEach(function (w) {
          if (countryName === w.properties.name) {
            v.json_country = w.properties.name;
          }
        });
      });

      json.features.forEach(function (w) {
        w.properties.startups = 0;
        data.forEach(function (v) {
          let countryName;
          if (v["Headquarters Location"]) {
            countryName = v["Headquarters Location"].split(",")[2];
            countryName = countryName.trim();
            if (countryName == "United States") {
              countryName == "USA";
            }
          }
          if (countryName === w.properties.name) {
            v.json_country = w.properties.name;
            w.properties.startups += 1;
          }
        });
      });

      var max_country = d3.max(json.features, function (w) {
        return w.properties.startups;
      });

      var countryCircleScale = d3
        .scaleSqrt()
        .domain([1, max_country])
        .range([2.6, 30]);

      json.features = json.features.filter(function (d) {
        return d.geometry.coordinates[0].length > 2;
      });

      q.awaitAll(function (error) {
        if (error) throw error;
        setTimeout(function () {
          mapG
            .selectAll(".country-circle")
            .data(json.features)
            .enter()
            .append("circle")
            .classed("country-circle", true)
            .attr("r", function (d) {
              if (d.properties.startups > 0) {
                return countryCircleScale(d.properties.startups);
              }
            })
            .attr("cx", function (d, i) {
              let arr = d.geometry.coordinates[0];
              if (arr.length < 2) {
                arr = d.geometry.coordinates[0][0];
              }
              if (arr != [0, 0]) {
                return map.latLngToLayerPoint(
                  new L.LatLng(center(arr)[1], center(arr)[0])
                ).x;
              }
            })
            .attr("cy", function (d, i) {
              let arr = d.geometry.coordinates[0];
              if (arr.length < 2) {
                arr = d.geometry.coordinates[0][0];
              }
              if (arr != [0, 0]) {
                return map.latLngToLayerPoint(
                  new L.LatLng(center(arr)[1], center(arr)[0])
                ).y;
              }
            })
            .attr("fill", "#7DCCFF")
            .attr("stroke", "#7DCCFF")
            .style("cursor", "pointer")
            .on("mouseover", function (d) {
              country_hover(d);
            })
            .on("click", country_click);
        }, 2000);
      });

      function reset(e) {
        d3.select(".map-tooltip").style("display", "none");
        mapG
          .selectAll(".country-circle")
          .attr("cx", function (d, i) {
            let arr = d.geometry.coordinates[0];
            if (arr.length < 2) {
              arr = d.geometry.coordinates[0][0];
            }
            if (arr != [0, 0]) {
              return map.latLngToLayerPoint(
                new L.LatLng(center(arr)[1], center(arr)[0])
              ).x;
            }
          })
          .attr("cy", function (d, i) {
            let arr = d.geometry.coordinates[0];
            if (arr.length < 2) {
              arr = d.geometry.coordinates[0][0];
            }
            if (arr != [0, 0]) {
              return map.latLngToLayerPoint(
                new L.LatLng(center(arr)[1], center(arr)[0])
              ).y;
            }
          })
          .style("visibility", function () {
            if (e.target._zoom <= 3) {
              return "visible";
            } else {
              return "hidden";
            }
          })
          .attr("fill", "#7DCCFF")
          .attr("stroke", "#7DCCFF");

        mapG
          .selectAll(".city-circle")
          .attr("cx", function (d, i) {
            return map.latLngToLayerPoint(new L.LatLng(d.cityLat, d.cityLng)).x;
          })
          .attr("cy", function (d, i) {
            return map.latLngToLayerPoint(new L.LatLng(d.cityLat, d.cityLng)).y;
          })
          .style("visibility", function () {
            if (e.target._zoom > 3) {
              return "visible";
            } else {
              return "hidden";
            }
          })
          .attr("fill", "#7DCCFF")
          .attr("stroke", "#7DCCFF");
      }

      map.on("zoom", function (e) {
        reset(e);
      });

      map.on("drag", function () {
        d3.select(".map-tooltip").style("display", "none");
      });

      var tempOrder = d3
        .nest()
        .key(function (d) {
          return d["Play"];
        })
        .entries(data);

      var themeOrder = [];
      var focusAreaOrder = [];
      check.forEach(function (d) {
        themeOrder.push(d.key);
        d.values.forEach(function (v) {
          focusAreaOrder.push(v.key.toLowerCase());
        });
      });

      var focusAreaSort = focusAreaOrder;

      // need to fix.
      var fundingCategoryDomain = [
        "Undisclosed",
        "Unfunded",
        "Funding Raised",
        "Seed",
        "Series A",
        "Series B",
        "Series C",
        "Series D",
        "Series E",
        "Public",
      ];

      var fundingCategoryRange = [
        "Private",
        "Private",
        "Private",
        "Seed",
        "Series A",
        "Series B",
        "Series C+",
        "Series C+",
        "Series C+",
        "Series C+",
      ];

      var fundingCategoryRangeUnique = [...new Set(fundingCategoryRange)];

      var fundingCategoryScale = d3
        .scaleOrdinal()
        .domain(fundingCategoryDomain)
        .range(fundingCategoryRange);
      //var colors = ["#c27ba0ff","#8e7cc3ff", "#6fa8dcff", "#76a5afff", "#93c47dff"];
      var colors = ["#E9E9E9", "#a3e8ff", "#0BC2FF", "#006B8E", "#003D51"];

      var nodeColorScale = d3
        .scaleOrdinal()
        .domain(fundingCategoryRangeUnique)
        .range(colors);

      var focusAreaSortedParents1 = d3
        .nest()
        .key(function (d) {
          return d["Play"];
        })
        .key(function (d) {
          return d["Business Model Option"];
        })
        .rollup(function (v) {
          var totalFunding = d3.sum(v, function (d) {
            return +getValueWithoutCurrencySymbol(d["Total Funding (USD)"]);
          });
          return totalFunding;
        })
        .entries(data);
      //--------------

      var focusAreaSorted1 = [];
      focusAreaSortedParents1.forEach((f, i) => {
        f.values.forEach((fv) => {
          fv.parent = f.key;
        });
        focusAreaSorted1 = focusAreaSorted1.concat(f.values);
      });

      function themeSort(a, b) {
        for (i = 0; i < themeOrder.length; i++) {
          if (a === themeOrder[i]) {
            var valA = i;
          }
          if (b === themeOrder[i]) {
            var valB = i;
          }
        }
        return valA < valB ? -1 : valA > valB ? 1 : valA >= valB ? 0 : NaN;
      }

      var count_by_focus_area = d3
        .nest()
        .key(function (d) {
          return d["Play"];
        })
        .sortKeys(themeSort)
        .entries(data);

      var count_by_themes = d3
        .nest()
        .key(function (d) {
          return d["Play"];
        })
        .sortKeys(themeSort)
        .entries(data);

      var count_by_maturity = d3
        .nest()
        .key(function (d) {
          return d["Maturity"];
        })
        .rollup(function (v) {
          return v.length;
        })
        .entries(data);

      var count_by_stage = d3
        .nest()
        .key(function (d) {
          return d["Funding Stage"];
        })
        .rollup(function (v) {
          return v.length;
        })
        .entries(data);

      var count_by_year = d3
        .nest()
        .key(function (d) {
          if (d["Founded"] != "") {
            return d["Founded"];
          }
        })
        .sortKeys(d3.ascending)
        .rollup(function (v) {
          return v.length;
        })
        .entries(data);

      var yearList = [];
      count_by_year.forEach(function (d, i) {
        d.inner = 50 + (i * 250) / count_by_year.length;
        d.outer = 50 + ((i + 1) * 250) / count_by_year.length;
        yearList.push(d.key);
      });
      var fundingKey_list = [
        { name: "Private", inner: 50, outer: 100 },
        { name: "Seed", inner: 100, outer: 140 },
        { name: "Series A", inner: 140, outer: 180 },
        { name: "Series B", inner: 180, outer: 220 },
        { name: "Series C", inner: 220, outer: 260 },
        { name: "Acquired", inner: 260, outer: 300 },
      ];

      var acquiredArc = d3
        .arc()
        .innerRadius(fundingKey_list[5].inner)
        .outerRadius(fundingKey_list[5].outer);

      var series_cPlusArc = d3
        .arc()
        .innerRadius(fundingKey_list[4].inner)
        .outerRadius(fundingKey_list[4].outer);

      var series_bArc = d3
        .arc()
        .innerRadius(fundingKey_list[3].inner)
        .outerRadius(fundingKey_list[3].outer);

      var series_aArc = d3
        .arc()
        .innerRadius(fundingKey_list[2].inner)
        .outerRadius(fundingKey_list[2].outer);

      var seedArc = d3
        .arc()
        .innerRadius(fundingKey_list[1].inner)
        .outerRadius(fundingKey_list[1].outer);

      var privateArc = d3
        .arc()
        .innerRadius(fundingKey_list[0].inner)
        .outerRadius(fundingKey_list[0].outer);

      var maturity_list = [
        { name: "Mature", inner: 50, outer: 180 },
        { name: "Emerging", inner: 180, outer: 240 },
        { name: "Nascent", inner: 240, outer: 300 },
      ];

      var nascentArc = d3
        .arc()
        .innerRadius(maturity_list[2].inner)
        .outerRadius(maturity_list[2].outer);

      var emergingArc = d3
        .arc()
        .innerRadius(maturity_list[1].inner)
        .outerRadius(maturity_list[1].outer);

      var matureArc = d3
        .arc()
        .innerRadius(maturity_list[0].inner)
        .outerRadius(maturity_list[0].outer);

      var themeArc = d3.arc().innerRadius(330).outerRadius(370);

      var chartPie = d3
        .pie()
        .value(function (d) {
          return d.value.value + 200000000000000;
        })
        .sort(function (a, b) {
          var valA = focusAreaOrder.indexOf(a.value.key.replace(/_/g, "/"));
          var valB = focusAreaOrder.indexOf(b.value.key.replace(/_/g, "/"));
          return d3.ascending(+a.key, +b.key);
        });

      var outerChartPie = d3
        .pie()
        .value(function (d) {
          var number_of_opp_spaces = [
            ...new Set(
              d.value.values.map(function (v) {
                return v["Business Model Option"];
              })
            ),
          ];
          return number_of_opp_spaces.length;
        })
        .sort(themeSort);
      var outerChartPieData = outerChartPie(d3.entries(count_by_themes));
      //   var chartPieData = chartPie(d3.entries(focusAreaSorted));
      var chartPieData1 = chartPie(d3.entries(focusAreaSorted1));

      var yearSegmentColorScale = d3
        .scaleOrdinal()
        .domain(yearList)
        .range(["#f4f4f4"]);

      // Bar Chart on click country - map label -------------------------------------------------------------------------------
      barChartList = ["Amount of Funding", "Founded Year", "Maturity"];

      // menu to change type of data
      var barchartSelector = d3
        .select("#bar-chart-selector")
        .selectAll("a")
        .data(barChartList)
        .enter()
        .append("text")
        .html(function (d) {
          return "<a href='#'>" + d + "</a>";
        })
        .on("click", function (d) {
          update_bar(d);
        });

      // compass filter ----------------------------------------------------------------------------------------------------

      // maturtity
      maturity_list.forEach(function (v) {
        var tmpArc = d3.arc().innerRadius(v.inner).outerRadius(v.outer);
        var tmpSegment = chartSVG
          .selectAll("mature-segments")
          .data(chartPieData1)
          .enter()
          .append("path")
          .attr("class", "segment " + v.name.toLowerCase() + "-segments")
          .attr("id", function (d) {
            return (
              v.name.toLowerCase() +
              "-" +
              d.data.value.key.replace(/ /g, "-").replace(/&/g, "and") +
              "-segment" +
              d.index
            );
          })
          .attr("d", tmpArc)
          .attr("opacity", 1);
      });
      // fundingStage
      fundingKey_list.forEach(function (v) {
        var tmpArc = d3.arc().innerRadius(v.inner).outerRadius(v.outer);

        var tmpSegment = chartSVG
          .selectAll("stage-segments")
          .data(chartPieData1)
          .enter()
          .append("path")
          .attr("class", "stage " + v.name.toLowerCase() + "-stages")
          .attr("id", function (d) {
            return (
              v.name.toLowerCase().replace(/ /g, "-").replace(/&/g, "and") +
              "-" +
              d.data.value.key.replace(/ /g, "-").replace(/&/g, "and") +
              "-stage" +
              d.index
            );
          })
          .attr("d", tmpArc)
          .attr("opacity", 1);
      });

      // year
      count_by_year.forEach(function (v) {
        var tmpArc = d3.arc().innerRadius(v.inner).outerRadius(v.outer);
        var tmpSegment = chartSVG
          .selectAll("year-segment")
          .data(chartPieData1)
          .enter()
          .append("path")
          .attr("class", "segment " + "year-" + v.key + "-segments")
          .attr("id", function (d) {
            const keyValue = d.data.value.key.split(" ");
            return (
              "year-" +
              v.key +
              "-" +
              keyValue[0] +
              // d.data.value.key.replace(/ /g, "-").replace(/[\])}[{(]/g, '').replace(/&/g, "and").replace(/,/g, '') +
              "-segment" +
              d.index
            );
          })
          .attr("d", tmpArc)
          .attr("opacity", 1)
          .attr("fill", yearSegmentColorScale(v.key))
          .style("cursor", "pointer")
          .on("mouseover", function (d) {
            // fade/highlight section
            labelCompassMouseOver(d);
            // display tooltip
            showOppSpaceTooltip(d);
          })
          .on("mouseout", function (d) {
            if (hoverOn === 0) {
              labelCompassMouseOut(d);
            }
          });
      });

      var themeFontData = categoryFontObject[0];
      var themeSegments = chartSVG
        .selectAll("theme-segments")
        .data(outerChartPieData)
        .enter()
        .append("path")
        .attr("d", themeArc)
        .attr("fill", "#fbdb1e")
        .attr("stroke-width", "2px")
        .attr("stroke", "#fff")
        .each(function (d, i) {
          var firstArcSection = /(^.+?)L/;
          var newArc = firstArcSection.exec(d3.select(this).attr("d"))[1];
          d.newArc = newArc.replace(/,/g, " ");
          d.percentage =
            ((d.startAngle - d.endAngle) / 2 + d.startAngle) / 0.0628318530716;
          if (d.percentage >= 100) {
            d.percentage -= 100;
          }
          //   debugger
          if (d.percentage >= 20 && d.percentage <= 70) {
            var startLoc = /M(.*?)A/;
            var middleLoc = /A(.*?)0 0 1/;
            var endLoc = /0 0 1 (.*?)$/;
            d.newStart = endLoc.exec(d.newArc)[1];
            d.newEnd = startLoc.exec(d.newArc)[1];
            d.middleSec = middleLoc.exec(d.newArc)[1];
            d.newArc =
              "M" + d.newStart + "A" + d.middleSec + "0 0 0 " + d.newEnd;
          }
          d.hiddenArc = chartSVG
            .append("path")
            .attr("class", "hiddenDonutArcs")
            .attr("id", function () {
              return "hidden-theme-band" + d.data.key;
            })
            .attr("d", d.newArc)
            .style("fill", "none");
        });
      var themeLabels = chartSVG
        .selectAll(".theme-label-text")
        .data(outerChartPieData)
        .enter()
        .append("text")
        .attr("class", "label theme-label-text")
        .attr("dy", function (d) {
          if (d.percentage >= 20 && d.percentage <= 70) {
            return themeFontData.dy_upper;
          }
          return themeFontData.dy_lower;
        })
        .append("textPath")
        .attr("xlink:href", function (d, i) {
          return "#" + "hidden-theme-band" + d.data.key;
        })
        .attr("startOffset", "50%")
        .text(function (d) {
          return d.data.value.key.toUpperCase();
        });

      //   var numSegments = focusAreaSorted.length;

      var segmentArc = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

      var segmentLabelArc = d3
        .arc()
        .innerRadius(outerRadius)
        .outerRadius(outerRadius * 1.05);

      var segmentLabelBandArc = d3
        .arc()
        .innerRadius(304)
        .outerRadius(307 * 1.095);

      var labelWidth = (2 * outerRadius * 1.095) / chartPieData1.length;

      labelFontData = {
        limit: labelWidth * 2,
      };
      // compass arcs
      var segmentsLabelBand = chartSVG
        .selectAll("path.segment-band")
        .data(chartPieData1)
        .enter()
        .append("path")
        .classed("segment-band", true)
        .attr("d", segmentLabelBandArc)
        .attr("id", function (d, i) {
          const keyValue = d.data.value.key.split(" ");
          if (keyValue[0] == "Risk") {
            return keyValue[0] + "-" + keyValue[1] + "-band" + i;
          } else {
            return keyValue[0] + "-band" + i;
          }
        })
        .attr("fill", " #0091d9")
        .each(function (d, i) {
          var firstArcSection = /(^.+?)L/;
          var newArc = firstArcSection.exec(d3.select(this).attr("d"))[1];
          d.newArc = newArc.replace(/,/g, " ");
          d.percentage =
            ((d.endAngle - d.startAngle) / 2 + d.startAngle) / 0.0628318530716;
          if (d.percentage >= 100) {
            d.percentage -= 100;
          }
          if (d.percentage >= 25.1 && d.percentage <= 75) {
            var startLoc = /M(.*?)A/;
            var middleLoc = /A(.*?)0 0 1/;
            var endLoc = /0 0 1 (.*?)$/;
            d.newStart = endLoc.exec(d.newArc)[1];
            d.newEnd = startLoc.exec(d.newArc)[1];
            d.middleSec = middleLoc.exec(d.newArc)[1];
            d.newArc =
              "M" + d.newStart + "A" + d.middleSec + "0 0 0 " + d.newEnd;
          }
          d.hiddenArc = chartSVG
            .append("path")
            .attr("class", "hiddenDonutArcs")
            .attr("id", function (_d, _i) {
              let labelPath = d.data.value.key.split(" ");
              let labelPathId = labelPath[0] + `${i}`;
              if (labelPathId != "") {
                labelPathId = labelPathId.toLowerCase();
              }
              return "hidden-opp-space-band-" + labelPathId;
            })
            .attr("d", d.newArc)
            .style("fill", "none");
        })
        .on("mouseover", function (d) {
          // fade/highlight section
          labelCompassMouseOver(d);
          // display tooltip
          showOppSpaceTooltip(d);
        })
        .on("mouseout", function (d) {
          if (hoverOn === 0) {
            labelCompassMouseOut(d);
          }
        });
      // compass labels inner-labels-svg
      var oppSpaceLabels = chartSVG
        .selectAll(".opp-space-label-text")
        .data(chartPieData1)
        .enter()
        .append("g")
        .selectAll(".test-class")
        .data(function (d, dataIdx) {
          var limit = labelFontData.limit;
          return textWrap(
            d.data.value.key.toUpperCase().replace(/_/g, " "),
            d.percentage,
            limit,
            dataIdx
          );
        })
        .enter()
        .append("text")
        .attr("class", "label opp-space-label-text")
        .attr("dy", function (d, i) {
          if (d.percentage >= 25.1 && d.percentage <= 75) {
            if (d.lineLength === 1) {
              return "-2.6em";
            } else if (d.lineLength === 2) {
              if (i === 0) {
                return "-3em";
              } else if (i === 1) {
                return "-1em";
              } else {
                return "0em";
              }
            } else {
              if (i === 0) {
                return "-3.5em";
              } else if (i === 1) {
                return "-2.2em";
              } else {
                return "-0.7em";
              }
            }
          } else {
            if (d.lineLength === 1) {
              return "3.4em";
            } else if (d.lineLength === 2) {
              if (i === 0) {
                return "2em";
              } else if (i === 1) {
                return "3.7em";
              } else {
                return "4em";
              }
            } else {
              if (i === 0) {
                return "1.7em";
              } else if (i === 1) {
                return "3.2em";
              } else {
                return "4.6em";
              }
            }
          }
        })
        .append("textPath")
        .attr("xlink:href", function (d, i) {
          const _dataTextValue = Array.isArray(d.text_data)
            ? d.text_data[0]
            : d.text_data;
          const labelPath = _dataTextValue.split(" ");
          let labelPathId;
          if (labelPath[0] != "") {
            labelPathId = labelPath[0].toLowerCase() + `${d.dataIdx}`;
          }
          return "#" + "hidden-opp-space-band-" + labelPathId;
        })
        .attr("startOffset", "50%")
        .attr("font-size", "9px")
        .text(function (d) {
          return d.data;
        });

      var labelRadius = outerRadius * 1.055;
      var labelOtherRadius = outerRadius * 1.02;

      var labelSuperFocusAreaRadius = outerRadius + 40;

      // Legend --------------------------------------------------------------------
      // circle legend group
      var legendCircle = keySVG
        .selectAll("g.key-other")
        .data(fundingCategoryRangeUnique)
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
          var h = keySize + keySpacing;
          var offset = 0;
          var horz = -50;
          var vert = i * h - offset - 90;
          return "translate(" + horz + "," + vert + ")";
        });

      // rectangular legend item group
      var legendRect = keySVG
        .append("g")
        .attr("transform", "translate(-45,10)");

      // rectangular legend item
      legendRect
        .append("rect")
        .classed("key-item-other", true)
        .attr("width", 8.8)
        .attr("height", 8.8)
        .attr("fill", "#FFD55F")
        .attr("x", -4)
        .attr("y", 3)
        .attr("transform", "translate(0, -7) rotate(45)")
        .on("mouseover", function (d) {
          legendMouseOver("Other", "other");
        })
        .on("mouseout", keyMouseOut)
        .on("click", function (d) {
          if (filterKey === "other") {
            selectedFilter = "none";
            filterKey = "";
            updateNodes("key", filterKey);
          } else {
            filterKey = "other";
            selectedFilter = "other";
            updateNodes("key", filterKey);
          }
        });

      // rectangular legend text
      legendRect
        .append("text")
        .text("Acquired")
        .classed("key-labels key-label", true)
        .attr("dx", "1.3em")
        .attr("dy", "0.2em")
        .on("mouseover", function () {
          legendMouseOver("Other", "other");
        })
        .on("mouseout", keyMouseOut)
        .on("click", function (d) {
          if (filterKey === "other") {
            selectedFilter = "none";
            filterKey = "";
            updateNodes("key", filterKey);
          } else {
            selectedFilter = "other";
            filterKey = "other";
            updateNodes("key", filterKey);
          }
        });

      // circle legend item
      legendCircle
        .append("circle")
        .classed("key-item-other", true)
        .attr("r", 4.4)
        .attr("fill", function (d) {
          return nodeColorScale(d);
        })
        .on("mouseover", function (d) {
          legendMouseOver(d, "color");
        })
        .on("mouseout", keyMouseOut)
        .on("click", function (d) {
          if (filterKey === d) {
            selectedFilter = "none";
            filterKey = "";
            updateNodes("key", filterKey);
          } else {
            selectedFilter = d;
            filterKey = d;
            updateNodes("key", filterKey);
          }
        });

      // circle legend item circle
      legendCircle
        .append("text")
        .text(function (d) {
          return d;
        })
        .classed("key-labels key-label", true)
        .attr("dx", "1.8em")
        .attr("dy", "0.35em")
        .on("mouseover", function (d) {
          legendMouseOver(d, "color");
        })
        .on("mouseout", keyMouseOut)
        .on("click", function (d) {
          if (filterKey === d) {
            filterKey = "";
            selectedFilter = "none";
            updateNodes("key", filterKey);
          } else {
            selectedFilter = d;
            filterKey = d;
            updateNodes("key", filterKey);
          }
        });

      // legend title
      var legendTitle = keySVG
        .append("text")
        .attr("class", "key-title")
        .text("Funding Key:")
        .attr("y", -110)
        .attr("x", -60);

      // compass inner funding stage labels
      var acquiredLabelRadius = fundingKey_list[5].outer - 15;
      var series_cPlusLabelRadius = fundingKey_list[4].outer - 15;
      var series_bLabelRadius = fundingKey_list[3].outer - 15;
      var series_aLabelRadius = fundingKey_list[2].outer - 15;
      var seedLabelRadius = fundingKey_list[1].outer - 15;
      var privateLabelRadius = fundingKey_list[0].outer - 15;
      var tmp_innerRadiusMin;
      var tmp_outerRadiusMax;

      // compass inner maturity labels
      var nascentLabelRadius = maturity_list[2].outer - 15;
      var emergingLabelRadius = maturity_list[1].outer - 15;
      var matureLabelRadius = maturity_list[0].outer - 15;
      var nascentLabel = chartSVG.append("g").classed("maturity-labels", true);

      nascentLabel
        .append("def")
        .append("path")
        .attr("id", "nascent-label-path")
        .attr(
          "d",
          "m " +
            -nascentLabelRadius +
            " 0 a 50 50 0 1 1 " +
            2 * nascentLabelRadius +
            " 0"
        );

      nascentLabel
        .append("text")
        .attr("class", "maturity-label-text")
        .attr("id", "nascent-label-path-text")
        .append("textPath")
        .attr("xlink:href", "#nascent-label-path")
        .attr("startOffset", "50%")
        .text("Nascent");
      var emergingLabel = chartSVG.append("g").classed("maturity-labels", true);

      emergingLabel
        .append("def")
        .append("path")
        .attr("id", "emerging-label-path")
        .attr(
          "d",
          "m " +
            -emergingLabelRadius +
            " 0 a 50 50 0 1 1 " +
            2 * emergingLabelRadius +
            " 0"
        );

      emergingLabel
        .append("text")
        .attr("class", "maturity-label-text")
        .attr("id", "emerging-label-path-text")
        .append("textPath")
        .attr("xlink:href", "#emerging-label-path")
        .attr("startOffset", "50%")
        .text("Emerging");

      //stage labels
      var acquiredLabel = chartSVG
        .append("g")
        .classed("fundingKey-labels", true);

      acquiredLabel
        .append("def")
        .append("path")
        .attr("id", "acquiredLabel-path")
        .attr(
          "d",
          "m " +
            -acquiredLabelRadius +
            " 0 a 50 50 0 1 1 " +
            2 * acquiredLabelRadius +
            " 0"
        );

      acquiredLabel
        .append("text")
        .attr("class", "fundingKey-label-text")
        .attr("id", "acquiredLabel-path-text")
        .append("textPath")
        .attr("xlink:href", "#acquiredLabel-path")
        .attr("startOffset", "50%")
        .text("Acquired");

      var series_cPlusLabel = chartSVG
        .append("g")
        .classed("fundingKey-labels", true);

      series_cPlusLabel
        .append("def")
        .append("path")
        .attr("id", "series_cPlusLabel-path")
        .attr(
          "d",
          "m " +
            -series_cPlusLabelRadius +
            " 0 a 50 50 0 1 1 " +
            2 * series_cPlusLabelRadius +
            " 0"
        );

      series_cPlusLabel
        .append("text")
        .attr("class", "fundingKey-label-text")
        .attr("id", "series_cPlusLabel-path-text")
        .append("textPath")
        .attr("xlink:href", "#series_cPlusLabel-path")
        .attr("startOffset", "50%")
        .text("Series C+");

      var series_bLabel = chartSVG
        .append("g")
        .classed("fundingKey-labels", true);

      series_bLabel
        .append("def")
        .append("path")
        .attr("id", "series_bLabel-path")
        .attr(
          "d",
          "m " +
            -series_bLabelRadius +
            " 0 a 50 50 0 1 1 " +
            2 * series_bLabelRadius +
            " 0"
        );

      series_bLabel
        .append("text")
        .attr("class", "fundingKey-label-text")
        .attr("id", "series_bLabel-path-text")
        .append("textPath")
        .attr("xlink:href", "#series_bLabel-path")
        .attr("startOffset", "50%")
        .text("Series B");

      var series_aLabel = chartSVG
        .append("g")
        .classed("fundingKey-labels", true);

      series_aLabel
        .append("def")
        .append("path")
        .attr("id", "series_aLabel-path")
        .attr(
          "d",
          "m " +
            -series_aLabelRadius +
            " 0 a 50 50 0 1 1 " +
            2 * series_aLabelRadius +
            " 0"
        );

      series_aLabel
        .append("text")
        .attr("class", "fundingKey-label-text")
        .attr("id", "series_aLabel-path-text")
        .append("textPath")
        .attr("xlink:href", "#series_aLabel-path")
        .attr("startOffset", "50%")
        .text("Series A");

      var seedLabel = chartSVG.append("g").classed("fundingKey-labels", true);

      seedLabel
        .append("def")
        .append("path")
        .attr("id", "seedLabel-path")
        .attr(
          "d",
          "m " +
            -seedLabelRadius +
            " 0 a 50 50 0 1 1 " +
            2 * seedLabelRadius +
            " 0"
        );

      seedLabel
        .append("text")
        .attr("class", "fundingKey-label-text")
        .attr("id", "seedLabel-path-text")
        .append("textPath")
        .attr("xlink:href", "#seedLabel-path")
        .attr("startOffset", "50%")
        .text("Seed");

      var privateLabel = chartSVG
        .append("g")
        .classed("fundingKey-labels", true);

      privateLabel
        .append("def")
        .append("path")
        .attr("id", "privateLabel-path")
        .attr(
          "d",
          "m " +
            -privateLabelRadius +
            " 0 a 50 50 0 1 1 " +
            2 * privateLabelRadius +
            " 0"
        );

      privateLabel
        .append("text")
        .attr("class", "fundingKey-label-text")
        .attr("id", "privateLabel-path-text")
        .append("textPath")
        .attr("xlink:href", "#privateLabel-path")
        .attr("startOffset", "50%")
        .text("Private");

      get_minmax(data);

      fundingKey_list_elements = [
        { name: "Acquired", fn: acquiredLabel },
        { name: "Series C+", fn: series_cPlusLabel },
        { name: "Series B", fn: series_bLabel },
        { name: "Series A", fn: series_aLabel },
        { name: "Seed", fn: seedLabel },
        { name: "Private", fn: privateLabel },
      ];

      // compass inner year labels
      count_by_year.forEach(function (d, i) {
        this["year" + d.key + "LabelRadius"] = d.outer - 10;

        this["year" + d.key + "Label"] = chartSVG
          .append("g")
          .classed("year-labels", true);

        this["year" + d.key + "Label"]
          .append("def")
          .append("path")
          .attr("id", "year-" + d.key + "-label-path")
          .attr(
            "d",
            "m " +
              -this["year" + d.key + "LabelRadius"] +
              " 0 a 50 50 0 1 1 " +
              2 * this["year" + d.key + "LabelRadius"] +
              " 0"
          );
        d.fn = this["year" + d.key + "Label"];

        d.fn
          .append("text")
          .attr("class", "year-label-text")
          .attr("font-size", "7px")
          .attr("id", "year-" + d.key + "-label-path-text")
          .append("textPath")
          .attr("xlink:href", "#year-" + d.key + "-label-path")
          .attr("startOffset", "50%")
          .text(d.key);
      });
      var matureLabel = chartSVG.append("g").classed("maturity-labels", true);

      matureLabel
        .append("def")
        .append("path")
        .attr("id", "mature-label-path")
        .attr(
          "d",
          "m " +
            -matureLabelRadius +
            " 0 a 50 50 0 1 1 " +
            2 * matureLabelRadius +
            " 0"
        );

      matureLabel
        .append("text")
        .attr("class", "maturity-label-text")
        .attr("id", "mature-label-path-text")
        .append("textPath")
        .attr("xlink:href", "#mature-label-path")
        .attr("startOffset", "50%")
        .text("mature");

      maturity_list_elements = [
        { name: "Nascent", fn: nascentLabel },
        { name: "Emerging", fn: emergingLabel },
        { name: "Mature", fn: matureLabel },
      ];

      maturity_list.forEach(function (d) {
        var id = "#" + d.name.toLowerCase() + "-label-path-text";
        d3.select(id).remove();
      });

      fundingKey_list.forEach(function (d) {
        var id = "#" + d.name.toLowerCase() + "-label-path-text";
        d3.select(id).remove();
      });

      //global

      const legendItemsNames = [
        "Private",
        "Seed",
        "Series A",
        "Series B",
        "Series C",
      ];
      const privateNodes = ["Undisclosed", "Unfunded", "Funding Raised"];
      const series_c_nodes = ["Series C", "Series D", "Public"];

      // nodes in compass ----------------------------------------------------------------------------------------
      // maturity nodes
      var nodeData = d3
        .nest()
        .key(function (d) {
          return d["Region"] + "-" + d["Play"];
        })
        .key(function (d) {
          return d["Maturity"];
        })
        .rollup(function (v) {
          return v.length;
        })
        .entries(data);

      // Funding-Stage nodes
      var nodeThirdData = d3
        .nest()
        .key(function (d) {
          return d["Region"] + "-" + d["Play"];
        })
        .key(function (d) {
          return d["Funding Stage"];
        })
        .rollup(function (v) {
          return v.length;
        })
        .entries(data);

      // year nodes
      var nodeSecondData = d3
        .nest()
        .key(function (d, i) {
          return d["Region"] + "-" + d["Play"];
        })
        .key(function (d) {
          return d["Founded"];
        })
        .rollup(function (v) {
          return v.length;
        })
        .entries(data);

      var nodeList = [];

      var nodeSecondList = [];

      var tmp_startAngleMin;
      var tmp_endAngleMax;

      // position Funding Stage node in the compass
      data.forEach(function (d) {
        var fundingStage = d["Funding Stage"];
        if (privateNodes.includes(d["Funding Stage"])) {
          fundingStage = "Unfunded";
        } else if (series_c_nodes.includes(d["Funding Stage"])) {
          fundingStage = "Series C";
        }
        for (i = 0; i < chartPieData1.length; i++) {
          if (
            d["Business Model Option"] === chartPieData1[i].data.value.key &&
            d["Play"] === chartPieData1[i].data.value.parent
          ) {
            var tmp_startAngleMin = chartPieData1[i].startAngle;
            var tmp_endAngleMax = chartPieData1[i].endAngle;
            break;
          }
        }
        for (i = 0; i < fundingKey_list.length; i++) {
          fundingKey_list[i]["name"] == "Private"
            ? (fundingKey_list[i]["name"] = "Unfunded")
            : (fundingKey_list[i]["name"] = fundingKey_list[i]["name"]);
          if (fundingStage === fundingKey_list[i]["name"]) {
            tmp_innerRadiusMin = fundingKey_list[i]["inner"];
            tmp_outerRadiusMax = fundingKey_list[i]["outer"];
            break;
          }
        }
        for (i = 0; i < nodeThirdData.length; i++) {
          if (nodeThirdData[i].key === d["Region"] + "-" + d["Play"]) {
            for (j = 0; j < nodeThirdData[i].values.length; j++) {
              if (nodeThirdData[i].values[j].key === fundingStage) {
                var congestion = calcCongestion(
                  tmp_startAngleMin,
                  tmp_endAngleMax,
                  tmp_innerRadiusMin,
                  tmp_outerRadiusMax,
                  radiusSize,
                  nodeThirdData[i].values[j].value
                );
                if (congestion > 1) {
                  d.resultsStage = assignRandom(
                    tmp_startAngleMin,
                    tmp_endAngleMax,
                    tmp_innerRadiusMin,
                    tmp_outerRadiusMax,
                    congestion,
                    nodeList,
                    d
                  );
                } else {
                  d.resultsStage = assignNonRandom(
                    d,
                    tmp_startAngleMin,
                    tmp_endAngleMax,
                    tmp_innerRadiusMin,
                    tmp_outerRadiusMax,
                    nodeThirdData[i].values[j],
                    "Funding Stage"
                  );
                  indexTracker[d["Region"]][d["Funding Stage"]]["slot"] += 1;
                }
              }
            }
          }
        }

        if (d.resultsStage) {
          d.stageX = d.resultsStage[0];
          d.stageY = d.resultsStage[1];
        } else {
          d.stageX = 0; //results[0];
          d.stageY = 0; //results[1];
        }
        //d.opacity = 1;
      });

      // position maturity node in the compass
      data.forEach(function (d) {
        for (i = 0; i < chartPieData1.length; i++) {
          if (
            d["Business Model Option"] === chartPieData1[i].data.value.key &&
            d["Play"] === chartPieData1[i].data.value.parent
          ) {
            var tmp_startAngleMin = chartPieData1[i].startAngle;
            var tmp_endAngleMax = chartPieData1[i].endAngle;
            break;
          }
        }
        for (i = 0; i < maturity_list.length; i++) {
          if (d["Maturity"] === maturity_list[i]["name"]) {
            tmp_innerRadiusMin = maturity_list[i]["inner"];
            tmp_outerRadiusMax = maturity_list[i]["outer"];
            break;
          }
        }
        for (i = 0; i < nodeData.length; i++) {
          if (nodeData[i].key === d["Region"] + "-" + d["Play"]) {
            for (j = 0; j < nodeData[i].values.length; j++) {
              if (nodeData[i].values[j].key === d["Maturity"]) {
                var congestion = calcCongestion(
                  tmp_startAngleMin,
                  tmp_endAngleMax,
                  tmp_innerRadiusMin,
                  tmp_outerRadiusMax,
                  radiusSize,
                  nodeData[i].values[j].value
                );
                if (congestion > 1) {
                  d.results = assignRandom(
                    tmp_startAngleMin,
                    tmp_endAngleMax,
                    tmp_innerRadiusMin,
                    tmp_outerRadiusMax,
                    congestion,
                    nodeList,
                    d
                  );
                } else {
                  d.results = assignNonRandom(
                    d,
                    tmp_startAngleMin,
                    tmp_endAngleMax,
                    tmp_innerRadiusMin,
                    tmp_outerRadiusMax,
                    nodeData[i].values[j],
                    "Maturity"
                  );
                  indexTracker[d["Region"]][d["Maturity"]]["slot"] += 1;
                }
              }
            }
          }
        }

        if (d.results) {
          d.x = d.results[0];
          d.y = d.results[1];
        } else {
          d.x = 0; //results[0];
          d.y = 0; //results[1];
        }
        //d.opacity = 1;
      });

      // position year nodes
      data.forEach(function (d) {
        for (i = 0; i < chartPieData1.length; i++) {
          if (
            d["Business Model Option"] === chartPieData1[i].data.value.key &&
            d["Play"] === chartPieData1[i].data.value.parent
          ) {
            tmp_startAngleMin = chartPieData1[i].startAngle;
            tmp_endAngleMax = chartPieData1[i].endAngle;

            break;
          }
        }

        for (i = 0; i < count_by_year.length; i++) {
          if (d["Founded"] === count_by_year[i].key) {
            tmp_innerRadiusMin = count_by_year[i]["inner"];
            tmp_outerRadiusMax = count_by_year[i]["outer"];
            break;
          }
        }
        var congestion;
        for (i = 0; i < nodeSecondData.length; i++) {
          if (nodeSecondData[i].key === d["Region"] + "-" + d["Play"]) {
            for (j = 0; j < nodeSecondData[i].values.length; j++) {
              if (nodeSecondData[i].values[j].key === d["Founded"]) {
                congestion = calcCongestion(
                  tmp_startAngleMin,
                  tmp_endAngleMax,
                  tmp_innerRadiusMin,
                  tmp_outerRadiusMax,
                  radiusSize,
                  nodeSecondData[i].values[j].value
                );
                if (congestion > 5) {
                  d.resultsYear = assignRandom(
                    tmp_startAngleMin,
                    tmp_endAngleMax,
                    tmp_innerRadiusMin,
                    tmp_outerRadiusMax,
                    congestion,
                    nodeList
                  );
                } else {
                  d.resultsYear = assignNonRandomYear(
                    d,
                    tmp_startAngleMin,
                    tmp_endAngleMax,
                    tmp_innerRadiusMin,
                    tmp_outerRadiusMax,
                    nodeSecondData[i].values[j]
                  );
                }
                if (indexTrackerYear[d["Region"]] === undefined) {
                  indexTrackerYear[d["Region"]] = {};
                  indexTrackerYear[d["Region"]][d["Founded"]] = {
                    slot: 1,
                  };
                } else if (
                  indexTrackerYear[d["Region"]][d["Founded"]] === undefined
                ) {
                  indexTrackerYear[d["Region"]][d["Founded"]] = {
                    slot: 1,
                  };
                } else {
                  indexTrackerYear[d["Region"]][d["Founded"]]["slot"] += 1;
                }
              }
            }
          }
        }
        if (d.resultsYear) {
          d.yearX = d.resultsYear[0];
          d.yearY = d.resultsYear[1];
        } else {
          d.yearX = 0; //results[0];
          d.yearY = 0; //results[1];
        }
      });

      // toggleGlobalEurope function --------------------------------------------------------------------------------------------
      let stateEurope = "global";
      let stateHero = "all";
      let stateAccess = "access";

      function toggleGlobalEurope() {
        if (stateEurope == "global") {
          stateEurope = "europe";
          // display Europe countries
          nodes.attr("opacity", (d) => {
            if (
              d.Country == "Europe" &&
              (stateHero == "all" || (stateHero == "hero" && d.Hero == "TRUE"))
            ) {
              return 1;
            } else {
              return 0.3;
            }
          });
          nodes_acquired.attr("opacity", (d) => {
            if (
              d.Country == "Europe" &&
              (stateHero == "all" || (stateHero == "hero" && d.Hero == "TRUE"))
            ) {
              return 1;
            } else {
              return 0.3;
            }
          });
        } else {
          stateEurope = "global";
          // display all countries
          nodes.attr("opacity", (d) => {
            return stateHero == "all" ||
              (stateHero == "hero" && d.Hero == "TRUE")
              ? 1
              : 0.3;
          });
          nodes_acquired.attr("opacity", (d) => {
            return stateHero == "all" ||
              (stateHero == "hero" && d.Hero == "TRUE")
              ? 1
              : 0.3;
          });
        }
      }

      //--------- Region DropDown

      //   debugger
      var count_by_region = d3
        .nest()
        .key(function (d) {
          return d["Region"];
        })
        .sortKeys(d3.ascending)
        .entries(data);

      // console.log(count_by_region)
      var regionText;
      var regionKey;
      var regionKeyID;

      filterRegions = count_by_region.map(function (v) {
        return (
          (regionKey = v.key),
          (regionKeyID = regionKey.replace(" ", "_")),
          (regionText = `<div><input type="checkbox" id=${regionKeyID} checked>
            <label for=${regionKeyID}>${regionKey}</label></div>`),
          $("#regionData").append(regionText)
        );
      });

      $("#regionData input").click(function (d) {
        d.target.id = d.target.id.replace("_", " ");
        this.nextElementSibling.attributes.for.value = d.target.id;

        if (filterRegions.indexOf(d.target.id) < 0) {
          filterRegions.push(d.target.id);
        } else {
          filterRegions = removeFromList(d.target.id, filterRegions);
        }
        updateNodesbyRegion();
      });

      // region click
      function removeFromList(source_item, source_list) {
        const i = source_list.indexOf(source_item);
        const filteredItems = source_list
          .slice(0, i)
          .concat(source_list.slice(i + 1, source_list.length));
        return filteredItems;
      }

      function updateNodesbyRegion() {
        nodes.style("display", function (d) {
          if (filterRegions.indexOf(d["Region"]) >= 0) {
            return "none";
          } else {
            return "block";
          }
        });

        nodes_acquired.style("display", function (d) {
          if (filterRegions.indexOf(d["Region"]) >= 0) {
            return "none";
          } else {
            return "block";
          }
        });
      }

      //.....................
      // Region Mouse Over

      $("#regionData input").mouseover(function (d) {
        keyMouseOver(d.target.id, "region");
      });

      $("#regionData label").mouseover(function (d) {
        keyMouseOver(d.target.textContent, "region");
      });

      // key Mouse over
      function keyMouseOver(data, type) {
        if (type === "acquired" || type === "public") {
          nodes_acquired.attr("opacity", 1);
          nodes.attr("opacity", 0.3);
          nodes_activity.attr("opacity", 0.3);
        }
        if (type == "region") {
          nodes.attr("opacity", function (d) {
            if (d["Region"] === data) {
              return 1;
            } else {
              return 0.3;
            }
          });
          nodes_acquired.attr("opacity", function (d) {
            if (d["Region"] === data) {
              return 1;
            } else {
              return 0.3;
            }
          });
        }
        /* if (type === "size") {
                        nodes.attr("opacity", function(d) {
                          if (nodeSizeScaleFunction(d["Total funding (US$)"]) === data) {
                            return 1;
                          } else {
                            return 0.3;
                          }
                        });
                        nodes_acquired.attr("opacity", 0.3);
                      } */
        if (type === "color") {
          nodes.attr("opacity", function (d) {
            if (fundingCategoryScale(d["Funding Stage"]) === data) {
              return 1;
            } else {
              return 0.3;
            }
          });
          nodes_acquired.attr("opacity", 0.3);
          nodes_activity.attr("opacity", 0.3);
        }

        if (type === "activity") {
          nodes.attr("opacity", function (d) {
            if (d["Activity/Acquisition Time"] != "" && d.hide === false) {
              return 1;
            } else {
              return 0.3;
            }
          });

          nodes_activity.attr("opacity", function (d) {
            if (d["Activity/Acquisition Time"] != "") {
              return 1;
            } else {
              return 0.3;
            }
          });

          nodes_acquired.attr("opacity", function (d) {
            if (d["Activity/Acquisition Time"] != "" && d.hide === false) {
              return 1;
            } else {
              return 0.3;
            }
          });
        }
      }

      //.....................
      // Region Mouse Out

      $("#regionData input").mouseout(function (d) {
        keyMouseOut();
      });

      $("#regionData label").mouseout(function (d) {
        keyMouseOut();
      });

      //////-------------------

      function toggleAllHero() {
        if (stateHero == "all") {
          stateHero = "hero";
          // display hero
          heroFilterActive = "true";
          nodes.attr("opacity", (d) => {
            if (d.opacity) {
              if (
                d.Hero == "TRUE" &&
                d.opacity == 1 &&
                (stateEurope == "global" ||
                  (stateEurope == "europe" && d.Country == "Europe"))
              ) {
                return 1;
              } else {
                return 0.3;
              }
            } else {
              if (
                d.Hero == "TRUE" &&
                (stateEurope == "global" ||
                  (stateEurope == "europe" && d.Country == "Europe"))
              ) {
                return 1;
              } else {
                return 0.3;
              }
            }
          });
          nodes_acquired.attr("opacity", (d) => {
            if (
              d.Hero == "TRUE" &&
              (stateEurope == "global" ||
                (stateEurope == "europe" && d.Country == "Europe"))
            ) {
              return 1;
            } else {
              return 0.3;
            }
          });
        } else {
          stateHero = "all";
          // display all
          heroFilterActive = "false";
          nodes.attr("opacity", (d) => {
            return stateEurope == "global" ||
              (stateEurope == "europe" && d.Country == "Europe")
              ? 1
              : 0.3;
          });
          nodes_acquired.attr("opacity", (d) => {
            return stateEurope == "global" ||
              (stateEurope == "europe" && d.Country == "Europe")
              ? 1
              : 0.3;
          });
          if (selectedFilter !== "none") {
            updateNodes("key", selectedFilter);
          }
        }
      }

      // year-maturiy button
      //   d3.select("#button-16").on("change", function () {
      //     switchRadial();
      //   });

      $(".tri-state-toggle-button").click(function () {
        $(".tri-state-toggle-button").removeClass("active");
        var id = $(this).attr("id");
        $("#" + id).addClass("active");
        if (id == "toggle-button1") {
          radial = "year";
        } else if (id == "toggle-button2") {
          radial = "maturity";
        } else {
          radial = "stage";
        }

        switchRadial();
      });

      //-------------

      $(".two-state-toggle-btn").click(function () {
        $(".two-state-toggle-btn").removeClass("active");
        var id = $(this).attr("id");
        $("#" + id).addClass("active");
        if (id == "toggle-btn1") {
          stateHero = "hero";
        } else if (id == "toggle-btn2") {
          stateHero = "all";
        }

        toggleAllHero();
      });

      //-------------

      //   d3.select("#button-all-hero").on("change", function () {
      //     toggleAllHero();
      //   });

      d3.select("#button-global-europe").on("change", function () {
        toggleGlobalEurope();
      });

      d3.select("#button-17").on("change", function () {
        if (eu == true) {
          eu = false;
          update_visibility();
        } else {
          eu = true;
          update_visibility();
        }
      });

      var CompetitorMode = 0;

      var radiusSize = 0.1;

      // circle nodes in compass
      var nodes = chartSVG
        .selectAll("nodes")
        .data(data)
        .enter()
        .append("a")
        .attr("xlink:href", function (d) {
          return getStartupWebsiteURL(d);
        })
        .attr("target", "_blank")
        .append("circle")
        .each(function (d) {
          d.hide = false;
        })
        .attr("class", "nodes")
        .attr("r", function (d) {
          if (legendItemsNames.includes(d["Funding Stage"])) {
            if (d["Hero"] == "TRUE") {
              return heroNoderadius;
            } else {
              return nodeRadius;
            }
          } else if (privateNodes.includes(d["Funding Stage"])) {
            if (d["Hero"] == "TRUE") {
              return heroNoderadius;
            } else {
              return nodeRadius;
            }
          } else if (series_c_nodes.includes(d["Funding Stage"])) {
            if (d["Hero"] == "TRUE") {
              return heroNoderadius;
            } else {
              return nodeRadius;
            }
          }
        })
        .attr("cx", function (d) {
          return d.yearX;
        })
        .attr("cy", function (d) {
          return d.yearY;
        })
        .attr("fill", function (d) {
          var fundingStage = d["Funding Stage"];
          if (privateNodes.includes(d["Funding Stage"])) {
            fundingStage = "Unfunded";
          } else if (series_c_nodes.includes(d["Funding Stage"])) {
            fundingStage = "Series C";
          }
          return nodeColorScale(fundingCategoryScale(fundingStage));
        })
        .on("mouseover", function (d) {
          showNodeTooltip(d);
        })
        .on("mouseout", hideNodeTooltip);
      // rectangular nodes in compass
      var nodes_acquired = chartSVG
        .selectAll("nodes-acquired")
        .data(data)
        .enter()
        .append("a")
        .attr("xlink:href", function (d) {
          return getStartupWebsiteURL(d);
        })
        .attr("target", "_blank")
        .append("rect")
        .attr("class", "nodes nodes-acquired")
        .attr("id", function (d) {
          if (d["Name"] != undefined && d["Name"].length != 0)
            return d["Name"].toLowerCase().replace(/ /g, "-");
        })
        .attr("width", function (d) {
          if (d["Funding Stage"] == "Acquired") {
            return nodeOtherWidth;
          } else {
            return 0;
          }
        })
        .attr("height", function (d) {
          if (d["Funding Stage"] == "Acquired") {
            return nodeOtherWidth;
          } else {
            return 0;
          }
        })
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill", "#FFD55F")
        .attr("transform", function (d) {
          return "translate(" + d.yearX + "," + d.yearY + ") rotate(45)";
        })
        .on("mouseover", function (d) {
          showNodeTooltip(d);
        })
        .on("mouseout", hideNodeTooltip);

      function getStartupWebsiteURL(d) {
        if (d.Website && d.Website.toLowerCase().indexOf("https://") >= 0) {
          //d.Website.includes("https://")
          return d.Website;
        } else {
          return "http://" + d.Website;
        }
      }

      // fade/highlight nodes on legend click
      function updateNodes(type, filterKey) {
        if (filterKey === "") {
          data.forEach(function (d) {
            d.opacity = 1;
          });
          nodes.attr("opacity", 1);
          nodes_acquired.attr("opacity", 1);
          legendCircle.attr("opacity", 1);
          legendRect.attr("opacity", 1);
          segmentsLabelBand.attr("opacity", function (d) {
            d.opacity = 1;
            return d.opacity;
          });
        }

        if (filterKey === "other") {
          nodes.attr("opacity", function (d) {
            if (d["Funding Stage"] !== "Acquired") {
              d.opacity = 0.3;
            }
            return d.opacity;
          });

          nodes_acquired.attr("opacity", function (d) {
            if (d["Funding Stage"] === "Acquired") {
              d.opacity = 1;
            }
            return d.opacity;
          });

          legendCircle.attr("opacity", 0.3);
          legendRect.attr("opacity", 1);
        }

        if (filterKey !== "other" && filterKey !== "" && type === "key") {
          nodes.attr("opacity", function (v) {
            var fundingStage = v["Funding Stage"];
            if (privateNodes.includes(v["Funding Stage"])) {
              fundingStage = "Unfunded";
            } else if (series_c_nodes.includes(v["Funding Stage"])) {
              fundingStage = "Series C";
            }
            if (
              fundingCategoryScale(fundingStage) === filterKey &&
              v["Funding Stage"] !== "Acquired"
            ) {
              v.opacity = 1;
            } else {
              v.opacity = 0.3;
            }
            return v.opacity;
          });
          nodes_acquired.attr("opacity", function (d) {
            if (d["Funding Stage"] === "Acquired") {
              d.opacity = 0.3;
            }
            return d.opacity;
          });

          legendCircle.attr("opacity", function (d) {
            if (d === filterKey) {
              return 1;
            } else {
              return 0.3;
            }
          });

          legendRect.attr("opacity", 0.3);
        }
      }

      // wrap text on compass label
      function textWrap(text_data, percentage, limit = 19, dataIdx) {
        result = [];
        if (text_data.length > 19) {
          if (text_data.length <= 20) {
            a = text_data.substr(0, 19).lastIndexOf(" ");
            y = text_data.substr(0, a);
            a_rem = text_data.substr(a + 1);
            b = a_rem.substr(0, 19).lastIndexOf(" ");
            z = a_rem.substr(0, b);
            result.push({
              data: y,
              text_data: text_data,
              percentage: percentage,
              lineLength: 2,
              dataIdx: dataIdx,
            });
            result.push({
              data: z,
              text_data: text_data,
              percentage: percentage,
              lineLength: 2,
              dataIdx: dataIdx,
            });
          } else if (text_data.length > 30) {
            a = text_data.substr(0, 20).lastIndexOf(" ");
            y = text_data.substr(0, a);

            a_rem = text_data.substr(a + 1);

            b = a_rem.substr(0, 20).lastIndexOf(" ");
            z = a_rem.substr(0, b);

            x = a_rem.split(z)[1];

            result.push({
              data: y,
              text_data: text_data,
              percentage: percentage,
              lineLength: 3,
              dataIdx: dataIdx,
            });
            result.push({
              data: z,
              text_data: text_data,
              percentage: percentage,
              lineLength: 3,
              dataIdx: dataIdx,
            });
            result.push({
              data: x,
              text_data: text_data,
              percentage: percentage,
              lineLength: 3,
              dataIdx: dataIdx,
            });
          } else {
            var tmp_limit = text_data.length / 2 - 4;
            var lines = dummy(text_data, tmp_limit);

            lines.forEach(function (d) {
              if (d.length > 1) {
                d = d.join(" ");
              }
              if (d !== "") {
                result.push({
                  data: d,
                  text_data: text_data,
                  percentage: percentage,
                  lineLength: lines.length,
                  dataIdx: dataIdx,
                });
              }
            });
          }
        } else {
          result.push({
            data: text_data,
            text_data: text_data,
            percentage: percentage,
            lineLength: 1,
            dataIdx: dataIdx,
          });
        }
        var maxLength = d3.max(result, function (d) {
          return d.data.length;
        });
        result.forEach(function (d) {
          d.MaxLength = maxLength;
        });
        return result;
      }

      function dummy(text, limit) {
        words = text.split(" ");
        words_rev = temporarySwap([...words]);
        lines = [];
        lines_rev = [];

        current_seq_len = 0;
        current_seq = [];
        words.forEach(function (d) {
          current_seq_len += d.length;
          current_seq.push(d.replace(/�۪/g, "'"));
          if (current_seq_len > limit) {
            lines.push(current_seq);
            current_seq_len = 0;
            current_seq = [];
          }
        });
        if (current_seq.length > 0) {
          lines.push(current_seq);
          current_seq_len = 0;
          current_seq = [];
        }

        current_seq_len = 0;
        current_seq = [];
        words_rev.forEach(function (d) {
          current_seq_len += d.length;
          current_seq.push(d.replace(/�۪/g, "'"));
          if (current_seq_len > limit) {
            lines_rev.push(temporarySwap(current_seq));
            current_seq_len = 0;
            current_seq = [];
          }
        });
        if (current_seq.length > 0) {
          lines_rev.push(temporarySwap(current_seq));
          current_seq_len = 0;
          current_seq = [];
        }
        if (lines.length === 3) {
          return temporarySwap(lines_rev);
        }
        if (lines_rev.length > lines.length && lines_rev.length !== 3) {
          return temporarySwap(lines_rev);
        }
        return lines;
      }

      function temporarySwap(array) {
        var left = null;
        var right = null;
        var length = array.length;
        for (left = 0; left < length / 2; left += 1) {
          right = length - 1 - left;
          var temporary = array[left];
          array[left] = array[right];
          array[right] = temporary;
        }
        return array;
      }

      // from map - on click country - bar chart --------------------------------------------------------------------------
      function update_bar(type) {
        var margin = { top: 20, right: 20, bottom: 30, left: 40 };
        d3.select(".svg-bar-container").html("");
        d3.select(".dropbtn-b").html("<i class='arrow down'> </i> " + type);

        var barSVG = d3
          .select(".svg-bar-container")
          .append("svg")
          .attr("width", bar_width)
          .attr("height", bar_height)
          .append("g")
          .attr(
            "transform",
            "translate(" + (margin.left - 50) + "," + margin.top + ")"
          );

        if (type === "Amount of Funding") {
          var fundHist = [
            { name: "0-10K", lower_limit: 0, upper_limit: 10000, startups: 0 },
            {
              name: "10K-100K",
              lower_limit: 10000,
              upper_limit: 100000,
              startups: 0,
            },
            {
              name: "100K-1M",
              lower_limit: 100000,
              upper_limit: 1000000,
              startups: 0,
            },
            {
              name: "1M-10M",
              lower_limit: 1000000,
              upper_limit: 10000000,
              startups: 0,
            },
            {
              name: "10M-100M",
              lower_limit: 10000000,
              upper_limit: 100000000,
              startups: 0,
            },
            {
              name: "100M+",
              lower_limit: 100000000,
              upper_limit: 100000000000,
              startups: 0,
            },
          ];

          bar_data.forEach(function (v) {
            if (v.Funding != 0) {
              if (v.Funding.slice(0, 1) == "$") {
                v.Funding = v.Funding.slice(1);
              }
            }
            fundHist.forEach(function (w) {
              if (v.Funding === "") {
                v.Funding = 0;
              }
              if (v.Funding > w.lower_limit && v.Funding <= w.upper_limit) {
                w.startups += 1;
              }
            });
          });

          var maxVal = d3.max(fundHist, function (d) {
            return d.startups;
          });

          var x = d3
            .scaleBand()
            .domain(
              fundHist.map(function (d) {
                return d.name;
              })
            )
            .range([50, bar_width - 50])
            .paddingInner(0.25);

          var y = d3
            .scaleLinear()
            .range([bar_height - 50, 50])
            .domain([0, maxVal]);

          var colorScale = d3
            .scaleOrdinal()
            .domain(x.domain())
            .range(["#7DCCFF"]);

          var barX = d3
            .scaleBand()
            .domain(
              fundHist.map(function (d) {
                return d.name;
              })
            )
            .range([60, bar_width - 120])
            .padding(0.1);

          var barY = d3
            .scaleLinear()
            .range([bar_height - 50, 100])
            .domain([0, maxVal]);

          var maxTicks = maxVal;
          if (maxVal > 30) {
            maxTicks = maxVal / 2;
          }

          barSVG
            .append("g")
            .attr("transform", "translate(50,0)")
            .call(
              d3
                .axisLeft(y)
                .ticks(maxTicks)
                .tickSize(-bar_width + 100)
            );

          var bars = barSVG
            .selectAll(".bar")
            .data(fundHist)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("fill", function (d) {
              return colorScale(d.name);
            })
            .attr("x", function (d) {
              return x(d.name);
            })
            .attr("width", x.bandwidth())
            .attr("y", bar_height - 50)
            .attr("height", 0);

          bars
            .transition()
            .duration(1500)
            .attr("height", function (d) {
              return bar_height - 50 - y(+d.startups);
            })
            .attr("y", function (d) {
              return y(+d.startups);
            });

          // add the y Axis
          barSVG
            .append("g")
            .attr("transform", "translate(0," + (bar_height - 50) + ")")
            .call(d3.axisBottom(x).ticks(fundHist.length));

          barSVG
            .append("text")
            .attr(
              "transform",
              "translate(" + bar_width / 2 + " ," + (bar_height - 50 + 26) + ")"
            )
            .attr("class", "bar-axis-label")
            .text("Funding");

          barSVG
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 12)
            .attr("x", 0 - (bar_height - 10) / 2)
            .attr("dy", "1em")
            .attr("class", "bar-axis-label")
            .text("Number of Startups");
        }
        if (type === "Founded Year") {
          var yearHist = [];
          var years = [];
          bar_data.forEach(function (v) {
            if (years.indexOf(+v.Founded) < 0) {
              var yearVal = +v.Founded;
              yearHist.push({ Year: yearVal, startups: 0 });
              years.push(+v.Founded);
            }
          });

          bar_data.forEach(function (v) {
            yearHist.forEach(function (w) {
              if (+v.Founded === w.Year) {
                w.startups += 1;
              }
            });
          });
          yearHist = yearHist.sort((a, b) => (a.Year > b.Year ? 1 : -1));

          var maxVal = d3.max(yearHist, function (d) {
            return d.startups;
          });

          var x = d3
            .scaleBand()
            .domain(
              yearHist.map(function (d) {
                return d.Year;
              })
            )
            .range([50, bar_width - 50])
            .paddingInner(0.25);

          var colorScale = d3
            .scaleOrdinal()
            .domain(x.domain())
            .range(["#7DCCFF"]);

          var y = d3
            .scaleLinear()
            .range([bar_height - 50, 50])
            .domain([0, maxVal]);

          var maxTicks = maxVal;
          if (maxVal > 30) {
            maxTicks = maxVal / 2;
          }

          barSVG
            .append("g")
            .attr("transform", "translate(50,0)")
            .call(
              d3
                .axisLeft(y)
                .ticks(maxTicks)
                .tickSize(-bar_width + 100)
            );

          var bars = barSVG
            .selectAll(".bar")
            .data(yearHist)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("fill", function (d) {
              return colorScale(d.Year);
            })
            .attr("x", function (d) {
              return x(d.Year);
            })
            .attr("width", x.bandwidth())
            .attr("y", bar_height - 50)
            //.attr("height", function(d) { return bar_height -50 - y(+d.startups); });
            .attr("height", 0);

          bars
            .transition()
            .duration(1500)
            .attr("height", function (d) {
              return bar_height - 50 - y(+d.startups);
            })
            .attr("y", function (d) {
              return y(+d.startups);
            });

          barSVG
            .append("g")
            .attr("transform", "translate(0," + (bar_height - 50) + ")")
            .call(d3.axisBottom(x).ticks(yearHist.length));

          barSVG
            .append("text")
            .attr(
              "transform",
              "translate(" + bar_width / 2 + " ," + (bar_height - 50 + 26) + ")"
            )
            .attr("class", "bar-axis-label")
            .text("Year");

          barSVG
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 12)
            .attr("x", 0 - (bar_height - 10) / 2)
            .attr("dy", "1em")
            .attr("class", "bar-axis-label")
            .text("Number of Startups");
        }

        if (type === "Maturity") {
          var maturityOrder = ["Mature", "Emerging", "Nascent"];
          function maturitySort(a, b) {
            for (i = 0; i < maturityOrder.length; i++) {
              if (a === maturityOrder[i]) {
                var valA = i;
              }
              if (b === maturityOrder[i]) {
                var valB = i;
              }
            }
            return valA < valB ? -1 : valA > valB ? 1 : valA >= valB ? 0 : NaN;
          }

          var maturity_data = d3
            .nest()
            .key(function (d) {
              return d["Maturity"];
            })
            .rollup(function (v) {
              return { startups: v.length };
            })
            .sortKeys(maturitySort)
            .entries(
              bar_data.filter(function (d) {
                return d.Maturity != "";
              })
            );

          var maxVal = d3.max(maturity_data, function (d) {
            return d.value.startups;
          });

          var x = d3
            .scaleBand()
            .domain(
              maturity_data.map(function (d) {
                return d.key;
              })
            )
            .range([50, bar_width - 50])
            .paddingInner(0.25);

          var colorScale = d3
            .scaleOrdinal()
            .domain(x.domain())
            .range(["#7DCCFF"]);

          var y = d3
            .scaleLinear()
            .range([bar_height - 50, 50])
            .domain([0, maxVal]);

          var maxTicks = maxVal;
          if (maxVal > 30) {
            maxTicks = maxVal / 2;
          }

          barSVG
            .append("g")
            .attr("transform", "translate(50,0)")
            .call(
              d3
                .axisLeft(y)
                .ticks(maxTicks)
                .tickSize(-bar_width + 100)
            );

          var bars = barSVG
            .selectAll(".bar")
            .data(maturity_data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("fill", function (d) {
              return colorScale(d.key);
            })
            .attr("x", function (d) {
              return x(d.key);
            })
            .attr("width", x.bandwidth())
            .attr("y", bar_height - 50)
            .attr("height", 0);

          bars
            .transition()
            .duration(1500)
            .attr("height", function (d) {
              return bar_height - 50 - y(+d.value.startups);
            })
            .attr("y", function (d) {
              return y(+d.value.startups);
            });

          barSVG
            .append("g")
            .attr("transform", "translate(0," + (bar_height - 50) + ")")
            .call(d3.axisBottom(x).ticks(maturity_data.length));

          barSVG
            .append("text")
            .attr(
              "transform",
              "translate(" + bar_width / 2 + " ," + (bar_height - 50 + 26) + ")"
            )
            .attr("class", "bar-axis-label")
            .text("Maturity");

          barSVG
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 12)
            .attr("x", 0 - (bar_height - 10) / 2)
            .attr("dy", "1em")
            .attr("class", "bar-axis-label")
            .text("Number of Startups");
        }
      }

      // END from map - on click country - bar chart --------------------------------------------------------------------------

      // toggle visibility on click Global/Europe btn
      function update_visibility() {
        nodes.style("visibility", function (d) {
          var visibility = "visible";
          if (eu == false && d["Region"] == "Global") {
            visibility = "hidden";
          }
          return visibility;
        });

        // nodes_acquired.style("visibility", function(d) {
        //   var visibility = "visible"
        //   if (eu == false && d["Region"] == "Global") {
        //     visibility = "hidden"
        //   }
        //   return visibility
        // })
      }
      d3.selectAll(".fundingKey-labels").style("opacity", "0");
      // toggle maturity/year nodes
      function switchRadial() {
        d3.selectAll(".fundingKey-labels").style("opacity", "0");
        d3.selectAll(".maturity-labels").style("opacity", "0");
        if (radial === "year") {
          nodes
            .transition()
            .duration(animationDuration)
            .attrTween("cx", function (d) {
              var i = d3.interpolate(d.x, d.yearX);
              return function (t) {
                return i(t);
              };
            })
            .attrTween("cy", function (d) {
              var i = d3.interpolate(d.y, d.yearY);
              return function (t) {
                return i(t);
              };
            });

          nodes_acquired
            .transition()
            .duration(animationDuration)
            .attrTween("transform", function (d) {
              var i = d3.interpolate(d.x, d.yearX);
              var j = d3.interpolate(d.y, d.yearY);
              return function (t) {
                return "translate(" + i(t) + "," + j(t) + ") rotate(45)";
              };
            });

          maturity_list.forEach(function (d) {
            var id = "#" + d.name.toLowerCase() + "-label-path-text";
            d3.select(id).remove();
          });

          fundingKey_list.forEach(function (d) {
            var id = "#" + d.name.toLowerCase() + "-label-path-text";
            d3.select(id).remove();
          });

          count_by_year.forEach(function (d) {
            d.fn
              .append("text")
              .attr("class", "year-label-text")
              .attr("id", "year-" + d.key + "-label-path-text")
              .append("textPath")
              .attr("xlink:href", "#year-" + d.key + "-label-path")
              .attr("startOffset", "50%")
              .text(d.key);
            chartPieData1.forEach(function (v) {
              const yearSegId = v.data.value.key.split(" ");
              d3.select(
                "#year-" + d.key + "-" + yearSegId[0] + "-segment" + v.index
              ).attr("opacity", 1);
            });
          });
          count_by_stage.forEach(function (d) {
            if (d.name) {
              var id = "#" + d.name.toLowerCase() + "-label-path-text";
            }
            d3.select(id).remove();
            chartPieData1.forEach(function (v) {
              ////private-North-America-stage6
              const stageSegId = v.data.value.key
                .replace(/ /g, "-")
                .replace(/&/g, "and");
              d3.select(
                "#" +
                  d.key.toLowerCase() +
                  "-" +
                  stageSegId +
                  "-stage" +
                  d.index
              ).attr("opacity", 0);
            });
          });
        } else if (radial == "maturity") {
          d3.selectAll(".maturity-labels").style("opacity", "1");
          nodes
            .transition()
            .duration(animationDuration)
            .attrTween("cx", function (d) {
              var i = d3.interpolate(d.yearX, d.x);
              return function (t) {
                return i(t);
              };
            })
            .attrTween("cy", function (d) {
              var i = d3.interpolate(d.yearY, d.y);
              return function (t) {
                return i(t);
              };
            });

          nodes_acquired
            .transition()
            .duration(animationDuration)
            .attrTween("transform", function (d) {
              var i = d3.interpolate(d.yearX, d.x);
              var j = d3.interpolate(d.yearY, d.y);
              return function (t) {
                return "translate(" + i(t) + "," + j(t) + ") rotate(45)";
              };
            });

          count_by_year.forEach(function (d) {
            var id = "#year-" + d.key + "-label-path-text";
            d3.select(id).remove();
            chartPieData1.forEach(function (v) {
              const yearSegId = v.data.value.key.split(" ");
              const _segId =
                "#year-" + d.key + "-" + yearSegId[0] + "-segment" + v.index;
              d3.select(_segId).attr("opacity", 0);
            });
          });
          fundingKey_list.forEach(function (d) {
            var id = "#" + d.name.toLowerCase() + "-label-path-text";
            d3.select(id).remove();
            chartPieData1.forEach(function (v) {
              const stageSegId = v.data.value.key
                .replace(/ /g, "-")
                .replace(/&/g, "and");
              d.name == "Unfunded" ? (d.name = "Private") : d.name;
              d3.select(
                "#" +
                  d.name.toLowerCase().replace(/ /g, "-").replace(/&/g, "and") +
                  "-" +
                  stageSegId +
                  "-stage" +
                  v.index
              ).attr("opacity", 0);
            });
          });

          maturity_list_elements.forEach(function (d, i) {
            d.fn
              .append("text")
              .attr("class", "maturity-label-text")
              .attr("id", d.name.toLowerCase() + "-label-path-text")
              .append("textPath")
              .attr("xlink:href", "#" + d.name.toLowerCase() + "-label-path")
              .attr("startOffset", "50%")
              .text(d.name);
          });
        } else {
          d3.selectAll(".fundingKey-labels").style("opacity", "1");
          d3.selectAll(".maturity-labels").style("opacity", "0");
          nodes
            .transition()
            .duration(animationDuration)
            .attrTween("cx", function (d) {
              var i = d3.interpolate(d.x, d.stageX);
              //     var filterkeyData= fundingKey_data.filter(function (item) {
              //     //var deptts = deptselected.split(',');
              //         if (item["key"] == d["Funding Stage"])
              //             return true;
              //     return false;
              // });
              // console.log(filterkeyData);

              return function (t) {
                return i(t);
              };
            })
            .attrTween("cy", function (d) {
              var i = d3.interpolate(d.y, d.stageY);
              return function (t) {
                return i(t);
              };
            });

          nodes_acquired
            .transition()
            .duration(animationDuration)
            .attrTween("transform", function (d) {
              var i = d3.interpolate(d.x, d.stageX);
              var j = d3.interpolate(d.y, d.stageY);
              return function (t) {
                //['Total Funding (USD)']
                return "translate(" + i(t) + "," + j(t) + ") rotate(45)";
              };
            });
          count_by_year.forEach(function (d) {
            var id = "#year-" + d.key + "-label-path-text";
            d3.select(id).remove();
            chartPieData1.forEach(function (v) {
              const yearSegId = v.data.value.key.split(" ");
              const _segId =
                "#year-" + d.key + "-" + yearSegId[0] + "-segment" + v.index;
              d3.select(_segId).attr("opacity", 0);
            });
          });
          maturity_list.forEach(function (d) {
            var id = "#" + d.name.toLowerCase() + "-label-path-text";
            d3.select(id).remove();
          });

          fundingKey_list_elements.forEach(function (d, i) {
            d.fn
              .append("text")
              .attr("class", "fundingKey-label-text")
              .attr("id", d.name.toLowerCase() + "-label-path-text")
              .append("textPath")
              .attr("xlink:href", "#" + d.name.toLowerCase() + "-label-path")
              .attr("startOffset", "50%")
              .text(d.name);
          });
          count_by_stage.forEach(function (d) {
            chartPieData1.forEach(function (v) {
              d.key == "Unfunded" ? (d.key = "Private") : d.key;
              const stageSegId = v.data.value.key
                .replace(/ /g, "-")
                .replace(/&/g, "and");
              d3.select(
                "#" +
                  d.key.toLowerCase().replace(/ /g, "-").replace(/&/g, "and") +
                  "-" +
                  stageSegId +
                  "-stage" +
                  v.index
              ).attr("opacity", 1);
            });
          });
        }
      }

      // label compass on mouse over  ------------------------------------------------------------------------------------------------
      function labelCompassMouseOver(segment_data) {
        var count_by_focus_area = d3
          .nest()
          .key(function (d) {
            return d["Business Model Option"];
          })
          .sortKeys(function (a, b) {
            let aVal = 0;
            let bVal = 0;
            focusAreaSort.forEach(function (v, index) {
              if (a === v) {
                aVal = index;
              }
              if (b === v) {
                bVal = index;
              }
            });
            return d3.ascending(aVal, bVal);
          })
          .entries(
            data.filter(function (d) {
              if (clientFilter !== "All Startups") {
                return d["Value Chain Grouping"] === clientFilter;
              } else {
                return d;
              }
            })
          );

        nodes.attr("opacity", function (d) {
          if (
            d["Business Model Option"] === segment_data.data.value.key &&
            d["Play"] === segment_data.data.value.parent
          ) {
            return 1;
          } else {
            return 0.3;
          }
        });

        nodes_acquired.attr("opacity", function (d) {
          if (
            d["Business Model Option"] === segment_data.data.value.key &&
            d["Play"] === segment_data.data.value.parent
          ) {
            return 1;
          } else {
            return 0.3;
          }
        });
      }

      function getNodesOpacity(_d) {
        return (stateHero == "all" && stateEurope == "global") ||
          (stateHero == "all" &&
            stateEurope == "europe" &&
            _d.Country == "Europe") ||
          (stateHero == "hero" &&
            _d.Hero == "TRUE" &&
            stateEurope == "global") ||
          (stateHero == "hero" &&
            _d.Hero == "TRUE" &&
            stateEurope == "europe" &&
            _d.Country == "Europe") ||
          stateAccess == "access"
          ? 1
          : 0.3;
      }
      // label compass on mouse out  ------------------------------------------------------------------------------------------------
      function labelCompassMouseOut(d) {
        d3.select("#opp-space-tooltip-container").style("opacity", "0");
        if (selectedFilter != "none") {
          if (selectedFilter == "other") {
            updateNodes("key", selectedFilter);
          } else {
            updateNodes("key", selectedFilter);
          }
        } else {
          segmentsLabelBand.attr("opacity", function (_d) {
            return _d.opacity;
          });
          nodes.attr("opacity", function (_d) {
            return getNodesOpacity(_d);
          });
          nodes_acquired.attr("opacity", function (_d) {
            return getNodesOpacity(_d);
          });
        }
        if (heroFilterActive == "true") {
          stateHero = "all";
          toggleAllHero();
        }
      }

      // legend item on mouse over  ------------------------------------------------------------------------------------------------
      function legendMouseOver(data, type) {
        if (type === "other") {
          nodes_acquired.attr("opacity", 1);
          nodes.attr("opacity", 0.3);
        }
        if (type === "color") {
          nodes.attr("opacity", function (d) {
            if (fundingCategoryScale(d["Funding Stage"]) === data) {
              return 1;
            } else {
              return 0.3;
            }
          });
          nodes_acquired.attr("opacity", 0.3);
        }
      }

      // legend item on mouse out ------------------------------------------------------------------------------------------------
      function keyMouseOut() {
        // nodes.attr("opacity", function(_d) {
        //   return getNodesOpacity(_d);
        // });
        // nodes_acquired.attr("opacity", function(_d) {
        //   return getNodesOpacity(_d);
        // });
        nodes.attr("opacity", function (d) {
          return d.opacity;
        });
        nodes_acquired.attr("opacity", function (d) {
          return d.opacity;
        });
        if (heroFilterActive == "true") {
          stateHero = "all";
          toggleAllHero();
        }
      }

      // display lateral right tooltip on mouse over outter compass label
      function showOppSpaceTooltip(segment_data, clicked = "") {
        var count_by_focus_area = d3
          .nest()
          .key(function (d) {
            return d["Business Model Option"];
          })
          .sortKeys(function (a, b) {
            let aVal = 0;
            let bVal = 0;
            focusAreaSort.forEach(function (v, index) {
              if (a === v) {
                aVal = index;
              }
              if (b === v) {
                bVal = index;
              }
            });
            return d3.ascending(aVal, bVal);
          })
          .entries(
            data
              .filter(function (v) {
                if (filters.type === "All Startups") {
                  return v;
                } else {
                  return v["Value Chain Grouping"] === filters.type;
                }
              })
              .filter(function (v) {
                if (filters.geotype === "All Startups") {
                  return v;
                } else {
                  return v["Global"] === filters.geotype;
                }
              })
          );

        var numberOfStartups = 0;
        var segmentFunding = 0;
        for (i = 0; i < count_by_focus_area.length; i++) {
          if (count_by_focus_area[i].key === segment_data.data.value.key) {
            numberOfStartups = count_by_focus_area[i].values.length;
            theme = count_by_focus_area[i].values[0]["Theme"];
            themeDesc = count_by_focus_area[i].values[0]["Theme Definition"];
            segmentFunding = d3.sum(
              count_by_focus_area[i].values,
              function (d) {
                return +getValueWithoutCurrencySymbol(d["Total Funding (USD)"]);
              }
            );
          }
        }
        if (numberOfStartups === 0) {
          var avgFunding = 0;
        } else {
          var avgFunding = segmentFunding / numberOfStartups;
        }
        d3.select("#opp-space-tooltip-container").style("opacity", "1");
        d3.select(".opp-space-tooltip-title").text(
          segment_data.data.value.key.toUpperCase().replace(/_/g, "/")
        );
        d3.select("#ostt-3").text(formatFunding(segmentFunding.toFixed(2)));
        d3.select("#ostt-5").text(numberOfStartups);
        d3.select("#ostt-7").text(formatFunding(avgFunding.toFixed(2)));
      }
      function getValueWithoutCurrencySymbol(inputNumberWithCurrencySign) {
        return Number(inputNumberWithCurrencySign.replace(/[^0-9\.-]+/g, ""));
      }

      // display tooltip nodes -----------------------------------------------------------------------------------------
      function showNodeTooltip(d) {
        const fundingList = ["Unfunded"];
        let fundingVal = 0;
        if (fundingList.indexOf(d["Funding Stage"]) < 0) {
          if (d["Total Funding (USD)"] == 0) {
            fundingVal = "Undisclosed";
          } else {
            var result = getValueWithoutCurrencySymbol(
              d["Total Funding (USD)"]
            );
            fundingVal = formatFunding(result);
          }
        } else {
          var result = getValueWithoutCurrencySymbol(d["Total Funding (USD)"]);
          fundingVal = formatFunding(result);
        }
        if (fundingVal == "$-") {
          fundingVal = "-";
        }
        // l tag use for bold heading
        d3.select(".node-tooltip-title").text("Startup name: " + d["Name"]);
        d3.select(".node-tooltip-Year-founded").html(
          "<l>Year founded: </l>" + d["Founded"]
        );
        d3.select(".node-tooltip-Funding-stage").html(
          "<l>Funding stage: </l>" + d["Funding Stage"]
        );
        d3.select(".node-tooltip-funding").html(
          "<l>Total Funding: </l>" + fundingVal
        );
        d3.select(".node-tooltip-Country").html(
          "<l>Country: </l>" + d["Country"]
        );
        d3.select(".node-tooltip-Website").html(
          "<l>Website: </l>" + d["Website"]
        );
        d3.select(".node-tooltip-description").html(
          "<l>Description: </l>" + d["Description"].replace(/�۪/g, "'")
        );

        d3.select(".node-tooltip").style("opacity", 1);

        const { width, height } = d3
          .select(".node-tooltip")
          .node()
          .getBoundingClientRect();

        let padding = 10;
        let x = d3.event.clientX;
        if (x + padding + width > window.innerWidth) {
          x = x - padding - width;
        } else {
          x = x + padding;
        }
        let y = d3.event.clientY;
        if (y + padding + height > window.innerHeight) {
          y = y - padding - height;
        } else {
          y = y + padding;
        }

        d3.select(".node-tooltip").style(
          "transform",
          `translate(${x}px,${y}px)`
        );
      }

      // hide tooltip nodes -----------------------------------------------------------------------------------------
      function hideNodeTooltip() {
        d3.select(".node-tooltip").style("opacity", 0);
        // if(state !== "Europe"){
        nodes.attr("opacity", function (d) {
          return d.opacity;
        });
        nodes_acquired.attr("opacity", function (d) {
          return d.opacity;
        });
        // }
      }

      // save image ---------------------------------------------------------------------------------------------------
      function saveImage() {
        for (let i = 0; i < 0; i++) {
          setTimeout(function () {
            var selection =
              "#background-segment-" +
              chartPieData1[i].data.value.key
                .replace(/[\])}[{(]/g, "")
                .replace(/ /g, "-")
                .replace(/,/g, "")
                .replace(/&/g, "and")
                .replace(/ /g, "-")
                .replace(/&/g, "and");

            var tmp_width = d3
              .select(selection)
              .node()
              .getBoundingClientRect().width;
            var tmp_height = d3
              .select(selection)
              .node()
              .getBoundingClientRect().height;

            var tmp_svg = d3
              .select("#tmp-container")
              .append("svg")
              .attr("width", width / 2)
              .attr("height", height / 2);

            var clientRect = d3
              .select(selection)
              .node()
              .getBoundingClientRect();

            var tmp_angle = (6.283 / chartPieData1.length) * (i + 1);
            var adj = outerRadius * Math.cos(tmp_angle);
            var opp = outerRadius * Math.sin(tmp_angle);
            var adjR = (innerRadius + 110) * Math.cos(tmp_angle);
            var oppR = (innerRadius + 110) * Math.sin(tmp_angle);
            var quad = 3;
            var hor = 0;
            var ver = 50;
            if (tmp_angle < 6.283 / 4) {
              quad = 1;
              hor += Math.abs((Math.sin(tmp_angle + 6.283 / 4) * width) / 8);
              ver = height / 2;
            } else {
              if (tmp_angle < 6.283 / 2) {
                quad = 2;
                hor += Math.abs((Math.sin(tmp_angle + 6.283 / 4) * width) / 8);
              } else {
                if (tmp_angle < (3 * 6.283) / 4) {
                  hor = width / 2;
                  hor -= Math.abs(
                    (Math.sin(tmp_angle + 6.283 / 4) * width) / 8
                  );
                } else {
                  hor = width / 2;
                  hor -= Math.abs(
                    (Math.sin(tmp_angle + 6.283 / 4) * width) / 8
                  );
                  ver = height / 2;
                  ver -= Math.abs((Math.sin(tmp_angle) * width) / 4);
                }
              }
            }

            var tmp_chartSVG = tmp_svg
              .append("g")
              .attr("transform", "translate(" + hor + "," + ver + ")");

            if (radial === "maturity") {
              var tmp_matureSegments = tmp_chartSVG
                .selectAll("mature-segments")
                .data([chartPieData1[i]])
                .enter()
                .append("path")
                .style("fill-opacity", 1)
                .attr("class", function (d) {
                  return (
                    "mature-segments segment-" +
                    d.data.value.key.replace(/ /g, "-").replace(/&/g, "and")
                  );
                })
                .attr("id", function (d) {
                  return (
                    "tmp-mature-segment-" +
                    d.data.value.key.replace(/ /g, "-").replace(/&/g, "and")
                  );
                })
                .style("stroke", "white")
                .style("stroke-width", "2px")
                .attr("fill", "#DFDFDF") //F4F4F4
                .attr("d", matureArc);
              var tmp_emergingSegments = tmp_chartSVG
                .selectAll("emerging-segments")
                .data([chartPieData1[i]])
                .enter()
                .append("path")
                .style("fill-opacity", 1)
                .attr("class", function (d) {
                  return (
                    "emerging-segments segment-" +
                    d.data.value.key.replace(/ /g, "-").replace(/&/g, "and")
                  );
                })
                .attr("id", function (d) {
                  return (
                    "tmp-emerging-segment-" +
                    d.data.value.key.replace(/ /g, "-").replace(/&/g, "and")
                  );
                })
                .style("stroke", "white")
                .style("stroke-width", "2px")
                .attr("fill", "#E9E9E9")
                .attr("d", emergingArc);
              var tmp_nascentSegments = tmp_chartSVG
                .selectAll("nascent-segments")
                .data([chartPieData1[i]])
                .enter()
                .append("path")
                .style("fill-opacity", 1)
                .attr("class", function (d) {
                  return (
                    "nascent-segments segment-" +
                    d.data.value.key.replace(/ /g, "-").replace(/&/g, "and")
                  );
                })
                .attr("id", function (d) {
                  return (
                    "tmp-nascent-segment-" +
                    d.data.value.key.replace(/ /g, "-").replace(/&/g, "and")
                  );
                })
                .style("stroke", "white")
                .style("stroke-width", "2px")
                .attr("fill", "#F4F4F4") //DFDFDF
                .attr("d", nascentArc);
            } else {
              count_by_year.forEach(function (v) {
                var tmpArc = d3.arc().innerRadius(v.inner).outerRadius(v.outer);

                var tmpSegment = tmp_chartSVG
                  .selectAll("year-segment")
                  .data([chartPieData1[i]])
                  .enter()
                  .append("path")
                  .attr("class", "segment")
                  .attr("d", tmpArc)
                  .attr("fill", "#f4f4f4");
              });
            }
            var tmpSegmentsLabelBand = tmp_chartSVG
              .selectAll("path.segment-band")
              .data([chartPieData1[i]])
              .enter()
              .append("path")
              .classed("segment-band", true)
              .attr("d", segmentLabelBandArc)
              .attr("fill", "rgb(214 214 214)");
            var tmpLabels = tmp_chartSVG.append("g").classed("labels", true);
            var tmpLabelsOther = tmp_chartSVG
              .append("g")
              .classed("labels", true);

            tmpLabels
              .append("def")
              .append("path")
              .attr("id", "label-path")
              .attr(
                "d",
                "m0 " +
                  -labelRadius +
                  " a" +
                  labelRadius +
                  " " +
                  labelRadius +
                  " 0 1,1 -0.01 0"
              );
            tmpLabelsOther
              .append("def")
              .append("path")
              .attr("id", "label-other-path")
              .attr(
                "d",
                "m0 " +
                  -labelOtherRadius +
                  " a" +
                  labelOtherRadius +
                  " " +
                  labelOtherRadius +
                  " 0 1,1 -0.01 0"
              );

            tmpLabels
              .selectAll("text")
              .data([chartPieData1[i]])
              .enter()
              .append("text")
              .attr("class", "label-text")
              .append("textPath")
              .attr("xlink:href", "#label-path")
              .attr("startOffset", function (d, i) {
                var percentage =
                  ((d.endAngle - d.startAngle) / 2 + d.startAngle) /
                  0.0628318530716;
                return percentage + "%";
              })
              .text(function (d) {
                return label_wrap(d.data.value.key.toUpperCase())[0];
              });

            tmpLabelsOther
              .selectAll("text")
              .data([chartPieData1[i]])
              .enter()
              .append("text")
              .attr("class", "label-text")
              .append("textPath")
              .attr("xlink:href", "#label-other-path")
              .attr("startOffset", function (d, i) {
                var percentage =
                  ((d.endAngle - d.startAngle) / 2 + d.startAngle) /
                  0.0628318530716;
                return percentage + "%";
              })
              .text(function (d) {
                var result = label_wrap(d.data.value.key.toUpperCase());
                if (result.length > 2) {
                  return result[1] + " " + result[2];
                } else {
                  return result[1];
                }
              });

            var tmp_nodes = tmp_chartSVG
              .selectAll("nodes")
              .data(data)
              .enter()
              .append("circle")
              .attr("class", "nodes")
              .attr("r", function (d) {
                if (d["Funding Stage"] !== "Acquired") {
                  if (d["Hero"] == "TRUE") {
                    return heroNoderadius;
                  } else {
                    return nodeRadius;
                  }
                }
              })
              .attr("opacity", function (d) {
                return d.opacity;
              })
              .attr("fill", function (d) {
                return nodeColorScale(fundingCategoryScale(d["Funding Stage"]));
              })
              .attr("cx", function (d) {
                if (radial === "maturity") {
                  return d.x;
                } else {
                  return d.yearX;
                }
              })
              .attr("cy", function (d) {
                if (radial === "maturity") {
                  return d.y;
                } else {
                  return d.yearY;
                }
              })
              .attr("opacity", function (d) {
                if (d["Play"] === chartPieData1[i].data.value.key) {
                  return d.opacity;
                } else {
                  return 0;
                }
              });

            var tmp_acquired = tmp_chartSVG
              .selectAll("nodes-acquired")
              .data(data)
              .enter()
              .append("rect")
              .attr("class", "nodes nodes-acquired")
              .attr("opacity", function (d) {
                return d.opacity;
              })
              .attr("opacity", function (d) {
                return d.opacity;
              })
              .attr("width", function (d) {
                if (d["Funding Stage"] === "Acquired") {
                  return nodeOtherWidth;
                } else {
                  return 0;
                }
              })
              .attr("height", function (d) {
                if (d["Funding Stage"] === "Acquired") {
                  return nodeOtherWidth;
                } else {
                  return 0;
                }
              })
              .attr("x", 0)
              .attr("y", 0)
              .attr("fill", "#FFD55F")
              .attr("transform", function (d) {
                if (radial === "maturity") {
                  var x = d.x;
                  var y = d.y;
                } else {
                  var x = d.yearX;
                  var y = d.yearY;
                }
                return "translate(" + x + "," + y + ")    rotate(45)";
              })
              .attr("opacity", function (d) {
                if (d["Play"] === chartPieData1[i].data.value.key) {
                  return d.opacity;
                } else {
                  return 0;
                }
              });

            var name = chartPieData1[i].data.value.key;

            var svgString = getSVGString(tmp_svg.node());

            svgString2Image(
              svgString,
              tmp_width * 2,
              tmp_height * 2,
              "png",
              name,
              save
            );

            function save(dataBlob, filesize, name) {
              saveAs(dataBlob, "radar " + name + ".png");
            }

            tmp_svg.remove();
          }, 500 * i);
        }
      }

      // END save image ---------------------------------------------------------------------------------------------------

      // toggle mapbox map ------------------------------------------------------------------------------------------------
      function toggle_map(type) {
        if (type === "on") {
          d3.select(".map-container").style("display", "");
          d3.select(".map-tooltip").style("display", "none");
          d3.select("#chart-container").style("display", "none");
          d3.select("#key-container").style("display", "none");
          d3.select("#control-container").style("display", "none");
          d3.select("#hover-info-container").style("display", "none");
          d3.select("#save-button-container").style("display", "none");
          d3.select(".analysis-container").style("display", "none");
          d3.select(".air-table-container").style("display", "none");
          map.invalidateSize();
        } else {
          d3.select(".map-container").style("display", "none");
          d3.select(".map-tooltip").style("display", "none");
          d3.select("#chart-container").style("display", "");
          d3.select("#key-container").style("display", "");
          d3.select("#control-container").style("display", "");
          d3.select("#hover-info-container").style("display", "");
          d3.select("#save-button-container").style("display", "");
          d3.select(".analysis-container").style("display", "none");
          d3.select(".air-table-container").style("display", "none");
        }
      }

      // close popup from map country click --------------------------------------------------------------------------------
      d3.select(".popup-close").on("click", function () {
        d3.select(".popup-container").attr("class", "popup-container");
        d3.select(".popup-bg").style("display", "none");
        d3.select(".svg-bar-container").html("");
      });

      d3.select("#air-table-toggle-btn").on("click", function () {
        d3.select("#map-toggle-btn").attr("class", "left-sidebar-btn");
        d3.select("#analysis-toggle-btn").attr("class", "left-sidebar-btn");
        d3.select("#radar-toggle-btn").attr("class", "left-sidebar-btn");
        d3.select("#air-table-toggle-btn").attr(
          "class",
          "left-sidebar-btn active"
        );
        d3.select("body").style("background-color", "#F4F4F4");

        d3.select(".map-container").style("display", "none");
        d3.select(".map-tooltip").style("display", "none");
        d3.select("#chart-container").style("display", "none");
        d3.select("#key-container").style("display", "none");
        d3.select("#control-container").style("display", "none");
        d3.select("#hover-info-container").style("display", "none");
        d3.select("#save-button-container").style("display", "none");
        d3.select(".air-table-container").style("display", "block");
        d3.select(".air-table-container")
          .select("iframe")
          .attr("width", window.innerWidth - 146)
          .attr("height", window.innerHeight);
        d3.select(".analysis-container").style("display", "none");
      });

      d3.select("#analysis-toggle-btn").on("click", function () {
        d3.select("#map-toggle-btn").attr("class", "left-sidebar-btn");
        d3.select("#analysis-toggle-btn").attr(
          "class",
          "left-sidebar-btn active"
        );
        d3.select("#radar-toggle-btn").attr("class", "left-sidebar-btn");
        d3.select("#air-table-toggle-btn").attr("class", "left-sidebar-btn");
        d3.select("body").style("background-color", "#F4F4F4");

        d3.select(".map-container").style("display", "none");
        d3.select(".map-tooltip").style("display", "none");
        d3.select("#chart-container").style("display", "none");
        d3.select("#key-container").style("display", "none");
        d3.select("#control-container").style("display", "none");
        d3.select("#hover-info-container").style("display", "none");
        d3.select("#save-button-container").style("display", "none");
        d3.select(".air-table-container").style("display", "none");
        d3.select(".analysis-container").style("display", "block");
        d3.select(".analysis-container")
          .select("iframe")
          .attr("width", window.innerWidth - 146)
          .attr("height", window.innerHeight);
      });

      d3.select("#map-toggle-btn").on("click", function () {
        d3.select("#map-toggle-btn").attr("class", "left-sidebar-btn active");
        d3.select("#analysis-toggle-btn").attr("class", "left-sidebar-btn");
        d3.select("#air-table-toggle-btn").attr("class", "left-sidebar-btn");
        d3.select("#radar-toggle-btn").attr("class", "left-sidebar-btn");
        d3.select("body").style("background-color", "#F4F4F4");

        toggle_map("on");
      });

      // Set-up the export save button
      d3.select("#save-button").on("click", function () {
        saveImage();

        var svgString = getSVGString(svg.node());
        var name = "";

        svgString2Image(svgString, width * 2, height * 2, "png", name, save);

        function save(dataBlob, filesize, name) {
          saveAs(dataBlob, "radar.png");
        }
        // passes Blob and filesize String to the callback
      });

      // Below are the functions that handle actual exporting:
      // getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
      function getSVGString(svgNode) {
        svgNode.setAttribute("xlink", "http://www.w3.org/1999/xlink");
        var cssStyleText = getCSSStyles(svgNode);
        appendCSS(cssStyleText, svgNode);

        var serializer = new XMLSerializer();
        var svgString = serializer.serializeToString(svgNode);
        svgString = svgString.replace(/(\w+)?:?xlink=/g, "xmlns:xlink=");
        svgString = svgString.replace(/NS\d+:href/g, "xlink:href");
        svgString = svgString.replace(/"Graphik Regular";/g, "arial;");
        svgString = svgString.replace(/"Graphik Bold";/g, "arial;");

        return svgString;

        function getCSSStyles(parentElement) {
          var selectorTextArr = [];

          // Add Parent element Id and Classes to the list
          selectorTextArr.push("#" + parentElement.id);
          for (var c = 0; c < parentElement.classList.length; c++)
            if (!contains("." + parentElement.classList[c], selectorTextArr))
              selectorTextArr.push("." + parentElement.classList[c]);

          // Add Children element Ids and Classes to the list
          var nodes = parentElement.getElementsByTagName("*");
          for (var i = 0; i < nodes.length; i++) {
            var id = nodes[i].id;

            if (!contains("#" + id, selectorTextArr))
              selectorTextArr.push("#" + id);

            var classes = nodes[i].classList;
            for (var c = 0; c < classes.length; c++)
              if (!contains("." + classes[c], selectorTextArr))
                selectorTextArr.push("." + classes[c]);
          }
          // Extract CSS Rules
          var extractedCSSText = "";
          for (var i = 0; i < document.styleSheets.length; i++) {
            var s = document.styleSheets[i];

            try {
              if (!s.cssRules) continue;
            } catch (e) {
              if (e.name !== "SecurityError") throw e;
              continue;
            }

            var cssRules = s.cssRules;

            //manually add css rules:
            selectorTextArr.push("textPath");

            for (var r = 0; r < cssRules.length; r++) {
              if (contains(cssRules[r].selectorText, selectorTextArr))
                extractedCSSText += cssRules[r].cssText;
            }
          }

          return extractedCSSText;

          function contains(str, arr) {
            return arr.indexOf(str) === -1 ? false : true;
          }
        }

        function appendCSS(cssText, element) {
          var styleElement = document.createElement("style");
          styleElement.setAttribute("type", "text/css");
          styleElement.innerHTML = cssText;
          var refNode = element.hasChildNodes() ? element.children[0] : null;
          element.insertBefore(styleElement, refNode);
        }
      }
      // });
    });
  });
});

function formatFunding(total_funding) {
  fundingFormatted = total_funding;
  if (total_funding <= 900000 && total_funding > 1000) {
    fundingFormatted = Math.round(total_funding / 10) / 100 + "K";
  }
  if (total_funding > 900000) {
    fundingFormatted = Math.round(total_funding / 10000) / 100 + "M";
  }
  return fundingFormatted;
}

function label_wrap(text_data, limit = 7) {
  words = text_data.split(/\s+/);
  lines = [];
  current_seq_len = 0;
  current_seq = [];
  result = [];
  for (i = 0; i < words.length; i++) {
    current_seq_len += words[i].length;
    current_seq.push(words[i].replace(/�۪/g, "'"));
    if (current_seq_len > limit) {
      lines.push(current_seq);
      current_seq_len = 0;
      current_seq = [];
    }
  }
  lines.push(current_seq);
  for (i = 0; i < lines.length; i++) {
    tmp = "";
    for (j = 0; j < lines[i].length; j++) {
      if (j !== lines[i].length - 1) {
        tmp += lines[i][j] + " ";
      } else {
        tmp += lines[i][j];
      }
    }
    var dx = -tmp.length + "em";
    result.push(tmp);
  }
  return result;
}

function svgString2Image(svgString, width, height, format, name, callback) {
  var format = format ? format : "png";

  var imgsrc =
    "data:image/svg+xml;base64," +
    btoa(unescape(encodeURIComponent(svgString)));

  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  var image = new Image();
  image.onload = function () {
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    canvas.toBlob(function (blob) {
      var filesize = Math.round(blob.length / 1024) + " KB";
      if (callback) callback(blob, filesize, name);
    });
  };

  image.src = imgsrc;
}

function calcCongestion(
  tmp_startAngleMin,
  tmp_endAngleMax,
  tmp_innerRadiusMin,
  tmp_outerRadiusMax,
  radiusSize = 2,
  numNodes
) {
  // calculate area of arc
  var areaA =
    (Math.PI *
      tmp_outerRadiusMax ** 2 *
      (tmp_endAngleMax - tmp_startAngleMin)) /
    6.28319;
  var areaB =
    (Math.PI *
      tmp_innerRadiusMin ** 2 *
      (tmp_endAngleMax - tmp_startAngleMin)) /
    6.28319;
  var area = areaA - areaB;

  // divide by area of circle * numNodes
  var areaNode = Math.PI * radiusSize ** 2;

  // High is lots of space, low is less space.
  return area / (areaNode * numNodes);
}

function assignNonRandomYear(
  data,
  tmp_startAngleMin,
  tmp_endAngleMax,
  tmp_innerRadiusMin,
  tmp_outerRadiusMax,
  nodeDataEntry
) {
  var numNodes = nodeDataEntry.value;
  var horizontalCuts = numNodes / 2;
  var verticalCuts = 2;
  var totalSpots = numNodes;

  vertDivision = (tmp_outerRadiusMax - tmp_innerRadiusMin) / verticalCuts;
  horDivision = (tmp_endAngleMax - tmp_startAngleMin) / horizontalCuts;

  horizontalSlot = 0;
  verticalSlot = 0;
  index = 0;
  loop0: for (let vi = 0; vi <= verticalCuts; vi++) {
    loop1: for (let hi = 0; hi <= horizontalCuts; hi++) {
      index++;
      try {
        const tmp = indexTrackerYear[data["Play"]][data["Founded"]]["slot"];
      } catch (e) {}
      const indexTrackerYearIndex =
        indexTrackerYear[data["Play"]] !== undefined &&
        indexTrackerYear[data["Play"]][data["Founded"]] !== undefined
          ? indexTrackerYear[data["Play"]][data["Founded"]]["slot"]
          : 0;
      if (index === indexTrackerYearIndex) {
        horizontalSlot = hi;
        verticalSlot = vi;
        break loop0;
      }
    }
  }
  tmp_innerRadius = tmp_innerRadiusMin + verticalSlot * vertDivision;
  tmp_outerRadius = tmp_innerRadius + vertDivision;
  tmp_startAngle = tmp_startAngleMin + horizontalSlot * horDivision;
  tmp_endAngle = tmp_startAngle + horDivision;

  tmp_gen = d3
    .arc()
    .innerRadius(tmp_innerRadius)
    .outerRadius(tmp_outerRadius)
    .startAngle(tmp_startAngle)
    .endAngle(tmp_endAngle);

  tmp_x = tmp_gen.centroid()[0];
  tmp_y = tmp_gen.centroid()[1];

  return [tmp_x, tmp_y];
}

function assignNonRandom(
  data,
  tmp_startAngleMin,
  tmp_endAngleMax,
  tmp_innerRadiusMin,
  tmp_outerRadiusMax,
  nodeDataEntry,
  maturityorstage
) {
  // divide space into a grid?
  // half till ~number of nodes?
  if (maturityorstage == "Funding Stage") {
    if (privateNodes.includes(data["Funding Stage"])) {
      maturityorstage = "unfunded";
    } else if (series_c_nodes.includes(data["Funding Stage"])) {
      maturityorstage = "Series C";
    }
  } else {
    maturityorstage = data[maturityorstage];
  }
  var numNodes = nodeDataEntry.value;
  var horizontalCuts = 0;
  var verticalCuts = 0;

  for (let o = 0; o < numNodes; o++) {
    if (o % 2 == 0) {
      horizontalCuts++;
    } else {
      verticalCuts++;
    }
    var totalSpots = horizontalCuts * verticalCuts;
    if (totalSpots > numNodes) {
      break;
    }
  }

  vertDivision = (tmp_outerRadiusMax - tmp_innerRadiusMin) / verticalCuts;
  horDivision = (tmp_endAngleMax - tmp_startAngleMin) / horizontalCuts;

  horizontalSlot = 0;
  verticalSlot = 0;
  index = 0;
  loop0: for (let vi = 0; vi <= verticalCuts; vi++) {
    loop1: for (let hi = 0; hi <= horizontalCuts; hi++) {
      index++;
      if (index === indexTracker[data["Play"]][maturityorstage]["slot"]) {
        horizontalSlot = hi;
        verticalSlot = vi;
        break loop0;
      }
    }
  }

  tmp_innerRadius = tmp_innerRadiusMin + verticalSlot * vertDivision;
  tmp_outerRadius = tmp_innerRadius + vertDivision;
  tmp_startAngle = tmp_startAngleMin + horizontalSlot * horDivision;
  tmp_endAngle = tmp_startAngle + horDivision;

  tmp_gen = d3
    .arc()
    .innerRadius(tmp_innerRadius)
    .outerRadius(tmp_outerRadius)
    .startAngle(tmp_startAngle)
    .endAngle(tmp_endAngle);

  tmp_x = tmp_gen.centroid()[0];
  tmp_y = tmp_gen.centroid()[1];

  return [tmp_x, tmp_y];
}

// function assignRandom(
//   tmp_startAngleMin,
//   tmp_endAngleMax,
//   tmp_innerRadiusMin,
//   tmp_outerRadiusMax,
//   congestion,
//   nodeList
// ) {
//   tmp_startAngle =
//     Math.random() * (tmp_endAngleMax - tmp_startAngleMin) +
//     tmp_startAngleMin;
//   tmp_endAngle =
//     Math.random() * (tmp_endAngleMax - tmp_startAngle) + tmp_startAngle;
//   tmp_innerRadius =
//     Math.random() * (tmp_outerRadiusMax - tmp_innerRadiusMin) +
//     tmp_innerRadiusMin;
//   tmp_outerRadius =
//     Math.random() * (tmp_outerRadiusMax - tmp_innerRadius) +
//     tmp_innerRadius;
//   tmp_gen = d3
//     .arc()
//     .innerRadius(tmp_innerRadius)
//     .outerRadius(tmp_outerRadius)
//     .startAngle(tmp_startAngle)
//     .endAngle(tmp_endAngle);

//   tmp_x = tmp_gen.centroid()[0];
//   tmp_y = tmp_gen.centroid()[1];

//   if (nodeList.length !== 0) {
//     var distanceCheck = 0;
//     for (l = 0; l < nodeList.length; l++) {
//       distance = Math.sqrt(
//         Math.pow(nodeList[l][0] - tmp_x, 2) +
//           Math.pow(nodeList[l][1] - tmp_y, 2)
//       );
//       if (distance <= 5) {
//         distanceCheck = 1;
//       }
//     }
//     if (distanceCheck === 'x') {
//       return assignRandom(
//         tmp_startAngleMin,
//         tmp_endAngleMax,
//         tmp_innerRadiusMin,
//         tmp_outerRadiusMax,
//         congestion,
//         nodeList
//       );
//     } else {
//       nodeList.push([tmp_x, tmp_y]);
//       return [tmp_x, tmp_y];
//     }
//   } else {
//     nodeList.push([tmp_x, tmp_y]);
//     return [tmp_x, tmp_y];
//   }
// }

var minmaxArray = [];
function get_minmax(data) {
  var fundingKey_data = d3
    .nest()
    .key(function (d) {
      return d["Funding Stage"];
    })
    .entries(
      data.filter(function (d) {
        return d["Funding Stage"] != "";
      })
    );
  for (let index = 0; index < fundingKey_data.length; index++) {
    const element = fundingKey_data[index];
    let obj = { key: "", min: 0, max: 0 };
    obj.key = element.key;
    var minmaxValue = d3.extent(element.values, (d) =>
      Number(d["Total Funding (USD)"].toString().replace(/[^0-9\.-]+/g, ""))
    );
    obj.min = minmaxValue[0];
    obj.max = minmaxValue[1];
    minmaxArray.push(obj);
  }
  return fundingKey_data;
}
function assignRandom(
  tmp_startAngleMin,
  tmp_endAngleMax,
  tmp_innerRadiusMin,
  tmp_outerRadiusMax,
  congestion,
  nodeList,
  d
) {
  var total_funding;
  var scaleToLocatePoint = d3.scaleLinear();
  if (d != undefined) {
    var currentData = minmaxArray.filter(function (item) {
      if (item["key"] == d["Funding Stage"]) return true;
      return false;
    });
    scaleToLocatePoint
      .domain([currentData[0].min, currentData[0].max])
      .range([0.05, 0.9]);
    total_funding = Number(d["Total Funding (USD)"].replace(/[^0-9\.-]+/g, ""));
    tmp_startAngle =
      Math.random() * (tmp_endAngleMax - tmp_startAngleMin) + tmp_startAngleMin;
    tmp_endAngle =
      Math.random() * (tmp_endAngleMax - tmp_startAngle) + tmp_startAngle;
    tmp_innerRadius =
      scaleToLocatePoint(total_funding) *
        (tmp_outerRadiusMax - tmp_innerRadiusMin) +
      tmp_innerRadiusMin;
    tmp_outerRadius =
      scaleToLocatePoint(total_funding) *
        (tmp_outerRadiusMax - tmp_innerRadius) +
      tmp_innerRadius;
  } else {
    tmp_startAngle =
      Math.random() * (tmp_endAngleMax - tmp_startAngleMin) + tmp_startAngleMin;
    tmp_endAngle =
      Math.random() * (tmp_endAngleMax - tmp_startAngle) + tmp_startAngle;
    tmp_innerRadius =
      Math.random() * (tmp_outerRadiusMax - tmp_innerRadiusMin) +
      tmp_innerRadiusMin;
    tmp_outerRadius =
      Math.random() * (tmp_outerRadiusMax - tmp_innerRadius) + tmp_innerRadius;
  }
  tmp_gen = d3
    .arc()
    .innerRadius(tmp_innerRadius)
    .outerRadius(tmp_outerRadius)
    .startAngle(tmp_startAngle)
    .endAngle(tmp_endAngle);

  tmp_x = tmp_gen.centroid()[0];
  tmp_y = tmp_gen.centroid()[1];

  if (nodeList.length !== 0) {
    var distanceCheck = 0;
    for (l = 0; l < nodeList.length; l++) {
      distance = Math.sqrt(
        Math.pow(nodeList[l][0] - tmp_x, 2) +
          Math.pow(nodeList[l][1] - tmp_y, 2)
      );
      if (distance <= 5) {
        distanceCheck = 1;
      }
    }
    if (distanceCheck === "x") {
      return assignRandom(
        tmp_startAngleMin,
        tmp_endAngleMax,
        tmp_innerRadiusMin,
        tmp_outerRadiusMax,
        congestion,
        nodeList
      );
    } else {
      nodeList.push([tmp_x, tmp_y]);
      return [tmp_x, tmp_y];
    }
  } else {
    nodeList.push([tmp_x, tmp_y]);
    return [tmp_x, tmp_y];
  }
}

function projectPoint(x, y) {
  var point = map.latLngToLayerPoint(new L.LatLng(y, x));
  this.stream.point(point.x, point.y);
}

var center = function (arr) {
  var minX, maxX, minY, maxY;
  for (var i = 0; i < arr.length; i++) {
    minX = arr[i][0] < minX || minX == null ? arr[i][0] : minX;
    maxX = arr[i][0] > maxX || maxX == null ? arr[i][0] : maxX;
    minY = arr[i][1] < minY || minY == null ? arr[i][1] : minY;
    maxY = arr[i][1] > maxY || maxY == null ? arr[i][1] : maxY;
  }
  return [(minX + maxX) / 2, (minY + maxY) / 2];
};
