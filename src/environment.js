let date = new Date();

/**
 * Basic padding function
 * @param 1-2 digit number to pad from date functions
 * @returns {string}
 */
function pad(number) {
    return ("0" + number).slice(-2);
}


export class ElasticConfig {
  static ES_URL = "/elastic";
  static INDEX_MODULATION="-"+date.getFullYear()+"-"+pad(date.getMonth() + 1)+"-"+pad(date.getDate());
};
