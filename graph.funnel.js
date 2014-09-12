'use strict';
angular
    .module('graph.funnel',[])
    .directive('funnel', [function() {
        return {
            restrict: 'E',
            template: '<div id="funnelContainer"></div>',
            scope: {
                data: '=',
                width: '=',
                height: '=',
                bpercent: '=',
                speed: '='
            },

            link: function (scope) {
                var data = (function (content) {
                    // content like [{},{}]
                    var formattedData = [];
                    for (var i = 0; i < content.length; i++ ) {
                        var unitData = [];
                        unitData.push(Object.keys(content[i])[0]);
                        unitData.push(content[i][Object.keys(content[i])[0]]);
                        formattedData.push(unitData);
                    }
                    return formattedData;
                })(scope.data || [{'Video Views': 1500}, {'Comments': 300}, {'Video Responses': 150}]);
                var width = scope.width || 450;
                var height = scope.height || 200;
                var bpercent = scope.bpercent || 1/3;

                new FunnelChart({
                    data: data,
                    width: width,
                    height: height,
                    bottomPct: bpercent
                }).draw('#funnelContainer', scope.speed || 2);
            }
        }
    }]);