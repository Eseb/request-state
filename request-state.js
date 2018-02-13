import keyMirror from 'key-mirror';

const States = keyMirror({
  NOT_REQUESTED: null,
  IN_PROGRESS: null,
  SUCCEEDED: null,
  FAILED: null,
});

export default class RequestState {
  constructor(
    state = States.NOT_REQUESTED,
    attachment = undefined
  ) {
    this.state = state;
    this.attachment = attachment;

    Object.freeze(this);
  }

  withAttachment(attachment) {
    return new RequestState(this.state, attachment);
  }

  isNotRequested() {
    return this.state === States.NOT_REQUESTED;
  }

  isInProgress() {
    return this.state === States.IN_PROGRESS;
  }

  isSucceeded() {
    return this.state === States.SUCCEEDED;
  }

  isFailed() {
    return this.state === States.FAILED;
  }

  shouldShowAsLoading() {
    return this.isNotRequested() || this.isInProgress();
  }

  shouldBeRequested() {
    return this.isNotRequested() || this.isFailed();
  }
}

export const NOT_REQUESTED = new RequestState(States.NOT_REQUESTED);
export const IN_PROGRESS = new RequestState(States.IN_PROGRESS);
export const SUCCEEDED = new RequestState(States.SUCCEEDED);
export const FAILED = new RequestState(States.FAILED);
