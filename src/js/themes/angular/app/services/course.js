(function() {
  'use strict';

  angular.module('app')
    .factory('CoursesService', ['API_URL', '$http', 'Upload', function(API_URL, $http, Upload) {
      return {
        tokenString: function() {
          return '?token=' + localStorage.token;
        },
        getAllCourses: function(type, callback, errorCallback) {
          var url = API_URL + '/courses';
          if (type === 'manage') {
            url += '/manage?token=' + localStorage.token;
          } else if (type === 'collaborate') {
            url += '/collaborate?token=' + localStorage.token;
          } else if (type === 'review') {
            url += '/review?token=' + localStorage.token;
          }
          $http.get(url)
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
        createCourse: function(course, callback, errorCallback) {
          var data = {
            token: localStorage.token,
            course: course
          };
          $http.post(API_URL + '/courses', data)
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
        updateCourse: function(courseId, course, callback, errorCallback) {
          var data = {
            token: localStorage.token,
            course: course
          };
          $http.put(API_URL + '/courses/' + courseId, data)
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
        getCourseById: function(courseId, callback, errorCallback) {
          $http.get(API_URL + '/courses/' + courseId + this.tokenString())
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
        deleteCourse: function(courseId, callback, errorCallback) {
          $http.delete(API_URL + '/courses/' + courseId + this.tokenString())
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
        changeCourseStatus: function(courseId, state, callback, errorCallback) {
          var data = {
            token: localStorage.token,
            state: state
          };
          $http.patch(API_URL + '/courses/' + courseId + '/change_status', data)
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
        searchCourse: function(keyword, callback, errorCallback) {
          $http.get(API_URL + '/courses/search?keyword=' + keyword)
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
        updateCourseAdministration: function(courseId, course, callback, errorCallback) {
          var data = {
            token: localStorage.token,
            course: course
          };
          $http.patch(API_URL + '/courses/' + courseId + '/administration', data)
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
        getLessonById: function(courseId, lessonId, callback, errorCallback) {
          $http.get(API_URL + '/courses/' + courseId + '/lessons/' + lessonId + this.tokenString())
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
        addOrUpdateLesson: function(courseId, lessonId, data, callback, errorCallback) { //for video & reading lesson
          data.token = localStorage.token;
          var promise;
          if (!lessonId) { // create new lesson
            promise = $http.post(API_URL + '/courses/' + courseId + '/lessons', data);
          } else { //update lesson
            promise = $http.put(API_URL + '/courses/' + courseId + '/lessons/' + lessonId, data);
          }
          promise.then(function(res) {
            if (callback) {
              callback(res);
            }
          }, function(res) {
            if (errorCallback) {
              errorCallback(res);
            }
          });
        },
        uploadCodeLesson: function(courseId, lessonId, postData, callback, errorCallback, progressCallback) { //for code & project task
          postData.token = localStorage.token;
          var promise;
          if (!lessonId) { // create new lesson
            promise = Upload.upload({
              url: API_URL + '/courses/' + courseId + '/lessons',
              method: 'POST',
              data: postData
            });
          } else { //update lesson
            promise = Upload.upload({
              url: API_URL + '/courses/' + courseId + '/lessons/' + lessonId,
              method: 'PATCH',
              data: postData
            });
          }
          promise.then(function(res) {
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
        },
        updateLessonsOrder: function(courseId, lessonIdsArr, callback, errorCallback) {
          var url = API_URL + '/courses/' + courseId + '/lessons/update_order?token=' + localStorage.token;
          for (var i = 0; i < lessonIdsArr.length; i++) {
            url += '&ordered_ids[]=' + lessonIdsArr[i];
          }
          $http.put(url)
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
        deleteLesson: function(courseId, lessonId, callback, errorCallback) {
          $http.delete(API_URL + '/courses/' + courseId + '/lessons/' + lessonId + this.tokenString())
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
        downloadLessonTemplate: function(courseId, lessonId, callback) {
          callback(API_URL + '/courses/' + courseId + '/lessons/' + lessonId + '/download' + this.tokenString());
        }
      };
    }]);
})();
