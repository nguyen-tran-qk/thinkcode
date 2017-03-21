(function() {
  'use strict';

  angular.module('app')
    .factory('WorkspaceService', ['API_URL', '$http', 'Upload', function(API_URL, $http, Upload) {
      return {
        getAllWorkspaces: function(callback, errorCallback) {
          $http.get(API_URL + '/workspaces?token=' + localStorage.token)
            .then(function(res) {
              if (callback) {
                callback(res);
              }
            }, function(res) {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        createWorkspace: function(engine_id, callback, errorCallback) {
          var data = {
            token: localStorage.token,
            workspace: {
            	engine_id: engine_id
            }
          };
          $http.post(API_URL + '/workspaces', data)
            .then(function(res) {
              if (callback) {
                callback(res);
              }
            }, function(res) {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        deleteWorkspace: function(id, callback, errorCallback) {
          $http.delete(API_URL + '/workspaces/' + id + '?token=' + localStorage.token)
            .then(function(res) {
              if (callback) {
                callback(res);
              }
            }, function(res) {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        getWorkspaceById: function(id, callback, errorCallback) {
          $http.get(API_URL + '/workspaces/' + id + '?token=' + localStorage.token)
            .then(function(res) {
              if (callback) {
                callback(res);
              }
            }, function(res) {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        loadFile: function(wsId, rel_path, callback, errorCallback) {
          $http.get(API_URL + '/workspaces/' + wsId + '/load?relative_path=' + rel_path + '&token=' + localStorage.token)
            .then(function(res) {
              if (callback) {
                callback(res);
              }
            }, function(res) {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        execute: function(wsId, rel_path, callback, errorCallback) {
          $http.get(API_URL + '/workspaces/' + wsId + '/execute?token=' + localStorage.token + '&relative_path=' + rel_path)
            .then(function(res) {
              if (callback) {
                callback(res);
              }
            }, function(res) {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        saveFile: function(wsId, rel_path, content, callback, errorCallback) {
          $http.patch(API_URL + '/workspaces/' + wsId + '/save?relative_path=' + rel_path + '&content=' + content + '&token=' + localStorage.token)
            .then(function(res) {
              if (callback) {
                callback(res);
              }
            }, function(res) {
              if (errorCallback) {
                errorCallback(res);
              }
            });
        },
        uploadTemplate: function(wsId, file, callback, errorCallback, progressCallback) {
          Upload.upload({
            url: API_URL + '/workspaces/' + wsId + '/upload',
            data: { 'template[template]': file, 'token': localStorage.token }
          }).then(function(res) {
            if (callback) {
              callback(res);
            }
          }, function(res) {
            if (errorCallback) {
              errorCallback(res);
            }
          }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            if (progressCallback) {
              progressCallback(progressPercentage);
            }
          });
        }
      };
    }]);
})();
