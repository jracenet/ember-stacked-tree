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
    			"name": "Child 1",
    			"childs": []
    		},
    		{
    			"name": "Child 2",
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
  classNames: ['node'],

	didInsertElement: function () {
    if(this.get('parentView.viewName') === 'nodeTree') {
  		var color = this.get('parentView').$('.node-strip').css('background-color'),
          newColor = this.shadeColor(color, 10);
      console.log(this.$().parent('.node'));
      this.get('parentView').$('.node').css('border-left-color', newColor);
      this.get('parentView').$('.node').css('border-right-color', newColor);

  		this.$('.node-strip:first').css('background-color', newColor);
      this.$('.node-strip:last').css('background-color', newColor);
    }
  },

	shadeColor: function (color, percent) {
    var R, G, B, colorComponents;

    colorComponents = color.match(/\d+/g)

    R = parseInt(colorComponents[0], 10);
    G = parseInt(colorComponents[1], 10);
    B = parseInt(colorComponents[2], 10);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255)? R : 255;
    G = (G < 255)? G : 255;
    B = (B < 255)? B : 255;

    return "rgb(%@, %@, %@)".fmt(R, G, B);
	},

  collapseButtonLabel: function () {
    return this.get('controller.collapsed')? "+" : "-";
  }.property('controller.collapsed'),

  displayFooter: function () {
    return !this.get('controller.collapsed') && this.get('controller.hasChilds');
  }.property('controller.collapsed', 'controller.content.childs@each')

});

App.NodeTreeController = Ember.ObjectController.extend({
	collapsed: false,

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

