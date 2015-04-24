'use strict';

angular.module('energyScannerApp')
  .factory('Scanner', function (Appliance, ScanHistory, $timeout, $interval, $q, $log) {

    return {

      init: function () {
        this.isScanning = false;
        this.isScanned = false;
        this.startTime = null;
        this.endTime = null;
        this.recordingTime = 0;
        this.duration = null;
        this.totalUsage = 154;
      },

      setTimer: function (minutes) {
        this.duration = minutes * 60000;
        $timeout(this.stop.bind(this), this.duration);
      },

      start: function (option) {
        this.isScanning = true;
        this.startTime = Date.now();

        if (option.id === 'timer') {
          this.setTimer(option.minutes);
        }

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

      }
    };
  });
