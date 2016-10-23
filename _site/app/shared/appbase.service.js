"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var AppbaseService = (function () {
    function AppbaseService(http) {
        this.http = http;
        this.requestParam = {
            url: null,
            auth: null
        };
        this.config = {
            username: null,
            password: null
        };
    }
    AppbaseService.prototype.setAppbase = function (config) {
        this.config.username = config.username;
        this.config.password = config.password;
        this.requestParam.pureurl = config.url;
        if (config.appname) {
            this.requestParam.url = config.url + '/' + config.appname;
        }
        else {
            this.requestParam.url = config.url;
        }
        this.requestParam.auth = "Basic " + btoa(config.username + ':' + config.password);
    };
    AppbaseService.prototype.get = function (path) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': this.requestParam.auth
        });
        var request_url = this.requestParam.url.replace(this.config.username + ':' + this.config.password + '@', '');
        var request_path = request_url + path + '/';
        console.log(request_path);
        return this.http.get(request_path, { headers: headers }).toPromise();
    };
    AppbaseService.prototype.getVersion = function () {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': this.requestParam.auth
        });
        var request_url = this.requestParam.pureurl.replace(this.config.username + ':' + this.config.password + '@', '');
        var request_path = request_url + '/';
        console.log(request_path);
        return this.http.get(request_path, { headers: headers }).toPromise();
    };
    AppbaseService.prototype.post = function (path, data) {
        var requestData = JSON.stringify(data);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': this.requestParam.auth
        });
        return this.http.post(this.requestParam.url + path, requestData, { headers: headers }).toPromise();
    };
    AppbaseService.prototype.posturl = function (url, data) {
        var requestData = JSON.stringify(data);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': this.requestParam.auth
        });
        return this.http.post(url, requestData, { headers: headers }).toPromise();
    };
    AppbaseService.prototype.put = function (path, data) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': this.requestParam.auth
        });
        return this.http.put(this.requestParam.url + path, data, { headers: headers }).toPromise();
    };
    AppbaseService.prototype.delete = function (path) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': this.requestParam.auth
        });
        return this.http.delete(this.requestParam.url + path, { headers: headers }).toPromise();
    };
    AppbaseService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
    };
    AppbaseService.prototype.getIndices = function (url) {
        var temp_config = this.filterurl(url);
        this.setAppbase(temp_config);
        return this.get('/_stats/indices');
    };
    AppbaseService.prototype.filterurl = function (url) {
        if (url) {
            var obj = {
                username: 'test',
                password: 'test',
                url: url
            };
            var urlsplit = url.split(':');
            try {
                obj.username = urlsplit[1].replace('//', '');
                var httpPrefix = url.split('://');
                if (urlsplit[2]) {
                    var pwsplit = urlsplit[2].split('@');
                    obj.password = pwsplit[0];
                    if (url.indexOf('@') !== -1) {
                        obj.url = httpPrefix[0] + '://' + pwsplit[1];
                        if (urlsplit[3]) {
                            obj.url += ':' + urlsplit[3];
                        }
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
            return obj;
        }
        else {
            return null;
        }
    };
    AppbaseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppbaseService);
    return AppbaseService;
}());
exports.AppbaseService = AppbaseService;
//# sourceMappingURL=appbase.service.js.map