'use strict';

angular.module('energyScannerApp')
  .factory('Scanner', function (Appliance, ScanHistory, $timeout, $interval, $q, $log) {

    return {
      //isScanning: false,
      //isScanned: false,
      //startTime: null,
      //endTime: null,
      //recordingTime: 0,
      //duration: null,
      //totalUsage: 154,

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
          id: appliance.id,
          start: this.startTime,
          end: this.endTime,
          mode1: appliance.mode,
          totalUsage: this.totalUsage
        };

        $q.all([
          Appliance.addAppliance(appliance)//,
          //ScanHistory.saveScanHistory(scanHistory)
        ]).then(function (responses) {
          $log.info('Appliance added successfully!');
        }).catch(function (response) {
          $log.error('Add appliance & save scan history: ', response);
        });

      }
    };
  });
