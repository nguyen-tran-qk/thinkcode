(function() {
  'use strict';

  angular.module('thinkcodeControllers')
    .controller('LessonController', lessonCtrl);

  function lessonCtrl($scope, $rootScope, $state, $timeout, $filter, $q, $uibModal, Utils, UserService, WorkspaceService, CoursesService) {
    $scope.app.settings.htmlClass = 'transition-navbar-scroll top-navbar-hide';
    $scope.app.settings.bodyClass = '';
    document.getElementById("main").style.overflow = 'auto';
    var $navbar = $('.navbar');
    if ($navbar.hasClass('navbar-size-large')) {
      $navbar.removeClass('navbar-size-large');
    }
    if ($navbar.hasClass('navbar-size-xlarge')) {
      $navbar.removeClass('navbar-size-xlarge');
    }
    if ($navbar.hasClass('paper-shadow')) {
      $navbar.removeClass('paper-shadow');
    }
    if (!$navbar.hasClass('auto-hide')) {
      $navbar.addClass('auto-hide');
    }
    $('.navbar .navbar-right .navbar-btn').addClass('btn-sm');
    $('.navbar .container').addClass('width-100pc');

    $scope.loading[0] = true;

    // $scope.user = UserService.getUser();

    var vm = this;
    vm.$state = $state;
    vm.minimized = false;
    vm.firstOpen = true;
    vm.hideInfo = false;
    vm.hideCode = false;
    vm.hideConsole = false;

    vm.workspaceId = vm.$state.params.workspace_id;
    vm.tabs = []; //// array to store files aka. branchs to display as tabs
    vm.my_data = [];
    vm.firebaseApp = Utils.firebaseApp;
    vm.firepadRefs = Utils.firepadRefs;
    vm.fileRef = {};

    var defaultMode, defaultBranch, firepadElement, cmConsoleElement, defaultText, cmEditorOptions, cmConsoleOptions, saveFile, analyzeTree, tree, openFile;

    function initCodeWorkspace() {
      var deferred = $q.defer();
      defaultText = '# Happy coding!';
      defaultMode = 'text/plain';
      defaultBranch = {
        label: 'untitled',
        uid: -1,
        data: {
          id: 'untitled',
          mode: defaultMode
        }
      };
      firepadElement = document.getElementById('firepad');
      cmConsoleElement = document.getElementById('console');
      cmEditorOptions = {
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 4,
        indentUnit: 4,
        extraKeys: {
          "Ctrl-Space": "autocomplete",
          "Ctrl-S": "saveFile",
        },
        mode: defaultMode,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        styleActiveLine: false,
        theme: 'Pacific'
      };
      cmConsoleOptions = {
        lineNumbers: false,
        lineWrapping: true,
        mode: 'text/plain',
        readOnly: 'nocursor',
        theme: 'thinkcode-console'
      };

      function initCmEditor() {
        vm.codeMirror = CodeMirror(firepadElement, cmEditorOptions);
      }

      function initCmConsole() {
        vm.cmConsole = CodeMirror(cmConsoleElement, cmConsoleOptions);
      }

      function removeTabsByUid(uid) {
        for (var i = vm.tabs.length - 1; i >= 0; i--) {
          if (vm.tabs[i].uid === uid) {
            vm.tabs.splice(i, 1);
            break;
          }
        }
      }

      saveFile = function(callback) {
        $scope.waiting = true;
        if (vm.currentBranch.uid !== -1) {
          var content = vm.codeMirror.getValue();
          WorkspaceService.saveFile(vm.workspaceId, vm.$state.params.course_id, vm.currentBranch.data.relative_path, encodeURIComponent(content), function(res) {
            vm.codeMirror.markClean();
            if (callback) {
              callback();
            } else {
              $scope.waiting = false;
              $scope.showMessage('success', 'Lưu thành công!');
            }
          }, function(res) {
            $scope.waiting = false;
            if (res.data && res.data.message) {
              $scope.showMessage('danger', res.data.message);
            } else if (res.status === -1) {
              $scope.showMessage('danger', 'Lưu thất bại. Hãy chắc chắn nội dung file không quá dài.');
            } else {
              $scope.showMessage('danger');
            }
          });
        }
      };

      CodeMirror.commands.saveFile = function(cm) {
        saveFile();
      };
      CodeMirror.commands.autocomplete = function(cm) {
        var doc = cm.getDoc();
        var POS = doc.getCursor();
        var mode = CodeMirror.innerMode(cm.getMode(), cm.getTokenAt(POS).state).mode.name;

        if (mode == 'xml') { //html depends on xml
          CodeMirror.showHint(cm, CodeMirror.hint.html);
        } else if (mode == 'javascript') {
          CodeMirror.showHint(cm, CodeMirror.hint.javascript);
        } else if (mode == 'css') {
          CodeMirror.showHint(cm, CodeMirror.hint.css);
        } else if (mode == 'python') {
          CodeMirror.showHint(cm, CodeMirror.hint.python);
        } else if (mode == 'ruby') {
          CodeMirror.showHint(cm, CodeMirror.hint.ruby);
        }
      };
      initCmConsole();
      vm.currentBranch = defaultBranch;
      vm.tabs.push(defaultBranch);
      initCmEditor();
      vm.codeMirror.setValue(defaultText);
      vm.codeMirror.markClean();

      vm.init = function(file) {
        $scope.waiting = true;
        var fileContent = defaultText;

        //// Create CodeMirror (with line numbers and the default python mode).
        if (firepadElement.innerHTML.length) {
          firepadElement.innerHTML = '';
        }
        if (cmConsoleElement.innerHTML.length) {
          cmConsoleElement.innerHTML = '';
        }
        initCmEditor(); // initiate Code Mirror with current mode aka engine
        initCmConsole();

        //// Get Firebase Database reference.
        vm.fileRef = getExampleRef(file.data.id);
        vm.fileRef.once('value', function(snapshot) {
          $timeout(function() {
            if (!snapshot.child('users').exists()) {
              if (file.label !== 'untitled') {
                WorkspaceService.loadFile(vm.workspaceId, vm.$state.params.course_id, file.data.relative_path, function(res) {
                  fileContent = res.data.content;
                  //// Create Firepad (with our desired userId).
                  vm.firepad = Firepad.fromCodeMirror(vm.fileRef, vm.codeMirror, {
                    userId: $scope.user.id.toString() // toString() is IMPORTANT!
                  });
                  vm.firepad.on('ready', function() {
                    vm.firepad.setText(fileContent); //// this makes the editor not clean anymore
                  });
                  $scope.waiting = false;
                }, function(res) {
                  if (res.status === 503) {
                    $scope.showMessage('danger', res.data.message);
                  } else {
                    $scope.showMessage('danger');
                  }
                });
              } else {
                vm.codeMirror.setValue(defaultText);
                $scope.waiting = false;
              }
            } else {
              vm.firepad = Firepad.fromCodeMirror(vm.fileRef, vm.codeMirror, {
                userId: $scope.user.id.toString() // toString() is IMPORTANT!
              });
              $scope.waiting = false;
            }
            vm.codeError = false;
          });
        });
        vm.codeMirror.setOption('mode', vm.mode); // codemirror'mode is not two way binding with vm.mode therefore we have to update it
        vm.codeMirror.markClean(); //// mark the editor as clean
      };

      vm.update = function() {
        vm.codeMirror.setOption('mode', vm.mode);
      };
      // Helper to get hash from end of URL or generate a random one.
      function getExampleRef(fileId) {
        return firebase.database().ref('files/' + fileId);
      }

      // Helper to get file's extension
      function getFileExtension(filename) {
        var regex = /[^\\]*\.(\w+)$/;
        var matchGroups = filename.match(regex);
        return matchGroups ? matchGroups[1] : null;
      }

      // Helper to traverse the tree and add extra data to files
      analyzeTree = function(tree, parent) {
        var relative_path = '';
        var fileExt, fileMode;
        if (parent) {
          relative_path += parent + '/';
        }
        for (var i = tree.length - 1; i >= 0; i--) {
          if (tree[i].children) {
            analyzeTree(tree[i].children, relative_path + tree[i].label);
          } else {
            if (!tree[i].noLeaf) {
              fileMode = 'text/plain';
              fileExt = getFileExtension(tree[i].label);
              if (fileExt) {
                if (fileExt === 'py') {
                  fileMode = 'python';
                } else if (fileExt === 'js') {
                  fileMode = 'javascript';
                } else if (fileExt === 'css') {
                  fileMode = 'css';
                } else if (fileExt === 'html') {
                  fileMode = 'xml';
                } else if (fileExt === 'rb') {
                  fileMode = 'ruby';
                }
              }
              tree[i].data = {
                id: vm.workspaceId + '_' + tree[i].label.replace(/\./g, '_'),
                mode: fileMode, // will handle multiple file types later
                relative_path: relative_path + tree[i].label
              };
              tree[i].onSelect = openFile;
            }
          }
        }
        return tree;
      };

      // Navigation treeview
      openFile = function(branch) {
        var isExisted = $filter('findBranchByUid')(vm.tabs, branch.uid);
        if (isExisted.length === 0) {
          removeTabsByUid(-1);
          vm.tabs.push(branch);
        }
        $timeout(function() {
          vm.mode = branch.data.mode || defaultMode;
          vm.init(branch);
          vm.currentBranch = branch;
        });
      };

      vm.my_tree = tree = {};

      vm.openTab = function(tab) { // tab = branch aka leaf = file
        if (tab.uid !== vm.currentBranch.uid) {
          vm.mode = tab.data.mode || defaultMode;
          // vm.currentBranch = tab;
          tree.select_branch(tab);
          // vm.init(tab);
        }
      };

      vm.closeFile = function(branch) {
        var fileRef = getExampleRef(branch.data.id);
        fileRef.child('/users/' + $scope.user.id).remove();
        removeTabsByUid(branch.uid);
        if (!vm.tabs.length) {
          vm.tabs.push(defaultBranch);
          openFile(defaultBranch);
          tree.select_branch(defaultBranch);
        } else {
          tree.select_branch(vm.tabs[vm.tabs.length - 1]);
        }
        // fileRef.remove()
        //   .then(function() {
        //   })
        //   .catch(function(error) {
        //     console.log("Remove failed: " + error.message)
        //   });
      };


      vm.saveFile = saveFile;

      vm.openUpload = function() {
        var modalInstance = $uibModal.open({
          templateUrl: 'modals/upload-template.html',
          backdrop: 'static',
          keyboard: false,
          controller: function($uibModalInstance, workspaceId) {
            var vm = this;
            vm.upload = function() {
              vm.uploading = '1%';
              WorkspaceService.uploadTemplate(workspaceId, vm.file, function(res) {
                if (res.status < 300) {
                  $timeout(function() {
                    $uibModalInstance.close('done');
                  }, 500);
                }
              }, function(res) {
                $uibModalInstance.dismiss(res);
              }, function(percentage) {
                $timeout(function() {
                  vm.uploading = percentage + '%';
                }, 100);
              });
            };
            vm.cancel = function() {
              $uibModalInstance.close('cancel');
            };
          },
          controllerAs: 'vm',
          resolve: {
            workspaceId: function() {
              return vm.workspaceId;
            }
          }
        });
        modalInstance.result.then(function(result) {
          if (result === 'done') {
            $scope.showMessage('success', 'Upload successfully!');
            vm.getWorkspace(vm.workspaceId);
          }
        }, function(res) {
          if (res.data.length > 1) {
            for (var i = res.data.length - 1; i >= 0; i--) {
              $scope.showMessage('danger', res.data[i].error);
            }
          } else {
            $scope.showMessage('danger', res.data.message);
          }
        });
      };

      vm.runFile = function() {
        vm.saveFile(function() {
          WorkspaceService.execute(vm.workspaceId, vm.$state.params.course_id, vm.currentBranch.data.relative_path, function(res) {
            vm.cmConsole.setValue(res.data.result);
            vm.codeError = false;
            $scope.waiting = false;
          }, function(res) {
            $scope.waiting = false;
            if (res.status === 503) {
              $scope.showMessage('danger', res.data.message);
            } else if (res.status === 501) {
              $scope.showMessage('danger', 'Unrecognized language.');
            } else if (res.data.result) {
              vm.codeError = true;
              vm.cmConsole.setValue(res.data.result);
            } else {
              $scope.showMessage('danger');
            }
          });
        });
      };
      deferred.resolve('initiated');
      return deferred.promise;
    }
    initCodeWorkspace();
    //// retrieve workspace structure
    vm.getWorkspace = function(workspaceId, isNew) {
      WorkspaceService.getWorkspaceById(workspaceId, vm.$state.params.course_id, function(res) {
        $timeout(function() {
          vm.lesson = res.data;
          vm.workspaceId = workspaceId;
          if (vm.lesson.type === 'video') {
            var videoId = $filter('getYoutubeVideoId')(vm.lesson.video_url);
            if (videoId) {
              vm.lesson.video_url = 'https://www.youtube.com/embed/' + videoId + '?rel=0';
            }
          }
          if (vm.lesson.type === 'code' || vm.lesson.type === 'project') {
            vm.my_data = analyzeTree(res.data.tree);
          } else {
            vm.my_data = [];
          }
          $scope.loading[0] = false;
          vm.lessonRegistrationNeeded = isNew;
        });
      }, function(res) {
        if (res.status === 401) {
          vm.$state.go('main.courses', {}, { reload: true });
          $scope.showMessage('danger', 'Xin lỗi, khóa học đang được chỉnh sửa.');
        } else if (res.status === 404) {
          var index = $scope.conversations.$indexFor(workspaceId);
          $scope.conversations.$remove(index).then(function(ref) {
            vm.$state.go('main.courses', {}, { reload: true });
            $scope.showMessage('danger', 'Xin lỗi, bài học tương ứng đã bị xóa.');
          });
        } else {
          $scope.showMessage('danger');
        }

      });
    };
    vm.getWorkspace(vm.workspaceId);

    vm.getCourse = function() {
      CoursesService.getCourseById(vm.$state.params.course_id, function(res) {
        vm.course = res.data;
      }, function(res) {
        $scope.showMessage('danger');
      });
    };
    vm.getCourse();

    vm.goToLesson = function(lesson) {
      if ($scope.user.isLearner) {
        CoursesService.startLesson(vm.$state.params.course_id, lesson.id)
          .then(function(res) {
            if (vm.tabs.length > 1 || (vm.tabs.length === 1 && vm.tabs[0].uid !== -1)) {
              for (var i = 0; i < vm.tabs.length; i++) {
                vm.closeFile(vm.tabs[i]);
              }
            }
            vm.getWorkspace(res.data.workspace_id, true);
            vm.$state.transitionTo('main.learn', { course_id: vm.$state.params.course_id, workspace_id: res.data.workspace_id }, { notify: false });
            vm.firstOpen = true;
            $scope.showLessons = false;
            vm.hideInfo = false;
            vm.hideCode = false;
            vm.hideConsole = false;
          }, function(res) {
            $scope.showMessage('danger');
          });
      } else {
        vm.getWorkspace(vm.workspaceId);
        vm.$state.transitionTo('main.learn', { course_id: vm.$state.params.course_id, workspace_id: vm.workspaceId }, { notify: false });
        vm.firstOpen = true;
        $scope.showLessons = false;
        if (vm.tabs.length > 1 || (vm.tabs.length === 1 && vm.tabs[0].uid !== -1)) {
          for (var i = 0; i < vm.tabs.length; i++) {
            vm.closeFile(vm.tabs[i]);
          }
        }
      }
    };

    vm.finishLesson = function() {
      CoursesService.finishLesson(vm.$state.params.course_id, vm.workspaceId)
        .then(function(res) {
          if (res.data.next_lesson_id) {
            $scope.showMessage('success', 'Chúc mừng! Bạn đã hoàn thành bài học: ' + vm.lesson.title);
            var nextLesson = { id : res.data.next_lesson_id };
            vm.goToLesson(nextLesson);
          } else if (res.data.congrats) {
            $uibModal.open({
              templateUrl: 'modals/complete-course-congrats.html',
              backdrop: true,
              keyboard: true,
              controller: function($uibModalInstance, data) {
                var vm = this;
                vm.badge = data.afterCompleted.badge;
                vm.recommendations = data.afterCompleted.recommendations || null;
                vm.courseTitle = data.title;
                vm.ok = function() {
                  $uibModalInstance.close('ok');
                };
                vm.cancel = function() {
                  $uibModalInstance.dismiss('cancel');
                };
              },
              controllerAs: 'vm',
              resolve: {
                data: {
                  title: vm.course.title,
                  afterCompleted: res.data
                }
              }
            }).result.then(function(result) {
              if (result === 'ok') {
                $scope.goTo('main.courses');
              }
            }, function(result) {
              vm.getWorkspace(vm.workspaceId);
            });
          }
        }, function(res) {
          $scope.showMessage('danger');
        });
    };

    vm.resetLesson = function() {
      $uibModal.open({
        templateUrl: 'modals/confirm.html',
        backdrop: 'static',
        keyboard: false,
        controller: function($uibModalInstance, data) {
          var vm = this;
          vm.modalType = 'danger';
          vm.title = 'Học lại';
          vm.content = 'Mọi tiến trình học liên quan đến bài học này sẽ bị ảnh hưởng. Bạn chắc chắn muốn học lại <strong>' + data.title + '</strong>?';
          vm.ok = function() {
            $uibModalInstance.close('ok');
          };
          vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
          };
        },
        controllerAs: 'vm',
        resolve: {
          data: {
            title: vm.lesson.title
          }
        }
      }).result.then(function(result) {
        if (result === 'ok') {
          CoursesService.resetLesson(vm.$state.params.course_id, vm.workspaceId)
            .then(function(res) {
              vm.getWorkspace(vm.workspaceId);
            }, function(res) {
              $scope.showMessage('danger');
            });
        }
      });
    };
    vm.expandSection = function(section) {
      switch (section) {
        case 'info':
          vm.hideInfo = false;
          break;
        case 'code':
          if (vm.hideCode) {
            vm.hideCode = false;
          } else {
            if (!vm.hideInfo && vm.hideConsole) {
              vm.hideInfo = true;
            } else if (!vm.hideConsole && vm.hideInfo) {
              vm.hideConsole = true;
            } else {
              vm.hideConsole = !vm.hideConsole;
              vm.hideInfo = !vm.hideInfo;
            }
          }
          break;
        case 'console':
          if (vm.hideConsole) {
            vm.hideConsole = false;
          } else {
            if (!vm.hideInfo && vm.hideCode) {
              vm.hideInfo = true;
            } else if (!vm.hideCode && vm.hideInfo) {
              vm.hideCode = true;
            } else {
              vm.hideInfo = !vm.hideInfo;
              vm.hideCode = !vm.hideCode;
            }
          }
          break;
      }
    };
    $scope.$watchGroup(['conversations', 'vm.lessonRegistrationNeeded'], function() {
      if (vm.lessonRegistrationNeeded && $scope.conversations && !$scope.conversations.$getRecord(vm.workspaceId)) {
        var data = {
          workspace_id: vm.workspaceId,
          student_id: $scope.user.id,
          student_name: $scope.user.username, // only learner can call this function in this controller -> safe to get user's username
          teacher_id: vm.lesson.teacher.id,
          teacher_name: vm.lesson.teacher.username,
          course_id: vm.$state.params.course_id,
          lesson_title: vm.lesson.title,
          updated: (new Date()).toString()
        };
        CoursesService.registerConversation(data);
        vm.lessonRegistrationNeeded = false;
      }
    });
  }
}());
