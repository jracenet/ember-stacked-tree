App = Ember.Application.create();

App.Router.map(function() {
});

App.IndexRoute = Ember.Route.extend({

	setupController: function(controller, model) {
    controller.set('model', model);
  },

  model: function() {
    return {
    	"name": "Parent",
    	"childs": [
    		{
    			"name": "child 1",
    			"childs": []
    		},
    		{
    			"name": "child 2",
    			"childs": [
    				{
    					"name": "A",
    				 	"childs": []
    				},
    				{
    					"name": "B",
    					"childs": []
    				}
    			]
    		}
    	]
    }
  }
});


App.NodeTreeView = Ember.View.extend({
	tagName: 'div',

	didInsertElement: function () {
		var color = this.get('parentView').$('.node-header').css('background-color');
		this.$('.node-header').css('opacity', this.shadeColor(color, -20));
		console.log(color);
	},

	shadeColor: function (color, percent) {
		console.log('COLOR', color, "TYPE", typeof(color));
    // var R = parseInt(color.substring(1,3),16);
    // var G = parseInt(color.substring(3,5),16);
    // var B = parseInt(color.substring(5,7),16);

    // R = parseInt(R * (100 + percent) / 100);
    // G = parseInt(G * (100 + percent) / 100);
    // B = parseInt(B * (100 + percent) / 100);

    // R = (R<255)?R:255;
    // G = (G<255)?G:255;
    // B = (B<255)?B:255;

    // var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    // var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    // var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    // return "#"+RR+GG+BB;
	}

});

App.NodeTreeController = Ember.ObjectController.extend({
	collapsed: false,

	init: function() {
	},

	hasChilds: function () {
		return !Ember.isEmpty(this.get('content.childs'));
	}.property('content.childs@each'),

	actions: {
		collapse: function () {
			this.set('collapsed', !this.get('collapsed'));
		}
	}


});

App.register('controller:nodeTree', App.NodeTreeController, {singleton: false});

