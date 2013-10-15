TinyProgressBar.js
==================

A minimalist progress bar written in vanilla.js

<h1>TinyProgressBar.js</h1>
<p>A minimalist progress bar written in vanilla.js</p>
<h2>Use it</h2>
<h3>At it's easiest,</h3>
<p>To start it, call...</p>
<code>
	TinyProgressBar.start();
</code>
<p>To increment it, call...</p>
<code>
	TinyProgressBar.increment();<br>
	// or<br>
	TinyProgressBar.increment(50); //to increment it by 50%
</code>
<p>To move it to a specific location, call...</p>
<code>
	TinyProgressBar.position(40);
</code>
<p>To halt it where it is, call...</p>
<code>
	TinyProgressBar.pause();
</code>
<p>To continue from where it left off, call...</p>
<code>
	TinyProgressBar.unpause();
</code>
<p>To stop it, call...</p>
<code>
	TinyProgressBar.stop(); <br>
	// or<br>
	TinyProgressBar.stop("success"); //for a successful load<br>
	TinyProgressBar.stop("failure"); //for an unsuccessful load<br>
</code>
<h3>For those who want some fun,</h3>
<p>Update how it behaves- update(options) accepts an object as an argument. This object can contain...</p>
<code>
	<p>TinyProgressBar.update({<br>
		autoIncrement: 4, // by which percentage does the bar randomize it's automatic increments<br>
		manualIncrement: 20, // how far should the bar increment when increment() is called<br>
		color: "#0c84e8", // what colour is the bar<br>
		fixed: "top", // where is the bar fixed (top or bottom)<br>
		selector: "tpb", // what id will the bar be called<br>
		startPosition: 0, // what percentage should the bar start at<br>
		successColor: "limegreen", // what colour will it change to on success<br>
		failureColor: "red" // what colour will it change to on failure<br>
	});</p>
</code>
<p>Define a custom function - extend(name, func) accepts a string as the function name and a function to be run when that function is called...</p>
<code>
	<p>TinyProgressBar.extend('helloworld', function(){alert('hello world!');})</p>
	TinyProgressBar.helloworld(); // will alert "hello world!"
</code>
