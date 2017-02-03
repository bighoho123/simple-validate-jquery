(function($) {


    var methods = {
        init: function() {
            if (!this.is("form")) {
                $.error("You have to init simplevalidate on the form element");
            } else if (Tether === undefined) {
                $.error("Tether is not loaded.");
            } else {
                this.off('submit', _internal.onSubmitEvent)
                this.on('submit', _internal.onSubmitEvent);
            }
            return this;
        },
        setRules: function(rules) {
            _internal.getRules.setRules.call(this, rules);
            return this;
        },
        getRules: function() {
            return _internal.getRules.apply(this);
        },
        addRules: function(rules) {
            var existingRules = _internal.getRules.apply(this);
            var newRules;
            if (Array.isArray(rules)) {
                newRules = existingRules.concat(rules);
            } else {
                existingRules.push(rules);
                newRules = existingRules;
            }
            _internal.setRules.call(this, newRules);
            return this;
        },
        validate: function() {
            var rules = _internal.getRules.apply(this);
            var hasErrors = false;
            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];
                if (!rule.condition.apply(this)) {
                    hasErrors = true;
                }
            }
            return !hasErrors;
        },
        errors: function() {
            var rules = _internal.getRules.apply(this);
            var defaultOptions = _internal.getDefaultOption();
            var hasErrors = false;
            var errorElems = [];
            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];
                if (!rule.condition.apply(this)) {
                    var elementContent = $(rule.template).html();
                    var element = $(elementContent);
                    $("body").append(element);
                    var target = $(rule.target);
                    var tether = new Tether($.extend(defaultOptions, {
                        target: target,
                        element: element
                    }, rule));
                    tether.position();
                    errorElems.push({
                        elem: element,
                        tether: tether
                    });
                }

            }
            return errorElems;
        }
    };

    var _internal = {
        getDefaultOption: function() {
            return {
                classPrefix: 'validation-tether',
                attachment: "bottom right",
                targetAttachment: "top right",
                offset: "5px 0"
            }
        },
        onSubmitEvent: function(e) {
            if (!$(this).simplevalidate('validate')) {
                e.preventDefault();
                console.log("You've got error in your form");
                var errorElems = $(this).simplevalidate('errors');
                if (errorElems.length) {
                    e.preventDefault();
                    $('html, body').animate({
                        scrollTop: $(errorElems[0].elem).offset().top
                    }, 500);
                }
            } else {
                console.log("All good")
            }
        },
        setRules: function(rules) {
            if (Array.isArray(rules)) {
                this.data('rules', rules);
            } else {
                $.error("rules has to be an array");
            }
        },
        getRules: function() {
            return this.data('rules') ? this.data('rules') : [];
        },
    }



    $.fn.simplevalidate = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to "init"
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.simplevalidate');
        }
    };



})(jQuery);


