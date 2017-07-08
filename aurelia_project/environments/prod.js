export default {
  debug: false,
  testing: false
};
export class ElasticConfig {
  static ES_URL = "/elastic";
  static INDEX_MODULATION="-"+new Date().toISOString().substr(0,10);
};
