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

    function makeResponse(code, message, detail) {
      return {
        code: code,
        message: message,
        detail: detail
      };
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
        this.totalUsage = getTotalUsage(this.datastore);
      },

      saveHistory: function (appliance) {

        var deferred = $q.defer(),
            history = {
              start: this.startTime,
              end: this.endTime,
              totalUsage: this.totalUsage
            };

        Appliance.addAppliance(appliance).success(function (response) {

          history.id = response.id;

          ScanHistory.saveScanHistory(history).success(function (response) {

            if (response === '200' || response === 200) {
              deferred.resolve(makeResponse(200, 'Save appliance & scan history successfully!'));
            } else {
              deferred.reject(makeResponse(400, 'Error occurred when save scan history', response));
            }

          }).error(function (response) {
            deferred.reject(makeResponse(400, 'Error occurred when save scan history', response));
          });

        }).error(function (response) {
          deferred.reject(makeResponse(400, 'Error occurred when add appliance', response));
        });

        return deferred.promise;
      },

      saveRawData: function (appliance) {
        return ScanHistory.saveScanRawData(appliance.id, this.datastore);
      },

      store: function (data) {
        this.datastore.push(data);
      }
    };
  });
