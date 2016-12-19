/*!
 * Copyright 2016 Copyright (c) 2016 Eric Bidelman. All rights reserved.

 * @version v0.0.6
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
var _start=new WeakMap,_end=new WeakMap,Metric=function(a){if(!a)throw Error("Please provide a metric name");if(!Metric.supportsPerfMark&&(console.warn("Timeline won't be marked for \""+a+'".'),!Metric.supportsPerfNow))throw Error("This library cannot be used in this browser.");this.name=a};Metric.prototype.log=function(){console.info(this.name,this.duration,"ms");return this};
Metric.prototype.logAll=function(a){a=void 0===a?this.name:a;if(Metric.supportsPerfNow)for(var b=performance.getEntriesByName(a),c=0;c<b.length;++c)console.info(a,b[c].duration,"ms");return this};Metric.prototype.start=function(){if(_start.get(this))return console.warn("Recording already started."),this;_start.set(this,performance.now());Metric.supportsPerfMark&&performance.mark("mark_"+this.name+"_start");return this};
Metric.prototype.end=function(){if(_end.get(this))return console.warn("Recording already stopped."),this;_end.set(this,performance.now());if(Metric.supportsPerfMark){var a="mark_"+this.name+"_start",b="mark_"+this.name+"_end";performance.mark(b);performance.measure(this.name,a,b)}return this};Metric.prototype.sendToAnalytics=function(a,b,c){b=void 0===b?this.name:b;c=void 0===c?this.duration:c;window.ga?0<=c&&ga("send","timing",a,b,c):console.warn("Google Analytics has not been loaded");return this};
Object.defineProperties(Metric.prototype,{duration:{configurable:!0,enumerable:!0,get:function(){var a=_end.get(this)-_start.get(this);if(Metric.supportsPerfMark){var b=performance.getEntriesByName(this.name)[0];b&&"measure"!==b.entryType&&(a=b.duration)}return a||-1}}});Object.defineProperties(Metric,{supportsPerfNow:{configurable:!0,enumerable:!0,get:function(){return self.performance&&performance.now}},supportsPerfMark:{configurable:!0,enumerable:!0,get:function(){return self.performance&&performance.mark}}});
0
