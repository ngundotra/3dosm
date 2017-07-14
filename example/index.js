define(['libraries/WebWorldWind/src/WorldWind', 'src/OSMBuildingLayer'],
  function (WorldWind, OSMBuildingLayer) {
    "use strict";

    WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_ERROR);
    WorldWind.configuration.baseUrl = "http://localhost/3dosm/libraries/WebWorldWind/";

    // Create the WorldWindow.
    var worldWindow = new WorldWind.WorldWindow("canvas");

    /**
     * Add imagery layers.
     */
    var layers = [
        {layer: new WorldWind.BMNGOneImageLayer(), enabled: true},
        {layer: new WorldWind.BingAerialWithLabelsLayer(), enabled: true},
        {layer: new WorldWind.CoordinatesDisplayLayer(worldWindow), enabled: true},
        {layer: new WorldWind.ViewControlsLayer(worldWindow), enabled: true},
        {layer: new WorldWind.AtmosphereLayer(), enabled: true}
    ];
    // layers[1].layer.detailControl = 1;
    for (var l = 0; l < layers.length; l++) {
        layers[l].layer.enabled = layers[l].enabled;
        worldWindow.addLayer(layers[l].layer);
    }

    var configuration = {
      // interiorColor: new WorldWind.Color(0.67, 0.25, 0.020, 1.0),
      interiorColor: new WorldWind.Color(0.02, 0.2, 0.7, 1.0),
      applyLighting: true,
      extrude: true,
      heatmap: {enabled: true, thresholds: [0, 30, 50, 100, 900]},
      altitude: "osm",
      altitudeMode: WorldWind.RELATIVE_TO_GROUND
    };

    // var osmNewYork = new OSMBuildingLayer(worldWindow, configuration);
    // osmNewYork.addByBoundingBox([-74.0232, 40.6998, -73.97, 40.74]);
    // osmNewYork.addByBoundingBox([-74.03, 40.70, -74.0, 40.72]);
    // var osmMilan = new OSMBuildingLayer(worldWindow, configuration);
    // osmMilan.addByBoundingBox([9.45, 45.48, 9.50, 45.50]);
    // osmMilan.addByBoundingBox([9.05, 45.45, 9.10, 45.50]);
    // osmMilan.addByBoundingBox([9.04284, 45.3871, 9.27791, 45.536]);
    // osmMilan.addByBoundingBox([9.2, 45.48, 9.21, 45.49]); // buggy region (nodes)
    // osmMilan.addByBoundingBox([9.1705, 45.4557, 9.2021, 45.4735]); // center
    // osmMilan.addByBoundingBox([9.48, 45.18, 9.53, 45.19]); // region tested in GRASS
    // osmMilan.zoom();
    var test = new OSMBuildingLayer(worldWindow, configuration);
    test.addByGeoJSONFile("data/test.geojson");
});
