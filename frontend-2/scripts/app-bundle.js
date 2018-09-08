define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);

    this.message = 'Hello World!';
  };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('models/client',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Client = exports.Client = function Client() {
        _classCallCheck(this, Client);
    };
});
define('models/status',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Status = exports.Status = function () {
        function Status() {
            _classCallCheck(this, Status);
        }

        Status.newStatus = function newStatus() {
            return new ConfigurablePipelineStatus();
        };

        return Status;
    }();

    var ConfigurablePipelineStatus = function (_Status) {
        _inherits(ConfigurablePipelineStatus, _Status);

        function ConfigurablePipelineStatus() {
            _classCallCheck(this, ConfigurablePipelineStatus);

            return _possibleConstructorReturn(this, _Status.apply(this, arguments));
        }

        return ConfigurablePipelineStatus;
    }(Status);
});
define('models/ticket',["exports", "models/client", "models/worker", "models/status"], function (exports, _client, _worker, _status) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Order = exports.Ticket = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Ticket = exports.Ticket = function Ticket(client, order) {
    _classCallCheck(this, Ticket);

    this.client = client;
    this.order = order;
    this.status = _status.Status.newStatus();
    this.workers = [];
  };

  var Order = exports.Order = function () {
    function Order() {
      _classCallCheck(this, Order);

      this.short = "nothing";
      this.long = "Nothing has been submitted yet";
    }

    Order.prototype.getShortDescription = function getShortDescription() {
      return this.short;
    };

    Order.prototype.getLongDescription = function getLongDescription() {
      return this.long;
    };

    return Order;
  }();
});
define('models/worker',[], function () {
  "use strict";
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${message}</h1>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map