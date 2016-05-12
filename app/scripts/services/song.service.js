(function () {
  'use strict';

  angular
      .module('csbApp')
      .service('SongService', SongService);

  SongService.$inject = [];

  function SongService() {

    var service = {};

    service.content = null;
    service.lines = null;
    service.chordLines = null;
    service.chordSpaceRatio = null;
    service.stanzaList = null;

    service.normalizeWhiteSpaces = function () {
      // replace Windows and Mac newLines with Unix style ones
      this.content = this.content.replace(/(?:\r\n|\r)/g, "\n");
      // replace tabs with 8 spaces
      this.content = this.content.replace(/\t/g, '        ');
    };

    service.createLines = function () {
      // split the content
      var l = this.content.split(/\n/);
      this.lines = [];
      // create line descriptor objects
      for (var i in l) {
        var line = l[i];
        var lineObject = {};
        lineObject.line = line;
        lineObject.length = line.length;
        lineObject.trimmed = line.trim();
        lineObject.trimmedLength = lineObject.trimmed.length;
        lineObject.isEmpty = lineObject.trimmedLength == 0;

        lineObject.spaceCount = (lineObject.trimmed.match(new RegExp(" ", "g")) || []).length;
        lineObject.spaceRatio = lineObject.trimmedLength != 0 ? lineObject.spaceCount / lineObject.trimmedLength : 0;
        lineObject.isChordLine = lineObject.spaceRatio > this.chordSpaceRatio || (lineObject.spaceCount == 0 && lineObject.trimmedLength < 4) || (lineObject.spaceRatio == 0 && lineObject.trimmedLength < 4);
        this.lines.push(lineObject);
      }
      // delete empty lines from the beginning
      while (this.lines.length > 0 && this.lines[0].trimmedLength == 0) {
        this.lines.splice(0, 1);
      }
      // delete empty lines from the end
      while (this.lines.length > 0 && this.lines[this.lines.length - 1].trimmedLength == 0) {
        this.lines.splice(this.lines.length - 1, 1);
      }
    };

    service.createChordLines = function () {
      // create lines, strip multiple consecutive empty lines
      this.chordLines = [];
      var oneEmptyLineAdded = false;
      for (var i in this.lines) {
        var lineObject = this.lines[i];
        if (lineObject.isChordLine) {
          var addLine = true;
          if (lineObject.isEmpty) {
            if (oneEmptyLineAdded) {
              addLine = false;
            } else {
              oneEmptyLineAdded = true;
            }
          } else {
            oneEmptyLineAdded = false;
          }
          if (addLine) {
            var chordLine = {
              line   : lineObject.trimmed,
              isEmpty: lineObject.isEmpty
            };
            this.chordLines.push(chordLine);
          }
        }
      }
      for (var i in this.chordLines) {
        var chordLine = this.chordLines[i];
        chordLine.line = chordLine.line.replace(/ +(?= )/g, '');
        chordLine.line = chordLine.line.replace(/ /g, '\t');
      }
    };

    service.stripRepeatingStanzas = function () {
      var stanzas = [];
      var stanza = {};
      for (var i in this.chordLines) {
        var line = this.chordLines[i];
        if (line.isEmpty) {
          stanzas.push(stanza);
          stanza = {};
        } else {
          this.addLineToStanza(line, stanza);
        }
      }
      if (stanza.hasOwnProperty('lines')) {
        stanzas.push(stanza);
      }
      var stanzaMap = {};
      service.stanzaList = [];
      for (var i in stanzas) {
        var stanza = stanzas[i];
        if (!stanzaMap.hasOwnProperty(stanza.compact) && stanza.hasOwnProperty('lines')) {
          stanzaMap[stanza.compact] = true;
          service.stanzaList.push(stanza);
        }
      }
      //console.log(stanzas);
      //console.log(service.stanzaList);
    };

    service.addLineToStanza = function (line, stanza) {
      if (!stanza.hasOwnProperty('lines')) {
        stanza.lines = [];
      }
      if (!stanza.hasOwnProperty('compact')) {
        stanza.compact = "";
      }
      stanza.lines.push(line);
      stanza.compact += line.line + "-#-";
    };

    service.parseSong = function (c, chordSpaceRatio) {
      this.content = c;
      this.chordSpaceRatio = chordSpaceRatio;
      this.normalizeWhiteSpaces();
      this.createLines();
      this.createChordLines();
      this.stripRepeatingStanzas();
      //console.log(this.chordLines);
      return {
        "songLines" : this.lines,
        "chordLines": this.chordLines,
        "stanzas"   : this.stanzaList
      };
    };

    return service;
  };
})();
