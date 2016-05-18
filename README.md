# UsefulMarionetteViewBehaviors
A collection of a few marionette view behaviors that I find myself using often

##Installation
`bower install useful-marionette-view-behaviors --save`

##CollectionLoading
A Marionette view behavior that will display a loading gif in place of an empty view while a collection is being fetched. Once the collection has finished being fetched,
the itemviews / empty view will be shown depending on the outcome of the request.

##ModelFormSave
A Marionette view behavior useful for applying to a view that displays a form to update a model. It will loop through the views $el and look for specially marked inputs containing data to save to the model. Will also optionally display validation errors in the dom.

##ModelValidation
A Marionette view behavior that will listen for a view's model(s) to trigger an invalid event. When this happens, the behavior will display the error / error message in an alert

##ModelSaveAnimation
A marionette view behavior that listens for the view's model to trigger a request event. When this happens, a loading icon
is inserted into the view's $el (leaving the css implementation up to you). Once the request has completed, the loading icon is removed.

##Modal
This behavior takes care of the common functionality of a modal
