'use strict';

angular.module('energyScannerApp')
  .factory('Scanner', function (Appliance, ScanHistory, $timeout, $interval, $q, $log) {

    function getTotalUsage(datastore) {
      var totalUsage = 0;

      angular.forEach(datastore, function (data) {
        totalUsage += data.usage;
      });

      return totalUsage;
    }

    return {

      init: function () {
        this.isScanning = false;
        this.isScanned = false;
        this.startTime = null;
        this.endTime = null;
        this.recordingTime = 0;
        this.totalUsage = 0;
        this.datastore = [];
      },

      start: function () {
        this.isScanning = true;
        this.startTime = Date.now();

        var update = $interval(function () {

          if (this.isScanned) {
            $interval.cancel(update);
          } else {
            this.recordingTime = Date.now() - this.startTime;
          }

        }.bind(this), 1000);

      },

      stop: function () {
        this.isScanning = false;
        this.isScanned = true;
        this.endTime = Date.now();
      },

      save: function (appliance) {

        this.totalUsage = getTotalUsage(this.datastore);

        var scanHistory = {
          start: this.startTime,
          end: this.endTime,
          mode1: appliance.mode,
          totalUsage: this.totalUsage
        };

        Appliance.addAppliance(appliance).success(function (response) {

          scanHistory.id = response.id;
          $log.info('Appliance added successfully!');

          ScanHistory.saveScanHistory(scanHistory).success(function (response) {

            if (response === '200' || response === 200) {
              $log.info('Save scan history successfully!');
            }

          }).error(function (response) {
            $log.error('Save scan history: ', response);
          });

        }).error(function (response) {
          $log.error('Add appliance: ', response);
        });

      },

      store: function (data) {
        this.datastore.push(data);
      }
    };
  });
