# Simple Validate jQuery Plugin

## Dependency

- [jQuery](https://code.jquery.com/jquery-3.1.0.js)
- [Tether](https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js)

Both are not included in this plugin.

## Usage

call on form element so that submit event is binded.
```
$("form").simplevalidate()
```
Then add rules to the validate plugin by 'addRules' or 'setRules' method (see below).

A single rule is an object of the following format:
```
{
	target: "#target",
	template: "#template",
	condition: function() {
		
	}
}
```
additionally, it can have some extra options which will be passed into Tether. For example:
```
{
	target: "#target",
	template: "#template",
	condition: function() {
		
	},
	classPrefix: 'validation-tether',
    attachment: "bottom right",
    targetAttachment: "top right",
    offset: "5px 0",
}
```
You could check the api documentation for Tether [here](http://tether.io/)

A template is the HTML template element `<template>xxx</template>`

## Method

Belows are list of methods you can call to interact with the plugin

- `$("form").simplevalidate('setRules',[rule1,rule2...])`
- `$("form").simplevalidate('getRules')`
- `$("form").simplevalidate('addRules',[rule1,rule2...])`
- `$("form").simplevalidate('validate')`
- `$("form").simplevalidate('errors')`