/*
	tinyprogressbar.js
	Version 1.2-development

	Written By Cam Wright

	the jQuery-less progress bar solution

	CHANGELOG

	1.2
		increment() now accepts a percentage value as an argument.
		added pause() and unpause() functions to halt and continue the bar.
		bar now animates instead of jumping

	1.1
		getSelector() now uses getElementById instead of querySelector.
		added success and failure argument to done() method.
		added successColor and failureColor options.
		removed listAll() method as console.debug(TinyProgressBar) result is the same.
		renamed fn() to extend().	
*/

var TinyProgressBar = {
	//default values
	autoIncrement: 2,
	manualIncrement: 20,
	color: "#0c84e8",
	fixed: "top",
	selector: "tpb",
	startPosition: 0,
	successColor: "limegreen",
	failureColor: "red",

	// create element and generate styles
	init: (function() {
		var bar = document.createElement('div');
		bar.setAttribute('id', 'tpb');
		document.getElementsByTagName('body')[0].appendChild(bar);

		// set defaults
		document.getElementsByTagName('body')[0].style.height = "100%";
		document.getElementsByTagName('body')[0].style.width = "100%";
		document.getElementsByTagName('body')[0].style.margin = "0px";
		document.getElementsByTagName('body')[0].style.padding = "0px";
		document.getElementsByTagName('html')[0].style.height = "100%";
		document.getElementsByTagName('html')[0].style.width = "100%";
		document.getElementsByTagName('html')[0].style.margin = "0px";
		document.getElementsByTagName('html')[0].style.padding = "0px";
		bar.style.height = "2px";
		bar.style.backgroundColor = "#0c84e8";
		bar.style.position = "fixed";
		bar.style.left = '0px';
		bar.style.top = "0px";
		bar.style.width = "100%";
	})(),

	// find element in document
	getSelector: function() {
		return document.getElementById(this.selector);
	},

	animate: function(time, distance){
		var tpb = this.getSelector();
		var steps = Math.floor(time / 10);
		var stepDist = distance / steps;
		var anim = window.setInterval(function(){
			if (time - 10 > -1) {
				time = time - 10;
				var pos = String(tpb.style.width).slice(0, -1);
				if (stepDist < TinyProgressBar.distanceFromEnd()) {
					tpb.style.width = parseFloat(pos) + stepDist + "%";
				}
			} else {
				window.clearInterval(anim);
			}
		}, 10);
	},

	beginTimer: function(){
		var tpb = this.getSelector();
		this.timer = window.setInterval(function(){
			var random = Math.floor(Math.random()*autoInc+1);
			TinyProgressBar.animate(300, random);
		}, 300);
	},

	//check distance from end of bar
	distanceFromEnd: function() {
		var tpb = this.getSelector();
		var pos = String(tpb.style.width).slice(0, -1);
		return 100-pos;
	},

	//generate styles for bar
	generateStyles: function() {
		var tpb = this.getSelector();
		tpb.style.backgroundColor = this.color;
		if (this.fixed == 'top') {
			tpb.style.top = '0px';
			tpb.style.bottom = "auto";
		} else if (this.fixed == 'bottom') {
			tpb.style.top= "auto";
			tpb.style.bottom = '0px';
		} else {
			console.error('TinyProgressBar.generateStyles: fixed must be set to top or bottom');
		}
	},

	//change the default values the progress bar
	update: function(options) {
		for (var each in options) {
			var value = eval('this.' + each);
			var newValue = eval('options.' + each);
			if (value !== undefined && typeof value !== "function") {
				this[each] = newValue;
			}
		}
		this.generateStyles();
	},

	//functions to interact with the progress bar
	start: function(){
		var tpb = this.getSelector();
		var pos = this.startPosition;
		autoInc = this.autoIncrement;
		tpb.style.width = pos + "%";
		tpb.style.display = "block";
		this.beginTimer();
		
	},
	increment: function(val){
		var tpb = this.getSelector();
		var len = String(tpb.style.width).slice(0, -1);
		var inc = this.manualIncrement;
		if (typeof val !== "undefined") {
			inc = val;
		}
		if (len < this.distanceFromEnd()){
			this.animate(300, inc);
		}
	},
	position: function(val){
		var tpb = this.getSelector();
		var width = parseInt(String(tpb.style.width).slice(0, -1));
		if (val < 100 && val > width) {
			var move = val - width;
			this.animate(300, move);
		}
	},
	pause: function(){
		window.clearInterval(this.timer);
	},
	unpause: function(){
		this.beginTimer();
	},
	stop: function(result){
		var tpb = this.getSelector();
		window.clearInterval(this.timer);
		var width = parseInt(String(tpb.style.width).slice(0, -1));
		var move = 100 - width;
		this.animate(200, move); 
		if (typeof result !== 'undefined') {
			if (result == "success") {
				tpb.style.backgroundColor = this.successColor;
			} else if (result == "failure") {
				tpb.style.backgroundColor = this.failureColor;
			} else {
				console.error("TinyProgressBar.stop: result must be 'success' or 'failure'.")
			}
		}
		fadeOutTimer = window.setInterval(function(){
			tpb.style.display = 'none';
			tpb.style.backgroundColor = this.color;
			window.clearInterval(fadeOutTimer);
		}, 200);
	},

	//define a custom function
	extend: function(name, func) {
		if (typeof func === "function") {
			if (this[name] === undefined) {
				this[name] = func;
			} else {
				console.error("TinyProgressBar.extend: function name already exists.")
			}	
		} else {
			console.error("TinyProgressBar.extend: second argument must be a function.");
		}
	}
}
