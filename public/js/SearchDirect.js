/**
 * Created by David Milewicz on 8/24/17.
 *
 * Project: SearchDirect
 *
 * file: SearchDirect.js
 *
 * description: Contains global variables used in the SearchDirect extension.
 */




//=================================================================================================
// SYSTEM CONSTANTS
//=================================================================================================

var RELAYED_SEARCH_STRING_MSG = "RELAY_STRING";
var SEARCH_STRING_MSG = "REPORT_STRING";
var BADGE_UPDATE_MSG = "BADGE_UPDATE";
var DEBUG = 1;


var SEARCH_FAILURE = "X";
var SEARCH_SUCCESS = "✔";
var SEARCH_HEADER  = "#";

var RED = "#FF0000";
var GREEN = "#32CD32"


//=================================================================================================
// SYSTEM FUNCTIONS
//=================================================================================================

/*
 * System debug utility. Logs the message to console if the debug flag is on
 * TODO: make more robust?
 */
function error_log(msg) {
    if (DEBUG == 1) {
        console.error(msg)
    }
}

function debug_log(msg) {
  if (DEBUG == 1) {
    console.debug(msg);
  }
}