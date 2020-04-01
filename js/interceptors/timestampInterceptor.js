angular.module("listaTelefonica").factory("timestampInterceptor", function () {
    return {
        request: function (config) {
            var url = config.url;
            var timestamp = new Date().getTime();
            if (url.indexOf('view') > -1) return config;
            config.url = url + "?timestamp=" + timestamp;
            return config;
        }
    }
});
