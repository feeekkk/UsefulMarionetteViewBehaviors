# UsefulMarionetteViewBehaviors
A collection of a few marionette view behaviors that I find myself using often. They are quite opinionated for my workflow, however feel free to to contribute and make them more abstracted!

##Installation
`bower install useful-marionette-view-behaviors --save`

##Backgrid
A marionette behavior that handles common interactions with a backgrid component. In order to function, it needs to be passed an object containing instances of `Backbone.collection, Backgrid.Grid, Backgrid.Extension.Paginator, and Backgrid.Extension.Filter`. The view can pass this info to the behavior by calling `this.triggerMethod('initializeBackgridComponents');` The view's template should also have the following selectors: '.search', '.submit-search', '.grid', '.paginator', '.filter'

##FoundationOffCanvas
A marionette behavior for taking care of interacting with a foundation off canvas element.
Can optionally disable scrolling on the body while the off canvas is open.
Supports open, close, and toggle of the off canvas.

##LoadingIndicator
A Marionette view behavior that will either a) use NProgress or b) display a loading gif when a collection / model is being fetched from the server.

##Modal
This behavior takes care of the common functionality of a modal

##ModelFormSave
A Marionette view behavior useful for applying to a view that displays a form to update a model. It will loop through the views $el and look for specially marked inputs containing data to save to the model. Will also optionally display validation errors in the dom.

##ModelSaveAnimation
@deprecated use LoadingIndicator instead.
A marionette view behavior that listens for the view's model to trigger a request event. When this happens, a loading icon
is inserted into the view's $el (leaving the css implementation up to you). Once the request has completed, the loading icon is removed.

##ModelValidation
A Marionette view behavior that will listen for a view's model(s) to trigger an invalid event. When this happens, the behavior will display the error / error message in an alert

##StateManager
A marionette behavior meant for a parent view to keep track of which child view to show. Essentially meant for a multi step process, think along the lines of creating an order on an ecommerce
website and having different views to show one at a time, such as customer info, address info, credit card info, etc.
