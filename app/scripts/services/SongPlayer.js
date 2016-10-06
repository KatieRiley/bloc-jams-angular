(function() {
    function SongPlayer() {
        /**
        * @desc Song Player object
        * @type {Object}
        */
        var SongPlayer = {};
        /**
        * @desc current song being played/paused
        * @type {Object}
        */
        var currentSong = null;
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
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
        * @function play
        * @desc sets a song to currentSong and starts to play the audio file
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
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
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();