(function() {
  "use strict";

  angular.module('app')
    .controller('DemoController', ['$scope', '$state', '$timeout', '$filter', 'Utils', 'DemoService',
      function($scope, $state, $timeout, $filter, Utils, DemoService) {

        $scope.app.settings.htmlClass = 'transition-navbar-scroll top-navbar-xlarge bottom-footer';
        $scope.app.settings.bodyClass = '';

        var vm = this;
        vm.$state = $state;
        vm.tabs = []; //// array to store files aka. branchs to display as tabs
        vm.my_data = [];
        vm.firebaseApp = Utils.firebaseApp;
        vm.firepadRefs = Utils.firepadRefs;
        vm.userId = Math.floor(Math.random() * 999999999).toString();
        vm.fileRef = {};

        var defaultMode, defaultBranch, firepadElement, cmConsoleElement, defaultText, cmEditorOptions, cmConsoleOptions;
        defaultText = '# Happy coding!';
        defaultMode = 'python';
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
          tabSize: vm.mode === 'python' ? 4 : 2,
          extraKeys: {
            "Ctrl-Space": "autocomplete",
          },
          mode: vm.mode ? vm.mode : defaultMode,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          styleActiveLine: false,
          theme: 'Pacific'
        };
        cmConsoleOptions = {
          lineNumbers: false,
          lineWrapping: false,
          mode: vm.mode ? vm.mode : defaultMode,
          readOnly: 'nocursor',
          theme: 'material'
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

        initCmConsole();
        vm.currentBranch = defaultBranch;
        vm.tabs.push(defaultBranch);
        initCmEditor();
        vm.codeMirror.setValue(defaultText);
        vm.codeMirror.markClean();
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

        vm.init = function(file) {
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
            if (!snapshot.child('users').exists()) {
              if (file.label !== 'untitled') {
                DemoService.loadFile(22, file.data.relative_path, function(res) {
                  fileContent = res.data.content;
                  //// Create Firepad (with our desired userId).
                  vm.firepad = Firepad.fromCodeMirror(vm.fileRef, vm.codeMirror, {
                    userId: vm.userId
                  });
                  vm.firepad.on('ready', function() {
                    vm.firepad.setText(fileContent); //// this makes the editor not clean anymore
                  });
                });
              }
            } else {
              vm.firepad = Firepad.fromCodeMirror(vm.fileRef, vm.codeMirror, {
                userId: vm.userId
              });
            }
          });
          vm.codeMirror.markClean(); //// mark the editor as clean

          //// Create FirepadUserList (with our desired userId).
          // var firepadUserList = FirepadUserList.fromDiv(fileRef.child('users'),
          //   document.getElementById('userlist'), vm.userId);

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
        // Helper to traverse the tree and add extra data to files
        function analyzeTree(tree, parent) {
          var relative_path = '';
          var workspaceId = 22; // later API has to return this id
          if (parent) {
            relative_path += parent + '/';
          }
          for (var i = tree.length - 1; i >= 0; i--) {
            if (tree[i].children) {
              analyzeTree(tree[i].children, relative_path + tree[i].label);
            } else {
              tree[i].data = {
                id: workspaceId + '_' + tree[i].label.replace(/\./, '_'),
                mode: 'python', // will handle multiple file types later
                relative_path: relative_path + tree[i].label
              };
              tree[i].onSelect = openFile;
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
        }

        vm.my_tree = tree = {};

        vm.openTab = function(tab) { // tab = branch aka leaf = file
          if (tab.uid !== vm.currentBranch.uid) {
            vm.mode = tab.data.mode || defaultMode;
            // vm.currentBranch = tab;
            tree.select_branch(tab);
            // vm.init(tab);
          }
        };

        vm.closeFile = function() {
          vm.fileRef.child('/users/' + vm.userId).remove();
          removeTabsByUid(vm.currentBranch.uid);
          if (!vm.tabs.length) {
            vm.tabs.push(defaultBranch);
            openFile(vm.tabs[vm.tabs.length - 1]);
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
        vm.treeLoaded = false;
        DemoService.getWorkspaceById(22, function(res) { // using id 22 for demo purpose
          $timeout(function() {
            vm.my_data = analyzeTree(res.data);
            vm.treeLoaded = true;
          });
        });

        vm.runFile = function() {
          vm.saveFile(function() {
            DemoService.execute(22, vm.currentBranch.data.relative_path, vm.mode, function(res) {
              vm.cmConsole.setValue(res.data.result);
            });
          });
        };

        vm.saveFile = function(callback) {
          var content = vm.codeMirror.getValue();
          DemoService.saveFile(22, vm.currentBranch.data.relative_path, encodeURIComponent(content), function(res) {
            vm.codeMirror.markClean();
            if (callback) {
              callback();
            } else {
              $('#saveFileSuccess').modal({
                backdrop: 'static',
                show: true
              });
            }
          });
        };

      }
    ]);

})();
