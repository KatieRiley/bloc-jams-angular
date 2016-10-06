(function() {
    function SongPlayer(Fixtures) {
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

            SongPlayer.currentSong = song;
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
        * @param {Object} song
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();