'use strict';

angular.module('energyScannerApp')
  .factory('Scanner', function ($timeout, $interval, $log) {

    return {
      isScanning: false,
      isScanned: false,
      startTime: null,
      endTime: null,
      recordingTime: 0,
      duration: null,

      setTimer: function (minutes) {
        this.duration = minutes * 60000;
      },

      start: function () {
        this.isScanning = true;
        this.startTime = Date.now();

        if (this.duration) {
          $timeout(this.stop, this.duration);
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

      save: function () {
        debugger;
      }
    };
  });
