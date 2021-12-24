import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AllCommunityModules, IGetRowsParams } from "@ag-grid-community/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";


@Component({
  selector: 'app-about',
  template: `
  <ag-grid-angular
  #agGrid
  style="width: 100%; height: 100%;"
  id="myGrid"
  class="ag-theme-balham"
  
  [columnDefs]="columnDefs"
  [defaultColDef]="defaultColDef"

  [debug]="true"
  [rowBuffer]="rowBuffer"
  [rowSelection]="rowSelection"
  
  [rowModelType]="rowModelType"
  [paginationPageSize]="paginationPageSize"
  [cacheOverflowSize]="cacheOverflowSize"
  [maxConcurrentDatasourceRequests]="maxConcurrentDatasourceRequests"
  [infiniteInitialRowCount]="infiniteInitialRowCount"
  [maxBlocksInCache]="maxBlocksInCache"
  [rowData]="rowData"
  (gridReady)="onGridReady($event)"
></ag-grid-angular>
  `
})
export class AboutComponent {
  private gridApi;
  private gridColumnApi;
 // public modules: Module[] = AllCommunityModules;

  private columnDefs;
  private defaultColDef;
  private components;
  private rowBuffer;
  private rowSelection;
  private rowModelType;
  private paginationPageSize;
  private cacheOverflowSize;
  private maxConcurrentDatasourceRequests;
  private infiniteInitialRowCount;
  private maxBlocksInCache;
  private rowData: [];

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: "ID",
        width: 50,
        valueGetter: "node.id",
        //cellRenderer: "loadingRenderer"
      },
      {
        headerName: "Athlete",
        field: "athlete",
        width: 150
      },
      {
        headerName: "Age",
        field: "age",
        width: 90
      },
      {
        headerName: "Country",
        field: "country",
        width: 120
      },
      {
        headerName: "Year",
        field: "year",
        width: 90
      },
      {
        headerName: "Date",
        field: "date",
        width: 110
      },
      {
        headerName: "Sport",
        field: "sport",
        width: 110
      },
      {
        headerName: "Gold",
        field: "gold",
        width: 100
      },
      {
        headerName: "Silver",
        field: "silver",
        width: 100
      },
      {
        headerName: "Bronze",
        field: "bronze",
        width: 100
      },
      {
        headerName: "Total",
        field: "total",
        width: 100
      }
    ];
    this.defaultColDef = { resizable: true };
    // this.components = {
    //   loadingRenderer: function(params) {
    //     if (params.value !== undefined) {
    //       return params.value;
    //     } else {
    //       return '<img src="../images/loading.gif">';
    //     }
    //   }
    // };
    this.rowBuffer = 0;
    this.rowSelection = "multiple";
    this.rowModelType = "infinite";
    this.paginationPageSize = 100;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 1000;
    this.maxBlocksInCache = 10;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
var info:any;
    this.http
      .get("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json")
      .subscribe(data => {
        var dataSource = {
          rowCount: null,
          getRows: function(params:IGetRowsParams) {
            console.log("asking for " + params.startRow + " to " + params.endRow);
            setTimeout(function() {
              info=data;
              this.rowData=info;
              var rowsThisPage = info.slice(params.startRow, params.endRow);
              var lastRow = -1;
              if (info.length <= params.endRow) {
                lastRow = info.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          }
        };
        debugger
        params.api.setDatasource(dataSource);
      });
  }
 
}
