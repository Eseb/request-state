# Request state

A simple-to-use immutable async state tracker.

## Full API
```es6
import RequestState from 'request-state';

// Contains each of the following constants.
RequestState.NOT_REQUESTED;
RequestState.IN_PROGRESS;
RequestState.SUCCEEDED;
RequestState.FAILED;

// The state of each request can be checked via `isX` methods.
myRequest.isNotRequested();
myRequest.isInProgress();
myRequest.isSucceeded();
myRequest.isFailed();

// Attachment storage for errors.
const missingRequest = RequestState.FAILED.withAttachment(404);
const complexRequest = RequestState.FAILED.withAttachment({ errorMessage: '...', ...});

missingRequest.attachment;
complexRequest.attachment;

// Logic to help you decide if you should have loading placeholders.
render() {
  if (toDosRequestState.shouldShowAsLoading()) {
    return 'Loading';
  }

  return ...;
}

// Logic to help you figure out if something needs to be fetched.
getToDos() {
  if (toDosRequestState.shouldBeRequested()) {
    return fetchToDos();
  }

  return getCachedToDos();
}
```

## Usage in Redux

```es6
import RequestState from 'request-state';

const INITIAL_STATE = {
  toDos: new OrderedSet(),
  // Since the object is immutable, it's safe to reference the const directly.
  toDoRequestState: RequestState.NOT_REQUESTED,
};

function toDos(state = INITIAL_STATE, action) {
  switch (action.type) {
    ...
    case 'REQUESTED_TODOS':
      return Object.assign({}, state, {
        toDoRequestState: RequestState.IN_PROGRESS,
      });
    case 'RECEIVED_TODOS':
      return Object.assign({}, state, {
        toDos: action.toDos,
        toDoRequestState: RequestState.SUCCEEDED,
      });
    case 'FAILED_GETTING_TODOS':
      return Object.assign({}, state, {
        toDoRequestState: RequestState.FAILED.withAttachment(action.error),
      });
    ...
  }
}
```
