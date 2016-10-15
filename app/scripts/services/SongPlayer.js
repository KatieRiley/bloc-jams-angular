(function() {
    function SongPlayer($rootScope, Fixtures) {
        /**
        * @desc Song Player object
        * @type {Object}
        */
        var SongPlayer = {};
        /**
        * @desc album information
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        /**
        * @desc holds the value of the volume
        * @type {number}
        */
        var volume = 0;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;
        };
        
        /**
        * @function stopSong
        * @desc Stops currently playing song and sets the song.playing to null
        */
        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        
        /**
        * @function playSong
        * @desc Starts to play the audio file and sets the playing property of song.playing to true
        */
        var playSong = function(){
            currentBuzzObject.play();
            setSong(song);
        }
        
        /**
        * @desc current song being played/paused
        * @type {Object}
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc current song being played/paused
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        /**
        * @function play
        * @desc sets a song to SongPlayer.SongPlayer.currentSong and starts to play the audio file
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                playSong();
                song.playing = ture;
            }
        };
        
        /**
        * @function pause
        * @desc Pauses currently playing song and sets song.playing to false
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function previous
        * @desc Sets currentSongIndex to the previous song in the album
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function next
        * @desc Sets currentSongIndex to the next song in the album
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
  
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        /**
        * @function setVolume
        * @desc updates the volume on change
        */
        SongPlayer.setVolume = function() {
            currentBuzzObject.setVolume(volume);
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();