/* global angular */

angular.module('simple', []).controller('simpleCtrl', [
    function() {
        var self = this
        self.list = [
            {
                id: 1,
                label: 'item 0'
            },
            {
                id: 2,
                label: 'item 1'
            }]
        self.add = function() {
            self.list.push({
                id: self.list.length + 1,
                label: 'Item '+self.list.length
            })
        }
    }
    ])