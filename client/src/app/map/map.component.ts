import { Component, OnInit } from '@angular/core';
import { MapDataService } from "./map-data.service";
import { GameMap } from "./map.enums";
import * as L from 'leaflet';
import { TileLayer } from "leaflet";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  private maxBoundsIsland: L.LatLngBoundsExpression = [[0, 0], [-384, 768]];
  private maxBoundsUndercrown: L.LatLngBoundsExpression = [[0, 0], [-72, 112]];
  private maxBoundsDlc1: L.LatLngBoundsExpression = [[0, 0], [-184, 352]];
  private maxBoundsDlc2: L.LatLngBoundsExpression = [[0, 0], [-184, 352]];
  private mapNativeMaxZoom: number = 5;
  private mapNativeMinZoom: number = 3;

  alwaysShowIcons: string[] = ['iconLinkTower', 'iconCampfire', 'iconRift'];
  currentAlwaysShowIcons: string[] = this.alwaysShowIcons;
  showCollected: boolean = false;
  currentIsland: string = GameMap.Island;
  lastBoundsIsland: L.LatLngBoundsExpression = [[-384, 0], [0, 768]];
  lastBoundsUndercrown: L.LatLngBoundsExpression = [[-72, 0], [0, 112]];
  lastBoundsDlc1: L.LatLngBoundsExpression = [[-184, 0], [0, 352]];
  lastBoundsDlc2: L.LatLngBoundsExpression = [[-184, 0], [0, 352]];

  borderPolygons = [];
  groups = [];

  map: L.Map | undefined;
  islandLayer: TileLayer | undefined;
  undercrownLayer: TileLayer | undefined;
  dlc1Layer: TileLayer | undefined;
  dlc2Layer: TileLayer | undefined;

  constructor(private mapDataService: MapDataService) {
  }

  ngOnInit() {
    this.initMap();
  }

  switchMap(): void {

  }

  togglePOI(): void {

  }

  toggleCollected(): void {

  }

  toggleCampTowerRift(): void {

  }

  initMap(): void {
    this.map = new L.Map('map', {
      crs: L.CRS.Simple,
      maxZoom: 7,
      minZoom: 1,
      maxBounds: this.maxBoundsIsland,
      maxBoundsViscosity: 0.6,
      attributionControl: false
    })
    this.map.fitBounds(this.lastBoundsIsland);
    this.islandLayer = L.tileLayer('/assets/tiles/{z}/{x}/{y}.jpg', {
      maxNativeZoom: this.mapNativeMaxZoom,
      bounds: this.maxBoundsIsland,
      tms: false
    }).addTo(this.map);
    this.undercrownLayer = L.tileLayer('/assets/tiles_undercrown/{z}/{x}/{y}.jpg', {
      maxNativeZoom: this.mapNativeMaxZoom,
      minNativeZoom: this.mapNativeMinZoom,
      bounds: this.maxBoundsUndercrown,
      tms: false
    });
    this.dlc1Layer = L.tileLayer('/assets/tiles_dlc1/{z}/{x}/{y}.jpg', {
      maxNativeZoom: this.mapNativeMaxZoom,
      minNativeZoom: this.mapNativeMinZoom,
      bounds: this.maxBoundsDlc1,
      tms: false
    });
    this.dlc2Layer = L.tileLayer('/assets/tiles_dlc2/{z}/{x}/{y}.jpg', {
      maxNativeZoom: this.mapNativeMaxZoom,
      minNativeZoom: this.mapNativeMinZoom,
      bounds: this.maxBoundsDlc2,
      tms: false
    });
  }
}
