'use strict';

class MyPapa {
  readFileFromUrl(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false); // 開発中のため false にしてある
    xhr.send();
    return xhr.responseText;
  }

  parseCsv(csvContentText) {
    Papa.parse(csvContentText, {
      complete: function(results) {
        this.papaToAgGrid(results.data);
      }.bind(this) // コールバック関数の外側の関数にスコープを当てるため
    });
  }

  showCsvDataToTable(data) {
    let container = document.getElementById('example');
    let tweet_activity = new Handsontable(container, {
      data: data,
      rowHeaders: false,
      colHeaders: false
    });
  }

  showCsvDataToTableByAgGrid(data) {
    let rowData = data;
    let columnDefs = [
      { headerName: '日付', field: 'date' },
      { headerName: 'ページビュー数', field: 'pv' },
      { headerName: 'ユーザー数', field: 'uu' },
      { headerName: 'コンバージョン数', field: 'cv' }
    ];

    let gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData,
      enableSorting: true,
      enableFilter: true
    };

    document.addEventListener('DOMContentLoaded', function() {
      let eGridDiv = document.querySelector('#myGrid');
      new agGrid.Grid(eGridDiv, gridOptions);
    });
  }

  papaToAgGrid(papaData) {
    let agGridData = [];
    let tmpHash = {};

    for(let i = 1; i < papaData.length; i++) {
      // TODO: リファクタリング
      tmpHash = {};
      tmpHash.date = papaData[i][0];
      tmpHash.pv   = papaData[i][1];
      tmpHash.uu   = papaData[i][2];
      tmpHash.cv   = papaData[i][3];

      agGridData.push(tmpHash);
    }

    this.showCsvDataToTableByAgGrid(agGridData);
  };
}

module.exports = MyPapa;
