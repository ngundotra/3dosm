/**
 * @exports OSMLayer
 */
define(['libraries/WebWorldWind/src/WorldWind'], function (WorldWind) {
  "use strict";

  /**
   * Constructs an OSMLayer for a specified {@link WorldWindow}.
   * @alias OSMLayer
   * @constructor
   * @classdesc Sets the properties and functions viable for any OSM data. It is intended to be an abstract class, only to be extended for specific OSM data.
   * @param {WorldWindow} worldWindow The WorldWindow where the OSMLayer is added to.
   * @param {Float[]} boundingBox It defines the bounding box of the OSM data for the OSMLayer. The order of coordinates of the bounding box is "x1, y1, x2, y2".
   * @param {Object} configuration Configuration is used to set the attributes of {@link PlacemarkAttributes} if the geometry is Point or MultiPoint; or of {@link ShapeAttributes} otherwise.
   */
  var OSMLayer = function (worldWindow, boundingBox, configuration) {
    // Documented in defineProperties below.
    this._worldWindow = worldWindow;

    this._boundingBox = boundingBox;

    this._configuration = configuration;

    // Documented in defineProperties below.
    this._type = null;

    // Documented in defineProperties below.
    this._tag = null;
  };

  Object.defineProperties (OSMLayer.prototype, {
    /**
     * The WorldWindow where the OSMLayer is added to.
     * @memberof OSMLayer.prototype
     * @type {WorldWindow}
     * @readonly
     */
    worldWindow: {
      get: function() {
        return this._worldWindow;
      }
    },
    /**
     * The type of the OSM data. It can be "node", "way", or "relation".
     * @memberof OSMLayer.prototype
     * @type {String}
     */
    type: {
      get: function() {
        return this._type;
      },
      set: function(type) {
        this._type = type;
      }
    },
    /**
     * The tag of the OSM data. It can have values defined at http://wiki.openstreetmap.org/wiki/Map_Features.
     * Some examples are "amenity", "amenity=education"; "building", "building=farm" ...
     * @memberof OSMLayer.prototype
     * @type {String}
     */
    tag: {
      get: function() {
        return this._tag;
      },
      set: function(tag) {
        this._tag = tag;
      }
    }
  });

  /**
   * Sets the attributes of {@link PlacemarkAttributes} if the geometry is Point or MultiPoint; or of {@link ShapeAttributes} otherwise.
   * @param {GeoJSONGeometry} geometry An object containing the geometry of the OSM data in GeoJSON format for the OSMLayer.
   * @returns {Object} An object with its attributes set as {@link PlacemarkAttributes} or {@link ShapeAttributes},
   * where for both their attributes are defined in the configuration of the OSMLayer.
   */
  OSMLayer.prototype.shapeConfigurationCallback = function (geometry) {
    var configuration = {};

    if (geometry.isPointType() || geometry.isMultiPointType()) {
      var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
      for (var key in this._configuration)
        placemarkAttributes[key] = this._configuration[key];
      configuration.attributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
    }
    else {
      configuration.attributes =  new WorldWind.ShapeAttributes(null);
      for (var key in this._configuration)
        configuration.attributes[key] = this._configuration[key];
    }

    return configuration;
  };

  /**
   * Zooms to the OSMLayer, by setting the center of the viewport to the center of the bounding box.
   * It uses an arbitrary value for the range of {@link LookAtNavigator}.
   */
  OSMLayer.prototype.zoom = function () {
    var boundingBox = this._boundingBox;
    var centerX = (boundingBox[0] + boundingBox[2])/2;
    var centerY = (boundingBox[1] + boundingBox[3])/2;
    this._worldWindow.navigator.lookAtLocation.latitude = centerX;
    this._worldWindow.navigator.lookAtLocation.longitude = centerY;
    // console.log(centerX + ", " + centerY);
    this._worldWindow.navigator.range = 1e4; // Should be automatically calculated.
    this._worldWindow.redraw();
  };

  return OSMLayer;
});
