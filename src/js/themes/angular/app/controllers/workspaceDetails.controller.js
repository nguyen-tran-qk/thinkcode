(function() {
  "use strict";

  angular.module('thinkcodeControllers')
    .controller('WorkspaceDetailsController', wsDetailsCtrl);

  function wsDetailsCtrl($scope, $state, $timeout, $filter, $uibModal, $document, Utils, WorkspaceService, Upload, ngToast) {

    $scope.app.settings.htmlClass = 'transition-navbar-scroll top-navbar-xlarge bottom-footer';
    $scope.app.settings.bodyClass = '';
    $scope.loading = true;

    var vm = this;

    $scope.$on('angular-resizable.resizing', function(event, args) {
      if (args.id === 'tree-resize') {
        if (args.width < 200) {
          vm.treeHidden = true;
        } else {
          vm.treeHidden = false;
        }
      }
      if (args.id === 'console-resize') {
        if (args.width < 200) {
          vm.consoleHidden = true;
        } else {
          vm.consoleHidden = false;
        }
      }
    });
    vm.$state = $state;
    vm.workspaceId = vm.$state.params.workspaceId ? vm.$state.params.workspaceId : 3;
    vm.tabs = []; //// array to store files aka. branchs to display as tabs
    vm.my_data = [];
    vm.firebaseApp = Utils.firebaseApp;
    vm.firepadRefs = Utils.firepadRefs;
    vm.fileRef = {};

    var defaultMode, defaultBranch, firepadElement, cmConsoleElement, defaultText, cmEditorOptions, cmConsoleOptions, saveFile;
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
        WorkspaceService.saveFile(vm.workspaceId, vm.currentBranch.data.relative_path, encodeURIComponent(content), function(res) {
          vm.codeMirror.markClean();
          if (callback) {
            callback();
          } else {
            $scope.waiting = false;
            showSuccessMessage('File saved!');
          }
        }, function(res) {
          if (res.data && res.data.message) {
          $scope.showMessage('danger', res.data.message);
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
              WorkspaceService.loadFile(vm.workspaceId, file.data.relative_path, function(res) {
                fileContent = res.data.content;
                //// Create Firepad (with our desired userId).
                vm.firepad = Firepad.fromCodeMirror(vm.fileRef, vm.codeMirror, {
                  userId: $scope.user.id
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
              userId: $scope.user.id
            });
            $scope.waiting = false;
          }
          vm.codeError = false;
        });
      });
      // vm.codeMirror.options.tabSize = 4;
      vm.codeMirror.setOption('mode', vm.mode); // codemirror'mode is not two way binding with vm.mode therefore we have to update it
      vm.codeMirror.markClean(); //// mark the editor as clean

      //// Create FirepadUserList (with our desired userId).
      // var firepadUserList = FirepadUserList.fromDiv(fileRef.child('users'),
      //   document.getElementById('userlist'), $scope.user.id);

      //// Initialize contents.
      // firepad.on('ready', function() {
      //   if (firepad.isHistoryEmpty()) {
      //     firepad.setText('Check out the user list to the left!');
      //   }
      // });

    };

    vm.update = function() {
      vm.codeMirror.setOption('mode', vm.mode);
    };

    // Helper to get hash from end of URL or generate a random one.
    function getExampleRef(fileId) {
      return firebase.database().ref(fileId);
    }

    // Helper to get file's extension
    function getFileExtension(filename) {
      var regex = /[^\\]*\.(\w+)$/;
      var matchGroups = filename.match(regex);
      return matchGroups ? matchGroups[1] : null;
    }

    // Helper to traverse the tree and add extra data to files
    function analyzeTree(tree, parent) {
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
    }

    // Navigation treeview
    var tree, openFile;
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

    //// retrieve workspace structure
    WorkspaceService.getWorkspaceById(vm.workspaceId, function(res) {
      $timeout(function() {
        vm.my_data = analyzeTree(res.data);
        $scope.loading = false;
      });
    }, function(res) {
      if (res.status === 401) {
        vm.$state.go('main.workspaces', {}, { reload: true });
        $scope.showMessage('danger', res.data.message);
      }
    });

    vm.runFile = function() {
      vm.saveFile(function() {
        WorkspaceService.execute(vm.workspaceId, vm.currentBranch.data.relative_path, function(res) {
          vm.cmConsole.setValue(res.data.result);
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
          $scope.$state.reload();
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

  }
})();
