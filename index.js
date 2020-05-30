import 'ol/ol.css';
import {useGeographic} from 'ol/proj';
import {Map, View, Feature, Overlay} from 'ol/index';
import {Point} from 'ol/geom';
import {Vector as VectorLayer, Tile as TileLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Style, Circle, Fill} from 'ol/style';

useGeographic();

var HomeFirst = [-121.882716, 37.330019];
var LifeMoves = [-121.904122, 37.336832];
var BillWilson = [-121.882040, 37.326242];
var LifeMovesJulian = [-121.902976, 37.335167];
var HeritageHome = [-121.894157, 37.34423237];
var LifeMovesVilla = [-121.877441, 37.338183];
var RapeCrisis = [-121.884555, 37.331487];

var HomeFirstPoint = new Point(HomeFirst);
var LifeMovesPoint = new Point(LifeMoves);
var BillWilsonPoint = new Point(BillWilson);
var LifeMovesJulianPoint = new Point(LifeMovesJulian);
var HeritageHomePoint = new Point(HeritageHome);
var LifeMovesVillaPoint = new Point(LifeMovesVilla);
var RapeCrisisPoint = new Point(RapeCrisis);


var map = new Map({
  target: 'map',
  view: new View({
    center: HomeFirst,
    zoom: 8
  }),
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature(HomeFirstPoint),
          new Feature(LifeMovesPoint),
          new Feature(BillWilsonPoint),
          new Feature(LifeMovesJulianPoint),
          new Feature(HeritageHomePoint),
          new Feature(LifeMovesVillaPoint),
          new Feature(RapeCrisisPoint)
        ]
      }),
      style: new Style({
        image: new Circle({
          radius: 9,
          fill: new Fill({color: 'red'})
        })
      })
    })
  ]

});

var element = document.getElementById('popup');

var popup = new Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -10]
});
map.addOverlay(popup);

function formatCoordinate(coordinate) {
  return ("\n    <table>\n      <tbody>\n        <tr><th>lon</th><td>" + (coordinate[0].toFixed(2)) + "</td></tr>\n        <tr><th>lat</th><td>" + (coordinate[1].toFixed(2)) + "</td></tr>\n      </tbody>\n    </table>");
}

var info = document.getElementById('info');
map.on('moveend', function() {
  var view = map.getView();
  var center = view.getCenter();
  info.innerHTML = formatCoordinate(center);
});

map.on('click', function(event) {
  var feature = map.getFeaturesAtPixel(event.pixel)[0];
  if (feature) {
    var coordinate = feature.getGeometry().getCoordinates();
                var shelter = 'Heritage Home Shelter: 150 masks, 200 sanitary napkins, 500 tampons, 220 rolls of toilet paper, and has 500 people'
                if (coordinate[1].toFixed(6) < 37.330019) {
                    shelter = 'Bill Wilson Shelter: 30 masks, 80 sanitary napkins, 80 tampons, 40 rolls of toilet paper, and has 30 people'
                }
                else if (coordinate[1].toFixed(6) < 37.331487) {
                    shelter = 'Home First Shelter: 5 masks, 30 sanitary napkins, 20 tampons, 30 rolls of toilet paper, and has 100 people'
                }
                else if (coordinate[1].toFixed(6) < 37.335167) {
                    shelter = 'Rape Crisis Shelter: 5 masks, 30 sanitary napkins, 20 tampons, 30 rolls of toilet paper, and has 100 people'
                }
                else if (coordinate[1].toFixed(6) < 37.336832) {
                    shelter = 'Life Moves Shelter (Julian): 20 masks, 20 sanitary napkins, 20 tampons, 20 rolls of toilet paper, and has 30 people'
                }
                else if (coordinate[1].toFixed(6) < 37.338183) {
                    shelter = 'Life Moves Shelter: 40 masks, 30 sanitary napkins, 29 tampons, 30 rolls of toilet paper, and has 50 people'
                }
                else if (coordinate[1].toFixed(6) < 37.34323237) {
                    shelter = 'Life Moves Shelter (Villa): 10 masks, 10 sanitary napkins, 10 tampons, 10 rolls of toilet paper, and has 10 people'
                }
    popup.setPosition(coordinate);
    $(element).popover({
      placement: 'top',
      html: true,
      content: shelter
    });
    $(element).popover('show');
  } else {
    $(element).popover('destroy');
  }
});

map.on('pointermove', function(event) {
  if (map.hasFeatureAtPixel(event.pixel)) {
    map.getViewport().style.cursor = 'pointer';
  } else {
    map.getViewport().style.cursor = 'inherit';
  }
});
