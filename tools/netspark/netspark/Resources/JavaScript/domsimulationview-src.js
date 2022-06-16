/** @const */
/** @define {boolean} */
// To print debug messages while traversing the DOM. Disabled in NS Release.
var CONSOLE_DEBUG = false;

/** @const */
/** @define {boolean} */
// To record performance tracing information. Disabled in NS Release.
var CONSOLE_TRACE = false;

/** @const */
/** @define {boolean} */
// To delay the start of simulation. Disabled in NS Release.
var DEBUG_DELAY_START = false;

/** @const */
/** @define {boolean} */
// This must be true in DOM XSS Scanner, false in DOM Parser.
var DISABLE_COLLECTION = false;

/** @const */
/** @define {boolean} */
// To use HTML5 fileSystem in browser. Disabled in NS.
var USE_JS_FILE_SYSTEM = false;

/** @const */
/** @define {boolean} */
// To collect verbose debug info including all DFS trigger. Disabled in NS Release.
var COLLECT_VERBOSE_DEBUGINFO = false;

var everything = function () {
    /** @struct */
    var ConsoleComments = {
        callOneAndSchedule_dfsBefore_nextEvent: CONSOLE_DEBUG || CONSOLE_TRACE
            ? 'callOneAndSchedule_dfsBefore_nextEvent'
            : '',
        callOneAndSchedule_nextEvent: CONSOLE_DEBUG || CONSOLE_TRACE ? 'callOneAndSchedule_nextEvent' : '',
        callOneAndSchedule_firstEvent: CONSOLE_DEBUG || CONSOLE_TRACE ? 'callOneAndSchedule_firstEvent' : '',
        DFS_and_next: CONSOLE_DEBUG || CONSOLE_TRACE ? 'DFS_and_next' : '',
        index_past_elements: CONSOLE_DEBUG || CONSOLE_TRACE ? 'index_past_elements' : '',
        resimulate_required: CONSOLE_DEBUG || CONSOLE_TRACE ? 'resimulate_required' : '',
        residual_dfs: CONSOLE_DEBUG || CONSOLE_TRACE ? 'residual_dfs' : '',
        timed_out_1: CONSOLE_DEBUG || CONSOLE_TRACE ? 'timed_out_1' : '',
        traverseNext_exitRequested: CONSOLE_DEBUG || CONSOLE_TRACE ? 'traverseNext_exitRequested' : '',
        traverseNext: CONSOLE_DEBUG || CONSOLE_TRACE ? 'traverseNext' : '',
        callOneAndSchedule_dfsBefore_nextElement: CONSOLE_DEBUG || CONSOLE_TRACE
            ? 'callOneAndSchedule_dfsBefore_nextElement'
            : '',
        callOneAndSchedule_nextElement: CONSOLE_DEBUG || CONSOLE_TRACE ? 'callOneAndSchedule_nextElement' : '',
        rescanPossible: CONSOLE_DEBUG || CONSOLE_TRACE ? 'rescanPossible' : '',
        processResidual: CONSOLE_DEBUG || CONSOLE_TRACE ? 'processResidual' : '',
        rescanLimitExceeded: CONSOLE_DEBUG || CONSOLE_TRACE ? 'rescanLimitExceeded' : '',
        completionReason_ExitRequested: CONSOLE_DEBUG || CONSOLE_TRACE ? 'exitRequested' : '',
        completionReason_TimeoutDetected: CONSOLE_DEBUG || CONSOLE_TRACE ? 'timeoutDetected' : '',
        completionReason_ElementsExhausted: CONSOLE_DEBUG || CONSOLE_TRACE ? 'elementsExhausted' : '',
        completionReason_ThresholdReached: CONSOLE_DEBUG || CONSOLE_TRACE ? 'thresholdReached' : '',
        exitRequestReason_ResidualElementsExhausted: CONSOLE_DEBUG || CONSOLE_TRACE
            ? 'residualElementsExhausted'
            : '',
        exitRequestReason_RescanPossible: CONSOLE_DEBUG || CONSOLE_TRACE ? 'rescanPossible-noexit' : '',
        exitRequestReason_TimeoutDetected: CONSOLE_DEBUG || CONSOLE_TRACE ? 'timeoutDetected' : '',
        exitRequestReason_TraverseNext: CONSOLE_DEBUG || CONSOLE_TRACE ? 'traverseNext' : '',
        exitRequestReason_TimeoutDetectedCallOne: CONSOLE_DEBUG || CONSOLE_TRACE ? 'timeoutDetectedCallOne' : '',
        exitRequestReason_RescanLimitExceeded: CONSOLE_DEBUG || CONSOLE_TRACE ? 'rescanLimitExceeded' : '',
        additionalHashesPresent: CONSOLE_DEBUG || CONSOLE_TRACE ? 'additionalHashesPresent' : '',
        nonSimulatedElementsPresent: CONSOLE_DEBUG || CONSOLE_TRACE ? 'nonSimulatedElementsPresent' : '',
        forcedHashChange: CONSOLE_DEBUG || CONSOLE_TRACE ? 'forcedHashChange' : '',
        scriptTagAdded: CONSOLE_DEBUG || CONSOLE_TRACE ? 'scriptTagAdded' : '',
        navigateHashChange: CONSOLE_DEBUG || CONSOLE_TRACE ? 'navigateHashChange' : '',
        rescanPossibleHash: CONSOLE_DEBUG || CONSOLE_TRACE ? 'rescanPossibleHash' : '',
        postResidual: CONSOLE_DEBUG || CONSOLE_TRACE ? 'postResidual' : '',
        exit_request_catched_simulateElement: CONSOLE_DEBUG || CONSOLE_TRACE
            ? 'exit_request_catched_simulateElement'
            : '',
        rescanAfterScroll: CONSOLE_DEBUG || CONSOLE_TRACE ? 'rescanAfterScroll' : '',
    };

    if (typeof (eoapi) == 'undefined') {
        if (typeof (eoWebBrowser) != 'undefined') {
            eoapi = eoWebBrowser;
        } else {
            // Define fake auxiliary objects instead of EO ones to be able to work in Chrome developer console.
            var getFakeListeners = function () {
                return {
                    click: [
                        {
                            listener: function () { },
                            remove: function () { },
                            type: 'click',
                            useCapture: false
                        }
                    ]
                };
            };

            eoapi = {
                extInvoke: function (name, arg1) {
                    console.log('call ' + name);
                    return 0;
                },
                getEventListeners: getEventListeners
            };

            if (!getEventListeners) {
                eoapi.getEventListeners = getFakeListeners;
            }
        }
    }

    // Define empty nsSimulationCompleted to be able to work in Chrome developer console.
    if (typeof (nsSimulationCompleted) == 'undefined') {
        nsSimulationCompleted = function (duration) {
            console.log('simulation completed: ' + duration);
        };
    }

    // fileSystem object to use, if USE_JS_FILE_SYSTEM is defined.
    var _debugFileSystem;

    if (USE_JS_FILE_SYSTEM) {

        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

        function errorHandler(e) {
            var msg = '';

            switch (e.code) {
                case FileError.QUOTA_EXCEEDED_ERR:
                    msg = 'QUOTA_EXCEEDED_ERR';
                    break;
                case FileError.NOT_FOUND_ERR:
                    msg = 'NOT_FOUND_ERR';
                    break;
                case FileError.SECURITY_ERR:
                    msg = 'SECURITY_ERR';
                    break;
                case FileError.INVALID_MODIFICATION_ERR:
                    msg = 'INVALID_MODIFICATION_ERR';
                    break;
                case FileError.INVALID_STATE_ERR:
                    msg = 'INVALID_STATE_ERR';
                    break;
                default:
                    msg = 'Unknown Error';
                    break;
            };

            console.log('Error: ' + msg);
        }

        function onInitFs(fs) {
            // Save fileSystem reference for later use.
            _debugFileSystem = fs;
        }

        window.webkitStorageInfo.requestQuota(window.PERSISTENT,
            1024 * 1024,
            function (grantedBytes) {
                window.requestFileSystem(window.PERSISTENT, grantedBytes, onInitFs, errorHandler);
            },
            function (e) {
                console.log('webkitStorageInfo Error', e);
            });
    }

    // Disable these methods.
    document.execCommand = window.close = function () { };
    window.print = function () { };

    if (CONSOLE_DEBUG) {
        console.log('global document.location.href: ' + document.location.href);
        console.log('global document.referrer: ' + document.referrer);
    }

    // Load current storage states.
    if (document.location.href) {
        try {
            var storageMayBeAccessible = (location.hostname || '').length > 0;

            if (storageMayBeAccessible) {
                var currentSessionStorage = eoapi.extInvoke('__nsGetSessionStorage');

                if (currentSessionStorage) {
                    for (var i = 0; i < currentSessionStorage.length; i++) {

                        var key = currentSessionStorage[i][0];
                        var value = currentSessionStorage[i][1];

                        if (CONSOLE_DEBUG) {
                            console.log('setting sessionStorage: ' + key);
                        }

                        try {
                            sessionStorage[key] = value;
                        } catch (e) {
                            console.log('sessionStorage error: ');
                            console.error(e);
                        }
                    }
                }

                var currentLocalStorage = eoapi.extInvoke('__nsGetLocalStorage');

                if (currentLocalStorage) {
                    for (var i = 0; i < currentLocalStorage.length; i++) {
                        var key = currentLocalStorage[i][0];
                        var value = currentLocalStorage[i][1];

                        if (CONSOLE_DEBUG) {
                            console.log('setting localStorage: ' + key);
                        }

                        try {
                            localStorage[key] = value;
                        } catch (e) {
                            console.log('localStorage error: ');
                            console.error(e);
                        }
                    }
                }
            }
        } catch (err) {
            console.error(err);
            console.error(err.toString());
            console.error('Storage data write error.');
        }
    }

    // Get JS Library extractors from NS.
    var jsLibraryExtractors = DISABLE_COLLECTION ? undefined : eoapi.extInvoke('__nsGetJsLibraryExtractors');

    // NS confirmation method.
    var nsdom = function (identifier, el) {

        var path = __ns.getXPath(el !== window ? el : __ns.currentElement);
        __ns._state['domXssPaths'].push(path);

        if (CONSOLE_DEBUG) {
            console.log('%c DOM XSS @ ' + path, 'color:white; background-color:red');
        }

        var callstack = 'Triggered:\n' + (new Error()).stack.split("\n").slice(2).join("\n");

        eoapi.extInvoke('nsdom' + identifier, [path, callstack]);
    };

    var __ns = {
        /** @const */
        TRAVERSE_EXITREQUESTED_TIMEOUT: 200,

        /** @const */
        TRAVERSE_RESIDUALS_TIMEOUT: 1000,

        /** @const */
        TRAVERSE_FORCEDHASHCHANGE_TIMEOUT: 2000,

        /** @const */
        TRAVERSE_SCRIPTTAGADDED_TIMEOUT: 1000,

        _tryCatchIgnore: function(callback) {
            try {
                return callback();
            } catch (e) {
                return null;
            }
        },

        // try-catch block method introduced to not deopt try-catch containing methods. See https://github.com/petkaantonov/bluebird/wiki/Optimization-killers for details.
        _tryCatchLogIgnore: function(callback, message) {
            try {
                return callback();
            } catch (e) {
                console.error(e);
                if (message) {
                    console.log(message);
                }

                return null;
            }
        },

        _timeStart: function(label) {
            if (CONSOLE_TRACE) {
                console.time(label);
            }
        },

        _timeEnd: function(label) {
            if (CONSOLE_TRACE) {
                console.timeEnd(label);
            }
        },

        _activeSetTimeouts: {},
        _activeSetTimeoutsTotal: 0,
        _setTimeoutCounter: 0,

        _origCookieSetter: null,
        _capturedCookies: new Set(),

        _hookCookieSetter: function () {

            if (__ns._origCookieSetter != null) {
                return;
            }

            var maxCapturedCookies = 200;

            __ns._origCookieSetter = Document.prototype.__lookupSetter__('cookie');

            Document.prototype.__defineSetter__('cookie',
                function (arg) {
                    if (typeof arg === 'string' && __ns._capturedCookies.size < maxCapturedCookies) {
                        __ns._capturedCookies.add(arg);
                        eoapi.extInvoke("__nsJsCookie", [document.location.href, arg]);
                    }

                    var args = Array.prototype.slice.call(arguments);

                    __ns._origCookieSetter.apply(document, args);
                });
        },

        _setTimeoutZeroTimeouts: [],

        /** @const */
        _setTimeoutZeroMessageName: 'stz--42',

        _setTimeoutZeroHandleMessage: function (event) {
            if (event.source == window && event.data === __ns._setTimeoutZeroMessageName) {
                event.stopPropagation();

                if (__ns._setTimeoutZeroTimeouts.length > 0) {
                    var cb = __ns._setTimeoutZeroTimeouts.shift();

                    try {
                        if (typeof cb === 'function') {
                            cb();
                        } else {
                            eval(cb);
                        }
                    } catch (e) {
                        if (CONSOLE_DEBUG) {
                            console.log("Ignoring setTimeoutZero exception: ");
                            console.log(e);
                        }
                    }
                }
            }
        },

        _setupSetTimeoutZero: function () {
            window.addEventListener("message", __ns._setTimeoutZeroHandleMessage, true);
        },

        _setTimeoutZero: function (callback) {
            __ns._setTimeoutZeroTimeouts.push(callback);

            window.postMessage(__ns._setTimeoutZeroMessageName, "*");
        },

        _hookSetTimeout: function () {
            if (typeof window.__ns_setTimeoutNative !== "function") {
                window.__ns_setTimeoutNative = window.setTimeout;
            }

            __ns._setTimeout = function (callback, delay) {
                if (delay === 0 &&
                    arguments.length === 2 &&
                    __ns._options.favorPostMessageOverSetTimeout === true) {

                    __ns._state['totalSetTimeoutZero']++;

                    // Multiple arguments support not implemented, may be added if deemed necessary.
                    return __ns._setTimeoutZero(callback);
                } else {
                    __ns._state['totalSetTimeout']++;

                    var args = Array.prototype.slice.call(arguments);

                    return window.__ns_setTimeoutNative.apply(window, args);
                }
            };

            __ns._activeSetTimeouts = {};
            __ns._activeSetTimeoutsTotal = 0;
            __ns._setTimeoutCounter = 0;
            __ns._logCurrentSetTimeouts = function () {
                if (CONSOLE_DEBUG) {
                    for (var i in __ns._activeSetTimeouts) {
                        var activeTimeout = __ns._activeSetTimeouts[i];
                        console.log('handle: ' +
                            activeTimeout.handle +
                            'status: ' +
                            activeTimeout.status +
                            ' delay: ' +
                            activeTimeout.delay +
                            ' calltime: ' +
                            activeTimeout.calltime);
                    }
                }
            };

            window.setTimeout = function (cb, delay) {
                var effectiveDelay = delay;

                if (__ns._options.forceTimeouts === true) {
                    effectiveDelay = 0;
                }

                var id = __ns._setTimeoutCounter++;
                var handle = __ns._setTimeout(function () {
                    __ns._activeSetTimeouts[id].status = 1;

                    try {
                        if (typeof cb === 'function') {
                            cb.apply(window, arguments[0].slice(2));
                        } else {
                            eval(cb);
                        }
                    } catch (e) {
                        if (CONSOLE_DEBUG) {
                            console.log("Ignoring setTimeout exception: ");
                            console.log(e);
                        }
                    }

                    delete __ns._activeSetTimeouts[id];
                    __ns._activeSetTimeoutsTotal--;

                },
                    effectiveDelay, Array.prototype.slice.call(arguments));

                __ns._activeSetTimeouts[id] = {
                    handle: handle,
                    calltime: new Date(),
                    delay: delay,
                    cb: cb,
                    status: 0,
                    effectiveDelay: effectiveDelay
                };

                __ns._activeSetTimeoutsTotal++;

                return handle;
            };
        },

        _activeSetIntervals: {},
        _activeSetIntervalsTotal: 0,
        _setIntervalCounter: 0,

        _phonySetIntervalIdMap: new Map(),

        _hookSetInterval: function () {
            if (typeof window.__ns_setIntervalNative !== "function") {
                window.__ns_setIntervalNative = window.setInterval;
                window.__ns_clearIntervalNative = window.clearInterval;
            }

            __ns._setInterval = function (callback, delay) {
                var args = Array.prototype.slice.call(arguments);

                return window.__ns_setIntervalNative.apply(window, args);
            },
                __ns._clearIntervalNative = function (nativeIntervalId) {
                    return window.__ns_clearIntervalNative.apply(window, [nativeIntervalId]);
                }

            __ns._clearInterval = function (intervalId) {

                if (intervalId === null || typeof intervalId === 'undefined') {
                    // ExtJS may call clearInterval with null or undefined and it is not an error.
                    return undefined;
                }

                if (typeof intervalId !== 'number') {
                    if (CONSOLE_DEBUG) {
                        console.log('intervalId must be a number: ' + intervalId + '\n' + new Error().stack);
                    }

                    return undefined;
                }

                var nativeIntervalId = __ns._phonySetIntervalIdMap.get(intervalId);

                if (typeof nativeIntervalId !== 'number') {
                    return undefined;
                }

                __ns._phonySetIntervalIdMap.delete(intervalId);

                return __ns._clearIntervalNative(nativeIntervalId);
            };

            __ns._activeSetIntervals = {};
            __ns._activeSetIntervalsTotal = 0;
            __ns._setIntervalCounter = 0;
            __ns._logCurrentSetIntervals = function () {
                if (CONSOLE_DEBUG) {
                    for (var i in __ns._activeSetIntervals) {
                        var activeInterval = __ns._activeSetIntervals[i];
                        console.log('setIntervalId: ' +
                            activeInterval.setIntervalId +
                            'status: ' +
                            activeInterval.status +
                            ' delay: ' +
                            activeInterval.delay +
                            ' calltime: ' +
                            activeInterval.calltime);
                    }
                }
            };

            window.setInterval = function (cb, delay) {
                __ns._state['totalSetInterval']++;

                // setTimeout for the first invocation, setup original setInterval in setTimeout.
                var id = __ns._setIntervalCounter++;

                __ns._activeSetIntervals[id] = {};

                __ns._activeSetIntervals[id].status = 1;

                if (__ns._options.forceTimeouts) {
                    // If timeouts are forced, run setInterval callback once.
                    try {
                        if (typeof cb === 'function') {
                            cb();
                        } else {
                            eval(cb);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }

                var nativeIntervalId = __ns._setInterval(function () {

                    if (typeof cb === 'function') {
                        cb();
                    } else {
                        eval(cb);
                    }

                },
                    delay /* do not coerce setInterval delays. */);

                __ns._activeSetIntervals[id].setIntervalId = nativeIntervalId;
                __ns._phonySetIntervalIdMap.set(id, nativeIntervalId);

                __ns._activeSetIntervals[id].calltime = new Date();
                __ns._activeSetIntervals[id].delay = delay;
                __ns._activeSetIntervals[id].cb = cb;
                __ns._activeSetIntervals[id].status = 0;
                __ns._activeSetIntervals[id].effectiveDelay = delay;

                __ns._activeSetIntervalsTotal++;

                // clearInterval is also hooked to map this id to setIntervalId.
                return id;
            };

            window.clearInterval = function (intervalId) {
                __ns._clearInterval(intervalId);
                __ns._activeSetIntervals[intervalId] = undefined;
            }
        },

        _clearAllSetIntervals: function () {
            for (var key in __ns._activeSetIntervals) {
                if (__ns._activeSetIntervals.hasOwnProperty(key)) {
                    var setIntervalId = __ns._activeSetIntervals[key].setIntervalId;
                    clearInterval(setIntervalId);
                }
            }
        },

        /** MutationObserver wrapper. */
        _mutationSummary: (function () {
            var __extends = this.__extends ||
                function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];

                    function __() { this.constructor = d; }

                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
            var MutationObserverCtor;
            if (typeof WebKitMutationObserver !== 'undefined')
                MutationObserverCtor = WebKitMutationObserver;
            else
                MutationObserverCtor = MutationObserver;
            if (MutationObserverCtor === undefined) {
                console.error('DOM Mutation Observers are required.');
                console.error('https://developer.mozilla.org/en-US/docs/DOM/MutationObserver');
                throw Error('DOM Mutation Observers are required');
            }
            var NodeMap = (function () {
                function NodeMap() {
                    this.nodes = [];
                    this.values = [];
                }

                NodeMap.prototype.isIndex = function (s) {
                    return +s === s >>> 0;
                };
                NodeMap.prototype.nodeId = function (node) {
                    var id = node[NodeMap.ID_PROP];
                    if (!id)
                        id = node[NodeMap.ID_PROP] = NodeMap.nextId_++;
                    return id;
                };
                NodeMap.prototype.set = function (node, value) {
                    var id = this.nodeId(node);
                    this.nodes[id] = node;
                    this.values[id] = value;
                };
                NodeMap.prototype.get = function (node) {
                    var id = this.nodeId(node);
                    return this.values[id];
                };
                NodeMap.prototype.has = function (node) {
                    return this.nodeId(node) in this.nodes;
                };
                NodeMap.prototype.delete = function (node) {
                    var id = this.nodeId(node);
                    delete this.nodes[id];
                    this.values[id] = undefined;
                };
                NodeMap.prototype.keys = function () {
                    var nodes = [];
                    for (var id in this.nodes) {
                        if (!this.isIndex(id))
                            continue;
                        nodes.push(this.nodes[id]);
                    }
                    return nodes;
                };
                NodeMap.ID_PROP = '__mutation_summary_node_map_id__';
                NodeMap.nextId_ = 1;
                return NodeMap;
            })();
			/**
			    *  var reachableMatchableProduct = [
			    *  //  STAYED_OUT,  ENTERED,     STAYED_IN,   EXITED
			    *    [ STAYED_OUT,  STAYED_OUT,  STAYED_OUT,  STAYED_OUT ], // STAYED_OUT
			    *    [ STAYED_OUT,  ENTERED,     ENTERED,     STAYED_OUT ], // ENTERED
			    *    [ STAYED_OUT,  ENTERED,     STAYED_IN,   EXITED     ], // STAYED_IN
			    *    [ STAYED_OUT,  STAYED_OUT,  EXITED,      EXITED     ]  // EXITED
			    *  ];
			    */
            var Movement;
            (function (Movement) {
                Movement[Movement.STAYED_OUT = 0] = 'STAYED_OUT';
                Movement[Movement.ENTERED = 1] = 'ENTERED';
                Movement[Movement.STAYED_IN = 2] = 'STAYED_IN';
                Movement[Movement.REPARENTED = 3] = 'REPARENTED';
                Movement[Movement.REORDERED = 4] = 'REORDERED';
                Movement[Movement.EXITED = 5] = 'EXITED';
            })(Movement || (Movement = {}));

            function enteredOrExited(changeType) {
                return changeType === Movement.ENTERED || changeType === Movement.EXITED;
            }

            var NodeChange = (function () {
                function NodeChange(node,
                    childList,
                    attributes,
                    characterData,
                    oldParentNode,
                    added,
                    attributeOldValues,
                    characterDataOldValue) {
                    if (childList === void 0) {
                        childList = false;
                    }
                    if (attributes === void 0) {
                        attributes = false;
                    }
                    if (characterData === void 0) {
                        characterData = false;
                    }
                    if (oldParentNode === void 0) {
                        oldParentNode = null;
                    }
                    if (added === void 0) {
                        added = false;
                    }
                    if (attributeOldValues === void 0) {
                        attributeOldValues = null;
                    }
                    if (characterDataOldValue === void 0) {
                        characterDataOldValue = null;
                    }
                    this.node = node;
                    this.childList = childList;
                    this.attributes = attributes;
                    this.characterData = characterData;
                    this.oldParentNode = oldParentNode;
                    this.added = added;
                    this.attributeOldValues = attributeOldValues;
                    this.characterDataOldValue = characterDataOldValue;
                    this.isCaseInsensitive =
                        this.node.nodeType === Node.ELEMENT_NODE &&
                        this.node instanceof HTMLElement &&
                        this.node.ownerDocument instanceof HTMLDocument;
                }

                NodeChange.prototype.getAttributeOldValue = function (name) {
                    if (!this.attributeOldValues)
                        return undefined;
                    if (this.isCaseInsensitive)
                        name = name.toLowerCase();
                    return this.attributeOldValues[name];
                };
                NodeChange.prototype.getAttributeNamesMutated = function () {
                    var names = [];
                    if (!this.attributeOldValues)
                        return names;
                    for (var name in this.attributeOldValues) {
                        names.push(name);
                    }
                    return names;
                };
                NodeChange.prototype.attributeMutated = function (name, oldValue) {
                    this.attributes = true;
                    this.attributeOldValues = this.attributeOldValues || {};
                    if (name in this.attributeOldValues)
                        return;
                    this.attributeOldValues[name] = oldValue;
                };
                NodeChange.prototype.characterDataMutated = function (oldValue) {
                    if (this.characterData)
                        return;
                    this.characterData = true;
                    this.characterDataOldValue = oldValue;
                };
                // Note: is it possible to receive a removal followed by a removal. This
                // can occur if the removed node is added to an non-observed node, that
                // node is added to the observed area, and then the node removed from
                // it.
                NodeChange.prototype.removedFromParent = function (parent) {
                    this.childList = true;
                    if (this.added || this.oldParentNode)
                        this.added = false;
                    else
                        this.oldParentNode = parent;
                };
                NodeChange.prototype.insertedIntoParent = function () {
                    this.childList = true;
                    this.added = true;
                };
                // An node's oldParent is
                //   -its present parent, if its parentNode was not changed.
                //   -null if the first thing that happened to it was an add.
                //   -the node it was removed from if the first thing that happened to it
                //      was a remove.
                NodeChange.prototype.getOldParent = function () {
                    if (this.childList) {
                        if (this.oldParentNode)
                            return this.oldParentNode;
                        if (this.added)
                            return null;
                    }
                    return this.node.parentNode;
                };
                return NodeChange;
            })();
            var ChildListChange = (function () {
                function ChildListChange() {
                    this.added = new NodeMap();
                    this.removed = new NodeMap();
                    this.maybeMoved = new NodeMap();
                    this.oldPrevious = new NodeMap();
                    this.moved = undefined;
                }

                return ChildListChange;
            })();
            var TreeChanges = (function (_super) {
                __extends(TreeChanges, _super);

                function TreeChanges(rootNode, mutations) {
                    _super.call(this);
                    this.rootNode = rootNode;
                    this.reachableCache = undefined;
                    this.wasReachableCache = undefined;
                    this.anyParentsChanged = false;
                    this.anyAttributesChanged = false;
                    this.anyCharacterDataChanged = false;
                    for (var m = 0; m < mutations.length; m++) {
                        var mutation = mutations[m];
                        switch (mutation.type) {
                            case 'childList':
                                this.anyParentsChanged = true;
                                for (var i = 0; i < mutation.removedNodes.length; i++) {
                                    var node = mutation.removedNodes[i];
                                    this.getChange(node).removedFromParent(mutation.target);
                                }
                                for (var i = 0; i < mutation.addedNodes.length; i++) {
                                    var node = mutation.addedNodes[i];
                                    this.getChange(node).insertedIntoParent();
                                }
                                break;
                            case 'attributes':
                                this.anyAttributesChanged = true;
                                var change = this.getChange(mutation.target);
                                change.attributeMutated(mutation.attributeName, mutation.oldValue);
                                break;
                            case 'characterData':
                                this.anyCharacterDataChanged = true;
                                var change = this.getChange(mutation.target);
                                change.characterDataMutated(mutation.oldValue);
                                break;
                        }
                    }
                }

                TreeChanges.prototype.getChange = function (node) {
                    var change = this.get(node);
                    if (!change) {
                        change = new NodeChange(node);
                        this.set(node, change);
                    }
                    return change;
                };
                TreeChanges.prototype.getOldParent = function (node) {
                    var change = this.get(node);
                    return change ? change.getOldParent() : node.parentNode;
                };
                TreeChanges.prototype.getIsReachable = function (node) {
                    if (node === this.rootNode)
                        return true;
                    if (!node)
                        return false;
                    this.reachableCache = this.reachableCache || new NodeMap();
                    var isReachable = this.reachableCache.get(node);
                    if (isReachable === undefined) {
                        isReachable = this.getIsReachable(node.parentNode);
                        this.reachableCache.set(node, isReachable);
                    }
                    return isReachable;
                };
                // A node wasReachable if its oldParent wasReachable.
                TreeChanges.prototype.getWasReachable = function (node) {
                    if (node === this.rootNode)
                        return true;
                    if (!node)
                        return false;
                    this.wasReachableCache = this.wasReachableCache || new NodeMap();
                    var wasReachable = this.wasReachableCache.get(node);
                    if (wasReachable === undefined) {
                        wasReachable = this.getWasReachable(this.getOldParent(node));
                        this.wasReachableCache.set(node, wasReachable);
                    }
                    return wasReachable;
                };
                TreeChanges.prototype.reachabilityChange = function (node) {
                    if (this.getIsReachable(node)) {
                        return this.getWasReachable(node) ? Movement.STAYED_IN : Movement.ENTERED;
                    }
                    return this.getWasReachable(node) ? Movement.EXITED : Movement.STAYED_OUT;
                };
                return TreeChanges;
            })(NodeMap);
            var MutationProjection = (function () {
                // TOOD(any)
                function MutationProjection(rootNode, mutations, selectors, calcReordered, calcOldPreviousSibling) {
                    this.rootNode = rootNode;
                    this.mutations = mutations;
                    this.selectors = selectors;
                    this.calcReordered = calcReordered;
                    this.calcOldPreviousSibling = calcOldPreviousSibling;
                    this.treeChanges = new TreeChanges(rootNode, mutations);
                    this.entered = [];
                    this.exited = [];
                    this.stayedIn = new NodeMap();
                    this.visited = new NodeMap();
                    this.childListChangeMap = undefined;
                    this.characterDataOnly = undefined;
                    this.matchCache = undefined;
                    this.processMutations();
                }

                MutationProjection.prototype.processMutations = function () {
                    if (!this.treeChanges.anyParentsChanged &&
                        !this.treeChanges.anyAttributesChanged)
                        return;
                    var changedNodes = this.treeChanges.keys();
                    for (var i = 0; i < changedNodes.length; i++) {
                        this.visitNode(changedNodes[i], undefined);
                    }
                };
                MutationProjection.prototype.visitNode = function (node, parentReachable) {
                    if (this.visited.has(node))
                        return;
                    this.visited.set(node, true);
                    var change = this.treeChanges.get(node);
                    var reachable = parentReachable;
                    // node inherits its parent's reachability change unless
                    // its parentNode was mutated.
                    if ((change && change.childList) || reachable == undefined)
                        reachable = this.treeChanges.reachabilityChange(node);
                    if (reachable === Movement.STAYED_OUT)
                        return;
                    // Cache match results for sub-patterns.
                    this.matchabilityChange(node);
                    if (reachable === Movement.ENTERED) {
                        this.entered.push(node);
                    } else if (reachable === Movement.EXITED) {
                        this.exited.push(node);
                        this.ensureHasOldPreviousSiblingIfNeeded(node);
                    } else if (reachable === Movement.STAYED_IN) {
                        var movement = Movement.STAYED_IN;
                        if (change && change.childList) {
                            if (change.oldParentNode !== node.parentNode) {
                                movement = Movement.REPARENTED;
                                this.ensureHasOldPreviousSiblingIfNeeded(node);
                            } else if (this.calcReordered && this.wasReordered(node)) {
                                movement = Movement.REORDERED;
                            }
                        }
                        this.stayedIn.set(node, movement);
                    }
                    if (reachable === Movement.STAYED_IN)
                        return;
                    // reachable === ENTERED || reachable === EXITED.
                    for (var child = node.firstChild; child; child = child.nextSibling) {
                        this.visitNode(child, reachable);
                    }
                };
                MutationProjection.prototype.ensureHasOldPreviousSiblingIfNeeded = function (node) {
                    if (!this.calcOldPreviousSibling)
                        return;
                    this.processChildlistChanges();
                    var parentNode = node.parentNode;
                    var nodeChange = this.treeChanges.get(node);
                    if (nodeChange && nodeChange.oldParentNode)
                        parentNode = nodeChange.oldParentNode;
                    var change = this.childListChangeMap.get(parentNode);
                    if (!change) {
                        change = new ChildListChange();
                        this.childListChangeMap.set(parentNode, change);
                    }
                    if (!change.oldPrevious.has(node)) {
                        change.oldPrevious.set(node, node.previousSibling);
                    }
                };
                MutationProjection.prototype.getChanged = function (summary, selectors, characterDataOnly) {
                    this.selectors = selectors;
                    this.characterDataOnly = characterDataOnly;
                    for (var i = 0; i < this.entered.length; i++) {
                        var node = this.entered[i];
                        var matchable = this.matchabilityChange(node);
                        if (matchable === Movement.ENTERED || matchable === Movement.STAYED_IN)
                            summary['added'].push(node);
                    }
                    var stayedInNodes = this.stayedIn.keys();
                    for (var i = 0; i < stayedInNodes.length; i++) {
                        var node = stayedInNodes[i];
                        var matchable = this.matchabilityChange(node);
                        if (matchable === Movement.ENTERED) {
                            summary['added'].push(node);
                        } else if (matchable === Movement.EXITED) {
                            summary['removed'].push(node);
                        } else if (matchable === Movement.STAYED_IN &&
                            (summary['reparented'] || summary['reordered'])) {
                            var movement = this.stayedIn.get(node);
                            if (summary['reparented'] && movement === Movement.REPARENTED)
                                summary['reparented'].push(node);
                            else if (summary['reordered'] && movement === Movement.REORDERED)
                                summary['reordered'].push(node);
                        }
                    }
                    for (var i = 0; i < this.exited.length; i++) {
                        var node = this.exited[i];
                        var matchable = this.matchabilityChange(node);
                        if (matchable === Movement.EXITED || matchable === Movement.STAYED_IN)
                            summary['removed'].push(node);
                    }
                };
                MutationProjection.prototype.getOldParentNode = function (node) {
                    var change = this.treeChanges.get(node);
                    if (change && change.childList)
                        return change.oldParentNode ? change.oldParentNode : null;
                    var reachabilityChange = this.treeChanges.reachabilityChange(node);
                    if (reachabilityChange === Movement.STAYED_OUT || reachabilityChange === Movement.ENTERED)
                        throw Error('getOldParentNode requested on invalid node.');
                    return node.parentNode;
                };
                MutationProjection.prototype.getOldPreviousSibling = function (node) {
                    var parentNode = node.parentNode;
                    var nodeChange = this.treeChanges.get(node);
                    if (nodeChange && nodeChange.oldParentNode)
                        parentNode = nodeChange.oldParentNode;
                    var change = this.childListChangeMap.get(parentNode);
                    if (!change)
                        throw Error('getOldPreviousSibling requested on invalid node.');
                    return change.oldPrevious.get(node);
                };
                MutationProjection.prototype.getOldAttribute = function (element, attrName) {
                    var change = this.treeChanges.get(element);
                    if (!change || !change.attributes)
                        throw Error('getOldAttribute requested on invalid node.');
                    var value = change.getAttributeOldValue(attrName);
                    if (value === undefined)
                        throw Error('getOldAttribute requested for unchanged attribute name.');
                    return value;
                };
                MutationProjection.prototype.attributeChangedNodes = function (includeAttributes) {
                    if (!this.treeChanges.anyAttributesChanged)
                        return {}; // No attributes mutations occurred.
                    var attributeFilter;
                    var caseInsensitiveFilter;
                    if (includeAttributes) {
                        attributeFilter = {};
                        caseInsensitiveFilter = {};
                        for (var i = 0; i < includeAttributes.length; i++) {
                            var attrName = includeAttributes[i];
                            attributeFilter[attrName] = true;
                            caseInsensitiveFilter[attrName.toLowerCase()] = attrName;
                        }
                    }
                    var result = {};
                    var nodes = this.treeChanges.keys();
                    for (var i = 0; i < nodes.length; i++) {
                        var node = nodes[i];
                        var change = this.treeChanges.get(node);
                        if (!change.attributes)
                            continue;
                        if (Movement.STAYED_IN !== this.treeChanges.reachabilityChange(node) ||
                            Movement.STAYED_IN !== this.matchabilityChange(node)) {
                            continue;
                        }
                        var element = node;
                        var changedAttrNames = change.getAttributeNamesMutated();
                        for (var j = 0; j < changedAttrNames.length; j++) {
                            var attrName = changedAttrNames[j];
                            if (attributeFilter &&
                                !attributeFilter[attrName] &&
                                !(change.isCaseInsensitive && caseInsensitiveFilter[attrName])) {
                                continue;
                            }
                            var oldValue = change.getAttributeOldValue(attrName);
                            if (oldValue === element.getAttribute(attrName))
                                continue;
                            if (caseInsensitiveFilter && change.isCaseInsensitive)
                                attrName = caseInsensitiveFilter[attrName];
                            result[attrName] = result[attrName] || [];
                            result[attrName].push(element);
                        }
                    }
                    return result;
                };
                MutationProjection.prototype.getOldCharacterData = function (node) {
                    var change = this.treeChanges.get(node);
                    if (!change || !change.characterData)
                        throw Error('getOldCharacterData requested on invalid node.');
                    return change.characterDataOldValue;
                };
                MutationProjection.prototype.getCharacterDataChanged = function () {
                    if (!this.treeChanges.anyCharacterDataChanged)
                        return []; // No characterData mutations occurred.
                    var nodes = this.treeChanges.keys();
                    var result = [];
                    for (var i = 0; i < nodes.length; i++) {
                        var target = nodes[i];
                        if (Movement.STAYED_IN !== this.treeChanges.reachabilityChange(target))
                            continue;
                        var change = this.treeChanges.get(target);
                        if (!change.characterData ||
                            target.textContent == change.characterDataOldValue)
                            continue;
                        result.push(target);
                    }
                    return result;
                };
                MutationProjection.prototype.computeMatchabilityChange = function (selector, el) {
                    if (!this.matchCache)
                        this.matchCache = [];
                    if (!this.matchCache[selector.uid])
                        this.matchCache[selector.uid] = new NodeMap();
                    var cache = this.matchCache[selector.uid];
                    var result = cache.get(el);
                    if (result === undefined) {
                        result = selector.matchabilityChange(el, this.treeChanges.get(el));
                        cache.set(el, result);
                    }
                    return result;
                };
                MutationProjection.prototype.matchabilityChange = function (node) {
                    var _this = this;
                    // TODO(rafaelw): Include PI, CDATA?
                    // Only include text nodes.
                    if (this.characterDataOnly) {
                        switch (node.nodeType) {
                            case Node.COMMENT_NODE:
                            case Node.TEXT_NODE:
                                return Movement.STAYED_IN;
                            default:
                                return Movement.STAYED_OUT;
                        }
                    }
                    // No element filter. Include all nodes.
                    if (!this.selectors)
                        return Movement.STAYED_IN;
                    // Element filter. Exclude non-elements.
                    if (node.nodeType !== Node.ELEMENT_NODE)
                        return Movement.STAYED_OUT;
                    var el = node;
                    var matchChanges = this.selectors.map(function (selector) {
                        return _this.computeMatchabilityChange(selector, el);
                    });
                    var accum = Movement.STAYED_OUT;
                    var i = 0;
                    while (accum !== Movement.STAYED_IN && i < matchChanges.length) {
                        switch (matchChanges[i]) {
                            case Movement.STAYED_IN:
                                accum = Movement.STAYED_IN;
                                break;
                            case Movement.ENTERED:
                                if (accum === Movement.EXITED)
                                    accum = Movement.STAYED_IN;
                                else
                                    accum = Movement.ENTERED;
                                break;
                            case Movement.EXITED:
                                if (accum === Movement.ENTERED)
                                    accum = Movement.STAYED_IN;
                                else
                                    accum = Movement.EXITED;
                                break;
                        }
                        i++;
                    }
                    return accum;
                };
                MutationProjection.prototype.getChildlistChange = function (el) {
                    var change = this.childListChangeMap.get(el);
                    if (!change) {
                        change = new ChildListChange();
                        this.childListChangeMap.set(el, change);
                    }
                    return change;
                };
                MutationProjection.prototype.processChildlistChanges = function () {
                    if (this.childListChangeMap)
                        return;
                    this.childListChangeMap = new NodeMap();
                    for (var i = 0; i < this.mutations.length; i++) {
                        var mutation = this.mutations[i];
                        if (mutation.type != 'childList')
                            continue;
                        if (this.treeChanges.reachabilityChange(mutation.target) !== Movement.STAYED_IN &&
                            !this.calcOldPreviousSibling)
                            continue;
                        var change = this.getChildlistChange(mutation.target);
                        var oldPrevious = mutation.previousSibling;

                        function recordOldPrevious(node, previous) {
                            if (!node ||
                                change.oldPrevious.has(node) ||
                                change.added.has(node) ||
                                change.maybeMoved.has(node))
                                return;
                            if (previous &&
                                (change.added.has(previous) ||
                                    change.maybeMoved.has(previous)))
                                return;
                            change.oldPrevious.set(node, previous);
                        }

                        for (var j = 0; j < mutation.removedNodes.length; j++) {
                            var node = mutation.removedNodes[j];
                            recordOldPrevious(node, oldPrevious);
                            if (change.added.has(node)) {
                                change.added.delete(node);
                            } else {
                                change.removed.set(node, true);
                                change.maybeMoved.delete(node);
                            }
                            oldPrevious = node;
                        }
                        recordOldPrevious(mutation.nextSibling, oldPrevious);
                        for (var j = 0; j < mutation.addedNodes.length; j++) {
                            var node = mutation.addedNodes[j];
                            if (change.removed.has(node)) {
                                change.removed.delete(node);
                                change.maybeMoved.set(node, true);
                            } else {
                                change.added.set(node, true);
                            }
                        }
                    }
                };
                MutationProjection.prototype.wasReordered = function (node) {
                    if (!this.treeChanges.anyParentsChanged)
                        return false;
                    this.processChildlistChanges();
                    var parentNode = node.parentNode;
                    var nodeChange = this.treeChanges.get(node);
                    if (nodeChange && nodeChange.oldParentNode)
                        parentNode = nodeChange.oldParentNode;
                    var change = this.childListChangeMap.get(parentNode);
                    if (!change)
                        return false;
                    if (change.moved)
                        return change.moved.get(node);
                    change.moved = new NodeMap();
                    var pendingMoveDecision = new NodeMap();

                    function isMoved(node) {
                        if (!node)
                            return false;
                        if (!change.maybeMoved.has(node))
                            return false;
                        var didMove = change.moved.get(node);
                        if (didMove !== undefined)
                            return didMove;
                        if (pendingMoveDecision.has(node)) {
                            didMove = true;
                        } else {
                            pendingMoveDecision.set(node, true);
                            didMove = getPrevious(node) !== getOldPrevious(node);
                        }
                        if (pendingMoveDecision.has(node)) {
                            pendingMoveDecision.delete(node);
                            change.moved.set(node, didMove);
                        } else {
                            didMove = change.moved.get(node);
                        }
                        return didMove;
                    }

                    var oldPreviousCache = new NodeMap();

                    function getOldPrevious(node) {
                        var oldPrevious = oldPreviousCache.get(node);
                        if (oldPrevious !== undefined)
                            return oldPrevious;
                        oldPrevious = change.oldPrevious.get(node);
                        while (oldPrevious &&
                            (change.removed.has(oldPrevious) || isMoved(oldPrevious))) {
                            oldPrevious = getOldPrevious(oldPrevious);
                        }
                        if (oldPrevious === undefined)
                            oldPrevious = node.previousSibling;
                        oldPreviousCache.set(node, oldPrevious);
                        return oldPrevious;
                    }

                    var previousCache = new NodeMap();

                    function getPrevious(node) {
                        if (previousCache.has(node))
                            return previousCache.get(node);
                        var previous = node.previousSibling;
                        while (previous && (change.added.has(previous) || isMoved(previous)))
                            previous = previous.previousSibling;
                        previousCache.set(node, previous);
                        return previous;
                    }

                    change.maybeMoved.keys().forEach(isMoved);
                    return change.moved.get(node);
                };
                return MutationProjection;
            })();
            var Summary = (function () {
                function Summary(projection, query) {
                    var _this = this;
                    this.projection = projection;
                    this['added'] = [];
                    this['removed'] = [];
                    this['reparented'] = query.all || query.element || query.characterData ? [] : undefined;
                    this['reordered'] = query.all ? [] : undefined;
                    projection.getChanged(this, query.elementFilter, query.characterData);
                    if (query.all || query.attribute || query.attributeList) {
                        var filter = query.attribute ? [query.attribute] : query.attributeList;
                        var attributeChanged = projection.attributeChangedNodes(filter);
                        if (query.attribute) {
                            this['valueChanged'] = attributeChanged[query.attribute] || [];
                        } else {
                            this['attributeChanged'] = attributeChanged;
                            if (query.attributeList) {
                                query.attributeList.forEach(function (attrName) {
                                    if (!_this.attributeChanged.hasOwnProperty(attrName))
                                        _this.attributeChanged[attrName] = [];
                                });
                            }
                        }
                    }
                    if (query.all || query.characterData) {
                        var characterDataChanged = projection.getCharacterDataChanged();
                        if (query.characterData)
                            this['valueChanged'] = characterDataChanged;
                        else
                            this['characterDataChanged'] = characterDataChanged;
                    }
                    if (this.reordered)
                        this['getOldPreviousSibling'] = projection.getOldPreviousSibling.bind(projection);
                }

                Summary.prototype.getOldParentNode = function (node) {
                    return this.projection.getOldParentNode(node);
                };
                Summary.prototype.getOldAttribute = function (node, name) {
                    return this.projection.getOldAttribute(node, name);
                };
                Summary.prototype.getOldCharacterData = function (node) {
                    return this.projection.getOldCharacterData(node);
                };
                Summary.prototype.getOldPreviousSibling = function (node) {
                    return this.projection.getOldPreviousSibling(node);
                };
                return Summary;
            })();
            // TODO(rafaelw): Allow ':' and '.' as valid name characters.
            var validNameInitialChar = /[a-zA-Z_]+/;
            var validNameNonInitialChar = /[a-zA-Z0-9_\-]+/;

            // TODO(rafaelw): Consider allowing backslash in the attrValue.
            // TODO(rafaelw): There's got a to be way to represent this state machine
            // more compactly???
            function escapeQuotes(value) {
                return '"' + value.replace(/"/, '\\\"') + '"';
            }

            var Qualifier = (function () {
                function Qualifier() {
                }

                Qualifier.prototype.matches = function (oldValue) {
                    if (oldValue === null)
                        return false;
                    if (this.attrValue === undefined)
                        return true;
                    if (!this.contains)
                        return this.attrValue == oldValue;
                    var tokens = oldValue.split(' ');
                    for (var i = 0; i < tokens.length; i++) {
                        if (this.attrValue === tokens[i])
                            return true;
                    }
                    return false;
                };
                Qualifier.prototype.toString = function () {
                    if (this.attrName === 'class' && this.contains)
                        return '.' + this.attrValue;
                    if (this.attrName === 'id' && !this.contains)
                        return '#' + this.attrValue;
                    if (this.contains)
                        return '[' + this.attrName + '~=' + escapeQuotes(this.attrValue) + ']';
                    if ('attrValue' in this)
                        return '[' + this.attrName + '=' + escapeQuotes(this.attrValue) + ']';
                    return '[' + this.attrName + ']';
                };
                return Qualifier;
            })();
            var Selector = (function () {
                function Selector() {
                    this.uid = Selector.nextUid++;
                    this.qualifiers = [];
                }

                Object.defineProperty(Selector.prototype,
                    'caseInsensitiveTagName',
                    {
                        get: function () {
                            return this.tagName.toUpperCase();
                        },
                        enumerable: true,
                        configurable: true
                    });
                Object.defineProperty(Selector.prototype,
                    'selectorString',
                    {
                        get: function () {
                            return this.tagName + this.qualifiers.join('');
                        },
                        enumerable: true,
                        configurable: true
                    });
                Selector.prototype.isMatching = function (el) {
                    return el[Selector.matchesSelector](this['selectorString']);
                };
                Selector.prototype.wasMatching = function (el, change, isMatching) {
                    if (!change || !change.attributes)
                        return isMatching;
                    var tagName = change.isCaseInsensitive ? this['caseInsensitiveTagName'] : this.tagName;
                    if (tagName !== '*' && tagName !== el.tagName)
                        return false;
                    var attributeOldValues = [];
                    var anyChanged = false;
                    for (var i = 0; i < this.qualifiers.length; i++) {
                        var qualifier = this.qualifiers[i];
                        var oldValue = change.getAttributeOldValue(qualifier.attrName);
                        attributeOldValues.push(oldValue);
                        anyChanged = anyChanged || (oldValue !== undefined);
                    }
                    if (!anyChanged)
                        return isMatching;
                    for (var i = 0; i < this.qualifiers.length; i++) {
                        var qualifier = this.qualifiers[i];
                        var oldValue = attributeOldValues[i];
                        if (oldValue === undefined)
                            oldValue = el.getAttribute(qualifier.attrName);
                        if (!qualifier.matches(oldValue))
                            return false;
                    }
                    return true;
                };
                Selector.prototype.matchabilityChange = function (el, change) {
                    var isMatching = this.isMatching(el);
                    if (isMatching)
                        return this.wasMatching(el, change, isMatching) ? Movement.STAYED_IN : Movement.ENTERED;
                    else
                        return this.wasMatching(el, change, isMatching) ? Movement.EXITED : Movement.STAYED_OUT;
                };
                Selector.parseSelectors = function (input) {
                    var selectors = [];
                    var currentSelector;
                    var currentQualifier;

                    function newSelector() {
                        if (currentSelector) {
                            if (currentQualifier) {
                                currentSelector.qualifiers.push(currentQualifier);
                                currentQualifier = undefined;
                            }
                            selectors.push(currentSelector);
                        }
                        currentSelector = new Selector();
                    }

                    function newQualifier() {
                        if (currentQualifier)
                            currentSelector.qualifiers.push(currentQualifier);
                        currentQualifier = new Qualifier();
                    }

                    var WHITESPACE = /\s/;
                    var valueQuoteChar;
                    var SYNTAX_ERROR = 'Invalid or unsupported selector syntax.';
                    var SELECTOR = 1;
                    var TAG_NAME = 2;
                    var QUALIFIER = 3;
                    var QUALIFIER_NAME_FIRST_CHAR = 4;
                    var QUALIFIER_NAME = 5;
                    var ATTR_NAME_FIRST_CHAR = 6;
                    var ATTR_NAME = 7;
                    var EQUIV_OR_ATTR_QUAL_END = 8;
                    var EQUAL = 9;
                    var ATTR_QUAL_END = 10;
                    var VALUE_FIRST_CHAR = 11;
                    var VALUE = 12;
                    var QUOTED_VALUE = 13;
                    var SELECTOR_SEPARATOR = 14;
                    var state = SELECTOR;
                    var i = 0;
                    while (i < input.length) {
                        var c = input[i++];
                        switch (state) {
                            case SELECTOR:
                                if (c.match(validNameInitialChar)) {
                                    newSelector();
                                    currentSelector.tagName = c;
                                    state = TAG_NAME;
                                    break;
                                }
                                if (c == '*') {
                                    newSelector();
                                    currentSelector.tagName = '*';
                                    state = QUALIFIER;
                                    break;
                                }
                                if (c == '.') {
                                    newSelector();
                                    newQualifier();
                                    currentSelector.tagName = '*';
                                    currentQualifier.attrName = 'class';
                                    currentQualifier.contains = true;
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break;
                                }
                                if (c == '#') {
                                    newSelector();
                                    newQualifier();
                                    currentSelector.tagName = '*';
                                    currentQualifier.attrName = 'id';
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break;
                                }
                                if (c == '[') {
                                    newSelector();
                                    newQualifier();
                                    currentSelector.tagName = '*';
                                    currentQualifier.attrName = '';
                                    state = ATTR_NAME_FIRST_CHAR;
                                    break;
                                }
                                if (c.match(WHITESPACE))
                                    break;
                                throw Error(SYNTAX_ERROR);
                            case TAG_NAME:
                                if (c.match(validNameNonInitialChar)) {
                                    currentSelector.tagName += c;
                                    break;
                                }
                                if (c == '.') {
                                    newQualifier();
                                    currentQualifier.attrName = 'class';
                                    currentQualifier.contains = true;
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break;
                                }
                                if (c == '#') {
                                    newQualifier();
                                    currentQualifier.attrName = 'id';
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break;
                                }
                                if (c == '[') {
                                    newQualifier();
                                    currentQualifier.attrName = '';
                                    state = ATTR_NAME_FIRST_CHAR;
                                    break;
                                }
                                if (c.match(WHITESPACE)) {
                                    state = SELECTOR_SEPARATOR;
                                    break;
                                }
                                if (c == ',') {
                                    state = SELECTOR;
                                    break;
                                }
                                throw Error(SYNTAX_ERROR);
                            case QUALIFIER:
                                if (c == '.') {
                                    newQualifier();
                                    currentQualifier.attrName = 'class';
                                    currentQualifier.contains = true;
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break;
                                }
                                if (c == '#') {
                                    newQualifier();
                                    currentQualifier.attrName = 'id';
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break;
                                }
                                if (c == '[') {
                                    newQualifier();
                                    currentQualifier.attrName = '';
                                    state = ATTR_NAME_FIRST_CHAR;
                                    break;
                                }
                                if (c.match(WHITESPACE)) {
                                    state = SELECTOR_SEPARATOR;
                                    break;
                                }
                                if (c == ',') {
                                    state = SELECTOR;
                                    break;
                                }
                                throw Error(SYNTAX_ERROR);
                            case QUALIFIER_NAME_FIRST_CHAR:
                                if (c.match(validNameInitialChar)) {
                                    currentQualifier.attrValue = c;
                                    state = QUALIFIER_NAME;
                                    break;
                                }
                                throw Error(SYNTAX_ERROR);
                            case QUALIFIER_NAME:
                                if (c.match(validNameNonInitialChar)) {
                                    currentQualifier.attrValue += c;
                                    break;
                                }
                                if (c == '.') {
                                    newQualifier();
                                    currentQualifier.attrName = 'class';
                                    currentQualifier.contains = true;
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break;
                                }
                                if (c == '#') {
                                    newQualifier();
                                    currentQualifier.attrName = 'id';
                                    state = QUALIFIER_NAME_FIRST_CHAR;
                                    break;
                                }
                                if (c == '[') {
                                    newQualifier();
                                    state = ATTR_NAME_FIRST_CHAR;
                                    break;
                                }
                                if (c.match(WHITESPACE)) {
                                    state = SELECTOR_SEPARATOR;
                                    break;
                                }
                                if (c == ',') {
                                    state = SELECTOR;
                                    break;
                                }
                                throw Error(SYNTAX_ERROR);
                            case ATTR_NAME_FIRST_CHAR:
                                if (c.match(validNameInitialChar)) {
                                    currentQualifier.attrName = c;
                                    state = ATTR_NAME;
                                    break;
                                }
                                if (c.match(WHITESPACE))
                                    break;
                                throw Error(SYNTAX_ERROR);
                            case ATTR_NAME:
                                if (c.match(validNameNonInitialChar)) {
                                    currentQualifier.attrName += c;
                                    break;
                                }
                                if (c.match(WHITESPACE)) {
                                    state = EQUIV_OR_ATTR_QUAL_END;
                                    break;
                                }
                                if (c == '~') {
                                    currentQualifier.contains = true;
                                    state = EQUAL;
                                    break;
                                }
                                if (c == '=') {
                                    currentQualifier.attrValue = '';
                                    state = VALUE_FIRST_CHAR;
                                    break;
                                }
                                if (c == ']') {
                                    state = QUALIFIER;
                                    break;
                                }
                                throw Error(SYNTAX_ERROR);
                            case EQUIV_OR_ATTR_QUAL_END:
                                if (c == '~') {
                                    currentQualifier.contains = true;
                                    state = EQUAL;
                                    break;
                                }
                                if (c == '=') {
                                    currentQualifier.attrValue = '';
                                    state = VALUE_FIRST_CHAR;
                                    break;
                                }
                                if (c == ']') {
                                    state = QUALIFIER;
                                    break;
                                }
                                if (c.match(WHITESPACE))
                                    break;
                                throw Error(SYNTAX_ERROR);
                            case EQUAL:
                                if (c == '=') {
                                    currentQualifier.attrValue = '';
                                    state = VALUE_FIRST_CHAR;
                                    break;
                                }
                                throw Error(SYNTAX_ERROR);
                            case ATTR_QUAL_END:
                                if (c == ']') {
                                    state = QUALIFIER;
                                    break;
                                }
                                if (c.match(WHITESPACE))
                                    break;
                                throw Error(SYNTAX_ERROR);
                            case VALUE_FIRST_CHAR:
                                if (c.match(WHITESPACE))
                                    break;
                                if (c == '"' || c == '\'') {
                                    valueQuoteChar = c;
                                    state = QUOTED_VALUE;
                                    break;
                                }
                                currentQualifier.attrValue += c;
                                state = VALUE;
                                break;
                            case VALUE:
                                if (c.match(WHITESPACE)) {
                                    state = ATTR_QUAL_END;
                                    break;
                                }
                                if (c == ']') {
                                    state = QUALIFIER;
                                    break;
                                }
                                if (c == '\'' || c == '"')
                                    throw Error(SYNTAX_ERROR);
                                currentQualifier.attrValue += c;
                                break;
                            case QUOTED_VALUE:
                                if (c == valueQuoteChar) {
                                    state = ATTR_QUAL_END;
                                    break;
                                }
                                currentQualifier.attrValue += c;
                                break;
                            case SELECTOR_SEPARATOR:
                                if (c.match(WHITESPACE))
                                    break;
                                if (c == ',') {
                                    state = SELECTOR;
                                    break;
                                }
                                throw Error(SYNTAX_ERROR);
                        }
                    }
                    switch (state) {
                        case SELECTOR:
                        case TAG_NAME:
                        case QUALIFIER:
                        case QUALIFIER_NAME:
                        case SELECTOR_SEPARATOR:
                            // Valid end states.
                            newSelector();
                            break;
                        default:
                            throw Error(SYNTAX_ERROR);
                    }
                    if (!selectors.length)
                        throw Error(SYNTAX_ERROR);
                    return selectors;
                };
                Selector.nextUid = 1;
                Selector.matchesSelector = (function () {
                    var element = document.createElement('div');
                    if (typeof element['webkitMatchesSelector'] === 'function')
                        return 'webkitMatchesSelector';
                    if (typeof element['mozMatchesSelector'] === 'function')
                        return 'mozMatchesSelector';
                    if (typeof element['msMatchesSelector'] === 'function')
                        return 'msMatchesSelector';
                    return 'matchesSelector';
                })();
                return Selector;
            })();
            var attributeFilterPattern = /^([a-zA-Z:_]+[a-zA-Z0-9_\-:\.]*)$/;

            function validateAttribute(attribute) {
                if (typeof attribute != 'string')
                    throw Error('Invalid request option. attribute must be a non-zero length string.');
                attribute = attribute.trim();
                if (!attribute)
                    throw Error('Invalid request option. attribute must be a non-zero length string.');
                if (!attribute.match(attributeFilterPattern))
                    throw Error('Invalid request option. invalid attribute name: ' + attribute);
                return attribute;
            }

            function validateElementAttributes(attribs) {
                if (!attribs.trim().length)
                    throw Error('Invalid request option: elementAttributes must contain at least one attribute.');
                var lowerAttributes = {};
                var attributes = {};
                var tokens = attribs.split(/\s+/);
                for (var i = 0; i < tokens.length; i++) {
                    var name = tokens[i];
                    if (!name)
                        continue;
                    var name = validateAttribute(name);
                    var nameLower = name.toLowerCase();
                    if (lowerAttributes[nameLower])
                        throw Error(
                            'Invalid request option: observing multiple case variations of the same attribute is not supported.');
                    attributes[name] = true;
                    lowerAttributes[nameLower] = true;
                }
                return Object.keys(attributes);
            }

            function elementFilterAttributes(selectors) {
                var attributes = {};
                selectors.forEach(function (selector) {
                    selector.qualifiers.forEach(function (qualifier) {
                        attributes[qualifier.attrName] = true;
                    });
                });
                return Object.keys(attributes);
            }

            var MutationSummary = (function () {
                function MutationSummary(opts) {
                    var _this = this;
                    this.connected = false;
                    this.options = MutationSummary.validateOptions(opts);
                    this.observerOptions = MutationSummary.createObserverOptions(this.options.queries);
                    this.root = this.options.rootNode;
                    this.callback = this.options.callback;
                    this.elementFilter = Array.prototype.concat.apply([],
                        this.options.queries.map(function (query) {
                            return query.elementFilter ? query.elementFilter : [];
                        }));
                    if (!this.elementFilter.length)
                        this.elementFilter = undefined;
                    this.calcReordered = this.options.queries.some(function (query) {
                        return query.all;
                    });
                    this.queryValidators = []; // TODO(rafaelw): Shouldn't always define this.
                    if (MutationSummary.createQueryValidator) {
                        this.queryValidators = this.options.queries.map(function (query) {
                            return MutationSummary.createQueryValidator(_this.root, query);
                        });
                    }
                    this.observer = new MutationObserverCtor(function (mutations) {
                        _this.observerCallback(mutations);
                    });
                    this.reconnect();
                }

                MutationSummary.createObserverOptions = function (queries) {
                    var observerOptions = {
                        'childList': true,
                        'subtree': true
                    };
                    var attributeFilter;

                    function observeAttributes(attributes) {
                        if (observerOptions['attributes'] && !attributeFilter)
                            return; // already observing all.
                        observerOptions['attributes'] = true;
                        observerOptions['attributeOldValue'] = true;
                        if (!attributes) {
                            // observe all.
                            attributeFilter = undefined;
                            return;
                        }
                        // add to observed.
                        attributeFilter = attributeFilter || {};
                        attributes.forEach(function (attribute) {
                            attributeFilter[attribute] = true;
                            attributeFilter[attribute.toLowerCase()] = true;
                        });
                    }

                    queries.forEach(function (query) {
                        if (query.characterData) {
                            observerOptions['characterData'] = true;
                            observerOptions['characterDataOldValue'] = true;
                            return;
                        }
                        if (query.all) {
                            observeAttributes();
                            observerOptions['characterData'] = true;
                            observerOptions['characterDataOldValue'] = true;
                            return;
                        }
                        if (query.attribute) {
                            observeAttributes([query.attribute.trim()]);
                            return;
                        }
                        var attributes = elementFilterAttributes(query.elementFilter)
                            .concat(query.attributeList || []);
                        if (attributes.length)
                            observeAttributes(attributes);
                    });
                    if (attributeFilter)
                        observerOptions['attributeFilter'] = Object.keys(attributeFilter);
                    return observerOptions;
                };
                MutationSummary.validateOptions = function (options) {
                    for (var prop in options) {
                        if (!(prop in MutationSummary.optionKeys))
                            throw Error('Invalid option: ' + prop);
                    }
                    if (typeof options['callback'] !== 'function')
                        throw Error('Invalid options: callback is required and must be a function');
                    if (!options['queries'] || !options['queries'].length)
                        throw Error('Invalid options: queries must contain at least one query request object.');

                    var opts = {
                        callback: options['callback'],
                        rootNode: options['rootNode'] || document,
                        observeOwnChanges: !!options['observeOwnChanges'],
                        oldPreviousSibling: !!options['oldPreviousSibling'],
                        queries: []
                    };
                    for (var i = 0; i < options['queries'].length; i++) {
                        var request = options['queries'][i];
                        // all
                        if (request.all) {
                            if (Object.keys(request).length > 1)
                                throw Error('Invalid request option. all has no options.');
                            opts.queries.push({ all: true });
                            continue;
                        }
                        // attribute
                        if ('attribute' in request) {
                            var query = {
                                attribute: validateAttribute(request.attribute)
                            };
                            query.elementFilter = Selector.parseSelectors('*[' + query.attribute + ']');
                            if (Object.keys(request).length > 1)
                                throw Error('Invalid request option. attribute has no options.');
                            opts.queries.push(query);
                            continue;
                        }
                        // element
                        if ('element' in request) {
                            var requestOptionCount = Object.keys(request).length;
                            var query = {
                                element: request.element,
                                elementFilter: Selector.parseSelectors(request.element)
                            };
                            if (request.hasOwnProperty('elementAttributes')) {
                                query.attributeList = validateElementAttributes(request.elementAttributes);
                                requestOptionCount--;
                            }
                            if (requestOptionCount > 1)
                                throw Error(
                                    'Invalid request option. element only allows elementAttributes option.');
                            opts.queries.push(query);
                            continue;
                        }
                        // characterData
                        if (request.characterData) {
                            if (Object.keys(request).length > 1)
                                throw Error('Invalid request option. characterData has no options.');
                            opts.queries.push({ characterData: true });
                            continue;
                        }
                        throw Error('Invalid request option. Unknown query request.');
                    }
                    return opts;
                };
                MutationSummary.prototype.createSummaries = function (mutations) {
                    if (!mutations || !mutations.length)
                        return [];
                    var projection = new MutationProjection(this.root,
                        mutations,
                        this.elementFilter,
                        this.calcReordered,
                        this.options.oldPreviousSibling);
                    var summaries = [];
                    for (var i = 0; i < this.options.queries.length; i++) {
                        summaries.push(new Summary(projection, this.options.queries[i]));
                    }
                    return summaries;
                };
                MutationSummary.prototype.checkpointQueryValidators = function () {
                    this.queryValidators.forEach(function (validator) {
                        if (validator)
                            validator.recordPreviousState();
                    });
                };
                MutationSummary.prototype.runQueryValidators = function (summaries) {
                    this.queryValidators.forEach(function (validator, index) {
                        if (validator)
                            validator.validate(summaries[index]);
                    });
                };
                MutationSummary.prototype.changesToReport = function (summaries) {
                    return summaries.some(function (summary) {
                        var summaryProps = [
                            'added', 'removed', 'reordered', 'reparented',
                            'valueChanged', 'characterDataChanged'
                        ];
                        if (summaryProps.some(function (prop) { return summary[prop] && summary[prop].length; }))
                            return true;
                        if (summary.attributeChanged) {
                            var attrNames = Object.keys(summary.attributeChanged);
                            var attrsChanged = attrNames.some(function (attrName) {
                                return !!summary.attributeChanged[attrName].length;
                            });
                            if (attrsChanged)
                                return true;
                        }
                        return false;
                    });
                };
                MutationSummary.prototype.observerCallback = function (mutations) {
                    if (!this.options.observeOwnChanges)
                        this.observer.disconnect();
                    var summaries = this.createSummaries(mutations);
                    this.runQueryValidators(summaries);
                    if (this.options.observeOwnChanges)
                        this.checkpointQueryValidators();
                    if (this.changesToReport(summaries))
                        this.callback(summaries);
                    // disconnect() may have been called during the callback.
                    if (!this.options.observeOwnChanges && this.connected) {
                        this.checkpointQueryValidators();
                        this.observer.observe(this.root, this.observerOptions);
                    }
                };
                MutationSummary.prototype.reconnect = function () {
                    if (this.connected)
                        throw Error('Already connected');
                    this.observer.observe(this.root, this.observerOptions);
                    this.connected = true;
                    this.checkpointQueryValidators();
                };
                MutationSummary.prototype.takeSummaries = function () {
                    if (!this.connected)
                        throw Error('Not connected');
                    var summaries = this.createSummaries(this.observer.takeRecords());
                    return this.changesToReport(summaries) ? summaries : undefined;
                };
                MutationSummary.prototype.disconnect = function () {
                    var summaries = this.takeSummaries();
                    this.observer.disconnect();
                    this.connected = false;
                    return summaries;
                };
                MutationSummary.NodeMap = NodeMap; // exposed for use in TreeMirror.
                MutationSummary.parseElementFilter = Selector.parseSelectors; // exposed for testing.
                MutationSummary.optionKeys = {
                    'callback': true,
                    'queries': true,
                    'rootNode': true,
                    'oldPreviousSibling': true,
                    'observeOwnChanges': true
                };
                return MutationSummary;
            })();

            return MutationSummary;

        }()),

        /** Tags that are subject to analysis. */
        /** @const */
        /** @dict */
        _tagsToAnalyze: [
            { 'tagName': 'div', 'checkDelegated': false },
            { 'tagName': 'li', 'checkDelegated': true }, /* default true */
            { 'tagName': 'frame', 'checkDelegated': false },
            { 'tagName': 'iframe', 'checkDelegated': false },
            { 'tagName': 'img', 'checkDelegated': false },
            { 'tagName': 'span', 'checkDelegated': false },
            { 'tagName': 'p', 'checkDelegated': false },
            { 'tagName': 'td', 'checkDelegated': false },
            { 'tagName': 'tr', 'checkDelegated': false },
            { 'tagName': 'form', 'checkDelegated': false },
            { 'tagName': 'button', 'checkDelegated': true }, /* default true */
            { 'tagName': 'select', 'checkDelegated': false },
            { 'tagName': 'area', 'checkDelegated': false },
            { 'tagName': 'input', 'checkDelegated': false },
            { 'tagName': 'a', 'checkDelegated': true } /* default true */
        ],

        /** Hashtable lookup for delegation checkable tags. */
        /** @const */
        /** @dict */
        _checkDelegatedCache: {
            'a': true,
            'button': true,
            'li': true,
        },

        /** Hashtable lookup for tags to analyze. */
        /** @const */
        /** @dict */
        _tagsToAnalyzeCache: {
            'a': true,
            'form': true,
            'input': true,
            'select': true,
            'button': true,
            'area': true,
            'div': true,
            'li': true,
            'frame': true,
            'iframe': true,
            'img': true,
            'span': true,
            'p': true,
            'td': true,
            'tr': true
        },

        _eventCreators: {},

        /** Default options. */
        _options: {
            skipThreshold: 100,
            skipElementCount: 10,
            bailThreshold: 1000,
            simulateThreshold: 1000,
            intereventTimeout: 100,
            dfsLimit: 5,
            _debugDoNotTriggerEvents: false, /* default false. */
            _debugDoNotCallGetEventListeners: false, /* default false. */
            ignoreDocumentEvents: false, /* default false. */
            formValues: [
                { 'Name': '#DEFAULT#', 'Value': '3', 'Pattern': '', 'Match': 0, 'Type': null, 'Force': false }
            ],
            nonDfsTraversalReversed: false,
            smartDfsEnabled: false,
            smartDfsMinElementCount: 10,
            smartDfsMinTagGroupCount: 3,
            smartDfsMaxSampleCount: 5,
            smartDfsSimilarityDistance: 0.1,
            forceTimeouts: false,
            collectDotifyInfo: true,
            favorPostMessageOverSetTimeout: true,
            exclusionCssSelector: null,
            filterDocumentEvents: false,
            preSimulationWait: 0,
            maxOptionElementsPerSelect: 10,
            filterColonEvents: false,
        },

        _matchLabels: false,
        _matchPlaceholders: false,
        _matchIds: false,

        /** State of the simulation. */
        _state: {
            'eventsTriggered': 0,
            'elementSimulationCount': 0,
            'dfsCount': 0,
            'mutatingAdditionCount': 0,
            'mutationChangeCount': 0,
            'simulateTimeoutReached': false,
            'skipThresholdReached': false,
            'bailThresholdReached': false,
            'simulateThresholdReached': false,
            'dfsLimitHit': 0,
            'dfsEffectiveMaxDepth': 0,
            'simulateElementCount': 0,
            'simulateCount': 0,
            'allElementsSimulated': false,
            'simulationDuration': 0,
            'resimulateCount': 0,
            'smartDfsHit': 0,
            'domXssPaths': [],
            'smartDfsMinTagHit': 0,
            'smartDfsMinElementHit': 0,
            'smartDfsMaxSampleHit': 0,
            'smartDfsNoMaxSampleHit': 0,
            'totalXhrOpen': 0,
            'totalXhrDone': 0,
            'totalSetTimeout': 0,
            'totalSetTimeoutZero': 0,
            'totalSetInterval': 0,
            'detachedNodeCount': 0,
            'excludedByCss': 0,
            'maxOptionElementHit': 0,
            'elementSimDist': {},
            'suppressedOptionUlCount': 0,
            'suppressedOptionLiCount': 0,
            'visitedHashCount': 0 /* set in dotify, 0 otherwise. */,
            'parsedHashCount': 0 /* set in dotify, 0 otherwise. */,
            'ignoredDocumentEvent': 0,
            'filteredDocumentEvent': 0,
        },

        /** Counter for form Ids. */
        _formIdCounter: 0,

        /** Counter for unique Ids. */
        _identityCounter: 1,

        /** DOM relations array. */
        _debugRelations: [],

        /** DOM adding relations array. */
        _debugAddingRelations: [],

        /** Walk steps in the DOM traversal. */
        _debugWalk: [],

        /** Encountered detached DOM nodes. */
        _debugDetached: [],

        /** CSS-excluded elements. */
        _debugCssExcluded: [],

        /** Debug logs. */
        _debugRaw: [],

        /** Walk key for trace entries. */
        /** @const */
        _debugTraceId: '~trace',

        /** ElementId DFS level map. */
        _elementIdDfsLevel: {},

        /** Holds all elements while traversing. */
        _allElements: [],

        /** Holds arrays of DFS-requiring elements while traversing. */
        _dfsElements: [],

        _dfsStats: [],

        _dfsSmartStats: {},

        _currentDfsLevel: 0,

        _pendingXhrRequests: 0,

        _getEffectiveIntereventTimeout: function () {

            if (__ns._pendingXhrRequests > 0) {
                return __ns._options.intereventTimeout;
            }

            return 0;
        },

        _waitUntilPendingComplete: function (callback, pollPeriod, maxTimeout) {
            var totalPeriod = 0;

            var intervalId = __ns._setInterval(function () {

                totalPeriod += pollPeriod;

                if (__ns._pendingXhrRequests === 0 || totalPeriod >= maxTimeout) {
                    __ns._clearIntervalNative(intervalId);

                    callback();

                    return;
                }

            },
                pollPeriod);
        },

        _hookHistory: function () {
            if (CONSOLE_DEBUG) {
                var pushState = history.pushState;
                history.pushState = function (state, title, url) {
                    __ns._onHistoryPushState({ state: state, title: title, url: url });

                    return pushState.apply(history, arguments);
                }

                var replaceState = history.replaceState;
                history.replaceState = function (state, title, url) {
                    __ns._onHistoryReplaceState({ state: state, title: title, url: url });

                    return replaceState.apply(history, arguments);
                }
            }
        },

        _onHistoryPushState: function (state) {
            console.log('_onHistoryPushState: ' + JSON.stringify(state));
        },

        _onHistoryReplaceState: function (state) {
            console.log('_onHistoryReplaceState:' + JSON.stringify(state));
        },

        _hookXhr: function () {
            var orig_open = XMLHttpRequest.prototype.open;

            __ns._pendingXhrRequests = 0;

            XMLHttpRequest.prototype.open = function () {
                __ns._pendingXhrRequests++;
                __ns._state['totalXhrOpen']++;

                this.addEventListener('readystatechange',
                    function () {
                        if (this.readyState == 4) {
                            __ns._pendingXhrRequests--;
                            __ns._state['totalXhrDone']++;
                        }
                    },
                    false);

                orig_open.apply(this, arguments);
            }
        },

        _appendFormValueSampleFromPattern: function (tryAddSample, matchTargetType, matchTargetText) {
            for (var i = 0; i < __ns._options.formValues.length; i++) {
                var formValue = __ns._options.formValues[i];

                if ((formValue['MatchTarget'] & matchTargetType) !== matchTargetType) {
                    continue;
                }

                var pattern = formValue['Pattern'];

                if (!pattern || pattern.length == 0) {
                    continue;
                }

                // Match values come from CLR enum MSL.Core.Configuration.FormValueMatch
                switch (formValue['Match']) {
                    case 0:
                        // Regex.
                        if (pattern.indexOf('(?im)') == 0) {
                            pattern = pattern.substring('(_im)'.length);
                        }

                        // Here be :dragon:s.
                        // we are expecting every .NET RegEx to work in JS.
                        var patt = new RegExp(pattern, 'im');

                        try {
                            if (patt.test(matchTargetText)) {
                                tryAddSample(formValue);
                            }
                        } catch (e) {
                            console.log(e);
                        }

                        break;
                    case 1:
                        // exact-ignore case
                        if (pattern.toUpperCase() == matchTargetText.toUpperCase()) {
                            tryAddSample(formValue);
                        }

                        break;
                    case 2:
                        // contains
                        if (matchTargetText.toUpperCase().indexOf(pattern.toUpperCase()) >= 0) {
                            tryAddSample(formValue);
                        }

                        break;
                    case 3:
                        // starts
                        if (matchTargetText.toUpperCase().indexOf(pattern.toUpperCase()) == 0) {
                            tryAddSample(formValue);
                        }

                        break;
                    case 4:
                        // ends
                        if (matchTargetText.toUpperCase().lastIndexOf(pattern.toUpperCase()) + pattern.length ==
                            matchTargetText.length) {
                            tryAddSample(formValue);
                        }
                }
            }
        },

        /** Matches serialized "FormValue" C# object instances to an input. */
        _getFormValueSamples: function (inputType, inputName, input) {
            var samples = [];
            var formValue;

            var needForce = input.value != null && input.value.toString().length > 0;

            var tryAddSample = function (formValue, valueOverride) {
                if (needForce && formValue['Force'] != true) {
                    return;
                }

                samples.push(valueOverride || formValue['Value']);
            };

            // Try to match the type first.
            for (var i = 0; i < __ns._options.formValues.length; i++) {
                formValue = __ns._options.formValues[i];

                if (formValue['Type'] === inputType) {
                    tryAddSample(formValue);
                }
            }

			/*
			    Type does not match, try values.
			    Name = 1,
			    Label = 2,
			    Placeholder = 4,
			    Id = 8,
			    */
            __ns._appendFormValueSampleFromPattern(tryAddSample, 1, inputName);

            if (__ns._matchLabels) {
                var labels = input['labels'];

                if (labels && labels.length > 0) {
                    var label = labels[0].innerText.trim();

                    __ns._appendFormValueSampleFromPattern(tryAddSample, 2, label);
                }
            }

            if (__ns._matchPlaceholders) {
                var placeholder = input.getAttribute('placeholder');

                if (placeholder && placeholder.length > 0) {
                    placeholder = placeholder.trim();

                    __ns._appendFormValueSampleFromPattern(tryAddSample, 4, placeholder);
                }
            }

            if (__ns._matchIds) {
                var id = input.getAttribute('id');

                if (id && id.length > 0) {
                    id = id.trim();

                    __ns._appendFormValueSampleFromPattern(tryAddSample, 8, id);
                }
            }

            if (samples.length > 0) {
                return samples;
            }

            var minLength = input && input['minLength'];
            var maxLength = input && input['maxLength'];

            if (maxLength > 500000 || maxLength == -1) {
                maxLength = undefined;
            }

            if (minLength < 0) {
                minLength = undefined;
            }

            for (var i = 0; i < __ns._options.formValues.length; i++) {
                formValue = __ns._options.formValues[i];

                if (formValue['Name'] !== '#DEFAULT#') {
                    // Only default values are replicated or cut.
                    continue;
                }

                if (!minLength && !maxLength) {
                    tryAddSample(formValue);
                } else {
                    // Limit both.
                    var value = formValue['Value'].toString();

                    if (minLength && minLength > 0 && value.length < minLength) {
                        value = value.repeat(1.0 * minLength / value.length + 1);
                        value = value.substring(0, minLength);
                    }

                    if (maxLength && maxLength > 0 && value.length > maxLength) {
                        value = value.substring(0, maxLength);
                    }

                    tryAddSample(formValue, value);
                }
            }

            return samples;
        },

        /** Fills input elements with a single set of formValues. */
        _fillFormInputElements: function (form) {
            // This method synchronously updates DOM.

            if (!form) {
                return;
            }

            __ns._pushWalkStep(form, ['ns-fill-form', form.name || '']);

            for (var i = 0; i < form.elements.length; i++) {
                var element = form.elements[i];

                if (__ns._isExcludedByCssSelector(element)) {
                    continue;
                }

                if ((element.tagName.toLowerCase() != 'input' && element.tagName.toLowerCase() != 'textarea') ||
                    element.type.toUpperCase() == 'SUBMIT' ||
                    element.type.toUpperCase() == 'HIDDEN' ||
                    element.type.toUpperCase() == 'FILE') {
                    continue;
                }

                var samples = __ns._getFormValueSamples(element.type, element.name, element);

                if (!samples || samples.length == 0) {
                    continue;
                }

                // Pick first values here, trying all values would have combinatorial time complexity.
                var sample = samples[0];

                __ns._simulateAutosuggest(element, sample, sample);
            }
        },

        /** MouseEvent creator */
        _createMouseEvent: function (eventName) {
            var ev = document.createEvent('MouseEvents');
            ev.initMouseEvent(eventName, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            return ev;
        },

        /** KeyboardEvent creator */
        _createKeyboardEvent: function (eventName, char) {
            var ev = document.createEvent('KeyboardEvents');
            ev.initKeyboardEvent(eventName,
                true,
                true,
                document.defaultView,
                char ? char : 'U+0041',
                0,
                false,
                false,
                false,
                false,
                false);
            return ev;
        },

        /** HtmlEvent creator */
        _createHtmlEvent: function (eventName) {
            var ev = document.createEvent('HTMLEvents');
            ev.initEvent(eventName, true, false);
            return ev;
        },

        /** Make the elements array identifiable by assigning unique ids to them if they do not already have ids. */
        _identifyElements: function (elements) {
            for (i = 0; i < elements.length; i++) {
                var element = elements[i];

                __ns._identify(element);
            }
        },

        /** If the element has an id, return it. Otherwise generate and assign a unique id to the element and return the generated id. */
        _identify: function (element) {
            if (element.nodeName == '#document') {
                return '#document';
            }

            var id;
            var hasDataset = true;

            if (typeof element.dataset === 'undefined') {
                id = null;
                hasDataset = false;
            } else {
                id = element.dataset['nsId'];
            }

            if (!id) {
                if (hasDataset) {
                    if (!element.id) {
                        element.dataset['nsId'] = 'id-' + __ns._identityCounter;
                    } else {
                        element.dataset['nsId'] = element.id + '-' + __ns._identityCounter;
                    }
                } else {

                    id = (element.id || 'unk') + '-' + __ns._identityCounter;
                }

                __ns._identityCounter++;
            }

            return id || element.dataset['nsId'];
        },

        _dotifyCache: [],

        dotifyPart: function (options, part) {
            if (__ns._dotifyCache.length === 0) {
                __ns._dotifyCache = __ns.dotify(options);
            }

            if (part < __ns._dotifyCache.length) {
                return __ns._dotifyCache[part];
            }

            __ns._dotifyCache = [];

            return '';
        },

        /** Generate dot string from simulation results, used for debugging purposes. */
        dotify: function (options) {
            var maxPieceLength = 1024 * 1024;

            var ret = [];

            var dot = 'digraph {\n';

            if (!options) {
                options = {};
            }

            if (!options['constraintAddition']) {
                options['constraintAddition'] = false; // default false.
            }

            if (!options['onlyReturnDot']) {
                options.onlyReturnDot = false;
            }

            // relations
            for (var i = 0; i < __ns._debugRelations.length; i++) {
                var relation = __ns._debugRelations[i];

                var parentId = relation[0];
                var selfId = relation[1];
                var annotation = relation.length > 2 ? relation[2] : null;

                if (annotation && annotation.length > 0) {
                    dot += '"' + parentId + '" -> "' + selfId + '" [label="' + annotation + '"]\n';
                } else {
                    dot += '"' + parentId + '" -> "' + selfId + '"\n';
                }

                if (dot.length > maxPieceLength) {
                    ret.push(dot);
                    dot = '';
                }
            }

            __ns._debugAddingRelations.sort(function (a, b) { return a[2] - b[2]; });

            var prevGroupId = __ns._debugAddingRelations.length > 0 ? __ns._debugAddingRelations[0][2] : 0;

            var clusterDot = 'subgraph cluster_dfs_' + prevGroupId + '{\n label="DFS group ' + prevGroupId + '";\n';
            var hasNewCluster = false;
            // adding relations
            for (var i = 0; i < __ns._debugAddingRelations.length; i++) {
                var relation = __ns._debugAddingRelations[i];

                var parentId = relation[0];
                var selfId = relation[1];
                var groupId = relation[2];
                hasNewCluster = true;

                if (options['constraintAddition']) {
                    dot += '"' + parentId + '" -> "' + selfId + '" [color="#a9a9a9", style="dashed"]\n';
                } else {
                    dot += '"' +
                        parentId +
                        '" -> "' +
                        selfId +
                        '" [constraint=false, color="#a9a9a9", style="dashed"]\n';
                }

                if (i > 0) {
                    var isSmartDfsFilteredCluster = groupId.toString().endsWith('_filtered');

                    if (isSmartDfsFilteredCluster) {
                        clusterDot += '"' + selfId + '" [color="#FBC599", style="dashed"]; ';
                    } else {
                        clusterDot += '"' + selfId + '"; ';
                    }

                    if (prevGroupId != groupId) {
                        // Dump cluster.
                        clusterDot += '\n}\n\n';
                        dot += '\n' + clusterDot;
                        clusterDot = 'subgraph cluster_dfs_' + groupId + '{\n label="DFS group ' + groupId + '";\n';
                        hasNewCluster = false;
                    }
                }

                if (dot.length > maxPieceLength) {
                    ret.push(dot);
                    dot = '';
                }

                prevGroupId = groupId;
            }

            if (hasNewCluster) {
                clusterDot += '\n}\n\n';
                dot += '\n' + clusterDot;
                clusterDot = '';
            }

            var graphLabel = '';
            var totalCount = 0;
            var simulationCount = 0;

            var ordinal = 0;

            // walk
            for (var i = 0; i < __ns._debugWalk.length; i++) {
                var walk = __ns._debugWalk[i];

                var elementId = walk[0];

                if (elementId == __ns._debugTraceId) {
                    if (walk[1][0] == 'simulationUrl') {
                        graphLabel = walk[1][1];
                    } else if (walk[1][0] == 'timeOutTotalElements') {
                        totalCount = walk[1][1];
                    } else if (walk[1][0] == 'timeOutSimulatedElements') {
                        simulationCount = walk[1][1];
                    }

                    continue;
                }

                var nodeLabelText = walk.length > 2 ? walk[2] || null : null;

                if (nodeLabelText) {
                    // \r, \n, \" is disallowed, take first 20 chars
                    var labelText = nodeLabelText.replace('\n', '').replace('\r', '').replace('"', '').trim();

                    labelText = labelText.substring(0, 20).trim();

                    dot += '"' + elementId + '" [label="' + elementId + ':' + labelText + '"];\n';
                }

                var attrs = walk[1];
                var hasEdgeLabel = attrs.length >= 2 && typeof (attrs[1]) === 'string';
                var isDelegatedEvent = attrs.length >= 2 && attrs[1] === true;
                var color = isDelegatedEvent ? 'deepskyblue' : 'maroon';
                var isDashed = attrs.length >= 3 && attrs[2] === true;

                dot += '"' + attrs[0] + '" [shape="triangle", color="' + color + '"]\n';

                var dash = isDashed ? ', style="dashed"' : '';

                ordinal++;
                var labelPrefix = ordinal.toString();

                if (hasEdgeLabel && !isDelegatedEvent) {
                    dot += '"' +
                        elementId +
                        '" -> "' +
                        attrs[0] +
                        '" [color="' +
                        color +
                        '", label="' +
                        labelPrefix +
                        ' ' +
                        attrs[1] +
                        '"' +
                        dash +
                        ']\n';
                } else {
                    dot += '"' +
                        elementId +
                        '" -> "' +
                        attrs[0] +
                        '" [color="' +
                        color +
                        '", label="' +
                        labelPrefix +
                        '"' +
                        dash +
                        ']\n';
                }

                if (dot.length > maxPieceLength) {
                    ret.push(dot);
                    dot = '';
                }
            }

            // detached nodes.
            for (var i = 0; i < __ns._debugDetached.length; i++) {
                var elementId = __ns._debugDetached[i];

                dot += '"' + elementId + '" [style="dashed", color="red"]\n';
            }

            // CSS-excluded nodes.
            for (var i = 0; i < __ns._debugCssExcluded.length; i++) {
                var elementId = __ns._debugCssExcluded[i];

                dot += '"' + elementId + '" [style="filled", fillcolor="pink"]\n';
            }

            // graph label.
            if (graphLabel && graphLabel.length > 0) {
                if (totalCount > 0 && simulationCount > 0) {
                    dot += 'graph [label="' +
                        simulationCount.toString() +
                        ' / ' +
                        totalCount.toString() +
                        ' elements: ' +
                        graphLabel +
                        '", labelloc=t]\n';
                } else {
                    dot += 'graph [label="' + graphLabel + '", labelloc=t]\n';
                }
            }

            dot += '\n';

            // Set hash sizes to state.
            __ns._state['visitedHashCount'] = __ns._hashes.size;
            __ns._state['parsedHashCount'] = __ns._parsedHashes.size;

            if (__ns._hashes.size > 0) {
                dot += '# Visited hashes: \n';

                __ns._hashes.forEach(function (value) {
                    dot += '# ' + value + '\n';
                });
            }

            dot += '\n';

            if (__ns._parsedHashes.size > 0) {
                dot += '# Parsed hashes: \n';

                __ns._parsedHashes.forEach(function (value) {
                    dot += '# ' + value + '\n';
                });
            }

			/*
			_elementIdDfsLevel:

		"DIV-q5lwD-95" -> "1" [color="pink"]
		"DIV-TggNR-184" -> "1" [color="pink"]
		"DIV-OQFqk-274" -> "1" [color="pink"]
		"DIV-Yo68k-363" -> "1" [color="pink"]
		"DIV-DXRf3-453" -> "1" [color="pink"]

		"1" [fillcolor="red", color="green", fontcolor="white", style="filled", label="dfslevel 1"]
			*/

            var levels = {};

            for (var key in __ns._elementIdDfsLevel) {
                if (!__ns._elementIdDfsLevel.hasOwnProperty(key)) {
                    continue;
                }

                dot += '"' + key + '" -> "' + __ns._elementIdDfsLevel[key] + '" [color="pink"]\n';

                levels[__ns._elementIdDfsLevel[key]] = 1;
            }

            for (var key in levels) {
                if (!levels.hasOwnProperty(key)) {
                    continue;
                }

                dot += '\n"' +
                    key +
                    '" [fillcolor="red", color="green", fontcolor="white", style="filled", label="dfslevel ' +
                    key +
                    '"]';
            }

            for (var i = 0; i < __ns._debugRaw.length; i++) {
                var log = __ns._debugRaw[i];

                dot += '# ' + log + '\n';
            }

            dot += '\n}';

            dot += '# CONTENT: ' + btoa(unescape(encodeURIComponent(document.documentElement.outerHTML)));

            if (COLLECT_VERBOSE_DEBUGINFO) {
                if (__ns._options.smartDfsEnabled) {
                    if (__ns._dfsStats.length > 0) {
                        // Add as comments.
                        for (var i = 0; i < __ns._dfsStats.length; i++) {
                            var item = __ns._dfsStats[i];

                            dot += '# ' + item[2] + ' ' + JSON.stringify(item[0]) + '\n';
                            dot += '#  ' + item[3] + '\n';
                        }
                    }

                    dot += '# ' + JSON.stringify(__ns._dfsSmartStats) + '\n';
                }
            }

            ret.push(dot);
            dot = '';

            if (_debugFileSystem) {
                dot = ret.join('');
                _debugFileSystem.root.getFile('dp.dot',
                    { create: true },
                    function (fileEntry) {

                        var blob = new Blob([dot], { type: 'text/plain' });

                        // Create a FileWriter object for our FileEntry (log.txt).
                        fileEntry.createWriter(function (fileWriter) {

                            var truncated = false;

                            fileWriter.onwriteend = function (e) {
                                if (!truncated) {
                                    this.truncate(blob.size);
                                    truncated = true;
                                }

                                console.log('Write completed.');
                            };

                            fileWriter.onerror = function (e) {
                                console.log('Write failed: ' + e.toString());
                            };

                            fileWriter.write(blob);

                        },
                            errorHandler);

                    },
                    errorHandler);
            } else {
                return ret;
            }
        },

        _getDebugName: function (element, elementId) {

            if (!element) {
                return null;
            }

            var prefix = element.tagName;

            if (element.tagName === 'INPUT') {
                prefix += '_' + element.type.toLowerCase();
            }

            prefix += "-";

            return prefix + (elementId || __ns._identify(element));
        },

        /** Push a DOM adding relation to the relevant debug array. */
        _pushAddingRelation: function (triggerer, self, groupId) {
            if (!__ns._options.collectDotifyInfo) {
                return;
            }

            if (!triggerer) {
                return;
            }

            var parentId = __ns._getDebugName(triggerer);
            var selfId = __ns._getDebugName(self);

            __ns._debugAddingRelations.push([parentId, selfId, groupId]);
        },

        /** Push a DOM parent-child relation to the relevant debug array. */
        _pushRelation: function (parent, self, annotation) {
            if (!__ns._options.collectDotifyInfo) {
                return;
            }

            if (!parent) {
                return;
            }

            var parentId = __ns._getDebugName(parent);
            var selfId = __ns._getDebugName(self);

            if (annotation && annotation.length > 0) {
                __ns._debugRelations.push([parentId, selfId, annotation]);
            } else {
                __ns._debugRelations.push([parentId, selfId]);
            }
        },

        /** Push a DOM traversal step to the relevant debug array. */
        _pushWalkStep: function (element, attrs) {
            if (!__ns._options.collectDotifyInfo) {
                return;
            }

            var elementId = __ns._getDebugName(element);
            var label = element.innerText;

            __ns._debugWalk.push([elementId, attrs, label]);
        },

        /** Push a trace information step to the relevant debug array. */
        _pushTraceStep: function (attrs) {
            if (!__ns._options.collectDotifyInfo) {
                return;
            }

            __ns._debugWalk.push([__ns._debugTraceId, attrs]);

            if (CONSOLE_DEBUG) {
                console.log('tracestep: ' + attrs[0] + ': ' + attrs[1]);
            }
        },

        /** Push a detached node information step to the relevant debug array. */
        _pushDetachedNode: function (element, elementId) {
            if (!__ns._options.collectDotifyInfo) {
                return;
            }

            __ns._debugDetached.push(__ns._getDebugName(element, elementId));

            __ns._state['detachedNodeCount']++;
        },

        /** Push an CSS-excluded node to the relevant debug array. */
        _pushCssExclusion: function (element) {
            if (!__ns._options.collectDotifyInfo) {
                return;
            }

            var elementId = __ns._getDebugName(element);

            __ns._debugCssExcluded.push(elementId);
        },

        /** Check if the simulation has timed out. */
        _isSimulationTimedOut: function (noLogging) {
            if (__ns._timeoutMilliseconds | 0) {
                var elapsed = new Date().getTime() - __ns.simulationStart.getTime();
                var isTimedOut = elapsed >= __ns._timeoutMilliseconds;

                if (isTimedOut && (noLogging !== true)) {
                    __ns._pushTraceStep(['timeOutTotalElements', __ns._allElements.length]);
                    __ns._pushTraceStep(['timeOutSimulatedElements', __ns._state['elementSimulationCount']]);

                    __ns._state['simulateTimeoutReached'] = true;

                    console.log('Time-out detected.');
                }

                return isTimedOut;
            }

            return false;
        },

        /** Holds a reference to the MutationSummary object. */
        _observer: null,

        _formValuesMutationObserver: null,

        _wholeDocument: null,

        // Filled in simulateDocument function.
        _standardEventNames: new Set(),

        /** This method may be slow and not intended for use within a simulation for every element. Here be :dragon: */
        _isElementVisibleSlow: function (elem) {
            "use strict";

            // https://stackoverflow.com/a/41698614/128002
            if (!(elem instanceof Element)) {
                if (CONSOLE_DEBUG) {
                    console.log(elem);
                    console.log("^ elem is not Element.");
                }

                // Assume visible on error.
                return true;
            }

            const style = getComputedStyle(elem);
            if (style.display === 'none') return false;
            if (style.visibility !== 'visible') return false;
            if (style.opacity < 0.1) return false;
            if (elem.offsetWidth +
                elem.offsetHeight +
                elem.getBoundingClientRect().height +
                elem.getBoundingClientRect().width ===
                0) {
                return false;
            }
            const elemCenter = {
                x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
                y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
            };
            if (elemCenter.x < 0) return false;
            if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
            if (elemCenter.y < 0) return false;
            if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
            let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
            do {
                if (pointContainer === elem) return true;
            } while (pointContainer = pointContainer.parentNode);
            return false;
        },

        /** Main entry point, performs simulation on the current document. */
        'simulateDocument': function (timeoutMilliseconds,
            intereventTimeout,
            dfsLimit,
            debugDoNotTriggerEvents,
            debugDoNotCallGetEventListeners,
            formValues,
            skipThreshold,
            skipElementCount,
            bailThreshold,
            smartDfsEnabled,
            smartDfsMinElementCount,
            smartDfsMinTagGroupCount,
            smartDfsMaxSampleCount,
            smartDfsSimilarityDistance,
            forceTimeouts,
            nonDfsTraversalReversed,
            clearAllIntervalsTimeout,
            extractResources,
            collectDotifyInfo,
            favorPostMessageOverSetTimeout,
            exclusionCssSelector,
            filterDocumentEvents,
            preSimulationWait,
            maxOptionElementsPerSelect,
            filterColonEvents,
            ignoreDocumentEvents) {

            if (CONSOLE_DEBUG) {
                console.log('simulateDocument');
                console.log('simulateDocument location.href: ' + location.href);
                console.log('simulateDocument document.referrer: ' + document.referrer);
            }

            __ns.simulationStart = new Date();
            __ns._timeoutMilliseconds = timeoutMilliseconds;

            __ns._timeStart('simulateDocument');

            if (typeof (intereventTimeout) != 'undefined') {
                __ns._options.intereventTimeout = intereventTimeout;
            }

            if (typeof (dfsLimit) != 'undefined') {
                __ns._options.dfsLimit = dfsLimit;
            }

            if (typeof (debugDoNotTriggerEvents) != 'undefined') {
                __ns._options._debugDoNotTriggerEvents = debugDoNotTriggerEvents;
            }

            if (typeof (debugDoNotCallGetEventListeners) != 'undefined') {
                __ns._options._debugDoNotCallGetEventListeners = debugDoNotCallGetEventListeners;
            }

            if (typeof (formValues) != 'undefined') {
                if (formValues == null) {
                    formValues = [];
                }

                __ns._options.formValues = formValues;

                __ns._matchLabels = false;
                __ns._matchPlaceholders = false;
                __ns._matchIds = false;

                for (var i = 0; i < __ns._options.formValues.length; i++) {
                    formValue = __ns._options.formValues[i];

					/*
					Name = 1,
				Label = 2,
				Placeholder = 4,
				Id = 8,
					*/

                    if ((formValue['MatchTarget'] & 2) === 2) {
                        __ns._matchLabels = true;
                    }

                    if ((formValue['MatchTarget'] & 4) === 4) {
                        __ns._matchPlaceholders = true;
                    }

                    if ((formValue['MatchTarget'] & 8) === 8) {
                        __ns._matchIds = true;
                    }
                }
            }

            if (typeof (skipThreshold) != 'undefined') {
                __ns._options.skipThreshold = skipThreshold;
            }

            if (typeof (skipElementCount) != 'undefined') {
                __ns._options.skipElementCount = skipElementCount;
            }

            if (typeof (bailThreshold) != 'undefined') {
                __ns._options.bailThreshold = bailThreshold;
            }

            if (typeof (smartDfsEnabled) != 'undefined') {
                __ns._options.smartDfsEnabled = smartDfsEnabled;
            }

            if (typeof (smartDfsMinElementCount) != 'undefined') {
                __ns._options.smartDfsMinElementCount = smartDfsMinElementCount;
            }

            if (typeof (smartDfsMinTagGroupCount) != 'undefined') {
                __ns._options.smartDfsMinTagGroupCount = smartDfsMinTagGroupCount;
            }

            if (typeof (smartDfsMaxSampleCount) != 'undefined') {
                __ns._options.smartDfsMaxSampleCount = smartDfsMaxSampleCount;
            }

            if (typeof (smartDfsSimilarityDistance) != 'undefined') {
                __ns._options.smartDfsSimilarityDistance = smartDfsSimilarityDistance;
            }

            if (typeof (forceTimeouts) != 'undefined') {
                __ns._options.forceTimeouts = forceTimeouts;
            }

            if (typeof (nonDfsTraversalReversed) != 'undefined') {
                __ns._options.nonDfsTraversalReversed = nonDfsTraversalReversed;
            }

            if (typeof (clearAllIntervalsTimeout) != 'undefined') {
                __ns._options.clearAllIntervalsTimeout = clearAllIntervalsTimeout;
            }

            if (typeof (extractResources) != 'undefined') {
                __ns._options.extractResources = extractResources;
            }

            if (typeof (collectDotifyInfo) != 'undefined') {
                __ns._options.collectDotifyInfo = collectDotifyInfo;
            }

            if (typeof (favorPostMessageOverSetTimeout) != 'undefined') {
                __ns._options.favorPostMessageOverSetTimeout = favorPostMessageOverSetTimeout;
            }

            if (typeof (exclusionCssSelector) != 'undefined') {
                // Example: {'value': '#logout'}
                if (exclusionCssSelector && typeof exclusionCssSelector['value'] !== 'string') {
                    console.error('Invalid selector.');
                }

                __ns._options.exclusionCssSelector = exclusionCssSelector['value'];
            }

            if (typeof (filterDocumentEvents) != 'undefined') {
                __ns._options.filterDocumentEvents = filterDocumentEvents;
            }

            if (typeof (preSimulationWait) != 'undefined') {
                __ns._options.preSimulationWait = preSimulationWait;
            }

            if (typeof (maxOptionElementsPerSelect) != 'undefined') {

                if (maxOptionElementsPerSelect < 1) {
                    maxOptionElementsPerSelect = 1;
                }

                __ns._options.maxOptionElementsPerSelect = maxOptionElementsPerSelect;
            }

            if (typeof (filterColonEvents) != 'undefined') {
                __ns._options.filterColonEvents = filterColonEvents;
            }

            if (typeof (ignoreDocumentEvents) != 'undefined') {
                __ns._options.ignoreDocumentEvents = ignoreDocumentEvents;
            }

            {
                var options = {
                    'timeoutMilliseconds': __ns._timeoutMilliseconds,
                    'skipThreshold': __ns._options.skipThreshold,
                    'skipElementCount': __ns._options.skipElementCount,
                    'bailThreshold': __ns._options.bailThreshold,
                    'simulateThreshold': __ns._options.simulateThreshold,
                    'intereventTimeout': __ns._options.intereventTimeout,
                    'dfsLimit': __ns._options.dfsLimit,
                    'smartDfsEnabled': __ns._options.smartDfsEnabled,
                    'smartDfsMinElementCount': __ns._options.smartDfsMinElementCount,
                    'smartDfsMinTagGroupCount': __ns._options.smartDfsMinTagGroupCount,
                    'smartDfsMaxSampleCount': __ns._options.smartDfsMaxSampleCount,
                    'smartDfsSimilarityDistance': __ns._options.smartDfsSimilarityDistance,
                    'forceTimeouts': __ns._options.forceTimeouts,
                    'nonDfsTraversalReversed': __ns._options.nonDfsTraversalReversed,
                    'clearAllIntervalsTimeout': __ns._options.clearAllIntervalsTimeout,
                    'extractResources': __ns._options.extractResources,
                    'collectDotifyInfo': __ns._options.collectDotifyInfo,
                    'favorPostMessageOverSetTimeout': __ns._options.favorPostMessageOverSetTimeout,
                    'exclusionCssSelector': __ns._options.exclusionCssSelector,
                    'filterDocumentEvents': __ns._options.filterDocumentEvents,
                    'preSimulationWait': __ns._options.preSimulationWait,
                    'maxOptionElementsPerSelect': __ns._options.maxOptionElementsPerSelect,
                    'filterColonEvents': __ns._options.filterColonEvents,
                    'ignoreDocumentEvents': __ns._options.ignoreDocumentEvents,
                };

                __ns['_effectiveOptions'] = JSON.stringify(options);
            }

            if (!DISABLE_COLLECTION) {
                __ns._collectFormDefaultActions(document.forms);
            }

            __ns._pushTraceStep(['simulationStart', __ns.simulationStart]);
            __ns._pushTraceStep(['simulationUrl', location.href]);

            var mouseEventNames = [
                'click', 'dblclick', 'mouseover', 'mouseup', 'mousedown', 'mouseenter', 'mouseleave', 'mouseout',
                'mousemove', 'contextmenu'
            ];
            var keyboardEventNames = ['keydown', 'keypress', 'keyup'];
            var htmlEventNames = ['select', 'change', 'focus', 'blur'];
            var i;

            for (i = 0; i < mouseEventNames.length; i++) {
                __ns._eventCreators[mouseEventNames[i]] = __ns._createMouseEvent;
                __ns._standardEventNames.add(mouseEventNames[i]);
            }

            for (i = 0; i < keyboardEventNames.length; i++) {
                __ns._eventCreators[keyboardEventNames[i]] = __ns._createKeyboardEvent;
                __ns._standardEventNames.add(keyboardEventNames[i]);
            }

            for (i = 0; i < htmlEventNames.length; i++) {
                __ns._eventCreators[htmlEventNames[i]] = __ns._createHtmlEvent;
                __ns._standardEventNames.add(htmlEventNames[i]);
            }

            __ns._observer = new __ns._mutationSummary({
                'callback': __ns._processNewElements,
                'queries': [{ 'element': '*' }]
            });

            if (!DISABLE_COLLECTION) {
                __ns._hookCookieSetter();
            }

            var startSimulation = function () {
                if (DEBUG_DELAY_START) {
                    __ns._debugger();
                }

                __ns._wholeDocument = document.documentElement.outerHTML;

                if (CONSOLE_DEBUG) {
                    console.log('startSimulation');
                }

                __ns._timeStart('simulation_all');

                if (__ns._options.clearAllIntervalsTimeout > 0) {
                    __ns._setTimeout(__ns._clearAllSetIntervals, __ns._options.clearAllIntervalsTimeout);
                }

                __ns.searchLoginForms();

                // Collect hashes.
                var allAnchors = Array.prototype.slice.call(document.getElementsByTagName('A'));
                var allLis = Array.prototype.slice.call(document.getElementsByTagName('LI'));
                var hrefElements = allAnchors.concat(allLis);

                __ns._collectHashes(hrefElements);

                if (document.forms.length > 0) {
                    __ns._submitDocumentForm(0);
                } else {
                    __ns._simulate('simulateDocument');
                }
            };

            preSimulationWait = (__ns._options.preSimulationWait | 0) + (DEBUG_DELAY_START ? 5000 : 0);

            if (preSimulationWait > 0) {
                __ns._setTimeout(startSimulation, preSimulationWait);
            } else {
                __ns._waitUntilPendingComplete(startSimulation, 10, 3000);
            }

            __ns._timeEnd('simulateDocument');
        },

        _collectHashes: function (hrefElements) {
            for (var i = 0; i < hrefElements.length; i++) {
                var hrefElement = hrefElements[i];

                var href = hrefElement.getAttribute('href');

                if (href) {
                    if (__ns._isValidHash(href)) {
                        __ns._parsedHashes.add(href);
                    }
                } else {
                    // Try our luck with the non-standard "data-href" attribute.
                    var dataHref = hrefElement.dataset["href"];

                    if (dataHref &&
                        (typeof dataHref === 'string') &&
                        dataHref.length >= 1) {

                        if (!dataHref.startsWith('#')) {
                            dataHref = '#' + dataHref;
                        }

                        __ns._parsedHashes.add(dataHref);
                    }
                }
            }
        },

        _isExcludedByCssSelector: function (element) {
            if (typeof __ns._options.exclusionCssSelector === 'undefined') {
                return false;
            }

            if (__ns._options.exclusionCssSelector === '') {
                return false;
            }

            if (__ns._options.exclusionCssSelector === '*') {
                return true;
            }

            // :warning: This may be slow if there are many matches, i.e. if exclusionCssSelector is not specific enough.
            var matches = element.ownerDocument.querySelectorAll(__ns._options.exclusionCssSelector);

            for (var i = 0; i < matches.length; i++) {
                var excludedElement = matches[i];

                if (excludedElement.contains(element)) {
                    return true;
                }
            }

            return false;
        },

        /** Get elements by tagName with event listeners. */
        _getTagElementsWithListeners: function (wnd, tagName, allElements, checkDelegated) {
            var valid = __ns._tryCatchIgnore(function () {
                if (!wnd) {
                    console.log('Error: window not found.');

                    return false;
                }

                if (!wnd.document) {
                    console.log('Error: document not found.');

                    return false;
                }

                return true;
            });

            if (!valid) {
                return;
            }

            var elements = wnd.document.getElementsByTagName(tagName);

            __ns._getElementsWithListeners(wnd, elements, allElements, checkDelegated);
        },

        /** Get elements with event listeners. */
        _getElementsWithListeners: function (wnd, elements, allElements, checkDelegated) {
            var autoCheckDelegated = typeof (checkDelegated) === 'undefined';

            for (var i = 0; i < elements.length; i++) {
                var el = elements[i];

                if (!__ns._isElementSimulated(el) && __ns._tagsToAnalyzeCache[el.tagName.toLowerCase()]) {
                    var listeners = {};
                    __ns._addEventListenerNames(listeners, wnd, el, '');

                    if (autoCheckDelegated) {
                        var tagName = el.tagName.toLowerCase();

                        checkDelegated = __ns._checkDelegatedCache[tagName] === true;
                    }

                    if (checkDelegated) {
                        var parentNode = el.parentNode;

                        while (parentNode) {
                            __ns._addEventListenerNames(listeners, wnd, parentNode, __ns._identify(parentNode));

                            parentNode = parentNode.parentNode;
                        }
                    }

                    if (Object.keys(listeners).length > 0 ||
                        __ns._isElementSimulatable(el) ||
                        el.tagName === 'BUTTON' ||
                        el.tagName === 'SELECT' ||
                        (el.tagName === 'INPUT' &&
                            el.type &&
                            (el.type.toUpperCase() === 'SUBMIT' || el.type.toUpperCase() === 'BUTTON'))) {
                        if (el.tagName === 'SELECT') {

                            var optionCount = el.options.length;

                            if (optionCount > __ns._options.maxOptionElementsPerSelect) {
                                __ns._state['maxOptionElementHit']++;

                                optionCount = __ns._options.maxOptionElementsPerSelect;

                                // We need this fresh everytime, may be changed with JS.
                                var allLiElements = document.getElementsByTagName('LI');

                                __ns._detectAndExcludeOptionLikeLiElements(el, el.options, allLiElements, optionCount);
                            }

                            for (var o = 0; o < el.options.length; o++) {
                                var option = el.options[o];

                                if (o < optionCount) {
                                    if (__ns._options.nonDfsTraversalReversed) {
                                        allElements.unshift({ el: option, listeners: listeners });
                                    } else {
                                        allElements.push({ el: option, listeners: listeners });
                                    }
                                } else {
                                    // Mark rest as simulated.
                                    __ns._setElementSimulated(option);
                                }
                            }
                        } else if (el.tagName === 'LI') {
                            // Check for select2 specifically.
                            __ns._detectAndExcludeSelect2(el);
                        } else if (el.tagName === 'UL') {
                            console.log('UL DETECTED');

                            // We need this fresh everytime, may be changed with JS.
                            var liElements = el.getElementsByTagName('LI');

                            var optionCount = liElements.length;

                            console.log(optionCount);
                            console.log('max: ' + __ns._options.maxOptionElementsPerSelect);

                            if (optionCount > __ns._options.maxOptionElementsPerSelect) {
                                __ns._state['maxOptionElementHit']++;

                                optionCount = __ns._options.maxOptionElementsPerSelect;

                                // Check for non-select UL-LI elements.
                                __ns._detectAndExcludeOptionLikeLiElements(el, liElements, liElements, optionCount);
                            }
                        }

                        if (__ns._options.nonDfsTraversalReversed) {
                            allElements.unshift({ el: el, listeners: listeners });
                        } else {
                            allElements.push({ el: el, listeners: listeners });
                        }
                    } else {
                        __ns._setElementSimulated(el);
                    }
                }
            }
        },

        _detectAndExcludeSelect2: function (el) {

            if (!el.classList.contains('select2-results__option')) {
                return;
            }

            // Get UL/OL parent.
            var container;
            var liParent = el.parentElement;

            while (liParent) {
                if (liParent.tagName === 'UL' || liParent.tagName === 'OL') {
                    container = liParent;

                    break;
                }

                liParent = liParent.parentElement;
            }

            if (container) {
                if (__ns._isSelectAnalyzed(container)) {
                    return;
                }

                var liCount = 0;
                var nodeList = container.getElementsByTagName('*');
                var maxCount = __ns._options.maxOptionElementsPerSelect;
                var suppressed = false;

                // skip optionCount li elements.
                for (var j = 0; j < nodeList.length; j++) {
                    var candidate = nodeList[j];

                    if (candidate.tagName === 'LI') {
                        liCount++;

                        if (liCount > maxCount) {
                            suppressed = true;
                            __ns._setElementSimulated(candidate);
                            __ns._state['suppressedOptionLiCount']++;
                        }
                    }
                }

                if (suppressed) {
                    __ns._state['suppressedOptionUlCount']++;
                }

                __ns._setSelectAnalyzed(container);
            }
        },

        _detectAndExcludeOptionLikeLiElements: function (el, elChildren, elements, optionCount) {

            if (__ns._isSelectAnalyzed(el)) {
                return;
            }

            if (__ns._isElementVisibleSlow(el)) {
                // If select is visible, there is nothing to detect.
                return;
            }

            // Do not need to suppress any LI elements if the count doesn't exceed the optionCount.
            // Ref: FB#54524
            if (elChildren.length > optionCount) {
                // Consider SELECT tag for ul-li type selects.
                var firstExcludedOption = elChildren[optionCount];
                var optionText = firstExcludedOption.innerText;

                function searchLiElements(nodeList, optionText) {
                    var liElements = [];

                    for (var j = 0; j < nodeList.length; j++) {
                        var candidate = nodeList[j];

                        if (candidate.tagName === 'LI' && candidate.innerText === optionText) {
                            liElements.push(candidate);
                        }
                    }

                    return liElements;
                }

                var liElements = searchLiElements(elements, optionText);

                if (liElements.length > 0) {
                    // Potentially, bootstrap-select etc. is used. First first ul parent.
                    for (var k = 0; k < liElements.length; k++) {
                        var liElement = liElements[k];

                        var container;
                        var liParent = liElement.parentElement;

                        while (liParent) {
                            if (liParent.tagName === 'UL' || liParent.tagName === 'OL') {
                                container = liParent;

                                break;
                            }

                            liParent = liParent.parentElement;
                        }

                        if (container) {
                            var hasMatch = false;

                            // Check 5 more element texts to be "sure".
                            for (var m = 0; m < 5 && optionCount - m >= 0; m++) {
                                var validatingOption = elChildren[optionCount - m];

                                if (typeof validatingOption === 'undefined') {
                                    // Extremely unlikely yet do not break the simulation.
                                    continue;
                                }

                                var validatingOptionText = validatingOption.innerText;

                                hasMatch =
                                    searchLiElements(container.getElementsByTagName("*"), validatingOptionText)
                                    .length >
                                    0;

                                if (!hasMatch) {
                                    break;
                                }
                            }

                            if (hasMatch) {
                                __ns._state['suppressedOptionUlCount']++;

                                // Impose maxOptionElementsPerSelect restrictions to li elements.
                                // Assume order of li elements and option elements are the same.
                                var liCount = 0;
                                var childNodes = container.getElementsByTagName("*");
                                for (var n = 0; n < childNodes.length; n++) {
                                    var childNode = childNodes[n];

                                    if (childNode.tagName === 'LI') {
                                        liCount++;

                                        if (liCount > optionCount) {
                                            // Mark li and all its children as simulated.
                                            __ns._setElementSimulated(childNode);
                                            __ns._state['suppressedOptionLiCount']++;

                                            var children = childNode.getElementsByTagName("*");
                                            for (var t = 0; t < children.length; t++) {
                                                var liChild = children[t];

                                                __ns._setElementSimulated(liChild);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (el.tagName === 'SELECT') {
                // Mark UL-OL elements too.
                var ulChildren = el.getElementsByTagName('UL');

                for (var n = 0; n < ulChildren.length; n++) {
                    var ulChild = ulChildren[n];

                    __ns._setSelectAnalyzed(ulChild);
                }

                var olChildren = el.getElementsByTagName('OL');

                for (var n = 0; n < olChildren.length; n++) {
                    var olChild = olChildren[n];

                    __ns._setSelectAnalyzed(olChild);
                }
            }

            __ns._setSelectAnalyzed(el);
        },

        /** Add event listener names from getEventListeners method. */
        _addEventListenerNames: function (listenerNames, wnd, el, source) {
            if (__ns._options._debugDoNotCallGetEventListeners) {
                return;
            }

            var filterEvents = false;

            if (source === '#document') {
                if (__ns._options.ignoreDocumentEvents) {
                    __ns._state['ignoredDocumentEvent']++;

                    return;
                }

                if (__ns._options.filterDocumentEvents) {
                    filterEvents = true;
                }
            }

            if (wnd.eoapi) {
                var listeners = wnd.eoapi.getEventListeners(el);
                var keys = Object.keys(listeners);

                var filterColons = __ns._options.filterColonEvents;

                for (var i = 0; i < keys.length; i++) {
                    var name = keys[i];

                    if (filterEvents && __ns._standardEventNames.has(name)) {
                        __ns._state['filteredDocumentEvent']++;

                        continue;
                    }

                    if (filterColons && name.indexOf(':') !== -1) {
                        // Exclude "namespaced" framework events.
                        continue;
                    }

                    listenerNames[name] = source;
                }
            }
        },

        _fillSimulatableElements: function (elements) {
            // build _allElements array with all analyzable elements and their event listeners.
            for (var i = 0; i < __ns._tagsToAnalyze.length; i++) {
                var tagName = __ns._tagsToAnalyze[i].tagName;
                var checkDelegated = __ns._tagsToAnalyze[i].checkDelegated;
                __ns._getTagElementsWithListeners(window, tagName, elements, checkDelegated);

                for (var j = 0; j < frames.length; j++) {
                    var frame = frames[j];
                    __ns._getTagElementsWithListeners(frame, tagName, elements, checkDelegated);
                }
            }

            if (CONSOLE_DEBUG) {
                console.log('elements.length: ' + elements.length.toString());
                console.log('dfsElements.length: ' + __ns._dfsElements.length.toString());
            }
        },

        _maxRescanCount: 10,
        _rescanCount: 0,

        _processResidualElements: function (elements) {

            var nonsimulatedElements = [];

            __ns._rescanCount++;

            if (CONSOLE_DEBUG) {
                console.log('_processResidualElements _rescanCount: ' + __ns._rescanCount);
            }

            if (__ns._rescanCount < __ns._maxRescanCount) {
                // Process residual DFS elements.
                for (var i = 0; i < __ns._dfsElements.length; i++) {
                    __ns._queueTraverseInterevent(function () { __ns._traverseDfs(0); },
                        ConsoleComments.residual_dfs,
                        false);
                }

                var allElements = [];
                __ns._fillSimulatableElements(allElements);

                // Process non-simulated, non-DFS elements.
                for (var i = 0; i < allElements.length; i++) {
                    var element = allElements[i];

                    if (!__ns._isElementSimulated(element.el)) {
                        nonsimulatedElements.push(element);
                    }
                }
            } else {
                __ns._requestExit(ConsoleComments.exitRequestReason_RescanLimitExceeded);

                __ns._queueTraverse(function () { __ns._simulate(ConsoleComments.rescanLimitExceeded); },
                    __ns.TRAVERSE_EXITREQUESTED_TIMEOUT,
                    ConsoleComments.rescanLimitExceeded);
            }

            if (nonsimulatedElements.length === 0) {
                if (elements) {
                    elements.length = 0;
                }

                if (__ns._dfsElements.length === 0) {
                    __ns._canProcessResiduals = false;
                    __ns._requestExit(ConsoleComments.exitRequestReason_ResidualElementsExhausted);
                }

                __ns._queueTraverse(function () { __ns._simulate(ConsoleComments.rescanPossible); },
                    __ns.TRAVERSE_EXITREQUESTED_TIMEOUT,
                    ConsoleComments.postResidual);
            } else {
                __ns._allElements = nonsimulatedElements;
                __ns._state['resimulateCount']++;

                __ns._queueTraverse(function () { __ns._simulateElement(__ns._allElements, 0); },
                    0,
                    ConsoleComments.resimulate_required);
            }
        },

        _canProcessResiduals: true,
        _canForceVisitNewHashes: false,
        _forceHashChangeDisabled: false,
        _pendingHashChange: false, // TODO fix this with a state machine in _simulate.
        _pendingScroll: true,

        /** Perform simulation of the document after initialization is completed in the simulateDocument method. */
        _simulate: function (debugReason) {
            __ns._pushTraceStep(['simulate', __ns._state['elementSimulationCount']]);
            if (CONSOLE_DEBUG) {
                console.log('_simulate: ' + debugReason);
            }
            __ns._state['simulateCount']++;

            var isTimedOut = __ns._isSimulationTimedOut(true);
            var isBailThresholdReached = __ns._state['bailThresholdReached'];

            if (!isTimedOut && !__ns._forceHashChangeDisabled) {
                if (__ns._isExitRequested && !isBailThresholdReached &&
                    __ns._rescanCount < __ns._maxRescanCount &&
                    __ns._canProcessResiduals) {

                    if (CONSOLE_DEBUG) {
                        console.log('try rescan: ' + debugReason);
                    }

                    // Quick exit for rescans after the first one.
                    if (__ns._rescanCount > 1 && __ns._allElements.length === 0 && __ns._dfsElements.length === 0) {
                        __ns._canProcessResiduals = false;

                        return;
                    }

                    // If debugReason is index_past_elements, we can rescan the queue for residual elements for the last time.
                    __ns._requestExit(ConsoleComments.exitRequestReason_RescanPossible, false);
                    __ns._isSimulationCompleted = false;

                    __ns._queueTraverse(__ns._processResidualElements,
                        __ns.TRAVERSE_RESIDUALS_TIMEOUT,
                        ConsoleComments.processResidual,
                        false);

                    return;
                }
            }

            __ns._allElements = [];
            __ns._dfsElements = [];

            __ns._fillSimulatableElements(__ns._allElements);

            if (CONSOLE_DEBUG) {
                console.log('isTimedOut: ' + isTimedOut);
                console.log('simulateCount: ' + __ns._state['simulateCount']);
                console.log('__ns._isExitRequested: ' + __ns._isExitRequested);
                console.log('__ns._canForceVisitNewHashes: ' + __ns._canForceVisitNewHashes);
                console.log('__ns._allElements.length: ' + __ns._allElements.length);
                console.log('__ns._forceHashChangeDisabled: ' + __ns._forceHashChangeDisabled);
            }

            // If not timed out, try collected hash URLs.
            if (!isTimedOut &&
                !__ns._forceHashChangeDisabled &&
                __ns._canForceVisitNewHashes &&
                (__ns._allElements.length === 0 || __ns._isExitRequested)) {
                var unvisitedHashes = new Set(__ns._parsedHashes);

                for (var hash of __ns._hashes) {
                    unvisitedHashes.delete(hash);
                }
                if (unvisitedHashes.size > 0) {

                    console.log('visited hashes: ' + __ns._hashes.size + ' / ' + unvisitedHashes.size);

                    __ns._requestExit(ConsoleComments.additionalHashesPresent, false);
                    __ns._isSimulationCompleted = false;

                    // We will change the location.hash and count on SmartDFS handling the addition.
                    for (var hash of unvisitedHashes) {
                        __ns._canForceVisitNewHashes = false;

                        __ns._queueTraverse((function (hash_value) {
                            return function () { window.location.hash = hash_value; }
                        })(hash),
                            __ns.TRAVERSE_FORCEDHASHCHANGE_TIMEOUT /* Wait before hashchange too. */,
                            CONSOLE_DEBUG ? ConsoleComments.navigateHashChange + '-' + hash : '',
                            false);

                        // This queueTraverse should end up in this method(_simulate) after completion.
                        __ns._queueTraverse(function () {
                            __ns._traverseDfs(0);

                            __ns._requestExit(ConsoleComments.additionalHashesPresent, false);
                            __ns._pendingHashChange = true;

                            __ns._queueTraverse(function () {
                                __ns._simulate(ConsoleComments.additionalHashesPresent);
                            },
                                __ns.TRAVERSE_EXITREQUESTED_TIMEOUT * 2,
                                ConsoleComments.additionalHashesPresent);

                            __ns._canForceVisitNewHashes = true;
                        },
                            __ns.TRAVERSE_FORCEDHASHCHANGE_TIMEOUT,
                            ConsoleComments.forcedHashChange,
                            false);

                        __ns._hashes.add(hash);
                        // Break as we only need to change the location once per _simulate.
                        break;
                    }

                    return;
                } else {
                    if (CONSOLE_DEBUG) {
                        console.log('no unvisited hashes detected.');
                    }

                    __ns._pendingHashChange = false;
                    __ns._canForceVisitNewHashes = false;

                    // This can only set to true once, never change it back to false in runtime!.
                    __ns._forceHashChangeDisabled = true;
                }
            }

            if (__ns._isSimulationCompleted) {
                // ignore queued timeouts after completion.
                return;
            }

            var isTimedOut = __ns._isSimulationTimedOut();

            if (isTimedOut) {
                __ns._signalSimulationCompleted(ConsoleComments.completionReason_TimeoutDetected);

                return;
            }

            if (isBailThresholdReached) {
                __ns._signalSimulationCompleted(ConsoleComments.completionReason_ThresholdReached);
            } else if (__ns._allElements.length === 0) {
                // If there a script tag is recently added, consider waiting a bit.
                if (__ns._lastScriptTagAddedAt) {
                    var diff = new Date().getTime() - __ns._lastScriptTagAddedAt;

                    if (diff <= 30000) {
                        // If a script tag has been added in last 30 seconds, wait TRAVERSE_SCRIPTTAGADDED_TIMEOUT.
                        __ns._requestExit(ConsoleComments.scriptTagAdded, false);
                        __ns._canProcessResiduals = true;
                        __ns._isSimulationCompleted = false;
                        __ns._queueTraverse(function () { __ns._simulate(ConsoleComments.rescanPossible); },
                            __ns.TRAVERSE_SCRIPTTAGADDED_TIMEOUT,
                            ConsoleComments.scriptTagAdded + ": " + __ns._lastScriptTagAddedSrc);

                        __ns._lastScriptTagAddedAt = null;
                        __ns._lastScriptTagAddedSrc = null;

                        return;
                    }
                }

                if ((__ns._rescanCount < __ns._maxRescanCount || __ns._pendingHashChange) &&
                    !__ns._forceHashChangeDisabled) {
                    __ns._canForceVisitNewHashes = true;

                    __ns._queueTraverse(function () { __ns._simulate(ConsoleComments.rescanPossibleHash); },
                        __ns.TRAVERSE_EXITREQUESTED_TIMEOUT,
                        ConsoleComments.rescanPossibleHash);

                    return;
                }

                if (__ns._pendingScroll && window.eoapi) {
                    var listeners = window.eoapi.getEventListeners(window);
                    var keys = Object.keys(listeners);

                    if (keys.includes("scroll")) {
                        __ns._pendingScroll = false;

                        window.scrollTo(0, document.body.scrollHeight);

                        __ns._queueTraverse(function () { __ns._simulate(ConsoleComments.rescanAfterScroll); },
                            -1,
                            ConsoleComments.rescanAfterScroll);

                        return;
                    }
                }

                // If there are no elements left, signal simulation completed and return.
                __ns._setTimeout(function () {
                        __ns._signalSimulationCompleted(ConsoleComments.completionReason_ElementsExhausted);
                    }, __ns._options.intereventTimeout);
            } else if (--__ns._options.simulateThreshold <= 0) {
                __ns._state['simulateThresholdReached'] = true;
                __ns._signalSimulationCompleted(ConsoleComments.completionReason_ThresholdReached);
            } else {
                // Push DOM relations for element to be simulated.
                for (var i = 0; i < __ns._allElements.length; i++) {
                    var element = __ns._allElements[i].el;

                    var isSimulated = __ns._isElementSimulated(element);

                    __ns._pushRelation(element.parentElement,
                        element,
                        (isSimulated ? 'simulated' : '') +
                        (__ns._state['simulateCount'] > 1 ? __ns._state['simulateCount'] + '' : ''));
                }

                // Required for indirectly reentrant _simulate invocations.
                __ns._requestExit(ConsoleComments.nonSimulatedElementsPresent, false);

                // Start simulating _allElements.
                __ns._simulateElement(__ns._allElements, 0, false, 0, true);
            }
        },

        /** Method to traverse a DFS sub-simulation. */
        _traverseDfs: function (currentDfsLevel) {
            // Check DFS queue.
            if (__ns._dfsElements.length > 0 && !__ns._state['bailThresholdReached']) {
                var dfsElements = __ns._dfsElements.shift();
                var level = dfsElements.dfsLevel || (currentDfsLevel + 1);

                if (CONSOLE_DEBUG) {
                    console.log('will traverse DFS');
                }

                // Perform a DFS sub-simulation.
                __ns._simulateElement(dfsElements, 0, true, level);
            }
        },

        /** Perform simulation of the elements. */
        _simulateElement: function (elements, index, isDfs, dfsLevel, isFirst) {
            __ns._state['simulateElementCount']++;
            __ns._timeStart('_simulateElement');

            // If dfsLevel is not defined, it is 0.
            if (!dfsLevel) {
                dfsLevel = 0;
            }

            if (isDfs) {
                __ns._state['dfsCount']++;

                __ns._currentDfsLevel = dfsLevel;

                if (dfsLevel > 0 && __ns._state['dfsEffectiveMaxDepth'] < dfsLevel) {
                    __ns._state['dfsEffectiveMaxDepth'] = dfsLevel;
                }

                if (CONSOLE_DEBUG) {
                    console.log('dfs level ' + dfsLevel);
                }

                // DFS level debug information.
                if (index < elements.length) {
                    var elemListeners = elements[index];
                    var elem = elemListeners.el;

                    if (typeof (elem) === 'undefined') {
                        return;
                    }

                    __ns._elementIdDfsLevel[elem.tagName + '-' + __ns._identify(elem)] = dfsLevel;
                }

                if (dfsLevel >= __ns._options.dfsLimit) {
                    // bail. Since this is DFS, do not re-trigger.
                    __ns._state['dfsLimitHit']++;

                    __ns._timeEnd('_simulateElement');
                    return;
                }
            }

            // elements array simulated.
            if (index >= elements.length) {
                __ns._waitUntilPendingComplete(function () {

                    // If index_past_elements and not DFS, process residual DFS elements and non-simulated non-DFS elements.
                    if (!isDfs) {
                        __ns._queueTraverse(__ns._processResidualElements,
                            0 /*__ns.TRAVERSE_RESIDUALS_TIMEOUT */,
                            ConsoleComments.index_past_elements,
                            false);
                    } else {
                        // Resize the elements array to prohibit already-enqueued setTimeout's from executing.
                        elements.length = 0;
                    }
                },
                    10,
                    3000);

                __ns._timeEnd('_simulateElement');
                return;
            }

            if (__ns._isSimulationTimedOut()) {
                var hasElements = elements.length > 0;

                // timed-out.
                elements.length = 0;

                __ns._requestExit(ConsoleComments.exitRequestReason_TimeoutDetected);

                if (hasElements) {
                    __ns._queueTraverse(function () { __ns._simulate(ConsoleComments.timed_out_1); },
                        __ns.TRAVERSE_EXITREQUESTED_TIMEOUT,
                        ConsoleComments.timed_out_1);
                }

                __ns._timeEnd('_simulateElement');
                return;
            }

            if (__ns._isExitRequested) {
                if (CONSOLE_DEBUG) {
                    console.log((isDfs ? 'DFS ' : '') + 'exit request caught.');
                }

                elements.length = 0;
                __ns._allElements.length = 0;

                __ns._queueTraverse(
                    function () { __ns._simulate(ConsoleComments.exit_request_catched_simulateElement); },
                    __ns.TRAVERSE_EXITREQUESTED_TIMEOUT,
                    ConsoleComments.exit_request_catched_simulateElement);

                __ns._timeEnd('_simulateElement');
                return;
            }

            var elWithListeners = elements[index];
            var el = elWithListeners.el;

            if (CONSOLE_DEBUG) {
                console.log(el);
                console.log('^ current');
            }

            var nextElement = 1;

            // Method to traverse next element.
            var traverseNext = function (nextElem, currentDfsLevel) {

                var isInDfs = currentDfsLevel && currentDfsLevel > 0;

                if (nextElem > 0) {
                    var commentAddition = CONSOLE_DEBUG
                        ? ' isDfs: ' +
                        (isInDfs ? '1' : '0') +
                        ' elems: ' +
                        elements.length.toString() +
                        ' i:' +
                        (index + nextElem).toString()
                        : '';

                    __ns._queueTraverse(function () {
                            __ns._simulateElement(elements, index + nextElem, isInDfs, currentDfsLevel);
                        },
                        0,
                        ConsoleComments.traverseNext + commentAddition,
                        isInDfs);
                } else {
                    elements.length = 0;

                    if (!isInDfs) {
                        __ns._requestExit(ConsoleComments.exitRequestReason_TraverseNext);

                        __ns._queueTraverse(function () {
                                __ns._simulate(ConsoleComments.traverseNext_exitRequested);
                            },
                            __ns.TRAVERSE_EXITREQUESTED_TIMEOUT,
                            ConsoleComments.traverseNext_exitRequested);
                    }

                    return;
                }
            };

            // Excluded by CSS?
            if (__ns._isExcludedByCssSelector(el)) {
                __ns._state['excludedByCss']++;

                // mark as simulated and skip.
                __ns._setElementSimulated(el);

                __ns._pushCssExclusion(el);

                if (CONSOLE_DEBUG) {
                    console.log('CSS filter excluded element:');
                    console.log(el);
                }

                //continue with the next element.
                traverseNext(nextElement, dfsLevel);
                __ns._timeEnd('_simulateElement');
                return;
            }

            if (isDfs && el.tagName.toUpperCase() == 'FORM') {
                if (CONSOLE_DEBUG) {
                    console.log('submitting DFS form');
                }

                // submit forms in DFS.
                __ns._submitForm(el).then(function() {
                    __ns._setElementSimulated(el);

                    //continue with the next element.
                    traverseNext(nextElement, dfsLevel);
                    __ns._timeEnd('_simulateElement');
                });

                return;
            }

            // :warning: Do not "return" from this method beyond this point without scheduling a next step (DFS or non-DFS). Doing so will cause simulated pain.

            // Simulate only if the element is not marked as simulated.
            if (!__ns._isElementSimulated(el)) {
                __ns._state['elementSimulationCount']++;

                // #22972 - currentElement is used to generate XPath for only DOM based XSS vulnerabilities.
                __ns.currentElement = el;

                __ns._setElementSimulated(el);

                // If skipThreshold is reached, start skipping elements by skipElementCount.
                if (__ns._options.skipThreshold !== 0 &&
                    __ns._state['elementSimulationCount'] > __ns._options.skipThreshold) {
                    nextElement = __ns._options.skipElementCount;
                    __ns._state['skipThresholdReached'] = true;
                }

                // If bailThreshold is reached, request a polite exit by setting nextElement to 0.
                if (__ns._options.bailThreshold !== 0 &&
                    __ns._state['elementSimulationCount'] >= __ns._options.bailThreshold) {
                    nextElement = 0;
                    __ns._state['bailThresholdReached'] = true;

                    traverseNext(nextElement, 0);
                    return;
                }

                var simulateElementBody = function () {
                    var events = __ns._getEventFunctions(el, elWithListeners.listeners);

                    if (CONSOLE_DEBUG) {
                        console.log('EVENTS set for %c' + __ns._identify(el) + ': ' + events.length, 'color: red');
                    }

                    var eventIndex = 0;

                    var callOneAndSchedule = (function (dfs_level_captured) {
                        var dfs_level = dfs_level_captured;

                        return function (triggeringElement) {

                            if (__ns._isSimulationTimedOut()) {
                                // timed-out.
                                elements.length = 0;

                                __ns._requestExit(ConsoleComments.exitRequestReason_TimeoutDetectedCallOne);

                                __ns._queueTraverse(function () { __ns._simulate(ConsoleComments.timed_out_1); },
                                    __ns.TRAVERSE_EXITREQUESTED_TIMEOUT,
                                    ConsoleComments.timed_out_1);

                                return;
                            }

                            var triggeringElementId = __ns._identify(triggeringElement);
                            if (CONSOLE_DEBUG) {
                                console.log('callOneAndSchedule for ' + triggeringElementId);
                            }

                            if (!__ns._is_node_attached(triggeringElement)) {
                                __ns._pushDetachedNode(triggeringElement, triggeringElementId);

                                if (CONSOLE_DEBUG) {
                                    console.log('detached element detected: ' + triggeringElementId);
                                }

                                events = [];
                            }

                            if (events.length > eventIndex) {
                                var event = events[eventIndex];

                                if (CONSOLE_DEBUG) {
                                    console.log(triggeringElement);
                                    console.log(__ns._identify(triggeringElement));

                                    var text = (triggeringElement.text || '').trim();

                                    if (text.length > 0) {
                                        console.log(text);
                                    }

                                    var value = (triggeringElement.value || '').trim();

                                    if (value.length > 0) {
                                        console.log(value);
                                    }

                                    console.log('^ triggered by');
                                }

                                __ns._tryCatchLogIgnore(function () {

                                    // Trigger a single event.
                                    event();

                                    __ns._state['eventsTriggered']++;
                                });

                                // Save _lastTriggeredElement for debug information generation purposes.
                                __ns._lastTriggeredElement = triggeringElement;
                            }

                            eventIndex++;

                            if (events.length > eventIndex) {
                                // There are more events on this element.
                                // First check and do the DFS sub-simulations - async!.
                                __ns._queueTraverseInterevent(function () { __ns._traverseDfs(dfs_level); },
                                    ConsoleComments.callOneAndSchedule_dfsBefore_nextEvent +
                                    '-' +
                                    __ns._identify(el),
                                    isDfs);

                                // Simulate next event.
                                __ns
                                    ._queueTraverseInterevent(function () {
                                        callOneAndSchedule(triggeringElement, dfs_level);
                                    },
                                    ConsoleComments.callOneAndSchedule_nextEvent + '-' + triggeringElementId,
                                    isDfs);

                                return;
                            } else {
                                // continue traversal.
                                // No more events on this element.
                                // First check and do the DFS sub-simulations - in queueTraverse! Sync with traverseNext.
                                __ns._queueTraverseInterevent(function () { __ns._traverseDfs(dfs_level); },
                                    ConsoleComments.callOneAndSchedule_dfsBefore_nextElement,
                                    isDfs);

                                // Simulate next element.
                                __ns._queueTraverseInterevent(function () { traverseNext(nextElement, dfs_level); },
                                    ConsoleComments.callOneAndSchedule_nextElement,
                                    isDfs);
                            }
                        };
                    })(dfsLevel);

                    if (isFirst === true) {
                        callOneAndSchedule(el);
                    } else {
                        // This setTimeout continues execution of current method, eventually.
                        __ns._queueTraverseInterevent(function () { callOneAndSchedule(el); },
                            ConsoleComments.callOneAndSchedule_firstEvent + '-' + __ns._identify(el),
                            isDfs);
                    }
                };

                __ns._tryCatchLogIgnore(simulateElementBody, 'An error occurred while simulating events.');

            } else {
                // Current element is already simulated, continue with the next element.
                traverseNext(nextElement, dfsLevel);
            }

            __ns._timeEnd('_simulateElement');
        },

        _finalizeDfsQueue: function () {

        },

        /** setTimeout queue for traversals. */
        _traversalQueue: [],

        _traverseSingleFromQueue: function () {
            __ns._setTimeout(function () { __ns._traverseSingleFromQueueImpl(); }, 0);
        },

        /** Traverse a single item from the _traversalQueue, sync. */
        _traverseSingleFromQueueImpl: function () {
            // DFS items have precedence. If none found, take the first item.
            var item;
            var isDfs;

			/*
			console.log('---');
			for (var i = 0; i < __ns._traversalQueue.length; i++) {
			    var candidate = __ns._traversalQueue[i];

			    console.log(candidate[0].toString() + ': ' + candidate[2]);
			}
			console.log('---');
			*/

            for (var i = 0; i < __ns._traversalQueue.length; i++) {
                var candidate = __ns._traversalQueue[i];

                if (candidate[2]) {
                    // isDfs.
                    item = candidate;
                    __ns._traversalQueue.splice(i, 1);

                    isDfs = true;

                    break;
                }
            }

            if (!item) {
                item = __ns._traversalQueue.shift();
                isDfs = false;
            }

            var comment = (isDfs ? 'DFS-' : 'non-DFS-') + item[0];

            if (CONSOLE_DEBUG) {
                console.log('executing ' + comment);
            }

            __ns._timeStart('_dequeue-' + comment);
            item[1]();
            __ns._timeEnd('_dequeue' + comment);
        },

        /** Queue a callback to be executed in-order, with comment. DFS callbacks have precedence over non-DFS callbacks. */
        _queueTraverse: function (callback, timeout, comment, isDfs) {
            if (CONSOLE_DEBUG) {
                console.log('_traversalQueue.length: ' + __ns._traversalQueue.length);
                console.log('_queueTraverse location.href: ' + location.href);
                console.log('%c queued: ' + comment, 'background:black; color: cyan');
            } else {
                comment = undefined;
            }

            if (isDfs === true) {
                __ns._traversalQueue.unshift([comment, callback, isDfs === true]);
            } else {
                __ns._traversalQueue.push([comment, callback, isDfs === true]);
            }

            if (timeout === -1) {
                timeout = __ns._getEffectiveIntereventTimeout();
            }

            __ns._setTimeout(__ns._traverseSingleFromQueue, timeout);
        },

        /** Queue an interevent callback to be executed in-order, with comment. DFS callbacks have precedence over non-DFS callbacks. */
        _queueTraverseInterevent: function (callback, comment, isDfs) {
            __ns._queueTraverse(callback, -1, comment, isDfs);
        },

        /** Check if an element is attached to a document. */
        _is_node_attached: function (element) {
            if (!element || !element.parentNode) { // fail fast
                return false;
            }

            if (element.contains) {
                return element.ownerDocument.body.contains(element);
            }
            var id = __ns._identify(element);

            return element.ownerDocument.getElementById(id) !== null;
        },

        /** Get event simulating functions of an element w.r.t. provided event listeners. */
        _getEventFunctions: function (el, listeners) {
            __ns._timeStart('_getEventFunctions');

            var events = [];

            var id = __ns._identify(el);

            switch (el.tagName) {
                case 'INPUT':
                    if (el.type) {
                        var type = el.type.toUpperCase();

                        if (type == 'FILE' || type == 'HIDDEN') {
                            __ns._timeEnd('_getEventFunctions');
                            return events;
                        } else if (type == 'SUBMIT' || type == 'BUTTON') {
                            __ns._pushWalkStep(el, ['click', 'submit-or-btn']);
                            events.push(function () {
                                if (__ns._options._debugDoNotTriggerEvents) {
                                    return;
                                }

                                // If the input is part of a form, fill the form before submitting.
                                if (el.form) {
                                    __ns._fillFormInputElements(el.form);
                                }

                                __ns._simulateClick(el, id);
                            });
                        } else if (type == 'RADIO' || type == 'CHECKBOX') {
                            __ns._pushWalkStep(el, ['click', 'rad-or-chk']);
                            // mark these checked/unchecked through clicking them
                            events.push(function () { __ns._simulateClick(el, id); });

                            if (type == 'CHECKBOX') {
                                // simulate the negative state of a check box by clicking it again
                                __ns._pushWalkStep(el, ['click', 'chk-2']);

                                events.push(function () {
                                    __ns._simulateClick(el, id);
                                });
                            }
                        } else {
                            // check for autosuggest. Do not use _identify here instead of id.
                            var samples = type.toLowerCase() == 'hidden'
                                ? []
                                : __ns._getFormValueSamples(type.toLowerCase(), el.id, el);

                            if (CONSOLE_DEBUG) {
                                for (var i = 0; i < samples.length; i++) {
                                    var sample = samples[i];

                                    console.log('sample found: ' + sample);
                                }
                            }

                            if (!samples || samples.length == 0) {
                                // If input is not empty, use its text.
                                var text = el.value;

                                if (!text || text.toString().length == 0) {
                                    samples = ['3'];
                                } else {
                                    samples = [text];
                                }
                            }

                            for (var i = 0; i < samples.length; i++) {
                                var sample = samples[i];

                                events.push(
                                    (function (capturedSample) {
                                        return function () {
                                            __ns._simulateAutosuggest(el, capturedSample, capturedSample);
                                        };
                                    })(sample)
                                );

                                events.push(
                                    (function (capturedSample) {
                                        return function () {
                                            if (CONSOLE_DEBUG) {
                                                var id = __ns._identify(el);

                                                console.log('%c' + id + ' %cReactChange',
                                                    'color: red',
                                                    'color: green; font-weight: bold');
                                            }

                                            __ns._simulateZoneChange(el, capturedSample);
                                            __ns._simulateReactChange(el, capturedSample);
                                        };
                                    })(sample)
                                );
                            }
                        }
                    }

                    events = events.concat(__ns._getIndividualEvents(el, listeners, true));

                    break;
                case 'OPTION':
                    var selectEl = el.parentElement;

                    if (selectEl && selectEl.tagName == 'SELECT') {
                        __ns._simulateEvent(selectEl, 'focus', id);

                        selectEl.selectedIndex = el.index;

                        __ns._simulateEvent(selectEl, 'change', id);
                        __ns._simulateEvent(selectEl, 'blur', id);

                        __ns._simulateZoneChange(selectEl, selectEl.value);
                        __ns._simulateReactChange(selectEl, selectEl.value);

                        __ns._pushWalkStep(el, ['optionAll']);
                        events = events.concat(__ns._getIndividualEvents(selectEl, listeners));
                    }

                    break;
                case 'A':
                    if (__ns._isElementSimulatable(el)) {

                        events.push(function () {
                            try {
                                __ns._pushWalkStep(el, ['e-clickJS']);

                                if (__ns._options._debugDoNotTriggerEvents) {
                                    return;
                                }

                                __ns._simulateClick(el, id);
                            } catch (e) {
                                console.log('An error occurred while clicking element: ' + e);
                            }
                        });
                    }

                    events = events.concat(__ns._getIndividualEvents(el, listeners));

                    break;
                default:
                    events = events.concat(__ns._getIndividualEvents(el, listeners));
            }

            __ns._timeEnd('_getEventFunctions');
            return events;
        },

        /** Get _simulateEvent invokers for event listeners on an element. */
        _getIndividualEvents: function (el, listeners, excludeKeyUp) {
            var events = [];

            if (!listeners) {
                return events;
            }

            for (var eventName in listeners) {
                if (excludeKeyUp && eventName === 'keyup') {
                    continue;
                }

                if (listeners.hasOwnProperty(eventName)) {
                    (function (el, name, source) {
                        events.push(function () {
                            var id = __ns._identify(el);

                            if (CONSOLE_DEBUG) {
                                console.log('%c' + id + ' %c' + name + ' %c' + source,
                                    'color: red',
                                    'color: blue; font-weight: bold',
                                    'color: black');
                            }

                            if (name === 'click') {
                                __ns._simulateClick(el, id);
                            } else {
                                __ns._simulateEvent(el, name, id);
                            }
                        });
                    })(el, eventName, listeners[eventName]);
                }
            }

            return events;
        },

        _simulateZoneChange: function(el, value) {
            var trySetZoneFieldValue = function (el, value) {
                var isFunction = function (functionToCheck) {
                    var getType = {};
                    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
                }

                var enventTasksKey = Object.keys(el).find(function (key) {
                    return key.startsWith('__zone_symbol__eventTasks');
                });

                if (!enventTasksKey || enventTasksKey.length <= 0 || !el[enventTasksKey] || el[enventTasksKey].length <= 0) {
                    return false;
                }

                var modelChangeEventTask = el[enventTasksKey].find(function (eventTask) { return eventTask.source.indexOf("ngModelChange") > 0; });

                if (!modelChangeEventTask || !modelChangeEventTask['data'] || !modelChangeEventTask['data']['handler'] || !isFunction(modelChangeEventTask['data']['handler'])) {
                    return false;
                }

                modelChangeEventTask['data']['handler'](value);

                return true;
            };

            trySetZoneFieldValue(el, value);
        },

        _simulateReactChange: function (el, value) {
            var tryDispatchReactEvent = function (el, event, elementValue) {
                var isFunction = function (functionToCheck) {
                    var getType = {};
                    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
                }

                var handlersKey = Object.keys(el).find(function (key) {
                    return key.startsWith('__reactEventHandlers');
                });

                // FB#57121; set value of the element on a shallow copy instance
                // to override the default model-binded behavior on a React Controlled Component
                var cloneElement = el.cloneNode();
                cloneElement.value = elementValue;

                var noopOverride = function () { };

                var args = { 'target': cloneElement, 'currentTarget': cloneElement, 'preventDefault': noopOverride, 'stopPropagation': noopOverride, 'persist': noopOverride };

                if (handlersKey && handlersKey.length > 0 && el[handlersKey][event] && isFunction(el[handlersKey][event])) {
                    el[handlersKey][event](args);

                    return true;
                }

                var instanceKey = Object.keys(el).find(function (key) {
                    return key.startsWith('__reactInternalInstance');
                });

                if (instanceKey && instanceKey.length > 0 && el[instanceKey]) {
                    var currentElement = el[instanceKey]._currentElement;

                    if (currentElement && currentElement.props && currentElement.props[event] && isFunction(currentElement.props[event])) {
                        currentElement.props[event](args);

                        return true;
                    }
                }

                return false;
            }

            var tryDispatchReactOnFocus = function (el, value) {
                return tryDispatchReactEvent(
                    el,
                    'onFocus',
                    value);
            }

            var tryDispatchReactOnChange = function (el, value) {
                return tryDispatchReactEvent(
                    el,
                    'onChange',
                    value);
            }

            var tryDispatchReactOnBlur = function(el, value) {
                return tryDispatchReactEvent(
                    el,
                    'onBlur',
                    value);
            }

            tryDispatchReactOnFocus(el, value);
            tryDispatchReactOnChange(el, value);
            tryDispatchReactOnBlur(el, value);
        },

        /** Autosuggest simulator.  */
        _simulateAutosuggest: function (el, source, value) {
            // keyup, keydown, keypress
            if (source && source.length > 0) {
                __ns._pushWalkStep(el, ['e-autosuggest-' + source, true]);
            } else {
                __ns._pushWalkStep(el, ['e-autosuggest', false]);
            }

            if (__ns._options._debugDoNotTriggerEvents) {
                return;
            }

            var eventNames = ['keydown', 'beforeinput', 'keypress', 'input', 'keyup'];

            try {
                el.focus();
                el.value = value;

                for (var i = 0; i < eventNames.length; i++) {
                    var eventInstance = __ns._createKeyboardEvent(eventNames[i], value);

                    el.dispatchEvent(eventInstance);
                }
            } catch (e) {
                console.log('An error occurred while simulating event: ' + e);
            }
        },

        /** Simulates a single event by name. */
        _simulateEvent: function (el, eventName, source) {
            if (source && source.length > 0) {
                __ns._pushWalkStep(el, ['e-' + eventName + '-' + source, true]);
            } else {
                __ns._pushWalkStep(el, ['e-' + eventName, false]);
            }

            if (__ns._options._debugDoNotTriggerEvents) {
                return;
            }

            var eventCreator = __ns._eventCreators[eventName];
            var eventInstance = eventCreator ? eventCreator(eventName) : new Event(eventName, { "bubbles": true });

            __ns._simulateEventPart2(el, eventName, eventInstance);

            var eventNameWithSource = source && source.length > 0 ? eventName + '-' + source : eventName;
            var tagStat = __ns._state['elementSimDist'][el.tagName] || {};
            var count = tagStat[eventNameWithSource] || 0;

            tagStat[eventNameWithSource] = count + 1;

            __ns._state['elementSimDist'][el.tagName] = tagStat
        },

        /** V8 optimization workaround for try-catch methods for _simulateEvent method. */
        _simulateEventPart2: function (el, eventName, eventInstance) {
            __ns._timeStart('simulateEvent-' + eventName);

            // V8 cannot optimize try catch so this block is separated in a function.
            try {
                el.dispatchEvent(eventInstance);
            } catch (e) {
                console.log('An error occurred while simulating event ' + eventName + ': ' + e);
            } finally {
                __ns._timeEnd('simulateEvent-' + eventName);
            }
        },

        _simulateClick: function (el, source) {
            __ns._simulateEvent(el, 'mouseover', source);

            __ns._simulateEvent(el, 'mousedown', source);
            __ns._simulateEvent(el, 'focus', source);
            __ns._simulateEvent(el, 'mouseup', source);

            __ns._simulateEvent(el, 'click', source);
        },

        /** Marks an element as simulated. */
        _setElementSimulated: function (el) {
            el.setAttribute('nsSimulated', 'true');
        },

        /** Marks an element as non-simulated. */
        _setElementNonSimulated: function (el) {
            el.setAttribute('nsSimulated', 'false');
        },

        /** Marks an element as simulated. */
        _isElementSimulated: function (el) {
            return el.getAttribute('nsSimulated') === 'true';
        },

        _isSelectAnalyzed: function (el) {
            return el.getAttribute('nsanalyzed') === 'true';
        },

        _setSelectAnalyzed: function (el) {
            el.setAttribute('nsanalyzed', 'true');
        },

        /** Returns true if the element can be simulated. */
        _isElementSimulatable: function (el) {
            return el &&
                el.tagName === 'A' &&
                el.href &&
                (el.href.toLowerCase().indexOf('javascript:') === 0 ||
                    el.href.toLowerCase().indexOf('data:') === 0);
        },

        _isValidHash: function(string) {
            return string && string.length >= 2 && string.startsWith('#') && string[1] !== "/";
        },

        _isSimulationCompleted: false,

        _isExitRequested: false,

        _requestExit: function (reason, value) {
            __ns._isExitRequested = value !== false;

            if (CONSOLE_DEBUG) {
                console.log('exitRequested(' + __ns._isExitRequested + ') reason: ' + reason);
            }
        },

        _debugger: function () {
            if (DEBUG_DELAY_START) {
                debugger;
            }
        },

        /** Signals simulation completion to the host. */
        _signalSimulationCompleted: function (reason) {
            if (DEBUG_DELAY_START) {
                __ns._debugger();
            }

            if (__ns._isSimulationCompleted) {
                return;
            }

            __ns._timeEnd('simulation_all');

            __ns._isSimulationCompleted = true;

            if (__ns._allElements.length === 0) {
                __ns._state['allElementsSimulated'] = true;
            }

            var duration = new Date() - __ns.simulationStart;

            if (CONSOLE_DEBUG) {
                console.log('simulation completion reason: ' + reason);
                console.log(new Error('stacktrace').stack);
                console.log('remaining elements: ' + __ns._allElements.length);

                for (var i = 0; i < __ns._allElements.length; i++) {
                    var element = __ns._allElements[i].el;

                    var isSimulated = __ns._isElementSimulated(element);

                    if (!isSimulated) {
                        console.log('remaining non-simulated element: ' + __ns._identify(element));
                        console.log(element);
                    }
                }

                console.log('simulation completed in ' + duration);
            }

            __ns._state['simulationDuration'] = duration;

            nsSimulationCompleted(duration);
        },

        _lastTriggeredElement: null,

        /** Gets a similarity score for tagCounts, between 0 and 1. */
        _smartDfsIsSimilar: function (currentTagCounts, existingTagCounts) {
            // tagCounts object and each object in tagCountsSet MUST have the exact same properties defined.
            // Do not check here.

            for (var i = 0; i < existingTagCounts.length; i++) {
                var existingTagCount = existingTagCounts[i];
                var distance = 0;

                for (var tagName in currentTagCounts) {
                    if (currentTagCounts.hasOwnProperty(tagName)) {
                        var targetValue = currentTagCounts[tagName];
                        var existingValue = existingTagCount[tagName];

                        var diff = targetValue - existingValue;

                        // Euclidean distance
                        distance += diff * diff;
                    }
                }

                distance = Math.sqrt(distance);

                // If there is any similarity to one of the existingTagCounts, currentTagCounts is considered similar.
                if (distance <= __ns._options.smartDfsSimilarityDistance) {
                    return true;
                }
            }

            return false;
        },

        /** Returns true if elements should be considered as non-filtered DFS. */
        _smartDfsShouldAdd: function (elements, elementIsInProperty) {
            var tagCounts = {};
            var el;
            var tagName;

            for (var i = 0; i < elements.length; i++) {
                if (elementIsInProperty) {
                    el = elements[i].el;
                } else {
                    el = elements[i];
                }

                if (typeof (el) === 'undefined') {
                    continue;
                }

                tagName = el.tagName.toUpperCase();

                if (tagCounts.hasOwnProperty(tagName)) {
                    tagCounts[tagName]++;
                } else {
                    tagCounts[tagName] = 1;
                }
            }

            var keyNames = [];
            // Normalize tagCounts to [0, 1].
            for (tagName in tagCounts) {
                if (tagCounts.hasOwnProperty(tagName)) {
                    tagCounts[tagName] = tagCounts[tagName] / elements.length;
                    keyNames.push(tagName);
                }
            }

            keyNames.sort();
            var smartKey = keyNames.join('|');

            if (!__ns._dfsSmartStats.hasOwnProperty(smartKey)) {
                __ns._dfsSmartStats[smartKey] = {};
                __ns._dfsSmartStats[smartKey].count = 1;
                __ns._dfsSmartStats[smartKey].tagCounts = [];
            }

            if (keyNames.length < __ns._options.smartDfsMinTagGroupCount) {
                __ns._state['smartDfsMinTagHit']++;

                // process this, do not skip, no furhter checks.
                return { isSimilar: false, shouldAdd: true };
            }

            if (elements.length < __ns._options.smartDfsMinElementCount) {
                __ns._state['smartDfsMinElementHit']++;

                // process this, do not skip, no furhter checks.
                return { isSimilar: false, shouldAdd: true };
            }

            if (__ns._smartDfsIsSimilar(tagCounts, __ns._dfsSmartStats[smartKey].tagCounts)) {
                // Check smartDfsMaxSampleCount only if tagCounts are similar.
                if (__ns._dfsSmartStats[smartKey].count > __ns._options.smartDfsMaxSampleCount) {
                    if (CONSOLE_DEBUG) {
                        console.log('SmartDFS max sample count reached for a ' + smartKey);
                    }

                    // TODO __ns._dfsSmartStats[smartKey].tagCounts should be a Set.
                    __ns._dfsSmartStats[smartKey].count++;
                    __ns._dfsSmartStats[smartKey].tagCounts.push(tagCounts);

                    __ns._state['smartDfsMaxSampleHit']++;

                    return { isSimilar: true, shouldAdd: false };
                } else {
                    __ns._dfsSmartStats[smartKey].count++;
                    __ns._dfsSmartStats[smartKey].tagCounts.push(tagCounts);

                    __ns._state['smartDfsNoMaxSampleHit']++;

                    return { isSimilar: true, shouldAdd: true };
                }
            }

            __ns._dfsSmartStats[smartKey].count++;
            __ns._dfsSmartStats[smartKey].tagCounts.push(tagCounts);

            if (COLLECT_VERBOSE_DEBUGINFO) {
                var adder = __ns._lastTriggeredElement || null;

                if (adder == null) {
                    __ns._dfsStats.push([tagCounts, adder, 'null', 'null']);
                } else {
                    __ns._dfsStats.push([tagCounts, adder, __ns._identify(adder), adder.outerHTML]);
                }
            }

            return { isSimilar: false, shouldAdd: true };
        },

        /** Adds dfsElements for consideration in simulation. If SmartDFS is enabled, dfsElements may not be simulated. */
        _smartAddDfsElements: function (dfsElements, allDfsElements) {
            __ns._timeStart('_smartDfs');
            var eventeds = __ns._smartDfsShouldAdd(dfsElements, true);
            var uneventfuls = __ns._smartDfsShouldAdd(allDfsElements, false);

            if (!eventeds.shouldAdd || !uneventfuls.shouldAdd) {
                __ns._timeEnd('_smartDfs');
                return false;
            }

            __ns._dfsElements.unshift(dfsElements);

            __ns._timeEnd('_smartDfs');
            return true;
        },

        _getCurrentDfsLevel: function (parentElement) {

            var level = __ns._currentDfsLevel;

            try {
                level = __ns._elementIdDfsLevel[parentElement.tagName + '-' + __ns._identify(parentElement)];
            } catch (e) {

            }

            return level + 1;
        },

        _lastScriptTagAddedAt: null,

        _lastScriptTagAddedSrc: null,

        /** Processes elements discovered by the mutation summary observer. */
        _processNewElements: function (summaries) {
            __ns._timeStart('_processNewElements');

            var added = summaries[0]['added'];
            var valueChanged = summaries[0]['valueChanged'];

            if (added && added.length > 0) {
                if (CONSOLE_DEBUG) {
                    console.log(added);
                    console.log('^ added');
                }

                __ns._state['mutatingAdditionCount']++;

                var forms = [];

                // Added elements require DFS sub-simulation.
                var dfsElements = [];

                // Prepend forms.
                for (var i = 0; i < added.length; i++) {
                    var element = added[i];

                    if (element.tagName.toUpperCase() === 'FORM') {
                        forms.push(element);

                        __ns.analyzeLoginForm(element);

                        dfsElements.unshift({ el: forms[i], listeners: {} });

                        // Parse new forms here.
                        if (!DISABLE_COLLECTION && __ns._options.extractResources) {
                            var f = __ns._parseForm(element);

                            if (f) {
                                __ns._collectedForms.push(f);
                            }
                        }
                    } else if (element.tagName.toUpperCase() === 'SCRIPT') {
                        // Log scripts.
                        var id = __ns._identify(element);

                        __ns._debugRaw.push(id + ' src=' + element.src + 'inner= ' + btoa(element.outerHTML));
                    }
                }

                var hrefElements = [];
                var selects = new Set();
                for (var i = 0; i < added.length; i++) {
                    var element = added[i];

                    // Option elements cause simulation of associated select elements.
                    if (element.tagName.toUpperCase() == 'OPTION') {
                        // Add select tag.
                        var select = element.parentElement;
                        if (select.tagName.toUpperCase() == 'SELECT') {
                            __ns._setElementNonSimulated(select);

                            selects.add(select);
                        }
                    } else if (element.tagName.toUpperCase() === 'A' || element.tagName.toUpperCase() === 'LI') {
                        hrefElements.push(element);
                    }
                }

                __ns._collectHashes(hrefElements);

                selects.forEach(function (value) {
                    added.push(value);
                });

                __ns._getElementsWithListeners(window, added, dfsElements);

                var isFilteredBySmartDfs = false;

                dfsElements.dfsLevel = __ns._getCurrentDfsLevel(__ns._lastTriggeredElement);

                if (dfsElements.length > 0) {
                    if (__ns._options.smartDfsEnabled) {
                        if (!__ns._smartAddDfsElements(dfsElements, added)) {
                            __ns._state['smartDfsHit']++;
                            isFilteredBySmartDfs = true;
                        }
                    } else {
                        __ns._dfsElements.unshift(dfsElements);
                    }
                }

                // Collect default form values.
                if (!DISABLE_COLLECTION && !isFilteredBySmartDfs) {
                    __ns._collectFormDefaultActions(added);
                }

                for (var i = 0; i < added.length; i++) {
                    var element = added[i];

                    if (element.tagName.toUpperCase() === 'A') {
                        if (__ns._isExcludedByCssSelector(element)) {
                            __ns._state['excludedByCss']++;
                            __ns._pushCssExclusion(element);
                            continue;
                        }

                        var href = element.getAttribute('href');
                        if (__ns._isValidHash(href)) {
                            __ns._parsedHashes.add(href);
                        }
                    }

                    if (element.tagName.toUpperCase() === 'SCRIPT') {
                        __ns._lastScriptTagAddedAt = new Date().getTime();
                        __ns._lastScriptTagAddedSrc = element.src;
                    }

                    if (!isFilteredBySmartDfs && element.tagName.toUpperCase() === 'FORM') {
                        forms.push(element);
                    }

                    __ns._pushRelation(element.parentElement, element, 'new');

                    if (__ns._lastTriggeredElement) {
                        __ns._pushAddingRelation(__ns._lastTriggeredElement,
                            element,
                            __ns._state['mutatingAdditionCount'].toString() +
                            (isFilteredBySmartDfs ? '_filtered' : ''));
                    }
                }


                if (!DISABLE_COLLECTION && !isFilteredBySmartDfs) {
                    __ns._collectResources(added);
                }

                // Remove filtered elements.
                if (isFilteredBySmartDfs) {

                    for (var i = 0; i < added.length; i++) {
                        var element = added[i];

                        try {
                            element.remove();
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
            }

            if (valueChanged && valueChanged.length > 0) {
                if (CONSOLE_DEBUG) {
                    console.log(valueChanged);
                    console.log('^ valueChanged');
                }

                __ns._state['mutationChangeCount']++;

                // Changed elements require resource collection.
                if (!DISABLE_COLLECTION) {
                    __ns._collectResources(valueChanged);
                }
            }

            __ns._timeEnd('_processNewElements');
        },

        /** Simulate by submitting a form. */
        _submitDocumentForm: function (index) {
            __ns._pushTraceStep(['_submitDocumentForm', index]);

            if (index >= document.forms.length) {
                __ns._setTimeout(function () { __ns._simulate('formSubmit'); }, 0);

                return;
            }

            var form = document.forms[index];

            if (!__ns._formValuesMutationObserver) {
                __ns._formValuesMutationObserver = new __ns._mutationSummary({
                    'callback': __ns.formValuesProcessor.summaryCallback,
                    'queries': [{ element: '*', elementAttributes: 'class' }]
                });
            }

            if (__ns._isExcludedByCssSelector(form)) {
                __ns._submitDocumentForm(index + 1);
                return;
            }
            // Simulate next form.
            __ns._submitForm(form).then(function() {
                __ns._setTimeout(__ns._submitDocumentForm, __ns._getEffectiveIntereventTimeout(), index + 1);
            });
        },

        _submitForm: function (form) {
            return new Promise(function(resolve) {
                __ns._timeStart('_submitForm');

                try {
                    var elements = form.elements;
                    var submitElement;
                    var nextTimeout = 0;

                    for (var i = 0; i < elements.length; i++) {
                        var formElement = elements[i];

                        if (__ns._isExcludedByCssSelector(formElement)) {
                            continue;
                        }

                        var tagName = formElement.tagName.toUpperCase();

                        if ((tagName == 'INPUT' || tagName == 'BUTTON') &&
                            formElement.type &&
                            formElement.type.toUpperCase() == 'SUBMIT') {
                            submitElement = formElement;
                        } else if (tagName == 'SELECT' && formElement.options.length > 0) {
                            __ns._setTimeout(function(el) {
                                    var id = __ns._identify(el);
                                    var setIndex = el.options.length - 1;

                                    __ns._simulateEvent(el, 'focus', id);

                                    el.selectedIndex = setIndex;

                                    __ns._simulateEvent(el, 'change', id);
                                    __ns._simulateEvent(el, 'blur', id);

                                    __ns._simulateZoneChange(el);
                                    __ns._simulateReactChange(el);
                                },
                                nextTimeout,
                                formElement);

                            nextTimeout += __ns._options.intereventTimeout;
                        }
                    }

                    // Consider the last button element as the submit element if there was
                    // no input or button elements with 'submit' type.
                    // Ref: FB #50998
                    if (!submitElement) {
                        submitElement =
                            Array.from(elements)
                            .filter(el => !__ns._isExcludedByCssSelector(el) && el.tagName.toUpperCase() === 'BUTTON')
                            .reverse()[0];
                    }

                    __ns._fillFormInputElements(form);

                    nextTimeout += __ns._options.intereventTimeout;

                    if (!__ns._options._debugDoNotTriggerEvents) {
                        __ns._setTimeout(function (form, submitElement) {
                            try {
                                __ns._pushTraceStep(['_submitFormSubmit', __ns._identify(form)]);

                                if (CONSOLE_DEBUG) {
                                    var serialized = [...new FormData(form).entries()]
                                        .map(e => encodeURIComponent(e[0]) + "=" + encodeURIComponent(e[1]))
                                        .join('&');

                                    __ns._pushTraceStep(['formData', serialized]);
                                }

                                if (submitElement) {
                                    // Click element regardless of its nsSimulated state.
                                    __ns._simulateClick(submitElement, __ns._identify(submitElement));
                                } else {
                                    form.submit();
                                }
                            } catch (e) {
                                console.log('An error occurred while submitting form: ' + e);
                            } finally {
                                __ns._timeEnd('_submitForm');
                                resolve();
                            }
                            },
                            nextTimeout,
                            form,
                            submitElement);
                    }
                } catch (e) {
                    console.log('An error occurred while filling form values: ' + e);
                    __ns._timeEnd('_submitForm');
                    resolve();
                }
            });
        },

        _formDefaultActions: [],

        _collectFormDefaultActions: function (elements) {
            if (DISABLE_COLLECTION) {
                return;
            }

            for (var j = 0; j < elements.length; j++) {
                var el = elements[j];

                if (el.tagName.toUpperCase() != 'FORM') {
                    continue;
                }

                __ns._collectFormDefaultAction(el);
            }
        },

        _collectFormDefaultAction: function (form) {
            if (DISABLE_COLLECTION) {
                return;
            }

            var method = 'GET';

            var descriptor = Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, 'method');
            var getter;

            if (descriptor) {
                getter = descriptor.get;
            }

            if (getter) {
                method = getter.apply(form) || method;
            } else if (typeof form.method === 'string') {
                method = form.method || method;
            }

            method = method.toUpperCase();

            var enctype = form.getAttribute('enctype');
            if (method === 'POST' && enctype && enctype.toLowerCase() === 'multipart/form-data') {

                // fileupload form inputs should not be sent in a urlencoded POST request.

                return;
            }

            var query = '';

            var elements = form.elements;

            for (var i = 0; i < elements.length; i++) {
                var formElement = elements[i];
                var tagName = formElement.tagName.toUpperCase();

                if (tagName == 'BUTTON') {

                    var buttonType = formElement.type.toUpperCase();

                    if (buttonType != 'BUTTON' && buttonType != 'RESET') {
                        // If form has a submit button return, see DomParserFixture.Should_not_submit_form_with_javascript_when_there_is_a_button_type_submit test and friends.
                        // valid button types are "button", "reset", "submit".
                        // invalid types count as submit.

                        return;
                    }
                }

                if ((tagName == 'INPUT' || tagName == 'BUTTON') &&
                    formElement.type &&
                    formElement.type.toUpperCase() == 'SUBMIT') {

                    continue;
                }

                if (i > 0) {
                    query += '&';
                }

                query += encodeURIComponent(formElement.name);
                query += '=';
                query += encodeURIComponent(formElement.value);
            }

            // Do not use form.action as the form may have an input named action.
            var url = (form.getAttribute('action') || document.location.pathname) + (method !== 'POST' ? '?' + query : '');
            var postData = method === 'POST' ? query : null;

            __ns._formDefaultActions.push({ 'Url': url, 'PostData': postData });
        },

        _parseForm: function (form) {
            var formId = form.getAttribute('nsFormId');

            if (formId > 0) {
                // check whether this already parsed form has any new inputs added
                var hasNewInput = false;
                for (var t = 0; t < form.elements.length; t++) {
                    if (form.elements[t].getAttribute('nsParsed') != 'y') {
                        hasNewInput = true;
                        break;
                    }
                }

                if (!hasNewInput) {
                    return null;
                }
            } else {
                formId = ++__ns._formIdCounter;
                form.setAttribute('nsFormId', formId);
            }

            var action = '';

            var descriptor = Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, 'action');
            var getter;

            if (descriptor) {
                getter = descriptor.get;
            }

            if (getter) {
                action = getter.apply(form) || document.location.pathname;
            } else {
                var attributeValue = form.getAttribute('action') || document.location.pathname;

                if (typeof attributeValue === 'string') {
                    action = attributeValue;
                }
            }

            var f = {
                'name': form.getAttribute('name'),
                'action': action,
                'encType': form.getAttribute('enctype'),
                'inputs': [],
                'domId': formId
            };

            var method = form.getAttribute('method');

            if (method && method.toLowerCase() == 'post') {
                f['method'] = 'post';
            } else {
                f['method'] = 'get';
            }

            var autoCompleteAttr = form.getAttribute('autocomplete');
            f['autoCompleteEnabled'] = autoCompleteAttr != 'off' && autoCompleteAttr != "new-password";

            var count = form.elements.length < __ns._defaultParserParameterLimit
                ? form.elements.length
                : __ns._defaultParserParameterLimit;

            for (var j = 0; j < count; j++) {
                var el = form.elements[j];

                el.setAttribute('nsParsed', 'y');

                if (el.tagName == 'FIELDSET' || el.tagName == 'KEYGEN') {
                    continue;
                }

                if (el.type == 'reset' && (el.tagName == 'BUTTON' || el.tagName == 'INPUT')) {
                    continue;
                }

                if (!el.name && el.type !== 'file') {
                    continue;
                }

                var input = {
                    'name': el.name
                };

                if (el.id) {
                    input['id'] = el.id;
                }

                if (el.tagName == 'INPUT') {
                    if (el.hasAttribute('autocomplete')) {
                        input['autoCompleteEnabled'] = el.autocomplete != 'off' && el.autocomplete != "new-password";
                    } else {
                        input['autoCompleteEnabled'] = f['autoCompleteEnabled'];
                    }

                    input['minValue'] = el.min;
                    input['maxValue'] = el.max;
                }

                if (el.tagName == 'SELECT') {
                    input['values'] = [];
                    input['type'] = 'select';

                    for (var k = 0; k < el.options.length; k++) {
                        var option = el.options[k];
                        var v = option.value || option.text;

                        if (v == null) {
                            continue;
                        }

                        if (option.defaultSelected) {
                            input['value'] = v;
                        }

                        input['values'].push(v);
                    }
                } else {
                    input['value'] = el.value;

                    if (el.type != null) {
                        input['type'] = el.type.replace('-', '');
                    }
                }

                f['inputs'].push(input);
            }

            return f;
        },

        _collectedForms: [],

        _defaultParserParameterLimit: 200,

        /** Parse forms in order to collect input details. */
        'parseForms': function (parserParameterLimit) {
            // function called externally.
            __ns._timeStart('_parseForms');

            __ns._defaultParserParameterLimit = parserParameterLimit;

            if (!__ns._options.extractResources) {
                __ns._timeEnd('_parseForms');

                return JSON.stringify([]);
            }

            var forms = [];

            for (var i = 0; i < document.forms.length; i++) {
                var form = document.forms[i];

                var f = __ns._parseForm(form);

                if (f) {
                    forms.push(f);
                }
            }

            for (var i = 0; i < __ns._collectedForms.length; i++) {
                var f = __ns._collectedForms[i];

                if (f) {
                    forms.push(f);
                }
            }

            // prevent some libraries like Prototype overriding toJSON with non-default impl. see http://stackoverflow.com/q/710586/39
            delete Array.prototype.toJSON;

            __ns._timeEnd('_parseForms');

            return JSON.stringify(forms);
        },

        _collectedResources: {
            links: new Set(),
            frames: []
        },

        /** Collect urls and other resources from provided elements. If elements are not provided, collect resources from elements with pre-defined tags. */
        _collectResources: function (elements) {
            if (DISABLE_COLLECTION) {
                return;
            }

            var tagsToExtract = [
                'a',
                'frame',
                'iframe',
                'form',
                'img',
                'area'
            ];

            if (elements) {
                __ns._collectResourcesFromElements(elements);
            } else {
                for (var i = 0; i < tagsToExtract.length; i++) {
                    var tagElements = document.getElementsByTagName(tagsToExtract[i]);

                    __ns._collectResourcesFromElements(tagElements);
                }
            }
        },

        /** Collect urls and other resources from elements. */
        _collectResourcesFromElements: function (elements) {
            for (var j = 0; j < elements.length; j++) {
                var el = elements[j];
                var extractedUrl = '';

                if (el.tagName == 'FRAME') {
                    if (el.getAttribute('nsExtracted')) {
                        continue;
                    }

                    el.setAttribute('nsExtracted', true);

                    extractedUrl = el.src;

                    var frame = {
                        'source': el.src,
                        'name': el.name,
                        'isIframe': false
                    };
                    __ns._collectedResources.frames.push(frame);
                } else if (el.tagName == 'IFRAME') {
                    if (el.getAttribute('nsExtracted')) {
                        continue;
                    }

                    el.setAttribute('nsExtracted', true);

                    extractedUrl = el.src;

                    var iframe = {
                        'source': el.src,
                        'name': el.name,
                        'isIframe': true
                    };

                    if (el.hasAttribute('sandbox')) {
                        iframe['sandbox'] = el.getAttribute('sandbox');
                    }

                    __ns._collectedResources.frames.push(iframe);
                } else if (el.tagName == 'A' || el.tagName == 'AREA') {
                    extractedUrl = el.href;
                } else if (el.tagName == 'FORM') {
                    extractedUrl = el.getAttribute('action');
                } else if (el.tagName == 'IMG') {
                    extractedUrl = el.src;
                } else {
                    continue;
                }

                if (typeof extractedUrl === 'string') {
                    __ns._collectedResources.links.add(extractedUrl);
                }
            }
        },
	    formValuesProcessor : {
		    errorData: [],
		    summaryCallback: function(summaries){
                try {
                    var summary = summaries[0];
                    __ns.formValuesProcessor.processAddedElements(summary.added);
                    __ns.formValuesProcessor.processChangedAttributes(summary);
                    eoapi.extInvoke("__nsSaveFormErrors", JSON.stringify(__ns.formValuesProcessor.getErrorData()));
                } catch (e) {
                    console.log('form values processor error: ');
                    console.error(e);
                }
		    },
		    addErrorElement(element, message){
			    for(var i = 0; i < __ns.formValuesProcessor.errorData.length; i++){
				    var item = __ns.formValuesProcessor.errorData[i];
				    
				    if(item.element && item.element.isSameNode(element)){
					    item.message = message;
					    return;
				    }
			    }
			    
			    __ns.formValuesProcessor.errorData.push({element : element, message: message, value: __ns.formValuesProcessor.getInputValue(element)});
		    },
		    getInputValue: function(element){
			    if(!element || !element.type){
				    return null;
			    }
			    
			    switch(element.type){
				    case "radio":
				    case "checkbox":
					    if (element.checked){
						    return element.value;
					    }
			    }
			    
			    return element.value;
		    },
		    getErrorData: function(){
			    var plainErrorData = [];
			    
			    for(var i = 0; i < __ns.formValuesProcessor.errorData.length; i++){
				    var item = __ns.formValuesProcessor.errorData[i];
				    plainErrorData.push({ 
					    message: item.message,
					    element: __ns.getXPath(item.element),
					    value: item.value
				    });
			    }
			    
			    return plainErrorData;
		    },
		    errorDataContainsElement(element){
			    for(var i = 0; i < __ns.formValuesProcessor.errorData.length; i++){
				    var item = __ns.formValuesProcessor.errorData[i];
				    
				    if(item.element && item.element.isSameNode(element)){
					    return true;
				    }
			    }
			    
			    return false;
		    },
		    processAddedElements: function(addedElements){
			    for(var i = 0; i < addedElements.length; i++){
				    var element = addedElements[i];
                    var addedElementTag = element.tagName.toLowerCase();

                    if (addedElementTag === "style") {
                        continue;
                    }

				    var checkValue = __ns.formValuesProcessor.checkAddedElementError(element);
				    
				    if(checkValue.result){
					    var errorElement = __ns.formValuesProcessor.findError(element);
					    __ns.formValuesProcessor.addErrorElement(errorElement, checkValue.message);
				    }
			    } 
		    },
		    processChangedAttributes: function(summary){
			    var changedElements = summary.attributeChanged.class;
			    
			    for(var i = 0; i < changedElements.length; i++){
				    var element = changedElements[i];
				    
				    if(__ns.formValuesProcessor.errorDataContainsElement(element))
				    {
					    continue;
				    }
				    
				    if(__ns.formValuesProcessor.checkChangedElementError(summary, element)){
					    var changedElementTag = element.tagName.toLowerCase();

					    if(changedElementTag == "input" || changedElementTag == "select"){
						    __ns.formValuesProcessor.addErrorElement(element, null);
					    }
					    else {
						    var errorElement = __ns.formValuesProcessor.findError(element);
						    __ns.formValuesProcessor.addErrorElement(errorElement, null);
					    }
				    }
			    } 
		    },
		    findError: function(element){
			    var relatedInput = __ns.formValuesProcessor.findRelatedInput(element);
			    
			    if(relatedInput != null){
				    if (NodeList.prototype.isPrototypeOf(relatedInput)){
					    return relatedInput[0];
				    }
				    else {
					    return relatedInput;
				    }
			    }
		    },
		    checkAddedElementError: function(element){
                var innerTextError = __ns.formValuesProcessor.checkInnerText(element); 
				
                if(innerTextError.result){
                    return innerTextError;
                }
				
                var classNameError = __ns.formValuesProcessor.checkAddedElementClassNames(element);

                return classNameError;
		    },
		    checkChangedElementError: function(summary, element){
                var innerTextResult = __ns.formValuesProcessor.checkInnerText(element) 
                var classNameResult = __ns.formValuesProcessor.checkChangedElementClassNames(summary, element);
			
                return innerTextResult.result || classNameResult.result;
		    },
		    checkInnerText: function(element){
			    if (element.innerText.includes("valid") || element.innerText.includes("required") ) {
				    return { result: true, message: element.innerText};
			    }

                return { result: false};
		    },
		    checkAddedElementClassNames: function(element){
			    var classes = element.classList
			    var foundAddedElementWithErrorClass = __ns.formValuesProcessor.checkClassNames(element, classes);
			    
			    if(foundAddedElementWithErrorClass != null){
				    foundAddedElementWithErrorClass.message = element.innerText;
			    }
			    
			    return foundAddedElementWithErrorClass;
		    },
		    checkChangedElementClassNames: function(summary, element){
			    var classes = element.classList;
			    var existingClasses = summary.getOldAttribute(element, "class");
			    var classdiff = __ns.formValuesProcessor.getClassNamesDiff(existingClasses, classes);
			    var foundAddedElementWithErrorClass = __ns.formValuesProcessor.checkClassNames(element, classdiff);
			    return foundAddedElementWithErrorClass;
		    },
		    getClassNamesDiff: function(existingClasses, classes){
			    if(!existingClasses){
				    return classes;
			    }
			    
			    var existingClassesArray = existingClasses.split(" ");
			    var diff = [];
			    
			    for(var i = 0; i < classes.length; i++){
				    var className = classes[i];
				    
				    if(!existingClassesArray.includes(className)){
					    diff.push(className);
				    }
			    }
			    
			    return diff;
		    },
		    checkClassNames: function(element, classes){
			    for(var i = 0; i < classes.length; i++){
				    var className = classes[i];
				    
				    if (className.includes("error") || 
					    className.includes("invalid") ||
					    className.includes("required")){
						    return { result : true };
				    }
			    }
			    
                return { result : false };
		    },
		    findRelatedInput: function(element){
			    var labelRelatedInput = __ns.formValuesProcessor.tryGetLabelRelatedInput(element);
			    
			    if (labelRelatedInput != null){
				    return labelRelatedInput;
			    }
			    
			    var childInputs = __ns.formValuesProcessor.tryGetChildInput(element);
			    
			    if (childInputs != null && childInputs.length > 0){
				    return childInputs;
			    }
			    
			    return __ns.formValuesProcessor.tryGetAttributeRelatedInput(element);
		    },
		    tryGetLabelRelatedInput: function(element){
			    if (element.tagName.toLowerCase() != "label") {
				    return null;
			    }
			    
			    var forAttribute = element.getAttribute("for");
			    return document.getElementById(forAttribute)
		    },
		    tryGetChildInput: function(element){
			    return element.querySelectorAll("input,select");
		    },
		    tryGetAttributeRelatedInput: function(element){
			    for (var i = 0; i < element.attributes.length; i++) {
				    var attribute = element.attributes[i];
				    var attributeName = attribute.name.toLowerCase();
				    var attributeValue = attribute.value.toLowerCase();
				    
				    if(attributeName == "class" || 
					    attributeName == "type" || 
					    attributeName == "name" ){
					    continue;
				    }
				    
				    if(attributeValue == "true" || attributeValue == "false"){
					    continue;
				    }
				    
				    var matchedElement = document.querySelector("input[name='" + attributeValue + "']");
				    
				    if(matchedElement != null){
					    return matchedElement;
				    }
			    }
		    }
	    },
        /** Extract collected resources to the host. */
        'extractResources': function () {
            // function called externally.
            __ns._timeStart('extractResources');

            if (!DISABLE_COLLECTION) {
                __ns._collectResources();
            }

            if (!__ns._options.extractResources) {
                __ns._timeEnd('extractResources');

                return JSON.stringify({ 'state': __ns._state });
            }

            // prevent some libraries like Prototype overriding toJSON with non-default impl. see http://stackoverflow.com/q/710586/39
            delete Array.prototype.toJSON;

            var extractedResources = {
                'frames': __ns._collectedResources.frames,
                'links': [],
                'state': __ns._state,
                'defaultActions': __ns._formDefaultActions,
                'wholeDocument': __ns._wholeDocument,
            };

            var cookies = [];

            __ns._capturedCookies.forEach(function (item) { cookies.push(item); });

            extractedResources['cookies'] = cookies;

            __ns._collectedResources.links.forEach(function (link) {
                extractedResources['links'].push(link);
            });

            __ns._timeEnd('extractResources');

            return JSON.stringify(extractedResources);
        },

        'getSessionStorage': function () {
            // function called externally.

            return __ns._getStorageCore(sessionStorage);
        },

        'getLocalStorage': function () {
            // function called externally.

            return __ns._getStorageCore(localStorage);
        },

        _getStorageCore: function (storage) {
            var values = [];

            if ((location.hostname || '').length > 0) {
                try {
                    for (var name in storage) {
                        if (storage.hasOwnProperty(name)) {
                            values.push([name, storage[name]]);
                        }
                    }
                } catch (e) {
                    console.log('storage error: ');
                    console.error(e);
                }
            }

            return values;
        },

        'extractJsLibraries': function () {
            // function called externally.
            __ns._timeStart('extractJsLibraries');

            var libs = [];

            if (jsLibraryExtractors) {
                for (var i = 0; i < jsLibraryExtractors.length; i++) {
                    for (var j = 1; j < jsLibraryExtractors[i].length; j++) {
                        try {
                            var result = eval(jsLibraryExtractors[i][j]);
                            if (result) {
                                libs.push({ 'name': jsLibraryExtractors[i][0], 'version': result });
                                break;
                            }
                        } catch (e) {
                            // swallow
                        }
                    }
                }
            }

            // prevent some libraries like Prototype overriding toJSON with non-default impl. see http://stackoverflow.com/q/710586/39
            delete Array.prototype.toJSON;

            __ns._timeEnd('extractJsLibraries');

            return JSON.stringify(libs);
        },

        '_effectiveOptions': '',

        '_isLoaded': true,

        'checkForDomMutations': function (forceTimeouts) {
            __ns._options.forceTimeouts = forceTimeouts;

            __ns._timeStart('checkForDomMutations');
            // This is called from DomMutationCheckerView
            __ns._observer = new __ns._mutationSummary({
                'callback': __ns._processNewElements,
                'queries': [{ 'element': '*' }]
            });

            __ns._setTimeout(function () {
                eoapi.extInvoke('__nsNotifyMutationCount', [__ns._state['mutatingAdditionCount']]);
                __ns._timeEnd('checkForDomMutations');
                nsSimulationCompleted();
            }, 5000);
        },

        /** Calculate XPath of an element. */
        getXPath: function (el) {
            if (el == null) {
                return '';
            }
            var parent = el.parentNode;
            if (parent == null) {
                return '';
            }
            if (el.hasAttribute('id')) {
                var id = el.id;
                var uniqueIdCount = 0;
                var allNodes = window.document.getElementsByTagName(el.tagName.toLowerCase());
                for (var n = 0; n < allNodes.length; n++) {
                    if (allNodes[n].hasAttribute('id') && allNodes[n].id == id) {
                        uniqueIdCount++;
                    }
                    if (uniqueIdCount > 1) {
                        break;
                    }
                };
                if (uniqueIdCount == 1) {
                    return 'id("' + id + '")';
                } else {
                    return __ns.getXPath(parent) + '/' + el.localName.toLowerCase() + '[@id="' + id + '"]';
                }
            } else if (el.hasAttribute('class')) {
                return __ns.getXPath(parent) + '/' + el.localName.toLowerCase() + '[@class="' + el.className + '"]';
            } else {
                for (var i = 1, sib = el.previousSibling; sib; sib = sib.previousSibling) {
                    if (sib.localName == el.localName) {
                        i++;
                    }
                };
                return __ns.getXPath(parent) + '/' + el.localName.toLowerCase() + '[' + i + ']';
            }
        },

        _parsedHashes: new Set(),

        _hashes: new Set(),

        _bindHashChangeCollector: function () {
            window.addEventListener('hashchange',
                function () {
                    var maxHashes = 500;
                    var maxLength = 100;

                    if (__ns._hashes.size < maxHashes && location.hash) {
                        if (location.hash.length > 0 && location.hash.length < maxLength) {
                            __ns._hashes.add(location.hash);
                        }
                    }
                },
                false);
        },

        _windowLoaded: false,

        _windowOnload: function () {
            __ns._windowLoaded = true;
        },

        _windowUnloadCleanup: function (e) {
            // This method exists as a workaround for EO/Chrome issue that a timer is triggered after page unload somehow.

            if (location.href === 'about:blank') {
                return;
            }

            // No more new timeouts.
            __ns._setTimeout = __ns._setInterval = function () { return 0; };

            for (var i in __ns._activeSetTimeouts) {
                if (!__ns._activeSetTimeouts.hasOwnProperty(i)) {
                    continue;
                }

                var activeTimeout = __ns._activeSetTimeouts[i];

                if (activeTimeout.handle === 0) {
                    continue;
                }

                clearTimeout(activeTimeout.handle);

                delete __ns._activeSetTimeouts[i];
            }

            for (var i in __ns._activeSetIntervals) {
                if (!__ns._activeSetIntervals.hasOwnProperty(i)) {
                    continue;
                }

                var activeInterval = __ns._activeSetIntervals[i];

                if (typeof activeInterval === 'undefined' ||
                    activeInterval === null ||
                    activeInterval.handle === 0) {
                    continue;
                }

                clearInterval(activeInterval.handle);

                delete __ns._activeSetIntervals[i];
            }
        },

        _loginPageCriteria: { },

        _loginPageIdentifyResult: [],

        _isLoginPageIdentifierEnabled: true,

        initLoginPageIdentifier: function (criteria) {
            try {
                __ns._isLoginPageIdentifierEnabled = true;
                __ns._loginPageIdentifyResult = [];
                __ns._loginPageCriteria = JSON.parse(criteria);

                var loginKeywords = __ns._loginPageCriteria["loginKeywords"];
                if (loginKeywords) {
                    __ns._loginPageCriteria["loginKeywordArray"] = loginKeywords.split(";");
                }

                var usernameKeywords = __ns._loginPageCriteria["usernameKeywords"];
                if (usernameKeywords) {
                    __ns._loginPageCriteria["usernameKeywordArray"] = usernameKeywords.split(";");
                }

                var usernameInputTypes = __ns._loginPageCriteria["usernameInputTypes"];
                if (usernameInputTypes) {
                    __ns._loginPageCriteria["usernameInputTypeArray"] = usernameInputTypes.split(";");
                }

                return null;
            } catch (exception) {
                return exception.message;
            }
        },

        disableLoginPageIdentifier: function () {
            __ns._isLoginPageIdentifierEnabled = false;
        },

        getLoginPageIdentifierResult: function () {
            return JSON.stringify(__ns._loginPageIdentifyResult);
        },

        searchLoginForms: function () {
            for (var i = 0; i < document.forms.length; i++) {
                __ns.analyzeLoginForm(document.forms[i]);
            }
        },

        analyzeLoginForm: function (formElement) {

            if (formElement == null) {
                return;
            }

            if (typeof formElement.getElementsByTagName !== "function") {
                return;
            }

            var inputs = formElement.getElementsByTagName("input");
            var criteria = __ns._loginPageCriteria;
            var totalWeight = 0;
            
            var analyzeResult = {};
            analyzeResult["windowLocation"] = window.location.href;
            analyzeResult["formAction"] = formElement.getAttribute("action");
            analyzeResult["formClass"] = formElement.getAttribute("className");
            analyzeResult["formId"] = formElement.getAttribute("id");
            analyzeResult["formName"] = formElement.getAttribute("name");
            analyzeResult["foundKeywords"] = {};
            analyzeResult["errors"] = [];
            analyzeResult["loginFormThreshold"] = criteria["loginFormThreshold"];

            if (criteria["formKeywordWeight"] !== 0 && __ns._loginPageCriteria["loginKeywordArray"]) {
                try {
                    var formCheckResult = __ns._formChecker(formElement, criteria["loginKeywordArray"]);
                    if (formCheckResult != null) {
                        totalWeight += criteria["formKeywordWeight"];
                        analyzeResult["formKeywordValue"] = criteria["formKeywordWeight"];
                        analyzeResult["foundKeywords"]["form." + formCheckResult.attribute] = formCheckResult.value;
                    }
                } catch (exception) {
                    analyzeResult["errors"].push("Form checker exception: " + exception.message);
                }
            }
            
            if (criteria["locationKeywordWeight"] !== 0 && __ns._loginPageCriteria["loginKeywordArray"]) {
                try {
                    var locationCheckResult = __ns._locationChecker(criteria["loginKeywordArray"]);
                    if (locationCheckResult != null) {
                        totalWeight += criteria["locationKeywordWeight"];
                        analyzeResult["locationKeywordValue"] = criteria["locationKeywordWeight"];
                        analyzeResult["foundKeywords"]["window.location." + locationCheckResult.attribute] = locationCheckResult.value;
                    }
                }
                catch (exception) {
                    analyzeResult["errors"].push("Location checker exception: " + exception.message);
                }
            }
            
            if (criteria["passwordInputWeight"] !== 0) {
                try {
                    var passwordFieldCount = formElement.querySelectorAll("input[type=password]").length;
                    if (passwordFieldCount === 1) {
                        totalWeight += criteria["passwordInputWeight"];
                        analyzeResult["passwordInputValue"] = criteria["passwordInputWeight"];
                    }
                } catch (exception) {
                    analyzeResult["errors"].push("Password field checker exception: " + exception.message);
                }
            }

            if (criteria["rememberMeInputWeight"] !== 0) {
                try {
                    var checkboxInputs = formElement.querySelectorAll("input[type=checkbox]");
                    var rememberMeFieldCheckResult = __ns._rememberMeFieldChecker(checkboxInputs);
                    if (rememberMeFieldCheckResult != null) {
                        totalWeight += criteria["rememberMeInputWeight"];
                        analyzeResult["rememberMeInputValue"] = criteria["rememberMeInputWeight"];
                        analyzeResult["foundKeywords"]["checkbox." + rememberMeFieldCheckResult.attribute] =
                            rememberMeFieldCheckResult.value;
                    }
                } catch (exception) {
                    analyzeResult["errors"].push("Remember me field checker exception: " + exception.message);
                }
            }

            if (criteria["usernameInputWeight"] !== 0 && __ns._loginPageCriteria["usernameKeywordArray"] && __ns._loginPageCriteria["usernameInputTypeArray"]) {
                try {
                    var usernameCheckResult = __ns._usernameFieldChecker(inputs,
                        criteria["usernameInputTypeArray"],
                        criteria["usernameKeywordArray"]);
                    if (usernameCheckResult != null) {
                        totalWeight += criteria["usernameInputWeight"];
                        analyzeResult["usernameInputValue"] = criteria["usernameInputWeight"];
                        analyzeResult["foundKeywords"]["input." + usernameCheckResult.attribute] =
                            usernameCheckResult.value;
                    }
                } catch (exception) {
                    analyzeResult["errors"].push("Username field checker exception: " + exception.message);
                }
            }

            if (criteria["submitButtonWeight"] !== 0) {
                try {
                    var submitButtonLength = formElement.querySelectorAll("[type=submit]").length;
                    if (submitButtonLength === 1) {
                        totalWeight += criteria["submitButtonWeight"];
                        analyzeResult["submitButtonValue"] = criteria["submitButtonWeight"];
                    }
                } catch (exception) {
                    analyzeResult["errors"].push("Submit button checker exception: " + exception.message);
                }
            }

            analyzeResult["totalWeight"] = totalWeight;
            __ns._loginPageIdentifyResult.push(analyzeResult);
        },

        _hasElementAttributeIncludeKeyword(element, attributes, keywords) {
            for (var i = 0; i < attributes.length; i++) {
                var attributeValue = element.getAttribute(attributes[i]);
                if (!attributeValue)
                    continue;

                attributeValue = attributeValue.toLowerCase();
                for (var j = 0; j < keywords.length; j++) {
                    if (!keywords[j]) {
                        continue;
                    }
                    if (attributeValue.includes(keywords[j])) {
                        return { attribute: attributes[i], value: element.getAttribute(attributes[i]), keyword: keywords[j] };
                    }
                }
            }
            return null;
        },

        _formChecker: function (form, keywords) {
            var formAttributes = ["id", "name", "action", "className"];
            if (!form.getAttribute("action")) {
                form.setAttribute("action", window.location.pathname);
            }
            return __ns._hasElementAttributeIncludeKeyword(form, formAttributes, keywords);
        },

        _locationChecker: function (keywords) {
            var attributes = ["pathname", "hash"];

            for (var i = 0; i < attributes.length; i++) {
                var attributeValue = window.location[attributes[i]];
                if (!attributeValue)
                    continue;

                attributeValue = attributeValue.toLowerCase();
                for (var j = 0; j < keywords.length; j++) {
                    if (attributeValue.includes(keywords[j])) {
                        return { attribute: attributes[i], value: window.location[attributes[i]], keyword: keywords[j] };
                    }
                }
            }

            return null;
        },

        _rememberMeFieldChecker: function (inputs) {
            var inputAttributes = ["id", "name", "className"];

            for (var i = 0; i < inputs.length; i++) {
                var result = __ns._hasElementAttributeIncludeKeyword(inputs[i], inputAttributes, ["remember"]);
                if (result != null) {
                    return result;
                }
            }
            return null;
        },

        _usernameFieldChecker: function (inputs, inputTypes, keywords) {
            var inputAttributes = ["id", "name", "className"];
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];

                if (!inputTypes.includes(input.type.toLowerCase())) {
                    continue;
                }

                var result = __ns._hasElementAttributeIncludeKeyword(input, inputAttributes, keywords);

                if (result != null) {
                    return result;
                }
            }
            return null;
        }
    };

    if (DISABLE_COLLECTION) {
        // To facilitate removal by closure compiler.
        __ns._collectResources = undefined;
        __ns._collectedResources = undefined;
        __ns._collectResourcesFromElements = undefined;
        __ns._formDefaultActions = undefined;
        __ns._collectFormDefaultAction = undefined;
        __ns._collectFormDefaultActions = undefined;
        __ns['extractResources'] = undefined;
        __ns['extractJsLibraries'] = undefined;
        __ns['parseForms'] = undefined;
        __ns._hookCookieSetter = undefined;
    }

    if (!CONSOLE_DEBUG) {
        __ns._hookHistory = undefined;
        __ns._onHistoryPushState = undefined;
        __ns._onHistoryReplaceState = undefined;
    }

    if (!DEBUG_DELAY_START) {
        __ns._debugger = undefined;
    }

    if (!COLLECT_VERBOSE_DEBUGINFO) {
        __ns._dfsStats = undefined;
    }

    // Do not attach hooks in an iframe as simulateDocument SHALL never be called.
    var isInIframe = window.frameElement && window.frameElement.nodeName === "IFRAME";

    if (!isInIframe) {
        window.onload = __ns._windowOnload;
        window.onunload = __ns._windowUnloadCleanup;

        __ns._setupSetTimeoutZero();
        __ns._hookSetTimeout();
        __ns._hookSetInterval();
        __ns._hookXhr();

        if (CONSOLE_DEBUG) {
            __ns._hookHistory();
        }

        __ns._bindHashChangeCollector();

        if (!DISABLE_COLLECTION) {
            __ns._hookCookieSetter();
        }

        __ns['_state'] = __ns._state;
        __ns['dotify'] = __ns.dotify;
        __ns['dotifyPart'] = __ns.dotifyPart;

        window['__ns__'] = __ns;

        /**
         * dispatch nsdomX call to nsdom
         * 1: fragment
         * 2: referer
         * 3: window.name
         */
        window["nsdom1"] = function (args) { nsdom("1", args); };
        window["NSDOM1"] = window["nsdom1"];
        window["nsdom2"] = function (args) { nsdom("2", args); };
        window["NSDOM2"] = window["nsdom2"];
        window["nsdom3"] = function (args) { nsdom("3", args); };
        window["NSDOM3"] = window["nsdom3"];
    } else {
        window['__ns__'] = {};
    }

    __ns._timeStart('__ns__loaded-' + location.href);
    __ns._timeEnd('__ns__loaded-' + location.href);
};

// EO may load about:blank and a "special data URI" for its own initialization. No need to execute this script there.
if (location.href !== 'about:blank' && !location.href.startsWith('data:')) {
    everything();
}
