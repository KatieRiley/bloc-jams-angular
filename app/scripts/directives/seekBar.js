(function() {
    function seekBar($document) {
    
        /**
        * @function calculatePercent
        * @desc Calculates the percent of the seek bar
        * @param {Object} seek bar, {event} event
        */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;
                /**
                * @desc Seek bar element 
                * @type {element}
                */
                var seekBar = $(element);
                
                
                /**
                * @function perventString
                * @desc returns the percent as a string
                */
                var percentString = function () {
                    /**
                    * @desc the value of the scope
                    * @type {number}
                    */
                    var value = scope.value;
                    /**
                    * @desc the max amount of the scope
                    * @type {number}
                    */
                    var max = scope.max;
                    /**
                    * @desc the percentage of the max that is being used
                    * @type {number}
                    */
                    var percent = value / max * 100;
                    return percent + "%";
                };
 
                
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                scope.onClickSeekBar = function(event) {
                    /**
                    * @desc percent of the seek bar in the event
                    * @type {number}
                    */
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        /**
                        * @desc percent of the seek bar in the event
                        * @type {number}
                        */
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                        });
                    });
 
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
                
            }
        };
    }
 
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();