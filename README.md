# UsefulMarionetteViewBehaviors
A collection of a few marionette view behaviors that I find myself using often

##CollectionLoadingBehavior
A Marionette view behavior that will display a loading gif in place of an empty view while a collection is being fetched. Once the collection has finished being fetched,
the itemviews / empty view will be shown depending on the outcome of the request.

##ModelFormSaveBehavior
A Marionette view behavior useful for applying to a view that displays a form to update a model. It will loop through the views $el and look for specially marked inputs containing data to save to the model. Will also optionally display validation errors in the dom.

##ModelValidationBehavior
A Marionette view behavior that will listen for a view's model(s) to trigger an invalid event. When this happens, the behavior will display the error / error message in an alert
